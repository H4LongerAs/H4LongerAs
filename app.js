const intervals = [
  { id: "5m", label: "5분" },
  { id: "60m", label: "60분" },
  { id: "1d", label: "일봉" },
  { id: "1w", label: "주봉" },
  { id: "1mo", label: "월봉" },
];

const spans = [
  { id: "ytd", label: "YTD" },
  { id: "1y", label: "1Y" },
  { id: "3y", label: "3Y" },
  { id: "5y", label: "5Y" },
  { id: "max", label: "MAX" },
];

const volumeModes = [
  { id: "volume", label: "거래량" },
  { id: "value", label: "거래대금" },
];

const miniIntervals = [
  { id: "1d", label: "일봉" },
  { id: "1w", label: "주봉" },
];

const miniSpanSets = {
  "1d": [
    { id: "3m", label: "3M" },
    { id: "6m", label: "6M" },
  ],
  "1w": [
    { id: "ytd", label: "YTD" },
    { id: "1y", label: "1Y" },
    { id: "3y", label: "3Y" },
  ],
};

const pages = [
  { id: "market", label: "Market Dashboard" },
  { id: "sector", label: "Sector" },
];

const sectorSections = [
  { id: "marketmap", label: "Market Map" },
  { id: "actions", label: "Sector Actions" },
];

const sectorSpans = [
  { id: "1d", label: "1D" },
  { id: "1w", label: "1W" },
  { id: "1m", label: "1M" },
  { id: "3m", label: "3M" },
  { id: "6m", label: "6M" },
  { id: "ytd", label: "YTD" },
  { id: "1y", label: "1Y" },
];

const sectorPerformancePeriods = sectorSpans;

const sectorComparisonPeriods = [
  { id: "1m", label: "1M" },
  { id: "3m", label: "3M" },
  { id: "6m", label: "6M" },
  { id: "ytd", label: "YTD" },
];

const sectorComparisonColors = ["#2563eb", "#16a34a", "#dc2626"];
const sectorPeriodLookbacks = { "1d": 1, "1w": 5, "1m": 21, "3m": 63, "6m": 126, "1y": 252 };
const benchmarkIndexSymbols = {
  kospi200: "KOSPI200",
  kosdaq150: "KOSDAQ150",
  sp500: "SPX",
  nasdaq100: "NDX",
};
const usSectorEtfSymbols = {
  "Communication Services (XLC)": "XLC",
  "Consumer Discretionary (XLY)": "XLY",
  "Consumer Staples (XLP)": "XLP",
  "Energy (XLE)": "XLE",
  "Financials (XLF)": "XLF",
  "Health Care (XLV)": "XLV",
  "Industrials (XLI)": "XLI",
  "Materials (XLB)": "XLB",
  "Real Estate (XLRE)": "XLRE",
  "Technology (XLK)": "XLK",
  "Utilities (XLU)": "XLU",
};

const sectorActionRegions = [
  { id: "kr", label: "한국" },
  { id: "us", label: "미국" },
];

const koreanSectorMap = {
  "IT": "IT/반도체",
  "반도체": "IT/반도체",
  "전자부품": "IT/반도체",
  "통신·방송 장비": "IT/반도체",
  "컴퓨터 프로그래밍, 시스템 통합·관리업": "IT/반도체",
  "소프트웨어 개발·공급업": "소프트웨어/게임",
  "오디오물 출판·원판 녹음업": "소프트웨어/게임",
  "커뮤니케이션": "커뮤니케이션/미디어",
  "텔레비전 방송업": "커뮤니케이션/미디어",
  "영화, 비디오물, 방송프로그램 제작·배급업": "커뮤니케이션/미디어",
  "헬스케어": "헬스케어",
  "자연과학·공학 연구개발업": "헬스케어",
  "기초 의약물질": "헬스케어",
  "의약품": "헬스케어",
  "의료용품·기타 의약 관련제품": "헬스케어",
  "의료용 기기": "헬스케어",
  "Energy & Chemicals": "에너지/화학",
  "기타 화학제품": "에너지/화학",
  "기초 화학물질": "에너지/화학",
  "일차전지·이차전지": "2차전지/전기장비",
  "전동기, 발전기·전기 변환 · 공급 · 제어 장치": "2차전지/전기장비",
  "기타 전기장비": "2차전지/전기장비",
  "절연선·케이블": "2차전지/전기장비",
  "산업재": "산업재/기계",
  "특수 목적용 기계": "산업재/기계",
  "일반 목적용 기계": "산업재/기계",
  "측정, 시험, 항해, 제어·기타 정밀기기": "산업재/기계",
  "기계장비·관련 물품 도매업": "산업재/기계",
  "그외 기타 전문, 과학·기술 서비스업": "산업재/기계",
  "Heavy Industries": "조선/운송장비",
  "자동차 신품 부품": "조선/운송장비",
  "항공기,우주선·부품": "조선/운송장비",
  "Steels & Materials": "철강/소재",
  "1차 철강": "철강/소재",
  "1차 비철금속": "철강/소재",
  "기타 비금속 광물제품": "철강/소재",
  "유리·유리제품": "철강/소재",
  "기타 금속 가공제품": "철강/소재",
  "금융": "금융",
  "기타 금융업": "금융",
  "금융 지원 서비스업": "금융",
  "회사 본부·경영 컨설팅 서비스업": "금융",
  "필수소비재": "필수소비재",
  "경기소비재": "경기소비재",
  "상품 종합 도매업": "경기소비재",
  "가정용 기기": "경기소비재",
  "Constructions": "건설/인프라",
  "전기·통신 공사업": "건설/인프라",
  "건축기술, 엔지니어링·관련 기술 서비스업": "건설/인프라",
};

const koreanAdditionalSectorMap = {
  "373220": ["2차전지/전기장비"],
  "006400": ["2차전지/전기장비"],
  "003670": ["2차전지/전기장비"],
  "066970": ["2차전지/전기장비"],
  "051910": ["2차전지/전기장비"],
  "096770": ["2차전지/전기장비"],
  "011790": ["2차전지/전기장비"],
  "009830": ["2차전지/전기장비"],
  "010120": ["2차전지/전기장비"],
  "267260": ["2차전지/전기장비"],
  "298040": ["2차전지/전기장비"],
  "006260": ["2차전지/전기장비"],
  "001440": ["2차전지/전기장비"],
  "062040": ["2차전지/전기장비"],
  "005490": ["2차전지/전기장비"],
  "035420": ["소프트웨어/게임"],
  "035720": ["소프트웨어/게임"],
  "036570": ["소프트웨어/게임"],
  "259960": ["소프트웨어/게임"],
  "018260": ["소프트웨어/게임"],
  "307950": ["소프트웨어/게임"],
  "064400": ["소프트웨어/게임"],
  "377300": ["소프트웨어/게임"],
  "352820": ["소프트웨어/게임"],
  "005380": ["조선/운송장비"],
  "000270": ["조선/운송장비"],
  "012330": ["조선/운송장비"],
  "161390": ["조선/운송장비"],
  "018880": ["조선/운송장비"],
  "034020": ["2차전지/전기장비"],
  "012450": ["방산/우주항공"],
  "079550": ["방산/우주항공"],
  "047810": ["방산/우주항공"],
  "272210": ["방산/우주항공"],
  "042660": ["방산/우주항공"],
  "329180": ["방산/우주항공"],
  "009540": ["방산/우주항공"],
};

const sectorViews = [
  { id: "top50", label: "시총상위 50", description: "Box size: market-cap tier · grouped by sector" },
  { id: "leaders", label: "업종대표", description: "Top 5 market-cap leaders in each sector" },
  { id: "contributors", label: "지수기여도", description: "Top 50 by market cap x selected-period return" },
];

const companyMeta = {
  "005930": { name: "삼성전자", sector: "전기·전자" },
  "000660": { name: "SK하이닉스", sector: "전기·전자" },
  "373220": { name: "LG에너지솔루션", sector: "전기·전자" },
  "207940": { name: "삼성바이오로직스", sector: "의약품" },
  "005380": { name: "현대차", sector: "운송장비·부품" },
  "000270": { name: "기아", sector: "운송장비·부품" },
  "068270": { name: "셀트리온", sector: "의약품" },
  "035420": { name: "NAVER", sector: "IT 서비스" },
  "105560": { name: "KB금융", sector: "금융" },
  "055550": { name: "신한지주", sector: "금융" },
  "005490": { name: "POSCO홀딩스", sector: "철강·금속" },
  "012330": { name: "현대모비스", sector: "운송장비·부품" },
  "028260": { name: "삼성물산", sector: "유통·상사" },
  "035720": { name: "카카오", sector: "IT 서비스" },
  "086790": { name: "하나금융지주", sector: "금융" },
  "051910": { name: "LG화학", sector: "화학" },
  "006400": { name: "삼성SDI", sector: "전기·전자" },
  "034020": { name: "두산에너빌리티", sector: "기계·장비" },
  "009540": { name: "HD한국조선해양", sector: "운송장비·부품" },
  "066570": { name: "LG전자", sector: "전기·전자" },
  "032830": { name: "삼성생명", sector: "보험" },
  "000810": { name: "삼성화재", sector: "보험" },
  "267260": { name: "HD현대일렉트릭", sector: "전기·전자" },
  "138040": { name: "메리츠금융지주", sector: "금융" },
  "012450": { name: "한화에어로스페이스", sector: "운송장비·부품" },
  "329180": { name: "HD현대중공업", sector: "운송장비·부품" },
  "015760": { name: "한국전력", sector: "전기·가스" },
  "034730": { name: "SK", sector: "금융" },
  "402340": { name: "SK스퀘어", sector: "금융" },
  "010950": { name: "S-Oil", sector: "화학" },
  "259960": { name: "크래프톤", sector: "IT 서비스" },
  "018260": { name: "삼성에스디에스", sector: "IT 서비스" },
  "010130": { name: "고려아연", sector: "철강·금속" },
  "003670": { name: "포스코퓨처엠", sector: "전기·전자" },
  "316140": { name: "우리금융지주", sector: "금융" },
  "033780": { name: "KT&G", sector: "필수소비재" },
  "003550": { name: "LG", sector: "금융" },
  "017670": { name: "SK텔레콤", sector: "통신" },
  "096770": { name: "SK이노베이션", sector: "화학" },
  "042660": { name: "한화오션", sector: "운송장비·부품" },
  "352820": { name: "하이브", sector: "미디어" },
  "011200": { name: "HMM", sector: "운송·창고" },
  "011070": { name: "LG이노텍", sector: "전기·전자" },
  "009150": { name: "삼성전기", sector: "전기·전자" },
  "047810": { name: "한국항공우주", sector: "운송장비·부품" },
  "010140": { name: "삼성중공업", sector: "운송장비·부품" },
  "302440": { name: "SK바이오사이언스", sector: "의약품" },
  "251270": { name: "넷마블", sector: "IT 서비스" },
  "090430": { name: "아모레퍼시픽", sector: "화학" },
  "271560": { name: "오리온", sector: "필수소비재" },
};

