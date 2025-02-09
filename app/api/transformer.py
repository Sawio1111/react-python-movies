from sentence_transformers import SentenceTransformer

model_transformer = SentenceTransformer('all-MiniLM-L6-v2')

def transform_movie_to_vector(movie):
    description_text = f"{movie.title}. {movie.description}. Directed by {movie.director}. Year {movie.year}"
    actors_list = ", ".join([f"{actor.name} {actor.surname}" for actor in movie.actors])
    full_text = f"{description_text}. Starring: {actors_list}"
        
    return model_transformer.encode(full_text).tolist()