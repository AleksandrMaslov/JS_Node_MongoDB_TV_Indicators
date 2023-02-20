const webAppUrl = 'https://mail.ru'

export const keyboardOptions = {
  reply_markup: JSON.stringify({
    inline_keyboard: [
      [
        { text: 'BTC', callback_data: 'BTCUSDT' },
        { text: 'ETH', callback_data: 'ETHUSDT' },
        { text: 'TXA', callback_data: 'TXAUSDT' },
        { text: 'TWT', callback_data: 'TWTUSDT' },
      ],
      // [
      //   { text: 'Кнопка3', callback_data: '3' },
      //   { text: 'Кнопка4', web_app: { url: webAppUrl } },
      // ],
    ],
    // keyboard: [
    //   [
    //     { text: 'Кнопка1', web_app: { url: webAppUrl } },
    //     { text: 'Кнопка2', web_app: { url: webAppUrl } },
    //   ],
    // ],
  }),
}

export const commands = [
  { command: '/start', description: 'Начальное приветствие' },
  { command: '/info', description: 'Информация о твоей любимой крипте' },
]
