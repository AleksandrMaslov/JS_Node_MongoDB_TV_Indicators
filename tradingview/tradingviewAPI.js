import axios from 'axios'
import { TradingviewUtils } from './tradingviewUtils.js'

export class Tradingview {
  constructor(exchange, symbols, intervals = [''], indicators = []) {
    this.Utils = new TradingviewUtils(exchange, symbols, intervals, indicators)
  }

  async getIndicators() {
    try {
      const response = await axios.post(
        this.Utils.scanUrl,
        this.Utils.defineRequestData(),
        {}
      )
      if (response.status !== 200) {
        this.Utils.throwError(
          `Can't access TradingView's API. HTTP status code: ${response.status}. Check for invalid symbol, exchange, or indicators.`
        )
      }
      if (response.data.totalCount === 0) {
        this.Utils.throwError(`Exchange or symbol not found.`)
      }
      return this.Utils.convertResponseData(response.data.data)
    } catch (error) {
      if (error.message) console.log(`ERROR: ${error.message}`)
    }
  }
}
