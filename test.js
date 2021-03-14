const axios = require("axios")
const Seedr = require("seedr")
const sleep = require("sleep")
const TelegramBot = require('node-telegram-bot-api');
var seedr = new Seedr();
require('dotenv').config()

const token = process.env.SIGNAL_TOKEN;
seedr.getToken(process.env.SEEDR_TOKEN);
const bot = new TelegramBot(token, { polling: true });

function createMagnet(torrentHash, encodedURI) {
    let url = `magnet:?xt=urn:btih:${torrentHash}&dn={encodedURI}&tr=udp://glotorrents.pw:6969/announce&tr=udp://tracker.opentrackr.org:1337/announce`
    seedr.addMagnet(url);
}

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
    let resp = `All right, I'm looking for ${match[1]} at the YTS API. Please wait`
    const uri = match[1]
    const encoded = encodeURI(uri)
    bot.sendMessage(chatID, resp)
    console.log(encoded)

    axios.get(`https://yts.mx/api/v2/list_movies.json?query_term=${uri}`).then((res) => {
        createMagnet(res.data.data.movies[0].torrents[1].hash, encoded)
    })
})