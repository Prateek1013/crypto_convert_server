const express = require("express");

const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 4000;
app.use(cors());

const dotenv = require("dotenv").config();
const env = process.env;

const CRYPTO_URL = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en&x_cg_demo_api_key=${env.API_KEY}`;
const CURRENCIES_URL = `https://api.coingecko.com/api/v3/simple/supported_vs_currencies?x_cg_demo_api_key=${env.API_KEY}`;

app.get("/cryptos", (req, res) => {
  fetch(CRYPTO_URL)
    .then((resp) => resp.json())
    .then((jsondata) => {
      res.json(jsondata);
    });
});

app.get("/currencies", (req, res) => {
  fetch(CURRENCIES_URL)
    .then((resp) => resp.json())
    .then((jsondata) => {
      res.json(jsondata);
    });
});

app.get("/convert", (req, res) => {
  const crypto = req.query.crypto;
  const currency = req.query.currency;
  fetch(
    `https://api.coingecko.com/api/v3/simple/price?ids=${crypto}&vs_currencies=${currency}`
  )
    .then((resp) => resp.json())
    .then((jsondata) => {
      res.json(jsondata);
    });
});

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
