const express = require('express');
const router = express.Router();
const { ensureAuthenticated, ensureAdmin } = require('../middleware/auth');
const { Page, Log } = require('../models');

router.get('/', async (req, res) => {
  try {
    const pages = await Page.find();
    res.render('index', { title: 'Pages', pages });
  } catch (error) {
    console.error('Error fetching pages:', error);
    res.status(500).send('Internal Server Error');
  }
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

router.get('/add', ensureAuthenticated, ensureAdmin, (req, res) => {
  res.render('add', { title: 'Add Page' });
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

router.get('/edit/:id', ensureAuthenticated, async (req, res) => {
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

module.exports = router;
