
const express = require('express');
const app = express();
const cors = require('cors')
const db = require('./queries')
const PORT = 8080;

app.use(cors())
app.get('/api/population', db.getPopulation)

app.listen(PORT, () => {
    console.log(`Server started on port http://localhost:${PORT}`);
})