function test() {
  const random = Math.random()
  function getRandomArbitrary(min, max) {
    return random * (max - min) + min
  }
  const a = getRandomArbitrary(3, 8)
  console.log(a, random)
}

function test1() {
  // max - 期望的最大值
  const min = 3
  const max = 8
  const random = Math.random()
  const a = Math.floor(random * max) + 1
  const b = Math.ceil(random * max)
  const c = parseInt(random * max, 10) + 1
  // console.log(random, a, b, c)
  const d = Math.floor(random * (max + 1))
  console.log(random, a, b, c, d)
  const e = Math.floor(random * (max - min + 1) + min)
  console.log(random, a, b, c, d, e)
}
test1()
