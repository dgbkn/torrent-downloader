const axios = require("axios")
const Seedr = require("seedr")
const sleep = require("sleep")
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
        if (res.data.data.movie_count === 0) {
            resp = `Sorry, I couldn't find any film corresponding to your request, could you please specify?`
            bot.sendMessage(chatID, resp)
        }
        else if (res.data.data.movie_count === 1) {
            bot.sendMessage(chatID, `I only found one film corresponding to your request... Here it is: ${res.data.data.movies[0]}. I import it in Seedr`)
            createMagnet(res.data.data.movies[0].torrents[1].hash, encoded)

        }
        else {
            bot.sendMessage(chatID, `I found ... films corresponding to your search, here they are. `)
            sleep.sleep(1);
            const tab = res.data.data.movies;
            for (let b = 0; b < tab.length; b++) {
                bot.sendMessage(chatID, `Film ${b} : ${res.data.data.movies[b].title_long}`)
                sleep.sleep(1);
            }
            sleep.sleep(1);
            bot.sendMessage(chatID, `Tell me which one you want, by replying to this message and by typing the corresponding number. `)
            let response = bot.onReplyToMessage((msg, match))
            if (response > tab.length) {
                bot.sendMessage(chatID, `Sorry, but the number you gave is not good! `)
            }
            else {

            }

        }
    })
})