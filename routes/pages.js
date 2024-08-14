const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { ensureAuthenticated, ensureAdmin } = require('../middleware/auth');
const Page = require('../models/page');
const Image = require('../models/image');


// Set up Multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Upload directory
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Append timestamp and file extension
  }
});

// Initialize upload middleware
const upload = multer({ storage: storage });

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
  console.log('Add')
  res.render('add', { title: 'Add Page' });
});

router.get('/page/:id', async (req, res) => {
  console.log('Page')
  try {
    const page = await Page.findById(req.params.id).populate('template');
    if (!page) {
      req.flash('error_msg', 'Page not found');
      return res.redirect('/');
    }

    const payload = { title: page.title, page }

    if (page.template && page.template.location) payload.template = page.template.location

    // Render the page with the dynamic template inclusion
    res.render(`pages/${page.template.name}`, payload);
  } catch (err) {
    console.error('Error fetching page:', err);
    req.flash('error_msg', 'Error fetching page');
    res.redirect('/');
  }
});

// Create a new page
router.post('/pages', ensureAuthenticated, async (req, res) => {
  console.log('Pages')
  const { title, content, category, template } = req.body;
  console.log('template', template)

  try {
    const newPage = new Page({ title, content, category, template });
    
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
    const { title, content, category, template } = req.body;
    const page = new Page({ title, content, category, template });
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
  console.log('Page Edit ID')
  try {
    const page = await Page.findById(req.params.id);
    res.render('edit', { title: 'Edit Page', page });
  } catch (err) {
    console.error(err);
    req.flash('error_msg', 'Error fetching page or game systems');
    res.redirect('/pages');
  }
});

// Get upload form
router.get('/upload', ensureAuthenticated, (req, res) => {
  res.render('upload', { title: 'Upload Image', error: null, success: null });
});

router.post('/edit/:id', ensureAuthenticated, async (req, res) => {
  console.log('POST Page Edit ID')
  try {
    const { title, content, category, template } = req.body;
    console.log('req.body', req.body)

    await Page.findByIdAndUpdate(req.params.id, { title, content, category, template });

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
  console.log('Update')
  const { title, content, category, template } = req.body;
  console.log('Update > 1', template)
  try {
    await Page.findByIdAndUpdate(req.params.id, { title, content, category, template });
    req.flash('success_msg', 'Page updated successfully');
    res.redirect('/');
  } catch (err) {
    console.error(err);
    req.flash('error_msg', 'Error updating page');
    res.redirect(`/pages/edit/${req.params.id}`);
  }
});

// Handle image upload
router.post('/upload', ensureAuthenticated, upload.single('image'), async (req, res) => {
  if (!req.file) {
    return res.render('upload', { title: 'Upload Image', error: 'No file uploaded', success: null });
  }

  // Save image metadata to the database
  const newImage = new Image({
    filename: req.file.filename
  });

  try {
    await newImage.save();
    res.render('upload', { title: 'Upload Image', error: null, success: 'File uploaded successfully!' });
  } catch (error) {
    console.error('Error saving image metadata:', error);
    res.render('upload', { title: 'Upload Image', error: 'Error saving image metadata', success: null });
  }
});

// Get gallery
router.get('/gallery', ensureAuthenticated, async (req, res) => {
  try {
    const images = await Image.find().sort({ uploadDate: -1 });
    res.render('gallery', { title: 'Gallery', images });
  } catch (error) {
    console.error('Error fetching images:', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
