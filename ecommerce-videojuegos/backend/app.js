const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const connectDB = require('./db/db');

connectDB();

// Crear una instancia de Express
const app = express();

// Middlewares para los procesos logicos
app.use(cors());
app.use(express.json());

const Game = require('./models/game');
const Payment = require('./models/payment');
const User = require('./models/user');

// Importar las rutas
const gameRoutes = require('./routes/gameRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const userRoutes = require('./routes/userRoutes');

// Uso de las rutas
app.use('/api/games', gameRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/users', userRoutes);

app.get('/', (req, res) => {
  res.send('Servidor funcionando');
});

const gamesInfo = async () => {
  try {
    const api_key = "c69e14a470a24e95995f9e048fab7811";
    const pageSize = 40; // Máximo permitido por RAWG
    const totalGames = 100; // Número total de juegos deseados
    const pagesToFetch = Math.ceil(totalGames / pageSize); // Cantidad de páginas necesarias

    const fetchPage = async (page) => {
      const url = `https://api.rawg.io/api/games?key=${api_key}&page=${page}&page_size=${pageSize}`;
      const response = await fetch(url);
      const data = await response.json();
      return data.results;
    };

    // Realiza llamadas para todas las páginas
    const allGames = [];
    for (let i = 1; i <= pagesToFetch; i++) {
      const games = await fetchPage(i);
      allGames.push(...games); // Combina resultados de cada página
    }

    // Usamos Promise.all para manejar las funciones asincrónicas dentro de map
    const gameData = await Promise.all(
      allGames.map(async (game) => {
        const description = await getGameDescription(game.id);
        const price = await getPrice(game.name);
        const publisher = await getGamePublisher(game.id);

        return {
          Game_Name: game.name,
          Game_Description: description,
          Game_Price: price,
          Game_Category: game.genres.map((genre) => genre.name),
          Game_Platform: game.platforms.map((platform) => platform.platform.name),
          Game_ESRB_Rating: game.esrb_rating ? game.esrb_rating.name : "N/A",
          Game_Short_Screenshots: game.short_screenshots.map((screenshot) => screenshot.image),
          Game_Background_Image: game.background_image,
          Brand: publisher,
          Discount: 0,
        };
      })
    );

    return gameData;
  } catch (error) {
    console.log(error);
  }
};


const getPrice = async (name) => {
  try {
    const url = `https://www.cheapshark.com/api/1.0/games?title=${name}`;
    const response = await fetch(url);
    const data = await response.json();
    var price = 0
    if(data[0]) {
      const id = data[0].gameID;
      const url2 = `https://www.cheapshark.com/api/1.0/games?id=${id}`;
      const response2 = await fetch(url2);
      const data2 = await response2.json();
      if(!data2.error && data2.deals[0]) {
        price = data2.deals[0].retailPrice;
      }else {
        price = (Math.random() * (59.99 - 19.99) + 19.99).toFixed(2);
      }
    }else {
      price = (Math.random() * (59.99 - 19.99) + 19.99).toFixed(2);
    }
    return price;
  } catch (error) {
    console.log(error);
  }
};

const getGameDescription = async (id) => {
  try {
    const url = `https://api.rawg.io/api/games/${id}?key=c69e14a470a24e95995f9e048fab7811`;
    const response = await fetch(url);
    const data = await response.json();
    const description = data.description;
    return description;
  } catch (error) {
    console.log(error);
  }
}
const getGamePublisher = async (id) => {
  try {
    const url = `https://api.rawg.io/api/games/${id}?key=c69e14a470a24e95995f9e048fab7811`;
    const response = await fetch(url);
    const data = await response.json();
    const publisher = data.publishers[0].name;
    return publisher;
  } catch (error) {
    console.log(error);
  }
}

const insertGames = async () => {
  try {
    const games = await Game.find();
    if (games.length === 0) {
      const gameData = await gamesInfo();
      if (gameData) {
        await Game.insertMany(gameData);
        console.log("Juegos insertados correctamente.");
      }
    }
  } catch (error) {
    console.log(error);
  }
}

insertGames();

module.exports = app;
