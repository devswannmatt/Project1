const express         = require('express');
const path            = require('path');
const bodyParser      = require('body-parser');
const session         = require('express-session');
const MongoStore      = require('connect-mongo');
const passport        = require('passport');
const flash           = require('connect-flash');  // Import connect-flash
const LocalStrategy   = require('passport-local').Strategy;
const populateNavData = require('./middleware/populateNavData');

const app = express();
const port = 3000;

const { Page, Log, User, Role, connectDB } = require('./models');

const pagesRouter    = require('./routes/pages');
const usersRouter    = require('./routes/users');
const rolesRouter    = require('./routes/roles');
const logsRouter     = require('./routes/logs');
const authRouter     = require('./routes/auth');
const accountRouter  = require('./routes/account');
const templateRouter = require('./routes/templates');
const imagesRouter   = require('./routes/images');

const { ensureAuthenticated, ensureAdmin } = require('./middleware/auth');

connectDB();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static('uploads'));

// Populate navigation data middleware
app.use(populateNavData);  // Use the middleware for every request

// Connect flash middleware
app.use(flash());  // Use connect-flash

app.use(session({
  secret: 'b77f0fb7aba13547f30493569980c924ab18111a5ce0ed09507c135330216e1647fde3ec4f2e351f26845ccac08c24cc25f36d482d1a198ff46a65e5021d8e9d', // Use the generated secret key
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: 'mongodb://127.0.0.1:27017/config' })
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(async (username, password, done) => {
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return done(null, false, { message: 'Incorrect username.' });
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return done(null, false, { message: 'Incorrect password.' });
    }
    return done(null, user);
  } catch (err) {
    return done(err);
  }
}));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

// Middleware to fetch pages for navigation
app.use(async (req, res, next) => {
  try {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null;  // Make the user object available in templates
    res.locals.pages = await Page.find();
    next();
  } catch (error) {
    next(error);
  }
});

// Middleware to make user available in templates
app.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});

app.use('/', pagesRouter);
app.use('/', usersRouter);
app.use('/', rolesRouter);
app.use('/', logsRouter);
app.use('/', authRouter);
app.use('/', accountRouter);
app.use('/', templateRouter);
app.use('/', imagesRouter);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
