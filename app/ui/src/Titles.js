

export const Titles = ({movies, handleOnDelete}) => {

    const emptyMessage = "None movies is added"

    const handleMovieDelete = (event) => {
        handleOnDelete(event.target.value)
    }
    return (
        movies?.length ? ( 
        <div>
            <h2>Titles</h2>
            <ul>
            {movies.map((el) => <li key={el.id}>{el.title} ({el.year}) Actors: {el.actors?.map((ac) => `${ac.name}, ${ac.surname} `)} Description: {el.description}
            <button value={el.id} onClick={handleMovieDelete}>Delete</button></li>)}
            </ul>
          </div>) : <p style={{ fontSize: 'larger', fontWeight: 'bold' }}>{emptyMessage}</p>
        )
}