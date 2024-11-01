"use client"

import { useEffect, useState } from "react";
import { Movie } from "../schemas/movie";
import { getMovies } from "../server/actions/movie";
import { SpanStatusCode, trace } from "@opentelemetry/api";

export default function MovieList() {

    // const movies: Movie[] = await getMovies();
    const [movies, setMovies] = useState<Movie[]>([]);
    useEffect(() => {
        const fetchData = async () => {
            await trace.getTracer("sample").startActiveSpan("MovieList", async (span) => {
                try {
                    const data = await fetch("/api/movies");
                    const result = await data.json();
                    console.log(result)
                    setMovies(result);
                } finally {
                    span.end()
                }
            })
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