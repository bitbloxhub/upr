from sanic import Sanic
from sanic.request import Request
from sanic.response import HTTPResponse, text
from sanic.exceptions import NotFound

app = Sanic("benchsanic")

@app.get("/")
async def bench(request: Request) -> HTTPResponse:
    return text(request.url)

@app.exception(NotFound)
async def fourofour(request: Request, exception: Exception()) -> HTTPResponse:
    return text("404")