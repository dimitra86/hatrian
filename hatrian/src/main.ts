import "./style.scss";

function numberToWords(num: number): string {
  // Функция для преобразования чисел в текст (для упрощения)
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
  const thousands = ["", "тысяча", "миллион", "миллиард"];

  if (num === 0) return "ноль";

  let words = "";
  let groupIndex = 0;

  while (num > 0) {
    let group = num % 1000;
    num = Math.floor(num / 1000);

    if (group > 0) {
      let groupWords = "";
      if (group > 99) {
        groupWords += hundreds[Math.floor(group / 100)];
        group %= 100;
      }
      if (group > 19) {
        groupWords += (groupWords ? " " : "") + tens[Math.floor(group / 10)];
        group %= 10;
      }
      if (group > 0) {
        groupWords += (groupWords ? " " : "") + units[group];
      }

      if (groupIndex > 0) {
        groupWords += " " + thousands[groupIndex];
      }

      words = groupWords + (words ? " " : "") + words;
    }

    groupIndex++;
  }

  return words.trim();
}

function numberToWordsPenny(num: number): string {
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

function formatCurrency(amount: number): string {
  const integerPart = Math.floor(amount);
  const fractionalPart = Math.round((amount - integerPart) * 100);
  const integerWords = numberToWords(integerPart);
  const fractionalWords = numberToWordsPenny(fractionalPart);
//   let kopeika = "";
  let ruble = "";
  console.log(fractionalWords)

  if (integerPart >= 5) {
    ruble = "белорусских рублей";
  }
      if (integerPart > 1 && integerPart < 5) {
    ruble = "белорусских рубля";
  }

    if (integerPart == 1) {
    ruble = "белорусский рубль";
  }
  if (integerPart == 0) {
    ruble = "белорусских рублей";
  }

  return `${amount.toFixed(2)} (${integerWords} ${ruble} ${fractionalWords}) `;
}

document
  .querySelector(".main__change-button")
  ?.addEventListener("click", () => {
    const inputElement =
      document.querySelector<HTMLInputElement>(".main__past-number");
    const outputElement =
      document.querySelector<HTMLDivElement>(".main__word-number");

    if (inputElement && outputElement) {
      const inputValue = parseFloat(inputElement.value);
      if (!isNaN(inputValue)) {
        const formattedText = formatCurrency(inputValue);
        // const nds = inputValue * 0.2;
        // const formattedNdsText = formatCurrency(nds);
        // outputElement.textContent = `${formattedText}, в т.ч. НДС 20% ${formattedNdsText}`;
        outputElement.textContent = `${formattedText}`;
      } else {
        outputElement.textContent = "Пожалуйста, введите корректное число.";
      }
    }
  });

document.querySelector(".main__copy-button")?.addEventListener("click", () => {
  const outputElement =
    document.querySelector<HTMLDivElement>(".main__word-number");

  if (outputElement) {
    navigator.clipboard.writeText(outputElement.textContent || "").then(
      () => {
        //   alert('Текст скопирован в буфер обмена!');
      },
      () => {
        //   alert('Не удалось скопировать текст.');
      },
    );
  }
});
