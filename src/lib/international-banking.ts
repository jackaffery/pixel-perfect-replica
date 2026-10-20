export interface CountryConfig {
  code: string;
  name: string;
  flag: string;
  currency: {
    code: string;
    symbol: string;
    name: string;
  };
  phoneCode: string;
  phoneFormat: string;
  dateFormat: string;
  regionsLabel: string;
  regions: string[];
  idTypes: { id: string; label: string; placeholder: string; reason: string }[];
  regulatoryNote: string;
  languages: string[];
}

export const SUPPORTED_COUNTRIES: Record<string, CountryConfig> = {
  US: {
    code: "US",
    name: "United States",
    flag: "🇺🇸",
    currency: { code: "USD", symbol: "$", name: "US Dollar" },
    phoneCode: "+1",
    phoneFormat: "(555) 019-2834",
    dateFormat: "MM/DD/YYYY",
    regionsLabel: "State",
    regions: ["California", "New York", "Texas", "Florida", "Illinois", "Pennsylvania", "Ohio", "Washington", "Massachusetts", "Georgia"],
    idTypes: [
      { id: "ssn", label: "Social Security Number (SSN) / ITIN", placeholder: "9-digit SSN / ITIN", reason: "Mandated by federal USA PATRIOT Act Customer Identification Program (CIP)." },
      { id: "driver_license", label: "State Driver's License or ID Card", placeholder: "State ID number", reason: "Standard government-issued photographic identity credential." },
      { id: "passport", label: "U.S. / International Passport", placeholder: "Passport number", reason: "Valid federal and international travel identification." }
    ],
    regulatoryNote: "Accounts are provisioned subject to U.S. federal banking regulations, Customer Due Diligence, and BSA/AML standards.",
    languages: ["en", "es"]
  },
  GB: {
    code: "GB",
    name: "United Kingdom",
    flag: "🇬🇧",
    currency: { code: "GBP", symbol: "£", name: "British Pound" },
    phoneCode: "+44",
    phoneFormat: "7911 123456",
    dateFormat: "DD/MM/YYYY",
    regionsLabel: "Constituent Country / County",
    regions: ["England", "Scotland", "Wales", "Northern Ireland", "Greater London", "West Midlands", "Greater Manchester"],
    idTypes: [
      { id: "passport", label: "UK / International Passport", placeholder: "9-digit passport number", reason: "Required by UK Money Laundering Regulations (MLR) to verify legal identity." },
      { id: "driving_license", label: "UK Photocard Driving Licence", placeholder: "e.g. SMIT950101AB9IJ", reason: "Accepted photographic identity verification under FCA guidelines." },
      { id: "national_insurance", label: "National Insurance Number", placeholder: "e.g. QQ 12 34 56 A", reason: "Required for tax reporting and individual verification." }
    ],
    regulatoryNote: "Accounts are provisioned subject to UK FCA/PRA banking compliance frameworks and anti-money laundering controls.",
    languages: ["en"]
  },
  CA: {
    code: "CA",
    name: "Canada",
    flag: "🇨🇦",
    currency: { code: "CAD", symbol: "C$", name: "Canadian Dollar" },
    phoneCode: "+1",
    phoneFormat: "(416) 555-0199",
    dateFormat: "YYYY-MM-DD",
    regionsLabel: "Province / Territory",
    regions: ["Ontario", "Quebec", "British Columbia", "Alberta", "Manitoba", "Saskatchewan", "Nova Scotia", "New Brunswick", "Newfoundland and Labrador"],
    idTypes: [
      { id: "passport", label: "Canadian Passport", placeholder: "Passport number", reason: "Mandated by FINTRAC identity verification regulations." },
      { id: "provincial_id", label: "Provincial Driver's Licence or Photo ID", placeholder: "Province-issued photo ID", reason: "Standard government-issued photographic identification." },
      { id: "sin", label: "Social Insurance Number (SIN)", placeholder: "9-digit SIN", reason: "Required for Canada Revenue Agency (CRA) tax disclosure purposes." }
    ],
    regulatoryNote: "Subject to FINTRAC regulations and Canadian regulatory oversight.",
    languages: ["en", "fr"]
  },
  MX: {
    code: "MX",
    name: "Mexico",
    flag: "🇲🇽",
    currency: { code: "MXN", symbol: "Mex$", name: "Mexican Peso" },
    phoneCode: "+52",
    phoneFormat: "55 1234 5678",
    dateFormat: "DD/MM/YYYY",
    regionsLabel: "Estado (State)",
    regions: ["Ciudad de México", "Jalisco", "Nuevo León", "Estado de México", "Puebla", "Guanajuato", "Veracruz", "Yucatán", "Querétaro"],
    idTypes: [
      { id: "ine", label: "Credencial para Votar (INE / IFE)", placeholder: "Clave de elector", reason: "Official identification required by CNBV regulations for Mexican banking." },
      { id: "curp", label: "Clave Única de Registro de Población (CURP)", placeholder: "18-character alphanumeric code", reason: "Essential citizen registry identification for financial transactions." },
      { id: "passport", label: "Pasaporte Mexicano", placeholder: "Passport number", reason: "Valid alternative international identity document." }
    ],
    regulatoryNote: "Complying with CNBV and SHCP financial transparency guidelines in Mexico.",
    languages: ["es", "en"]
  },
  CN: {
    code: "CN",
    name: "China (中国)",
    flag: "🇨🇳",
    currency: { code: "CNY", symbol: "¥", name: "Chinese Yuan (RMB)" },
    phoneCode: "+86",
    phoneFormat: "138 0000 0000",
    dateFormat: "YYYY年MM月DD日",
    regionsLabel: "Province / Municipality (省 / 直辖市)",
    regions: ["Beijing (北京)", "Shanghai (上海)", "Guangdong (广东)", "Zhejiang (浙江)", "Jiangsu (江苏)", "Sichuan (四川)", "Hubei (湖北)"],
    idTypes: [
      { id: "resident_id", label: "Resident Identity Card (居民身份证)", placeholder: "18-digit identity number", reason: "Mandatory official identification required by PBOC banking regulations." },
      { id: "passport", label: "Chinese Passport (中国护照)", placeholder: "Passport number (for overseas verification)", reason: "Permitted international traveler identification." }
    ],
    regulatoryNote: "Subject to PBOC and NFRA cross-border financial and foreign exchange guidelines.",
    languages: ["zh-CN", "en"]
  },
  TW: {
    code: "TW",
    name: "Taiwan (台灣)",
    flag: "🇹🇼",
    currency: { code: "TWD", symbol: "NT$", name: "New Taiwan Dollar" },
    phoneCode: "+886",
    phoneFormat: "0912 345 678",
    dateFormat: "YYYY/MM/DD",
    regionsLabel: "City / County (縣市)",
    regions: ["Taipei (台北市)", "New Taipei (新北市)", "Taichung (台中市)", "Kaohsiung (高雄市)", "Tainan (台南市)", "Taoyuan (桃園市)", "Hsinchu (新竹)"],
    idTypes: [
      { id: "national_id", label: "National Identification Card (國民身分證)", placeholder: "1 letter + 9 digits", reason: "Standard legal identification required by FSC Taiwan." },
      { id: "passport", label: "Taiwan Passport (中華民國護照)", placeholder: "9-digit passport number", reason: "Official secondary photographic document." }
    ],
    regulatoryNote: "In adherence to Taiwan Financial Supervisory Commission (FSC) consumer banking requirements.",
    languages: ["zh-TW", "en"]
  },
  JP: {
    code: "JP",
    name: "Japan (日本)",
    flag: "🇯🇵",
    currency: { code: "JPY", symbol: "¥", name: "Japanese Yen" },
    phoneCode: "+81",
    phoneFormat: "090-1234-5678",
    dateFormat: "YYYY年MM月DD日",
    regionsLabel: "Prefecture (都道府県)",
    regions: ["Tokyo (東京都)", "Osaka (大阪府)", "Kanagawa (神奈川県)", "Aichi (愛知県)", "Fukuoka (福岡県)", "Kyoto (京都府)", "Hokkaido (北海道)"],
    idTypes: [
      { id: "my_number", label: "Individual Number Card (マイナンバーカード)", placeholder: "12-digit number", reason: "Required under the Act on the Use of Numbers in Administrative Procedures." },
      { id: "driving_license", label: "Driver's License (運転免許証)", placeholder: "12-digit license number", reason: "Primary photo identification recognized by JFSA." },
      { id: "passport", label: "Japanese Passport (パスポート)", placeholder: "Passport number", reason: "Verified government travel credential." }
    ],
    regulatoryNote: "Administered pursuant to Japan Financial Services Agency (JFSA) customer due diligence directives.",
    languages: ["ja", "en"]
  },
  VN: {
    code: "VN",
    name: "Vietnam (Việt Nam)",
    flag: "🇻🇳",
    currency: { code: "VND", symbol: "₫", name: "Vietnamese Dong" },
    phoneCode: "+84",
    phoneFormat: "091 234 5678",
    dateFormat: "DD/MM/YYYY",
    regionsLabel: "Province / Municipality (Tỉnh / Thành phố)",
    regions: ["Hà Nội", "Hồ Chí Minh", "Đà Nẵng", "Hải Phòng", "Cần Thơ", "Bình Dương", "Đồng Nai"],
    idTypes: [
      { id: "cccd", label: "Citizen Identity Card (Căn cước công dân / CCCD)", placeholder: "12-digit CCCD code", reason: "Mandatory biometric citizen identification required by the State Bank of Vietnam." },
      { id: "passport", label: "Vietnamese Passport (Hộ chiếu)", placeholder: "Passport number", reason: "Accepted international travel credential." }
    ],
    regulatoryNote: "Governed by State Bank of Vietnam (SBV) know-your-customer (KYC) statutes.",
    languages: ["vi", "en"]
  },
  KR: {
    code: "KR",
    name: "South Korea (대한민국)",
    flag: "🇰🇷",
    currency: { code: "KRW", symbol: "₩", name: "South Korean Won" },
    phoneCode: "+82",
    phoneFormat: "010-1234-5678",
    dateFormat: "YYYY.MM.DD",
    regionsLabel: "Province / Special City (시 / 도)",
    regions: ["Seoul (서울특별시)", "Gyeonggi-do (경기도)", "Busan (부산광역시)", "Incheon (인천광역시)", "Daegu (대구광역시)", "Daejeon (대전광역시)"],
    idTypes: [
      { id: "rrn", label: "Resident Registration Card (주민등록증)", placeholder: "Resident registration number", reason: "Mandated under the Real-Name Financial Transactions Act." },
      { id: "driver_license", label: "Driver's License (운전면허증)", placeholder: "Official driver's license number", reason: "Recognized biometric photo ID by the Financial Services Commission." },
      { id: "passport", label: "Korean Passport (대한민국 여권)", placeholder: "Passport number", reason: "Alternative verified government document." }
    ],
    regulatoryNote: "Complies with South Korean Financial Services Commission (FSC) Real-Name Financial Transaction laws.",
    languages: ["ko", "en"]
  },
  CH: {
    code: "CH",
    name: "Switzerland (Schweiz / Suisse / Svizzera)",
    flag: "🇨🇭",
    currency: { code: "CHF", symbol: "CHF", name: "Swiss Franc" },
    phoneCode: "+41",
    phoneFormat: "79 123 45 67",
    dateFormat: "DD.MM.YYYY",
    regionsLabel: "Canton (Kanton / Canton)",
    regions: ["Zürich", "Geneva (Genève)", "Vaud", "Bern", "Basel-Stadt", "Zug", "Lucerne", "Ticino", "St. Gallen"],
    idTypes: [
      { id: "swiss_passport", label: "Swiss Passport or National ID (Identitätskarte)", placeholder: "Swiss document ID", reason: "Required by FINMA due diligence and money laundering ordinance." },
      { id: "residence_permit", label: "Swiss Residence Permit (Ausländerausweis B/C)", placeholder: "Permit document number", reason: "Authorized identification for resident foreigners." }
    ],
    regulatoryNote: "Subject to Swiss Federal Act on Banks and FINMA compliance standards.",
    languages: ["de", "fr", "en"]
  },
  DE: {
    code: "DE",
    name: "Germany (Deutschland)",
    flag: "🇩🇪",
    currency: { code: "EUR", symbol: "€", name: "Euro" },
    phoneCode: "+49",
    phoneFormat: "151 12345678",
    dateFormat: "DD.MM.YYYY",
    regionsLabel: "Bundesland (Federal State)",
    regions: ["Bayern", "Baden-Württemberg", "Nordrhein-Westfalen", "Hessen", "Berlin", "Hamburg", "Sachsen", "Niedersachsen"],
    idTypes: [
      { id: "personalausweis", label: "German National ID (Personalausweis)", placeholder: "Alphanumeric ID code", reason: "Primary identification mandated by the German Money Laundering Act (GwG)." },
      { id: "reisepass", label: "Reisepass (German Passport)", placeholder: "9-character passport number", reason: "Official identification combined with registration certificate (Meldebescheinigung)." },
      { id: "eu_passport", label: "EU / International Passport", placeholder: "Passport number", reason: "Recognized under European BaFin anti-money laundering regulations." }
    ],
    regulatoryNote: "Operated in alignment with BaFin regulations and German Banking Act (KWG) standards.",
    languages: ["de", "en"]
  }
};

