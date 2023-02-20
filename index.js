import TelegramApi from 'node-telegram-bot-api'

import config from './config.js'
import { keyboardOptions } from './options.js'
import { Tradingview } from './tradingview/tradingviewAPI.js'
import { CoinController, DBController } from './controllers/index.js'

const token = config.TG_BOT_TOKEN
function start() {
  console.log('Bot is online...')
  const bot = new TelegramApi(token, { polling: true })

  bot.setMyCommands([
    { command: '/start', description: 'Начальное приветствие' },
    { command: '/info', description: 'Информация о твоей любимой крипте' },
  ])

  bot.on('message', async (msg) => {
    const text = msg.text
    const chatId = msg.chat.id
    const userFirstName = msg.from.first_name
    const userLastName = msg.from.last_name
    const username = msg.from.username
    const userName = `${userFirstName !== undefined ? userFirstName : ''}-${
      userLastName !== undefined ? `-${userLastName}` : ''
    }${username !== undefined ? `(${username})` : ''}`

    console.log()

    console.log(`${userName}: "${text}"`)

    if (text === '/start') {
      await bot.sendSticker(
        chatId,
        'https://tlgrm.ru/_/stickers/668/b21/668b2148-fa65-48ed-9a6c-e69982e919bd/3.webp'
      )
      return bot.sendMessage(chatId, `Добро пожаловать, ${userName}`)
    }

    if (text === '/info') {
      return bot.sendMessage(chatId, `Выбери крипту:`, keyboardOptions)
    }

    if (text.startsWith('/')) {
      return bot.sendMessage(
        chatId,
        `Я не понимаю такой команды, попробуй еще раз`
      )
    }

    return bot.sendMessage(chatId, `Я тебя не понимаю, попробуй еще раз`)
  })

  bot.on('callback_query', async (msg) => {
    const chatId = msg.message.chat.id
    const data = msg.data
    const userFirstName = msg.from.first_name
    const userLastName = msg.from.last_name
    const username = msg.from.username
    const userName = `${userFirstName !== undefined ? userFirstName : ''}-${
      userLastName !== undefined ? `-${userLastName}` : ''
    }${username !== undefined ? `(${username})` : ''}`

    console.log(`${userName} selected: "${data}"`)

    const tradingview = new Tradingview('KUCOIN', [data], ['1d'])
    const message = JSON.stringify(await tradingview.getIndicators())
    return bot.sendMessage(chatId, message)
  })
}
// start()

// const tradingview = new Tradingview('KUCOIN', ['BTCUSDT'], ['1d'])
// console.log(await tradingview.getIndicators())

await DBController.InitSession()
// await CreateCoin('COINNAME')
// await CreateCoin('COINNAME2')
// await CreateCoin('COINNAME3')
await CoinController.GetAll()
await DBController.CloseSession()
