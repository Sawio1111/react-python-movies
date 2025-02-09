export const AttachActorForm = ({movies, actors, handleOnAdd}) => {
    const onAttach = (e) => {
        e.preventDefault();
        const movieId = e.target.movie.value;
        const actorId = e.target.actor.value;
        handleOnAdd(movieId, actorId);
    };
    return <>
        <h2>Add actor to movie</h2>
        <form onSubmit={(e) => onAttach(e)}>
            <div>
                <label htmlFor="movie">Select Movie:</label>
                <select id="movie" name="movie">
                    {movies.map(movie => (
                        <option key={movie.id} value={movie.id}>{movie.title}</option>
                    ))}
                </select>
            </div>
            <div>
                <label htmlFor="actor">Select Actor:</label>
                <select id="actor" name="actor">
                    {actors.map(actor => (
                        <option key={actor.id} value={actor.id}>{actor.name} {actor.surname}</option>
                    ))}
                </select>
            </div>
            <button type="submit">Add Actor to Movie</button>
        </form>
    </>
}