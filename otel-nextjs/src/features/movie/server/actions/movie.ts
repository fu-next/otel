import { trace, context } from "@opentelemetry/api";


export async function getMovies() {
    let movies;
    await trace.getTracer("sample").startActiveSpan("apiMoviesGET", async (span) => {
        try {

            const activeSpan = trace.getSpan(context.active())
            const traceParent = activeSpan ? `00-${activeSpan.spanContext().traceId}-${activeSpan.spanContext().spanId}-01` : '';
            const tracestate = activeSpan?.spanContext().traceState?.serialize();
            console.log('traceParent: ' + traceParent)
            console.log('line 11');
            const headers: HeadersInit = {
                // ...request.headers,
                'traceparent': traceParent,
                'tracestate': tracestate ? tracestate : '',
            }
            const data = await fetch('http://localhost:8080/demo/movies', { headers })
            console.log('line 13');
            movies = await data.json()
            console.log('line 15');
            console.log(movies)
        } finally {
            console.log('line 15');
            span.end()
        }
    })

    return movies
}

export async function getMovieByName() {

}

export async function insertMovie() {

}

export async function updateMovie() {

}

export async function deleteMovie() {

}