
import { LanguageOption } from './types';

export const LANGUAGES: LanguageOption[] = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'hi', name: 'Hindi (हिंदी)', flag: '🇮🇳' },
  { code: 'bn', name: 'Bengali (বাংলা)', flag: '🇮🇳' },
  { code: 'ta', name: 'Tamil (தமிழ்)', flag: '🇮🇳' },
  { code: 'te', name: 'Telugu (తెలుగు)', flag: '🇮🇳' },
  { code: 'mr', name: 'Marathi (मराठी)', flag: '🇮🇳' },
  { code: 'gu', name: 'Gujarati (ગુજરાતી)', flag: '🇮🇳' },
  { code: 'kn', name: 'Kannada (ಕನ್ನಡ)', flag: '🇮🇳' },
  { code: 'ml', name: 'Malayalam (മലയാളം)', flag: '🇮🇳' },
  { code: 'pa', name: 'Punjabi (ਪੰਜਾਬੀ)', flag: '🇮🇳' },
  { code: 'es', name: 'Spanish (Español)', flag: '🇪🇸' },
  { code: 'fr', name: 'French (Français)', flag: '🇫🇷' },
  { code: 'ar', name: 'Arabic (العربية)', flag: '🇸🇦' },
  { code: 'pt', name: 'Portuguese (Português)', flag: '🇧🇷' },
  { code: 'de', name: 'German (Deutsch)', flag: '🇩🇪' },
  { code: 'it', name: 'Italian (Italiano)', flag: '🇮🇹' },
  { code: 'ja', name: 'Japanese (日本語)', flag: '🇯🇵' },
  { code: 'ko', name: 'Korean (한국어)', flag: '🇰🇷' },
  { code: 'zh', name: 'Chinese (中文)', flag: '🇨🇳' },
  { code: 'ru', name: 'Russian (Русский)', flag: '🇷🇺' },
  { code: 'ur', name: 'Urdu (اردو)', flag: '🇵🇰' },
  { code: 'tr', name: 'Turkish (Türkçe)', flag: '🇹🇷' },
];

export const INDIAN_LANGS = ['hi', 'bn', 'ta', 'te', 'mr', 'gu', 'kn', 'ml', 'pa', 'en'];

export const COUNTRIES = [
  "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia", "Australia", "Austria", 
  "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan", 
  "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cabo Verde", "Cambodia", 
  "Cameroon", "Canada", "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros", "Congo", "Costa Rica", 
  "Croatia", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", 
  "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini", "Ethiopia", "Fiji", "Finland", "France", "Gabon", 
  "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guyana", "Haiti", "Honduras", 
  "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", "Jamaica", "Japan", "Jordan", 
  "Kazakhstan", "Kenya", "Kiribati", "Korea, North", "Korea, South", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", 
  "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Madagascar", "Malawi", "Malaysia", "Maldives", 
  "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", 
  "Montenegro", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands", "New Zealand", "Nicaragua", 
  "Niger", "Nigeria", "North Macedonia", "Norway", "Oman", "Pakistan", "Palau", "Palestine", "Panama", "Papua New Guinea", 
  "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Qatar", "Romania", "Russia", "Rwanda", "Saint Kitts and Nevis", 
  "Saint Lucia", "Saint Vincent", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", 
  "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Sudan", "Spain", 
  "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", 
  "Timor-Leste", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Tuvalu", "Uganda", "Ukraine", 
  "United Arab Emirates", "United Kingdom", "United States", "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City", "Venezuela", 
  "Vietnam", "Yemen", "Zambia", "Zimbabwe"
].sort();

// Comprehensive Mother Tongue + English mapping
export const COUNTRY_LANGUAGE_MAP: Record<string, string[]> = {
  'India': INDIAN_LANGS,
  'Pakistan': ['ur', 'en'],
  'Bangladesh': ['bn', 'en'],
  'China': ['zh', 'en'],
  'Japan': ['ja', 'en'],
  'Korea, South': ['ko', 'en'],
  'France': ['fr', 'en'],
  'Spain': ['es', 'en'],
  'Germany': ['de', 'en'],
  'Italy': ['it', 'en'],
  'Brazil': ['pt', 'en'],
  'Portugal': ['pt', 'en'],
  'Mexico': ['es', 'en'],
  'Argentina': ['es', 'en'],
  'Colombia': ['es', 'en'],
  'Chile': ['es', 'en'],
  'Peru': ['es', 'en'],
  'Egypt': ['ar', 'en'],
  'Saudi Arabia': ['ar', 'en'],
  'United Arab Emirates': ['ar', 'en'],
  'Qatar': ['ar', 'en'],
  'Russia': ['ru', 'en'],
  'Turkey': ['tr', 'en'],
  'Canada': ['en', 'fr'],
  'Switzerland': ['de', 'fr', 'it', 'en'],
  'Belgium': ['fr', 'en'],
  'United States': ['en', 'es'],
  'United Kingdom': ['en'],
  'Australia': ['en'],
};

export const getLanguagesForCountry = (country: string): string[] => {
  return COUNTRY_LANGUAGE_MAP[country] || ['en'];
};

export const ML_STEPS = [
  {
    title: 'Preprocessing',
    desc: 'Converting text to lowercase and removing special characters.',
    details: 'Example: "Get FREE Cash!!!" becomes "get free cash"'
  },
  {
    title: 'Tokenization',
    desc: 'Splitting text into individual words or tokens.',
    details: '["get", "free", "cash"]'
  },
  {
    title: 'Stopwords Removal',
    desc: 'Removing common words like "the", "is", "a" that don\'t add predictive value.',
    details: 'Reduces data dimensionality.'
  },
  {
    title: 'TF-IDF Vectorization',
    desc: 'Converting text into numerical vectors based on word importance.',
    details: 'Term Frequency - Inverse Document Frequency.'
  },
  {
    title: 'Naive Bayes Classification',
    desc: 'A probabilistic algorithm that calculates the likelihood of an email being spam.',
    details: 'Based on Bayes Theorem of conditional probability.'
  }
];
