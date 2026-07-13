// Records — verified all-time stats
// Snapshot: July 2026

export const RECORDS = [
  {
    title: 'Top scorers',
    kind: 'all-time',
    rows: [
      { what: 'All-time top scorer (all comps)', who: 'Ian Rush', val: '346 goals', why: '1980–87 & 1988–96 · 660 apps · 5 league titles · 2 European Cups', url: 'https://en.wikipedia.org/wiki/Ian_Rush' },
      { what: 'Top Premier League scorer (LFC)', who: 'Mohamed Salah', val: '~210 PL goals', why: '2017–present · closing in on Rush\'s all-comps record', url: 'https://en.wikipedia.org/wiki/Mohamed_Salah' },
      { what: 'Top post-war goals in a season', who: 'Roger Hunt', val: '41 league goals', why: '1961-62 · won the Footballer of the Year', url: 'https://en.wikipedia.org/wiki/Roger_Hunt' },
      { what: 'Most goals in a single match', who: 'Ian Rush vs QPR', val: '5 goals', why: '5 March 1986 · Milk Cup (League Cup) semi-final 1st leg · Liverpool 10 QPR 0 at Anfield', url: 'https://www.lfchistory.net/players/301/games/1985-86' }
    ]
  },
  {
    title: 'Most appearances',
    kind: 'all-time',
    rows: [
      { what: 'All-time record', who: 'Ian Callaghan', val: '857 apps', why: '1960–1978 · 5 league titles · 1 European Cup', url: 'https://en.wikipedia.org/wiki/Ian_Callaghan' },
      { what: 'Modern-era record', who: 'Steven Gerrard', val: '710 apps', why: '1998–2015 · 186 goals · 1 CL · 2 FA Cups · 3 LCups', url: 'https://en.wikipedia.org/wiki/Steven_Gerrard' },
      { what: 'Most European appearances', who: 'Jamie Carragher', val: '150 European apps', why: '1997–2013 · also 1st LFC to 500 PL apps', url: 'https://en.wikipedia.org/wiki/Jamie_Carragher' }
    ]
  },
  {
    title: 'Anfield attendance',
    kind: 'all-time',
    rows: [
      { what: 'All-time Anfield record', who: 'Liverpool v Wolves', val: '61,905', why: 'FA Cup 5th round · 2 February 1952 · standing terraces', url: 'https://en.wikipedia.org/wiki/Anfield' },
      { what: 'Modern-day capacity', who: 'Anfield', val: '~61,000', why: 'Anfield Road End expansion completed 2024', url: 'https://www.liverpoolfc.com/anfield' }
    ]
  },
  {
    title: 'Biggest wins',
    kind: 'all-time',
    rows: [
      { what: 'Biggest league win', who: 'LFC v Rotherham Town', val: '10–1', why: 'Football League Division One · 18 February 1896', url: 'https://en.wikipedia.org/wiki/Liverpool_F.C._season_1895%E2%80%9396' },
      { what: 'Biggest European win', who: 'LFC v Strømsgodset', val: '11–0', why: 'European Cup Winners\' Cup · 17 September 1974 · Graeme Souness scored a hat-trick', url: 'https://en.wikipedia.org/wiki/Liverpool_F.C._in_European_football' },
      { what: 'Biggest FA Cup win', who: 'LFC v Fulham', val: '6–0', why: 'FA Cup · 8 February 1986 · at Anfield', url: 'https://en.wikipedia.org/wiki/List_of_Liverpool_F.C._records_and_statistics' }
    ]
  },
  {
    title: 'Transfer records',
    kind: 'transfers',
    rows: [
      { what: 'Most expensive signing', who: 'Florian Wirtz', val: '~£100m (€116m)', why: 'From Bayer Leverkusen · 2025 · 5-year contract', url: 'https://www.bbc.com/sport/football/articles/c1m5g71l7exo' },
      { what: 'Record sale', who: 'Philippe Coutinho', val: '£105m', why: 'To FC Barcelona · January 2018 · biggest profit in LFC history', url: 'https://en.wikipedia.org/wiki/Philippe_Coutinho' },
      { what: 'World-record defender', who: 'Virgil van Dijk', val: '£75m', why: 'From Southampton · January 2018 · world record for a CB at the time', url: 'https://en.wikipedia.org/wiki/Virgil_van_Dijk' },
      { what: 'World-record goalkeeper', who: 'Alisson Becker', val: '£65m', why: 'From AS Roma · July 2018 · world record for a GK at the time', url: 'https://en.wikipedia.org/wiki/Alisson_Becker' }
    ]
  },
  {
    title: 'Longest runs & unbeaten streaks',
    kind: 'streaks',
    rows: [
      { what: 'Longest top-flight unbeaten run', who: 'LFC 2019-20', val: '44 PL games', why: '44W 14D · finally lost to Watford · ended ~14 months unbeaten', url: 'https://www.bbc.com/sport/football/51636019' },
      { what: 'Longest European unbeaten run', who: 'LFC 2018-19', val: '12 CL games without defeat', why: 'Includes the 4-0 vs Barcelona · lost the final', url: 'https://en.wikipedia.org/wiki/2018%E2%80%9319_UEFA_Champions_League' },
      { what: 'Consecutive home wins (PL)', who: 'LFC 2018-19', val: '24 straight home wins', why: 'A PL record at the time', url: 'https://en.wikipedia.org/wiki/List_of_Premier_League_records_and_statistics' }
    ]
  }
];

export const RECORD_SOURCES = [
  { label: 'Wikipedia: Liverpool FC records', url: 'https://en.wikipedia.org/wiki/List_of_Liverpool_F.C._records_and_statistics' },
  { label: 'RSSSF: Liverpool records', url: 'https://www.rsssf.org/tablesl/everliverpoolhist.html' },
  { label: 'Premier League official site', url: 'https://www.premierleague.com/clubs/10/Liverpool/overview' }
];
