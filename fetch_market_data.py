#!/usr/bin/env python3
"""
Refresh market-data.json for the personal market dashboard.

The script prefers FinceptTerminal's yfinance_data.py when its dependencies are
available. If not, it falls back to Yahoo's chart endpoint using only Python's
standard library.
"""

from __future__ import annotations

import importlib.util
import json
import math
import re
import ssl
import sys
import time
import urllib.parse
import urllib.request
from datetime import datetime, timezone
from concurrent.futures import ThreadPoolExecutor, as_completed
from pathlib import Path
from typing import Any

import pandas as pd


FINCEPT_YFINANCE = Path(r"C:\Program Files\FinceptTerminal\scripts\yfinance_data.py")
OUTPUT_PATH = Path(__file__).with_name("market-data.json")
VOLUME_START_MS = int(datetime(2020, 1, 1, tzinfo=timezone.utc).timestamp() * 1000)
HISTORY_START_2000_MS = int(datetime(2000, 1, 1, tzinfo=timezone.utc).timestamp() * 1000)
TRIM_HISTORY_FROM_2000 = {"JGBETF", "KTBETF", "HHGAS", "TTFGAS", "N225"}
SECTOR_HISTORY_DAYS = 150


ASSETS = [
    {
        "id": "indices",
        "label": "Global Indices",
        "instruments": [
            {"symbol": "SPX", "sourceSymbol": "^GSPC", "name": "S&P 500"},
            {"symbol": "NDX", "sourceSymbol": "^NDX", "name": "Nasdaq 100"},
            {"symbol": "BTC", "sourceSymbol": "BTC-USD", "name": "Bitcoin", "unit": "$"},
            {"symbol": "DJI", "sourceSymbol": "^DJI", "name": "Dow Jones"},
            {"symbol": "RUT", "sourceSymbol": "^RUT", "name": "Russell 2000"},
            {"symbol": "STOXX50E", "sourceSymbol": "^STOXX50E", "name": "Euro Stoxx 50"},
            {"symbol": "N225", "sourceSymbol": "^N225", "name": "Nikkei 225"},
            {"symbol": "KOSPI", "sourceSymbol": "^KS11", "name": "KOSPI"},
            {"symbol": "CSI300", "sourceSymbol": "000300.SS", "name": "CSI 300"},
        ],
    },
    {
        "id": "rates",
        "label": "Rates",
        "instruments": [
            {"symbol": "US03M", "sourceSymbol": "^IRX", "name": "US 13 Week Bill", "unit": "%"},
            {"symbol": "US05Y", "sourceSymbol": "^FVX", "name": "US Treasury 5Y", "unit": "%"},
            {"symbol": "US10Y", "sourceSymbol": "^TNX", "name": "US Treasury 10Y", "unit": "%"},
            {"symbol": "US30Y", "sourceSymbol": "^TYX", "name": "US Treasury 30Y", "unit": "%"},
            {"symbol": "JGBETF", "sourceSymbol": "1482.T", "name": "Japan Gov Bond ETF"},
            {"symbol": "KTBETF", "sourceSymbol": "114260.KS", "name": "Korea 10Y Bond ETF"},
        ],
    },
    {
        "id": "commodities",
        "label": "Commodities",
        "instruments": [
            {"symbol": "WTI", "sourceSymbol": "CL=F", "name": "WTI Crude Oil"},
            {"symbol": "BRENT", "sourceSymbol": "BZ=F", "name": "Brent Crude Oil"},
            {"symbol": "XAU", "sourceSymbol": "GC=F", "name": "Gold Futures"},
            {"symbol": "XAG", "sourceSymbol": "SI=F", "name": "Silver Futures"},
            {"symbol": "XCU", "sourceSymbol": "HG=F", "name": "Copper Futures"},
            {"symbol": "HHGAS", "sourceSymbol": "NG=F", "name": "US Henry Hub Gas"},
            {"symbol": "TTFGAS", "sourceSymbol": "TTF=F", "name": "Europe TTF Gas"},
        ],
    },
    {
        "id": "fx",
        "label": "FX",
        "instruments": [
            {"symbol": "DXY", "sourceSymbol": "DX-Y.NYB", "name": "US Dollar Index"},
            {"symbol": "USDKRW", "sourceSymbol": "KRW=X", "name": "USD/KRW"},
            {"symbol": "USDJPY", "sourceSymbol": "JPY=X", "name": "USD/JPY"},
            {"symbol": "EURUSD", "sourceSymbol": "EURUSD=X", "name": "EUR/USD"},
            {"symbol": "USDCNY", "sourceSymbol": "CNY=X", "name": "USD/CNY"},
        ],
    },
    {
        "id": "sentiment",
        "label": "Market State",
        "instruments": [
            {"symbol": "VIX", "sourceSymbol": "^VIX", "name": "CBOE VIX"},
            {"symbol": "VVIX", "sourceSymbol": "^VVIX", "name": "VVIX"},
            {"symbol": "MOVE", "sourceSymbol": "^MOVE", "name": "MOVE Bond Volatility"},
            {"symbol": "KRCDS5Y", "sourceSymbol": "INVESTING:KRGV5YUSAC=R", "name": "Korea CDS 5Y", "unit": "bp"},
            {"symbol": "HYG", "sourceSymbol": "HYG", "name": "High Yield ETF"},
        ],
    },
]

