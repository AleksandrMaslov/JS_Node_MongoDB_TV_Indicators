import CoinModel from '../models/Coin.js'
import IntervalModel from '../models/Interval.js'
import KlineModel from '../models/Kline.js'
import RecommendModel from '../models/Recommends.js'
import IndicatorModel from '../models/Indicators.js'
import { GetDate } from '../utils/utils.js'

export async function ClearDB() {
  console.log('Cleaning DB...')
  await CoinModel.deleteMany()
  await IntervalModel.deleteMany()
  await KlineModel.deleteMany()
  await RecommendModel.deleteMany()
  await IndicatorModel.deleteMany()
}

export async function WriteData(data) {
  const date = GetDate(Date.now())
  try {
    for (const [symbol, intervals] of Object.entries(data)) {
      if (await IsCoinExisting(symbol)) {
        await Update(symbol, intervals, date)
      } else {
        await AddCoin(symbol, intervals)
        await Update(symbol, intervals, date)
      }
    }
  } catch (error) {
    console.log(error)
  }
}

async function IsCoinExisting(symbol) {
  try {
    const coins = await CoinModel.find({ symbol: symbol })
    if (coins.length > 0) {
      console.log(`Coin found...     ${symbol}`)
      return true
    }
  } catch (error) {
    console.log(error)
  }
  console.log(`Coin not found... ${symbol}`)
  return false
}

async function AddCoin(symbol, intervals) {
  try {
    console.log(`Creating coin...  ${symbol}`)
    const coinData = { symbol: symbol }

    for (const [interval, indicators] of Object.entries(intervals)) {
      const intervalInstance = await CreateInstance(IntervalModel, {
        symbol: symbol,
        name: interval,
      })

      coinData[interval] = intervalInstance
    }

    await CreateInstance(CoinModel, coinData)
  } catch (error) {
    console.log(`Coin creation Failed - ${symbol}`, error)
  }
}

async function Update(symbol, intervals, date) {
  try {
    console.log(`Updating...       ${symbol}`)

    for (const [interval, indicators] of Object.entries(intervals)) {
      await IntervalModel.updateOne(
        {
          symbol: symbol,
          name: interval,
        },
        {
          $addToSet: await UpdateData(symbol, interval, indicators, date),
        }
      )
    }
  } catch (error) {
    console.log(error)
  }
}

async function CreateInstance(model, modelData) {
  try {
    const modelInstance = new model(modelData)
    await modelInstance.save()
    return modelInstance
  } catch (error) {
    console.log(error)
  }
}

function KlineModelData(symbol, interval, indicators, date) {
  return {
    symbol: symbol,
    interval: interval,
    date: date,
    close: indicators['close'],
    open: indicators['open'],
    volume: indicators['volume'],
    change: indicators['change'],
    low: indicators['low'],
    high: indicators['high'],
  }
}

function RecommendModelData(symbol, interval, indicators, date) {
  return {
    symbol: symbol,
    interval: interval,
    date: date,
    recommendAll: indicators['Recommend.All'],
    recommendMA: indicators['Recommend.MA'],
    recommendOther: indicators['Recommend.Other'],
  }
}

