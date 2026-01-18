import { numberToWords } from "../src/main";

describe("numberToWords", () => {
  test("throws on non-finite input", () => {
    expect(() => numberToWords(Infinity)).toThrow();
    expect(() => numberToWords(NaN)).toThrow();
  });

  test("zero", () => {
    expect(numberToWords(0)).toBe("ноль");
  });

  test("single digits and teens", () => {
    expect(numberToWords(1)).toBe("один");
    expect(numberToWords(2)).toBe("два");
    expect(numberToWords(9)).toBe("девять");
    expect(numberToWords(10)).toBe("десять");
    expect(numberToWords(11)).toBe("одиннадцать");
    expect(numberToWords(19)).toBe("девятнадцать");
  });

  test("tens and hundreds", () => {
    expect(numberToWords(20)).toBe("двадцать");
    expect(numberToWords(21)).toBe("двадцать один");
    expect(numberToWords(45)).toBe("сорок пять");
    expect(numberToWords(100)).toBe("сто");
    expect(numberToWords(101)).toBe("сто один");
    expect(numberToWords(219)).toBe("двести девятнадцать");
    expect(numberToWords(999)).toBe("девятьсот девяносто девять");
  });

  test("thousands with feminine forms", () => {
    expect(numberToWords(1000)).toBe("одна тысяча");
    expect(numberToWords(1001)).toBe("одна тысяча один");
    expect(numberToWords(2000)).toBe("две тысячи");
    expect(numberToWords(2345)).toBe("две тысячи триста сорок пять");
    expect(numberToWords(5000)).toBe("пять тысяч");
    expect(numberToWords(11000)).toBe("одиннадцать тысяч");
    expect(numberToWords(12100)).toBe("двенадцать тысяч сто");
  });

  test("millions, billions, trillions", () => {
    expect(numberToWords(1_000_000)).toBe("один миллион");
    expect(numberToWords(2_000_000)).toBe("два миллиона");
    expect(numberToWords(5_000_000)).toBe("пять миллионов");
    expect(numberToWords(1_000_000_000)).toBe("один миллиард");
    expect(numberToWords(1_234_000_000)).toBe(
      "один миллиард двести тридцать четыре миллиона",
    );
    expect(numberToWords(1_000_000_000_000)).toBe("один триллион");
  });

  test("mixed large number", () => {
    const val = 1_234_567_890_123;
    const expected =
      "один триллион двести тридцать четыре миллиарда пятьсот шестьдесят семь миллионов восемьсот девяносто тысяч сто двадцать три";
    expect(numberToWords(val)).toBe(expected);
  });

  test("floor and absolute behavior (floats and negatives)", () => {
    expect(numberToWords(123.9)).toBe(numberToWords(123)); // floors
    expect(numberToWords(-45)).toBe("сорок пять"); // abs
    expect(numberToWords(-1001.7)).toBe("одна тысяча один");
  });

  test("no extra spaces", () => {
    expect(numberToWords(1000001)).toBe("один миллион один");
    // Note: if expected differs due to implementation, adjust accordingly.
  });
});
