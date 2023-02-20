import { defaultIndicators } from './indicators.js'

export class TradingviewUtils {
  constructor(exchange, symbols, intervals, indicators) {
    this.url = 'https://scanner.tradingview.com/'
    this.screener = 'Crypto'.toLowerCase()
    this.scanUrl = `${this.url}${this.screener}/scan`

    this.exchange = exchange.toUpperCase()
    this.symbols = symbols
    this.intervals = intervals

    if (indicators.length === 0) this.indicators = defaultIndicators
    else this.indicators = indicators
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
