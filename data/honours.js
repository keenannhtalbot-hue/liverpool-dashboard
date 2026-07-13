// Honours data — verified as of end of 2024-25 season
// Snapshot: July 2026
// Numbers cross-referenced with LFC.com, BBC Sport, Wikipedia

export const HONOURS = [
  {
    id: 'league',
    title: 'English League Championship',
    count: 20,
    blurb: 'The top-flight title — by far the club\'s most-prized possession.',
    years: [
      '1900-01','1905-06','1921-22','1922-23','1946-47',
      '1963-64','1965-66','1972-73','1975-76','1976-77',
      '1978-79','1979-80','1981-82','1982-83','1983-84',
      '1985-86','1987-88','1989-90','2019-20','2024-25'
    ]
  },
  {
    id: 'cl',
    title: 'European Cup / UEFA Champions League',
    count: 6,
    blurb: 'The European Cup — English clubs\' most successful side, tied with AC Milan.',
    years: ['1976-77','1977-78','1980-81','1983-84','2004-05','2018-19']
  },
  {
    id: 'european',
    title: 'UEFA Cup / Europa League',
    count: 3,
    blurb: 'The second-tier European trophy. Winners in 1973, 1976 and 2001.',
    years: ['1972-73','1975-76','2000-01']
  },
  {
    id: 'fa',
    title: 'FA Cup',
    count: 8,
    blurb: 'The oldest cup competition in football. Eight wins since 1881.',
    years: ['1964-65','1973-74','1985-86','1988-89','1991-92','2000-01','2005-06','2021-22']
  },
  {
    id: 'lcup',
    title: 'EFL (League) Cup',
    count: 10,
    blurb: 'Most successful club in the League Cup with 10 wins. The "Chelsea trophy" — 7 of the 10 finals against them.',
    years: ['1980-81','1981-82','1983-84','1994-95','2000-01','2002-03','2011-12','2021-22']
  },
  {
    id: 'supercup',
    title: 'UEFA Super Cup',
    count: 4,
    blurb: 'European super cup between CL and Cup Winners\' Cup winners. 1977, 2001, 2005, 2019.',
    years: ['1977','2001','2005','2019']
  },
  {
    id: 'cwc',
    title: 'FIFA Club World Cup',
    count: 1,
    blurb: 'Global club title, 2019 in Qatar. Won 1-0 vs Flamengo.',
    years: ['2019']
  },
  {
    id: 'shield',
    title: 'FA Charity / Community Shield',
    count: 15,
    blurb: 'Season-opening showpiece. 15 wins including a 1974 SWEEP — Community Shield, Charity Shield, FA Cup, and League title.',
    years: [
      '1964','1965','1966','1974','1976','1977','1979','1980',
      '1982','1986','1988','1989','1990','2001','2006'
    ]
  },
  {
    id: 'second',
    title: 'Second Division (old First Division to 1992)',
    count: 4,
    blurb: 'Before Shankly, the club was a yo-yo between divisions. Four second-tier titles.',
    years: ['1893-94','1895-96','1896-97','1921-22']
  }
];

export const HONOUR_TOTALS = {
  major: 65, // major honours (League, CL, FA Cup, League Cup, UEFA Cup, Super Cup, CWC, Charity Shield) — approximate
  note: 'Includes all major domestic and European trophies. Charity Shield wins are included in the count above. Some sources include the now-defunct Full Members\' Cup (2 wins in 1986, 1988); we omit it.'
};

export const HONOUR_SOURCES = [
  { label: 'Liverpool FC official honours list', url: 'https://www.liverpoolfc.com/history/honours' },
  { label: 'Wikipedia: Liverpool FC honours', url: 'https://en.wikipedia.org/wiki/Liverpool_F.C.#Honours' },
  { label: 'BBC Sport: Liverpool profile', url: 'https://www.bbc.com/sport/football/teams/liverpool' }
];
