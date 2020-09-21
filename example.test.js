// function addinator() {

// }

import addinator from './addinator'

describe ('CHECKING ADDINATOR', () => {

test('one number returns self', () => {
    expect(addinator(1)).toBe(1)
})

test('negative numbers behave correctly', () => {
    expect(addinator(-1, 2)).toBe(1)
})

test('decimals behave correctly', () => {
    expect(addinator(1.5, 2)).toBe(3.5)
})

test('string incorrect input', () => {
    expect(addinator('1', 2)).toBe(3)
})
})