KOSPI_MARKET_MAP = [
    {"symbol": "005930", "sourceSymbol": "005930.KS", "name": "삼성전자", "sector": "전기·전자", "marketCap": 485},
    {"symbol": "000660", "sourceSymbol": "000660.KS", "name": "SK하이닉스", "sector": "전기·전자", "marketCap": 198},
    {"symbol": "373220", "sourceSymbol": "373220.KS", "name": "LG에너지솔루션", "sector": "전기·전자", "marketCap": 86},
    {"symbol": "207940", "sourceSymbol": "207940.KS", "name": "삼성바이오로직스", "sector": "의약품", "marketCap": 72},
    {"symbol": "005380", "sourceSymbol": "005380.KS", "name": "현대차", "sector": "운송장비·부품", "marketCap": 58},
    {"symbol": "000270", "sourceSymbol": "000270.KS", "name": "기아", "sector": "운송장비·부품", "marketCap": 44},
    {"symbol": "068270", "sourceSymbol": "068270.KS", "name": "셀트리온", "sector": "의약품", "marketCap": 42},
    {"symbol": "035420", "sourceSymbol": "035420.KS", "name": "NAVER", "sector": "IT 서비스", "marketCap": 34},
    {"symbol": "105560", "sourceSymbol": "105560.KS", "name": "KB금융", "sector": "금융", "marketCap": 32},
    {"symbol": "055550", "sourceSymbol": "055550.KS", "name": "신한지주", "sector": "금융", "marketCap": 26},
    {"symbol": "005490", "sourceSymbol": "005490.KS", "name": "POSCO홀딩스", "sector": "철강·금속", "marketCap": 25},
    {"symbol": "012330", "sourceSymbol": "012330.KS", "name": "현대모비스", "sector": "운송장비·부품", "marketCap": 24},
    {"symbol": "028260", "sourceSymbol": "028260.KS", "name": "삼성물산", "sector": "유통·상사", "marketCap": 23},
    {"symbol": "035720", "sourceSymbol": "035720.KS", "name": "카카오", "sector": "IT 서비스", "marketCap": 19},
    {"symbol": "086790", "sourceSymbol": "086790.KS", "name": "하나금융지주", "sector": "금융", "marketCap": 18},
    {"symbol": "051910", "sourceSymbol": "051910.KS", "name": "LG화학", "sector": "화학", "marketCap": 17},
    {"symbol": "006400", "sourceSymbol": "006400.KS", "name": "삼성SDI", "sector": "전기·전자", "marketCap": 16},
    {"symbol": "034020", "sourceSymbol": "034020.KS", "name": "두산에너빌리티", "sector": "기계·장비", "marketCap": 15},
    {"symbol": "009540", "sourceSymbol": "009540.KS", "name": "HD한국조선해양", "sector": "운송장비·부품", "marketCap": 14},
    {"symbol": "066570", "sourceSymbol": "066570.KS", "name": "LG전자", "sector": "전기·전자", "marketCap": 13},
    {"symbol": "032830", "sourceSymbol": "032830.KS", "name": "삼성생명", "sector": "보험", "marketCap": 12},
    {"symbol": "000810", "sourceSymbol": "000810.KS", "name": "삼성화재", "sector": "보험", "marketCap": 11.8},
    {"symbol": "267260", "sourceSymbol": "267260.KS", "name": "HD현대일렉트릭", "sector": "전기·전자", "marketCap": 11.5},
    {"symbol": "138040", "sourceSymbol": "138040.KS", "name": "메리츠금융지주", "sector": "금융", "marketCap": 11},
    {"symbol": "012450", "sourceSymbol": "012450.KS", "name": "한화에어로스페이스", "sector": "운송장비·부품", "marketCap": 10.8},
    {"symbol": "329180", "sourceSymbol": "329180.KS", "name": "HD현대중공업", "sector": "운송장비·부품", "marketCap": 10.5},
    {"symbol": "015760", "sourceSymbol": "015760.KS", "name": "한국전력", "sector": "전기·가스", "marketCap": 10.2},
    {"symbol": "034730", "sourceSymbol": "034730.KS", "name": "SK", "sector": "금융", "marketCap": 9.8},
    {"symbol": "402340", "sourceSymbol": "402340.KS", "name": "SK스퀘어", "sector": "금융", "marketCap": 9.5},
    {"symbol": "010950", "sourceSymbol": "010950.KS", "name": "S-Oil", "sector": "화학", "marketCap": 9.2},
    {"symbol": "259960", "sourceSymbol": "259960.KS", "name": "크래프톤", "sector": "IT 서비스", "marketCap": 9.0},
    {"symbol": "018260", "sourceSymbol": "018260.KS", "name": "삼성에스디에스", "sector": "IT 서비스", "marketCap": 8.8},
    {"symbol": "010130", "sourceSymbol": "010130.KS", "name": "고려아연", "sector": "철강·금속", "marketCap": 8.6},
    {"symbol": "003670", "sourceSymbol": "003670.KS", "name": "포스코퓨처엠", "sector": "전기·전자", "marketCap": 8.4},
    {"symbol": "316140", "sourceSymbol": "316140.KS", "name": "우리금융지주", "sector": "금융", "marketCap": 8.2},
    {"symbol": "033780", "sourceSymbol": "033780.KS", "name": "KT&G", "sector": "필수소비재", "marketCap": 8.0},
    {"symbol": "003550", "sourceSymbol": "003550.KS", "name": "LG", "sector": "금융", "marketCap": 7.8},
    {"symbol": "017670", "sourceSymbol": "017670.KS", "name": "SK텔레콤", "sector": "통신", "marketCap": 7.6},
    {"symbol": "096770", "sourceSymbol": "096770.KS", "name": "SK이노베이션", "sector": "화학", "marketCap": 7.4},
    {"symbol": "042660", "sourceSymbol": "042660.KS", "name": "한화오션", "sector": "운송장비·부품", "marketCap": 7.2},
    {"symbol": "352820", "sourceSymbol": "352820.KS", "name": "하이브", "sector": "미디어", "marketCap": 7.0},
    {"symbol": "011200", "sourceSymbol": "011200.KS", "name": "HMM", "sector": "운송·창고", "marketCap": 6.8},
    {"symbol": "011070", "sourceSymbol": "011070.KS", "name": "LG이노텍", "sector": "전기·전자", "marketCap": 6.6},
    {"symbol": "009150", "sourceSymbol": "009150.KS", "name": "삼성전기", "sector": "전기·전자", "marketCap": 6.4},
    {"symbol": "047810", "sourceSymbol": "047810.KS", "name": "한국항공우주", "sector": "운송장비·부품", "marketCap": 6.2},
    {"symbol": "010140", "sourceSymbol": "010140.KS", "name": "삼성중공업", "sector": "운송장비·부품", "marketCap": 6.0},
    {"symbol": "302440", "sourceSymbol": "302440.KS", "name": "SK바이오사이언스", "sector": "의약품", "marketCap": 5.8},
    {"symbol": "251270", "sourceSymbol": "251270.KS", "name": "넷마블", "sector": "IT 서비스", "marketCap": 5.6},
    {"symbol": "090430", "sourceSymbol": "090430.KS", "name": "아모레퍼시픽", "sector": "화학", "marketCap": 5.4},
    {"symbol": "271560", "sourceSymbol": "271560.KS", "name": "오리온", "sector": "필수소비재", "marketCap": 5.2},
]

KOSPI_MARKET_MAP += [
    {"symbol": "004170", "sourceSymbol": "004170.KS", "name": "신세계", "sector": "유통", "marketCap": 4.9},
    {"symbol": "069960", "sourceSymbol": "069960.KS", "name": "현대백화점", "sector": "유통", "marketCap": 2.8},
    {"symbol": "023530", "sourceSymbol": "023530.KS", "name": "롯데쇼핑", "sector": "유통", "marketCap": 2.4},
    {"symbol": "282330", "sourceSymbol": "282330.KS", "name": "BGF리테일", "sector": "유통", "marketCap": 2.1},
    {"symbol": "007070", "sourceSymbol": "007070.KS", "name": "GS리테일", "sector": "유통", "marketCap": 1.9},
    {"symbol": "097950", "sourceSymbol": "097950.KS", "name": "CJ제일제당", "sector": "음식료·담배", "marketCap": 5.0},
    {"symbol": "004370", "sourceSymbol": "004370.KS", "name": "농심", "sector": "음식료·담배", "marketCap": 2.7},
    {"symbol": "007310", "sourceSymbol": "007310.KS", "name": "오뚜기", "sector": "음식료·담배", "marketCap": 1.5},
    {"symbol": "005300", "sourceSymbol": "005300.KS", "name": "롯데칠성", "sector": "음식료·담배", "marketCap": 1.3},
    {"symbol": "280360", "sourceSymbol": "280360.KS", "name": "롯데웰푸드", "sector": "음식료·담배", "marketCap": 1.2},
    {"symbol": "030200", "sourceSymbol": "030200.KS", "name": "KT", "sector": "통신", "marketCap": 7.0},
    {"symbol": "032640", "sourceSymbol": "032640.KS", "name": "LG유플러스", "sector": "통신", "marketCap": 4.5},
    {"symbol": "036570", "sourceSymbol": "036570.KS", "name": "엔씨소프트", "sector": "IT 서비스", "marketCap": 4.8},
    {"symbol": "293490", "sourceSymbol": "293490.KS", "name": "카카오게임즈", "sector": "IT 서비스", "marketCap": 1.7},
    {"symbol": "326030", "sourceSymbol": "326030.KS", "name": "SK바이오팜", "sector": "의약품", "marketCap": 5.0},
    {"symbol": "128940", "sourceSymbol": "128940.KS", "name": "한미약품", "sector": "의약품", "marketCap": 4.5},
    {"symbol": "008930", "sourceSymbol": "008930.KS", "name": "한미사이언스", "sector": "의약품", "marketCap": 2.9},
    {"symbol": "185750", "sourceSymbol": "185750.KS", "name": "종근당", "sector": "의약품", "marketCap": 1.6},
    {"symbol": "161390", "sourceSymbol": "161390.KS", "name": "한국타이어앤테크놀로지", "sector": "운송장비·부품", "marketCap": 5.1},
    {"symbol": "011210", "sourceSymbol": "011210.KS", "name": "현대위아", "sector": "운송장비·부품", "marketCap": 1.8},
    {"symbol": "010060", "sourceSymbol": "010060.KS", "name": "OCI홀딩스", "sector": "화학", "marketCap": 1.9},
    {"symbol": "011780", "sourceSymbol": "011780.KS", "name": "금호석유", "sector": "화학", "marketCap": 3.4},
    {"symbol": "011790", "sourceSymbol": "011790.KS", "name": "SKC", "sector": "화학", "marketCap": 3.0},
    {"symbol": "051900", "sourceSymbol": "051900.KS", "name": "LG생활건강", "sector": "화학", "marketCap": 5.0},
    {"symbol": "018880", "sourceSymbol": "018880.KS", "name": "한온시스템", "sector": "운송장비·부품", "marketCap": 2.5},
    {"symbol": "241560", "sourceSymbol": "241560.KS", "name": "두산밥캣", "sector": "기계·장비", "marketCap": 4.8},
    {"symbol": "267250", "sourceSymbol": "267250.KS", "name": "HD현대", "sector": "기계·장비", "marketCap": 5.0},
    {"symbol": "064350", "sourceSymbol": "064350.KS", "name": "현대로템", "sector": "기계·장비", "marketCap": 4.2},
    {"symbol": "079550", "sourceSymbol": "079550.KS", "name": "LIG넥스원", "sector": "운송장비·부품", "marketCap": 3.8},
    {"symbol": "006800", "sourceSymbol": "006800.KS", "name": "미래에셋증권", "sector": "증권", "marketCap": 4.2},
    {"symbol": "039490", "sourceSymbol": "039490.KS", "name": "키움증권", "sector": "증권", "marketCap": 3.1},
    {"symbol": "071050", "sourceSymbol": "071050.KS", "name": "한국금융지주", "sector": "증권", "marketCap": 3.6},
    {"symbol": "016360", "sourceSymbol": "016360.KS", "name": "삼성증권", "sector": "증권", "marketCap": 3.7},
    {"symbol": "005940", "sourceSymbol": "005940.KS", "name": "NH투자증권", "sector": "증권", "marketCap": 3.0},
    {"symbol": "180640", "sourceSymbol": "180640.KS", "name": "한진칼", "sector": "운송·창고", "marketCap": 4.0},
    {"symbol": "003490", "sourceSymbol": "003490.KS", "name": "대한항공", "sector": "운송·창고", "marketCap": 8.0},
    {"symbol": "086280", "sourceSymbol": "086280.KS", "name": "현대글로비스", "sector": "운송·창고", "marketCap": 6.0},
    {"symbol": "004020", "sourceSymbol": "004020.KS", "name": "현대제철", "sector": "철강·금속", "marketCap": 4.0},
    {"symbol": "010620", "sourceSymbol": "010620.KS", "name": "HD현대미포", "sector": "운송장비·부품", "marketCap": 3.5},
    {"symbol": "001040", "sourceSymbol": "001040.KS", "name": "CJ", "sector": "유통·상사", "marketCap": 3.0},
    {"symbol": "047050", "sourceSymbol": "047050.KS", "name": "포스코인터내셔널", "sector": "유통·상사", "marketCap": 4.8},
    {"symbol": "004990", "sourceSymbol": "004990.KS", "name": "롯데지주", "sector": "유통·상사", "marketCap": 2.7},
    {"symbol": "010120", "sourceSymbol": "010120.KS", "name": "LS ELECTRIC", "sector": "전기·전자", "marketCap": 5.0},
    {"symbol": "000720", "sourceSymbol": "000720.KS", "name": "현대건설", "sector": "건설", "marketCap": 4.5},
    {"symbol": "375500", "sourceSymbol": "375500.KS", "name": "DL이앤씨", "sector": "건설", "marketCap": 1.4},
    {"symbol": "006360", "sourceSymbol": "006360.KS", "name": "GS건설", "sector": "건설", "marketCap": 1.6},
    {"symbol": "047040", "sourceSymbol": "047040.KS", "name": "대우건설", "sector": "건설", "marketCap": 1.7},
]

