const express = require('express');
const port = process.env.PORT || 3000;

const app = express();


mid=function(req, res, next) {
  console.log('Requête reçue à ' + new Date().toLocaleString());
  next();
}


app.use(mid);

app.get('/', (req, res) => {
  res.status(200).send('Bonjour le monde !');
});

app.get('/contact', (req, res) => {
  res.status(200).send('contact');
});



app.listen(port, () => {
  console.log(`Serveur est en ligne ${port}`);
});
