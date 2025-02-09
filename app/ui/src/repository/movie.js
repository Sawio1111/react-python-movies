export const AddMovie = async (movie, movies, setMovies) => {
    const response = await fetch('/movies', {
        method: 'POST',
        body: JSON.stringify(movie),
        headers: { 'Content-Type': 'application/json' }
      });
    if (response.ok) {
        const newMovie = await response.json();
        setMovies([...movies, newMovie]);
        alert('Movie added successfully');
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
        setMovies(allMovies);
    } else {
        alert('Failed to fetch movies');
    }
};

export const DeleteMovie = async (id, movies, setMovies) => {
    if (!movies) return;
    const response = await fetch(`/movies/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
    });
    if (response.ok) {
        const deleteMovie = await response.json();
        setMovies(movies.filter(movie => movie.id !== deleteMovie.id));
        alert('Movie deleted successfully');
    } else {
        alert('Failed to delete movie');
    }
};

export const AttachActorToMovie = async (movieId, actorId, movies, setMovies) => {
    const response = await fetch(`/movies/${movieId}/actors/${actorId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
    });
    if (response.ok) {
        const updatedMovie = await response.json();
        setMovies(movies.map(movie => movie.id === updatedMovie.id ? updatedMovie : movie));
        alert('Actor attached to movie successfully');
    } else {
        alert('Failed to attach actor to movie');
    }
};

export const SearchMovies = async (query, setSMovies) => {
    const response = await fetch(`/movies/search/?query=${query}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    });
    if (response.ok) {
        const searchResults = await response.json();
        setSMovies(searchResults);
        alert('Movies searched successfully');
    } else {
        alert('Failed to search movies');
    }
};