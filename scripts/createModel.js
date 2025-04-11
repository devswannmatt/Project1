const mongoose = require('mongoose');
const fs       = require('fs');
const path     = require('path');

const func     = require('../middleware/functions')

// Helper function to infer schema types
const inferSchemaType = (value) => {
  switch (typeof value) {
    case 'string':
      return { type: 'String' };
    case 'number':
      return { type: 'Number' };
    case 'boolean':
      return { type: 'Boolean' };
    case 'object':
      if (Array.isArray(value)) {
        if (value.length > 0) {
          return [{ type: inferSchemaType(value[0]).type }];
        } else {
          return [{ type: 'Array' }];
        }
      } else if (value !== null) {
        const nestedSchema = {};
        for (const [nestedKey, nestedValue] of Object.entries(value)) {
          console.log('nestedKey', nestedKey)
          console.log('nestedValue', nestedValue)
          nestedSchema[nestedKey] = inferSchemaType(nestedValue);
        }
        return nestedSchema;
      } else {
        return { type: 'mongoose.Schema.Types.Mixed' };
      }
    default:
      return { type: 'mongoose.Schema.Types.Mixed' };
  }
};

// Custom function to convert schema definition to a string
const schemaDefinitionToString = (schemaDefinition) => {
  return JSON.stringify(schemaDefinition, null, 2)
    .replace(/"type": "(\w+)"/g, 'type: $1')
    .replace(/"(\w+)":/g, '$1:')
    .replace(/"/g, '');
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

    const modelPath  = path.join(__dirname, '../models', `${func.toCamelCase(modelName)}.js`);
    const routesPath = path.join(__dirname, '../routes', `${func.toCamelCase(modelName)}.js`);
    const viewPath   = path.join(__dirname, '../views', `${func.toCamelCase(modelName)}.pug`);

    const modelFileContent = generateModel(modelName, schemaString).trim();
    fs.writeFileSync(modelPath, modelFileContent);

    const crudFileContent = generateRoutes(modelName)
    fs.writeFileSync(routesPath, crudFileContent.trim());

    const pugFormContent = generatePugForm(modelName, parsedData);
    fs.writeFileSync(viewPath, pugFormContent.trim())
    
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


function field(string) {
  return `          ${string} \n`
}

function setType(value) {
  if (typeof value === 'string') return 'text'
  if (typeof value === 'number') return 'number'
  if (typeof value === 'boolean') return 'checkbox'
}

function generateModel(model, schema) {
  return `
const mongoose = require('mongoose');

const ${model}Schema = new mongoose.Schema(${schema});

module.exports = mongoose.model('${model}', ${model}Schema);
`
}

function generateRoutes(model) {
return`
  const express = require('express');
  const router = express.Router();
  const ${model} = require('../models/${func.toCamelCase(model)}');
  
  // Route to display the form for creating a new ${model}
  router.get('/${model.toLowerCase()}/create', (req, res) => {
    res.render('${model.toLowerCase()}', { title: 'Create ${model}' });
  });
  
  // Create a new ${model}
  router.post('/api/${model.toLowerCase()}', async (req, res) => {
    try {
      const new${model} = new ${model}(req.body);
      const saved${model} = await new${model}.save();
      res.redirect('./${model.toLowerCase()}/create').json(saved${model});
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
  
  // Get all ${model}s
  router.get('/api/${model.toLowerCase()}/${model.toLowerCase()}s', async (req, res) => {
    try {
      const ${model.toLowerCase()}s = await ${model}.find();
      res.json(${model.toLowerCase()}s);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  // Get a single ${model} by ID
  router.get('/api/${model.toLowerCase()}/:id', async (req, res) => {
    try {
      const ${model.toLowerCase()} = await ${model}.findById(req.params.id);
      if (!${model.toLowerCase()}) return res.status(404).json({ message: '${model} not found' });
      res.json(${model.toLowerCase()});
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  // Update a ${model} by ID
  router.put('/api/${model.toLowerCase()}/:id', async (req, res) => {
    try {
      const updated${model} = await ${model}.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!updated${model}) return res.status(404).json({ message: '${model} not found' });
      res.json(updated${model});
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
  
  // Delete a ${model} by ID
  router.delete('/api/${model.toLowerCase()}/:id', async (req, res) => {
    try {
      const deleted${model} = await ${model}.findByIdAndDelete(req.params.id);
      if (!deleted${model}) return res.status(404).json({ message: '${model} not found' });
      res.json({ message: '${model} deleted' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  module.exports = router;
`;
}

const generatePugForm = (model, parsedData) => {
  let formFields = '    table.table\n';

  for (const [key, value] of Object.entries(parsedData)) {

    formFields += addTableRow()
    if (typeof value === 'object' && value !== null) {
        for (const key of Object.keys(value)) {
            formFields += field(`+formInput('${key}', '${setType(key)}', '${func.toTitleCase(key)}')`);
        }
    } else {
        formFields += field(`+formInput('${key}', '${setType(value)}', '${func.toTitleCase(key)}')`)
    }
  }
  formFields += addTableRow()
  formFields += field(`+formButton('Save Changes', 'submit', 'btn-success pull-right', 'save')`)
  
  return `
include partials/header

block content
  h1 Create ${model}
  form(action="/api/${model.toLowerCase()}", method="post")
${formFields}
  
include partials/footer`;
};

const templatesDirectory = path.join(__dirname, '../models/_templates');
fs.readdirSync(templatesDirectory).forEach((file) => {
  if (file.endsWith('.json')) {
    const filePath  = path.join(templatesDirectory, file);
    const modelName = path.basename(file, '.json');

    createModelAndCrudEndpoints(filePath, func.toTitleCase(modelName));
  }
});

//////////////////
// createModelAndCrudEndpoints('../models/_templates/person.json', 'Person');
//////////////////