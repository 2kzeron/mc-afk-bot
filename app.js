const express = require('express');
const mineflayer = require('mineflayer');
const app = express();
const port = 3000;

// This part keeps Render happy so it stays online
app.get('/', (req, res) => {
  res.send('Bot is running and keeping the server alive!')
})

app.listen(port, () => {
  console.log(`Web is listening at http://localhost:${port}`)
})

// This part is the actual Minecraft Bot
const settings = require('./settings.json');

function createBot() {
    const bot = mineflayer.createBot({
        host: settings.ip,
        port: settings.port,
        username: settings.name,
        version: settings.version,
        offline: true
    });

    bot.on('spawn', () => console.log('Bot has joined the server!'));
    
    // Automatically reconnect if the bot gets kicked
    bot.on('end', () => {
        console.log('Bot disconnected. Reconnecting in 30 seconds...');
        setTimeout(createBot, 30000);
    });

    bot.on('error', (err) => console.log('Error:', err));
}

createBot();
