export default function luhnCheck(cardNumber: string) {
  const digits = String(cardNumber).split("").map(Number);
  let sum = 0;
  let isSecondDigit = false;

  for (let i = digits.length - 1; i >= 0; i--) {
    let digit = digits[i];

    if (isSecondDigit) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }

    sum += digit;
    isSecondDigit = !isSecondDigit;
  }

  return sum % 10 === 0;
}
