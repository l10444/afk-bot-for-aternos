const mineflayer = require("mineflayer");
const express = require("express");

// Create a web server
const app = express();
app.get("/", (req, res) => res.send("Bot is running and online!")); // Simple response for ping
app.listen(3000, () => console.log("Web server is running on port 3000"));

// Bot configuration
const bot = mineflayer.createBot({
  host: "deathmax156.aternos.me", // Your Aternos server IP
  port: 13501, // Your Aternos server port
  username: "AFK_Bot", // The bot's Minecraft username
});

// Event: When the bot logs in
bot.on("login", () => {
  console.log("Bot successfully logged in!");
  bot.chat("/msg server Bot is now online!"); // Optional message to the server
});

// Event: When the bot gets kicked or disconnected
bot.on("end", () => {
  console.log("Bot disconnected! Reconnecting in 10 seconds...");
  setTimeout(() => reconnect(), 10000); // Reconnect after 10 seconds
});

// Event: When there’s an error
bot.on("error", (err) => {
  console.error(`Error: ${err.message}`);
});

// Anti-AFK logic
function antiAFK() {
  const actions = ["jump", "forward", "back", "left", "right"];
  const randomAction = actions[Math.floor(Math.random() * actions.length)];

  bot.setControlState(randomAction, true);
  setTimeout(
    () => {
      bot.setControlState(randomAction, false);
    },
    Math.random() * 5000 + 1000,
  ); // Random duration between 1 and 6 seconds
}

setInterval(antiAFK, Math.random() * 15000 + 5000); // Random interval between 5 and 20 seconds

// Reconnect function
function reconnect() {
  bot = mineflayer.createBot({
    host: "deathmax156.aternos.me", // Your Aternos server IP
    port: 13501, // Your Aternos server port
    username: "AFK_Bot", // The bot's Minecraft username
  });

  bot.on("login", () => {
    console.log("Bot successfully reconnected!");
  });

  bot.on("end", () => {
    console.log("Bot disconnected! Reconnecting in 10 seconds...");
    setTimeout(() => reconnect(), 10000);
  });

  bot.on("error", (err) => {
    console.error(`Error: ${err.message}`);
  });
}
