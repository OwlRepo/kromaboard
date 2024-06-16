export default function formatCurrencyToPHP(currency: string = "0") {
  const formattedCurrency = parseFloat(currency)
    .toLocaleString("en-PH", {
      style: "currency",
      currency: "PHP",
    })
    .replace("PHP", "₱");
  return formattedCurrency;
}
