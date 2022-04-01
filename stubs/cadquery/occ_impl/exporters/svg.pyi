from ..geom import BoundBox as BoundBox
from ..shapes import Compound as Compound, Shape as Shape, TOLERANCE as TOLERANCE
from typing import Any

DISCRETIZATION_TOLERANCE: float
SVG_TEMPLATE: str
AXES_TEMPLATE: str
PATHTEMPLATE: str

class UNITS:
    MM: str
    IN: str

def guessUnitOfMeasure(shape): ...
def makeSVGedge(e): ...
def getPaths(visibleShapes, hiddenShapes): ...
def getSVG(shape, opts: Any | None = ...): ...
def exportSVG(shape, fileName: str, opts: Any | None = ...): ...
