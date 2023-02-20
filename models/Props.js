import mongoose from 'mongoose'

const PropSchema = new mongoose.Schema(
  {
    name: String,
    symbol: String,
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

export default mongoose.model('Prop', PropSchema)