KOSDAQ_MARKET_MAP = [
    {"symbol": "196170", "sourceSymbol": "196170.KQ", "name": "알테오젠", "sector": "제약·바이오", "marketCap": 16},
    {"symbol": "247540", "sourceSymbol": "247540.KQ", "name": "에코프로비엠", "sector": "2차전지", "marketCap": 15},
    {"symbol": "086520", "sourceSymbol": "086520.KQ", "name": "에코프로", "sector": "2차전지", "marketCap": 11},
    {"symbol": "028300", "sourceSymbol": "028300.KQ", "name": "HLB", "sector": "제약·바이오", "marketCap": 10},
    {"symbol": "277810", "sourceSymbol": "277810.KQ", "name": "레인보우로보틱스", "sector": "로봇", "marketCap": 8.8},
    {"symbol": "058470", "sourceSymbol": "058470.KQ", "name": "리노공업", "sector": "반도체", "marketCap": 4.5},
    {"symbol": "214150", "sourceSymbol": "214150.KQ", "name": "클래시스", "sector": "의료기기", "marketCap": 4.4},
    {"symbol": "403870", "sourceSymbol": "403870.KQ", "name": "HPSP", "sector": "반도체", "marketCap": 4.2},
    {"symbol": "068760", "sourceSymbol": "068760.KQ", "name": "셀트리온제약", "sector": "제약·바이오", "marketCap": 4.1},
    {"symbol": "039030", "sourceSymbol": "039030.KQ", "name": "이오테크닉스", "sector": "반도체", "marketCap": 3.8},
    {"symbol": "112040", "sourceSymbol": "112040.KQ", "name": "위메이드", "sector": "게임", "marketCap": 3.4},
    {"symbol": "041510", "sourceSymbol": "041510.KQ", "name": "에스엠", "sector": "미디어·엔터", "marketCap": 3.2},
    {"symbol": "293490", "sourceSymbol": "293490.KQ", "name": "카카오게임즈", "sector": "게임", "marketCap": 3.1},
    {"symbol": "357780", "sourceSymbol": "357780.KQ", "name": "솔브레인", "sector": "반도체", "marketCap": 3.0},
    {"symbol": "145020", "sourceSymbol": "145020.KQ", "name": "휴젤", "sector": "제약·바이오", "marketCap": 2.9},
    {"symbol": "263750", "sourceSymbol": "263750.KQ", "name": "펄어비스", "sector": "게임", "marketCap": 2.8},
    {"symbol": "240810", "sourceSymbol": "240810.KQ", "name": "원익IPS", "sector": "반도체", "marketCap": 2.7},
    {"symbol": "095340", "sourceSymbol": "095340.KQ", "name": "ISC", "sector": "반도체", "marketCap": 2.6},
    {"symbol": "278280", "sourceSymbol": "278280.KQ", "name": "천보", "sector": "2차전지", "marketCap": 2.4},
    {"symbol": "078600", "sourceSymbol": "078600.KQ", "name": "대주전자재료", "sector": "2차전지", "marketCap": 2.3},
    {"symbol": "091700", "sourceSymbol": "091700.KQ", "name": "파트론", "sector": "전자부품", "marketCap": 1.9},
    {"symbol": "067310", "sourceSymbol": "067310.KQ", "name": "하나마이크론", "sector": "반도체", "marketCap": 1.8},
    {"symbol": "215200", "sourceSymbol": "215200.KQ", "name": "메가스터디교육", "sector": "교육", "marketCap": 1.7},
    {"symbol": "122870", "sourceSymbol": "122870.KQ", "name": "와이지엔터테인먼트", "sector": "미디어·엔터", "marketCap": 1.7},
    {"symbol": "035900", "sourceSymbol": "035900.KQ", "name": "JYP Ent.", "sector": "미디어·엔터", "marketCap": 1.6},
    {"symbol": "237690", "sourceSymbol": "237690.KQ", "name": "에스티팜", "sector": "제약·바이오", "marketCap": 1.6},
    {"symbol": "048260", "sourceSymbol": "048260.KQ", "name": "오스템임플란트", "sector": "의료기기", "marketCap": 1.5},
    {"symbol": "096530", "sourceSymbol": "096530.KQ", "name": "씨젠", "sector": "의료기기", "marketCap": 1.5},
    {"symbol": "101490", "sourceSymbol": "101490.KQ", "name": "에스앤에스텍", "sector": "반도체", "marketCap": 1.4},
    {"symbol": "084370", "sourceSymbol": "084370.KQ", "name": "유진테크", "sector": "반도체", "marketCap": 1.4},
    {"symbol": "098460", "sourceSymbol": "098460.KQ", "name": "고영", "sector": "로봇", "marketCap": 1.3},
    {"symbol": "064760", "sourceSymbol": "064760.KQ", "name": "티씨케이", "sector": "반도체", "marketCap": 1.3},
    {"symbol": "121600", "sourceSymbol": "121600.KQ", "name": "나노신소재", "sector": "2차전지", "marketCap": 1.2},
    {"symbol": "036930", "sourceSymbol": "036930.KQ", "name": "주성엔지니어링", "sector": "반도체", "marketCap": 1.2},
    {"symbol": "086900", "sourceSymbol": "086900.KQ", "name": "메디톡스", "sector": "제약·바이오", "marketCap": 1.2},
    {"symbol": "035760", "sourceSymbol": "035760.KQ", "name": "CJ ENM", "sector": "미디어·엔터", "marketCap": 1.1},
    {"symbol": "140860", "sourceSymbol": "140860.KQ", "name": "파크시스템스", "sector": "반도체", "marketCap": 1.1},
    {"symbol": "086450", "sourceSymbol": "086450.KQ", "name": "동국제약", "sector": "제약·바이오", "marketCap": 1.0},
    {"symbol": "214370", "sourceSymbol": "214370.KQ", "name": "케어젠", "sector": "제약·바이오", "marketCap": 1.0},
    {"symbol": "058610", "sourceSymbol": "058610.KQ", "name": "에스피지", "sector": "로봇", "marketCap": 0.9},
    {"symbol": "137400", "sourceSymbol": "137400.KQ", "name": "피엔티", "sector": "2차전지", "marketCap": 0.9},
    {"symbol": "222800", "sourceSymbol": "222800.KQ", "name": "심텍", "sector": "전자부품", "marketCap": 0.9},
    {"symbol": "131970", "sourceSymbol": "131970.KQ", "name": "두산테스나", "sector": "반도체", "marketCap": 0.8},
    {"symbol": "272290", "sourceSymbol": "272290.KQ", "name": "이녹스첨단소재", "sector": "전자부품", "marketCap": 0.8},
    {"symbol": "095660", "sourceSymbol": "095660.KQ", "name": "네오위즈", "sector": "게임", "marketCap": 0.8},
    {"symbol": "060250", "sourceSymbol": "060250.KQ", "name": "NHN KCP", "sector": "소프트웨어", "marketCap": 0.8},
    {"symbol": "178920", "sourceSymbol": "178920.KQ", "name": "PI첨단소재", "sector": "전자부품", "marketCap": 0.7},
    {"symbol": "025900", "sourceSymbol": "025900.KQ", "name": "동화기업", "sector": "2차전지", "marketCap": 0.7},
    {"symbol": "319660", "sourceSymbol": "319660.KQ", "name": "피에스케이", "sector": "반도체", "marketCap": 0.7},
    {"symbol": "074600", "sourceSymbol": "074600.KQ", "name": "원익QnC", "sector": "반도체", "marketCap": 0.7},
]

