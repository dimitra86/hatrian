import { numberToWordsPenny } from "../src/main";

describe("numberToWordsPenny", () => {
  test("valid 0 -> 00 копеек", () => {
    expect(numberToWordsPenny(0)).toBe("00 копеек");
  });

  test("single-digit formatting with leading zero", () => {
    expect(numberToWordsPenny(1)).toBe("01 копейка");
    expect(numberToWordsPenny(2)).toBe("02 копейки");
    expect(numberToWordsPenny(3)).toBe("03 копейки");
    expect(numberToWordsPenny(4)).toBe("04 копейки");
    expect(numberToWordsPenny(5)).toBe("05 копеек");
  });

  test("teens special cases", () => {
    expect(numberToWordsPenny(10)).toBe("10 копеек");
    expect(numberToWordsPenny(11)).toBe("11 копеек");
    expect(numberToWordsPenny(12)).toBe("12 копеек");
    expect(numberToWordsPenny(14)).toBe("14 копеек");
    expect(numberToWordsPenny(15)).toBe("15 копеек");
  });

  test("numbers ending with 1 but not 11", () => {
    expect(numberToWordsPenny(21)).toBe("21 копейка");
    expect(numberToWordsPenny(31)).toBe("31 копейка");
    expect(numberToWordsPenny(41)).toBe("41 копейка");
  });

  test("numbers ending with 2-4 but not 12-14", () => {
    expect(numberToWordsPenny(22)).toBe("22 копейки");
    expect(numberToWordsPenny(23)).toBe("23 копейки");
    expect(numberToWordsPenny(24)).toBe("24 копейки");
    expect(numberToWordsPenny(32)).toBe("32 копейки");
    expect(numberToWordsPenny(34)).toBe("34 копейки");
  });

  test("numbers producing копеек (5-9, 0 and teens 10-19)", () => {
    expect(numberToWordsPenny(5)).toBe("05 копеек");
    expect(numberToWordsPenny(6)).toBe("06 копеек");
    expect(numberToWordsPenny(9)).toBe("09 копеек");
    expect(numberToWordsPenny(10)).toBe("10 копеек");
    expect(numberToWordsPenny(16)).toBe("16 копеек");
    expect(numberToWordsPenny(19)).toBe("19 копеек");
  });

  test("max value 99", () => {
    expect(numberToWordsPenny(99)).toBe("99 копеек");
  });

  test("throws on negative and >99", () => {
    expect(() => numberToWordsPenny(-1)).toThrow();
    expect(() => numberToWordsPenny(100)).toThrow();
  });
});
