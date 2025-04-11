const express = require('express');
  const router = express.Router();
  const Roster = require('../models/roster');
  
  // Route to display the form for creating a new Roster
  router.get('/roster/create', (req, res) => {
    res.render('roster', { title: 'Create Roster' });
  });
  
  // Create a new Roster
  router.post('/api/roster', async (req, res) => {
    try {
      const newRoster = new Roster(req.body);
      const savedRoster = await newRoster.save();
      res.redirect('./roster/create').json(savedRoster);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
  
  // Get all Rosters
  router.get('/api/roster/rosters', async (req, res) => {
    try {
      const rosters = await Roster.find();
      res.json(rosters);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  // Get a single Roster by ID
  router.get('/api/roster/:id', async (req, res) => {
    try {
      const roster = await Roster.findById(req.params.id);
      if (!roster) return res.status(404).json({ message: 'Roster not found' });
      res.json(roster);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  // Update a Roster by ID
  router.put('/api/roster/:id', async (req, res) => {
    try {
      const updatedRoster = await Roster.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!updatedRoster) return res.status(404).json({ message: 'Roster not found' });
      res.json(updatedRoster);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
  
  // Delete a Roster by ID
  router.delete('/api/roster/:id', async (req, res) => {
    try {
      const deletedRoster = await Roster.findByIdAndDelete(req.params.id);
      if (!deletedRoster) return res.status(404).json({ message: 'Roster not found' });
      res.json({ message: 'Roster deleted' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  module.exports = router;