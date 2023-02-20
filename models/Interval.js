import mongoose from 'mongoose'

const IntervalSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  symbol: {
    type: String,
    required: true,
  },
  props: {
    type: Array,
    default: [],
  },
  // recomends: {
  //   type: Array,
  //   default: [],
  // },
  // indicators: {
  //   type: Array,
  //   default: [],
  // },
})

export default mongoose.model('Interval', IntervalSchema)
