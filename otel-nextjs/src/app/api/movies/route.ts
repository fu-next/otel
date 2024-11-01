export const revalidate = 60

import { Span, SpanStatusCode, trace, context } from "@opentelemetry/api";
import { NextRequest } from 'next/server';
import { urlToHttpOptions } from "url";

export async function GET(request: NextRequest) {
  // console.log(request.headers)

  let movies;
  await trace.getTracer("sample").startActiveSpan("apiMoviesGET", async (span) => {
    try {
      
      const activeSpan = trace.getSpan(context.active())
      const traceParent = activeSpan? `00-${activeSpan.spanContext().traceId}-${activeSpan.spanContext().spanId}-01`:'';
      console.log('traceParent: ' + traceParent)
      console.log('line 11');
      const headers = {
        ...request.headers,
        'traceparent': traceParent
      }
      const data = await fetch('http://localhost:8080/demo/movies', {headers})
      console.log('line 13');
      movies = await data.json()
      console.log('line 15');
      console.log(movies)
    } finally {
      console.log('line 15');
      span.end()
    }
  })

  return Response.json(movies)

}