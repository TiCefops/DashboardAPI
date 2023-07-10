const express = require('express');
const cors = require('cors')
const routes = require('./routes')

const app = express();

app.use(cors())
app.use(express.json())
app.use(routes)

// Inicie o servidor da API
const port = 3000;
app.listen(port, () => {
  console.log(`API está em execução em http://localhost:${port}`);
});
