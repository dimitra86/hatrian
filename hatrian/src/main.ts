import "./style.scss";

export function numberToWords(num: number): string {
  if (!Number.isFinite(num)) throw new Error("Input must be a finite number");
  num = Math.floor(Math.abs(num));
  if (num === 0) return "ноль";

  const units = [
    "",
    "один",
    "два",
    "три",
    "четыре",
    "пять",
    "шесть",
    "семь",
    "восемь",
    "девять",
    "десять",
    "одиннадцать",
    "двенадцать",
    "тринадцать",
    "четырнадцать",
    "пятнадцать",
    "шестнадцать",
    "семнадцать",
    "восемнадцать",
    "девятнадцать",
  ];
  const tens = [
    "",
    "",
    "двадцать",
    "тридцать",
    "сорок",
    "пятьдесят",
    "шестьдесят",
    "семьдесят",
    "восемьдесят",
    "девяносто",
  ];
  const hundreds = [
    "",
    "сто",
    "двести",
    "триста",
    "четыреста",
    "пятьсот",
    "шестьсот",
    "семьсот",
    "восемьсот",
    "девятьсот",
  ];

  // формы для классов (тысячи, миллионы, миллиарды, ...)
  // каждая запись: [forms for 1, 2-4, 5-0], gender ('m' или 'f')
  const classes: Array<[string, string, string, "m" | "f"]> = [
    ["", "", "", "m"], // единицы
    ["тысяча", "тысячи", "тысяч", "f"],
    ["миллион", "миллиона", "миллионов", "m"],
    ["миллиард", "миллиарда", "миллиардов", "m"],
    ["триллион", "триллиона", "триллионов", "m"],
  ];

  function classForm(
    n: number,
    forms: [string, string, string, "m" | "f"],
  ): string {
    if (!forms[0]) return "";
    const lastTwo = n % 100;
    const last = n % 10;
    if (lastTwo >= 11 && lastTwo <= 19) return forms[2];
    if (last === 1) return forms[0];
    if (last >= 2 && last <= 4) return forms[1];
    return forms[2];
  }

  function threeDigitsToWords(n: number, gender: "m" | "f"): string {
    let out: string[] = [];
    const h = Math.floor(n / 100);
    const t = Math.floor((n % 100) / 10);
    const u = n % 10;
    if (h) out.push(hundreds[h]);
    const lastTwo = n % 100;
    if (lastTwo > 0 && lastTwo < 20) {
      // особые формы для 1 и 2 при женском роде (для тысяч)
      if (lastTwo === 1) out.push(gender === "f" ? "одна" : "один");
      else if (lastTwo === 2) out.push(gender === "f" ? "две" : "два");
      else out.push(units[lastTwo]);
    } else {
      if (t) out.push(tens[t]);
      if (u) {
        if (u === 1) out.push(gender === "f" ? "одна" : "один");
        else if (u === 2) out.push(gender === "f" ? "две" : "два");
        else out.push(units[u]);
      }
    }
    return out.join(" ");
  }

  const parts: string[] = [];
  let classIndex = 0;
  while (num > 0) {
    const group = num % 1000;
    if (group > 0) {
      const cls = classes[classIndex] || ["", "", "", "m"];
      const gender = cls[3];
      const gw = threeDigitsToWords(group, gender);
      const form = classForm(group, cls);
      parts.unshift((gw + (form ? " " + form : "")).trim());
    }
    num = Math.floor(num / 1000);
    classIndex++;
  }

  return parts.join(" ").replace(/\s+/g, " ").trim();
}

export function numberToWordsPenny(num: number): string {
  if (num < 0 || num > 99) {
    throw new Error("Number must be between 0 и 99");
  }

  // Форматируем число с ведущим нулем
  const formattedNumber = num < 10 ? `0${num}` : `${num}`;

  // Правильные окончания
  if (num === 0) {
    return `${formattedNumber} копеек`;
  } else if (num % 10 === 1 && num !== 11) {
    return `${formattedNumber} копейка`;
  } else if (num % 10 >= 2 && num % 10 <= 4 && (num < 10 || num >= 20)) {
    return `${formattedNumber} копейки`;
  } else {
    return `${formattedNumber} копеек`;
  }
}

export function getRubleWord(integerPart: number): string {
  if (integerPart < 0) {
    throw new Error("Число должно быть неотрицательным");
  }

  const lastTwoDigits = integerPart % 100;
  const lastOneDigits = integerPart % 10;
  

  // Определяем окончание для рублей
  if (lastTwoDigits === 1) {
    return "белорусский рубль";
  } else if (lastTwoDigits >= 2 && lastTwoDigits <= 4) {
    return "белорусских рубля";
  } else if (lastTwoDigits >= 5 && lastTwoDigits <= 20) {
    return "белорусских рублей";
  } else {
    if (lastOneDigits === 1) {
      return "белорусский рубль";
    } else if (lastOneDigits >= 2 && lastOneDigits <= 4) {
      return "белорусских рубля";
    } else {
      return "белорусских рублей";
    }
  }
}

export function formatCurrency(amount: number): string {
  if (!Number.isFinite(amount)) throw new Error("Input must be a finite number");
  const sign = amount < 0 ? "-" : "";
  const abs = Math.abs(amount);
  const integerPart = Math.floor(abs);
  const fractionalPart = Math.round((abs - integerPart) * 100);
  const integerWords = numberToWords(integerPart);
  const fractionalWords = numberToWordsPenny(fractionalPart);
  const ruble = getRubleWord(integerPart);

  const formattedNumber = new Intl.NumberFormat('ru-RU', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(abs); // будет с запятой

  return `${sign}${formattedNumber} (${integerWords} ${ruble} ${fractionalWords})`;
}

document
  .querySelector(".main__change-button")
  ?.addEventListener("click", () => {
    const inputElement =
      document.querySelector<HTMLInputElement>(".main__past-number");
    const outputElement =
      document.querySelector<HTMLDivElement>(".main__word-number");

    if (!inputElement || !outputElement) return;

    // парсим с учётом запятой
    const raw = inputElement.value.trim();
    const inputValue = raw === "" ? NaN : parseFloat(raw.replace(",", "."));
    console.log(inputValue);

    const MAX = 1_000_000_000_000; // 1 трлн
    const MIN = 0;

    if (Number.isNaN(inputValue)) {
      outputElement.textContent = "Пожалуйста, введите корректное число.";
      return;
    }

    if (inputValue < MIN || inputValue > MAX) {
      outputElement.textContent = `Пожалуйста, введите число от ${MIN.toLocaleString()} до ${MAX.toLocaleString()}.`;
      return;
    }

    // допустимое значение — форматируем и показываем
    const formattedText = formatCurrency(inputValue);
    const nds = (inputValue * 20) / 120;
    const formattedNdsText = formatCurrency(nds);
    outputElement.textContent = `${formattedText}, в т.ч. НДС 20% ${formattedNdsText}`;
  });

document.querySelector(".main__copy-button")?.addEventListener("click", () => {
  const outputElement =
    document.querySelector<HTMLDivElement>(".main__word-number");

  if (outputElement) {
    navigator.clipboard.writeText(outputElement.textContent || "").catch(() => {
          });
  }
});
