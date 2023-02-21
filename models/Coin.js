import mongoose from 'mongoose'

const CoinSchema = new mongoose.Schema({
  symbol: {
    type: String,
    required: true,
    unique: true,
  },
  interval_1d: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Interval',
    required: true,
  },
  interval_1m: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Interval',
  },
  interval_5m: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Interval',
  },
  interval_15m: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Interval',
  },
  interval_30m: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Interval',
  },
  interval_1h: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Interval',
  },
  interval_2h: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Interval',
  },
  interval_4h: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Interval',
  },
  interval_1W: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Interval',
  },
  interval_1M: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Interval',
  },
})

export default mongoose.model('Coin', CoinSchema)
