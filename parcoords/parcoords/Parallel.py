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

- color_encode_columns (list of strings; optional)

- data (list of dicts; optional)

- height (number; optional)

- line (dict; optional)

- selectedPath (list of strings; optional)

- width (number; optional)"""
    _children_props = []
    _base_nodes = ['children']
    _namespace = 'parcoords'
    _type = 'Parallel'

    @_explicitize_args
    def __init__(
        self,
        id: typing.Optional[typing.Union[str, dict]] = None,
        data: typing.Optional[typing.Sequence[dict]] = None,
        color_encode_columns: typing.Optional[typing.Sequence[str]] = None,
        line: typing.Optional[dict] = None,
        selectedPath: typing.Optional[typing.Sequence[str]] = None,
        width: typing.Optional[typing.Union[int, float, numbers.Number]] = None,
        height: typing.Optional[typing.Union[int, float, numbers.Number]] = None,
        **kwargs
    ):
        self._prop_names = ['id', 'color_encode_columns', 'data', 'height', 'line', 'selectedPath', 'width']
        self._valid_wildcard_attributes =            []
        self.available_properties = ['id', 'color_encode_columns', 'data', 'height', 'line', 'selectedPath', 'width']
        self.available_wildcard_properties =            []
        _explicit_args = kwargs.pop('_explicit_args')
        _locals = locals()
        _locals.update(kwargs)  # For wildcard attrs and excess named props
        args = {k: _locals[k] for k in _explicit_args}

        super(Parallel, self).__init__(**args)
