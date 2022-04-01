from ..types import Real as Real
from .shapes import Geoms as Geoms
from typing import Any, Callable, Dict, Iterable, List, Optional, Sequence, Tuple, Union

NoneType: Any
SegmentDOF = Tuple[float, float, float, float]
ArcDOF = Tuple[float, float, float, float, float]
DOF = Union[SegmentDOF, ArcDOF]
ConstraintKind: Any
ConstraintInvariants: Any
Constraint = Tuple[Tuple[int, Optional[int]], ConstraintKind, Optional[Any]]
DIFF_EPS: float
TOL: float
MAXITER: int

def invalid_args(*t): ...
def arc_first(x): ...
def arc_last(x): ...
def arc_point(x, val): ...
def line_point(x, val): ...
def arc_first_tangent(x): ...
def arc_last_tangent(x): ...
def fixed_cost(x, t, x0, val): ...
def fixed_point_cost(x, t, x0, val): ...
def coincident_cost(x1, t1, x10, x2, t2, x20, val): ...
def angle_cost(x1, t1, x10, x2, t2, x20, val): ...
def length_cost(x, t, x0, val): ...
def distance_cost(x1, t1, x10, x2, t2, x20, val): ...
def radius_cost(x, t, x0, val): ...
def orientation_cost(x, t, x0, val): ...
def arc_angle_cost(x, t, x0, val): ...

costs: Dict[str, Callable[..., float]]

class SketchConstraintSolver:
    entities: List[DOF]
    constraints: List[Constraint]
    geoms: List[Geoms]
    ne: int
    nc: int
    ixs: List[int]
    def __init__(self, entities: Iterable[DOF], constraints: Iterable[Constraint], geoms: Iterable[Geoms]) -> None: ...
    def solve(self) -> Tuple[Sequence[Sequence[float]], Dict[str, Any]]: ...