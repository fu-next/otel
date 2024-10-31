"use client"

import { useEffect, useState } from "react";
import { Movie } from "../schemas/movie";
import { getMovies } from "../server/actions/movie";

export default function MovieList() {

    // const movies: Movie[] = await getMovies();
    const [movies, setMovies] = useState<Movie[]>([]);
    useEffect(() => {
        const fetchData = async () => {
            const data =  fetch("/api/movies");
            const result = await (await data).json();
            setMovies(result);
        }

        fetchData();
    }, [])

    return (
        <div>
            {
                movies.map(e => <div key={e.name}>{e.name}</div>)
            }
        </div>
    )

}