const { celsiusToFahrenheit, fahrenheitToCelsius } = require('../src/math')
test('Celsius to ferenhit test case (0 to 32)', () => {
    const ans = celsiusToFahrenheit(0)
    expect(ans).toBe(32)

})

test('ferenhit to celsius test case (32 to 0)', () => {
    const ans = fahrenheitToCelsius(32)
    expect(ans).toBe(0)
})