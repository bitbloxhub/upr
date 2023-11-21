// adapted from https://github.com/denosaurs/rutt

import { router } from "https://deno.land/x/rutt@0.2.0/mod.ts"

Deno.serve(
	{ port: 8082 },
	router({
		"/": (req: Request) => new Response(req.url, { status: 200 }),
	}),
)
