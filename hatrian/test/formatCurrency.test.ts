import { formatCurrency } from "../src/main";

describe("formatCurrency", () => {
  test("formats integer amounts", () => {
    expect(formatCurrency(0)).toBe("0.00 (ноль белорусских рублей 00 копеек) ");
    expect(formatCurrency(1)).toBe("1.00 (один белорусский рубль 00 копеек) ");
    expect(formatCurrency(2)).toBe("2.00 (два белорусских рубля 00 копеек) ");
    expect(formatCurrency(5)).toBe("5.00 (пять белорусских рублей 00 копеек) ");
  });

  test("formats fractional amounts with rounding to 2 decimals", () => {
    expect(formatCurrency(1.01)).toBe("1.01 (один белорусский рубль 01 копейка) ");
    expect(formatCurrency(1.234)).toBe("1.23 (один белорусский рубль 23 копейки) ");
    expect(formatCurrency(1.235)).toBe("1.24 (один белорусский рубль 24 копейки) "); 
  });

  test("uses correct ruble word forms", () => {
    expect(formatCurrency(21.05)).toBe("21.05 (двадцать один белорусский рубль 05 копеек) ");
    expect(formatCurrency(22.10)).toBe("22.10 (двадцать два белорусских рубля 10 копеек) ");
    expect(formatCurrency(11.50)).toBe("11.50 (одиннадцать белорусских рублей 50 копеек) ");
    expect(formatCurrency(101.01)).toBe("101.01 (сто один белорусский рубль 01 копейка) ");
  });

  test("large values", () => {
    expect(formatCurrency(1_234_567.89)).toBe(
      "1234567.89 (один миллион двести тридцать четыре тысячи пятьсот шестьдесят семь белорусских рублей 89 копеек) "
    );
  });
});
