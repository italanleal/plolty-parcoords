# AUTO GENERATED FILE - DO NOT EDIT

#' @export
''Parallel <- function(id=NULL, color_encode_columns=NULL, data=NULL, height=NULL, line=NULL, selectedPath=NULL, width=NULL) {
    
    props <- list(id=id, color_encode_columns=color_encode_columns, data=data, height=height, line=line, selectedPath=selectedPath, width=width)
    if (length(props) > 0) {
        props <- props[!vapply(props, is.null, logical(1))]
    }
    component <- list(
        props = props,
        type = 'Parallel',
        namespace = 'parcoords',
        propNames = c('id', 'color_encode_columns', 'data', 'height', 'line', 'selectedPath', 'width'),
        package = 'parcoords'
        )

    structure(component, class = c('dash_component', 'list'))
}
