import Router from "./mod.ts"

const r = new Router<
	(req: Request, groups: Record<string, string | undefined>) => Response
>()
r.add(
	new URLPattern({ pathname: "/" }),
	(req: Request) => new Response(req.url, { status: 200 }),
)

Deno.serve(
	{ port: 8081 },
	(req: Request): Response => {
		const url = new URL(req.url)
		const routed = r.route(url.pathname)
		if (routed) {
			return routed[0](req, routed[1])
		} else {
			return new Response("404", { status: 404 })
		}
	},
)
