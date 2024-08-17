const express = require('express');
const router = express.Router();
const Image = require('../models/image');
const GameSystem = require('../models/gameSystem');

router.get('/images/edit/:id', async (req, res) => {
  try {
    const image = await Image.findById(req.params.id);
    const gameSystems = await GameSystem.find();

    if (!image) {
      req.flash('error_msg', 'Image not found');
      return res.redirect('/gallery');
    }

    res.render('editImage', { 
      title: 'Edit Image', 
      image, 
      gameSystems 
    });
  } catch (err) {
    console.error('Error fetching image:', err);
    req.flash('error_msg', 'Error fetching image');
    res.redirect('/gallery');
  }
});

router.post('/images/edit/:id', async (req, res) => {
  const { name, description, category, owner } = req.body;

  try {
    const image = await Image.findById(req.params.id);

    if (!image) {
      req.flash('error_msg', 'Image not found');
      return res.redirect('/gallery');
    }

    image.name = name;
    image.description = description;
    image.category = category;
    image.owner = owner;

    await image.save();
    req.flash('success_msg', 'Image updated successfully');
    res.redirect('/gallery');
  } catch (err) {
    console.error('Error editing image:', err);
    req.flash('error_msg', 'Error editing image');
    res.redirect(`/edit/${req.params.id}`);
  }
});

// Route to delete an image
router.post('/images/delete/:id', async (req, res) => {
  try {
    await Image.findByIdAndDelete(req.params.id);
    req.flash('success_msg', 'Image deleted successfully');
    res.redirect('/gallery');
  } catch (err) {
    console.error('Error deleting image:', err);
    req.flash('error_msg', 'Error deleting image');
    res.redirect(`/images/edit/${req.params.id}`);
  }
});

module.exports = router;
