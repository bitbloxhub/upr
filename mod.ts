const KEY = 0
const VALUE = 1
export default class Router<RoutesTo> {
	private _urlpatterns: Map<URLPattern, RoutesTo> = new Map()

	public get urlpatterns() {
		return this._urlpatterns as ReadonlyMap<URLPattern, RoutesTo>
	}

	add(urlpattern: URLPattern, mapsTo: RoutesTo) {
		this._urlpatterns.set(urlpattern, mapsTo)
	}

	route(
		url: string,
	): [RoutesTo, Record<string, string | undefined>] | undefined {
		for (const _route of this.urlpatterns.entries()) {
			const execd = _route[KEY].exec({ pathname: url })
			if (execd) {
				return [_route[VALUE], execd.pathname.groups]
			}
		}
	}
}