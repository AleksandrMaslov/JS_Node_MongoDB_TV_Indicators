import { Tradingview } from './tradingview/tradingviewAPI.js'
import { CoinController, DBController } from './controllers/index.js'
import { TelegramBotInit } from './telegram/index.js'

// TelegramBotInit()

const tradingview = new Tradingview('KUCOIN', ['BTCUSDT'], ['1d'])

const data = await tradingview.getIndicators()
console.log(data)

// await DBController.InitSession()
// // await CoinController.ClearDB()
// await CoinController.WriteData(data)
// await DBController.CloseSession()