const fallbackSectorMarkets = [
  {
    id: "kospi",
    label: "KOSPI",
    updatedAt: "Sample",
    items: [
      { symbol: "005930", name: "Samsung Electronics", sector: "Technology", marketCap: 485, price: 84700, changes: { "1d": 0.8, "1w": 2.4, "1m": 5.1, "3m": 8.2, "6m": 11.4, "1y": 24.5 } },
      { symbol: "000660", name: "SK Hynix", sector: "Technology", marketCap: 198, price: 272000, changes: { "1d": 1.7, "1w": 4.8, "1m": 12.6, "3m": 28.4, "6m": 54.2, "1y": 91.5 } },
      { symbol: "373220", name: "LG Energy Solution", sector: "Battery", marketCap: 86, price: 368000, changes: { "1d": -0.9, "1w": -2.1, "1m": -5.2, "3m": -7.6, "6m": -11.3, "1y": -18.4 } },
      { symbol: "207940", name: "Samsung Biologics", sector: "Healthcare", marketCap: 72, price: 1012000, changes: { "1d": 0.2, "1w": 1.1, "1m": 3.8, "3m": 9.6, "6m": 14.2, "1y": 21.0 } },
      { symbol: "005380", name: "Hyundai Motor", sector: "Autos", marketCap: 58, price: 276000, changes: { "1d": -0.4, "1w": 0.6, "1m": 2.2, "3m": 6.4, "6m": 18.8, "1y": 31.2 } },
      { symbol: "000270", name: "Kia", sector: "Autos", marketCap: 44, price: 112000, changes: { "1d": -0.8, "1w": -1.2, "1m": 1.4, "3m": 4.7, "6m": 14.1, "1y": 26.8 } },
      { symbol: "068270", name: "Celltrion", sector: "Healthcare", marketCap: 42, price: 194000, changes: { "1d": 0.3, "1w": -0.6, "1m": 2.0, "3m": 8.1, "6m": 19.6, "1y": 34.2 } },
      { symbol: "035420", name: "NAVER", sector: "Internet", marketCap: 34, price: 211000, changes: { "1d": -1.5, "1w": -3.2, "1m": -7.4, "3m": -10.6, "6m": -13.1, "1y": -8.8 } },
      { symbol: "105560", name: "KB Financial", sector: "Financials", marketCap: 32, price: 82000, changes: { "1d": 0.4, "1w": 1.8, "1m": 5.7, "3m": 16.9, "6m": 28.4, "1y": 55.6 } },
      { symbol: "055550", name: "Shinhan Financial", sector: "Financials", marketCap: 26, price: 51400, changes: { "1d": 0.1, "1w": 1.1, "1m": 4.9, "3m": 12.8, "6m": 21.7, "1y": 41.3 } },
      { symbol: "005490", name: "POSCO Holdings", sector: "Materials", marketCap: 25, price: 303000, changes: { "1d": -1.1, "1w": -2.8, "1m": -6.2, "3m": -12.3, "6m": -21.4, "1y": -33.8 } },
      { symbol: "012330", name: "Hyundai Mobis", sector: "Autos", marketCap: 24, price: 255000, changes: { "1d": 0.7, "1w": 1.6, "1m": 3.4, "3m": 7.2, "6m": 10.6, "1y": 18.1 } },
      { symbol: "028260", name: "Samsung C&T", sector: "Industrials", marketCap: 23, price: 151000, changes: { "1d": -0.2, "1w": 0.4, "1m": 2.6, "3m": 6.8, "6m": 13.2, "1y": 25.0 } },
      { symbol: "035720", name: "Kakao", sector: "Internet", marketCap: 19, price: 42500, changes: { "1d": -1.8, "1w": -5.2, "1m": -8.7, "3m": -16.2, "6m": -22.5, "1y": -31.0 } },
      { symbol: "086790", name: "Hana Financial", sector: "Financials", marketCap: 18, price: 62600, changes: { "1d": 0.5, "1w": 2.2, "1m": 6.1, "3m": 14.3, "6m": 24.0, "1y": 43.8 } },
      { symbol: "051910", name: "LG Chem", sector: "Chemicals", marketCap: 17, price: 245000, changes: { "1d": -0.6, "1w": -1.8, "1m": -5.5, "3m": -12.9, "6m": -25.8, "1y": -41.6 } },
      { symbol: "006400", name: "Samsung SDI", sector: "Battery", marketCap: 16, price: 236000, changes: { "1d": -1.0, "1w": -4.2, "1m": -10.3, "3m": -18.7, "6m": -31.2, "1y": -47.5 } },
      { symbol: "034020", name: "Doosan Enerbility", sector: "Industrials", marketCap: 15, price: 23500, changes: { "1d": 2.4, "1w": 7.8, "1m": 18.6, "3m": 41.3, "6m": 64.2, "1y": 78.4 } },
      { symbol: "009540", name: "HD Korea Shipbuilding", sector: "Industrials", marketCap: 14, price: 203000, changes: { "1d": 1.1, "1w": 3.8, "1m": 11.0, "3m": 29.4, "6m": 48.7, "1y": 69.3 } },
      { symbol: "066570", name: "LG Electronics", sector: "Consumer", marketCap: 13, price: 83000, changes: { "1d": -0.3, "1w": 0.2, "1m": 2.1, "3m": 4.9, "6m": 7.2, "1y": 10.8 } },
    ],
  },
];

const maWindows = [10, 20, 50, 150, 200];
const maColors = { 10: "#2563eb", 20: "#0891b2", 50: "#7c3aed", 150: "#f59e0b", 200: "#64748b" };

let marketData = MARKET_DATA;
let currentMainBars = [];

const state = {
  pageId: "market",
  assetId: marketData.assets[0].id,
  intervalId: "1d",
  spanId: "max",
  miniIntervalId: "1d",
  miniSpanId: "3m",
  sectorMarketId: "kospi",
  sectorSectionId: "marketmap",
  sectorViewId: "top50",
  sectorSpanId: "1d",
  sectorActionRegionId: "kr",
  sectorPerformanceSortKey: "",
  sectorPerformanceSortDirection: "",
  sectorComparisonSpanId: "6m",
  sectorComparisonSectors: [],
  sectorMappingRawSector: "",
  sectorMappingStandardSector: "",
  volumeModeId: "volume",
  symbol: marketData.assets[0].instruments[0].symbol,
  zoom: null,
  drag: null,
};

const dashboardStateKey = "h4longerasset-dashboard-state";
const persistedStateKeys = [
  "pageId",
  "assetId",
  "intervalId",
  "spanId",
  "miniIntervalId",
  "miniSpanId",
  "sectorMarketId",
  "sectorSectionId",
  "sectorViewId",
  "sectorSpanId",
  "sectorActionRegionId",
  "sectorPerformanceSortKey",
  "sectorPerformanceSortDirection",
  "sectorComparisonSpanId",
  "sectorComparisonSectors",
  "sectorMappingRawSector",
  "sectorMappingStandardSector",
  "volumeModeId",
  "symbol",
  "zoom",
];

const fmt = new Intl.NumberFormat("en-US", { maximumFractionDigits: 2 });

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function restoreDashboardState() {
  try {
    const saved = JSON.parse(window.localStorage?.getItem(dashboardStateKey) || "{}");
    persistedStateKeys.forEach((key) => {
      if (Object.prototype.hasOwnProperty.call(saved, key)) state[key] = saved[key];
    });
  } catch {
    window.localStorage?.removeItem(dashboardStateKey);
  }
}

function saveDashboardState() {
  try {
    const snapshot = persistedStateKeys.reduce((next, key) => {
      next[key] = state[key];
      return next;
    }, {});
    window.localStorage?.setItem(dashboardStateKey, JSON.stringify(snapshot));
  } catch {
    // Ignore private-mode or quota failures; the dashboard still works normally.
  }
}

function setFilterLabel(id, label) {
  const element = document.getElementById(id);
  if (element) element.textContent = label || "선택";
}

function closeFilterMenus(exceptId = "") {
  document.querySelectorAll(".filter-menu").forEach((menu) => {
    if (menu.id !== exceptId) menu.hidden = true;
  });
  document.querySelectorAll(".filter-select").forEach((button) => {
    const controlledId = filterMenuId(button.dataset.filterToggle);
    button.classList.toggle("open", controlledId === exceptId && !document.getElementById(controlledId)?.hidden);
  });
}

function filterMenuId(type) {
  if (type === "market") return "sectorMarketTabs";
  if (type === "view") return "sectorViewTabs";
  if (type === "span") return "sectorSpanTabs";
  if (type === "market-interval") return "intervalTabs";
  if (type === "market-span") return "spanTabs";
  if (type === "volume") return "volumeModeTabs";
  return "";
}

function priceOf(bar) {
  return Array.isArray(bar) ? bar[1] : bar.c;
}

function normalizeBar(bar) {
  if (!Array.isArray(bar)) return { ...bar, v: Number(bar.v || 0) };
  const value = bar[1];
  return { t: bar[0], o: value, h: value, l: value, c: value, v: Number(bar[5] || 0) };
}

function formatPrice(item) {
  return `${fmt.format(item.price || 0)}${item.unit ?? ""}`;
}

function directionClass(item) {
  return (item.change || 0) >= 0 ? "up" : "down";
}

function findInstrument(symbol) {
  return marketData.assets.flatMap((asset) => asset.instruments).find((item) => item.symbol === symbol);
}

function getAsset() {
  return marketData.assets.find((asset) => asset.id === state.assetId) || marketData.assets[0];
}

function getInstrument() {
  return getAsset().instruments.find((item) => item.symbol === state.symbol) || getAsset().instruments[0];
}

function getSectorMarkets() {
  return marketData.sectorMarkets?.length ? marketData.sectorMarkets : fallbackSectorMarkets;
}

function getSectorMarket() {
  return getSectorMarkets().find((market) => market.id === state.sectorMarketId) || getSectorMarkets()[0];
}

function sectorChange(item) {
  return Number(item.changes?.[state.sectorSpanId] ?? item.change ?? 0);
}

function isUsSectorMarket(market = getSectorMarket()) {
  return ["sp500", "nasdaq100", "us-combined"].includes(market?.id);
}

function sectorUpdateSchedule(market = getSectorMarket(), sectionId = state.sectorSectionId) {
  if (isUsSectorMarket(market)) return "업데이트 주기: 한국시간 08:00";
  return sectionId === "marketmap" ? "업데이트 주기: 한국시간 09:30 / 13:00 / 16:00" : "업데이트 주기: 한국시간 16:00";
}

function sectorUpdatedAtSummary() {
  const markets = getSectorMarkets();
  const krUpdatedAt = markets
    .filter((market) => ["kospi200", "kosdaq150"].includes(market.id))
    .map((market) => market.updatedAt)
    .filter(Boolean)
    .sort()
    .at(-1);
  const usUpdatedAt = markets
    .filter((market) => ["sp500", "nasdaq100"].includes(market.id))
    .map((market) => market.updatedAt)
    .filter(Boolean)
    .sort()
    .at(-1);
  if (krUpdatedAt && usUpdatedAt) return `Sector KR ${krUpdatedAt} / US ${usUpdatedAt}`;
  if (krUpdatedAt) return `Sector KR ${krUpdatedAt}`;
  if (usUpdatedAt) return `Sector US ${usUpdatedAt}`;
  return `Sector ${marketData.updatedAt || "--"}`;
}

function sectorDisplayName(item, market = getSectorMarket()) {
  if (!isUsSectorMarket(market)) return item.name;
  return `${item.name} (${item.symbol})`;
}

function formatMarketCapForRank(item, market = getSectorMarket()) {
  const value = Number(item.marketCap || 0);
  if (!value) return "-";
  if (isUsSectorMarket(market)) {
    if (value >= 1000) return `$${(value / 1000).toFixed(2)}T`;
    return `$${value.toFixed(value >= 100 ? 0 : 1)}B`;
  }
  return `${(value / 1_000_000_000_000).toFixed(1)}조`;
}

function rankChangeMarkup(change) {
  const value = Number(change || 0);
  if (value > 0) return `<span class="rank-change rank-up">▲${Math.abs(value)}</span>`;
  if (value < 0) return `<span class="rank-change rank-down">▼${Math.abs(value)}</span>`;
  return `<span class="rank-change rank-flat">-</span>`;
}

function formatPercent(value) {
  const number = Number(value || 0);
  const sign = number >= 0 ? "+" : "";
  return `${sign}${number.toFixed(2)}%`;
}

function percentClass(value) {
  return Number(value || 0) >= 0 ? "up" : "down";
}

function tileFontSize(label, rectWidth, rectHeight, compact) {
  const areaFactor = Math.sqrt(Math.max(rectWidth * rectHeight, 1)) / 11;
  const lengthFactor = Math.max(label.length / 7, 1);
  const heightCap = rectHeight / 5.2;
  const widthCap = rectWidth / Math.max(label.length * 0.52, 5);
  const size = Math.min(areaFactor / lengthFactor + 9, heightCap, widthCap, compact ? 12 : 20);
  return Math.max(compact ? 8 : 10, size);
}

function localizeCompany(item) {
  const meta = companyMeta[item.symbol] || {};
  return { ...item, name: meta.name || item.name, sector: meta.sector || item.sector || "기타" };
}

function standardKoreanSector(rawSector) {
  return koreanSectorMap[rawSector] || rawSector || "기타";
}

function getKoreanCombinedMarket() {
  const markets = getSectorMarkets().filter((market) => ["kospi200", "kosdaq150"].includes(market.id));
  const items = markets.flatMap((market) =>
    (market.items || []).flatMap((item) => {
      const localized = localizeCompany({ ...item, sourceMarket: market.label });
      const rawSector = item.sector || localized.sector || "기타";
      const baseSector = standardKoreanSector(rawSector);
      const baseItem = { ...localized, rawSector, sector: baseSector, sectorEntryType: "base" };
      const extraItems = (koreanAdditionalSectorMap[item.symbol] || [])
        .filter((sector) => sector !== baseSector)
        .map((sector) => ({
          ...localized,
          rawSector,
          sector,
          sectorEntryType: "additional",
        }));
      return [baseItem, ...extraItems];
    }),
  );
  return {
    id: "kr-combined",
    label: "KOSPI200 + KOSDAQ150",
    updatedAt: markets.map((market) => market.updatedAt).filter(Boolean).sort().at(-1) || marketData.updatedAt,
    items,
  };
}

