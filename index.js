import TelegramApi from 'node-telegram-bot-api'

import { keyboardOptions } from './options.js'

console.log('Bot is online...')
const token = '6232959751:AAGyW3KyPIN2fT8cqhXoJ_eVI1bW0Nzjf_s'
const bot = new TelegramApi(token, { polling: true })

function start() {
  bot.setMyCommands([
    { command: '/start', description: 'Начальное приветствие' },
    { command: '/info', description: 'Информация о пользователе' },
  ])

  bot.on('message', async (msg) => {
    const text = msg.text
    const chatId = msg.chat.id
    const userFirstName = msg.from.first_name
    const userLastName = msg.from.last_name
    const userName = `${userFirstName !== undefined ? userFirstName : ''} 
    ${userLastName !== undefined ? userLastName : ''}`

    if (text === '/start') {
      await bot.sendSticker(
        chatId,
        'https://tlgrm.ru/_/stickers/668/b21/668b2148-fa65-48ed-9a6c-e69982e919bd/3.webp'
      )
      return bot.sendMessage(chatId, `Добро пожаловать, ${userName}`)
    }

    if (text === '/info') {
      return bot.sendMessage(chatId, `Тебя зовут: ${userName}`, keyboardOptions)
    }

    if (text.startsWith('/')) {
      console.log(text)
      return bot.sendMessage(
        chatId,
        `Я не понимаю такой команды, попробуй еще раз`
      )
    }

    console.log(text)
    return bot.sendMessage(chatId, `Я тебя не понимаю, попробуй еще раз`)
  })

  bot.on('callback_query', async (msg) => {
    const chatId = msg.message.chat.id
    const data = msg.data
    console.log(data)
    return bot.sendMessage(chatId, data)
  })
}

start()
