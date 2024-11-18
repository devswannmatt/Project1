const mongoose = require('mongoose');
const fs       = require('fs');
const path     = require('path');

// Helper function to convert a string to camelCase
const toCamelCase = (str) => {
  return str
    .replace(/[-_](.)/g, (_, char) => char.toUpperCase())
    .replace(/^(.)/, (char) => char.toLowerCase());
};

// Helper function to infer schema types
const inferSchemaType = (value) => {
  if (typeof value === 'string') {
    return { type: 'String' };
  } else if (typeof value === 'number') {
    return { type: 'Number' };
  } else if (typeof value === 'boolean') {
    return { type: 'Boolean' };
  } else if (Array.isArray(value)) {
    if (value.length > 0) {
      return [{ type: inferSchemaType(value[0]).type }];
    } else {
      return [{ type: 'mongoose.Schema.Types.Mixed' }];
    }
  } else if (typeof value === 'object' && value !== null) {
    const nestedSchema = {};
    for (const [nestedKey, nestedValue] of Object.entries(value)) {
      nestedSchema[nestedKey] = inferSchemaType(nestedValue);
    }
    return nestedSchema;
  } else {
    return { type: 'mongoose.Schema.Types.Mixed' };
  }
};

// Custom function to convert schema definition to a string
const schemaDefinitionToString = (schemaDefinition) => {
  return JSON.stringify(schemaDefinition, null, 2)
    .replace(/"type": "(\w+)"/g, 'type: $1')
    .replace(/"(\w+)":/g, '$1:') // Remove quotes around keys
    .replace(/"/g, ''); // Remove quotes around values
};

const createModelAndCrudEndpoints = (filePath, modelName) => {
  try {
    // Read the file contents
    const fileContent = fs.readFileSync(path.resolve(filePath), 'utf8');
    const parsedData = JSON.parse(fileContent);

    const schemaDefinition = {};
    for (const [key, value] of Object.entries(parsedData)) {
      schemaDefinition[key] = inferSchemaType(value);
    }

    const schemaString = schemaDefinitionToString(schemaDefinition);

    // Create paths for the model and routes
    const modelPath = path.join(__dirname, '../models', `${toCamelCase(modelName)}.js`);
    const routesPath = path.join(__dirname, '../routes', `${toCamelCase(modelName)}Routes.js`);

    // Define the model file content
    const modelFileContent = `
const mongoose = require('mongoose');

const ${modelName}Schema = new mongoose.Schema(${schemaString});

module.exports = mongoose.model('${modelName}', ${modelName}Schema);
    `;

    // Write the Mongoose model to the models folder
    fs.writeFileSync(modelPath, modelFileContent.trim());
    console.log(`Model saved to ${modelPath}`);

    // Define the CRUD routes file content, including the example endpoint
    const crudFileContent = `
const express = require('express');
const router = express.Router();
const ${modelName} = require('../models/${toCamelCase(modelName)}');

// Route to display the form for creating a new Person
router.get('/${modelName.toLowerCase()}/create', (req, res) => {
  res.render('person', { title: 'Create Person' });
});

// Create a new ${modelName}
router.post('/api/${modelName.toLowerCase()}', async (req, res) => {
  try {
    const new${modelName} = new ${modelName}(req.body);
    const saved${modelName} = await new${modelName}.save();
    res.status(201).json(saved${modelName});
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all ${modelName}s
router.get('/api/${modelName.toLowerCase()}/${modelName.toLowerCase()}s', async (req, res) => {
  try {
    const ${modelName.toLowerCase()}s = await ${modelName}.find();
    res.json(${modelName.toLowerCase()}s);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a single ${modelName} by ID
router.get('/api/${modelName.toLowerCase()}/:id', async (req, res) => {
  try {
    const ${modelName.toLowerCase()} = await ${modelName}.findById(req.params.id);
    if (!${modelName.toLowerCase()}) return res.status(404).json({ message: '${modelName} not found' });
    res.json(${modelName.toLowerCase()});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a ${modelName} by ID
router.put('/api/${modelName.toLowerCase()}/:id', async (req, res) => {
  try {
    const updated${modelName} = await ${modelName}.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated${modelName}) return res.status(404).json({ message: '${modelName} not found' });
    res.json(updated${modelName});
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a ${modelName} by ID
router.delete('/api/${modelName.toLowerCase()}/:id', async (req, res) => {
  try {
    const deleted${modelName} = await ${modelName}.findByIdAndDelete(req.params.id);
    if (!deleted${modelName}) return res.status(404).json({ message: '${modelName} not found' });
    res.json({ message: '${modelName} deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Example object for ${modelName}
const exampleObject = ${JSON.stringify(parsedData, null, 2)};

// Post the example object
router.get('/api/${modelName.toLowerCase()}/example', (req, res) => {
  res.json(exampleObject);
});

module.exports = router;
    `;

    // Write the CRUD routes to the routes folder
    fs.writeFileSync(routesPath, crudFileContent.trim());
    console.log(`CRUD routes saved to ${routesPath}`);
  } catch (error) {
    console.error('Error creating model and CRUD endpoints:', error);
  }
};

const addTableRow = () => {
    let addTableRow = `      tr\n`;
    addTableRow += `        td\n`;
    return addTableRow
}

function toTitleCase(str) {
    return str.replace(
      /\w\S*/g,
      text => text.charAt(0).toUpperCase() + text.substring(1).toLowerCase()
    );
}

function field(string) {
    return `          ${string} \n`
}

function setType(value) {
    if (typeof value === 'string') return 'text'
    if (typeof value === 'number') return 'number'
    if (typeof value === 'boolean') return 'checkbox'
}

// Helper function to generate a Pug form from a JSON object
const generatePugForm = (modelName, parsedData) => {
  let formFields = '    table.table\n';

  // Iterate through each key-value pair in the parsed JSON object to create form inputs
  for (const [key, value] of Object.entries(parsedData)) {

    formFields += addTableRow()
    if (typeof value === 'object' && value !== null) {
        for (const key of Object.keys(value)) {
            formFields += field(`+formInput('${key}', '${setType(key)}', '${toTitleCase(key)}')`);
        }
    } else {
        formFields += field(`+formInput('${key}', '${setType(value)}', '${toTitleCase(key)}')`)
    }
  }
  formFields += addTableRow()
  formFields += field(`+formButton('Save Changes', 'submit', 'btn-success pull-right', 'save')`)

  // Construct the Pug form content
  return `
include partials/header

block content
  h1 Create ${modelName}
  form(action="/api/${modelName.toLowerCase()}", method="post")
${formFields}
  
include partials/footer`;
};

const createModelAndCrudEndpointsAndView = (filePath, modelName) => {
  try {
    // Read the file contents
    const fileContent = fs.readFileSync(path.resolve(filePath), 'utf8');
    const parsedData = JSON.parse(fileContent);

    // Create paths for the views
    const viewPath = path.join(__dirname, '../views', `${toCamelCase(modelName)}.pug`);

    // Generate the Pug form content
    const pugFormContent = generatePugForm(modelName, parsedData);

    // Write the Pug file to the views folder
    fs.writeFileSync(viewPath, pugFormContent.trim());
    console.log(`Form view saved to ${viewPath}`);
  } catch (error) {
    console.error('Error creating model, CRUD endpoints, and view:', error);
  }
};

// Example usage with the updated file path
createModelAndCrudEndpointsAndView('../models/templates/person.json', 'Person');
// Example usage with the updated file path
createModelAndCrudEndpoints('../models/templates/person.json', 'Person');
