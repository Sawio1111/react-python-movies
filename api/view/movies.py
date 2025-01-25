from fastapi import APIRouter, HTTPException
from typing import List
import models
import schema

from utils import details_not_exist


router = APIRouter()

@router.get("/", response_model=List[schema.Movie])
def get():
    return list(models.Movie.select())

@router.get("/{movie_id}", response_model=schema.Movie)
def get_movie(movie_id: int):
    try:
        movie = models.Movie.get(models.Movie.id == movie_id)
    except models.Movie.DoesNotExist:
        raise HTTPException(status_code=404, detail=details_not_exist("Movie", movie_id))
    return movie

@router.post("/", response_model=schema.Movie)
def add_movie(movie: schema.MovieCreate):
    new_movie = models.Movie.create(**movie.model_dump())
    return new_movie

@router.delete("/{movie_id}", response_model=schema.Movie)
def delete_movie(movie_id: int):
    try:
        movie = models.Movie.get(models.Movie.id == movie_id)
        movie.delete_instance()
        return movie
    except models.Movie.DoesNotExist:
        raise HTTPException(status_code=404, detail=details_not_exist("Movie", movie_id))
    
@router.post("/{movie_id}/actors", response_model=schema.Movie)
def assign_actor_to_movie(movie_id: int, actor_id: int):
    try:
        movie = models.Movie.get(models.Movie.id == movie_id)
        actor = models.Actor.get(models.Actor.id == actor_id)
        
        if movie.actors.where(models.Actor.id == actor_id).exists():
            raise HTTPException(
                status_code=400,
                detail=f"Actor with id {actor_id} is already assigned to movie with id {movie_id}"
            )
        
        movie.actors.add(actor)
        return movie
    except models.Movie.DoesNotExist:
        raise HTTPException(status_code=404, detail=details_not_exist("Movie", id))
    except models.Actor.DoesNotExist:
        raise HTTPException(status_code=404, detail=details_not_exist("Actor", id))