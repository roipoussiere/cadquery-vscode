from multimethod import multimethod
from typing import Any

class deprecate_kwarg:
    name: Any
    new_value: Any
    def __init__(self, name, new_value) -> None: ...
    def __call__(self, f): ...

class deprecate:
    def __call__(self, f): ...

class cqmultimethod(multimethod):
    def __call__(self, *args, **kwargs): ...

class deprecate_kwarg_name:
    name: Any
    new_name: Any
    def __init__(self, name, new_name) -> None: ...
    def __call__(self, f): ...