export interface LanguageConfig {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
}

export const SUPPORTED_LANGUAGES: Record<string, LanguageConfig> = {
  en: { code: "en", name: "English", nativeName: "English (US)", flag: "🇺🇸" },
  es: { code: "es", name: "Spanish", nativeName: "Español", flag: "🇪🇸" },
  fr: { code: "fr", name: "French", nativeName: "Français", flag: "🇫🇷" },
  de: { code: "de", name: "German", nativeName: "Deutsch", flag: "🇩🇪" },
  "zh-CN": { code: "zh-CN", name: "Simplified Chinese", nativeName: "简体中文", flag: "🇨🇳" },
  "zh-TW": { code: "zh-TW", name: "Traditional Chinese", nativeName: "繁體中文", flag: "🇹🇼" },
  ja: { code: "ja", name: "Japanese", nativeName: "日本語", flag: "🇯🇵" },
  vi: { code: "vi", name: "Vietnamese", nativeName: "Tiếng Việt", flag: "🇻🇳" },
  ko: { code: "ko", name: "Korean", nativeName: "한국어", flag: "🇰🇷" }
};

export interface TranslationDict {
  brandName: string;
  tagline: string;
  motto: string;
  heroHeadline: string;
  heroSubheadline: string;
  signIn: string;
  createAccount: string;
  checkStatus: string;
  exploreBanking: string;
  contactUs: string;
  adminPortal: string;
  staffPortal?: string;
  selectCountry: string;
  selectLanguage: string;
  countryNotice: string;
  securityNotice: string;
  mfaTitle: string;
  mfaPrompt: string;
  personalBanking: string;
  businessBanking: string;
  onlineBanking: string;
  aboutUs: string;
  recentTransactions: string;
  welcomeBack: string;
  checking: string;
  savings: string;
  sendFunds: string;
  quickTransfer: string;
  signOut: string;
}

