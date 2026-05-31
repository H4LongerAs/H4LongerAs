const MARKET_DATA = {
  updatedAt: "2026-05-28 15:45 KST",
  status: {
    riskMode: "Neutral",
    vix: 17.8,
    us10y: 4.52,
    usdkrw: 1364.2,
    gold: 2387.5,
  },
  assets: [
    {
      id: "indices",
      label: "Global Indices",
      instruments: [
        { symbol: "SPX", name: "S&P 500", price: 5478.6, change: 0.42 },
        { symbol: "NDX", name: "Nasdaq 100", price: 19684.1, change: 0.61 },
        { symbol: "DJI", name: "Dow Jones", price: 39118.8, change: 0.18 },
        { symbol: "RUT", name: "Russell 2000", price: 2034.5, change: -0.26 },
        { symbol: "STOXX50E", name: "Euro Stoxx 50", price: 4926.7, change: -0.11 },
        { symbol: "N225", name: "Nikkei 225", price: 38612.2, change: 0.33 },
        { symbol: "KOSPI", name: "KOSPI", price: 2735.9, change: -0.18 },
        { symbol: "CSI300", name: "CSI 300", price: 3611.4, change: 0.27 },
      ],
    },
    {
      id: "rates",
      label: "Rates",
      instruments: [
        { symbol: "US02Y", name: "US Treasury 2Y", price: 4.93, change: 0.7, unit: "%" },
        { symbol: "US10Y", name: "US Treasury 10Y", price: 4.52, change: -1.4, unit: "%" },
        { symbol: "US30Y", name: "US Treasury 30Y", price: 4.67, change: -1.0, unit: "%" },
        { symbol: "DE10Y", name: "Germany 10Y", price: 2.59, change: 1.1, unit: "%" },
        { symbol: "JP10Y", name: "Japan 10Y", price: 1.02, change: 0.4, unit: "%" },
        { symbol: "KR10Y", name: "Korea 10Y", price: 3.47, change: -0.6, unit: "%" },
      ],
    },
    {
      id: "commodities",
      label: "Commodities",
      instruments: [
        { symbol: "WTI", name: "WTI Crude Oil", price: 78.4, change: 0.76 },
        { symbol: "BRENT", name: "Brent Crude Oil", price: 82.1, change: 0.58 },
        { symbol: "XAU", name: "Gold Spot", price: 2387.5, change: -0.21 },
        { symbol: "XCU", name: "Copper", price: 4.65, change: 1.2 },
        { symbol: "NG", name: "Natural Gas", price: 2.83, change: -1.7 },
      ],
    },
    {
      id: "fx",
      label: "FX",
      instruments: [
        { symbol: "USDKRW", name: "USD/KRW", price: 1364.2, change: -0.14 },
        { symbol: "USDJPY", name: "USD/JPY", price: 157.12, change: 0.22 },
        { symbol: "EURUSD", name: "EUR/USD", price: 1.084, change: -0.08 },
        { symbol: "USDCNH", name: "USD/CNH", price: 7.25, change: 0.06 },
        { symbol: "DXY", name: "US Dollar Index", price: 104.6, change: 0.13 },
      ],
    },
    {
      id: "sentiment",
      label: "Market State",
      instruments: [
        { symbol: "VIX", name: "CBOE VIX", price: 17.8, change: -2.4 },
        { symbol: "VVIX", name: "VVIX", price: 92.1, change: -1.1 },
        { symbol: "MOVE", name: "MOVE Bond Volatility", price: 105.7, change: 0.6 },
        { symbol: "HYSPREAD", name: "US High Yield Spread", price: 3.25, change: -0.3, unit: "%" },
        { symbol: "PUTCALL", name: "Put/Call Ratio", price: 0.84, change: -0.05 },
      ],
    },
  ],
};
