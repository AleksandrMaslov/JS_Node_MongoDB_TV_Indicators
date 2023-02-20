export class Interval {
  constructor(intervalString) {
    this.Name = this.defineIntervalName(intervalString)
    this.Option = this.defineIntervalOption(intervalString)
  }

  defineIntervalOption(interval) {
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
}
