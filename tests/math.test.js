const { celsiusToFahrenheit, fahrenheitToCelsius, calculateTip, add } = require('../src/math')

test('Tip calculation must be 13', () => {
    const ans = calculateTip(10, .3)
    expect(ans).toBe(13)
})

test('Default Tip calculation must be 12', () => {
    const ans = calculateTip(10)
    expect(ans).toBe(12)
})
test('Celsius to ferenhit test case (0 to 32)', () => {
    const ans = celsiusToFahrenheit(0)
    expect(ans).toBe(32)

})

test('ferenhit to celsius test case (32 to 0)', () => {
    const ans = fahrenheitToCelsius(32)
    expect(ans).toBe(0)
})


test('async test demo', (done) => {
    setTimeout(() => {
        expect(1).toBe(1)
        done()
    }, 0)

})


test('Addition test add 2 numbers', (done) => {
    add(2, 3).then((result) => {
        expect(result).toBe(5)
        done()
    })
})

test('Addition 2 numbers async/await', async() => {
    const sum = await add(2, 3)
    expect(sum).toBe(5)
})