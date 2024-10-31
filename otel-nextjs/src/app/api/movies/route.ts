export const revalidate = 60

import { Span, SpanStatusCode, trace as traceApi } from "@opentelemetry/api";
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  console.log(request.headers)

  const data = await fetch('http://localhost:8080/demo/movies')
  const movies = await data.json()
 

  const tracer = traceApi.getTracer('sample');
  const span = tracer.startSpan('custom-operation');
  try {
    // Your operation here
    return Response.json(movies)
} finally {
    span.end();
  }
}