const express = require('express');
const router = express.Router();
const { ensureAuthenticated, ensureAdmin } = require('../middleware/auth');
const { Role, Log } = require('../models');

router.get('/roles', ensureAuthenticated, ensureAdmin, async (req, res) => {
  console.log('GET /roles called');
  try {
    const roles = await Role.find();
    res.render('roles', { title: 'Manage Roles', roles, error: null });
  } catch (error) {
    console.error('Error fetching roles:', error);
    res.status(500).send('Internal Server Error');
  }
});

router.post('/roles', ensureAuthenticated, ensureAdmin, async (req, res) => {
  console.log('POST /roles called');
  try {
    const { name } = req.body;
    const role = new Role({ name });
    await role.save();

    const log = new Log({ message: `Role created: ${name}` });
    await log.save();

    res.redirect('/roles');
  } catch (error) {
    if (error.code === 11000) { // Duplicate key error
      const roles = await Role.find();
      res.render('roles', { title: 'Manage Roles', roles, error: 'Role name must be unique' });
    } else {
      console.error('Error creating role:', error);
      const roles = await Role.find();
      res.render('roles', { title: 'Manage Roles', roles, error: 'Error creating role' });
    }
  }
});

router.post('/roles/edit', ensureAuthenticated, ensureAdmin, async (req, res) => {
  console.log('POST /roles/edit called');
  try {
    const { roleId, name } = req.body;
    if (name === 'admin') {
      const roles = await Role.find();
      return res.render('roles', { title: 'Manage Roles', roles, error: 'Cannot edit the admin role' });
    }
    await Role.findByIdAndUpdate(roleId, { name });

    const log = new Log({ message: `Role updated: ${name}` });
    await log.save();

    res.redirect('/roles');
  } catch (error) {
    if (error.code === 11000) { // Duplicate key error
      const roles = await Role.find();
      res.render('roles', { title: 'Manage Roles', roles, error: 'Role name must be unique' });
    } else {
      console.error('Error updating role:', error);
      const roles = await Role.find();
      res.render('roles', { title: 'Manage Roles', roles, error: 'Error updating role' });
    }
  }
});

router.post('/roles/delete', ensureAuthenticated, ensureAdmin, async (req, res) => {
  console.log('POST /roles/delete called');
  try {
    const { roleId } = req.body;
    const role = await Role.findById(roleId);
    if (role.name === 'admin') {
      const roles = await Role.find();
      return res.render('roles', { title: 'Manage Roles', roles, error: 'Cannot delete the admin role' });
    }
    await Role.findByIdAndDelete(roleId);

    const log = new Log({ message: `Role deleted: ${role.name}` });
    await log.save();

    res.redirect('/roles');
  } catch (error) {
    console.error('Error deleting role:', error);
    const roles = await Role.find();
    res.render('roles', { title: 'Manage Roles', roles, error: 'Error deleting role' });
  }
});

module.exports = router;
