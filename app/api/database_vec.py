from qdrant_client import QdrantClient
from qdrant_client.models import Distance, VectorParams, PointStruct
from sentence_transformers import SentenceTransformer
from transformer import transform_movie_to_vector

QDRANT_HOST = "qdrant"
QDRANT_PORT = 6333
COLLECTION_NAME = "movies_db_collection"
VECTOR_DIMENSION = 384

class DBVector:
    def __init__(self):
        self.client_db_vector = QdrantClient(QDRANT_HOST, port=QDRANT_PORT)
        self.transformer = SentenceTransformer('all-MiniLM-L6-v2')
        
        self.client_db_vector.recreate_collection(
            collection_name=COLLECTION_NAME,
            vectors_config=VectorParams(size=VECTOR_DIMENSION, distance=Distance.COSINE)

    )

    def upsert_movie(self, movie):
        
        self.client_db_vector.upsert(
            collection_name=COLLECTION_NAME,
            points=[self._make_point(movie)]
        )
        
    def delete_movie(self, movie_id):
        self.client_db_vector.delete(
            collection_name=COLLECTION_NAME,
            points_selector=[movie_id]
        )
        
    def count_movies(self):
        collection_info = self.client_db_vector.get_collection(collection_name=COLLECTION_NAME)
        return collection_info.points_count
    
    def search_movies(self, query, top_k=2):
        query_vector = self.transformer.encode(query).tolist()
        search_result = self.client_db_vector.search(
            collection_name=COLLECTION_NAME,
            query_vector=query_vector,
            limit=top_k
        )
        return search_result
    
    def _make_point(self, movie):
        return PointStruct(
            id=movie.id,
            vector=transform_movie_to_vector(movie),
            payload=self._make_payload(movie)
        )
    
    def _make_payload(self, movie):
        return {
            "title": movie.title,
            "description": movie.description,
            "director": movie.director,
            "year": movie.year,
            "actors": ",".join([f"{actor.name} {actor.surname}" for actor in movie.actors])
        }
    
db_vector = DBVector()
