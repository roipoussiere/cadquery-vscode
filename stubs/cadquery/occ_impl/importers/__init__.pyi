from ..shapes import Shape as Shape
from typing import Any

RAD2DEG: Any

class ImportTypes:
    STEP: str
    DXF: str

class UNITS:
    MM: str
    IN: str

def importShape(importType, fileName, *args, **kwargs): ...
def importStep(fileName): ...
def importDXF(filename, tol: float = ..., exclude=...): ...
