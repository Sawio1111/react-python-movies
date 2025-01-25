from typing import Any, List, Union
import peewee
from pydantic import BaseModel
from pydantic.utils import GetterDict


class PeeweeGetterDict(GetterDict):
    def get(self, key: Any, default: Any = None):
        res = getattr(self._obj, key, default)
        if isinstance(res, peewee.ModelSelect):
            return list(res)
        return res

class MovieCreate(BaseModel):
    title: str
    year: int
    director: Union[str, None] = None
    description: Union[str, None] = None

class MovieBase(MovieCreate):
    id: int

class ActorCreate(BaseModel):
    name: str
    surname: str
      
class Actor(ActorCreate):
    id: int
    
class Movie(MovieBase):
    id: int
    actors: List[Actor] = []

    class Config:
        orm_mode = True
        getter_dict = PeeweeGetterDict