SP500_MARKET_MAP = [
    {"symbol": "NVDA", "sourceSymbol": "NVDA", "name": "NVIDIA", "sector": "반도체", "marketCap": 3500},
    {"symbol": "MSFT", "sourceSymbol": "MSFT", "name": "Microsoft", "sector": "소프트웨어", "marketCap": 3200},
    {"symbol": "AAPL", "sourceSymbol": "AAPL", "name": "Apple", "sector": "하드웨어", "marketCap": 3100},
    {"symbol": "AMZN", "sourceSymbol": "AMZN", "name": "Amazon", "sector": "소비재·플랫폼", "marketCap": 2100},
    {"symbol": "GOOGL", "sourceSymbol": "GOOGL", "name": "Alphabet A", "sector": "인터넷", "marketCap": 2000},
    {"symbol": "META", "sourceSymbol": "META", "name": "Meta Platforms", "sector": "인터넷", "marketCap": 1500},
    {"symbol": "AVGO", "sourceSymbol": "AVGO", "name": "Broadcom", "sector": "반도체", "marketCap": 1400},
    {"symbol": "TSLA", "sourceSymbol": "TSLA", "name": "Tesla", "sector": "자동차", "marketCap": 1000},
    {"symbol": "BRK-B", "sourceSymbol": "BRK-B", "name": "Berkshire Hathaway", "sector": "금융", "marketCap": 950},
    {"symbol": "LLY", "sourceSymbol": "LLY", "name": "Eli Lilly", "sector": "헬스케어", "marketCap": 850},
    {"symbol": "JPM", "sourceSymbol": "JPM", "name": "JPMorgan", "sector": "금융", "marketCap": 650},
    {"symbol": "V", "sourceSymbol": "V", "name": "Visa", "sector": "결제", "marketCap": 600},
    {"symbol": "UNH", "sourceSymbol": "UNH", "name": "UnitedHealth", "sector": "헬스케어", "marketCap": 520},
    {"symbol": "XOM", "sourceSymbol": "XOM", "name": "Exxon Mobil", "sector": "에너지", "marketCap": 500},
    {"symbol": "MA", "sourceSymbol": "MA", "name": "Mastercard", "sector": "결제", "marketCap": 480},
    {"symbol": "COST", "sourceSymbol": "COST", "name": "Costco", "sector": "소매", "marketCap": 430},
    {"symbol": "NFLX", "sourceSymbol": "NFLX", "name": "Netflix", "sector": "미디어", "marketCap": 420},
    {"symbol": "WMT", "sourceSymbol": "WMT", "name": "Walmart", "sector": "소매", "marketCap": 700},
    {"symbol": "PG", "sourceSymbol": "PG", "name": "Procter & Gamble", "sector": "필수소비재", "marketCap": 390},
    {"symbol": "JNJ", "sourceSymbol": "JNJ", "name": "Johnson & Johnson", "sector": "헬스케어", "marketCap": 380},
    {"symbol": "HD", "sourceSymbol": "HD", "name": "Home Depot", "sector": "소매", "marketCap": 370},
    {"symbol": "ORCL", "sourceSymbol": "ORCL", "name": "Oracle", "sector": "소프트웨어", "marketCap": 360},
    {"symbol": "ABBV", "sourceSymbol": "ABBV", "name": "AbbVie", "sector": "헬스케어", "marketCap": 350},
    {"symbol": "BAC", "sourceSymbol": "BAC", "name": "Bank of America", "sector": "금융", "marketCap": 330},
    {"symbol": "KO", "sourceSymbol": "KO", "name": "Coca-Cola", "sector": "필수소비재", "marketCap": 300},
    {"symbol": "CRM", "sourceSymbol": "CRM", "name": "Salesforce", "sector": "소프트웨어", "marketCap": 290},
    {"symbol": "PLTR", "sourceSymbol": "PLTR", "name": "Palantir", "sector": "소프트웨어", "marketCap": 280},
    {"symbol": "AMD", "sourceSymbol": "AMD", "name": "AMD", "sector": "반도체", "marketCap": 270},
    {"symbol": "CSCO", "sourceSymbol": "CSCO", "name": "Cisco", "sector": "네트워크", "marketCap": 260},
    {"symbol": "CVX", "sourceSymbol": "CVX", "name": "Chevron", "sector": "에너지", "marketCap": 255},
    {"symbol": "IBM", "sourceSymbol": "IBM", "name": "IBM", "sector": "소프트웨어", "marketCap": 250},
    {"symbol": "GE", "sourceSymbol": "GE", "name": "GE Aerospace", "sector": "산업재", "marketCap": 245},
    {"symbol": "WFC", "sourceSymbol": "WFC", "name": "Wells Fargo", "sector": "금융", "marketCap": 240},
    {"symbol": "PM", "sourceSymbol": "PM", "name": "Philip Morris", "sector": "필수소비재", "marketCap": 235},
    {"symbol": "ABT", "sourceSymbol": "ABT", "name": "Abbott", "sector": "헬스케어", "marketCap": 230},
    {"symbol": "MCD", "sourceSymbol": "MCD", "name": "McDonald's", "sector": "외식", "marketCap": 220},
    {"symbol": "INTU", "sourceSymbol": "INTU", "name": "Intuit", "sector": "소프트웨어", "marketCap": 215},
    {"symbol": "DIS", "sourceSymbol": "DIS", "name": "Disney", "sector": "미디어", "marketCap": 210},
    {"symbol": "NOW", "sourceSymbol": "NOW", "name": "ServiceNow", "sector": "소프트웨어", "marketCap": 205},
    {"symbol": "AXP", "sourceSymbol": "AXP", "name": "American Express", "sector": "금융", "marketCap": 200},
    {"symbol": "TMO", "sourceSymbol": "TMO", "name": "Thermo Fisher", "sector": "헬스케어", "marketCap": 195},
    {"symbol": "QCOM", "sourceSymbol": "QCOM", "name": "Qualcomm", "sector": "반도체", "marketCap": 190},
    {"symbol": "TXN", "sourceSymbol": "TXN", "name": "Texas Instruments", "sector": "반도체", "marketCap": 185},
    {"symbol": "AMAT", "sourceSymbol": "AMAT", "name": "Applied Materials", "sector": "반도체", "marketCap": 180},
    {"symbol": "CAT", "sourceSymbol": "CAT", "name": "Caterpillar", "sector": "산업재", "marketCap": 175},
    {"symbol": "GS", "sourceSymbol": "GS", "name": "Goldman Sachs", "sector": "금융", "marketCap": 170},
    {"symbol": "NEE", "sourceSymbol": "NEE", "name": "NextEra Energy", "sector": "유틸리티", "marketCap": 165},
    {"symbol": "UBER", "sourceSymbol": "UBER", "name": "Uber", "sector": "플랫폼", "marketCap": 160},
    {"symbol": "RTX", "sourceSymbol": "RTX", "name": "RTX", "sector": "산업재", "marketCap": 155},
    {"symbol": "SPGI", "sourceSymbol": "SPGI", "name": "S&P Global", "sector": "금융정보", "marketCap": 150},
]

