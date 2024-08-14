const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../middleware/auth');
const PageContent = require('../models/pageContent');

// Render the form to add a new template
router.get('/templates/new', ensureAuthenticated, (req, res) => {
  res.render('addTemplate', { title: 'Add New Page Template' });
});

// Handle form submission to create a new template
router.post('/templates', ensureAuthenticated, async (req, res) => {
  const { name, description, location } = req.body;

  try {
    const newTemplate = new PageContent({
      name,
      description,
      location
    });

    await newTemplate.save();
    req.flash('success_msg', 'Page template added successfully');
    res.redirect('/templates/new');
  } catch (err) {
    console.error('Error adding page template:', err);
    req.flash('error_msg', 'Error adding page template');
    res.redirect('/templates/new');
  }
});

module.exports = router;
