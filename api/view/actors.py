from fastapi import APIRouter, HTTPException
from typing import List
import models
import schema

from utils import details_not_exist


router = APIRouter()

@router.get("/", response_model=List[schema.Actor])
def get_actors():
    return list(models.Actor.select())

@router.get("/{actor_id}", response_model=schema.Actor)
def get_actor(actor_id: int):
    try:
        actor = models.Actor.get(models.Actor.id == actor_id)
    except models.Actor.DoesNotExist:
        raise HTTPException(status_code=404, detail=details_not_exist("Actor", actor_id))
    return actor

@router.post("/", response_model=schema.Actor)
def add_actor(actor: schema.ActorCreate):
    new_actor = models.Actor.create(**actor.model_dump())
    return new_actor

@router.delete("/{actor_id}", response_model=schema.Actor)
def delete_actor(actor_id: int):
    try:
        actor = models.Actor.get(models.Actor.id == actor_id)
        actor.delete_instance()
        return actor
    except models.Actor.DoesNotExist:
        raise HTTPException(status_code=404, detail=details_not_exist("Actor", actor_id))
