import CoinModel from '../models/Coin.js'
import IntervalModel from '../models/Interval.js'
import PropsModel from '../models/Props.js'

export async function GetAll() {
  try {
    const coins = await CoinModel.find().populate('interval_1d').exec()
    console.log(coins)
  } catch (error) {
    console.log(error)
  }
}

export async function Create(data) {
  try {
    const propsInstance1 = new PropsModel({
      name: '1d',
      symbol: data,
      close: 123,
      open: 323,
      volume: 1231,
      change: 234,
      low: 3464,
      high: 567,
    })
    await propsInstance1.save()

    const propsInstance2 = new PropsModel({
      name: '1d',
      symbol: data,
      close: 567,
      open: 87,
      volume: 789,
      change: 678,
      low: 456,
      high: 87,
    })
    await propsInstance2.save()

    const intervalInstance_1d = new IntervalModel({
      name: '1d',
      symbol: data,
      props: [propsInstance1, propsInstance2],
    })
    await intervalInstance_1d.save()

    const coinInstance = new CoinModel({
      symbol: data,
      interval_1d: intervalInstance_1d,
    })

    console.log(coinInstance)
    await coinInstance.save()
  } catch (error) {
    console.log('Не удалось записать данные', error)
  }
}

export async function Update(data) {
  try {
    const postId = request.params.id
    await PostModel.updateOne(
      {
        _id: postId,
      },
      {
        title: request.body.title,
        text: request.body.text,
        imageUrl: request.body.imageUrl,
        tags: request.body.tags,
        user: request.body.userId,
      }
    )

    response.json({
      success: true,
    })
  } catch (error) {
    console.log(error)
    response.status(500).json({ message: 'Не удалось обновить статью' })
  }
}
