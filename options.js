const webAppUrl = 'https://mail.ru'

export const keyboardOptions = {
  reply_markup: JSON.stringify({
    inline_keyboard: [
      [
        { text: 'Кнопка1', callback_data: '1' },
        { text: 'Кнопка2', callback_data: '2' },
      ],
      [
        { text: 'Кнопка3', callback_data: '3' },
        { text: 'Кнопка4', web_app: { url: webAppUrl } },
      ],
    ],
    // keyboard: [
    //   [
    //     { text: 'Кнопка1', web_app: { url: webAppUrl } },
    //     { text: 'Кнопка2', web_app: { url: webAppUrl } },
    //   ],
    // ],
  }),
}
