console.log("Loading server middleware...")

const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const express = require('express');

module.exports = (app) => {
    app.use(express.json());
    app.use(morgan('common'));

    // app.use(cors({
    //   credentials: true,
    //   origin: '*'
    // }));
    
    app.use(cors({
      credentials: true,
      origin: ['http://localhost:4200', 'https://deathnotices.onrender.com']
    }));
    app.use(helmet({
        contentSecurityPolicy: false,
      }));

    
}
