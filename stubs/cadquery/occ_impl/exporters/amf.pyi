from typing import Any

class AmfWriter:
    units: str
    tessellation: Any
    def __init__(self, tessellation) -> None: ...
    def writeAmf(self, outFile) -> None: ...
