import mongoose from 'mongoose'

const RecommendSchema = new mongoose.Schema(
  {
    symbol: {
      type: String,
      required: true,
    },
    interval: {
      type: String,
      required: true,
    },
    recommendAll: Number,
    recommendMA: Number,
    recommendOther: Number,
  },
  {
    timestamps: true,
  }
)

export default mongoose.model('Recommend', RecommendSchema)
