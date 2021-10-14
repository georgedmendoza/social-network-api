const mongoose = require('mongoose');
const express = require('express');
const routes = require('./routes');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(express.static('public'));

app.use(routes);

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/social-network-api', {
    userNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.set('debg', true);

app.listen(PORT, () => {
    console.log(`connected on localhost ${PORT}`);
})