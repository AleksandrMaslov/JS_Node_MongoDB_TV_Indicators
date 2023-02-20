import mongoose from 'mongoose'
import config from '../config.js'

const DBLogin = config.DB_LOGIN
const DBPassword = config.DB_PASSWORD
const DBName = config.DB_NAME

export async function InitSession() {
  await mongoose
    .set('strictQuery', true)
    .connect(
      `mongodb+srv://${DBLogin}:${DBPassword}@cluster0.gpqznic.mongodb.net/${DBName}?retryWrites=true&w=majority`
    )
    .then(() => {
      console.log('MongoDB - Connected')
    })
    .catch((error) => {
      console.log('MongoDB Error:', error)
    })
}

export async function CloseSession() {
  await mongoose.disconnect().then(() => {
    console.log('MongoDB - Disconnected')
  })
}
