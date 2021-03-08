const axios = require("axios")
const Seedr = require("seedr")
const TelegramBot = require('node-telegram-bot-api');
var seedr = new Seedr();
require('dotenv').config()

console.log("🚀   Launch in progress")

if (!process.env.SEEDR_TOKEN) {
    console.log("We need to config Seedr. Let's get started")
    console.warn("You will be redirected to Seedr to make a token. Then type the token in the env file.")
    console.warn("go to https://seedr.cc/devices and add user code")
    seedr.getDeviceCode();
    new Error('Please enter the token');

}
if (!process.env.SIGNAL_TOKEN) {
    console.warn("Please generate a bot token on Signal")
    new Error('Please enter the token for signal');
}

console.log("👍   All the first validations have been passed correctly ")
const token = process.env.SIGNAL_TOKEN;
const bot = new TelegramBot(token, { polling: true });
console.log("🗼   Torrent Download Bot is online")
bot.onText(/\/echo (.+)/, (msg, match) => {
    // 'msg' is the received Message from Telegram
    // 'match' is the result of executing the regexp above on the text content
    // of the message

    const chatId = msg.chat.id;
    const resp = match[1]; // the captured "whatever"

    // send back the matched "whatever" to the chat
    bot.sendMessage(chatId, resp);
});
bot.onText(/\/search (.+)/, (msg, match) => {
    const chatID = msg.chat.id
    const resp = `All right, I'm looking for ${match[1]} at the YTS API. Please wait`
    const uri = match[1]
    const encoded = encodeURI(uri)
    bot.sendMessage(chatID, resp)
    console.log(encoded)

    axios.get(`https://yts.mx/api/v2/list_movies.json?query_term=${uri}`).then((res) => {
        if (res.data.data[0] === 0) {
            bot.sendMessage(chatID, "Désolé, je n'ai pas trouvé de film avec ce nom")
        }
    })
})