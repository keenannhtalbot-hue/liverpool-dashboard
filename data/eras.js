// Eras — the eight managerial eras, 134 years
// Snapshot: July 2026

export const ERAS = [
  {
    id: 'founding',
    name: 'Founding Years',
    years: '1892–1959',
    manager: 'Various',
    summary: 'Founded 3 June 1892 by John Houlding after a rent dispute with Everton. Won three Second Division titles (1893-94, 1895-96, 1904-05), then two league titles before WWI (1900-01 and 1905-06). Reached the FA Cup final twice before the war (lost 1914 to Burnley) and again in 1950 (lost to Arsenal). After 1923 the club drifted, spending long stretches in the Second Division.',
    bullets: [
      'Founded 1892 after Everton left for Goodison Park',
      'First top-flight title: 1900-01 — won by 2 points from Sunderland',
      'Second top-flight title: 1905-06',
      'Lost FA Cup finals 1914 (Burnley) and 1950 (Arsenal)',
      'Bill Shankly appointed manager 1 December 1959'
    ]
  },
  {
    id: 'shankly',
    name: 'Shankly Era',
    years: '1959–1974',
    manager: 'Bill Shankly',
    summary: 'A second-division club arrived at Anfield; Liverpool left fifteen years later as English football\'s first modern super-club. Won 3 league titles, 2 FA Cups, and the 1973 UEFA Cup. The "Boot Room" was born in the underground corridor at Anfield.',
    bullets: [
      'Promoted to First Division 1962 · won the league 1963–64',
      'Second division title 1961-62 — 7 points clear of second place',
      'First FA Cup 1965 (won it again 1974)',
      'First European trophy: UEFA Cup 1973',
      'Shankly retired 1974, handing the keys to Bob Paisley'
    ]
  },
  {
    id: 'paisley',
    name: 'Paisley Era',
    years: '1974–1983',
    manager: 'Bob Paisley',
    summary: 'The quietest, most successful English manager in history. Three European Cups, six league titles, and an FA Cup — won by an ageing but elegant team. Paisley never read his own press, never sought the spotlight.',
    bullets: [
      'First English manager to win three European Cups (1977, 1978, 1981)',
      '6 league titles in 9 years (1976–1983)',
      'Dalglish arrived 1977; Rush arrived 1980',
      'Paisley retired 1983 — still undefeated in a European final'
    ]
  },
  {
    id: 'fagan-dalglish',
    name: 'Fagan & Dalglish',
    years: '1983–1991',
    manager: 'Joe Fagan, then Kenny Dalglish',
    summary: 'Fagan won the league, League Cup, and European Cup in 1984 — the only English manager to take all three in a single season. Handed over to Dalglish in 1985 after Heysel. Dalglish won three league titles as player-manager, and resigned in February 1991 in the immediate aftermath of Hillsborough.',
    bullets: [
      '1984: league, League Cup, European Cup — three of three',
      'Heysel 1985 — 39 Juventus fans died; English clubs banned from Europe for 6 years',
      'Hillsborough 15 April 1989 — 97 Liverpool fans died; the club and city were changed forever',
      'Dalglish resigned 22 February 1991, exhausted after 6 years combining playing and managing',
      'Last title before the 30-year wait: 1989–90'
    ]
  },
  {
    id: 'houllier',
    name: 'Houllier Era',
    years: '1998–2004',
    manager: 'Gérard Houllier',
    summary: 'Stabilised the club after the Evans ownership crisis. Won the 2001 unique treble — League Cup, FA Cup and UEFA Cup — and rebuilt the youth academy. Health scare in 2001; resigned 2004 after falling out with the board.',
    bullets: [
      'Co-manager with Dalglish 1998, sole manager from November 1998',
      '2001: League Cup (Feb), FA Cup (May), UEFA Cup (May) — the unique treble',
      'Gerrard, Carragher, Owen, Hyypiä all signed or graduated under Houllier',
      'Aortic surgery October 2001 — returned to manage 6 months later'
    ]
  },
  {
    id: 'benitez',
    name: 'Benitez Era',
    years: '2004–2010',
    manager: 'Rafael Benítez',
    summary: 'Won the Champions League in 2005 in Istanbul — the most famous European final of all time. Also reached the 2007 final (lost to AC Milan). Two FA Cup finals. Left in 2010.',
    bullets: [
      '2005: Champions League (Istanbul); FA Cup 2006; Super Cup 2005',
      '2007: Champions League Final in Athens (lost 2-1 to Milan)',
      'Sold Alonso 2009, Xabi\'s last season; nearly broke the 4-4-4 formation into a 4-4-3-1',
      'Hodgson replaced him for 6 months in 2010; Benítez left for Inter'
    ]
  },
  {
    id: 'klopp',
    name: 'Klopp Era',
    years: '2015–2024',
    manager: 'Jürgen Klopp',
    summary: 'Returned the club to English and European dominance. Heavy-metal football, gegenpressing, and the 2018–19 Champions League season for the ages. Ended the 30-year league wait in 2020.',
    bullets: [
      '2018 CL Final loss (Kyiv, Karius errors)',
      '2019 CL Final win (Madrid 2-0 vs Spurs) — sixth European Cup',
      '2019-20: Premier League title — 99 points · 32W 3D 3L · 14W 3D 0L to end the season',
      '2022: FA Cup & League Cup double · Klopp\'s farewell in 2024'
    ]
  },
  {
    id: 'slot',
    name: 'Slot Era',
    years: '2024–present',
    manager: 'Arne Slot',
    summary: 'Dutch successor to Klopp. A more possession-led, less counter-pressing style. Won the Premier League title in his first season — title number 20, equalling Manchester United\'s all-time top-flight record.',
    bullets: [
      '2024-25: Premier League title — 84 points · 14 clear of Arsenal',
      'Salah: PFA Player of the Year · 28 PL goals · 18 PL assists',
      'Florian Wirtz signed summer 2025 for ~£100m',
      'Approaching 21st league title at time of writing'
    ]
  }
];

export const ERA_SOURCES = [
  { label: 'Wikipedia: Liverpool FC managers', url: 'https://en.wikipedia.org/wiki/List_of_Liverpool_F.C._managers' },
  { label: 'Liverpool FC official history', url: 'https://www.liverpoolfc.com/history' }
];
