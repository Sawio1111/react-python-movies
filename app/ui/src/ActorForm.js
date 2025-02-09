import { useState, useEffect } from "react"

export const ActorForm = ({handleOnAdd}) => {
    const [name, setName] = useState(null)
    const [surname, setSurname] = useState(null)
    const [message, setMessage] = useState(null)
    const [disabledAdd, setDisabledAdd] =useState(true)

    useEffect(() => {
        messageCalculation(surname, setMessage)
    }, [surname])

    useEffect(() => {})

    const messageCalculation = (text) => {
        const titleLength = text?.length || 0;
        if (titleLength === 0) {
            setMessage('')
            setDisabledAdd(true)
        }
        else if (titleLength < 5) {
            setMessage(`${text} is too short`);
            setDisabledAdd(true)
        } else if (titleLength <= 15) {
            setMessage(`${text} Approved`);
            setDisabledAdd(false)
        } else {
            setMessage(`${text} is too long`);
            setDisabledAdd(true)
        }
    }

    const clearInputs = () => {
        setName('')
        setSurname('')
      }
      
    const handleFormAdd = () => {
        handleOnAdd(name, surname)
        clearInputs()
    }

    const handleName = (event) => {
      setName(event.target.value)
     
    }

    const handleSurname = (event) => {
    setSurname(event.target.value)
    }


    return <>
        <h2>Add Actors</h2>
        <div>
          <h3 style={{ fontWeight: 'bold' }}>Surname</h3>
          <input type="text" value={surname} onChange={handleSurname}/>
          <div>{message}</div>
          <h3 style={{ fontWeight: 'bold' }}>Name</h3>
          <input type="text" value={name} onChange={handleName}/>
          <button disabled={disabledAdd} onClick={handleFormAdd}>Add Actor</button>
        </div>
        </>
}