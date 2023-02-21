import mongoose from 'mongoose'

const IntervalSchema = new mongoose.Schema({
  symbol: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  klines: {
    type: Array,
    default: [],
  },
  recommends: {
    type: Array,
    default: [],
  },
  indicators: {
    type: Array,
    default: [],
  },
})

export default mongoose.model('Interval', IntervalSchema)
