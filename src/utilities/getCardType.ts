export default function getCardType(cardNumber: string) {
  const cardTypes = [
    { type: "Visa", pattern: /^4/ },
    { type: "Mastercard", pattern: /^5[1-5]/ },
    { type: "Amex", pattern: /^3[47]/ },
    { type: "Discover", pattern: /^6(?:011|5[0-9]{2})/ },
  ];

  for (const cardType of cardTypes) {
    if (cardType.pattern.test(cardNumber.toString())) {
      return cardType.type;
    }
  }

  return "Неизвестная карта";
}
