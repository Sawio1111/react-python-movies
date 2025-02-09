export const Actors = ({actors, handleOnDelete}) => {

    const emptyMessage = "None actors is added"

    const handleActorsDelete = (event) => {
        handleOnDelete(event.target.value)
    }
    return (
        actors?.length ? ( 
        <div>
            <h2>Actors</h2>
            <ul>
            {actors.map((el) => <li key={el.id}>{el.name} {el.surname} 
            <button value={el.id} onClick={handleActorsDelete}>Delete</button></li>)}
            </ul>
          </div>) : <p style={{ fontSize: 'larger', fontWeight: 'bold' }}>{emptyMessage}</p>
        )
}