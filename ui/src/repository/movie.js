export const AddMovie = async (movie, movies, setMovies) => {
    console.log(movies, "ADD")
    const response = await fetch('/movies', {
        method: 'POST',
        body: JSON.stringify(movie),
        headers: { 'Content-Type': 'application/json' }
      });
    if (response.ok) {
        const newMovie = await response.json()
        setMovies([...movies, newMovie]);
    } else {
        alert('Failed to add movie');
    }
}

export const GetMovies = async (setMovies) => {
    const response = await fetch('/movies', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    });
    if (response.ok) {
        const allMovies = await response.json();
        setMovies(allMovies)
    } else {
        alert('Failed to fetch movies');
    }
};

export const DeleteMovie = async (id, movies, setMovies) => {
    if (!movies) return
    const response = await fetch(`/movies/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
    });
    if (response.ok) {
        const deleteMovie = await response.json()
        setMovies(movies.filter(movie => movie.id !== deleteMovie.id));
    } else {
        alert('Failed to delete movie');
    }
};

export const AttachActorToMovie = async (movieId, actorId, movies, setMovies) => {
    const response = await fetch(`/movies/${movieId}/actors`, {
        method: 'POST',
        body: JSON.stringify({ actorId }),
        headers: { 'Content-Type': 'application/json' }
    });
    if (response.ok) {
        const updatedMovie = await response.json();
        setMovies(movies.map(movie => movie.id === movieId ? updatedMovie : movie));
        console.log(updatedMovie)
    } else {
        alert('Failed to attach actor to movie');
    }
};
