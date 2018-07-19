// TODO: split this file into a config part and a lib and test it!
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

const englishStates = {
  Bedfordshire: 'Bedfordshire',
  Berkshire: 'Berkshire',
  Buckinghamshire: 'Buckinghamshire',
  Cambridgeshire: 'Cambridgeshire',
  Cheshire: 'Cheshire',
  'City of Bristol': 'City of Bristol',
  'City of London': 'City of London',
  Cornwall: 'Cornwall',
  'County Durham': 'County Durham',
  Cumberland: 'Cumberland',
  Cumbria: 'Cumbria',
  Derbyshire: 'Derbyshire',
  Devon: 'Devon',
  Dorset: 'Dorset',
  'East Sussex': 'East Sussex',
  Essex: 'Essex',
  Gloucestershire: 'Gloucestershire',
  'Greater London': 'Greater London',
  'Greater Manchester': 'Greater Manchester',
  Hampshire: 'Hampshire',
  Herefordshire: 'Herefordshire',
  Hertfordshire: 'Hertfordshire',
  Huntingdonshire: 'Huntingdonshire',
  'Isle of Wight': 'Isle of Wight',
  Kent: 'Kent',
  Lancashire: 'Lancashire',
  Leicestershire: 'Leicestershire',
  Lincolnshire: 'Lincolnshire',
  Merseyside: 'Merseyside',
  Middlesex: 'Middlesex',
  Norfolk: 'Norfolk',
  Northamptonshire: 'Northamptonshire',
  Northumberland: 'Northumberland',
  'North Yorkshire': 'North Yorkshire',
  Nottinghamshire: 'Nottinghamshire',
  Oxfordshire: 'Oxfordshire',
  Rutland: 'Rutland',
  Shropshire: 'Shropshire',
  Somerset: 'Somerset',
  'South Yorkshire': 'South Yorkshire',
  Staffordshire: 'Staffordshire',
  Suffolk: 'Suffolk',
  Surrey: 'Surrey',
  Sussex: 'Sussex',
  'Tyne and Wear': 'Tyne and Wear',
  Warwickshire: 'Warwickshire',
  'West Midlands': 'West Midlands',
  Westmorland: 'Westmorland',
  'West Sussex': 'West Sussex',
  'West Yorkshire': 'West Yorkshire',
  Wiltshire: 'Wiltshire',
  Worcestershire: 'Worcestershire',
  Yorkshire: 'Yorkshire'
}

const northIrelandStates = {
  Antrim: 'Antrim',
  Ards: 'Ards',
  Armagh: 'Armagh',
  Ballymena: 'Ballymena',
  Ballymoney: 'Ballymoney',
  Banbridge: 'Banbridge',
  Belfast: 'Belfast',
  Carrickfergus: 'Carrickfergus',
  Castlereagh: 'Castlereagh',
  Coleraine: 'Coleraine',
  Cookstown: 'Cookstown',
  Craigavon: 'Craigavon',
  Derry: 'Derry',
  Down: 'Down',
  'Dungannon and South Tyrone': 'Dungannon and South Tyrone',
  Fermanagh: 'Fermanagh',
  Larne: 'Larne',
  Limavady: 'Limavady',
  Lisburn: 'Lisburn',
  Londonderry: 'Londonderry',
  Magherafelt: 'Magherafelt',
  Moyle: 'Moyle',
  'Newry and Mourne': 'Newry and Mourne',
  Newtownabbey: 'Newtownabbey',
  'North Down': 'North Down',
  Omagh: 'Omagh',
  Strabane: 'Strabane'
}

const scottishStates = {
  'Aberdeen City': 'Aberdeen City',
  Aberdeenshire: 'Aberdeenshire',
  Angus: 'Angus',
  'Argyll and Bute': 'Argyll and Bute',
  Ayrshire: 'Ayrshire',
  Clackmannanshire: 'Clackmannanshire',
  'Dumfries and Galloway': 'Dumfries and Galloway',
  Dunbartonshire: 'Dunbartonshire',
  'Dundee City': 'Dundee City',
  'East Lothian': 'East Lothian',
  'Edinburgh City': 'Edingburgh City',
  Falkirk: 'Falkirk',
  Fife: 'Fife',
  'Glasgow City': 'Glasgow City',
  Highland: 'Highland',
  Inverclyde: 'Inverclyde',
  Lanarkshire: 'Lanarkshire',
  Midlothian: 'Midlothian',
  Moray: 'Moray',
  Orkney: 'Orkney',
  'Perth and Kinross': 'Perth and Kinross',
  Renfrewshire: 'Renfrewshire',
  'Scottish Borders': 'Scottish Borders',
  'Shetland Isles': 'Shetland Isles',
  Stirlingshire: 'Stirlingshire',
  'West Lothian': 'West Lothian',
  'Western Isles': 'Western Isles'
}

const welshStates = {
  Anglesey: 'Anglesey',
  'Blaenau Gwent': 'Blaenau Gwent',
  Bridgend: 'Bridgend',
  Caerphilly: 'Caerphilly',
  Cardiff: 'Cardiff',
  Carmarthenshire: 'Carmarthenshire',
  Ceredigion: 'Ceredigion',
  Conwy: 'Conwy',
  Denbighshire: 'Denbighshire',
  Flintshire: 'Flintshire',
  Glamorgan: 'Glamorgan',
  Gwynedd: 'Gwynedd',
  'Merthyr Tydfil': 'Merthyr Tydfil',
  Monmouthshire: 'Monmouthshire',
  'Neath Port Talbot': 'Neath Port Talbot',
  Newport: 'Newport',
  Pembrokeshire: 'Pembrokeshire',
  Powys: 'Powys',
  'Rhondda Cynon Taff': 'Rhondda Cynon Taff',
  Swansea: 'Swansea',
  Torfaen: 'Torfaen',
  Wrexham: 'Wrexham'
}

const unorderedUkStates = {
  ...englishStates,
  ...northIrelandStates,
  ...scottishStates,
  ...welshStates
}

const ukStates = Object.keys(unorderedUkStates)
  .sort()
  .reduce((allKeys, key) => {
    allKeys[key] = unorderedUkStates[key]
    return allKeys
  }, {})

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
    case 'GB':
      return ukStates[stateCode]
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
    case 'GB':
      return getStateList(ukStates)
    default:
      return null
  }
}
