const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const expressHbs = require('express-handlebars');
const cors = require('cors');
const dotenv = require('dotenv');
const cookieparser = require('cookie-parser');

const userRoutes = require('./routes/users/authUserRoutes')

const port = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(cookieparser());
app.use(bodyParser.urlencoded({
  extended: true,
}));
app.use(express.json());
app.use(bodyParser.json());

app.engine('.hbs', expressHbs.engine({ extname: "hbs", defaultLayout: 'main', layoutsDir: "views/layouts/" }));
app.set('view engine', '.hbs');
app.set('views', './views');

const dbConect = require('./connectMongodb')
dbConect.connect();


app.get('/', (req, res) => {
  res.send("Hello World")
})


app.use('/user', userRoutes);

app.listen(port, () => {
  console.log("Localhost lang nghe cong " + port)
});


//AUTHENTICATION(so danh du lieu minh nhao va db)

//AUTHORIZATION(phan quyen)