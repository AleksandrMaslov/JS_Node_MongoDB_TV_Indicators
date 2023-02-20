import mongoose from 'mongoose'

const RecommendSchema = new mongoose.Schema(
  {
    RecommendAll: Number,
    RecommendMA: Number,
    RecommendOther: Number,
  },
  {
    timestamps: true,
  }
)

export default mongoose.model('Recommend', RecommendSchema)