function IndicatorModelData(symbol, interval, indicators, date) {
  return {
    symbol: symbol,
    interval: interval,
    date: date,
    RSI: indicators['RSI'],
    RSI1: indicators['RSI[1]'],
    StochK: indicators['Stoch.K'],
    StochD: indicators['Stoch.D'],
    StochK1: indicators['Stoch.K[1]'],
    StochD1: indicators['Stoch.D[1]'],
    CCI20: indicators['CCI20'],
    CCI201: indicators['CCI20[1]'],
    ADX: indicators['ADX'],
    ADXandDI: indicators['ADX+DI'],
    ADXnotDI: indicators['ADX-DI'],
    ADXandDI1: indicators['ADX+DI[1]'],
    ADXnotDI1: indicators['ADX-DI[1]'],
    AO: indicators['AO'],
    AO1: indicators['AO[1]'],
    Mom: indicators['Mom'],
    Mom1: indicators['Mom[1]'],
    MACDmacd: indicators['MACD.macd'],
    MACDsignal: indicators['MACD.signal'],
    RecStochRSI: indicators['Rec.Stoch.RSI'],
    StochRSIK: indicators['Stoch.RSI.K'],
    RecWR: indicators['Rec.WR'],
    WR: indicators['W.R'],
    RecBBPower: indicators['Rec.BBPower'],
    BBPower: indicators['BBPower'],
    RecUO: indicators['Rec.UO'],
    UO: indicators['UO'],
    EMA5: indicators['EMA5'],
    SMA5: indicators['SMA5'],
    EMA10: indicators['EMA10'],
    SMA10: indicators['SMA10'],
    EMA20: indicators['EMA20'],
    SMA20: indicators['SMA20'],
    EMA30: indicators['EMA30'],
    SMA30: indicators['SMA30'],
    EMA50: indicators['EMA50'],
    SMA50: indicators['SMA50'],
    EMA100: indicators['EMA100'],
    SMA100: indicators['SMA100'],
    EMA200: indicators['EMA200'],
    SMA200: indicators['SMA200'],
    RecIchimoku: indicators['Rec.Ichimoku'],
    IchimokuBLine: indicators['Ichimoku.BLine'],
    RecVWMA: indicators['Rec.VWMA'],
    VWMA: indicators['VWMA'],
    RecHullMA9: indicators['Rec.HullMA9'],
    HullMA9: indicators['HullMA9'],
    PivotMClassicS3: indicators['Pivot.M.Classic.S3'],
    PivotMClassicS2: indicators['Pivot.M.Classic.S2'],
    PivotMClassicS1: indicators['Pivot.M.Classic.S1'],
    PivotMClassicMiddle: indicators['Pivot.M.Classic.Middle'],
    PivotMClassicR1: indicators['Pivot.M.Classic.R1'],
    PivotMClassicR2: indicators['Pivot.M.Classic.R2'],
    PivotMClassicR3: indicators['Pivot.M.Classic.R3'],
    PivotMFibonacciS3: indicators['Pivot.M.Fibonacci.S3'],
    PivotMFibonacciS2: indicators['Pivot.M.Fibonacci.S2'],
    PivotMFibonacciS1: indicators['Pivot.M.Fibonacci.S1'],
    PivotMFibonacciMiddle: indicators['Pivot.M.Fibonacci.Middle'],
    PivotMFibonacciR1: indicators['Pivot.M.Fibonacci.R1'],
    PivotMFibonacciR2: indicators['Pivot.M.Fibonacci.R2'],
    PivotMFibonacciR3: indicators['Pivot.M.Fibonacci.R3'],
    PivotMCamarillaS3: indicators['Pivot.M.Camarilla.S3'],
    PivotMCamarillaS2: indicators['Pivot.M.Camarilla.S2'],
    PivotMCamarillaS1: indicators['Pivot.M.Camarilla.S1'],
    PivotMCamarillaMiddle: indicators['Pivot.M.Camarilla.Middle'],
    PivotMCamarillaR1: indicators['Pivot.M.Camarilla.R1'],
    PivotMCamarillaR2: indicators['Pivot.M.Camarilla.R2'],
    PivotMCamarillaR3: indicators['Pivot.M.Camarilla.R3'],
    PivotMWoodieS3: indicators['Pivot.M.Woodie.S3'],
    PivotMWoodieS2: indicators['Pivot.M.Woodie.S2'],
    PivotMWoodieS1: indicators['Pivot.M.Woodie.S1'],
    PivotMWoodieMiddle: indicators['Pivot.M.Woodie.Middle'],
    PivotMWoodieR1: indicators['Pivot.M.Woodie.R1'],
    PivotMWoodieR2: indicators['Pivot.M.Woodie.R2'],
    PivotMWoodieR3: indicators['Pivot.M.Woodie.R3'],
    PivotMDemarkS1: indicators['Pivot.M.Demark.S1'],
    PivotMDemarkMiddle: indicators['Pivot.M.Demark.Middle'],
    PivotMDemarkR1: indicators['Pivot.M.Demark.R1'],
    PSAR: indicators['P.SAR'],
    BBlower: indicators['BB.lower'],
    BBupper: indicators['BB.upper'],
    AO2: indicators['AO[2]'],
  }
}

async function UpdateData(symbol, interval, indicators, date) {
  const klineInstance = await CreateInstance(
    KlineModel,
    KlineModelData(symbol, interval, indicators, date)
  )

  const recommendInstance = await CreateInstance(
    RecommendModel,
    RecommendModelData(symbol, interval, indicators, date)
  )

  const indicatorInstance = await CreateInstance(
    IndicatorModel,
    IndicatorModelData(symbol, interval, indicators, date)
  )

  return {
    klines: klineInstance,
    recommends: recommendInstance,
    indicators: indicatorInstance,
  }
}
