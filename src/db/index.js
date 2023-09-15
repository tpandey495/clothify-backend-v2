const mongoose = require('mongoose');
const path=require("path");
const dotenv = require('dotenv');
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const options = {};
mongoose.set('strictQuery', true);
mongoose.connect(process.env.MONGO_URI)
    .then(res => console.log('Successfully! DB has connected'))
    .catch(err => console.log(err.message));
module.exports = mongoose;