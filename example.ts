import Router from "./mod.ts"

const r = new Router<string>()
r.add(new URLPattern({ pathname: '/books' }), "a")
r.add(new URLPattern({ pathname: '/books/:id' }), "b")
console.log(r.route("/books"))
console.log(r.route("/books/"))
console.log(r.route("/books/12"))