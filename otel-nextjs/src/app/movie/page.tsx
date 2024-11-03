import MovieList from "@/features/movie/components/MovieList";
import { context, trace } from "@opentelemetry/api";

export default async function Page() {

    const activeSpan = trace.getSpan(context.active());
    const traceParent = activeSpan?.spanContext().traceId;
    const parentSpanId = activeSpan?.spanContext().spanId;

    return (
        <div>
            <MovieList traceParent={traceParent} parentSpanId={parentSpanId}></MovieList>
        </div>
    )
}