function getUsCombinedMarket() {
  const markets = getSectorMarkets().filter((market) => ["sp500", "nasdaq100"].includes(market.id));
  const uniqueItems = new Map();
  markets.forEach((market) => {
    (market.items || []).forEach((item) => {
      if (!uniqueItems.has(item.symbol)) uniqueItems.set(item.symbol, { ...item, sourceMarket: market.label });
    });
  });
  return {
    id: "us-combined",
    label: "S&P500 + Nasdaq 100",
    updatedAt: markets.map((market) => market.updatedAt).filter(Boolean).sort().at(-1) || marketData.updatedAt,
    items: [...uniqueItems.values()],
  };
}

function getSectorActionMarket() {
  return state.sectorActionRegionId === "us" ? getUsCombinedMarket() : getKoreanCombinedMarket();
}

function hasSectorMappingTable(market) {
  return ["kr-combined", "us-combined"].includes(market?.id);
}

function capWeightedChange(items, periodId, cap = 0.2) {
  return capWeights(items, cap).reduce((sum, entry) => {
    return sum + Number(entry.item.changes?.[periodId] ?? 0) * entry.weight;
  }, 0);
}

function dailyBarsForInstrument(symbol) {
  const instrument = findInstrument(symbol);
  return instrument?.history?.["1d"]?.length ? instrument.history["1d"].map(normalizeBar) : [];
}

function barsLookbackChange(bars, lookback) {
  if (bars.length <= lookback) return 0;
  const latest = Number(bars.at(-1).c || 0);
  const previous = Number(bars.at(-1 - lookback).c || 0);
  return previous ? ((latest - previous) / previous) * 100 : 0;
}

function barsYtdChange(bars) {
  if (bars.length < 2) return 0;
  const latest = bars.at(-1);
  const latestClose = Number(latest.c || 0);
  const latestYear = new Date(latest.t).getFullYear();
  const baseline = bars.find((bar) => new Date(bar.t).getFullYear() === latestYear);
  const baselineClose = Number(baseline?.c || 0);
  return baselineClose ? ((latestClose - baselineClose) / baselineClose) * 100 : 0;
}

function sectorEtfData(sector) {
  return marketData.sectorEtfs?.[sector] || null;
}

function normalizeCompactHistory(rows = []) {
  return rows
    .map((row) => {
      if (Array.isArray(row)) return { t: Number(row[0]), c: Number(row[1]) };
      return { t: Number(row.t), c: Number(row.c) };
    })
    .filter((row) => row.t && row.c)
    .sort((a, b) => a.t - b.t);
}

function benchmarkIndexChanges(indexSymbol) {
  const instrument = findInstrument(indexSymbol);
  const bars = dailyBarsForInstrument(indexSymbol);
  if (!instrument || !bars.length) return null;
  return Object.fromEntries(
    sectorPerformancePeriods.map((period) => {
      if (period.id === "1d" && Number.isFinite(Number(instrument.change))) return [period.id, Number(instrument.change)];
      if (period.id === "ytd") return [period.id, barsYtdChange(bars)];
      return [period.id, barsLookbackChange(bars, sectorPeriodLookbacks[period.id] || 1)];
    }),
  );
}

function capWeights(items, cap = 0.2) {
  const weightedItems = items
    .map((item) => ({ item, marketCap: Math.max(Number(item.marketCap || 0), 0) }))
    .filter((entry) => entry.marketCap > 0);
  const totalMarketCap = weightedItems.reduce((sum, entry) => sum + entry.marketCap, 0);
  if (!totalMarketCap) return [];
  const weights = weightedItems.map((entry) => entry.marketCap / totalMarketCap);
  if (cap == null || cap >= 1) {
    return weightedItems.map((entry, index) => ({
      item: entry.item,
      marketCap: entry.marketCap,
      rawWeight: weights[index],
      weight: weights[index],
    }));
  }
  const capped = new Set(weights.map((weight, index) => (weight > cap ? index : -1)).filter((index) => index >= 0));
  const cappedTotal = capped.size * cap;
  const uncappedTotal = weights.reduce((sum, weight, index) => (capped.has(index) ? sum : sum + weight), 0);
  const remaining = Math.max(1 - cappedTotal, 0);
  return weightedItems.map((entry, index) => {
    const weight = capped.has(index) ? cap : uncappedTotal ? (weights[index] / uncappedTotal) * remaining : 0;
    return { item: entry.item, marketCap: entry.marketCap, rawWeight: weights[index], weight };
  });
}

function getSectorPerformanceRows(market) {
  const groups = new Map();
  (market.items || []).forEach((rawItem) => {
    const item = market.id === "kr-combined" ? rawItem : localizeCompany(rawItem);
    const marketCap = Number(item.marketCap || 0);
    if (!groups.has(item.sector)) {
      groups.set(item.sector, { sector: item.sector, marketCap: 0, count: 0, items: [], changes: {} });
    }
    const group = groups.get(item.sector);
    group.marketCap += marketCap;
    group.count += 1;
    group.items.push(item);
  });
  const rows = [...groups.values()].map((group) => {
    const etf = isUsSectorMarket(market) ? sectorEtfData(group.sector) : null;
    group.etfSymbol = etf?.symbol || usSectorEtfSymbols[group.sector] || null;
    group.etfName = etf?.name || null;
    sectorPerformancePeriods.forEach((period) => {
      group.changes[period.id] =
        etf?.changes?.[period.id] !== undefined ? Number(etf.changes[period.id]) : capWeightedChange(group.items, period.id);
    });
    group.leader = group.items.slice().sort((a, b) => Number(b.marketCap || 0) - Number(a.marketCap || 0))[0];
    return group;
  });
  if (!state.sectorPerformanceSortKey || !state.sectorPerformanceSortDirection) {
    return rows.sort((a, b) => b.marketCap - a.marketCap);
  }
  const direction = state.sectorPerformanceSortDirection === "asc" ? 1 : -1;
  return rows.sort((a, b) => {
    const aValue = Number(a.changes[state.sectorPerformanceSortKey] || 0);
    const bValue = Number(b.changes[state.sectorPerformanceSortKey] || 0);
    return (aValue - bValue) * direction;
  });
}

function sectorPerformanceSortMark(periodId) {
  if (state.sectorPerformanceSortKey !== periodId || !state.sectorPerformanceSortDirection) return "";
  return state.sectorPerformanceSortDirection === "asc" ? " ▲" : " ▼";
}

function activeContributionPeriod() {
  return state.sectorPerformanceSortKey || "1d";
}

function topSectorContributors(items, periodId, market, cap = 0.2) {
  return capWeights(items, cap)
    .map(({ item, weight }) => ({
      item,
      impact: weight * Number(item.changes?.[periodId] ?? 0),
    }))
    .sort((a, b) => Math.abs(b.impact) - Math.abs(a.impact))
    .slice(0, 3)
    .map(({ item, impact }) => {
      const sign = impact >= 0 ? "+" : "";
      return `<span>${sectorDisplayName(item, market)} <em class="${percentClass(impact)}">${sign}${impact.toFixed(2)}%p</em></span>`;
    })
    .join("");
}

function sectorReferenceCell(row, periodId, market) {
  if (row.etfSymbol) {
    return `<span>ETF ${escapeHtml(row.etfSymbol)} <em class="${percentClass(row.changes?.[periodId])}">${formatPercent(
      row.changes?.[periodId],
    )}</em></span>`;
  }
  return topSectorContributors(row.items, periodId, market, row.weightCap === undefined ? 0.2 : row.weightCap);
}

function getBenchmarkRows(market) {
  const benchmarkIdsByMarket = {
    "kr-combined": ["kospi200", "kosdaq150"],
    "us-combined": ["sp500", "nasdaq100"],
  };
  const benchmarkIds = benchmarkIdsByMarket[market.id] || [];
  if (!benchmarkIds.length) return [];
  return getSectorMarkets()
    .filter((sourceMarket) => benchmarkIds.includes(sourceMarket.id))
    .map((sourceMarket) => {
      const indexSymbol = benchmarkIndexSymbols[sourceMarket.id];
      const indexChanges = indexSymbol ? benchmarkIndexChanges(indexSymbol) : null;
      const row = {
        sector: sourceMarket.label,
        marketCap: (sourceMarket.items || []).reduce((sum, item) => sum + Number(item.marketCap || 0), 0),
        count: sourceMarket.items?.length || 0,
        items: sourceMarket.items || [],
        changes: indexChanges || {},
        leader: null,
        isBenchmark: true,
        indexSymbol,
        weightCap: null,
      };
      sectorPerformancePeriods.forEach((period) => {
        if (indexChanges) return;
        row.changes[period.id] = capWeightedChange(row.items, period.id, row.weightCap);
      });
      row.leader = row.items.slice().sort((a, b) => Number(b.marketCap || 0) - Number(a.marketCap || 0))[0];
      return row;
    });
}

function getSectorBoardRows(market) {
  return [...getSectorPerformanceRows(market), ...getBenchmarkRows(market)];
}

function fallbackComparisonPeriodsForSpan(spanId) {
  if (spanId === "1m") return [{ id: "start", label: "Start" }, { id: "1m", label: "1M" }];
  if (spanId === "3m") return [{ id: "start", label: "Start" }, { id: "1m", label: "1M" }, { id: "3m", label: "3M" }];
  if (spanId === "6m") {
    return [
      { id: "start", label: "Start" },
      { id: "1m", label: "1M" },
      { id: "3m", label: "3M" },
      { id: "6m", label: "6M" },
    ];
  }
  return [{ id: "start", label: "Start" }, { id: "ytd", label: "YTD" }];
}

function normalizeSectorHistory(item) {
  return (item.history || [])
    .map((row) => {
      if (Array.isArray(row)) return { t: Number(row[0]), c: Number(row[1]) };
      return { t: Number(row.t), c: Number(row.c) };
    })
    .filter((row) => row.t && row.c)
    .sort((a, b) => a.t - b.t);
}

function sectorComparisonStartTime(items, spanId) {
  const latest = Math.max(
    ...items.flatMap((item) => {
      const history = normalizeSectorHistory(item);
      return history.length ? [history.at(-1).t] : [];
    }),
    0,
  );
  if (!latest) return 0;
  const start = new Date(latest);
  if (spanId === "ytd") {
    start.setMonth(0, 1);
    start.setHours(0, 0, 0, 0);
    return start.getTime();
  }
  const months = { "1m": 1, "3m": 3, "6m": 6 }[spanId] || 6;
  start.setMonth(start.getMonth() - months);
  return start.getTime();
}

function weeklySample(points) {
  const buckets = new Map();
  points.forEach((point) => {
    buckets.set(toBucketKey(point.t, "week"), point);
  });
  return [...buckets.values()].sort((a, b) => a.t - b.t);
}

function comparisonStartTimeFromLast(lastTime, spanId) {
  const start = new Date(lastTime);
  if (spanId === "ytd") {
    start.setMonth(0, 1);
  } else {
    const months = { "1m": 1, "3m": 3, "6m": 6, "1y": 12 }[spanId] || 6;
    start.setMonth(start.getMonth() - months);
  }
  start.setHours(0, 0, 0, 0);
  return start.getTime();
}

function indexRelativeSeries(indexSymbol, spanId) {
  const bars = dailyBarsForInstrument(indexSymbol);
  if (bars.length < 2) return [];
  const startTime = comparisonStartTimeFromLast(bars.at(-1).t, spanId);
  const points = bars.filter((bar) => bar.t >= startTime);
  if (points.length < 2) return [];
  const baseline = Number(points[0].c || 0);
  if (!baseline) return [];
  const series = points.map((point) => ({
    t: point.t,
    label: new Date(point.t).toLocaleDateString("ko-KR", { month: "numeric", day: "numeric" }),
    value: (Number(point.c || 0) / baseline - 1) * 100,
  }));
  return spanId === "1m" ? series : weeklySample(series);
}

