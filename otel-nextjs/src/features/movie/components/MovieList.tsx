"use client"

import { useEffect, useState } from "react";
import { Movie } from "../schemas/movie";
import { getMovies } from "../server/actions/movie";
import { context, SpanStatusCode, trace, } from "@opentelemetry/api";

export default function MovieList({ traceParent, parentSpanId }) {

    // const movies: Movie[] = await getMovies();
    const [movies, setMovies] = useState<Movie[]>([]);

    useEffect(() => {
        console.log('line 14: ' + traceParent)
        const fetchData = async () => {
            const span = trace.getTracer("sample").startSpan("fetch-movies", {
                links: [{
                    context: {
                        traceId: traceParent, spanId: parentSpanId,
                        traceFlags: 0
                    }
                }]
            });

            const activeSpan = trace.setSpan(context.active(), span);
            const traceparent = `00-${traceParent}-${parentSpanId}-01`;

            try {
                const data = await fetch("/api/movies", {
                    headers: {
                        traceparent
                    }
                });
                const result = await data.json();
                setMovies(result);
            } finally {
                span.end();
            }
        };
        fetchData();
    }, []);

    return (
        <div>
            {
                movies.map(e => <div key={e.name}>{e.name}</div>)
            }
        </div>
    )

}
