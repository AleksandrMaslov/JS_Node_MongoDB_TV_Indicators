import CoinModel from '../models/Coin.js'
import IntervalModel from '../models/Interval.js'
import KlineModel from '../models/Kline.js'

export async function WriteData(data) {
  try {
    await ClearDB()

    for (const [symbol, intervals] of Object.entries(data)) {
      if (await IsCoinExisting(symbol)) await Update(symbol, intervals)
      else await Create(symbol, intervals)
    }
  } catch (error) {
    console.log(error)
  }
}

async function IsCoinExisting(symbol) {
  try {
    const coins = await CoinModel.find({ symbol: symbol })
    if (coins.length > 0) {
      console.log(`Coin "${symbol}" - Found`)
      return true
    }
  } catch (error) {
    console.log(error)
  }
  console.log(`Coin "${symbol}" - Not Found`)
  return false
}

async function Create(symbol, intervals) {
  try {
    console.log(`Creating Coin "${symbol}"...`)
    const coinData = { symbol: symbol }

    for (const [interval, indicators] of Object.entries(intervals)) {
      const klineInstance = await CreateInstance(KlineModel, {
        symbol: symbol,
        interval: interval,
        close: indicators['close'],
        open: indicators['open'],
        volume: indicators['volume'],
        change: indicators['change'],
        low: indicators['low'],
        high: indicators['high'],
      })

      const intervalInstance = await CreateInstance(IntervalModel, {
        symbol: symbol,
        name: interval,
        props: [klineInstance],
      })

      coinData[interval] = intervalInstance
    }

    await CreateInstance(CoinModel, coinData)
  } catch (error) {
    console.log(`Coin "${symbol}" creation - Failed`, error)
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

async function Update(symbol, intervals) {
  try {
    console.log('UPDATING')
    // for (const [interval, indicators] of Object.entries(intervals)) {
    //   console.log(symbol, interval, indicators)
    // }

    // await CoinModel.updateOne(
    //   {
    //     _id: postId,
    //   },
    //   {
    //     title: request.body.title,
    //     text: request.body.text,
    //     imageUrl: request.body.imageUrl,
    //     tags: request.body.tags,
    //     user: request.body.userId,
    //   }
    // )
  } catch (error) {
    console.log(error)
  }
}

async function ClearDB() {
  console.log('Deleting...')
  await CoinModel.deleteMany()
  await IntervalModel.deleteMany()
  await KlineModel.deleteMany()
}