function etfRelativeSeries(row, spanId) {
  const etf = sectorEtfData(row.sector);
  const points = normalizeCompactHistory(etf?.history);
  if (points.length < 2) return [];
  const startTime = comparisonStartTimeFromLast(points.at(-1).t, spanId);
  const filtered = points.filter((point) => point.t >= startTime);
  if (filtered.length < 2) return [];
  const baseline = Number(filtered[0].c || 0);
  if (!baseline) return [];
  const series = filtered.map((point) => ({
    t: point.t,
    label: new Date(point.t).toLocaleDateString("ko-KR", { month: "numeric", day: "numeric" }),
    value: (Number(point.c || 0) / baseline - 1) * 100,
  }));
  return spanId === "1m" ? series : weeklySample(series);
}

function sectorRelativeSeries(row, spanId) {
  if (row.indexSymbol) {
    const indexSeries = indexRelativeSeries(row.indexSymbol, spanId);
    if (indexSeries.length >= 2) return indexSeries;
  }
  if (row.etfSymbol) {
    const etfSeries = etfRelativeSeries(row, spanId);
    if (etfSeries.length >= 2) return etfSeries;
  }
  const weightedItems = capWeights(row.items || [], row.weightCap === undefined ? 0.2 : row.weightCap);
  const startTime = sectorComparisonStartTime(
    weightedItems.map((entry) => entry.item),
    spanId,
  );
  if (!startTime || !weightedItems.length) return [];
  const byDate = new Map();
  weightedItems.forEach(({ item, weight }) => {
    const history = normalizeSectorHistory(item).filter((point) => point.t >= startTime);
    if (history.length < 2) return;
    const baseline = history[0].c;
    if (!baseline) return;
    history.forEach((point) => {
      const key = new Date(point.t).toISOString().slice(0, 10);
      const entry = byDate.get(key) || { t: point.t, weightedReturn: 0, weight: 0 };
      entry.t = Math.max(entry.t, point.t);
      entry.weightedReturn += ((point.c / baseline - 1) * 100) * weight;
      entry.weight += weight;
      byDate.set(key, entry);
    });
  });
  const daily = [...byDate.values()]
    .filter((entry) => entry.weight > 0)
    .map((entry) => ({ t: entry.t, value: entry.weightedReturn / entry.weight }))
    .sort((a, b) => a.t - b.t);
  if (daily.length < 2) return [];
  const normalized = daily.map((point) => ({ ...point, value: point.value - daily[0].value }));
  return spanId === "1m" ? normalized : weeklySample(normalized);
}

function fallbackRelativeSeries(row, spanId) {
  return fallbackComparisonPeriodsForSpan(spanId).map((period, index) => ({
    t: index,
    label: period.label,
    value: period.id === "start" ? 0 : Number(row.changes[period.id] || 0),
  }));
}

function selectedComparisonRows(rows) {
  const bySector = new Map(rows.map((row) => [row.sector, row]));
  const stored = Array.isArray(state.sectorComparisonSectors) ? state.sectorComparisonSectors : [];
  const selected = stored.map((sector) => bySector.get(sector)).filter(Boolean).slice(0, 3);
  if (selected.length) {
    state.sectorComparisonSectors = selected.map((row) => row.sector);
    return selected;
  }
  const defaults = rows.filter((row) => !row.isBenchmark).slice(0, 3);
  state.sectorComparisonSectors = defaults.map((row) => row.sector);
  return defaults;
}

function toBucketKey(timestamp, type) {
  const date = new Date(timestamp);
  if (type === "month") return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
  const firstDay = new Date(date.getFullYear(), 0, 1);
  const dayOffset = Math.floor((date - firstDay) / 86400000);
  const week = Math.floor((dayOffset + firstDay.getDay()) / 7);
  return `${date.getFullYear()}-${String(week).padStart(2, "0")}`;
}

function resampleCandles(series, type) {
  const buckets = new Map();
  series.forEach((bar) => {
    const key = toBucketKey(bar.t, type);
    if (!buckets.has(key)) {
      buckets.set(key, { t: bar.t, o: bar.o, h: bar.h, l: bar.l, c: bar.c, v: Number(bar.v || 0) });
      return;
    }
    const bucket = buckets.get(key);
    bucket.h = Math.max(bucket.h, bar.h);
    bucket.l = Math.min(bucket.l, bar.l);
    bucket.c = bar.c;
    bucket.t = bar.t;
    bucket.v = Number(bucket.v || 0) + Number(bar.v || 0);
  });
  return [...buckets.values()];
}

function filterSpan(series, spanId) {
  if (!series.length || spanId === "max") return series;
  const last = series[series.length - 1].t;
  if (spanId === "ytd") {
    const lastDate = new Date(last);
    const start = new Date(lastDate.getFullYear(), 0, 1).getTime();
    return series.filter((bar) => bar.t >= start);
  }
  const years = Number(spanId.replace("y", ""));
  const start = new Date(last);
  start.setFullYear(start.getFullYear() - years);
  return series.filter((bar) => bar.t >= start.getTime());
}

function filterMonths(series, months) {
  if (!series.length) return series;
  const last = series[series.length - 1].t;
  const start = new Date(last);
  start.setMonth(start.getMonth() - months);
  return series.filter((bar) => bar.t >= start.getTime());
}

function fallbackBars(item) {
  const now = Date.now();
  const base = item.price || 100;
  return Array.from({ length: 240 }, (_, index) => {
    const close = Math.max(base + Math.sin(index / 11) * base * 0.02, base * 0.2);
    const open = close * (1 + Math.sin(index / 7) * 0.003);
    return {
      t: now - (239 - index) * 86400000,
      o: open,
      h: Math.max(open, close) * 1.006,
      l: Math.min(open, close) * 0.994,
      c: close,
      v: 0,
    };
  });
}

function getBaseBars(item) {
  const history = item.history || {};
  if (state.intervalId === "5m" && history["5m"]?.length) return history["5m"].map(normalizeBar);
  if (state.intervalId === "60m" && history["60m"]?.length) return history["60m"].map(normalizeBar);
  const daily = history["1d"]?.length ? history["1d"].map(normalizeBar) : fallbackBars(item);
  if (state.intervalId === "1w") return resampleCandles(daily, "week");
  if (state.intervalId === "1mo") return resampleCandles(daily, "month");
  return daily;
}

function getMiniBars(item) {
  const base = getMiniBaseBars(item);
  if (state.miniIntervalId === "1d") {
    return filterMonths(base, state.miniSpanId === "3m" ? 3 : 6);
  }
  return filterSpan(base, state.miniSpanId);
}

function percentChangeFromBars(bars) {
  if (!bars || bars.length < 2) return 0;
  const first = bars[0].o || bars[0].c;
  const last = bars[bars.length - 1].c;
  if (!first) return 0;
  return ((last - first) / first) * 100;
}

function getMiniBaseBars(item) {
  const history = item.history || {};
  const daily = history["1d"]?.length ? history["1d"].map(normalizeBar) : fallbackBars(item);
  return state.miniIntervalId === "1w" ? resampleCandles(daily, "week") : daily;
}

function getMiniMaWindows() {
  if (getAsset().id !== "indices") return [];
  return state.miniIntervalId === "1d" ? [50, 200] : [10, 20];
}

function getSpanBars(item) {
  return filterSpan(getBaseBars(item), state.spanId);
}

function getVisibleBars(item) {
  let bars = state.zoom ? getBaseBars(item) : getSpanBars(item);
  if (state.zoom && bars.length > 2) {
    bars = bars.filter((bar) => bar.t >= state.zoom.start && bar.t <= state.zoom.end);
  }
  return bars.length ? bars : fallbackBars(item);
}

function pickByRange(allBars, start, end) {
  return allBars.filter((bar) => bar.t >= start && bar.t <= end);
}

function rangeFromIndexWindow(allBars, leftIndex, rightIndex) {
  const startIndex = Math.max(0, Math.min(allBars.length - 1, Math.floor(leftIndex)));
  const endIndex = Math.max(startIndex, Math.min(allBars.length - 1, Math.ceil(rightIndex)));
  return { start: allBars[startIndex].t, end: allBars[endIndex].t };
}

function movingAverage(bars, window) {
  if (bars.length < window) return [];
  const result = [];
  let sum = 0;
  bars.forEach((bar, index) => {
    sum += bar.c;
    if (index >= window) sum -= bars[index - window].c;
    if (index >= window - 1) result.push({ t: bar.t, value: sum / window });
  });
  return result;
}

function compressBars(bars, maxCount) {
  if (bars.length <= maxCount) return bars;
  const bucketSize = Math.ceil(bars.length / maxCount);
  const compressed = [];
  for (let index = 0; index < bars.length; index += bucketSize) {
    const bucket = bars.slice(index, index + bucketSize);
    compressed.push({
      t: bucket[bucket.length - 1].t,
      o: bucket[0].o,
      h: bucket.reduce((max, bar) => Math.max(max, bar.h), Number.NEGATIVE_INFINITY),
      l: bucket.reduce((min, bar) => Math.min(min, bar.l), Number.POSITIVE_INFINITY),
      c: bucket[bucket.length - 1].c,
      v: bucket.reduce((sum, bar) => sum + Number(bar.v || 0), 0),
    });
  }
  return compressed;
}

function shouldShowMa() {
  return getAsset().id === "indices" && !["5m", "60m"].includes(state.intervalId);
}

function shouldShowVolume() {
  return getAsset().id === "indices" && !["5m", "60m"].includes(state.intervalId);
}

function volumeMetric(bar) {
  const volume = Number(bar.v || 0);
  if (state.volumeModeId === "value") return volume * Number(bar.c || 0);
  return volume;
}

function formatCompactNumber(value) {
  const absolute = Math.abs(value);
  if (absolute >= 1_000_000_000_000) return `${(value / 1_000_000_000_000).toFixed(1)}T`;
  if (absolute >= 1_000_000_000) return `${(value / 1_000_000_000).toFixed(1)}B`;
  if (absolute >= 1_000_000) return `${(value / 1_000_000).toFixed(1)}M`;
  if (absolute >= 1_000) return `${(value / 1_000).toFixed(1)}K`;
  return fmt.format(value);
}

function renderTabs() {
  const sectorMarket = getSectorMarket();
  const sectorView = sectorViews.find((view) => view.id === state.sectorViewId) || sectorViews[0];
  const sectorSpan = sectorSpans.find((span) => span.id === state.sectorSpanId) || sectorSpans[0];
  const sectorActionRegion = sectorActionRegions.find((region) => region.id === state.sectorActionRegionId) || sectorActionRegions[0];
  const marketInterval = intervals.find((interval) => interval.id === state.intervalId) || intervals[0];
  const marketSpan = spans.find((span) => span.id === state.spanId) || spans[0];
  const volumeMode = volumeModes.find((mode) => mode.id === state.volumeModeId) || volumeModes[0];
  const volumeModeTabs = document.getElementById("volumeModeTabs");
  const volumeFilterGroup = document.getElementById("volumeFilterGroup");
  document.getElementById("pageTabs").innerHTML = pages
    .map((page) => `<button class="tab-button ${page.id === state.pageId ? "active" : ""}" data-page="${page.id}">${page.label}</button>`)
    .join("");
  document.getElementById("assetTabs").innerHTML = marketData.assets
    .map((asset) => `<button class="tab-button ${asset.id === state.assetId ? "active" : ""}" data-asset="${asset.id}">${asset.label}</button>`)
    .join("");
  document.getElementById("intervalTabs").innerHTML = intervals
    .map((interval) => `<button class="tab-button ${interval.id === state.intervalId ? "active" : ""}" data-interval="${interval.id}">${interval.label}</button>`)
    .join("");
  document.getElementById("spanTabs").innerHTML = spans
    .map((span) => `<button class="tab-button ${span.id === state.spanId ? "active" : ""}" data-span="${span.id}">${span.label}</button>`)
    .join("");
  if (volumeModeTabs) {
    volumeModeTabs.innerHTML = volumeModes
      .map((mode) => `<button class="tab-button ${mode.id === state.volumeModeId ? "active" : ""}" data-volume-mode="${mode.id}">${mode.label}</button>`)
      .join("");
    volumeModeTabs.hidden = true;
  }
  if (volumeFilterGroup) {
    volumeFilterGroup.hidden = !shouldShowVolume();
  }
  document.getElementById("miniIntervalTabs").innerHTML = miniIntervals
    .map(
      (interval) =>
        `<button class="tab-button ${interval.id === state.miniIntervalId ? "active" : ""}" data-mini-interval="${interval.id}">${interval.label}</button>`,
    )
    .join("");
  document.getElementById("miniSpanTabs").innerHTML = miniSpanSets[state.miniIntervalId]
    .map((span) => `<button class="tab-button ${span.id === state.miniSpanId ? "active" : ""}" data-mini-span="${span.id}">${span.label}</button>`)
    .join("");
  document.getElementById("sectorSubTabs").innerHTML = sectorSections
    .map((section) => `<button class="tab-button ${section.id === state.sectorSectionId ? "active" : ""}" data-sector-section="${section.id}">${section.label}</button>`)
    .join("");
  document.getElementById("sectorMarketTabs").innerHTML = getSectorMarkets()
    .map((market) => `<button class="tab-button ${market.id === state.sectorMarketId ? "active" : ""}" data-sector-market="${market.id}">${market.label}</button>`)
    .join("");
  document.getElementById("sectorViewTabs").innerHTML = sectorViews
    .map((view) => `<button class="tab-button ${view.id === state.sectorViewId ? "active" : ""}" data-sector-view="${view.id}">${view.label}</button>`)
    .join("");
  document.getElementById("sectorSpanTabs").innerHTML = sectorSpans
    .map((span) => `<button class="tab-button ${span.id === state.sectorSpanId ? "active" : ""}" data-sector-span="${span.id}">${span.label}</button>`)
    .join("");
  document.getElementById("sectorActionRegionTabs").innerHTML = sectorActionRegions
    .map(
      (region) =>
        `<button class="tab-button ${region.id === state.sectorActionRegionId ? "active" : ""}" data-sector-action-region="${region.id}">${region.label}</button>`,
    )
    .join("");
  setFilterLabel("sectorMarketSelect", sectorMarket?.label);
  setFilterLabel("sectorViewSelect", sectorView?.label);
  setFilterLabel("sectorSpanSelect", sectorSpan?.label);
  setFilterLabel("marketIntervalSelect", marketInterval?.label);
  setFilterLabel("marketSpanSelect", marketSpan?.label);
  setFilterLabel("volumeModeSelect", volumeMode?.label);
  closeFilterMenus();
}

