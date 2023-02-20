import axios from 'axios'

const defaultIndicators = [
  'Recommend.Other',
  'Recommend.All',
  'Recommend.MA',
  'RSI',
  'RSI[1]',
  'Stoch.K',
  'Stoch.D',
  'Stoch.K[1]',
  'Stoch.D[1]',
  'CCI20',
  'CCI20[1]',
  'ADX',
  'ADX+DI',
  'ADX-DI',
  'ADX+DI[1]',
  'ADX-DI[1]',
  'AO',
  'AO[1]',
  'Mom',
  'Mom[1]',
  'MACD.macd',
  'MACD.signal',
  'Rec.Stoch.RSI',
  'Stoch.RSI.K',
  'Rec.WR',
  'W.R',
  'Rec.BBPower',
  'BBPower',
  'Rec.UO',
  'UO',
  'close',
  'EMA5',
  'SMA5',
  'EMA10',
  'SMA10',
  'EMA20',
  'SMA20',
  'EMA30',
  'SMA30',
  'EMA50',
  'SMA50',
  'EMA100',
  'SMA100',
  'EMA200',
  'SMA200',
  'Rec.Ichimoku',
  'Ichimoku.BLine',
  'Rec.VWMA',
  'VWMA',
  'Rec.HullMA9',
  'HullMA9',
  'Pivot.M.Classic.S3',
  'Pivot.M.Classic.S2',
  'Pivot.M.Classic.S1',
  'Pivot.M.Classic.Middle',
  'Pivot.M.Classic.R1',
  'Pivot.M.Classic.R2',
  'Pivot.M.Classic.R3',
  'Pivot.M.Fibonacci.S3',
  'Pivot.M.Fibonacci.S2',
  'Pivot.M.Fibonacci.S1',
  'Pivot.M.Fibonacci.Middle',
  'Pivot.M.Fibonacci.R1',
  'Pivot.M.Fibonacci.R2',
  'Pivot.M.Fibonacci.R3',
  'Pivot.M.Camarilla.S3',
  'Pivot.M.Camarilla.S2',
  'Pivot.M.Camarilla.S1',
  'Pivot.M.Camarilla.Middle',
  'Pivot.M.Camarilla.R1',
  'Pivot.M.Camarilla.R2',
  'Pivot.M.Camarilla.R3',
  'Pivot.M.Woodie.S3',
  'Pivot.M.Woodie.S2',
  'Pivot.M.Woodie.S1',
  'Pivot.M.Woodie.Middle',
  'Pivot.M.Woodie.R1',
  'Pivot.M.Woodie.R2',
  'Pivot.M.Woodie.R3',
  'Pivot.M.Demark.S1',
  'Pivot.M.Demark.Middle',
  'Pivot.M.Demark.R1',
  'open',
  'P.SAR',
  'BB.lower',
  'BB.upper',
  'AO[2]',
  'volume',
  'change',
  'low',
  'high',
]

class TradingView {
  constructor(exchange, symbols, intervals = [''], indicators = []) {
    this.url = 'https://scanner.tradingview.com/'
    this.screener = 'Crypto'.toLowerCase()
    this.scanUrl = `${this.url}${this.screener}/scan`

    this.exchange = exchange.toUpperCase()
    this.symbols = symbols
    this.intervals = intervals

    if (indicators.length === 0) this.indicators = defaultIndicators
    else this.indicators = indicators
  }

  async getIndicators() {
    const requestData = this.defineRequestData()

    try {
      const response = await axios.post(this.scanUrl, requestData, {})

      if (response.status !== 200) {
        const errorMessage = `Can't access TradingView's API. HTTP status code: ${response.status}. Check for invalid symbol, exchange, or indicators.`
        throwError(errorMessage)
      }

      if (response.data.totalCount === 0) {
        const errorMessage = `Exchange or symbol not found.`
        throwError(errorMessage)
      }

      return this.convertResponseData(response.data.data)
    } catch (error) {
      if (error.message) console.log(`ERROR: ${error.message}`)
    }
  }

  convertResponseData(responseData) {
    const countIndicators = this.indicators.length
    const convertedData = this.defineDataStructure()

    responseData.forEach((data) => {
      const symbolKey = data.s.split(':')[1]
      const symbolRawData = data.d
      let intervalIndex = 0

      for (
        let dataIndex = 0;
        dataIndex < symbolRawData.length;
        dataIndex += countIndicators
      ) {
        const dataChunk = symbolRawData.slice(
          dataIndex,
          dataIndex + countIndicators
        )
        const intervalName = this.defineIntervalName(
          this.intervals[intervalIndex]
        )

        for (
          let indicatorIndex = 0;
          indicatorIndex < dataChunk.length;
          indicatorIndex++
        ) {
          const indicatorName = this.indicators[indicatorIndex]

          convertedData[symbolKey][intervalName][indicatorName] =
            dataChunk[indicatorIndex]
        }
        intervalIndex++
      }
    })

    return convertedData
  }

  defineDataStructure() {
    const intervatDict = Object.assign(
      {},
      ...this.intervals.map((i) => ({ [this.defineIntervalName(i)]: {} }))
    )

    const dataStructure = Object.assign(
      {},
      ...this.symbols.map((s) => ({
        [s]: JSON.parse(JSON.stringify(intervatDict)),
      }))
    )
    return dataStructure
  }

  defineRequestData() {
    const requestSymbols = this.symbols.map((s) => this.defineSymbol(s))
    const requestIntervals = this.intervals.map((i) => this.defineInterval(i))
    const requestIndicators = requestIntervals
      .map((i) => this.defineIndicators(i))
      .flat()

    return {
      symbols: {
        tickers: requestSymbols,
        query: { types: [] },
      },
      columns: requestIndicators,
    }
  }

  defineSymbol(symbol) {
    return `${this.exchange}:${symbol}`.toUpperCase()
  }

  defineIndicators(interval) {
    return this.indicators.map((i) => i + interval)
  }

  defineInterval(interval = '') {
    if (interval === '1m') return '|1'
    if (interval === '5m') return '|5'
    if (interval === '15m') return '|15'
    if (interval === '30m') return '|30'
    if (interval === '1h') return '|60'
    if (interval === '2h') return '|120'
    if (interval === '4h') return '|240'
    if (interval === '1W') return '|1W'
    if (interval === '1M') return '|1M'
    return ''
  }

  defineIntervalName(interval) {
    if (interval === '') return '1d'
    return interval
  }

  throwError(errorMessage) {
    console.log('ERROR:', errorMessage)
    throw errorMessage
  }
}

const test = new TradingView(
  'KUCOIN',
  ['BTCUSDT', 'ETHUSDT', 'TXAUSDT'],
  ['1d']
  // ['RSI', 'SMA10', 'SMA30']
)

console.log(await test.getIndicators())
