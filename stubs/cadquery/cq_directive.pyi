from cadquery import Assembly as Assembly, Color as Color, Compound as Compound, Sketch as Sketch, cqgi as cqgi, exporters as exporters
from cadquery.occ_impl.jupyter_tools import DEFAULT_COLOR as DEFAULT_COLOR, TEMPLATE_RENDER as TEMPLATE_RENDER, dumps as dumps, toJSON as toJSON
from docutils.parsers.rst import Directive
from typing import Any

template: str
template_content_indent: str
rendering_code: str
template_vtk: str

class cq_directive(Directive):
    has_content: bool
    required_arguments: int
    optional_arguments: int
    option_spec: Any
    def run(self): ...

class cq_directive_vtk(Directive):
    has_content: bool
    required_arguments: int
    optional_arguments: int
    option_spec: Any
    def run(self): ...

def setup(app) -> None: ...