def get_kr_sector_markets() -> list[dict[str, Any]]:
    kospi200 = krx_index_market("1028", "KOSPI200", "KS", KOSPI_MARKET_MAP)
    kospi200["id"] = "kospi200"
    kosdaq150 = krx_index_market("2203", "KOSDAQ150", "KQ", KOSDAQ_MARKET_MAP)
    kosdaq150["id"] = "kosdaq150"
    return [kospi200, kosdaq150]


def get_us_sector_markets() -> list[dict[str, Any]]:
    return [sp500_market(), nasdaq100_market()]


def get_sector_markets() -> list[dict[str, Any]]:
    return get_kr_sector_markets() + get_us_sector_markets()


def load_existing_data() -> dict[str, Any]:
    if not OUTPUT_PATH.exists():
        return {}
    try:
        return json.loads(OUTPUT_PATH.read_text(encoding="utf-8"))
    except Exception:
        return {}


def merge_sector_markets(existing: list[dict[str, Any]], updated: list[dict[str, Any]]) -> list[dict[str, Any]]:
    order = ["kospi200", "kosdaq150", "sp500", "nasdaq100"]
    by_id = {market.get("id"): market for market in existing if market.get("id")}
    by_id.update({market.get("id"): market for market in updated if market.get("id")})
    merged = [by_id[market_id] for market_id in order if market_id in by_id]
    extras = [market for market_id, market in by_id.items() if market_id not in order]
    return merged + extras


def sector_rank_maps(existing_data: dict[str, Any]) -> dict[str, dict[str, int]]:
    rank_maps: dict[str, dict[str, int]] = {}
    for market in existing_data.get("sectorMarkets", []):
        market_id = market.get("id")
        if not market_id:
            continue
        ranked = sorted(
            [item for item in market.get("items", []) if item.get("marketCap", 0) > 0],
            key=lambda item: float(item.get("marketCap", 0)),
            reverse=True,
        )
        rank_maps[market_id] = {item["symbol"]: index + 1 for index, item in enumerate(ranked) if item.get("symbol")}
    return rank_maps

MARKET_MAP_PERIODS = {"1d": 1, "1w": 5, "1m": 21, "3m": 63, "6m": 126, "1y": 252}

SPDR_SECTOR_ETFS = [
    {"sector": "Communication Services (XLC)", "symbol": "XLC", "name": "Communication Services Select Sector SPDR"},
    {"sector": "Consumer Discretionary (XLY)", "symbol": "XLY", "name": "Consumer Discretionary Select Sector SPDR"},
    {"sector": "Consumer Staples (XLP)", "symbol": "XLP", "name": "Consumer Staples Select Sector SPDR"},
    {"sector": "Energy (XLE)", "symbol": "XLE", "name": "Energy Select Sector SPDR"},
    {"sector": "Financials (XLF)", "symbol": "XLF", "name": "Financial Select Sector SPDR"},
    {"sector": "Health Care (XLV)", "symbol": "XLV", "name": "Health Care Select Sector SPDR"},
    {"sector": "Industrials (XLI)", "symbol": "XLI", "name": "Industrial Select Sector SPDR"},
    {"sector": "Materials (XLB)", "symbol": "XLB", "name": "Materials Select Sector SPDR"},
    {"sector": "Real Estate (XLRE)", "symbol": "XLRE", "name": "Real Estate Select Sector SPDR"},
    {"sector": "Technology (XLK)", "symbol": "XLK", "name": "Technology Select Sector SPDR"},
    {"sector": "Utilities (XLU)", "symbol": "XLU", "name": "Utilities Select Sector SPDR"},
]


def load_finance_datareader() -> Any | None:
    try:
        import FinanceDataReader as fdr

        return fdr
    except Exception:
        return None


def normalize_krx_symbol(symbol: Any, market_suffix: str) -> str:
    code = str(symbol).strip().zfill(6)
    return f"{code}.{market_suffix}"


def read_html_tables(url: str) -> list[Any]:
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    with urllib.request.urlopen(req, timeout=30) as response:
        return pd.read_html(response.read())


def korean_sector(sector: Any) -> str:
    mapping = {
        "Communication Services": "커뮤니케이션",
        "Consumer Discretionary": "경기소비재",
        "Consumer Staples": "필수소비재",
        "Energy": "에너지",
        "Financials": "금융",
        "Health Care": "헬스케어",
        "Healthcare": "헬스케어",
        "Industrials": "산업재",
        "Information Technology": "정보기술",
        "Technology": "정보기술",
        "Materials": "소재",
        "Real Estate": "부동산",
        "Telecommunications": "통신",
        "Utilities": "유틸리티",
    }
    return mapping.get(str(sector).strip(), str(sector).strip() or "기타")


def spdr_sector(raw_sector: Any) -> str:
    text = str(raw_sector).strip()
    mapping = {
        "Communication Services": "Communication Services (XLC)",
        "Telecommunications": "Communication Services (XLC)",
        "Internet": "Communication Services (XLC)",
        "인터넷": "Communication Services (XLC)",
        "커뮤니케이션": "Communication Services (XLC)",
        "Consumer Discretionary": "Consumer Discretionary (XLY)",
        "Consumer Cyclical": "Consumer Discretionary (XLY)",
        "Consumer Services": "Consumer Discretionary (XLY)",
        "소비재·플랫폼": "Consumer Discretionary (XLY)",
        "자동차": "Consumer Discretionary (XLY)",
        "Consumer Staples": "Consumer Staples (XLP)",
        "Consumer Defensive": "Consumer Staples (XLP)",
        "Energy": "Energy (XLE)",
        "Financials": "Financials (XLF)",
        "Financial Services": "Financials (XLF)",
        "Health Care": "Health Care (XLV)",
        "Healthcare": "Health Care (XLV)",
        "Industrials": "Industrials (XLI)",
        "Industrial Goods": "Industrials (XLI)",
        "Information Technology": "Technology (XLK)",
        "Technology": "Technology (XLK)",
        "Technology Hardware & Equipment": "Technology (XLK)",
        "Software & Computer Services": "Technology (XLK)",
        "Semiconductors": "Technology (XLK)",
        "반도체": "Technology (XLK)",
        "소프트웨어": "Technology (XLK)",
        "하드웨어": "Technology (XLK)",
        "Materials": "Materials (XLB)",
        "Basic Materials": "Materials (XLB)",
        "Real Estate": "Real Estate (XLRE)",
        "Utilities": "Utilities (XLU)",
    }
    return mapping.get(text, text or "Other")


def concise_industry(value: Any, fallback: str = "기타") -> str:
    text = str(value).strip()
    if not text or text.lower() == "nan":
        return fallback
    return text.split(";")[0].replace(" 제조업", "").replace(" 및 ", "·")


def row_value(row: Any, candidates: list[str], default: Any = "") -> Any:
    for key in candidates:
        if key in row and pd.notna(row[key]):
            return row[key]
    return default


def market_cap_value(row: Any, fallback_rank: int) -> float:
    raw = row_value(row, ["MarketCap", "Marcap", "시가총액", "marketCap"], 0)
    try:
        value = float(str(raw).replace(",", ""))
        if value > 0:
            return value
    except Exception:
        pass
    return float(max(1, 1000 - fallback_rank))


def yfinance_market_cap(symbol: str) -> tuple[str, float | None]:
    try:
        import yfinance as yf

        info = yf.Ticker(symbol).info
        market_cap = info.get("marketCap")
        if market_cap:
            return symbol, round(float(market_cap) / 1_000_000_000, 3)
    except Exception:
        pass
    return symbol, None


