const express = require('express');
const cors = require('cors')
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;


// middleware
app.use(cors());
app.use(express.json());





app.get('/', (req, res) => {
    res.send('toys world is now open')
});


app.listen(port, () => {
    console.log(`toys world is running on port: ${port}`);
})