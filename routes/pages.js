const express = require('express');
const router  = express.Router();
const multer  = require('multer');
const path    = require('path');
const Page    = require('../models/page');
const Image   = require('../models/image');
const Log     = require('../models/log');
const { ensureAuthenticated, ensureAdmin } = require('../middleware/auth');

console.log('Log', Log)

// Set up Multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) { cb(null, 'uploads/'); },
  filename: function (req, file, cb)    { cb(null, Date.now() + path.extname(file.originalname)); }
});

// Initialize upload middleware
const upload = multer({ storage: storage });

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
  console.log('')
  try {
    const page = await Page.findById(req.params.id).populate('template').populate('category');
    if (!page) {
      req.flash('error_msg', 'Page not found');
      return res.redirect('/');
    }

    const payload = { title: page.title, page }

    var target = `missing`
    if (page.template && page.template.location) payload.template = page.template.location
    if (page.template && page.template.name)     target = `templates/${page.template.location}`

    res.render(target, payload);
  } catch (err) {
    console.error('Error fetching page:', err);
    req.flash('error_msg', 'Error fetching page');
    res.redirect('/');
  }
});

router.get('/pages/edit/:id', ensureAuthenticated, async (req, res) => {
  try {
    const page = await Page.findById(req.params.id).populate('template').populate('category');
    res.render('edit', { title: 'Edit Page', page });
  } catch (err) {
    console.error(err);
    req.flash('error_msg', 'Error fetching page or game systems');
    res.redirect('/logs');
  }
});

router.post('/pages', ensureAuthenticated, async (req, res) => {
  console.log('Pages')
  const { title, content, category, template } = req.body;

  try {
    const newPage = new Page({ title, content, category, template });
    await newPage.save();
    
    req.flash('success_msg', 'Page created successfully');
    res.redirect('/');
  } catch (err) {
    console.error(err);
    req.flash('error_msg', 'Error creating page');
    res.send('Failed');
  }
});

router.post('/add', ensureAuthenticated, ensureAdmin, async (req, res) => {
  const { title, content, category, template } = req.body;
  try {
    const page = new Page({ title, content, category, template });
    await page.save();

    Log.postLog(`Page: ${title} (${req.params.id})`, 'Create', true)
    res.redirect('/');
  } catch (err) {
    Log.postLog(`Page: ${title} (${req.params.id}) - ${err}`, 'Create')
    res.redirect('/logs');
  }
});

// Get upload form
router.get('/upload', ensureAuthenticated, (req, res) => {
  res.render('upload', { title: 'Upload Image', error: null, success: null });
});

// Route to delete a page
router.post('/pages/delete/:id', async (req, res) => {
  try {
    await Page.findByIdAndDelete(req.params.id);
    req.flash('success_msg', 'Page deleted successfully');
    res.redirect('/');
  } catch (err) {
    console.error('Error deleting page:', err);
    req.flash('error_msg', 'Error deleting page');
    res.redirect(`/pages/edit/${req.params.id}`);
  }
});

// Update an existing page
router.post('/pages/edit/:id', ensureAuthenticated, async (req, res) => {
  console.log('Update')
  const { title, content, category, template } = req.body;

  try {
    await Page.findByIdAndUpdate(req.params.id, { title, content, category, template });
    Log.postLog(`Page: ${title} (${req.params.id})`, 'Edit', true)
    res.redirect(`/page/${req.params.id}`);
  } catch (err) {
    Log.postLog(`Page: ${title} (${req.params.id}) - ${err}`, 'Error')
    res.redirect(`/pages/edit/${req.params.id}`);
  }
});

// Handle image upload
router.post('/upload', ensureAuthenticated, upload.single('image'), async (req, res) => {
  if (!req.file) {
    return res.render('upload', { title: 'Upload Image', error: 'No file uploaded', success: null });
  }
  const newImage = new Image({filename: req.file.filename});

  try {
    await newImage.save();
    res.render('upload', { title: 'Upload Image', error: null, success: 'File uploaded successfully!' });
  } catch (error) {
    res.render('upload', { title: 'Upload Image', error: 'Error saving image metadata', success: null });
  }
});

// Get gallery
router.get('/gallery', ensureAuthenticated, async (req, res) => {
  try {
    const files  = await Image.find().sort({ uploadDate: -1 }).populate('category');
    const images = filterByExtenstion(/\.(jpg|jpeg|png|gif|bmp|webp|svg)$/i, files)
    const pdfs   = filterByExtenstion(/\.(pdf)$/i, files)

    res.render('gallery', { title: 'Gallery', images, pdfs });
  } catch (error) {
    console.error('Error fetching images:', error);
    res.status(500).send('Internal Server Error');
  }
});

function filterByExtenstion(extensions, files) {
  return files.filter(image => extensions.test(image.filename));
}

module.exports = router;
