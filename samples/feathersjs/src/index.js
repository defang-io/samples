const app = require('./app');

const port = process.env.PORT || 3030;
app.listen(port, () => {
  console.log(`Feathers app listening on http://localhost:${port}`);
});
