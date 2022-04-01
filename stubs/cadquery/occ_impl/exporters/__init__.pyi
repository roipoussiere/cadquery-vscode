from ...cq import Workplane
from ..shapes import Shape as Shape
from .amf import AmfWriter as AmfWriter
from .dxf import exportDXF as exportDXF
from .json import JsonMesh as JsonMesh
from .svg import getSVG as getSVG
from .utils import toCompound as toCompound
from .vtk import exportVTP as exportVTP
from typing import Any, IO, Optional, Union

class ExportTypes:
    STL: str
    STEP: str
    AMF: str
    SVG: str
    TJS: str
    DXF: str
    VRML: str
    VTP: str

ExportLiterals: Any

def export(w: Union[Shape, Workplane], fname: str, exportType: Optional[ExportLiterals] = ..., tolerance: float = ..., angularTolerance: float = ..., opt: Any | None = ...): ...
def toString(shape, exportType, tolerance: float = ..., angularTolerance: float = ...): ...
def exportShape(w: Union[Shape, Workplane], exportType: ExportLiterals, fileLike: IO, tolerance: float = ..., angularTolerance: float = ...): ...
def readAndDeleteFile(fileName): ...
