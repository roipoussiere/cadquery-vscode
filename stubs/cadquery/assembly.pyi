from .cq import Workplane as Workplane
from .occ_impl.assembly import Color as Color
from .occ_impl.exporters.assembly import exportAssembly as exportAssembly, exportCAF as exportCAF, exportGLTF as exportGLTF, exportVRML as exportVRML, exportVTKJS as exportVTKJS
from .occ_impl.geom import Location as Location
from .occ_impl.shapes import Compound as Compound, Shape as Shape
from .occ_impl.solver import BinaryConstraintKind as BinaryConstraintKind, ConstraintSolver as ConstraintSolver, ConstraintSpec as Constraint, UnaryConstraintKind as UnaryConstraintKind
from typing import Any, Dict, Iterator, List, Optional, Tuple, Union, overload

AssemblyObjects = Union[Shape, Workplane, None]
ConstraintKinds: Any
ExportLiterals: Any
PATH_DELIM: str

class Assembly:
    loc: Location
    name: str
    color: Optional[Color]
    metadata: Dict[str, Any]
    obj: AssemblyObjects
    parent: Optional['Assembly']
    children: List['Assembly']
    objects: Dict[str, 'Assembly']
    constraints: List[Constraint]
    def __init__(self, obj: AssemblyObjects = ..., loc: Optional[Location] = ..., name: Optional[str] = ..., color: Optional[Color] = ..., metadata: Optional[Dict[str, Any]] = ...) -> None: ...
    @overload
    def add(self, obj: Assembly, loc: Optional[Location] = ..., name: Optional[str] = ..., color: Optional[Color] = ...) -> Assembly: ...
    @overload
    def add(self, obj: AssemblyObjects, loc: Optional[Location] = ..., name: Optional[str] = ..., color: Optional[Color] = ...) -> Assembly: ...
    @overload
    def constrain(self, q1: str, q2: str, kind: ConstraintKinds, param: Any = ...) -> Assembly: ...
    @overload
    def constrain(self, q1: str, kind: ConstraintKinds, param: Any = ...) -> Assembly: ...
    @overload
    def constrain(self, id1: str, s1: Shape, id2: str, s2: Shape, kind: ConstraintKinds, param: Any = ...) -> Assembly: ...
    @overload
    def constrain(self, id1: str, s1: Shape, kind: ConstraintKinds, param: Any = ...) -> Assembly: ...
    def solve(self) -> Assembly: ...
    def save(self, path: str, exportType: Optional[ExportLiterals] = ..., tolerance: float = ..., angularTolerance: float = ...) -> Assembly: ...
    @classmethod
    def load(cls, path: str) -> Assembly: ...
    @property
    def shapes(self) -> List[Shape]: ...
    def traverse(self) -> Iterator[Tuple[str, 'Assembly']]: ...
    def toCompound(self) -> Compound: ...
