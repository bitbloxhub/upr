// taken from https://developer.mozilla.org/en-US/docs/Web/API/URL_Pattern_API

// A pattern matching some fixed text
const pattern_fixed = new URLPattern({ pathname: "/books" })
console.log(pattern_fixed.test("https://example.com/books")) // true
//@ts-ignore: the above line asserts it works
console.log(pattern_fixed.exec("https://example.com/books").pathname.groups) // {}

// A pattern matching with a named group
const pattern_named = new URLPattern({ pathname: "/books/:id" })
console.log(pattern_named.test("https://example.com/books/123")) // true
//@ts-ignore: the above line asserts it works
console.log(
	pattern_named.exec("https://example.com/books/123")?.pathname.groups,
) // { id: '123' }

// A pattern with a regex for a group
const pattern_regex = new URLPattern("/books/:id(\\d+)", "https://example.com")
console.log(pattern_regex.test("https://example.com/books/123")) // true
console.log(pattern_regex.test("https://example.com/books/abc")) // false
console.log(pattern_regex.test("https://example.com/books/")) // false

// An optional group
const pattern_optional = new URLPattern("/books/:id?", "https://example.com")
console.log(pattern_optional.test("https://example.com/books/123")) // true
console.log(pattern_optional.test("https://example.com/books")) // true
console.log(pattern_optional.test("https://example.com/books/")) // false
console.log(pattern_optional.test("https://example.com/books/123/456")) // false
console.log(pattern_optional.test("https://example.com/books/123/456/789")) // false

// A repeating group with a minimum of one
const pattern_repeating_minimum = new URLPattern(
	"/books/:id+",
	"https://example.com",
)
console.log(pattern_repeating_minimum.test("https://example.com/books/123")) // true
console.log(pattern_repeating_minimum.test("https://example.com/books")) // false
console.log(pattern_repeating_minimum.test("https://example.com/books/")) // false
console.log(
	pattern_repeating_minimum.test("https://example.com/books/123/456"),
) // true
console.log(
	pattern_repeating_minimum.test("https://example.com/books/123/456/789"),
) // true

// A repeating group with a minimum of zero
const pattern_repeating_optional = new URLPattern(
	"/books/:id*",
	"https://example.com",
)
console.log(pattern_repeating_optional.test("https://example.com/books/123")) // true
console.log(pattern_repeating_optional.test("https://example.com/books")) // true
console.log(pattern_repeating_optional.test("https://example.com/books/")) // false
console.log(
	pattern_repeating_optional.test("https://example.com/books/123/456"),
) // true
console.log(
	pattern_repeating_optional.test("https://example.com/books/123/456/789"),
) // true

// A group delimiter with a ? (optional) modifier
const pattern_optional_modifier = new URLPattern(
	"/book{s}?",
	"https://example.com",
)
console.log(pattern_optional_modifier.test("https://example.com/books")) // true
console.log(pattern_optional_modifier.test("https://example.com/book")) // true
//@ts-ignore: the above line asserts it works
console.log(
	pattern_optional_modifier.exec("https://example.com/books")?.pathname.groups,
) // {}

// A group delimiter without a modifier
const pattern_delimiter_no_modifier = new URLPattern(
	"/book{s}",
	"https://example.com",
)
console.log(pattern_delimiter_no_modifier.pathname) // /books
console.log(pattern_delimiter_no_modifier.test("https://example.com/books")) // true
console.log(pattern_delimiter_no_modifier.test("https://example.com/book")) // false

// A group delimiter containing a capturing group
const pattern_capturing_delimiter = new URLPattern({
	pathname: "/blog/:id(\\d+){-:title}?",
})
console.log(
	pattern_capturing_delimiter.test("https://example.com/blog/123-my-blog"),
) // true
console.log(pattern_capturing_delimiter.test("https://example.com/blog/123")) // true
console.log(
	pattern_capturing_delimiter.test("https://example.com/blog/my-blog"),
) // false

// A pattern with an optional group, preceded by a slash
const pattern_optional_slash = new URLPattern(
	"/books/:id?",
	"https://example.com",
)
console.log(pattern_optional_slash.test("https://example.com/books/123")) // true
console.log(pattern_optional_slash.test("https://example.com/books")) // true
console.log(pattern_optional_slash.test("https://example.com/books/")) // false

// A pattern with a repeating group, preceded by a slash
const pattern_repeating_slash = new URLPattern(
	"/books/:id+",
	"https://example.com",
)
console.log(pattern_repeating_slash.test("https://example.com/books/123")) // true
console.log(pattern_repeating_slash.test("https://example.com/books/123/456")) // true
console.log(pattern_repeating_slash.test("https://example.com/books/123/")) // false
console.log(pattern_repeating_slash.test("https://example.com/books/123/456/")) // false

// Segment prefixing does not occur outside of pathname patterns
const pattern_segment_outside_prefix = new URLPattern({ hash: "/books/:id?" })
console.log(
	pattern_segment_outside_prefix.test("https://example.com#/books/123"),
) // true
console.log(pattern_segment_outside_prefix.test("https://example.com#/books")) // false
console.log(pattern_segment_outside_prefix.test("https://example.com#/books/")) // true

// Disabling segment prefixing for a group using a group delimiter
const pattern_disable_prefixing = new URLPattern({ pathname: "/books/{:id}?" })
console.log(pattern_disable_prefixing.test("https://example.com/books/123")) // true
console.log(pattern_disable_prefixing.test("https://example.com/books")) // false
console.log(pattern_disable_prefixing.test("https://example.com/books/")) // true

// A wildcard at the end of a pattern
const pattern_wildcard_end = new URLPattern("/books/*", "https://example.com")
console.log(pattern_wildcard_end.test("https://example.com/books/123")) // true
console.log(pattern_wildcard_end.test("https://example.com/books")) // false
console.log(pattern_wildcard_end.test("https://example.com/books/")) // true
console.log(pattern_wildcard_end.test("https://example.com/books/123/456")) // true

// A wildcard in the middle of a pattern
const pattern_wildcard_middle = new URLPattern("/*.png", "https://example.com")
console.log(pattern_wildcard_middle.test("https://example.com/image.png")) // true
console.log(pattern_wildcard_middle.test("https://example.com/image.png/123")) // false
console.log(
	pattern_wildcard_middle.test("https://example.com/folder/image.png"),
) // true
console.log(pattern_wildcard_middle.test("https://example.com/.png")) // true
