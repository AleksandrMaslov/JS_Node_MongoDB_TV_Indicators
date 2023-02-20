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
  },
  // interval_1m: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'Interval',
  // },
})

export default mongoose.model('Coin', CoinSchema)
