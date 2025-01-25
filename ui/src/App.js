import "milligram";
import { useEffect, useState } from 'react';

import './App.css';
import { Titles } from './Titles';
import { Actors} from './Actors';
import { MovForm } from './MovForm';
import { ActorForm } from "./ActorForm";
import { AttachActorForm } from "./AttachActorForm";
import { AddMovie, GetMovies, DeleteMovie, AttachActorToMovie } from "./repository/movie";
import { AddActor, DeleteActor, GetActors } from "./repository/actors";

const App = () => {

  const [myMovies, setMyMovies] = useState([])
  const [myActors, setMyActors] = useState([])
  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    GetMovies(setMyMovies)
    GetActors(setMyActors)
  }, [])

  const handleOnAddMovie = (title, year) => {
    if (myMovies?.some(movie => movie.title === title)) {
      alert(`The movie ${title} is already in the list.`);
      return;
    }
    const newMovie = {
      title: title,
      year: year,
    }
    AddMovie(newMovie, myMovies, setMyMovies)
  }
  
  const handleOnAddActors = (name, surname) => {
    const newActor = {
      name: name,
      surname: surname,
    }
    AddActor(newActor, myActors, setMyActors)
  }

  const handleButtonShow = () => {
    setShowForm(!showForm)
  }

  const handleOnDeleteMovie = (movieId) => {
    DeleteMovie(movieId, myMovies, setMyMovies);
  }

  const handleOnDeleteActors = (actorsId) => {
    DeleteActor(actorsId, myActors, setMyActors);
  }

  const handleAttachActor = (movieId, actorId) => {
    AttachActorToMovie(movieId, actorId, myMovies, setMyMovies)
  }

  return (
      <div>
          <h1>My favourite movies to watch</h1>
          <Titles movies={myMovies} handleOnDelete={handleOnDeleteMovie}/>
          <Actors actors={myActors} handleOnDelete={handleOnDeleteActors}/>
          <div>
          <button onClick={handleButtonShow}>{showForm ? 'Hide Manage Panel' : 'Show Manage Panel'}</button>
          {showForm ? <>
            <MovForm handleOnAdd={handleOnAddMovie} />
            <ActorForm handleOnAdd={handleOnAddActors} />
            <AttachActorForm movies={myMovies} actors={myActors} handleOnAdd={handleAttachActor} />
            </>
            : null}
          </div>
      </div>
  );
}

export default App;
