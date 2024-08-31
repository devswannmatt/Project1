const express = require('express');
const router = express.Router();
const GameSystem = require('../models/gameSystem');

// GET: Display all game systems
router.get('/game-systems/', async (req, res) => {
  try {
    const gameSystems = await GameSystem.find();
    res.render('gameSystemsList', { gameSystems });
  } catch (error) {
    console.error('Error fetching game systems:', error);
    res.status(500).send('Internal Server Error');
  }
});

// GET: Display form to create a new game system
router.get('/game-systems/add', (req, res) => {
  res.render('addGameSystem', { gameSystem: {} });
});

// POST: Create a new game system
router.post('/add', async (req, res) => {
  try {
    const { name, code, description } = req.body;
    const gameSystem = new GameSystem({ name, code, description });
    await gameSystem.save();
    res.redirect('/game-systems');
  } catch (error) {
    console.error('Error creating game system:', error);
    res.status(400).render('addGameSystem', { error: 'Failed to create game system', gameSystem: req.body });
  }
});

// GET: Display form to edit a game system
router.get('/game-systems/edit/:id', async (req, res) => {
  try {
    const gameSystem = await GameSystem.findById(req.params.id);
    if (!gameSystem) {
      return res.status(404).send('Game System not found');
    }
    res.render('gamesystem', { gameSystem });
  } catch (error) {
    console.error('Error fetching game system:', error);
    res.status(500).send('Internal Server Error');
  }
});

// POST: Update a game system
router.post('/game-systems/edit/:id', async (req, res) => {
  try {
    const { name, code, description } = req.body;
    await GameSystem.findByIdAndUpdate(req.params.id, { name, code, description });
    res.redirect('/game-systems');
  } catch (error) {
    console.error('Error updating game system:', error);
    res.status(400).render('editGameSystem', { error: 'Failed to update game system', gameSystem: req.body });
  }
});

// POST: Delete a game system
router.post('/game-systems/delete/:id', async (req, res) => {
  try {
    await GameSystem.findByIdAndDelete(req.params.id);
    res.redirect('/game-systems');
  } catch (error) {
    console.error('Error deleting game system:', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
