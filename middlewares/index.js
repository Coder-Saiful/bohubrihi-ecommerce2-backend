const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const compression = require('compression');

module.exports = (app) => {
    app.use(cors({
        origin: [process.env.FRONTEND_URL, process.env.LOCAL_URL],
        methods: ["POST", "GET", "PUT", "DELETE"],
        credentials:true,            
        optionSuccessStatus:200
    }));
    app.use(compression());
    app.use(express.json());
    app.use(express.urlencoded({extended: true}));
    if (process.env.NODE_ENV === "development") {
        app.use(morgan('dev'));
    }
}