export const TRANSLATIONS: Record<string, TranslationDict> = {
  en: {
    brandName: "US FINANCE BANK",
    tagline: "Online Banking",
    motto: "Stronger Together for a Brighter Future",
    heroHeadline: "Banking Made Simpler. Your Future, Your Finance.",
    heroSubheadline: "Discover a modern, secure, and multilingual digital banking experience designed to make managing your money simple, convenient, and accessible worldwide.",
    signIn: "Customer Sign In",
    createAccount: "Create Account / Apply",
    checkStatus: "Check Application Status",
    exploreBanking: "Explore Banking",
    contactUs: "Contact Us",
    adminPortal: "Staff Sign In Admin — Centralized Super Administrator Dashboard",
    staffPortal: "Staff Sign In Admin — Centralized Super Administrator Dashboard",
    selectCountry: "Select Country / Territory",
    selectLanguage: "Language",
    countryNotice: "Target service region for authorized international operations. Requirements are tailored to local banking frameworks.",
    securityNotice: "Bank-grade 256-bit encryption. Passwords and sensitive verification data are hashed securely. Bank officials will never ask for your PIN or OTP.",
    mfaTitle: "Multi-Factor Verification",
    mfaPrompt: "A one-time verification code (OTP) has been dispatched to your verified security channel.",
    personalBanking: "Personal Banking",
    businessBanking: "Business Banking",
    onlineBanking: "Online Banking",
    aboutUs: "About Us",
    recentTransactions: "Recent Transactions",
    welcomeBack: "Welcome back",
    checking: "Advantage Checking",
    savings: "High-Yield Savings",
    sendFunds: "Send Funds",
    quickTransfer: "Quick Fund Transfer",
    signOut: "Sign Out"
  },
  es: {
    brandName: "US FINANCE BANK",
    tagline: "Banca en Línea",
    motto: "Más Fuertes Juntos por un Futuro Más Brillante",
    heroHeadline: "Banca Más Sencilla. Tu Futuro, Tus Finanzas.",
    heroSubheadline: "Descubra una experiencia bancaria digital moderna, segura y multilingüe diseñada para simplificar y proteger sus finanzas a nivel global.",
    signIn: "Iniciar Sesión",
    createAccount: "Crear Cuenta / Solicitar",
    checkStatus: "Consultar Estado de Solicitud",
    exploreBanking: "Explorar Servicios",
    contactUs: "Contáctenos",
    adminPortal: "Portal Solo Admin",
    staffPortal: "Portal Solo Admin",
    selectCountry: "Seleccionar País / Territorio",
    selectLanguage: "Idioma",
    countryNotice: "Región de servicio planificada. Los requisitos se adaptan al marco regulatorio bancario de su país.",
    securityNotice: "Cifrado bancario de 256 bits. Jamás compartiremos su información ni le solicitaremos su PIN o código OTP.",
    mfaTitle: "Autenticación de Dos Factores",
    mfaPrompt: "Se ha enviado un código de seguridad único (OTP) a su número o correo registrado.",
    personalBanking: "Banca Personal",
    businessBanking: "Banca Empresarial",
    onlineBanking: "Banca Digital",
    aboutUs: "Acerca de Nosotros",
    recentTransactions: "Transacciones Recientes",
    welcomeBack: "Bienvenido",
    checking: "Cuenta de Cheques",
    savings: "Cuenta de Ahorros",
    sendFunds: "Enviar Fondos",
    quickTransfer: "Transferencia Rápida",
    signOut: "Cerrar Sesión"
  },
  fr: {
    brandName: "US FINANCE BANK",
    tagline: "Banque en Ligne",
    motto: "Plus Forts Ensemble pour un Avenir Meilleur",
    heroHeadline: "La Banque Plus Simple. Votre Avenir, Vos Finances.",
    heroSubheadline: "Découvrez une expérience bancaire numérique moderne, hautement sécurisée et multilingue conçue pour simplifier la gestion de votre argent.",
    signIn: "Connexion Client",
    createAccount: "Ouvrir un Compte",
    checkStatus: "Vérifier le Statut du Dossier",
    exploreBanking: "Découvrir nos Offres",
    contactUs: "Nous Contacter",
    adminPortal: "Portail Solo Admin",
    staffPortal: "Portail Solo Admin",
    selectCountry: "Sélectionner le Pays",
    selectLanguage: "Langue",
    countryNotice: "Zone de service prévue. Formats et exigences réglementaires adaptés à chaque juridiction.",
    securityNotice: "Cryptage bancaire 256 bits. Nous ne vous demanderons jamais votre mot de passe, code secret ou code OTP.",
    mfaTitle: "Authentification Multifacteur (2FA)",
    mfaPrompt: "Un code de vérification à usage unique a été envoyé à vos coordonnées sécurisées.",
    personalBanking: "Banque des Particuliers",
    businessBanking: "Banque des Entreprises",
    onlineBanking: "Services en Ligne",
    aboutUs: "À Propos",
    recentTransactions: "Dernières Opérations",
    welcomeBack: "Bienvenue",
    checking: "Compte Courant",
    savings: "Compte Épargne",
    sendFunds: "Transférer des Fonds",
    quickTransfer: "Virement Rapide",
    signOut: "Déconnexion"
  },
  de: {
    brandName: "US FINANCE BANK",
    tagline: "Online-Banking",
    motto: "Gemeinsam Stärker für eine Bessere Zukunft",
    heroHeadline: "Banking Einfach Gemacht. Ihre Zukunft, Ihre Finanzen.",
    heroSubheadline: "Erleben Sie modernes, sicheres und mehrsprachiges digitales Banking nach höchsten Sicherheits- und Compliance-Standards.",
    signIn: "Kunden-Login",
    createAccount: "Konto Eröffnen / Antrag",
    checkStatus: "Antragsstatus Prüfen",
    exploreBanking: "Banking Entdecken",
    contactUs: "Kontakt Aufnehmen",
    adminPortal: "Solo Admin-Portal",
    staffPortal: "Solo Admin-Portal",
    selectCountry: "Land / Region Auswählen",
    selectLanguage: "Sprache",
    countryNotice: "Geplantes Zielgebiet. Länderanforderungen unterliegen der vorherigen rechtlichen und regulatorischen Prüfung.",
    securityNotice: "256-Bit-Bankenverschlüsselung. Passwörter werden nie im Klartext gespeichert. Geben Sie niemals Ihre PIN oder OTP weiter.",
    mfaTitle: "Zwei-Faktor-Authentifizierung (2FA)",
    mfaPrompt: "Ein Einmalcode (OTP) wurde zur Sicherheitsbestätigung versendet.",
    personalBanking: "Privatkunden",
    businessBanking: "Firmenkunden",
    onlineBanking: "Digital Banking",
    aboutUs: "Über Uns",
    recentTransactions: "Letzte Buchungen",
    welcomeBack: "Willkommen zurück",
    checking: "Girokonto",
    savings: "Tagesgeld / Sparkonto",
    sendFunds: "Geld Überweisen",
    quickTransfer: "Schnellüberweisung",
    signOut: "Abmelden"
  },
  "zh-CN": {
    brandName: "US FINANCE BANK (美融银行)",
    tagline: "网上银行",
    motto: "携手共创更美好的未来",
    heroHeadline: "让金融更简捷。您的未来，您的财富。",
    heroSubheadline: "畅享现代、安全、多语言的全球数字银行服务体验，无论您身在何处，都能轻松管理与增值您的资金。",
    signIn: "客户登录",
    createAccount: "开立账户 / 申请",
    checkStatus: "查询申请进度",
    exploreBanking: "探索金融产品",
    contactUs: "联系我们",
    adminPortal: "独家超级管理控制台",
    staffPortal: "独家超级管理控制台",
    selectCountry: "选择国家或地区",
    selectLanguage: "语言选择",
    countryNotice: "拟定服务区域。各国开户要求与身份验证规则均遵照当地金融监管规定合规配置。",
    securityNotice: "采用256位银行级数据加密。密码以哈希加密存储，银行员工绝不会索要您的密码、PIN码或一次性动态验证码。",
    mfaTitle: "多因素身份验证 (2FA / MFA)",
    mfaPrompt: "已向您的安全手机或邮箱发送一次性安全验证码 (OTP)。",
    personalBanking: "个人银行",
    businessBanking: "商业与企业金融",
    onlineBanking: "数字网银",
    aboutUs: "关于我们",
    recentTransactions: "近期交易明细",
    welcomeBack: "欢迎回来",
    checking: "活期支票账户",
    savings: "高息储蓄账户",
    sendFunds: "转账汇款",
    quickTransfer: "即时转账",
    signOut: "安全退出"
  },
  "zh-TW": {
    brandName: "US FINANCE BANK (美融銀行)",
    tagline: "網路銀行",
    motto: "攜手共創更美好的未來",
    heroHeadline: "讓金融更簡捷。您的未來，您的財富。",
    heroSubheadline: "體驗現代、安全、多語言的全球數位金融服務，讓資產管理隨時隨地輕鬆無憂。",
    signIn: "會員登入",
    createAccount: "線上開戶 / 申辦",
    checkStatus: "查詢申辦進度",
    exploreBanking: "探索金融服務",
    contactUs: "聯絡我們",
    adminPortal: "獨家超級管理後台",
    staffPortal: "獨家超級管理後台",
    selectCountry: "選擇國家或地區",
    selectLanguage: "語言",
    countryNotice: "預計服務市場。各國開戶標準與證件查驗均依當地主管機關規範落實合規作業。",
    securityNotice: "256位元高規格資安加密。行員絕不會向您索取密碼、金融卡PIN碼或一次性簡訊認證碼。",
    mfaTitle: "雙重身分驗證 (MFA)",
    mfaPrompt: "一次性動態安全代碼已傳送至您登記的安全信箱或行動電話。",
    personalBanking: "個人金融",
    businessBanking: "企業金融",
    onlineBanking: "數位網銀",
    aboutUs: "關於本行",
    recentTransactions: "近期往來紀錄",
    welcomeBack: "歡迎回來",
    checking: "活期支票戶",
    savings: "高利儲蓄戶",
    sendFunds: "進行轉帳",
    quickTransfer: "快速撥款",
    signOut: "登出系統"
  },
  ja: {
    brandName: "US FINANCE BANK",
    tagline: "オンラインバンキング",
    motto: "ともにより明るい未来へ",
    heroHeadline: "バンキングをもっとシンプルに。未来を築く確かな金融。",
    heroSubheadline: "世界基準のセキュリティと多言語対応を備えたデジタルバンキング。資産管理をいつでも快適で身近なものに。",
    signIn: "ログイン",
    createAccount: "口座開設 / お申込み",
    checkStatus: "審査状況の確認",
    exploreBanking: "サービス一覧",
    contactUs: "お問い合わせ",
    adminPortal: "統括管理者ポータル",
    staffPortal: "統括管理者ポータル",
    selectCountry: "国・地域を選択",
    selectLanguage: "言語",
    countryNotice: "当行の事業展開予定エリアです。各国の法令および金融規制に基づき適切な手続きを行います。",
    securityNotice: "256ビット暗号化通信。当行スタッフがパスワードや暗証番号、ワンタイム認証コードをお尋ねすることは決してありません。",
    mfaTitle: "二要素認証 (MFA)",
    mfaPrompt: "ご登録の連絡先にワンタイム認証コード（OTP）を発行いたしました。",
    personalBanking: "個人のお客さま",
    businessBanking: "法人のお客さま",
    onlineBanking: "デジタル機能",
    aboutUs: "当行について",
    recentTransactions: "最近のお取引明細",
    welcomeBack: "お帰りなさいませ",
    checking: "普通決済口座",
    savings: "定期・高金利貯蓄口座",
    sendFunds: "資金移動・お振込み",
    quickTransfer: "クイック送金",
    signOut: "ログアウト"
  },
  vi: {
    brandName: "US FINANCE BANK",
    tagline: "Ngân Hàng Trực Tuyến",
    motto: "Cùng Nhau Vững Bước Vì Một Tương Lai Tươi Sáng",
    heroHeadline: "Ngân Hàng Đơn Giản Hơn. Tương Lai Của Bạn, Tài Chính Của Bạn.",
    heroSubheadline: "Trải nghiệm ngân hàng số hiện đại, an toàn và đa ngôn ngữ, giúp quản lý tài chính của bạn dễ dàng, thuận tiện và minh bạch mọi lúc mọi nơi.",
    signIn: "Đăng Nhập Khách Hàng",
    createAccount: "Mở Tài Khoản / Đăng Ký",
    checkStatus: "Kiểm Tra Hồ Sơ",
    exploreBanking: "Khám Phá Dịch Vụ",
    contactUs: "Liên Hệ Hỗ Trợ",
    adminPortal: "Cổng Quản Trị Solo Admin",
    staffPortal: "Cổng Quản Trị Solo Admin",
    selectCountry: "Chọn Quốc Gia / Vùng Lãnh Thổ",
    selectLanguage: "Ngôn Ngữ",
    countryNotice: "Khu vực dự kiến phục vụ. Quy trình mở tài khoản và xác minh danh tính tuân thủ pháp luật sở tại.",
    securityNotice: "Bảo mật cấp ngân hàng mã hóa 256-bit. Nhân viên ngân hàng không bao giờ yêu cầu mật khẩu, mã PIN hay mã xác thực OTP của bạn.",
    mfaTitle: "Xác Thực Hai Yếu Tố (MFA / 2FA)",
    mfaPrompt: "Mã xác thực một lần (OTP) đã được gửi đến số điện thoại hoặc email đã đăng ký của bạn.",
    personalBanking: "Ngân Hàng Cá Nhân",
    businessBanking: "Doanh Nghiệp",
    onlineBanking: "Ngân Hàng Điện Tử",
    aboutUs: "Về Chúng Tôi",
    recentTransactions: "Giao Dịch Gần Đây",
    welcomeBack: "Xin chào",
    checking: "Tài Khoản Thanh Toán",
    savings: "Tài Khoản Tiết Kiệm Lãi Suất Cao",
    sendFunds: "Chuyển Tiền",
    quickTransfer: "Chuyển Tiền Nhanh",
    signOut: "Đăng Xuất"
  },
  ko: {
    brandName: "US FINANCE BANK",
    tagline: "인터넷 뱅킹",
    motto: "더 밝은 내일을 향해 함께하는 금융",
    heroHeadline: "금융을 더 단순하고 명쾌하게. 당신의 미래, 당신의 자산.",
    heroSubheadline: "세계 최고 수준의 보안과 다국어 지원을 갖춘 디지털 뱅킹으로 언제 어디서나 안전하고 편리하게 자산을 관리하세요.",
    signIn: "고객 로그인",
    createAccount: "계좌 개설 / 신청하기",
    checkStatus: "신청 진행 상황 조회",
    exploreBanking: "금융 상품 둘러보기",
    contactUs: "고객 센터",
    adminPortal: "총괄 관리자 포털",
    staffPortal: "총괄 관리자 포털",
    selectCountry: "국가 및 지역 선택",
    selectLanguage: "언어 선택",
    countryNotice: "서비스 제공 예정 국가입니다. 각 국가별 금융 법규 및 실명 확인 규정에 따라 맞춤 적용됩니다.",
    securityNotice: "256비트 금융 암호화 적용. 당행 직원은 고객님의 비밀번호, 계좌 비밀번호(PIN), 1회용 인증번호(OTP)를 절대 요구하지 않습니다.",
    mfaTitle: "다중 인증 (MFA / 2차 인증)",
    mfaPrompt: "등록된 보안 채널로 1회용 인증번호(OTP)가 발송되었습니다.",
    personalBanking: "개인 뱅킹",
    businessBanking: "기업 뱅킹",
    onlineBanking: "디지털 서비스",
    aboutUs: "은행 소개",
    recentTransactions: "최근 거래 내역",
    welcomeBack: "환영합니다",
    checking: "입출금 종합통장",
    savings: "고금리 정기예금/적금",
    sendFunds: "즉시 이체",
    quickTransfer: "간편 송금",
    signOut: "로그아웃"
  }
};