function renderPageView() {
  const isMarketPage = state.pageId === "market";
  document.getElementById("marketDashboardView").hidden = !isMarketPage;
  document.getElementById("sectorView").hidden = isMarketPage;
}

function renderStatus() {
  const kospi = findInstrument("KOSPI");
  const nasdaq = findInstrument("NDX");
  document.getElementById("marketUpdatedAt").textContent = `Market ${marketData.updatedAt || "--"}`;
  document.getElementById("sectorDataUpdatedAt").textContent = sectorUpdatedAtSummary();
  document.getElementById("riskMode").textContent = marketData.status.riskMode;
  document.getElementById("kospiValue").textContent = fmt.format(kospi?.price ?? marketData.status.kospi ?? 0);
  document.getElementById("nasdaqValue").textContent = fmt.format(nasdaq?.price ?? marketData.status.nasdaq ?? 0);
  document.getElementById("us10yValue").textContent = `${(marketData.status.us10y || 0).toFixed(2)}%`;
  document.getElementById("usdkrwValue").textContent = fmt.format(marketData.status.usdkrw || 0);
}

function renderChart() {
  const asset = getAsset();
  const item = getInstrument();
  const sign = (item.change || 0) >= 0 ? "+" : "";
  const interval = intervals.find((x) => x.id === state.intervalId)?.label;
  const span = spans.find((x) => x.id === state.spanId)?.label;
  document.getElementById("selectedGroup").textContent = `${asset.label} · ${interval} · ${span}`;
  document.getElementById("selectedName").textContent = item.name;
  document.getElementById("selectedPrice").textContent = formatPrice(item);
  document.getElementById("selectedChange").textContent = `${sign}${(item.change || 0).toFixed(2)}%`;
  document.getElementById("selectedChange").className = directionClass(item);
  document.getElementById("zoomHint").textContent = state.zoom
    ? "오른쪽 드래그: 확대 · 왼쪽 드래그: 더 넓게 보기 · 더블클릭: 초기화"
    : "오른쪽으로 드래그하면 확대, 왼쪽으로 드래그하면 더 긴 시계열을 봅니다";
  document.getElementById("maLegend").innerHTML = shouldShowMa()
    ? maWindows.map((window) => `<span><i style="background:${maColors[window]}"></i>MA ${window}</span>`).join("")
    : "";
  drawCandleChart({
    container: document.getElementById("mainChart"),
    item,
    bars: getVisibleBars(item),
    fullBars: state.zoom ? getBaseBars(item) : getSpanBars(item),
    compact: false,
    showMa: shouldShowMa(),
    showVolume: shouldShowVolume(),
  });
}

function renderMiniCharts() {
  const asset = getAsset();
  const miniSpanLabel = miniSpanSets[state.miniIntervalId].find((span) => span.id === state.miniSpanId)?.label || "";
  document.getElementById("miniTitle").textContent = asset.label;
  document.getElementById("miniChartGrid").innerHTML = asset.instruments
    .map((item) => {
      const sign = (item.change || 0) >= 0 ? "+" : "";
      const periodChange = percentChangeFromBars(getMiniBars(item));
      const periodSign = periodChange >= 0 ? "+" : "";
      const periodClass = periodChange >= 0 ? "up" : "down";
      return `<button class="mini-card ${item.symbol === state.symbol ? "active" : ""}" data-symbol="${item.symbol}">
        <span class="mini-top">
          <strong>${item.name}</strong>
          <span class="mini-change-stack">
            <em class="${directionClass(item)}">${sign}${(item.change || 0).toFixed(2)}%</em>
            <small class="${periodClass}">${miniSpanLabel} ${periodSign}${periodChange.toFixed(2)}%</small>
          </span>
        </span>
        <span class="mini-symbol">${item.symbol} · ${formatPrice(item)}</span>
        <span class="mini-chart" id="mini-${item.symbol}"></span>
      </button>`;
    })
    .join("");
  asset.instruments.forEach((item) => {
    const bars = getMiniBars(item);
    const miniMaWindows = getMiniMaWindows();
    drawCandleChart({
      container: document.getElementById(`mini-${item.symbol}`),
      item,
      bars,
      fullBars: getMiniBaseBars(item),
      compact: true,
      showMa: miniMaWindows.length > 0,
      maSet: miniMaWindows,
    });
  });
}

function splitTreemap(items, x, y, width, height) {
  if (!items.length) return [];
  if (items.length === 1) return [{ item: items[0], x, y, width, height }];
  const total = items.reduce((sum, item) => sum + item.weight, 0);
  let running = 0;
  let splitIndex = 0;
  while (splitIndex < items.length - 1 && running + items[splitIndex].weight <= total / 2) {
    running += items[splitIndex].weight;
    splitIndex += 1;
  }
  if (splitIndex === 0) {
    running = items[0].weight;
    splitIndex = 1;
  }
  const first = items.slice(0, splitIndex);
  const second = items.slice(splitIndex);
  const ratio = running / total;
  if (width >= height) {
    const firstWidth = width * ratio;
    return [
      ...splitTreemap(first, x, y, firstWidth, height),
      ...splitTreemap(second, x + firstWidth, y, width - firstWidth, height),
    ];
  }
  const firstHeight = height * ratio;
  return [
    ...splitTreemap(first, x, y, width, firstHeight),
    ...splitTreemap(second, x, y + firstHeight, width, height - firstHeight),
  ];
}

function marketMapColor(change) {
  if (change >= 3) return "#b91c1c";
  if (change >= 2) return "#dc2626";
  if (change >= 1) return "#ef4444";
  if (change >= 0.3) return "#f87171";
  if (change <= -3) return "#1d4ed8";
  if (change <= -2) return "#2563eb";
  if (change <= -1) return "#60a5fa";
  if (change <= -0.3) return "#93c5fd";
  return "#e5e7eb";
}

function marketMapSizeWeight(rank) {
  if (rank <= 10) return 4;
  if (rank <= 50) return 2;
  return 1;
}

function getRankedMarketItems(market) {
  return [...market.items]
    .map(localizeCompany)
    .filter((item) => item.marketCap > 0)
    .sort((a, b) => b.marketCap - a.marketCap)
    .map((item, index) => ({ ...item, marketCapRank: index + 1 }));
}

function getSectorViewItems(market) {
  const ranked = getRankedMarketItems(market);
  if (state.sectorViewId === "leaders") {
    const bySector = new Map();
    ranked.forEach((item) => {
      if (!bySector.has(item.sector)) bySector.set(item.sector, []);
      bySector.get(item.sector).push(item);
    });
    return [...bySector.values()]
      .flatMap((items) => items.slice(0, 5))
      .sort((a, b) => b.marketCap - a.marketCap)
      .map((item, index) => ({ ...item, rank: index + 1, weight: marketMapSizeWeight(item.marketCapRank) }));
  }
  if (state.sectorViewId === "contributors") {
    return ranked
      .map((item) => ({ ...item, contribution: item.marketCap * sectorChange(item) }))
      .sort((a, b) => Math.abs(b.contribution) - Math.abs(a.contribution))
      .slice(0, 50)
      .map((item, index) => ({ ...item, rank: index + 1, weight: marketMapSizeWeight(index + 1) }));
  }
  return ranked.slice(0, 50).map((item, index) => ({ ...item, rank: index + 1, weight: marketMapSizeWeight(index + 1) }));
}

function groupMarketMapItems(items) {
  const groups = new Map();
  items.forEach((item) => {
    if (!groups.has(item.sector)) groups.set(item.sector, []);
    groups.get(item.sector).push(item);
  });
  return [...groups.entries()]
    .map(([sector, sectorItems]) => ({
      sector,
      items: sectorItems.sort((a, b) => b.weight - a.weight || b.marketCap - a.marketCap),
      weight: sectorItems.reduce((sum, item) => sum + item.weight, 0),
      marketCap: sectorItems.reduce((sum, item) => sum + item.marketCap, 0),
    }))
    .sort((a, b) => b.weight - a.weight || b.marketCap - a.marketCap);
}

function renderSectorMap() {
  const selectedMarket = getSectorMarket();
  const market = state.sectorSectionId === "actions" ? getSectorActionMarket() : selectedMarket;
  const container = document.getElementById("sectorMarketMap");
  if (!container || !market) return;
  const view = sectorViews.find((item) => item.id === state.sectorViewId) || sectorViews[0];
  const isMarketMapSection = state.sectorSectionId === "marketmap";
  const isActionsSection = state.sectorSectionId === "actions";
  document.querySelector("#sectorView h2").textContent = isActionsSection ? `${market.label} Sector Actions` : `${market.label} Market Map`;
  document.getElementById("sectorMapDescription").textContent = view.description;
  document.getElementById("sectorUpdatedAt").textContent = `Updated ${market.updatedAt || marketData.updatedAt || "--"} · ${sectorUpdateSchedule(
    market,
    state.sectorSectionId,
  )}`;
  document.getElementById("marketMapBlock").hidden = !isMarketMapSection;
  document.getElementById("sectorMapMeta").hidden = !isMarketMapSection;
  document.getElementById("sectorMapLegend").hidden = !isMarketMapSection;
  document.getElementById("sectorMarketFilterGroup").hidden = isActionsSection;
  document.getElementById("sectorActionRegionFilterGroup").hidden = !isActionsSection;
  document.getElementById("sectorViewFilterGroup").hidden = !isMarketMapSection;
  document.getElementById("sectorSpanFilterGroup").hidden = !isMarketMapSection;
  document.getElementById("sectorRankPanel").hidden = !isMarketMapSection;
  renderSectorPerformanceTable(market);
  if (!isMarketMapSection) {
    container.innerHTML = "";
    return;
  }
  const width = Math.max(container.clientWidth || 900, 320);
  const height = Math.max(container.clientHeight || 560, 320);
  const viewItems = getSectorViewItems(market);
  const groups =
    state.sectorViewId === "contributors"
      ? [{ sector: "", items: viewItems, weight: viewItems.reduce((sum, item) => sum + item.weight, 0), marketCap: 0 }]
      : groupMarketMapItems(viewItems);
  const groupRects = splitTreemap(groups, 0, 0, width, height);
  const groupLabels = groupRects
    .map(({ item: group, x, y, width: rectWidth, height: rectHeight }) => {
      if (!group.sector) return "";
      if (rectWidth < 72 || rectHeight < 44) return "";
      return `<span class="marketmap-group-label" style="left:${x + 6}px;top:${y + 5}px;max-width:${Math.max(rectWidth - 12, 20)}px">${group.sector}</span>`;
    })
    .join("");
  const tiles = groupRects
    .flatMap(({ item: group, x, y, width: groupWidth, height: groupHeight }) => {
      const labelHeight = group.sector && groupWidth > 72 && groupHeight > 44 ? 19 : 3;
      const inset = 3;
      const innerX = x + inset;
      const innerY = y + labelHeight;
      const innerWidth = Math.max(groupWidth - inset * 2, 1);
      const innerHeight = Math.max(groupHeight - labelHeight - inset, 1);
      return splitTreemap(group.items, innerX, innerY, innerWidth, innerHeight);
    })
    .map(({ item, x, y, width: rectWidth, height: rectHeight }) => {
      const change = sectorChange(item);
      const sign = change >= 0 ? "+" : "";
      const isFlat = Math.abs(change) < 0.3;
      const compact = rectWidth < 92 || rectHeight < 54;
      const displayName = sectorDisplayName(item, market);
      const fontSize = tileFontSize(displayName, rectWidth, rectHeight, compact);
      const changeFontSize = Math.max(9, Math.min(fontSize * 0.9, compact ? 11 : 20));
      return `<button class="marketmap-tile ${isFlat ? "flat" : ""} ${compact ? "compact" : ""}" data-sector-symbol="${item.symbol}" data-sector-market="${market.id}" title="${displayName} ${sign}${change.toFixed(2)}%" aria-label="${displayName} ${sign}${change.toFixed(2)}%" style="left:${x}px;top:${y}px;width:${rectWidth}px;height:${rectHeight}px;background:${marketMapColor(change)};--tile-name-size:${fontSize}px;--tile-change-size:${changeFontSize}px">
        <strong>${displayName}</strong>
        <em>${sign}${change.toFixed(2)}%</em>
      </button>`;
    })
    .join("");
  container.innerHTML = `${groupLabels}${tiles}`;
  renderSectorRankTable(market);
}