def enrich_us_market_caps(items: list[dict[str, Any]]) -> list[dict[str, Any]]:
    symbols = [item["symbol"] for item in items]
    market_caps: dict[str, float] = {}
    with ThreadPoolExecutor(max_workers=12) as executor:
        futures = {executor.submit(yfinance_market_cap, symbol): symbol for symbol in symbols}
        for future in as_completed(futures):
            try:
                symbol, market_cap = future.result()
                if market_cap and market_cap > 0:
                    market_caps[symbol] = market_cap
            except Exception:
                continue
    for item in items:
        if item["symbol"] in market_caps:
            item["marketCap"] = market_caps[item["symbol"]]
    return items


def spdr_fallback_items(items: list[dict[str, Any]]) -> list[dict[str, Any]]:
    normalized = []
    for item in items:
        raw_sector = item.get("rawSector") or item.get("sector") or "Other"
        normalized.append({**item, "rawSector": raw_sector, "sector": spdr_sector(raw_sector)})
    return normalized


def krx_index_market(index_code: str, label: str, suffix: str, fallback_items: list[dict[str, Any]]) -> dict[str, Any]:
    market_id = label.lower().replace("&", "").replace(" ", "")
    fdr = load_finance_datareader()
    if not fdr:
        return {"id": market_id, "label": label, "items": fallback_items}
    if index_code == "1028":
        try:
            tables = read_html_tables("https://en.wikipedia.org/wiki/KOSPI_200")
            df = next(table for table in tables if table.shape[0] >= 190 and {"Company", "Symbol"}.issubset(table.columns))
            listing = fdr.StockListing("KOSPI")
            listing_by_code = {str(row["Code"]).zfill(6): row for _, row in listing.iterrows()}
            curated = {item["symbol"]: item for item in fallback_items}
            items = []
            for rank, (_, row) in enumerate(df.head(200).iterrows(), start=1):
                symbol = str(row["Symbol"]).strip().zfill(6)
                listed = listing_by_code.get(symbol)
                curated_item = curated.get(symbol, {})
                name = str(row_value(listed, ["Name"], curated_item.get("name", row["Company"])) if listed is not None else curated_item.get("name", row["Company"])).strip()
                market_cap = market_cap_value(listed, rank) if listed is not None else curated_item.get("marketCap", float(max(1, 1000 - rank)))
                items.append(
                    {
                        "symbol": symbol,
                        "sourceSymbol": normalize_krx_symbol(symbol, suffix),
                        "name": name,
                        "sector": korean_sector(row_value(row, ["GICS Sector"], curated_item.get("sector", "기타"))),
                        "marketCap": market_cap,
                    }
                )
            return {"id": market_id, "label": label, "items": items or fallback_items}
        except Exception:
            return {"id": market_id, "label": label, "items": fallback_items}
    if index_code == "2203":
        try:
            df = fdr.StockListing("KOSDAQ").sort_values("Marcap", ascending=False).head(150)
            desc = fdr.StockListing("KRX-DESC")
            desc_by_code = {str(row["Code"]).zfill(6): row for _, row in desc.iterrows()}
            items = []
            for rank, (_, row) in enumerate(df.iterrows(), start=1):
                symbol = str(row_value(row, ["Code"], "")).strip().zfill(6)
                if not symbol:
                    continue
                listed_desc = desc_by_code.get(symbol)
                sector = concise_industry(
                    row_value(listed_desc, ["Industry", "Sector"], "") if listed_desc is not None else "",
                    str(row_value(row, ["Market"], "KOSDAQ")).strip() or "KOSDAQ",
                )
                items.append(
                    {
                        "symbol": symbol,
                        "sourceSymbol": normalize_krx_symbol(symbol, suffix),
                        "name": str(row_value(row, ["Name"], symbol)).strip(),
                        "sector": sector,
                        "marketCap": market_cap_value(row, rank),
                    }
                )
            return {"id": market_id, "label": label, "items": items or fallback_items}
        except Exception:
            return {"id": market_id, "label": label, "items": fallback_items}
    try:
        df = fdr.SnapDataReader(f"KRX/INDEX/STOCK/{index_code}")
        if df is None or df.empty:
            raise ValueError("empty KRX index data")
        items = []
        for rank, (_, row) in enumerate(df.iterrows(), start=1):
            symbol = str(row_value(row, ["Symbol", "Code", "종목코드"], "")).strip().zfill(6)
            if not symbol:
                continue
            name = str(row_value(row, ["Name", "종목명", "ItemName"], symbol)).strip()
            sector = str(row_value(row, ["Sector", "업종", "Industry", "업종명"], "기타")).strip() or "기타"
            items.append(
                {
                    "symbol": symbol,
                    "sourceSymbol": normalize_krx_symbol(symbol, suffix),
                    "name": name,
                    "sector": sector,
                    "marketCap": market_cap_value(row, rank),
                }
            )
        return {"id": market_id, "label": label, "items": items or fallback_items}
    except Exception:
        return {"id": market_id, "label": label, "items": fallback_items}


def sp500_market() -> dict[str, Any]:
    curated = {item["symbol"].replace(".", "-"): item for item in SP500_MARKET_MAP}
    try:
        df = read_html_tables("https://en.wikipedia.org/wiki/List_of_S%26P_500_companies")[0]
        items = []
        for rank, (_, row) in enumerate(df.head(500).iterrows(), start=1):
            symbol = str(row["Symbol"]).replace(".", "-").strip()
            curated_item = curated.get(symbol)
            market_cap = curated_item["marketCap"] if curated_item else 1.0
            raw_sector = str(row.get("GICS Sector", curated_item.get("sector", "Other") if curated_item else "Other")).strip()
            sector = spdr_sector(raw_sector)
            name = curated_item["name"] if curated_item else str(row.get("Security", symbol))
            items.append(
                {
                    "symbol": symbol,
                    "sourceSymbol": symbol,
                    "name": name,
                    "sector": sector,
                    "rawSector": raw_sector,
                    "marketCap": market_cap,
                }
            )
        return {"id": "sp500", "label": "S&P500", "items": enrich_us_market_caps(items) or spdr_fallback_items(SP500_MARKET_MAP)}
    except Exception:
        return {"id": "sp500", "label": "S&P500", "items": spdr_fallback_items(SP500_MARKET_MAP)}


def nasdaq100_market() -> dict[str, Any]:
    curated = {item["symbol"].replace(".", "-"): item for item in SP500_MARKET_MAP}
    try:
        tables = read_html_tables("https://en.wikipedia.org/wiki/Nasdaq-100")
        df = next(table for table in tables if table.shape[0] >= 90 and {"Ticker", "Company"}.issubset(table.columns))
        items = []
        for rank, (_, row) in enumerate(df.iterrows(), start=1):
            symbol = str(row["Ticker"]).replace(".", "-").strip()
            curated_item = curated.get(symbol)
            market_cap = curated_item["marketCap"] if curated_item else 1.0
            raw_sector = str(row_value(row, ["GICS Sector", "ICB Industry[14]", "ICB Industry"], curated_item.get("sector", "Other") if curated_item else "Other")).strip()
            sector = spdr_sector(raw_sector)
            name = curated_item["name"] if curated_item else str(row.get("Company", symbol)).replace(" Inc.", "").replace(", Inc.", "").strip()
            items.append(
                {
                    "symbol": symbol,
                    "sourceSymbol": symbol,
                    "name": name,
                    "sector": sector,
                    "rawSector": raw_sector,
                    "marketCap": market_cap,
                }
            )
        return {"id": "nasdaq100", "label": "Nasdaq 100", "items": enrich_us_market_caps(items)}
    except Exception:
        fallback = spdr_fallback_items([item for item in SP500_MARKET_MAP if item["symbol"] in {"MSFT", "AAPL", "NVDA", "AMZN", "META", "AVGO", "GOOGL", "GOOG", "TSLA", "COST"}])
        return {"id": "nasdaq100", "label": "Nasdaq 100", "items": fallback}


def load_fincept_module() -> Any | None:
    if not FINCEPT_YFINANCE.exists():
        return None
    try:
        spec = importlib.util.spec_from_file_location("fincept_yfinance_data", FINCEPT_YFINANCE)
        if spec is None or spec.loader is None:
            return None
        module = importlib.util.module_from_spec(spec)
        spec.loader.exec_module(module)
        return module
    except Exception:
        return None


