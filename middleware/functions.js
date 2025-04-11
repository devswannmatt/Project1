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

// Helper function to convert a string to camelCase
const toCamelCase = (str) => {
    if (typeof str !== 'string') return str
    return str
      .replace(/[-_](.)/g, (_, char) => char.toUpperCase())
      .replace(/^(.)/, (char) => char.toLowerCase());
};
  
const toTitleCase = (str) => {
    if (typeof str !== 'string') return str
    return str.replace(
        /\w\S*/g,
        text => text.charAt(0).toUpperCase() + text.substring(1).toLowerCase()
    );
}

module.exports = {
    populateFunctions,
    toCamelCase,
    toTitleCase
};