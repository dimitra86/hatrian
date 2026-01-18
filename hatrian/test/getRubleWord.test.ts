import { getRubleWord } from "../src/main";

describe("getRubleWord", () => {
  test("throws on negative", () => {
    expect(() => getRubleWord(-1)).toThrow();
  });

  test("singular (1, 21, 31, ...)", () => {
    expect(getRubleWord(1)).toBe("белорусский рубль");
    expect(getRubleWord(21)).toBe("белорусский рубль");
    expect(getRubleWord(31)).toBe("белорусский рубль");
    expect(getRubleWord(101)).toBe("белорусский рубль");
  });

  test("2-4 forms (2,3,4, 22,23,24, 102)", () => {
    expect(getRubleWord(2)).toBe("белорусских рубля");
    expect(getRubleWord(3)).toBe("белорусских рубля");
    expect(getRubleWord(4)).toBe("белорусских рубля");
    expect(getRubleWord(22)).toBe("белорусских рубля");
    expect(getRubleWord(23)).toBe("белорусских рубля");
    expect(getRubleWord(24)).toBe("белорусских рубля");
    expect(getRubleWord(104)).toBe("белорусских рубля");
  });

  test("5-20 and teens (5..20, 11..19) -> рублей", () => {
    for (const n of [
      5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
    ]) {
      expect(getRubleWord(n)).toBe("белорусских рублей");
    }
    expect(getRubleWord(115)).toBe("белорусских рублей"); // teens override
  });

  test("numbers ending with 0,5-9 -> рублей", () => {
    expect(getRubleWord(0)).toBe("белорусских рублей");
    expect(getRubleWord(10)).toBe("белорусских рублей");
    expect(getRubleWord(25)).toBe("белорусских рублей");
    expect(getRubleWord(30)).toBe("белорусских рублей");
    expect(getRubleWord(100)).toBe("белорусских рублей");
    expect(getRubleWord(1110)).toBe("белорусских рублей");
  });

  test("large values", () => {
    expect(getRubleWord(1001)).toBe("белорусский рубль");
    expect(getRubleWord(1012)).toBe("белорусских рублей");
    expect(getRubleWord(1023)).toBe("белорусских рубля");
  });
});
