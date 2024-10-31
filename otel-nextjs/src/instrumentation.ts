import { registerOTel } from '@vercel/otel'
 
export function register() {
  registerOTel({ 
    serviceName: 'next-app',
    instrumentationConfig: {
      fetch: {
        ignoreUrls: [/^https:\/\/telemetry.nextjs.org/],
        propagateContextUrls: [/^http:\/\/localhost:\d+/],
        dontPropagateContextUrls: [/no-propagation\=1/],
        attributesFromRequestHeaders: {
          "request.cmd": "X-Cmd",
        },
        attributesFromResponseHeaders: {
          "response.server": "X-Server",
        },
      },
    },
    attributesFromHeaders: {
      client: "X-Client",
    },
  })
}