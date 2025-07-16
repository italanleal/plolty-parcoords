# AUTO GENERATED FILE - DO NOT EDIT

#' @export
''Parallel <- function(id=NULL, color_encode_column=NULL, data=NULL, do_color=NULL, height=NULL, line=NULL, margin=NULL, ordinal_scale=NULL, width=NULL) {
    
    props <- list(id=id, color_encode_column=color_encode_column, data=data, do_color=do_color, height=height, line=line, margin=margin, ordinal_scale=ordinal_scale, width=width)
    if (length(props) > 0) {
        props <- props[!vapply(props, is.null, logical(1))]
    }
    component <- list(
        props = props,
        type = 'Parallel',
        namespace = 'parcoords',
        propNames = c('id', 'color_encode_column', 'data', 'do_color', 'height', 'line', 'margin', 'ordinal_scale', 'width'),
        package = 'parcoords'
        )

    structure(component, class = c('dash_component', 'list'))
}
