import createCountryList from 'country-list'

const usStates = {
  AL: 'Alabama',
  AK: 'Alaska',
  AS: 'American Samoa',
  AZ: 'Arizona',
  AR: 'Arkansas',
  CA: 'California',
  CO: 'Colorado',
  CT: 'Connecticut',
  DE: 'Delaware',
  DC: 'District Of Columbia',
  FM: 'Federated States Of Micronesia',
  FL: 'Florida',
  GA: 'Georgia',
  GU: 'Guam',
  HI: 'Hawaii',
  ID: 'Idaho',
  IL: 'Illinois',
  IN: 'Indiana',
  IA: 'Iowa',
  KS: 'Kansas',
  KY: 'Kentucky',
  LA: 'Louisiana',
  ME: 'Maine',
  MH: 'Marshall Islands',
  MD: 'Maryland',
  MA: 'Massachusetts',
  MI: 'Michigan',
  MN: 'Minnesota',
  MS: 'Mississippi',
  MO: 'Missouri',
  MT: 'Montana',
  NE: 'Nebraska',
  NV: 'Nevada',
  NH: 'New Hampshire',
  NJ: 'New Jersey',
  NM: 'New Mexico',
  NY: 'New York',
  NC: 'North Carolina',
  ND: 'North Dakota',
  MP: 'Northern Mariana Islands',
  OH: 'Ohio',
  OK: 'Oklahoma',
  OR: 'Oregon',
  PW: 'Palau',
  PA: 'Pennsylvania',
  PR: 'Puerto Rico',
  RI: 'Rhode Island',
  SC: 'South Carolina',
  SD: 'South Dakota',
  TN: 'Tennessee',
  TX: 'Texas',
  UT: 'Utah',
  VT: 'Vermont',
  VI: 'Virgin Islands',
  VA: 'Virginia',
  WA: 'Washington',
  WV: 'West Virginia',
  WI: 'Wisconsin',
  WY: 'Wyoming'
}

const auStates = {
  NSW: 'New South Wales',
  VIC: 'Victoria',
  QLD: 'Queensland',
  TAS: 'Tasmania',
  SA: 'South Australia',
  WA: 'Western Australia',
  NT: 'Northern Territory',
  ACT: 'Australian Capital Territory'
}

const jpStates = {
  '10': 'Gunma',
  '11': 'Saitama',
  '12': 'Chiba',
  '13': 'Tokyo',
  '14': 'Kanagawa',
  '15': 'Niigata',
  '16': 'Toyama',
  '17': 'Ishikawa',
  '18': 'Fukui',
  '19': 'Yamanashi',
  '20': 'Nagano',
  '21': 'Gifu',
  '22': 'Shizuoka',
  '23': 'Aichi',
  '24': 'Mie',
  '25': 'Shiga',
  '26': 'Kyoto',
  '27': 'Osaka',
  '28': 'Hyogo',
  '29': 'Nara',
  '30': 'Wakayama',
  '31': 'Tottori',
  '32': 'Shimane',
  '33': 'Okayama',
  '34': 'Hiroshima',
  '35': 'Yamaguchi',
  '36': 'Tokushima',
  '37': 'Kagawa',
  '38': 'Ehime',
  '39': 'Kochi',
  '40': 'Fukuoka',
  '41': 'Saga',
  '42': 'Nagasaki',
  '43': 'Kumamoto',
  '44': 'Oita',
  '45': 'Miyazaki',
  '46': 'Kagoshima',
  '47': 'Okinawa',
  '05': 'Akita',
  '02': 'Aomori',
  '07': 'Fukushima',
  '01': 'Hokkaido',
  '08': 'Ibaraki',
  '03': 'Iwate',
  '04': 'Miyagi',
  '09': 'Tochigi',
  '06': 'Yamagata'
}

const caStates = {
  AB: 'Alberta',
  BC: 'British Columbia',
  MB: 'Manitoba',
  NB: 'New Brunswick',
  NL: 'Newfoundland and Labrador',
  NS: 'Nova Scotia',
  NT: 'Northwest Territories',
  NU: 'Nunavut',
  ON: 'Ontario',
  PE: 'Prince Edward Island',
  QC: 'Québec',
  SK: 'Saskatchewan',
  YT: 'Yukon'
}

const countryList = createCountryList()

export function getCountriesMenu() {
  return countryList.getCodes().map(code => ({
    value: code,
    label: countryList.getName(code)
  }))
}

export function getCountryName(code) {
  return countryList.getName(code)
}

function getStateList(states) {
  return Object.keys(states).map(code => ({
    value: code,
    label: states[code]
  }))
}

export function getStateName(countryCode, stateCode) {
  switch (countryCode) {
    case 'US':
      return usStates[stateCode]
    case 'AU':
      return auStates[stateCode]
    case 'JP':
      return jpStates[stateCode]
    case 'CA':
      return caStates[stateCode]
    default:
      return null
  }
}

export function getStates(countryCode) {
  switch (countryCode) {
    case 'US':
      return getStateList(usStates)
    case 'AU':
      return getStateList(auStates)
    case 'JP':
      return getStateList(jpStates)
    case 'CA':
      return getStateList(caStates)
    default:
      return null
  }
}
