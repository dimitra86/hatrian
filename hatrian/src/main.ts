import "./style.scss";

export function numberToWords(num: number): string {
  if (!Number.isFinite(num)) {
    throw new Error("Input must be a finite number");
  }

  num = Math.floor(Math.abs(num));

  if (num === 0) {
    return "ноль";
  }

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

  const classes: Array<
    [string, string, string, "m" | "f"]
  > = [
    ["", "", "", "m"],
    ["тысяча", "тысячи", "тысяч", "f"],
    ["миллион", "миллиона", "миллионов", "m"],
    ["миллиард", "миллиарда", "миллиардов", "m"],
    ["триллион", "триллиона", "триллионов", "m"],
  ];

  function classForm(
    n: number,
    forms: [string, string, string, "m" | "f"],
  ): string {
    if (!forms[0]) {
      return "";
    }

    const lastTwo = n % 100;
    const last = n % 10;

    if (lastTwo >= 11 && lastTwo <= 19) {
      return forms[2];
    }

    if (last === 1) {
      return forms[0];
    }

    if (last >= 2 && last <= 4) {
      return forms[1];
    }

    return forms[2];
  }

  function threeDigitsToWords(
    n: number,
    gender: "m" | "f",
  ): string {
    const result: string[] = [];

    const h = Math.floor(n / 100);
    const t = Math.floor((n % 100) / 10);
    const u = n % 10;

    if (h) {
      result.push(hundreds[h]);
    }

    const lastTwo = n % 100;

    if (lastTwo > 0 && lastTwo < 20) {
      if (lastTwo === 1) {
        result.push(gender === "f" ? "одна" : "один");
      } else if (lastTwo === 2) {
        result.push(gender === "f" ? "две" : "два");
      } else {
        result.push(units[lastTwo]);
      }
    } else {
      if (t) {
        result.push(tens[t]);
      }

      if (u) {
        if (u === 1) {
          result.push(gender === "f" ? "одна" : "один");
        } else if (u === 2) {
          result.push(gender === "f" ? "две" : "два");
        } else {
          result.push(units[u]);
        }
      }
    }

    return result.join(" ");
  }

  const parts: string[] = [];
  let classIndex = 0;

  while (num > 0) {
    const group = num % 1000;

    if (group > 0) {
      const cls = classes[classIndex] || ["", "", "", "m"];
      const gender = cls[3];

      const groupWords = threeDigitsToWords(group, gender);
      const classWord = classForm(group, cls);

      parts.unshift(
        `${groupWords}${classWord ? ` ${classWord}` : ""}`,
      );
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

  const formattedNumber = num < 10 ? `0${num}` : `${num}`;

  if (num === 0) {
    return `${formattedNumber} копеек`;
  }

  if (num % 10 === 1 && num !== 11) {
    return `${formattedNumber} копейка`;
  }

  if (
    num % 10 >= 2 &&
    num % 10 <= 4 &&
    (num < 10 || num >= 20)
  ) {
    return `${formattedNumber} копейки`;
  }

  return `${formattedNumber} копеек`;
}

export function getRubleWord(integerPart: number): string {
  if (integerPart < 0) {
    throw new Error("Число должно быть неотрицательным");
  }

  const lastTwoDigits = integerPart % 100;
  const lastOneDigit = integerPart % 10;

  if (lastTwoDigits === 1) {
    return "белорусский рубль";
  }

  if (lastTwoDigits >= 2 && lastTwoDigits <= 4) {
    return "белорусских рубля";
  }

  if (lastTwoDigits >= 5 && lastTwoDigits <= 20) {
    return "белорусских рублей";
  }

  if (lastOneDigit === 1) {
    return "белорусский рубль";
  }

  if (lastOneDigit >= 2 && lastOneDigit <= 4) {
    return "белорусских рубля";
  }

  return "белорусских рублей";
}

export function formatCurrency(amount: number): string {
  if (!Number.isFinite(amount)) {
    throw new Error("Input must be a finite number");
  }

  const sign = amount < 0 ? "-" : "";
  const abs = Math.abs(amount);

  const integerPart = Math.floor(abs);
  let fractionalPart = Math.round(
    (abs - integerPart) * 100,
  );

  // Например, для 1.999 копейки становятся 100.
  // В таком случае увеличиваем рубли на 1.
  let finalIntegerPart = integerPart;

  if (fractionalPart === 100) {
    finalIntegerPart += 1;
    fractionalPart = 0;
  }

  const integerWords = numberToWords(finalIntegerPart);
  const fractionalWords = numberToWordsPenny(fractionalPart);
  const ruble = getRubleWord(finalIntegerPart);

  const formattedNumber = new Intl.NumberFormat("ru-RU", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(abs);

  return `${sign}${formattedNumber} ` +
    `(${integerWords} ${ruble} ${fractionalWords})`;
}

/* ---------- UI logic ---------- */

const inputSelector = ".main__past-number";
const outputSelector = ".main__word-number";
const changeBtnSelector = ".main__change-button";
const copyBtnSelector = ".main__copy-button";

const inputElement =
  document.querySelector<HTMLInputElement>(inputSelector);

/**
 * Расчёт и вывод результата.
 * Функция вызывается при клике по кнопке
 * и при нажатии Enter в поле ввода.
 */
function calculateAmount(): void {
  const inEl =
    document.querySelector<HTMLInputElement>(inputSelector);

  const outEl =
    document.querySelector<HTMLDivElement>(outputSelector);

  const ndsCheckbox =
    document.querySelector<HTMLInputElement>("#nds");

  if (!inEl || !outEl || !ndsCheckbox) {
    return;
  }

  const rawInput = inEl.value || "";

  // Ищем число с необязательной дробной частью
  const match = rawInput.match(/(\d+(?:[.,]\d+)?)/);

  if (!match) {
    outEl.textContent =
      "Пожалуйста, введите корректное число.";
    return;
  }

  const candidate = match[1].replace(",", ".");
  const inputValue = parseFloat(candidate);

  const MAX = 1_000_000_000_000;
  const MIN = 0;

  if (!Number.isFinite(inputValue)) {
    outEl.textContent =
      "Пожалуйста, введите корректное число.";
    return;
  }

  if (inputValue < MIN || inputValue > MAX) {
    outEl.textContent =
      `Пожалуйста, введите число от ${MIN.toLocaleString()} ` +
      `до ${MAX.toLocaleString()}.`;
    return;
  }

  const formattedText = formatCurrency(inputValue);

  if (ndsCheckbox.checked) {
    // Если сумма уже включает НДС 20%:
    const ndsValue = (inputValue * 20) / 120;
    const formattedNdsText = formatCurrency(ndsValue);

    outEl.textContent =
      `${formattedText}, в т.ч. НДС 20% ${formattedNdsText}`;
  } else {
    outEl.textContent = formattedText;
  }
}

/* ---------- Очистка поля ввода ---------- */

if (inputElement) {
  inputElement.addEventListener("input", () => {
    const oldValue = inputElement.value;

    let value = oldValue
      // Удаляем пробелы и невидимые символы
      .replace(/[\s\uFEFF\u00A0\u200B]+/g, "")
      // Оставляем только цифры, точку и запятую
      .replace(/[^0-9.,]+/g, "");

    // Разрешаем только один разделитель
    const firstSeparator = value.search(/[.,]/);

    if (firstSeparator !== -1) {
      value =
        value.slice(0, firstSeparator + 1) +
        value.slice(firstSeparator + 1).replace(/[.,]/g, "");
    }

    if (value !== oldValue) {
      const position =
        inputElement.selectionStart ?? value.length;

      inputElement.value = value;

      const newPosition = Math.min(
        value.length,
        Math.max(
          0,
          position - (oldValue.length - value.length),
        ),
      );

      inputElement.setSelectionRange(
        newPosition,
        newPosition,
      );
    }
  });

  // Запрещаем пробел
  inputElement.addEventListener("keydown", (event) => {
    if (event.key === " ") {
      event.preventDefault();
    }

    // Запуск расчёта по клавише Enter
    if (event.key === "Enter") {
      event.preventDefault();
      calculateAmount();
    }
  });
}

/* ---------- Обработчик кнопки расчёта ---------- */

document
  .querySelector<HTMLButtonElement>(changeBtnSelector)
  ?.addEventListener("click", calculateAmount);

/* ---------- Копирование результата ---------- */

document
  .querySelector<HTMLButtonElement>(copyBtnSelector)
  ?.addEventListener("click", async () => {
    const outEl =
      document.querySelector<HTMLDivElement>(outputSelector);

    if (!outEl) {
      return;
    }

    try {
      await navigator.clipboard.writeText(
        outEl.textContent || "",
      );

      console.log("Текст скопирован");
    } catch (error) {
      console.error("Не удалось скопировать текст", error);
    }
  });
