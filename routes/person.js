const express = require('express');
  const router = express.Router();
  const Person = require('../models/person');
  
  // Route to display the form for creating a new Person
  router.get('/person/create', (req, res) => {
    res.render('person', { title: 'Create Person' });
  });
  
  // Create a new Person
  router.post('/api/person', async (req, res) => {
    try {
      const newPerson = new Person(req.body);
      const savedPerson = await newPerson.save();
      res.redirect('./person/create').json(savedPerson);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
  
  // Get all Persons
  router.get('/api/person/persons', async (req, res) => {
    try {
      const persons = await Person.find();
      res.json(persons);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  // Get a single Person by ID
  router.get('/api/person/:id', async (req, res) => {
    try {
      const person = await Person.findById(req.params.id);
      if (!person) return res.status(404).json({ message: 'Person not found' });
      res.json(person);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  // Update a Person by ID
  router.put('/api/person/:id', async (req, res) => {
    try {
      const updatedPerson = await Person.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!updatedPerson) return res.status(404).json({ message: 'Person not found' });
      res.json(updatedPerson);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
  
  // Delete a Person by ID
  router.delete('/api/person/:id', async (req, res) => {
    try {
      const deletedPerson = await Person.findByIdAndDelete(req.params.id);
      if (!deletedPerson) return res.status(404).json({ message: 'Person not found' });
      res.json({ message: 'Person deleted' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  module.exports = router;