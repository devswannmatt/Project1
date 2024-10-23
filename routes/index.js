const pagesRouter      = require('./pages');
const usersRouter      = require('./users');
const rolesRouter      = require('./roles');
const logsRouter       = require('./logs');
const authRouter       = require('./auth');
const accountRouter    = require('./account');
const templateRouter   = require('./templates');
const imagesRouter     = require('./images');
const gameSystemRouter = require('./gameSystem');
const warmasterRouter  = require('./warmaster/warmaster');

module.exports = { pagesRouter, usersRouter, rolesRouter, logsRouter, authRouter, accountRouter, templateRouter, imagesRouter, gameSystemRouter, warmasterRouter };