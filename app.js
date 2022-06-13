require('dotenv').config()
const express = require('express')
const app = express()




app.listen(process.env.APP_PORT, () => {
    console.log(`Sunucu ${process.env.APP_PORT} portunda ayağa kalktı.`);
})