const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const pages = require('./exports/page-routes');
const db = require('./database/connection')
const table = require('./database/tables')
const post_routes = require('./exports/post-routes');
const get_routes = require('./exports/get-routes');
const put_routes = require('./exports/put-routes');
require('dotenv').config()

table.generateTables(db)

const app = express();

let initialPath = path.join(__dirname);

app.use(bodyParser.json());
app.use(express.static(initialPath));
app.use('', pages);
app.use('/request', post_routes);
app.use('/request', get_routes);
app.use('/request', put_routes);

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})