from peewee import *

from database import db
from database_vec import db_vector

class BaseModel(Model):
    class Meta:
        database = db

class Actor(BaseModel):
    name = CharField()
    surname = CharField()

class Movie(BaseModel):
    title = CharField()
    director = CharField(null=True)
    year = IntegerField()
    description = TextField(null=True)
    actors = ManyToManyField(Actor, backref='movies')

ActorMovie = Movie.actors.get_through_model()

db.connect()
db.create_tables([Actor, Movie, ActorMovie], safe=True)

actors_data = [
    {"name": "Leonardo", "surname": "DiCaprio"},
    {"name": "Morgan", "surname": "Freeman"},
    {"name": "Robert", "surname": "De Niro"},
    {"name": "Scarlett", "surname": "Johansson"},
    {"name": "Tom", "surname": "Hanks"},
    {"name": "Brad", "surname": "Pitt"},
    {"name": "Angelina", "surname": "Jolie"},
    {"name": "Johnny", "surname": "Depp"},
    {"name": "Meryl", "surname": "Streep"},
    {"name": "Christian", "surname": "Bale"}
]

movies_data = [
    {"title": "Inception", "director": "Christopher Nolan", "year": 2010, "description": "A mind-bending thriller."},
    {"title": "The Shawshank Redemption", "director": "Frank Darabont", "year": 1994, "description": "Hope is a good thing."},
    {"title": "The Irishman", "director": "Martin Scorsese", "year": 2019, "description": "An epic gangster saga."},
    {"title": "Lost in Translation", "director": "Sofia Coppola", "year": 2003, "description": "A story of loneliness and connection."},
    {"title": "Forrest Gump", "director": "Robert Zemeckis", "year": 1994, "description": "Life is like a box of chocolates."},
    {"title": "Fight Club", "director": "David Fincher", "year": 1999, "description": "An underground fight club turns into a revolution."},
    {"title": "Pirates of the Caribbean", "director": "Gore Verbinski", "year": 2003, "description": "A swashbuckling adventure with Captain Jack Sparrow."},
    {"title": "The Dark Knight", "director": "Christopher Nolan", "year": 2008, "description": "Batman faces his greatest enemy, the Joker."},
    {"title": "Titanic", "director": "James Cameron", "year": 1997, "description": "A tragic love story aboard the doomed Titanic."},
    {"title": "The Wolf of Wall Street", "director": "Martin Scorsese", "year": 2013, "description": "The rise and fall of stockbroker Jordan Belfort."}
]

actors = []
for actor_data in actors_data:
    actor, _ = Actor.get_or_create(**actor_data)
    actors.append(actor)

movies = []
for movie_data in movies_data:
    movie, _ = Movie.get_or_create(**movie_data)
    movies.append(movie)

movie_actor_pairs = [
    (movies[0], [actors[0], actors[3]]),
    (movies[1], [actors[1]]),
    (movies[2], [actors[2], actors[0]]),
    (movies[3], [actors[3]]),
    (movies[4], [actors[4], actors[1]]),
    (movies[5], [actors[5], actors[3]]),
    (movies[6], [actors[7], actors[6]]),
    (movies[7], [actors[9], actors[0]]),
    (movies[8], [actors[0], actors[6]]),
    (movies[9], [actors[0], actors[8]]),
]

for movie, movie_actors in movie_actor_pairs:
    movie.actors.add(movie_actors)

movies = Movie.select()

for movie in movies:
    db_vector.upsert_movie(movie)

db.close()
