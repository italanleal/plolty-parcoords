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
- `color_encode_column` (String; optional)
- `data` (Array of Dicts; optional)
- `do_color` (Bool; optional)
- `height` (Real; optional)
- `line` (Dict; optional)
- `margin` (optional): . margin has the following type: lists containing elements 'top', 'right', 'bottom', 'left'.
Those elements have the following types:
  - `top` (Real; optional)
  - `right` (Real; optional)
  - `bottom` (Real; optional)
  - `left` (Real; optional)
- `ordinal_scale` (Bool; optional)
- `width` (Real; optional)
"""
function ''_parallel(; kwargs...)
        available_props = Symbol[:id, :color_encode_column, :data, :do_color, :height, :line, :margin, :ordinal_scale, :width]
        wild_props = Symbol[]
        return Component("''_parallel", "Parallel", "parcoords", available_props, wild_props; kwargs...)
end

