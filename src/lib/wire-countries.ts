export interface WireCountry {
  code: string;
  name: string;
  currency: string;
  flag: string;
  continent: "Europe" | "Americas" | "Asia" | "Oceania";
  routingScheme: string; // e.g., IBAN, SWIFT, Routing/Sort Code
}

/**
 * 60 explicitly supported destination countries for international wire transfers.
 * Strict compliance rule: ALL countries are strictly OUTSIDE Africa (no African nations included).
 */
export const WIRE_TRANSFER_COUNTRIES: WireCountry[] = [
  // Americas (14)
  { code: "US", name: "United States", currency: "USD", flag: "🇺🇸", continent: "Americas", routingScheme: "ABA / Fedwire / SWIFT" },
  { code: "CA", name: "Canada", currency: "CAD", flag: "🇨🇦", continent: "Americas", routingScheme: "Transit / SWIFT" },
  { code: "MX", name: "Mexico", currency: "MXN", flag: "🇲🇽", continent: "Americas", routingScheme: "CLABE (18 digits)" },
  { code: "BR", name: "Brazil", currency: "BRL", flag: "🇧🇷", continent: "Americas", routingScheme: "PIX / ISPB / SWIFT" },
  { code: "AR", name: "Argentina", currency: "ARS", flag: "🇦🇷", continent: "Americas", routingScheme: "CBU (22 digits) / SWIFT" },
  { code: "CL", name: "Chile", currency: "CLP", flag: "🇨🇱", continent: "Americas", routingScheme: "RUT / SWIFT" },
  { code: "CO", name: "Colombia", currency: "COP", flag: "🇨🇴", continent: "Americas", routingScheme: "SWIFT / ACH" },
  { code: "PE", name: "Peru", currency: "PEN", flag: "🇵🇪", continent: "Americas", routingScheme: "CCI (20 digits) / SWIFT" },
  { code: "UY", name: "Uruguay", currency: "UYU", flag: "🇺🇾", continent: "Americas", routingScheme: "SWIFT" },
  { code: "PA", name: "Panama", currency: "USD", flag: "🇵🇦", continent: "Americas", routingScheme: "SWIFT" },
  { code: "CR", name: "Costa Rica", currency: "CRC", flag: "🇨🇷", continent: "Americas", routingScheme: "IBAN" },
  { code: "DO", name: "Dominican Republic", currency: "DOP", flag: "🇩🇴", continent: "Americas", routingScheme: "IBAN" },
  { code: "JM", name: "Jamaica", currency: "JMD", flag: "🇯🇲", continent: "Americas", routingScheme: "SWIFT" },
  { code: "EC", name: "Ecuador", currency: "USD", flag: "🇪🇨", continent: "Americas", routingScheme: "SWIFT" },

  // Europe (28)
  { code: "GB", name: "United Kingdom", currency: "GBP", flag: "🇬🇧", continent: "Europe", routingScheme: "Sort Code / IBAN" },
  { code: "DE", name: "Germany", currency: "EUR", flag: "🇩🇪", continent: "Europe", routingScheme: "IBAN (SEPA)" },
  { code: "FR", name: "France", currency: "EUR", flag: "🇫🇷", continent: "Europe", routingScheme: "IBAN (SEPA)" },
  { code: "IT", name: "Italy", currency: "EUR", flag: "🇮🇹", continent: "Europe", routingScheme: "IBAN (SEPA)" },
  { code: "ES", name: "Spain", currency: "EUR", flag: "🇪🇸", continent: "Europe", routingScheme: "IBAN (SEPA)" },
  { code: "NL", name: "Netherlands", currency: "EUR", flag: "🇳🇱", continent: "Europe", routingScheme: "IBAN (SEPA)" },
  { code: "CH", name: "Switzerland", currency: "CHF", flag: "🇨🇭", continent: "Europe", routingScheme: "IBAN / SIC" },
  { code: "BE", name: "Belgium", currency: "EUR", flag: "🇧🇪", continent: "Europe", routingScheme: "IBAN (SEPA)" },
  { code: "AT", name: "Austria", currency: "EUR", flag: "🇦🇹", continent: "Europe", routingScheme: "IBAN (SEPA)" },
  { code: "SE", name: "Sweden", currency: "SEK", flag: "🇸🇪", continent: "Europe", routingScheme: "IBAN" },
  { code: "NO", name: "Norway", currency: "NOK", flag: "🇳🇴", continent: "Europe", routingScheme: "IBAN" },
  { code: "DK", name: "Denmark", currency: "DKK", flag: "🇩🇰", continent: "Europe", routingScheme: "IBAN" },
  { code: "FI", name: "Finland", currency: "EUR", flag: "🇫🇮", continent: "Europe", routingScheme: "IBAN (SEPA)" },
  { code: "IE", name: "Ireland", currency: "EUR", flag: "🇮🇪", continent: "Europe", routingScheme: "IBAN (SEPA)" },
  { code: "PT", name: "Portugal", currency: "EUR", flag: "🇵🇹", continent: "Europe", routingScheme: "IBAN (SEPA)" },
  { code: "PL", name: "Poland", currency: "PLN", flag: "🇵🇱", continent: "Europe", routingScheme: "IBAN" },
  { code: "CZ", name: "Czech Republic", currency: "CZK", flag: "🇨🇿", continent: "Europe", routingScheme: "IBAN" },
  { code: "GR", name: "Greece", currency: "EUR", flag: "🇬🇷", continent: "Europe", routingScheme: "IBAN (SEPA)" },
  { code: "HU", name: "Hungary", currency: "HUF", flag: "🇭🇺", continent: "Europe", routingScheme: "IBAN" },
  { code: "RO", name: "Romania", currency: "RON", flag: "🇷🇴", continent: "Europe", routingScheme: "IBAN" },
  { code: "LU", name: "Luxembourg", currency: "EUR", flag: "🇱🇺", continent: "Europe", routingScheme: "IBAN (SEPA)" },
  { code: "IS", name: "Iceland", currency: "ISK", flag: "🇮🇸", continent: "Europe", routingScheme: "IBAN" },
  { code: "EE", name: "Estonia", currency: "EUR", flag: "🇪🇪", continent: "Europe", routingScheme: "IBAN (SEPA)" },
  { code: "LV", name: "Latvia", currency: "EUR", flag: "🇱🇻", continent: "Europe", routingScheme: "IBAN (SEPA)" },
  { code: "LT", name: "Lithuania", currency: "EUR", flag: "🇱🇹", continent: "Europe", routingScheme: "IBAN (SEPA)" },
  { code: "HR", name: "Croatia", currency: "EUR", flag: "🇭🇷", continent: "Europe", routingScheme: "IBAN (SEPA)" },
  { code: "SK", name: "Slovakia", currency: "EUR", flag: "🇸🇰", continent: "Europe", routingScheme: "IBAN (SEPA)" },
  { code: "SI", name: "Slovenia", currency: "EUR", flag: "🇸🇮", continent: "Europe", routingScheme: "IBAN (SEPA)" },

  // Asia (14)
  { code: "JP", name: "Japan", currency: "JPY", flag: "🇯🇵", continent: "Asia", routingScheme: "Zengin / SWIFT" },
  { code: "SG", name: "Singapore", currency: "SGD", flag: "🇸🇬", continent: "Asia", routingScheme: "FAST / MEPS+ / SWIFT" },
  { code: "KR", name: "South Korea", currency: "KRW", flag: "🇰🇷", continent: "Asia", routingScheme: "SWIFT" },
  { code: "AE", name: "United Arab Emirates", currency: "AED", flag: "🇦🇪", continent: "Asia", routingScheme: "IBAN" },
  { code: "SA", name: "Saudi Arabia", currency: "SAR", flag: "🇸🇦", continent: "Asia", routingScheme: "IBAN" },
  { code: "IL", name: "Israel", currency: "ILS", flag: "🇮🇱", continent: "Asia", routingScheme: "IBAN" },
  { code: "QA", name: "Qatar", currency: "QAR", flag: "🇶🇦", continent: "Asia", routingScheme: "IBAN" },
  { code: "KW", name: "Kuwait", currency: "KWD", flag: "🇰🇼", continent: "Asia", routingScheme: "IBAN" },
  { code: "BH", name: "Bahrain", currency: "BHD", flag: "🇧🇭", continent: "Asia", routingScheme: "IBAN" },
  { code: "OM", name: "Oman", currency: "OMR", flag: "🇴🇲", continent: "Asia", routingScheme: "IBAN" },
  { code: "MY", name: "Malaysia", currency: "MYR", flag: "🇲🇾", continent: "Asia", routingScheme: "RENTAS / SWIFT" },
  { code: "TH", name: "Thailand", currency: "THB", flag: "🇹🇭", continent: "Asia", routingScheme: "PromptPay / SWIFT" },
  { code: "VN", name: "Vietnam", currency: "VND", flag: "🇻🇳", continent: "Asia", routingScheme: "CITAD / SWIFT" },
  { code: "TW", name: "Taiwan", currency: "TWD", flag: "🇹🇼", continent: "Asia", routingScheme: "FISC / SWIFT" },

  // Oceania (4)
  { code: "AU", name: "Australia", currency: "AUD", flag: "🇦🇺", continent: "Oceania", routingScheme: "BSB (6 digits) / PayID / SWIFT" },
  { code: "NZ", name: "New Zealand", currency: "NZD", flag: "🇳🇿", continent: "Oceania", routingScheme: "NZ Bank / Branch / SWIFT" },
  { code: "FJ", name: "Fiji", currency: "FJD", flag: "🇫🇯", continent: "Oceania", routingScheme: "SWIFT" },
  { code: "PG", name: "Papua New Guinea", currency: "PGK", flag: "🇵🇬", continent: "Oceania", routingScheme: "SWIFT" },
];
