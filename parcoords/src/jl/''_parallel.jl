# AUTO GENERATED FILE - DO NOT EDIT

export ''_parallel

"""
    ''_parallel(;kwargs...)

A Parallel component.
ExampleComponent is an example component.
It takes a property, `label`, and
displays it.
It renders an input with the property `value`
which is editable by the user.
Keyword arguments:
- `id` (String; optional): The ID used to identify this component in Dash callbacks.
- `color_encode_columns` (Array of Strings; optional)
- `data` (Array of Dicts; optional)
- `height` (Real; optional)
- `line` (Dict; optional)
- `selectedPath` (Array of Strings; optional)
- `width` (Real; optional)
"""
function ''_parallel(; kwargs...)
        available_props = Symbol[:id, :color_encode_columns, :data, :height, :line, :selectedPath, :width]
        wild_props = Symbol[]
        return Component("''_parallel", "Parallel", "parcoords", available_props, wild_props; kwargs...)
end