def yahoo_result(symbol: str, range_: str = "5d", interval: str = "1d") -> dict[str, Any] | None:
    encoded = urllib.parse.quote(symbol, safe="")
    if range_ == "max":
        url = (
            f"https://query1.finance.yahoo.com/v8/finance/chart/{encoded}"
            f"?period1=0&period2={int(time.time())}&interval={interval}"
        )
    else:
        url = f"https://query1.finance.yahoo.com/v8/finance/chart/{encoded}?range={range_}&interval={interval}"
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    context = ssl.create_default_context()
    with urllib.request.urlopen(req, timeout=20, context=context) as response:
        payload = json.loads(response.read().decode("utf-8"))
    result = payload.get("chart", {}).get("result", [None])[0]
    if not result:
        return None
    return result


def yahoo_series(symbol: str, range_: str = "5d", interval: str = "1d") -> list[dict[str, float]]:
    result = yahoo_result(symbol, range_, interval)
    if not result:
        return []
    quote = result.get("indicators", {}).get("quote", [{}])[0]
    timestamps = result.get("timestamp", [])
    opens = quote.get("open", [])
    highs = quote.get("high", [])
    lows = quote.get("low", [])
    closes = quote.get("close", [])
    volumes = quote.get("volume", [])
    rows = []
    for index, (ts, open_, high, low, close) in enumerate(zip(timestamps, opens, highs, lows, closes)):
        values = [open_, high, low, close]
        if any(value is None for value in values):
            continue
        if any(math.isnan(float(value)) for value in values):
            continue
        timestamp_ms = int(ts) * 1000
        volume = volumes[index] if timestamp_ms >= VOLUME_START_MS and index < len(volumes) and volumes[index] is not None else 0
        rows.append(
            {
                "t": timestamp_ms,
                "o": round(float(open_), 4),
                "h": round(float(high), 4),
                "l": round(float(low), 4),
                "c": round(float(close), 4),
                "v": int(float(volume)),
            }
        )
    return rows


def yahoo_chart(symbol: str, range_: str = "5d", interval: str = "1d") -> dict[str, Any] | None:
    rows = yahoo_series(symbol, range_, interval)
    if not rows:
        return None
    price = float(rows[-1]["c"])
    prev = float(rows[-2]["c"]) if len(rows) > 1 else price
    change_percent = ((price - prev) / prev * 100) if prev else 0
    return {
        "symbol": symbol,
        "price": round(price, 4),
        "change_percent": round(change_percent, 2),
        "timestamp": int(rows[-1]["t"] / 1000),
    }


