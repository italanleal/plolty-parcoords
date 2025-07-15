import * as d3 from "d3";

export default class ParallelD3 {
    constructor(el, options = {}) {
        this.el = el;
        this.margin = { top: 30, right: 10, bottom: 100, left: 10 };
        this.width = options.width || 800 - this.margin.left - this.margin.right;
        this.height = options.height || 300 - this.margin.top - this.margin.bottom;
        this.inputList = options.inputList || ["SEXO", "N_AVALIACOES"];
        this.selectedColumn = "";
        this.lineSelected = null;
        this._init();
        this.draw(options.data);
    }

    _init() {
        d3.select(this.el).selectAll("*").remove();

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

    setSelectedColumn(col) {
        this.selectedColumn = col;
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

        const x = d3.scalePoint().range([0, w]).padding(1).domain(dimensions);
        const y = {};
        for (let col of dimensions) {
            y[col] = d3.scaleLinear().domain([0, 6]).range([h, 0]);
        }

        const isNumericColumn = self.selectedColumn &&
            !isNaN(+data.find(d => d[self.selectedColumn] !== "" && d[self.selectedColumn] != null)?.[self.selectedColumn]);

        let colorScale;
        if (self.selectedColumn) {
            const values = data.map(d => d[self.selectedColumn]).filter(d => d !== "" && d != null);
            if (isNumericColumn) {
                const extent = d3.extent(values, v => +v);
                colorScale = d3.scaleSequential(d3.interpolatePlasma).domain(extent);
            } else {
                const categories = [...new Set(values)];
                colorScale = d3.scaleOrdinal(d3.schemeCategory10).domain(categories);
            }
        } else {
            colorScale = () => "#69b3a2";
        }

        function path(d) {
            const line = [];
            for (let p of dimensions) {
                const val = d[p];
                if (val === "" || val == null) {
                    line.push([x(p), missingY]);
                    break;
                } else {
                    line.push([x(p), y[p](+val)]);
                }
            }
            return d3.line()(line);
        }

        svg.selectAll("line-parallel")
            .data(data)
            .enter().append("path")
            .attr("d", path)
            .style("fill", "none")
            .style("stroke", d => self.selectedColumn ? colorScale(d[self.selectedColumn]) : "#9031d9ff")
            .style("opacity", 0.44)
            .on("mouseover", function (event, d) {
                d3.select(event.currentTarget)
                    .style("stroke", "#ffcc00")
                    .style("stroke-width", 3)
                    .style("opacity", 1);

                self.tooltip
                    .style("display", "block")
                    .html(`<strong>ID:</strong> ${d.ID_PACIENTE}`)
                    .style("left", (event.pageX + 10) + "px")
                    .style("top", (event.pageY - 28) + "px");
            })
            .on("mouseout", function (event, d) {
                d3.select(event.currentTarget)
                    .style("stroke", self.selectedColumn ? colorScale(d[self.selectedColumn]) : "#9031d9ff")
                    .style("stroke-width", 1)
                    .style("opacity", 0.5);

                self.tooltip.style("display", "none");
            })
            .on("click", (event, d) => {
                self.lineSelected = d;
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
