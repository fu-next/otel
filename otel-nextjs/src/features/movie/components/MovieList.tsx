"use client"

import { useEffect, useState } from "react";
import { Movie } from "../schemas/movie";
import { getMovies } from "../server/actions/movie";
import { context, SpanStatusCode, trace, } from "@opentelemetry/api";

export default function MovieList() {

    // const movies: Movie[] = await getMovies();
    const [movies, setMovies] = useState<Movie[]>([]);

    useEffect(() => {


        const fetchData = async () => {
            await trace.getTracer("sample").startActiveSpan("MovieList", async (span) => {
                try {
                    const currentSpan = trace.getSpan(context.active());

                    if (currentSpan) {
                        const parentSpanId = currentSpan.spanContext().spanId;
                        console.log('Parent Span ID:', parentSpanId);
                    } else {
                        console.log('bbNo active span found.');
                    }

                    const activeSpan = trace.getSpan(context.active())
                    const traceParent = activeSpan ? `00-${activeSpan.spanContext().traceId}-${activeSpan.spanContext().spanId}-01` : '';
                    const tracestate = activeSpan?.spanContext().traceState?.serialize();
                    console.log('line 32: ' + traceParent)
                    const headers: HeadersInit = {
                        // ...request.headers,
                        'traceparent': traceParent,
                        'tracestate': tracestate ? tracestate : '',
                    }

                    const data = await fetch("/api/movies", { headers });
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
