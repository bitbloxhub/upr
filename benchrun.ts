// use wrk instead

const times = async (n: number, f: Function) => { while(n-- > 0) await f(); }
const sum = (array: Array<number>) => {return array.reduce((a: number, b: number) => a + b)}

const rutttimes: Array<number> = []
await times(500000, async () => {
	const ruttstart = performance.now()
	await fetch("http://localhost:8082")
	const ruttend = performance.now()
	rutttimes.push(ruttend - ruttstart)
})

const uprtimes: Array<number> = []
await times(500000, async () => {
	const uprstart = performance.now()
	await fetch("http://localhost:8081")
	const uprend = performance.now()
	uprtimes.push(uprend - uprstart)
})

console.log(`rutt: ${sum(rutttimes)}`)
console.log(`upr: ${sum(uprtimes)}`)