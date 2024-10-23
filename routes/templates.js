const express = require('express');
const router = express.Router();
const { ensureAuthenticated, ensureAdmin } = require('../middleware/auth');
const Template = require('../models/template');
const fs = require('fs');
const path = require('path');

// Render the form to add a new template
router.get('/templates/add', ensureAuthenticated, (req, res) => {
  console.log('template')
  res.render('template', { title: 'Add New Page Template', template: null });
});

// Route to get the list of templates
router.get('/templates', ensureAuthenticated, async (req, res) => {
  try {
    const templates = await Template.find();
    res.render('templateList', { templates });
  } catch (error) {
    console.error('Error fetching templates:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Route to get the edit page for a specific template
router.get('/templates/edit/:id', ensureAuthenticated, async (req, res) => {
  try {
    const template = await Template.findById(req.params.id);
    if (!template) {
      return res.status(404).send('Template not found');
    }
    res.render('template', { template });
  } catch (error) {
    console.error('Error fetching template:', error);
    res.status(500).send('Internal Server Error');
  }
});

// POST route to create a new template
router.post('/templates/add', ensureAuthenticated, async (req, res) => {
  try {
    const { name, description, location } = req.body;

    const existingTemplate = await Template.findOne({ name });
    if (existingTemplate) {
      return res.render('template', { errorMessage: 'A template with this name already exists.' });
    }

    createTemplate(location)

    const template = new Template({ name, description, location });
    await template.save();

    res.redirect('/templates');
  } catch (error) {
    console.error('Error adding template:', error);
    res.render('template', { errorMessage: 'Internal Server Error' });
  }
});

// POST route to edit an existing template
router.post('/templates/edit/:id', ensureAuthenticated, async (req, res) => {
  try {
    const { name, description, location } = req.body;
    const templateId = req.params.id;

    const existingTemplate = await Template.findOne({ name, _id: { $ne: templateId } });
    if (existingTemplate) {
      return res.render('template', { template: existingTemplate, errorMessage: 'A template with this name already exists.' });
    }

    await Template.findByIdAndUpdate(templateId, { name, description, location });
    
    createTemplate(location)

    res.redirect('/templates');
  } catch (error) {
    console.error('Error updating template:', error);
    res.render('template', { template: await Template.findById(req.params.id), errorMessage: 'Internal Server Error' });
  }
});

// Delete a template by ID
router.post('/templates/delete/:id', ensureAuthenticated, async (req, res) => {
  try {
    const templateId = req.params.id;
    await Template.findByIdAndDelete(templateId);
    res.redirect('/templates'); // Redirect to the template list or appropriate page
  } catch (error) {
    console.error('Error deleting template:', error);
    res.status(500).send('Internal Server Error');
  }
});

const createTemplate = async (location) => {
  try {
    // Define the path for the new .pug file
    const pugFilePath = path.join(__dirname, '../views/templates', `${location}.pug`);

    // Check if the file already exists
    if (!fs.existsSync(pugFilePath)) {
      // Create the new .pug file with some default content
      const defaultContent = `
extends ../page

block content
  p Created in the front-end!`;
      fs.writeFileSync(pugFilePath, defaultContent.trim());
      console.log(`Created new template file at ${pugFilePath}`);
    } else {
      console.log(`Template file at ${pugFilePath} already exists.`);
    }
  } catch (error) {
    console.error('Error creating template:', error);
  }
};

module.exports = router;
