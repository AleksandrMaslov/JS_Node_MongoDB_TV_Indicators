import mongoose from 'mongoose'

const KlineSchema = new mongoose.Schema(
  {
    symbol: {
      type: String,
      required: true,
    },
    interval: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    open: Number,
    low: Number,
    high: Number,
    close: Number,
    volume: Number,
    change: Number,
  },
  {
    timestamps: true,
  }
)

export default mongoose.model('Kline', KlineSchema)
