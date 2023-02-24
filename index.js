import { Tradingview } from './tradingview/tradingviewAPI.js'
import { CoinController, DBController } from './controllers/index.js'

const tradingview = new Tradingview('KUCOIN', ['BTCUSDT'], ['1m'])

const data = await tradingview.getIndicators()
console.log(data)

async function TestDB() {
  await DBController.InitSession()
  await CoinController.ClearDB()
  await CoinController.WriteData(data)
  await DBController.CloseSession()
}

// await TestDB()

// TODO
// - add all indicator recomendations
// - fix update function indicators data
// - add periodic request>update loop
// - check plotter for date format
// - deploy