function renderSectorPerformanceTable(market) {
  const table = document.getElementById("sectorPerformanceTable");
  if (!table || !market) return;
  const panel = document.getElementById("sectorPerformancePanel");
  if (panel) panel.hidden = state.sectorSectionId !== "actions";
  if (state.sectorSectionId !== "actions") return;
  const rows = getSectorBoardRows(market);
  const contributionPeriod = activeContributionPeriod();
  const contributionLabel = sectorPerformancePeriods.find((period) => period.id === contributionPeriod)?.label || "1D";
  document.getElementById("sectorPerformanceTitle").textContent = `${market.label} 주도섹터`;
  const performanceBasis = isUsSectorMarket(market) ? "SPDR 섹터 ETF 성과" : "20% Cap 시총가중 성과";
  const referenceLabel = isUsSectorMarket(market) ? "ETF 기준" : "기여종목";
  document.getElementById("sectorPerformanceMeta").textContent = `${rows.length}개 업종 · ${performanceBasis} · ${referenceLabel} ${contributionLabel} · ${sectorUpdateSchedule(
    market,
    "actions",
  )}`;
  const contributorHeader = document.getElementById("sectorContributorHeader") || document.querySelector(".performance-table thead th:nth-child(3)");
  if (contributorHeader) contributorHeader.textContent = `${referenceLabel} ${contributionLabel}`;
  sectorPerformancePeriods.forEach((period) => {
    const button = document.querySelector(`[data-sector-performance-sort="${period.id}"]`);
    if (button) button.textContent = `${period.label}${sectorPerformanceSortMark(period.id)}`;
  });
  selectedComparisonRows(rows);
  table.innerHTML = rows
    .map((row, index) => {
      const selected = Array.isArray(state.sectorComparisonSectors) && state.sectorComparisonSectors.includes(row.sector);
      return `<tr class="${row.isBenchmark ? "benchmark-row" : ""} ${selected ? "compare-selected" : ""}">
        <td class="rank-number">${index + 1}</td>
        <td class="rank-name">
          <button class="sector-compare-toggle ${selected ? "active" : ""}" data-sector-compare="${encodeURIComponent(
            row.sector,
          )}" type="button">${escapeHtml(row.sector)}</button>
        </td>
        <td class="contributor-cell">${sectorReferenceCell(row, contributionPeriod, market)}</td>
        ${sectorPerformancePeriods
          .map((period) => `<td class="${percentClass(row.changes[period.id])}">${formatPercent(row.changes[period.id])}</td>`)
          .join("")}
      </tr>`;
    })
    .join("");
  renderSectorComparisonChart(rows);
  renderSectorMappingTable(market);
}

function renderSectorComparisonChart(rows) {
  const panel = document.getElementById("sectorComparePanel");
  const chart = document.getElementById("sectorCompareChart");
  const selection = document.getElementById("sectorCompareSelection");
  const tabs = document.getElementById("sectorCompareSpanTabs");
  if (!panel || !chart || !selection || !tabs) return;
  panel.hidden = state.sectorSectionId !== "actions";
  if (panel.hidden) return;
  if (!sectorComparisonPeriods.some((period) => period.id === state.sectorComparisonSpanId)) {
    state.sectorComparisonSpanId = "6m";
  }
  tabs.innerHTML = sectorComparisonPeriods
    .map(
      (period) =>
        `<button class="tab-button ${state.sectorComparisonSpanId === period.id ? "active" : ""}" data-sector-comparison-span="${period.id}" type="button">${period.label}</button>`,
    )
    .join("");
  const selectedRows = selectedComparisonRows(rows);
  selection.innerHTML = selectedRows
    .map((row, index) => {
      const color = sectorComparisonColors[index % sectorComparisonColors.length];
      return `<span class="compare-chip" style="--compare-color:${color}">${escapeHtml(row.sector)}</span>`;
    })
    .join("");
  if (!selectedRows.length) {
    chart.innerHTML = `<div class="empty-chart">비교할 섹터를 선택하세요</div>`;
    return;
  }
  const historySeries = selectedRows.map((row, index) => ({
    name: row.sector,
    color: sectorComparisonColors[index % sectorComparisonColors.length],
    points: sectorRelativeSeries(row, state.sectorComparisonSpanId),
  }));
  const hasHistorySeries = historySeries.some((line) => line.points.length >= 2);
  const fallbackPeriods = fallbackComparisonPeriodsForSpan(state.sectorComparisonSpanId);
  const series = hasHistorySeries
    ? historySeries.filter((line) => line.points.length >= 2)
    : selectedRows.map((row, index) => ({
        name: row.sector,
        color: sectorComparisonColors[index % sectorComparisonColors.length],
        points: fallbackRelativeSeries(row, state.sectorComparisonSpanId),
      }));
  const width = Math.max(chart.clientWidth || 900, 320);
  const height = Math.max(chart.clientHeight || 300, 240);
  const pad = { top: 28, right: 64, bottom: 44, left: 24 };
  const plotWidth = width - pad.left - pad.right;
  const plotHeight = height - pad.top - pad.bottom;
  const values = series.flatMap((line) => line.points.map((point) => point.value));
  const times = series.flatMap((line) => line.points.map((point) => point.t));
  let min = Math.min(0, ...values);
  let max = Math.max(0, ...values);
  const padding = Math.max((max - min) * 0.16, 1);
  min -= padding;
  max += padding;
  const minTime = Math.min(...times);
  const maxTime = Math.max(...times);
  const x = (time) => pad.left + ((time - minTime) / Math.max(maxTime - minTime, 1)) * plotWidth;
  const y = (value) => pad.top + ((max - value) / Math.max(max - min, 1)) * plotHeight;
  const zeroY = y(0);
  const yTicks = Array.from({ length: 5 }, (_, index) => min + ((max - min) / 4) * index);
  const grid = yTicks
    .map(
      (tick) =>
        `<line class="grid-line" x1="${pad.left}" x2="${width - pad.right}" y1="${y(tick).toFixed(1)}" y2="${y(tick).toFixed(
          1,
        )}"></line><text class="axis-label" x="${width - pad.right + 8}" y="${(y(tick) + 4).toFixed(1)}" text-anchor="start">${tick.toFixed(
          1,
        )}%</text>`,
    )
    .join("");
  const axisPoints = hasHistorySeries
    ? Array.from({ length: Math.min(6, Math.max(2, Math.ceil(Math.sqrt(times.length)))) }, (_, index) => minTime + ((maxTime - minTime) * index) / Math.max(Math.min(6, Math.max(2, Math.ceil(Math.sqrt(times.length)))) - 1, 1)).map((time) => ({
        t: time,
        label: new Date(time).toLocaleDateString("ko-KR", { month: "numeric", day: "numeric" }),
      }))
    : fallbackPeriods.map((period, index) => ({ t: index, label: period.label }));
  const labels = axisPoints
    .map((point) => `<text class="axis-label" x="${x(point.t).toFixed(1)}" y="${height - 14}" text-anchor="middle">${point.label}</text>`)
    .join("");
  const lines = series
    .map((line) => {
      const points = line.points.map((point, index) => `${index === 0 ? "M" : "L"} ${x(point.t).toFixed(1)} ${y(point.value).toFixed(1)}`).join(" ");
      const dots = line.points
        .map(
          (point) =>
            `<circle cx="${x(point.t).toFixed(1)}" cy="${y(point.value).toFixed(1)}" r="${hasHistorySeries ? 2.4 : 4}" fill="${line.color}"><title>${escapeHtml(
              line.name,
            )} ${point.label || new Date(point.t).toLocaleDateString("ko-KR")}: ${point.value.toFixed(2)}%</title></circle>`,
        )
        .join("");
      return `<path class="sector-compare-line" d="${points}" stroke="${line.color}"></path>${dots}`;
    })
    .join("");
  const chartPoints = JSON.stringify(
    series.map((line) => ({
      name: line.name,
      color: line.color,
      points: line.points.map((point) => ({
        t: point.t,
        label: point.label || new Date(point.t).toLocaleDateString("ko-KR"),
        value: point.value,
      })),
    })),
  );
  chart.dataset.series = chartPoints;
  chart.dataset.minTime = String(minTime);
  chart.dataset.maxTime = String(maxTime);
  chart.dataset.padLeft = String(pad.left);
  chart.dataset.padRight = String(pad.right);
  chart.innerHTML = `<svg viewBox="0 0 ${width} ${height}" role="img" aria-label="Sector relative performance">
    ${grid}
    <line class="zero-line" x1="${pad.left}" x2="${width - pad.right}" y1="${zeroY.toFixed(1)}" y2="${zeroY.toFixed(1)}"></line>
    ${labels}
    ${lines}
    <rect class="sector-compare-hover-layer" x="${pad.left}" y="${pad.top}" width="${plotWidth}" height="${plotHeight}" />
  </svg>
  <div class="sector-compare-tooltip" id="sectorCompareTooltip" hidden></div>`;
}

function renderSectorMappingTable(market) {
  const table = document.getElementById("sectorMappingTable");
  const panel = document.getElementById("sectorMappingPanel");
  if (panel) panel.hidden = !hasSectorMappingTable(market);
  if (!table) return;
  if (!hasSectorMappingTable(market)) {
    table.innerHTML = "";
    return;
  }
  const groups = new Map();
  const itemsByRawSector = new Map();
  (market.items || []).forEach((item) => {
    const sector = item.sector || "기타";
    const rawSector = item.rawSector || item.sector || "기타";
    if (!groups.has(sector)) groups.set(sector, new Map());
    const rawMap = groups.get(sector);
    rawMap.set(rawSector, (rawMap.get(rawSector) || 0) + 1);
    if (!itemsByRawSector.has(rawSector)) itemsByRawSector.set(rawSector, []);
    itemsByRawSector.get(rawSector).push(item);
  });
  table.innerHTML = [...groups.entries()]
    .sort((a, b) => a[0].localeCompare(b[0], "ko-KR"))
    .map(([sector, rawMap]) => {
      const rawText = [...rawMap.entries()]
        .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0], "ko-KR"))
        .map(
          ([rawSector, count]) =>
            `<button class="mapping-chip ${state.sectorMappingRawSector === rawSector && state.sectorMappingStandardSector === sector ? "active" : ""}" data-mapping-sector="${sector}" data-mapping-raw-sector="${rawSector}" type="button">${rawSector} (${count})</button>`,
        )
        .join("");
      const selectedItems = (itemsByRawSector.get(state.sectorMappingRawSector) || []).filter((item) => item.sector === sector);
      const selectedDetail =
        selectedItems.length && state.sectorMappingStandardSector === sector && [...rawMap.keys()].includes(state.sectorMappingRawSector)
          ? `<tr class="mapping-detail-row">
              <td></td>
              <td>${mappingInlineDetail(selectedItems, market)}</td>
            </tr>`
          : "";
      return `<tr>
        <td class="rank-name">${sector}</td>
        <td>${rawText}</td>
      </tr>${selectedDetail}`;
    })
    .join("");
}

