const express = require('express');
const router = express.Router();
const { ensureAuthenticated, ensureAdmin } = require('../middleware/auth');
const Page = require('../models/page');

// Route to render the homepage
router.get('/', async (req, res) => {
  try {
    const pages = await Page.find();
    res.render('index', { title: 'Home', pages });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

router.get('/add', ensureAuthenticated, ensureAdmin, (req, res) => {
  res.render('add', { title: 'Add Page' });
});

router.get('/page/:id', async (req, res) => {
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

router.get('/pages/new', ensureAuthenticated, async (req, res) => {
  try {
    const gameSystems = await GameSystem.find();
    res.render('newPage', { title: 'Create New Page', gameSystems });
  } catch (err) {
    console.error(err);
    req.flash('error_msg', 'Error loading game systems');
    res.redirect('/pages');
  }
});

// Create a new page
router.post('/pages', ensureAuthenticated, async (req, res) => {
  const { title, content, category } = req.body;

  try {
    const newPage = new Page({
      title,
      content,
      category
    });
    
    await newPage.save();
    req.flash('success_msg', 'Page created successfully');
    res.redirect('/');
  } catch (err) {
    console.error(err);
    req.flash('error_msg', 'Error creating page');
    res.redirect('/pages/new');
  }
});

router.post('/add', ensureAuthenticated, ensureAdmin, async (req, res) => {
  try {
    const { title, content } = req.body;
    const page = new Page({ title, content });
    await page.save();

    const log = new Log({ message: `Page created: ${title}` });
    await log.save();

    res.redirect('/');
  } catch (error) {
    console.error('Error adding page:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Get the form to edit an existing page
router.get('/pages/edit/:id', ensureAuthenticated, async (req, res) => {
  try {
    const page = await Page.findById(req.params.id);
    const gameSystems = await GameSystem.find();
    res.render('edit', { title: 'Edit Page', page, gameSystems });
  } catch (err) {
    console.error(err);
    req.flash('error_msg', 'Error fetching page or game systems');
    res.redirect('/pages');
  }
});

router.post('/edit/:id', ensureAuthenticated, async (req, res) => {
  try {
    const { title, content } = req.body;
    await Page.findByIdAndUpdate(req.params.id, { title, content });

    const log = new Log({ message: `Page edited: ${title}` });
    await log.save();

    res.redirect(`/page/${req.params.id}`);
  } catch (error) {
    console.error('Error updating page:', error);
    res.status(500).send('Internal Server Error');
  }
});


router.post('/delete/:id', ensureAuthenticated, async (req, res) => {
  try {
    await Page.findByIdAndDelete(req.params.id);
    res.redirect('/');
  } catch (error) {
    console.error('Error deleting page:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Update an existing page
router.post('/pages/edit/:id', ensureAuthenticated, async (req, res) => {
  const { title, content, category } = req.body;

  try {
    await Page.findByIdAndUpdate(req.params.id, { title, content, category });
    req.flash('success_msg', 'Page updated successfully');
    res.redirect('/');
  } catch (err) {
    console.error(err);
    req.flash('error_msg', 'Error updating page');
    res.redirect(`/pages/edit/${req.params.id}`);
  }
});

module.exports = router;
