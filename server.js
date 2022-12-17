require('dotenv/config');
const app = require('./app');
const mongoose = require('mongoose');

const DB = process.env.MONGODB_URL;
mongoose.connect(DB).then(() => console.log('Connected to MongoDB Successfully...')).catch(err => console.log('MongoDB Connection Failed!'));

const port = process.env.PORT || 3001

app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});