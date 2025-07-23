import * as d3 from "d3";

export default class ParallelD3 {
    constructor(el, props = {}) {
        this.el = el;
        this.margin = props.margin;
        this.width = props.width - this.margin.left - this.margin.right;
        this.height = props.height - this.margin.top - this.margin.bottom;
        this.do_color = props.do_color;
        this.ordinal_scale = props.ordinal_scale;
        this.color_encode_column = props.color_encode_column;
        this.setProps = props.setProps;

        this.update(props);
    }

    setLine(line) {
        this.setProps({ line: line });
    }

    update(props) {
        this._init();
        this.draw(props.data);
    }

    _init() {
        d3.select(this.el).selectAll("*").remove();
        if (this.tooltip) this.tooltip.remove();

        this.svg = d3.select(this.el)
            .append("svg")
            .attr("width", this.width + this.margin.left + this.margin.right)
            .attr("height", this.height + this.margin.top + this.margin.bottom)
            .style("background-color", "#fff");

        this.chartGroup = this.svg.append("g")
            .attr("transform", `translate(${this.margin.left}, ${this.margin.top})`);

        this.tooltip = d3.select(this.el.parentNode)
            .append("div")
            .style("position", "absolute")
            .style("background", "#fff")
            .style("padding", "5px 10px")
            .style("border", "1px solid #999")
            .style("border-radius", "4px")
            .style("pointer-events", "none")
            .style("font-size", "12px")
            .style("display", "none");
    }

    draw(data) {
        const self = this;
        const { width: w, height: h } = self;
        const svg = self.chartGroup;

        svg.selectAll("*").remove();

        const missingY = h + 40;

        const dimensions = Object.keys(data[0]).filter(d => {
            const d_ = Number(d);
            return typeof d_ === "number" && d_ <= 4;
        });

        const x = d3.scalePoint().range([0, w]).padding(0.25).domain(dimensions);
        const y = {};
        for (let col of dimensions) {
            y[col] = d3.scaleLinear().domain([0, 6]).range([h, 0]);
        }

        const isNumericColumn = self.ordinal_scale;

        let colorScale;
        if (self.do_color) {
            const values = data.map(d => d[self.color_encode_column]).filter(d => d !== "" && d != null);
            if (isNumericColumn) {
                const extent = d3.extent(values, v => +v);
                colorScale = d3.scaleSequential(d3.interpolatePlasma).domain(extent);
            } else {
                const categories = [...new Set(values)];
                colorScale = d3.scaleOrdinal(d3.schemeCategory10).domain(categories);
            }
        } else {
            colorScale = () => "#962ef8ff";
        }

        const lines = svg.selectAll("g.line-group")
            .data(data, d => d.ID_PACIENTE)
            .enter()
            .append("g")
            .attr("class", "line-group");

        lines.each(function (d) {
            const group = d3.select(this);
            const segments = [];
            let lastValidPoint = null;

            for (let i = 0; i < dimensions.length; i++) {
                const dim = dimensions[i];
                const val = d[dim];

                if (val === "" || val == null) {
                    if (lastValidPoint) {
                        segments.push({
                            points: [lastValidPoint, [x(dim), missingY]],
                            dashed: true
                        });
                    }
                    lastValidPoint = null;

                    for (let j = i + 1; j < dimensions.length; j++) {
                        const nextVal = d[dimensions[j]];
                        if (nextVal !== "" && nextVal != null) {
                            const nextPoint = [x(dimensions[j]), y[dimensions[j]](+nextVal)];
                            segments.push({
                                points: [[x(dim), missingY], nextPoint],
                                dashed: true
                            });
                            lastValidPoint = nextPoint;
                            i = j;
                            break;
                        }
                    }
                } else {
                    const point = [x(dim), y[dim](+val)];
                    if (lastValidPoint) {
                        segments.push({
                            points: [lastValidPoint, point],
                            dashed: false
                        });
                    }
                    lastValidPoint = point;
                }
            }

            segments.forEach(seg => {
                group.append("path")
                    .attr("d", d3.line()(seg.points))
                    .attr("data-dashed", seg.dashed) // <- robust marker
                    .style("fill", "none")
                    .style("stroke", colorScale(d[self.color_encode_column]))
                    .style("stroke-width", 1)
                    .style("opacity", 0.44)
                    .style("stroke-dasharray", seg.dashed ? "4,3" : "none");
            });

            group.on("mouseover", function (event) {
                group.selectAll("path")
                    .style("stroke", "#ffcc00")
                    .style("stroke-width", 3)
                    .style("opacity", 1);

                self.tooltip
                    .style("display", "block")
                    .html(`<strong>ID:</strong> ${d.ID_PACIENTE}`)
                    .style("left", (event.pageX + 10) + "px")
                    .style("top", (event.pageY - 28) + "px");
            }).on("mouseout", function () {
                group.selectAll("path")
                    .style("stroke", colorScale(d[self.color_encode_column]))
                    .style("stroke-width", 1)
                    .style("opacity", 0.44)
                    .style("stroke-dasharray", function () {
                        return d3.select(this).attr("data-dashed") === "true" ? "4,3" : "none";
                    });

                self.tooltip.style("display", "none");
            }).on("click", () => {
                self.setLine(d);
            });
        });

        svg.selectAll("axis-parallel")
            .data(dimensions).enter()
            .append("g")
            .attr("transform", d => `translate(${x(d)})`)
            .each(function (d) {
                const axis = (d === dimensions[dimensions.length - 1]) ? d3.axisRight() : d3.axisLeft();
                axis.scale(y[d])
                    .ticks(7)
                    .tickSize(0)
                    .tickPadding(10)
                    .tickFormat(i => ['0.07gf', '0.2gf', '2.0gf', '4.0gf', '10gf', '300gf', '>300gf'][i]);

                d3.select(this).call(axis)
                    .call(selection => {
                        selection.selectAll("text")
                            .attr("font-size", 11)
                            .attr("fill", "#000000ff")
                            .attr("paint-order", "stroke")
                            .attr("stroke", "#ffffffff")
                            .attr("stroke-width", 3.1);

                        selection.selectAll("line")
                            .attr("stroke", "#000000ff")
                            .attr("stroke-linecap", "round")
                            .attr("stroke-width", 4);

                        selection.select(".domain").remove();
                    });
            })
            .append("text")
            .style("text-anchor", "middle")
            .attr("y", -15)
            .attr("font-size", 14)
            .attr("paint-order", "stroke")
            .text(d => d)
            .style("fill", "black");

        svg.append("line")
            .attr("x1", self.margin.left)
            .attr("x2", w - self.margin.right)
            .attr("y1", missingY)
            .attr("y2", missingY)
            .attr("stroke", "#000")
            .attr("stroke-width", 2)
            .attr("stroke-linecap", "round");

        svg.append("text")
            .attr("x", w / 2)
            .attr("y", missingY + 15)
            .attr("text-anchor", "middle")
            .style("font-size", "13px")
            .style("fill", "#000")
            .text("Missing Data");
    }
}
