import { Tradingview } from './tradingview/tradingviewAPI.js'
import { CoinController, DBController } from './controllers/index.js'
import { TelegramBotInit } from './telegram/index.js'

// TelegramBotInit()

const tradingview = new Tradingview('KUCOIN', ['BTCUSDT'], ['1d', '1m'])
const data = await tradingview.getIndicators()
// console.log(data)

await DBController.InitSession()

// await CoinController.Create('COINNAME')
// await CoinController.Create('COINNAME2')
// await CoinController.Create('COINNAME3')

await CoinController.WriteData(data)
await DBController.CloseSession()
