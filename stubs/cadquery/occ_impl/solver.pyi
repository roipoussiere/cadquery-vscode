from ..types import Real as Real
from .geom import Location as Location, Plane as Plane, Vector as Vector
from .shapes import Edge as Edge, Face as Face, Shape as Shape, Wire as Wire
from OCP.gp import gp_Dir, gp_Lin, gp_Pln, gp_Pnt, gp_Trsf
from typing import Any, Callable, Dict, List, Optional, Tuple, Type, Union

NoneType: Any
DOF6 = Tuple[float, float, float, float, float, float]
ConstraintMarker = Union[gp_Pln, gp_Dir, gp_Pnt, gp_Lin, None]
UnaryConstraintKind: Any
BinaryConstraintKind: Any
ConstraintKind: Any
ConstraintInvariants: Any
CompoundConstraints: Dict[ConstraintKind, Tuple[Tuple[ConstraintKind, ...], Callable[[Any], Tuple[Any, ...]]]]
Constraint = Tuple[Tuple[ConstraintMarker, ...], ConstraintKind, Optional[Any]]
NDOF: int
DIR_SCALING: float
DIFF_EPS: float
TOL: float
MAXITER: int

class ConstraintSpec:
    objects: Tuple[str, ...]
    args: Tuple[Shape, ...]
    sublocs: Tuple[Location, ...]
    kind: ConstraintKind
    param: Any
    def __init__(self, objects: Tuple[str, ...], args: Tuple[Shape, ...], sublocs: Tuple[Location, ...], kind: ConstraintKind, param: Any = ...) -> None: ...
    def toPODs(self) -> Tuple[Constraint, ...]: ...

def point_cost(m1: gp_Pnt, m2: gp_Pnt, t1: gp_Trsf, t2: gp_Trsf, val: Optional[float] = ...) -> float: ...
def axis_cost(m1: gp_Dir, m2: gp_Dir, t1: gp_Trsf, t2: gp_Trsf, val: Optional[float] = ...) -> float: ...
def point_in_plane_cost(m1: gp_Pnt, m2: gp_Pln, t1: gp_Trsf, t2: gp_Trsf, val: Optional[float] = ...) -> float: ...
def point_on_line_cost(m1: gp_Pnt, m2: gp_Lin, t1: gp_Trsf, t2: gp_Trsf, val: Optional[float] = ...) -> float: ...
def fixed_cost(m1: Type[None], t1: gp_Trsf, val: Optional[Type[None]] = ...): ...
def fixed_point_cost(m1: gp_Pnt, t1: gp_Trsf, val: Tuple[float, float, float]): ...
def fixed_axis_cost(m1: gp_Dir, t1: gp_Trsf, val: Tuple[float, float, float]): ...
def fixed_rotation_axis_cost(m1: gp_Dir, t1: gp_Trsf, val: Tuple[int, float]): ...

costs: Dict[str, Callable[..., float]]

class ConstraintSolver:
    entities: List[DOF6]
    constraints: List[Tuple[Tuple[int, ...], Constraint]]
    locked: List[int]
    ne: int
    nc: int
    def __init__(self, entities: List[Location], constraints: List[Tuple[Tuple[int, ...], Constraint]], locked: List[int] = ...) -> None: ...
    def solve(self) -> Tuple[List[Location], Dict[str, Any]]: ...