def investing_cds_quote(symbol: str) -> dict[str, Any] | None:
    if symbol != "INVESTING:KRGV5YUSAC=R":
        return None
    url = "https://www.investing.com/rates-bonds/south-korea-cds-5-year-usd"
    req = urllib.request.Request(
        url,
        headers={
            "User-Agent": "Mozilla/5.0",
            "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        },
    )
    context = ssl.create_default_context()
    with urllib.request.urlopen(req, timeout=20, context=context) as response:
        html = response.read().decode("utf-8", errors="ignore")
    price_match = re.search(r'data-test="instrument-price-last"[^>]*>\s*([0-9.,]+)', html)
    change_match = re.search(r'data-test="instrument-price-change-percent"[^>]*>\s*\(?([+\-]?[0-9.,]+)%\)?', html)
    if not price_match:
        price_match = re.search(r"South Korea CDS 5 Year USD.*?([0-9]{1,3}\.[0-9]{1,2})", html, re.S)
    if not price_match:
        return None
    price = float(price_match.group(1).replace(",", ""))
    change_percent = float(change_match.group(1).replace(",", "")) if change_match else 0
    return {"symbol": symbol, "price": round(price, 4), "change_percent": round(change_percent, 2)}


def get_quotes(symbols: list[str]) -> dict[str, dict[str, Any]]:
    yahoo_symbols = [symbol for symbol in symbols if not symbol.startswith("INVESTING:")]
    manual_symbols = [symbol for symbol in symbols if symbol.startswith("INVESTING:")]
    fincept = load_fincept_module()
    if fincept:
        try:
            quotes = fincept.get_batch_quotes(yahoo_symbols)
            if isinstance(quotes, list) and quotes:
                results = {item["symbol"]: item for item in quotes if "symbol" in item}
                for symbol in manual_symbols:
                    quote = investing_cds_quote(symbol)
                    if quote:
                        results[symbol] = quote
                return results
        except Exception:
            pass

    results: dict[str, dict[str, Any]] = {}
    for symbol in symbols:
        try:
            quote = investing_cds_quote(symbol) if symbol.startswith("INVESTING:") else yahoo_chart(symbol)
            if quote:
                results[symbol] = quote
        except Exception:
            continue
    return results


def get_history(symbol: str) -> dict[str, list[dict[str, float]]]:
    history = {"5m": [], "60m": [], "1d": []}
    if symbol.startswith("INVESTING:"):
        return history
    requests = [
        ("5m", "60d", "5m"),
        ("60m", "730d", "60m"),
        ("1d", "max", "1d"),
    ]
    for key, range_, interval in requests:
        try:
            history[key] = yahoo_series(symbol, range_, interval)
        except Exception:
            history[key] = []
    return history


def get_histories(symbols: list[str]) -> dict[str, dict[str, list[dict[str, float]]]]:
    histories: dict[str, dict[str, list[dict[str, float]]]] = {}
    with ThreadPoolExecutor(max_workers=8) as executor:
        futures = {executor.submit(get_history, symbol): symbol for symbol in symbols}
        for future in as_completed(futures):
            symbol = futures[future]
            try:
                histories[symbol] = future.result()
            except Exception:
                histories[symbol] = {"5m": [], "60m": [], "1d": []}
    return histories


def trim_history_for_asset(symbol: str, history: dict[str, list[dict[str, float]]]) -> dict[str, list[dict[str, float]]]:
    if symbol not in TRIM_HISTORY_FROM_2000:
        return history
    return {
        interval: [row for row in rows if int(row.get("t", 0) or 0) >= HISTORY_START_2000_MS]
        for interval, rows in history.items()
    }


def get_market_map_history(symbol: str) -> list[dict[str, float]]:
    try:
        return yahoo_series(symbol, "2y", "1d")
    except Exception:
        return []


def get_market_map_histories(symbols: list[str]) -> dict[str, list[dict[str, float]]]:
    histories: dict[str, list[dict[str, float]]] = {}
    with ThreadPoolExecutor(max_workers=8) as executor:
        futures = {executor.submit(get_market_map_history, symbol): symbol for symbol in symbols}
        for future in as_completed(futures):
            symbol = futures[future]
            try:
                histories[symbol] = future.result()
            except Exception:
                histories[symbol] = []
    return histories


def period_change(daily: list[dict[str, float]], lookback: int) -> float:
    if len(daily) <= lookback:
        return 0
    latest = float(daily[-1]["c"])
    previous = float(daily[-1 - lookback]["c"])
    if not previous:
        return 0
    return round(((latest - previous) / previous) * 100, 2)


def ytd_change(daily: list[dict[str, float]]) -> float:
    if len(daily) < 2:
        return 0
    latest = float(daily[-1]["c"])
    latest_year = datetime.fromtimestamp(daily[-1]["t"] / 1000).year
    baseline = None
    for row in daily:
        row_year = datetime.fromtimestamp(row["t"] / 1000).year
        if row_year == latest_year:
            baseline = float(row["c"])
            break
    if not baseline:
        return 0
    return round(((latest - baseline) / baseline) * 100, 2)


def compact_sector_history(daily: list[dict[str, float]]) -> list[list[float]]:
    compacted = []
    for row in daily[-SECTOR_HISTORY_DAYS:]:
        close = float(row.get("c", 0) or 0)
        timestamp = int(row.get("t", 0) or 0)
        if timestamp and close:
            compacted.append([timestamp, round(close, 4)])
    return compacted


def build_sector_etfs(
    quotes: dict[str, dict[str, Any]],
    histories: dict[str, list[dict[str, float]]],
) -> dict[str, dict[str, Any]]:
    etfs: dict[str, dict[str, Any]] = {}
    for source in SPDR_SECTOR_ETFS:
        symbol = source["symbol"]
        quote = quotes.get(symbol)
        daily = histories.get(symbol, [])
        price = float(quote.get("price", 0)) if quote else 0
        if not price and daily:
            price = float(daily[-1]["c"])
        changes = {period: period_change(daily, lookback) for period, lookback in MARKET_MAP_PERIODS.items()}
        if quote and quote.get("change_percent") is not None:
            changes["1d"] = round(float(quote.get("change_percent", 0)), 2)
        changes["ytd"] = ytd_change(daily)
        etfs[source["sector"]] = {
            "symbol": symbol,
            "name": source["name"],
            "price": round(price, 2),
            "changes": changes,
            "history": compact_sector_history(daily),
        }
    return etfs


def build_sector_markets(
    market_sources: list[dict[str, Any]],
    quotes: dict[str, dict[str, Any]],
    histories: dict[str, list[dict[str, float]]],
    previous_ranks: dict[str, dict[str, int]] | None = None,
) -> list[dict[str, Any]]:
    markets = []
    updated_at = datetime.now(timezone.utc).astimezone().strftime("%Y-%m-%d %H:%M") + " Local"
    previous_ranks = previous_ranks or {}
    for market_source in market_sources:
        items = []
        for source in market_source["items"]:
            daily = histories.get(source["sourceSymbol"], [])
            quote = quotes.get(source["sourceSymbol"])
            price = float(quote.get("price", 0)) if quote else 0
            if not price and daily:
                price = float(daily[-1]["c"])
            changes = {period: period_change(daily, lookback) for period, lookback in MARKET_MAP_PERIODS.items()}
            if quote and quote.get("change_percent") is not None:
                changes["1d"] = round(float(quote.get("change_percent", 0)), 2)
            changes["ytd"] = ytd_change(daily)
            item = {
                "symbol": source["symbol"],
                "name": source["name"],
                "sector": source["sector"],
                "rawSector": source.get("rawSector", source["sector"]),
                "marketCap": source["marketCap"],
                "price": round(price, 2),
                "changes": changes,
                "history": compact_sector_history(daily),
            }
            if not daily and not quote:
                item["stale"] = True
            items.append(item)
        current_ranks = {
            item["symbol"]: index + 1
            for index, item in enumerate(sorted(items, key=lambda item: float(item.get("marketCap", 0)), reverse=True))
        }
        market_previous_ranks = previous_ranks.get(market_source["id"], {})
        for item in items:
            current_rank = current_ranks.get(item["symbol"])
            previous_rank = market_previous_ranks.get(item["symbol"])
            item["marketCapRank"] = current_rank
            if previous_rank:
                item["previousMarketCapRank"] = previous_rank
                item["rankChange"] = previous_rank - current_rank
            else:
                item["rankChange"] = 0
        markets.append({"id": market_source["id"], "label": market_source["label"], "updatedAt": updated_at, "items": items})
    return markets


def apply_quotes(
    quotes: dict[str, dict[str, Any]],
    histories: dict[str, dict[str, list[dict[str, float]]]],
) -> list[dict[str, Any]]:
    assets = json.loads(json.dumps(ASSETS))
    for asset in assets:
        for item in asset["instruments"]:
            source = item["sourceSymbol"]
            quote = quotes.get(source)
            item["history"] = trim_history_for_asset(item["symbol"], histories.get(source, {"5m": [], "60m": [], "1d": []}))
            daily = item["history"].get("1d", [])
            if not quote:
                item["price"] = round(float(daily[-1]["c"]), 4) if daily else 0
                if len(daily) >= 2 and daily[-2]["c"]:
                    item["change"] = round(((daily[-1]["c"] - daily[-2]["c"]) / daily[-2]["c"]) * 100, 2)
                else:
                    item["change"] = 0
                item["stale"] = True
                continue
            item["price"] = round(float(quote.get("price", 0)), 4)
            item["change"] = float(quote.get("change_percent", 0))
            item["timestamp"] = quote.get("timestamp")
    return assets


def find_price(assets: list[dict[str, Any]], symbol: str, default: float = 0) -> float:
    for asset in assets:
        for item in asset["instruments"]:
            if item["symbol"] == symbol and item.get("price"):
                return float(item["price"])
    return default


def risk_mode(assets: list[dict[str, Any]]) -> str:
    vix = find_price(assets, "VIX", 18)
    spx_change = 0
    for asset in assets:
        for item in asset["instruments"]:
            if item["symbol"] == "SPX":
                spx_change = float(item.get("change", 0))
    if vix >= 25 or spx_change <= -1:
        return "Risk Off"
    if vix <= 16 and spx_change >= 0.5:
        return "Risk On"
    return "Neutral"


def main() -> int:
    market_only = "--market-only" in sys.argv
    update_kr_sector = "--sector-kr" in sys.argv
    update_us_sector = "--sector-us" in sys.argv
    selective_sector = update_kr_sector or update_us_sector
    existing_data = load_existing_data()
    previous_ranks = sector_rank_maps(existing_data)
    if market_only:
        sector_market_sources = []
    elif selective_sector:
        sector_market_sources = []
        if update_kr_sector:
            sector_market_sources.extend(get_kr_sector_markets())
        if update_us_sector:
            sector_market_sources.extend(get_us_sector_markets())
    else:
        sector_market_sources = get_sector_markets()
    symbols = [item["sourceSymbol"] for asset in ASSETS for item in asset["instruments"]]
    sector_symbols = [] if market_only else [item["sourceSymbol"] for market in sector_market_sources for item in market["items"]]
    sector_etf_symbols = [source["symbol"] for source in SPDR_SECTOR_ETFS] if (not market_only and (not selective_sector or update_us_sector)) else []
    quotes = get_quotes(symbols + sector_symbols + sector_etf_symbols)
    histories = get_histories(symbols)
    sector_histories = {} if market_only else get_market_map_histories(sector_symbols)
    sector_etf_histories = get_market_map_histories(sector_etf_symbols) if sector_etf_symbols else {}
    assets = apply_quotes(quotes, histories)
    sector_etfs = existing_data.get("sectorEtfs", {})
    if sector_etf_symbols:
        sector_etfs = build_sector_etfs(quotes, sector_etf_histories)
    if market_only:
        sector_markets = existing_data.get("sectorMarkets", [])
    elif selective_sector:
        updated_sector_markets = build_sector_markets(sector_market_sources, quotes, sector_histories, previous_ranks)
        sector_markets = merge_sector_markets(existing_data.get("sectorMarkets", []), updated_sector_markets)
    else:
        sector_markets = build_sector_markets(sector_market_sources, quotes, sector_histories, previous_ranks)
    data = {
        "updatedAt": datetime.now(timezone.utc).astimezone().strftime("%Y-%m-%d %H:%M") + " Local",
        "source": "FinceptTerminal yfinance_data.py with Yahoo chart fallback",
        "delay": "About 15 minutes for delayed exchange data",
        "status": {
            "riskMode": risk_mode(assets),
            "vix": find_price(assets, "VIX", 0),
            "kospi": find_price(assets, "KOSPI", 0),
            "nasdaq": find_price(assets, "NDX", 0),
            "us10y": find_price(assets, "US10Y", 0),
            "usdkrw": find_price(assets, "USDKRW", 0),
            "gold": find_price(assets, "XAU", 0),
        },
        "assets": assets,
        "sectorMarkets": sector_markets,
        "sectorEtfs": sector_etfs,
    }
    OUTPUT_PATH.write_text(json.dumps(data, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"Wrote {OUTPUT_PATH}")
    loaded_history = sum(1 for symbol in symbols if histories.get(symbol, {}).get("1d"))
    loaded_sector_history = sum(1 for symbol in sector_symbols if sector_histories.get(symbol))
    print(f"Loaded {len(quotes)} of {len(symbols) + len(sector_symbols) + len(sector_etf_symbols)} quotes")
    print(f"Loaded {loaded_history} of {len(symbols)} max daily histories")
    if market_only:
        print(f"Kept {len(sector_markets)} existing sector market datasets")
    elif selective_sector:
        print(f"Updated {len(sector_market_sources)} selected sector market datasets")
        print(f"Loaded {loaded_sector_history} of {len(sector_symbols)} selected sector market map histories")
    else:
        print(f"Loaded {loaded_sector_history} of {len(sector_symbols)} sector market map histories")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
