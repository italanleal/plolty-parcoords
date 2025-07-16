# AUTO GENERATED FILE - DO NOT EDIT

import typing  # noqa: F401
import numbers # noqa: F401
from typing_extensions import TypedDict, NotRequired, Literal # noqa: F401
from dash.development.base_component import Component, _explicitize_args
try:
    from dash.development.base_component import ComponentType # noqa: F401
except ImportError:
    ComponentType = typing.TypeVar("ComponentType", bound=Component)


class Parallel(Component):
    """A Parallel component.
ExampleComponent is an example component.
It takes a property, `label`, and
displays it.
It renders an input with the property `value`
which is editable by the user.

Keyword arguments:

- id (string; optional):
    The ID used to identify this component in Dash callbacks.

- color_encode_column (string; optional)

- data (list of dicts; optional)

- do_color (boolean; optional)

- height (number; optional)

- line (dict; optional)

- margin (dict; optional)

    `margin` is a dict with keys:

    - top (number; optional)

    - right (number; optional)

    - bottom (number; optional)

    - left (number; optional)

- ordinal_scale (boolean; optional)

- width (number; optional)"""
    _children_props = []
    _base_nodes = ['children']
    _namespace = 'parcoords'
    _type = 'Parallel'
    Margin = TypedDict(
        "Margin",
            {
            "top": NotRequired[typing.Union[int, float, numbers.Number]],
            "right": NotRequired[typing.Union[int, float, numbers.Number]],
            "bottom": NotRequired[typing.Union[int, float, numbers.Number]],
            "left": NotRequired[typing.Union[int, float, numbers.Number]]
        }
    )

    @_explicitize_args
    def __init__(
        self,
        id: typing.Optional[typing.Union[str, dict]] = None,
        data: typing.Optional[typing.Sequence[dict]] = None,
        do_color: typing.Optional[bool] = None,
        ordinal_scale: typing.Optional[bool] = None,
        color_encode_column: typing.Optional[str] = None,
        width: typing.Optional[typing.Union[int, float, numbers.Number]] = None,
        height: typing.Optional[typing.Union[int, float, numbers.Number]] = None,
        margin: typing.Optional["Margin"] = None,
        line: typing.Optional[dict] = None,
        **kwargs
    ):
        self._prop_names = ['id', 'color_encode_column', 'data', 'do_color', 'height', 'line', 'margin', 'ordinal_scale', 'width']
        self._valid_wildcard_attributes =            []
        self.available_properties = ['id', 'color_encode_column', 'data', 'do_color', 'height', 'line', 'margin', 'ordinal_scale', 'width']
        self.available_wildcard_properties =            []
        _explicit_args = kwargs.pop('_explicit_args')
        _locals = locals()
        _locals.update(kwargs)  # For wildcard attrs and excess named props
        args = {k: _locals[k] for k in _explicit_args}

        super(Parallel, self).__init__(**args)
