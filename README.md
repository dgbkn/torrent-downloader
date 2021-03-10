👨‍💻 Project under construction
# 📥 Torrent downloader bot
The first telegram bot allowing to download Torrent files from YTS and to export them to Seedr.cc
# ⚠️ Disclaimer
The YTS site allows you to download torrent files illegally, make sure you own the work before downloading it. This repo is offered for information and training purposes. I am in no way responsible for the misuse of the bot.
# 📲 Installation
  If you want to use the bot at home, follow this tutorial
##  🔨 Prerequisite
1. Have a Telegram account and create a bot token by contacting Bot Father.
2. Have a Seedr account
3. rename the file `.env.example` to `.env`
4. Having NodeJS and Yarn or NPM installed on your machine 

## 🛠 Module installation
With Yarn (recommended)

    cd torrent-downloader
    yarn install
    
With NPM

    cd torrent-downloader
    npm i
    
## ⚙️ Adding configuration variables
1. Execute the code a first time, typing `yarn start` or `npm start` (depending on your packet manager) and follow the instructions in the terminal in order to get your token for Seedr (the sequence of number and letter on the left is the device code to enter in Seedr, on the right is the token, to enter in the .env file next to `SEEDR_TOKEN=`)
2. Add in the `.env` file the token of your Telegram bot that BotFather gave you, next to the line `SIGNAL_TOKEN=`

# 👨‍🏫 Usage
To download a film, type in Telegram /search [name of film] and follow the instructions.
