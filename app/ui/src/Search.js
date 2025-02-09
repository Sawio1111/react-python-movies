import { useState } from "react"

import { SearchMovies } from "./repository/movie"

export const Search = () => {

    const [sMovies, setSMovies] = useState([])
    const [query, setQuery] = useState("")

    const handleSearch = async (e) => {
        e.preventDefault()
        SearchMovies(query, setSMovies)
        setQuery("")
    }

    return (
        <div>
        <h2>Tell me what is on your mind and we will find movie for you</h2>
            <form onSubmit={handleSearch}>
                <input 
                    type="text" 
                    value={query} 
                    onChange={(e) => setQuery(e.target.value)} 
                    placeholder="Search for movies" 
                />
                <button type="submit">Search</button>
            </form>
            <div>
                {sMovies?.map(movie => (
                    <li key={movie.id}><strong>{movie.title}</strong> {movie.actor} {movie.description}</li>
                ))}
            </div>
        </div>
    )
}

    