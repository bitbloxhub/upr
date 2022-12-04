// adapted from https://github.com/denosaurs/rutt

import { serve } from "https://deno.land/std@0.167.0/http/server.ts";
import { router } from "https://deno.land/x/rutt@0.0.14/mod.ts";

await serve(
	router({
		"/": (req: Request) => new Response(req.url, { status: 200 }),
	}),
  	{
		port: 8082
	}
)