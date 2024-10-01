const Log = require('../models/log');

async function populateLog(req, res, next) {
    try {
        res.locals.success = req.flash('success');
        res.locals.error   = req.flash('error');

        if (res.locals.success.length) {
            console.log('LOG res.locals.success', res.locals.success)
            // Log.postLog()
        }

        if (res.locals.error.length) {
            console.log('LOG res.locals.error', res.locals.error)
            res.locals.error.forEach(err => {
                if (err.log) Log.postLog(err.log, 'Login Attempt', false)
            });
        }

        next();
    } catch (error) {
        next(error);
    }
}

module.exports = populateLog;