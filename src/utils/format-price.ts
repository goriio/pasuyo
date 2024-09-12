import numeral from "numeral";

export function formatPrice(price: number, currencyFormat = "PHP 0,0.00") {
  return numeral(price).format(currencyFormat);
}
