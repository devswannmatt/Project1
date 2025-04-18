const express           = require('express');
const session           = require('express-session');
const flash             = require('connect-flash');
const fs                = require('fs');
const path              = require('path');
const bodyParser        = require('body-parser');
const passport          = require('passport');
const MongoStore        = require('connect-mongo');
const LocalStrategy     = require('passport-local').Strategy;
const populateFunctions = require('./middleware/functions').populateFunctions;
const populateData      = require('./middleware/populateData');
const populateLog       = require('./middleware/populateLog')

const app   = express()
const port  = 3000
const mongo = { secret: 'b77f0fb7aba13547f30493569980c924ab18111a5ce0ed09507c135330216e1647fde3ec4f2e351f26845ccac08c24cc25f36d482d1a198ff46a65e5021d8e9d', resave: false, saveUninitialized: false, store: MongoStore.create({ mongoUrl: 'mongodb://127.0.0.1:27017/config'})}

const { connectMongo, User } = require('./models');

connectMongo();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static('uploads'));
app.use(flash());
app.use(session(mongo));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(async (username, password, done) => {
  try {
    const user = await User.findOne({ username })
    if (!user) return done(null, false, { message: 'Incorrect username.' })
    const isMatch = await user.comparePassword(password)
    if (!isMatch) return done(null, false, { message: 'Incorrect password.' })
    return done(null, user);
  } catch (err) {
    return done(err);
  }
}));

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => { try { done(null, await User.findById(id)) } catch (err) { done(err) } })

app.use(populateFunctions);
app.use(populateData);
app.use(populateLog);


const routesDirectory = path.join(__dirname, 'routes');
const routeFiles = fs.readdirSync(routesDirectory);

const filenameRouter = {};

routeFiles.forEach((file) => {
  if (file.endsWith('.js')) {
    const routeName = path.basename(file, '.js');
    const router = require(path.join(routesDirectory, file));

    if (typeof router === 'function' || router instanceof express.Router) {
      filenameRouter[`${routeName}Router`] = router;
    } else {
      console.warn(`Skipping ${file}: Not a valid Express router.`);
    }
  }
});

Object.values(filenameRouter).forEach((router) => {
  console.log('router', router)
  app.use(router);
});

app.use((req, res, next)      => { res.status(404).render('404') });
app.use((err, req, res, next) => {
  console.log('[ERROR] ', err)
  res.status(500).send(err)
});

app.listen(port, () => {
  console.log(`[APP  ] Starting on Port ${port}...`)
  console.log(`[APP  ] Started http://localhost:${port})`)
});
