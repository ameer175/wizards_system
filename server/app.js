const app = require('./http-server');

const PORT = 3000;

app.listen(PORT, () => console.log(`Listening to port ${PORT}`));