function mappingInlineDetail(items, market) {
  return capWeights(items)
    .sort((a, b) => b.weight - a.weight || b.marketCap - a.marketCap)
    .map(({ item, weight }) => {
      return `<span class="mapping-stock-chip"><strong>${sectorDisplayName(item, market)}</strong><small>${formatMarketCapForRank(
        item,
        market,
      )} · 계산비중 ${(weight * 100).toFixed(1)}%</small></span>`;
    })
    .join("");
}

function renderSectorRankTable(market) {
  const table = document.getElementById("sectorRankTable");
  if (!table || !market) return;
  const ranked = getRankedMarketItems(market).slice(0, 50);
  document.getElementById("sectorRankTitle").textContent = `${market.label} 시가총액 순위`;
  document.getElementById("sectorRankMeta").textContent = `Top ${ranked.length} · ${market.updatedAt || marketData.updatedAt || "--"}`;
  table.innerHTML = ranked
    .map((item) => {
      const displayName = isUsSectorMarket(market) ? item.name : sectorDisplayName(item, market);
      return `<tr>
        <td class="rank-number">${item.marketCapRank}</td>
        <td class="rank-name">${displayName}</td>
        <td class="rank-symbol">${item.symbol}</td>
        <td class="rank-cap">${formatMarketCapForRank(item, market)}</td>
        <td>${rankChangeMarkup(item.rankChange)}</td>
      </tr>`;
    })
    .join("");
}

function pathFromPoints(points, x, y) {
  return points.map((point, index) => `${index === 0 ? "M" : "L"} ${x(point.t).toFixed(1)} ${y(point.value).toFixed(1)}`).join(" ");
}

function drawCandleChart({ container, item, bars, fullBars = bars, compact, showMa, showVolume = false, maSet = maWindows }) {
  if (!container) return;
  const width = Math.max(container.clientWidth || 320, compact ? 180 : 320);
  const height = Math.max(container.clientHeight || 140, compact ? 96 : 320);
  const maxBars = compact ? 90 : Math.max(240, Math.floor(width * 1.2));
  const visibleBars = compact ? bars.slice(-maxBars) : compressBars(bars, maxBars);
  const pad = compact ? { top: 8, right: 8, bottom: 8, left: 8 } : { top: 22, right: 24, bottom: 42, left: 66 };
  const plotWidth = width - pad.left - pad.right;
  const hasVolume = showVolume && !compact && visibleBars.some((bar) => volumeMetric(bar) > 0);
  const volumeHeight = hasVolume ? Math.max(72, Math.min(110, height * 0.18)) : 0;
  const volumeGap = hasVolume ? 18 : 0;
  const plotHeight = height - pad.top - pad.bottom - volumeHeight - volumeGap;
  const volumeTop = pad.top + plotHeight + volumeGap;
  const overlays = showMa ? maSet.map((window) => ({ window, points: movingAverage(fullBars, window) })) : [];
  const allValues = [
    ...visibleBars.flatMap((bar) => [bar.h, bar.l]),
    ...overlays.flatMap((ma) =>
      ma.points
        .filter((point) => point.t >= visibleBars[0].t && point.t <= visibleBars[visibleBars.length - 1].t)
        .map((point) => point.value),
    ),
  ];
  let min = Number.POSITIVE_INFINITY;
  let max = Number.NEGATIVE_INFINITY;
  allValues.forEach((value) => {
    if (value < min) min = value;
    if (value > max) max = value;
  });
  const padding = (max - min || max * 0.01 || 1) * 0.1;
  const yMin = min > 0 ? Math.max(0, min - padding) : min - padding;
  const yMax = max + padding;
  const xMin = visibleBars[0].t;
  const xMax = visibleBars[visibleBars.length - 1].t;
  const xByIndex = (index) => pad.left + (index / Math.max(visibleBars.length - 1, 1)) * plotWidth;
  const visibleIndex = new Map(visibleBars.map((bar, index) => [bar.t, index]));
  const x = (time) => xByIndex(visibleIndex.get(time) ?? 0);
  const y = (value) => pad.top + ((yMax - value) / Math.max(yMax - yMin, 1)) * plotHeight;
  const slot = plotWidth / Math.max(visibleBars.length, 1);
  const bodyWidth = Math.max(2, Math.min(slot * 0.62, compact ? 5 : 9));
  const volumeWidth = Math.max(1, Math.min(slot * 0.72, compact ? 5 : 8));
  const volumeMax = hasVolume ? Math.max(...visibleBars.map(volumeMetric), 1) : 1;
  const volumeY = (value) => volumeTop + volumeHeight - (value / volumeMax) * volumeHeight;
  const volumeLabel = state.volumeModeId === "value" ? "거래대금(추정)" : "거래량";
  const yTicks = compact ? [] : Array.from({ length: 5 }, (_, index) => yMin + ((yMax - yMin) / 4) * index);
  const xTickCount = Math.min(10, visibleBars.length);
  const xTicks = compact
    ? []
    : Array.from({ length: xTickCount }, (_, index) =>
        Math.round((index * (visibleBars.length - 1)) / Math.max(xTickCount - 1, 1)),
      );
  const unit = item.unit ?? "";
  if (!compact) currentMainBars = visibleBars;

  container.innerHTML = `<svg viewBox="0 0 ${width} ${height}" role="img" aria-label="${item.name} candlestick chart">
    ${yTicks
      .map((tick) => {
        const py = y(tick);
        return `<line class="grid-line" x1="${pad.left}" y1="${py}" x2="${pad.left + plotWidth}" y2="${py}" />
          <text class="axis-label" x="8" y="${py + 4}">${fmt.format(tick)}${unit}</text>`;
      })
      .join("")}
    ${xTicks
      .map((tickIndex) => {
        const date = new Date(visibleBars[tickIndex].t);
        const label = date.toLocaleDateString("en-US", { year: state.spanId === "max" ? "2-digit" : undefined, month: "2-digit", day: "2-digit" });
        return `<text class="axis-label" x="${xByIndex(tickIndex) - 20}" y="${height - 12}">${label}</text>`;
      })
      .join("")}
    ${
      hasVolume
        ? `<line class="grid-line volume-baseline" x1="${pad.left}" y1="${volumeTop + volumeHeight}" x2="${pad.left + plotWidth}" y2="${volumeTop + volumeHeight}" />
          <text class="axis-label volume-label" x="8" y="${volumeTop + 12}">${volumeLabel}</text>
          <text class="axis-label volume-label" x="8" y="${volumeTop + 30}">${formatCompactNumber(volumeMax)}</text>
          ${visibleBars
            .map((bar, index) => {
              const cx = xByIndex(index);
              const up = bar.c >= bar.o;
              const value = volumeMetric(bar);
              const top = volumeY(value);
              const barHeight = Math.max(1, volumeTop + volumeHeight - top);
              return `<rect class="volume-bar ${up ? "volume-up" : "volume-down"}" x="${cx - volumeWidth / 2}" y="${top}" width="${volumeWidth}" height="${barHeight}" />`;
            })
            .join("")}`
        : ""
    }
    ${visibleBars
      .map((bar, index) => {
        const cx = xByIndex(index);
        const up = bar.c >= bar.o;
        const color = up ? "#16875d" : "#c64242";
        const top = y(Math.max(bar.o, bar.c));
        const bottom = y(Math.min(bar.o, bar.c));
        const bodyHeight = Math.max(1, bottom - top);
        return `<line class="candle-wick" x1="${cx}" x2="${cx}" y1="${y(bar.h)}" y2="${y(bar.l)}" stroke="${color}" />
          <rect class="candle-body ${up ? "up-candle" : "down-candle"}" x="${cx - bodyWidth / 2}" y="${top}" width="${bodyWidth}" height="${bodyHeight}" stroke="${color}" />
        `;
      })
      .join("")}
    ${overlays
      .map((ma) => {
        const points = ma.points.filter((point) => point.t >= xMin && point.t <= xMax && visibleIndex.has(point.t));
        if (points.length < 2) return "";
        return `<path class="ma-line" d="${pathFromPoints(points, x, y)}" stroke="${maColors[ma.window]}" />`;
      })
      .join("")}
    ${compact ? "" : `<rect class="drag-layer" x="${pad.left}" y="${pad.top}" width="${plotWidth}" height="${plotHeight + volumeGap + volumeHeight}" data-x-min="${xMin}" data-x-max="${xMax}" data-full-min="${getBaseBars(item)[0].t}" data-full-max="${getBaseBars(item).at(-1).t}" data-pad-left="${pad.left}" data-plot-width="${plotWidth}" />`}
  </svg>`;
}

function rerender() {
  try {
    renderTabs();
    renderPageView();
    if (state.pageId === "market") {
      renderMiniCharts();
      renderChart();
    } else {
      renderSectorMap();
    }
    saveDashboardState();
  } catch (error) {
    window.__dashboardError = { message: error.message, stack: String(error.stack) };
    const mainChart = document.getElementById("mainChart");
    if (mainChart) mainChart.textContent = `Chart error: ${error.message}`;
    console.error(error);
  }
}

document.addEventListener("click", (event) => {
  const filterToggle = event.target.closest("[data-filter-toggle]");
  const pageButton = event.target.closest("[data-page]");
  const assetButton = event.target.closest("[data-asset]");
  const intervalButton = event.target.closest("[data-interval]");
  const spanButton = event.target.closest("[data-span]");
  const volumeModeButton = event.target.closest("[data-volume-mode]");
  const miniIntervalButton = event.target.closest("[data-mini-interval]");
  const miniSpanButton = event.target.closest("[data-mini-span]");
  const miniButton = event.target.closest("[data-symbol]");
  const sectorSectionButton = event.target.closest("[data-sector-section]");
  const sectorMarketButton = event.target.closest("[data-sector-market]");
  const sectorViewButton = event.target.closest("[data-sector-view]");
  const sectorSpanButton = event.target.closest("[data-sector-span]");
  const sectorPerformanceSortButton = event.target.closest("[data-sector-performance-sort]");
  const sectorActionRegionButton = event.target.closest("[data-sector-action-region]");
  const sectorComparisonSpanButton = event.target.closest("[data-sector-comparison-span]");
  const sectorCompareButton = event.target.closest("[data-sector-compare]");
  const mappingRawSectorButton = event.target.closest("[data-mapping-raw-sector]");

  if (filterToggle) {
    const menuId = filterMenuId(filterToggle.dataset.filterToggle);
    const menu = document.getElementById(menuId);
    if (menu) {
      const nextHidden = !menu.hidden;
      closeFilterMenus(menuId);
      menu.hidden = nextHidden;
      filterToggle.classList.toggle("open", !nextHidden);
    }
    return;
  }

  if (pageButton) {
    state.pageId = pageButton.dataset.page;
    state.zoom = null;
    rerender();
  }
  if (assetButton) {
    state.assetId = assetButton.dataset.asset;
    state.symbol = getAsset().instruments[0].symbol;
    state.zoom = null;
    rerender();
  }
  if (intervalButton) {
    state.intervalId = intervalButton.dataset.interval;
    state.zoom = null;
    closeFilterMenus();
    rerender();
  }
  if (spanButton) {
    state.spanId = spanButton.dataset.span;
    state.zoom = null;
    closeFilterMenus();
    rerender();
  }
  if (volumeModeButton) {
    state.volumeModeId = volumeModeButton.dataset.volumeMode;
    closeFilterMenus();
    renderTabs();
    renderChart();
    saveDashboardState();
  }
  if (miniIntervalButton) {
    state.miniIntervalId = miniIntervalButton.dataset.miniInterval;
    state.miniSpanId = state.miniIntervalId === "1d" ? "3m" : "ytd";
    rerender();
  }
  if (miniSpanButton) {
    state.miniSpanId = miniSpanButton.dataset.miniSpan;
    rerender();
  }
  if (miniButton) {
    state.symbol = miniButton.dataset.symbol;
    state.zoom = null;
    rerender();
    document.getElementById("expandedPanel").scrollIntoView({ behavior: "smooth", block: "start" });
  }
  if (sectorSectionButton) {
    state.sectorSectionId = sectorSectionButton.dataset.sectorSection;
    rerender();
  }
  if (sectorMarketButton) {
    state.sectorMarketId = sectorMarketButton.dataset.sectorMarket;
    closeFilterMenus();
    rerender();
  }
  if (sectorViewButton) {
    state.sectorViewId = sectorViewButton.dataset.sectorView;
    closeFilterMenus();
    rerender();
  }
  if (sectorSpanButton) {
    state.sectorSpanId = sectorSpanButton.dataset.sectorSpan;
    closeFilterMenus();
    rerender();
  }
  if (sectorActionRegionButton) {
    state.sectorActionRegionId = sectorActionRegionButton.dataset.sectorActionRegion;
    state.sectorPerformanceSortKey = "";
    state.sectorPerformanceSortDirection = "";
    state.sectorComparisonSectors = [];
    state.sectorMappingRawSector = "";
    state.sectorMappingStandardSector = "";
    rerender();
  }
  if (sectorComparisonSpanButton) {
    state.sectorComparisonSpanId = sectorComparisonSpanButton.dataset.sectorComparisonSpan;
    renderSectorPerformanceTable(getSectorActionMarket());
    saveDashboardState();
  }
  if (sectorCompareButton) {
    const sector = decodeURIComponent(sectorCompareButton.dataset.sectorCompare);
    const current = Array.isArray(state.sectorComparisonSectors) ? [...state.sectorComparisonSectors] : [];
    const existingIndex = current.indexOf(sector);
    if (existingIndex >= 0) {
      current.splice(existingIndex, 1);
    } else {
      if (current.length >= 3) current.shift();
      current.push(sector);
    }
    state.sectorComparisonSectors = current;
    renderSectorPerformanceTable(getSectorActionMarket());
    saveDashboardState();
  }
  if (mappingRawSectorButton) {
    state.sectorMappingRawSector = mappingRawSectorButton.dataset.mappingRawSector;
    state.sectorMappingStandardSector = mappingRawSectorButton.dataset.mappingSector;
    renderSectorMappingTable(getSectorActionMarket());
    saveDashboardState();
  }
  if (sectorPerformanceSortButton) {
    const nextKey = sectorPerformanceSortButton.dataset.sectorPerformanceSort;
    if (state.sectorPerformanceSortKey !== nextKey) {
      state.sectorPerformanceSortKey = nextKey;
      state.sectorPerformanceSortDirection = "desc";
    } else if (state.sectorPerformanceSortDirection === "desc") {
      state.sectorPerformanceSortDirection = "asc";
    } else {
      state.sectorPerformanceSortKey = "";
      state.sectorPerformanceSortDirection = "";
    }
    renderSectorPerformanceTable(getSectorActionMarket());
    saveDashboardState();
  }
});

