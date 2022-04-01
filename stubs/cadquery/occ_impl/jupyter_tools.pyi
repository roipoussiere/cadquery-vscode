from ..assembly import Assembly as Assembly
from .assembly import toJSON as toJSON
from .exporters.vtk import toString as toString
from .shapes import Shape as Shape
from typing import Any

DEFAULT_COLOR: Any
TEMPLATE_RENDER: str
TEMPLATE: Any

def display(shape): ...
