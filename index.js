const express = require('express');
const path = require('path');
const port = process.env.PORT || 3000;

const app = express();

// Configuration du moteur de template EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware pour servir les fichiers statiques (CSS)
app.use(express.static(path.join(__dirname, 'public')));

// Middleware personnalisé pour vérifier les heures ouvrables (lundi-vendredi, 9h-17h)
function checkBusinessHours(req, res, next) {
  const now = new Date();
  const day = now.getDay(); // 0 = dimanche, 1 = lundi, ..., 6 = samedi
  const hour = now.getHours();

  const isWeekday = day >= 1 && day <= 5;
  const isBusinessHour = hour >= 9 && hour < 17;

  if (isWeekday && isBusinessHour) {
    next();
  } else {
    res.status(403).send('Le site est accessible uniquement pendant les heures ouvrables (du lundi au vendredi, de 9h à 17h).');
  }
}

// Middleware de log simple
app.use((req, res, next) => {
  console.log('Requête reçue à ' + new Date().toLocaleString());
  next();
});

// Appliquer le middleware checkBusinessHours à toutes les routes
app.use(checkBusinessHours);

// Routes
app.get('/', (req, res) => {
  res.render('home', { title: 'Accueil' });
});

app.get('/services', (req, res) => {
  res.render('services', { title: 'Nos services' });
});

app.get('/contact', (req, res) => {
  res.render('contact', { title: 'Contactez-nous' });
});

app.listen(port, () => {
  console.log(`Serveur est en ligne sur le port ${port}`);
});