document.addEventListener("pointerdown", (event) => {
  if (event.target.closest(".filter-group")) return;
  closeFilterMenus();
});

document.addEventListener("dblclick", (event) => {
  const sectorTile = event.target.closest("[data-sector-symbol]");
  if (!sectorTile) return;
  const symbol = sectorTile.dataset.sectorSymbol;
  const marketId = sectorTile.dataset.sectorMarket;
  const url = ["sp500", "nasdaq100"].includes(marketId)
    ? `https://finance.yahoo.com/quote/${symbol}`
    : `https://finance.naver.com/item/main.naver?code=${symbol}`;
  window.open(url, "_blank", "noopener");
});

document.addEventListener("pointerdown", (event) => {
  const layer = event.target.closest(".drag-layer");
  if (!layer) return;
  const rect = layer.getBoundingClientRect();
  state.drag = { startX: event.clientX - rect.left, currentX: event.clientX - rect.left, rect, layer };
  layer.setPointerCapture?.(event.pointerId);
});

document.addEventListener("pointermove", (event) => {
  if (!state.drag) return;
  const currentX = Math.max(0, Math.min(state.drag.rect.width, event.clientX - state.drag.rect.left));
  state.drag.currentX = currentX;
  const layer = state.drag.layer;
  let selection = document.getElementById("dragSelection");
  if (!selection) {
    selection = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    selection.setAttribute("id", "dragSelection");
    selection.setAttribute("class", "drag-selection");
    layer.parentNode.appendChild(selection);
  }
  const padLeft = Number(layer.dataset.padLeft);
  const plotWidth = Number(layer.dataset.plotWidth);
  const dragRight = currentX >= state.drag.startX;
  const minRatio = Math.min(state.drag.startX, currentX) / state.drag.rect.width;
  const maxRatio = Math.max(state.drag.startX, currentX) / state.drag.rect.width;
  selection.setAttribute("x", dragRight ? padLeft + minRatio * plotWidth : padLeft);
  selection.setAttribute("y", layer.getAttribute("y"));
  selection.setAttribute("width", dragRight ? (maxRatio - minRatio) * plotWidth : plotWidth);
  selection.setAttribute("height", layer.getAttribute("height"));
  selection.classList.toggle("zoom-out-selection", !dragRight);
});

document.addEventListener("pointerup", () => {
  if (!state.drag) return;
  const { layer, startX, currentX, rect } = state.drag;
  if (Math.abs(currentX - startX) > 10) {
    const xMin = Number(layer.dataset.xMin);
    const xMax = Number(layer.dataset.xMax);
    const item = getInstrument();
    const allBars = getBaseBars(item);
    const currentBars = pickByRange(allBars, xMin, xMax);
    if (currentX > startX) {
      const minRatio = Math.min(startX, currentX) / rect.width;
      const maxRatio = Math.max(startX, currentX) / rect.width;
      const startIndex = minRatio * Math.max(currentBars.length - 1, 1);
      const endIndex = maxRatio * Math.max(currentBars.length - 1, 1);
      state.zoom = rangeFromIndexWindow(currentBars, startIndex, endIndex);
    } else {
      const firstCurrentIndex = allBars.findIndex((bar) => bar.t >= xMin);
      const lastCurrentIndex = allBars.findLastIndex((bar) => bar.t <= xMax);
      const currentCount = Math.max(lastCurrentIndex - firstCurrentIndex + 1, currentBars.length);
      const fullCount = allBars.length;
      const dragRatio = Math.min((startX - currentX) / rect.width, 1);
      const nextCount = Math.min(Math.ceil(currentCount * (1 + dragRatio * 5)), fullCount);
      const anchorIndex = firstCurrentIndex + (startX / rect.width) * Math.max(currentCount - 1, 1);
      const leftShare = (anchorIndex - firstCurrentIndex) / Math.max(currentCount - 1, 1);
      let nextStartIndex = Math.round(anchorIndex - nextCount * leftShare);
      let nextEndIndex = nextStartIndex + nextCount - 1;
      if (nextStartIndex < 0) {
        nextStartIndex = 0;
        nextEndIndex = Math.min(nextCount - 1, fullCount - 1);
      }
      if (nextEndIndex > fullCount - 1) {
        nextEndIndex = fullCount - 1;
        nextStartIndex = Math.max(0, fullCount - nextCount);
      }
      state.zoom = nextCount >= fullCount * 0.995 ? null : { start: allBars[nextStartIndex].t, end: allBars[nextEndIndex].t };
    }
  }
  state.drag = null;
  renderChart();
  saveDashboardState();
});

document.addEventListener("pointermove", (event) => {
  const tooltip = document.getElementById("chartTooltip");
  const layer = event.target.closest(".drag-layer");
  if (!layer || !tooltip || !event.target.closest("#mainChart") || state.drag || !currentMainBars.length) return;
  const rect = layer.getBoundingClientRect();
  const ratio = Math.max(0, Math.min(1, (event.clientX - rect.left) / Math.max(rect.width, 1)));
  const index = Math.max(0, Math.min(currentMainBars.length - 1, Math.round(ratio * (currentMainBars.length - 1))));
  const bar = currentMainBars[index];
  const prev = currentMainBars[index - 1] || bar;
  const change = prev.c ? ((bar.c - prev.c) / prev.c) * 100 : 0;
  const sign = change >= 0 ? "+" : "";
  tooltip.innerHTML = `
    <strong>${new Date(bar.t).toLocaleDateString("ko-KR")}</strong>
    <span>종가 ${fmt.format(bar.c)}${getInstrument().unit ?? ""}</span>
    <em class="${change >= 0 ? "up" : "down"}">전일 대비 ${sign}${change.toFixed(2)}%</em>
  `;
  tooltip.hidden = false;
  const chartRect = document.getElementById("mainChart").getBoundingClientRect();
  const panelRect = document.getElementById("expandedPanel").getBoundingClientRect();
  const left = event.clientX - panelRect.left + 14;
  const top = event.clientY - panelRect.top - 10;
  tooltip.style.left = `${Math.min(left, chartRect.right - panelRect.left - 150)}px`;
  tooltip.style.top = `${Math.max(top, chartRect.top - panelRect.top + 8)}px`;
});

document.addEventListener("pointermove", (event) => {
  const chart = event.target.closest("#sectorCompareChart");
  const layer = event.target.closest(".sector-compare-hover-layer");
  const tooltip = document.getElementById("sectorCompareTooltip");
  if (!chart || !layer || !tooltip || !chart.dataset.series) return;
  let series = [];
  try {
    series = JSON.parse(chart.dataset.series);
  } catch {
    return;
  }
  const rect = layer.getBoundingClientRect();
  const ratio = Math.max(0, Math.min(1, (event.clientX - rect.left) / Math.max(rect.width, 1)));
  const minTime = Number(chart.dataset.minTime || 0);
  const maxTime = Number(chart.dataset.maxTime || 0);
  const targetTime = minTime + (maxTime - minTime) * ratio;
  const rows = series
    .map((line) => {
      const nearest = (line.points || []).reduce((best, point) => {
        if (!best) return point;
        return Math.abs(point.t - targetTime) < Math.abs(best.t - targetTime) ? point : best;
      }, null);
      return nearest ? { ...nearest, name: line.name, color: line.color } : null;
    })
    .filter(Boolean);
  if (!rows.length) return;
  const dateLabel = rows[0].label || new Date(rows[0].t).toLocaleDateString("ko-KR");
  tooltip.innerHTML = `<strong>${dateLabel}</strong>${rows
    .map((row) => {
      const sign = row.value >= 0 ? "+" : "";
      return `<span><i style="background:${row.color}"></i>${escapeHtml(row.name)} <em class="${percentClass(row.value)}">${sign}${row.value.toFixed(2)}%</em></span>`;
    })
    .join("")}`;
  tooltip.hidden = false;
  const panelRect = chart.getBoundingClientRect();
  const left = event.clientX - panelRect.left + 14;
  const top = event.clientY - panelRect.top + 12;
  tooltip.style.left = `${Math.min(left, panelRect.width - 260)}px`;
  tooltip.style.top = `${Math.max(top, 8)}px`;
});

document.addEventListener("pointerout", (event) => {
  if (!event.target.closest(".sector-compare-hover-layer")) return;
  const tooltip = document.getElementById("sectorCompareTooltip");
  if (tooltip) tooltip.hidden = true;
});

document.addEventListener("pointerout", (event) => {
  if (!event.target.closest(".drag-layer")) return;
  const tooltip = document.getElementById("chartTooltip");
  if (tooltip) tooltip.hidden = true;
});

document.addEventListener("dblclick", (event) => {
  if (!event.target.closest("#mainChart")) return;
  state.zoom = null;
  renderChart();
  saveDashboardState();
});

window.addEventListener("resize", () => {
  if (state.pageId === "market") {
    renderMiniCharts();
    renderChart();
  } else {
    renderSectorMap();
  }
});

async function loadMarketData() {
  try {
    const response = await fetch("./market-data.json", { cache: "no-store" });
    if (!response.ok) return;
    const nextData = await response.json();
    if (!nextData.assets?.length) return;
    const previousAssetId = state.assetId;
    const previousSymbol = state.symbol;
    marketData = nextData;
    const asset = marketData.assets.find((item) => item.id === previousAssetId) || marketData.assets[0];
    state.assetId = asset.id;
    state.symbol = asset.instruments.some((item) => item.symbol === previousSymbol)
      ? previousSymbol
      : asset.instruments[0].symbol;
    const sectorMarket = getSectorMarkets().find((item) => item.id === state.sectorMarketId) || getSectorMarkets()[0];
    state.sectorMarketId = sectorMarket.id;
  } catch {
    // Keep bundled sample data when market-data.json is absent.
  }
}

async function init() {
  await loadMarketData();
  renderStatus();
  rerender();
  setInterval(async () => {
    await loadMarketData();
    renderStatus();
    rerender();
  }, 60 * 1000);
}

restoreDashboardState();
init();
