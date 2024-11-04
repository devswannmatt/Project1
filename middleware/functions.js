async function populateFunctions(req, res, next) {
    try {
        res.locals.functions = {}

        // res.locals.functions.format.cellValue = (value) => {
        //     if (!value) return '-'
        //     let parts = value.split('/')
        //     return `${parts[0]} / ${parts[1]}`
        // }
    
      next();
    } catch (err) {
      next();
    }
}

module.exports = populateFunctions;