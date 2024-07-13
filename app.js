const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const { Page, connectDB } = require('./models');
const app = express();
const port = 3000;

connectDB();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Middleware to parse the body of POST requests
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Middleware to fetch pages for navigation
app.use(async (req, res, next) => {
  try {
    res.locals.pages = await Page.find();
    next();
  } catch (error) {
    next(error);
  }
});

app.get('/', async (req, res) => {
  try {
    const pages = await Page.find();
    res.render('index', { title: 'Pages', pages });
  } catch (error) {
    console.error('Error fetching pages:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/page/:id', async (req, res) => {
  try {
    const page = await Page.findById(req.params.id);
    if (page) {
      res.render('page', { title: page.title, page });
    } else {
      res.status(404).send('Page not found');
    }
  } catch (error) {
    console.error('Error fetching page:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/add', (req, res) => {
  res.render('add', { title: 'Add Page' });
});

app.post('/add', async (req, res) => {
  try {
    const { title, content } = req.body;
    const page = new Page({ title, content });
    await page.save();
    res.redirect('/');
  } catch (error) {
    console.error('Error adding page:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/edit/:id', async (req, res) => {
  try {
    const page = await Page.findById(req.params.id);
    if (page) {
      res.render('edit', { title: 'Edit Page', page });
    } else {
      res.status(404).send('Page not found');
    }
  } catch (error) {
    console.error('Error fetching page for edit:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.post('/edit/:id', async (req, res) => {
  try {
    const { title, content } = req.body;
    await Page.findByIdAndUpdate(req.params.id, { title, content });
    res.redirect(`/page/${req.params.id}`);
  } catch (error) {
    console.error('Error updating page:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.post('/delete/:id', async (req, res) => {
  try {
    await Page.findByIdAndDelete(req.params.id);
    res.redirect('/');
  } catch (error) {
    console.error('Error deleting page:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
