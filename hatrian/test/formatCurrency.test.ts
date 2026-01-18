import { formatCurrency } from "../src/main";

const normalize = (s: string) =>
  s.replace(/\u00A0/g, " ").replace(/[\u200B-\u200D\uFEFF]/g, "").normalize("NFC");

describe("formatCurrency", () => {
  test("integer amounts", () => {
    expect(normalize(formatCurrency(0))).toBe(normalize("0,00 (ноль белорусских рублей 00 копеек)"));
    expect(normalize(formatCurrency(1))).toBe(normalize("1,00 (один белорусский рубль 00 копеек)"));
    expect(normalize(formatCurrency(2))).toBe(normalize("2,00 (два белорусских рубля 00 копеек)"));
    expect(normalize(formatCurrency(5))).toBe(normalize("5,00 (пять белорусских рублей 00 копеек)"));
  });

  test("fractional amounts with rounding to 2 decimals", () => {
    expect(normalize(formatCurrency(1.01))).toBe(normalize("1,01 (один белорусский рубль 01 копейка)"));
    expect(normalize(formatCurrency(1.234))).toBe(normalize("1,23 (один белорусский рубль 23 копейки)"));
    expect(normalize(formatCurrency(1.235))).toBe(normalize("1,24 (один белорусский рубль 24 копейки)"));
  });

  test("uses correct ruble word forms", () => {
    expect(normalize(formatCurrency(21.05))).toBe(normalize("21,05 (двадцать один белорусский рубль 05 копеек)"));
    expect(normalize(formatCurrency(22.10))).toBe(normalize("22,10 (двадцать два белорусских рубля 10 копеек)"));
    expect(normalize(formatCurrency(11.50))).toBe(normalize("11,50 (одиннадцать белорусских рублей 50 копеек)"));
    expect(normalize(formatCurrency(101.01))).toBe(normalize("101,01 (сто один белорусский рубль 01 копейка)"));
  });

  test("large values", () => {
    expect(normalize(formatCurrency(1_234_567.89))).toBe(
      normalize("1 234 567,89 (один миллион двести тридцать четыре тысячи пятьсот шестьдесят семь белорусских рублей 89 копеек)")
    );
    expect(normalize(formatCurrency(1_000_000))).toBe(
      normalize("1 000 000,00 (один миллион белорусских рублей 00 копеек)")
    );
    expect(normalize(formatCurrency(2_000_000))).toBe(
      normalize("2 000 000,00 (два миллиона белорусских рублей 00 копеек)")
    );
    expect(normalize(formatCurrency(5_000_000))).toBe(
      normalize("5 000 000,00 (пять миллионов белорусских рублей 00 копеек)")
    );
    expect(normalize(formatCurrency(1_234_000))).toBe(
      normalize("1 234 000,00 (один миллион двести тридцать четыре тысячи белорусских рублей 00 копеек)")
    );
    expect(normalize(formatCurrency(12_345_678))).toBe(
      normalize("12 345 678,00 (двенадцать миллионов триста сорок пять тысяч шестьсот семьдесят восемь белорусских рублей 00 копеек)")
    );
    expect(normalize(formatCurrency(101_001_001))).toBe(
      normalize("101 001 001,00 (сто один миллион одна тысяча один белорусский рубль 00 копеек)")
    );
    expect(normalize(formatCurrency(21_000_000.15))).toBe(
      normalize("21 000 000,15 (двадцать один миллион белорусских рублей 15 копеек)")
    );
    expect(normalize(formatCurrency(22_000_000.25))).toBe(
      normalize("22 000 000,25 (двадцать два миллиона белорусских рублей 25 копеек)")
    );
    expect(normalize(formatCurrency(11_000_000.50))).toBe(
      normalize("11 000 000,50 (одиннадцать миллионов белорусских рублей 50 копеек)")
    );
    expect(normalize(formatCurrency(123_456_789.99))).toBe(
      normalize("123 456 789,99 (сто двадцать три миллиона четыреста пятьдесят шесть тысяч семьсот восемьдесят девять белорусских рублей 99 копеек)")
    );
    expect(normalize(formatCurrency(999_999_999.99))).toBe(
      normalize("999 999 999,99 (девятьсот девяносто девять миллионов девятьсот девяносто девять тысяч девятьсот девяносто девять белорусских рублей 99 копеек)")
    );
    expect(normalize(formatCurrency(1_000_000_000))).toBe(
      normalize("1 000 000 000,00 (один миллиард белорусских рублей 00 копеек)")
    );
  });

  test("negative values include minus and correct penny form", () => {
    expect(normalize(formatCurrency(-12.34))).toBe(normalize("-12,34 (двенадцать белорусских рублей 34 копейки)"));
  });
});
