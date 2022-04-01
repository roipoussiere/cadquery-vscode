from ...cq import Plane as Plane, Workplane as Workplane
from ...units import RAD2DEG as RAD2DEG
from ..shapes import Edge as Edge
from .utils import toCompound as toCompound
from typing import Any

CURVE_TOLERANCE: float
DXF_CONVERTERS: Any

def exportDXF(w: Workplane, fname: str): ...
