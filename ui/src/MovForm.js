import { useState, useEffect } from "react"

import { MyFav } from './MyFav';


export const MovForm = ({handleOnAdd}) => {
    const [title, setTitle] = useState(null)
    const [year, setYear] = useState(null)
    const [message, setMessage] = useState(null)
    const [disabledAdd, setDisabledAdd] =useState(true)

    useEffect(() => {
        messageCalculation(title)
    }, [title])

    const messageCalculation = (title) => {
        const titleLength = title?.length || 0;
        if (titleLength === 0) {
            setMessage('')
            setDisabledAdd(true)
        }
        else if (titleLength < 5) {
            setMessage('The title is too short. Do they make such movies?');
            setDisabledAdd(true)
        } else if (titleLength <= 15) {
            setMessage('The title is just right for a movie poster');
            setDisabledAdd(false)
        } else {
            setMessage('The title is too long');
            setDisabledAdd(true)
        }
    }

    const clearInputs = () => {
        setTitle('')
        setYear('')
      }
      
    const handleFormAdd = () => {
        handleOnAdd(title, year)
        clearInputs()
    }

    const handleTitle = (event) => {
      setTitle(event.target.value)
     
    }

    const handleYear = (event) => {
    setYear(event.target.value)
    }


    return <>
        <MyFav title={title}/>
        <h2>Add Movie</h2>
        <div>
          <h3 style={{ fontWeight: 'bold' }}>Title</h3>
          <input type="text" value={title} onChange={handleTitle}/>
          <div>{message}</div>
          <h3 style={{ fontWeight: 'bold' }}>Year</h3>
          <input type="text" value={year} onChange={handleYear}/>
          <button disabled={disabledAdd} onClick={handleFormAdd}>Add Movie</button>
        </div>
        </>
}