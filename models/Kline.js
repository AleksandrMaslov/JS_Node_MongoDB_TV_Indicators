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
    close: Number,
    open: Number,
    volume: Number,
    change: Number,
    low: Number,
    high: Number,
  },
  {
    timestamps: true,
  }
)

export default mongoose.model('Kline', KlineSchema)
