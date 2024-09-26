const fs = require('fs');
const mongoose = require('mongoose');
const WFRPItem = require('../models/wfrp/wfrpItem');
const WFRPSources = require('../models/wfrp/wfrpSources');

const db = 'mongodb://127.0.0.1:27017/config';

mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

const fetchWFRPSources = async () => {
    try {
        var sources = await WFRPSources.find();
        console.log('sources', sources)
        fs.readFile('./uploads/data/items.json', 'utf8', (err, fileContents) => {
            if (err) {
                console.error("Error reading file:", err);
                return;
            }
        
            try {
                let items = JSON.parse(fileContents);
                let extractedData = items.data.map(item => {
                    var convertedSources = []
                    Object.keys(item.object.source).forEach((key, index) => {
                        item.object.source[key] = item.object.source[key].replace("p. ", "").replace("Miscellanea ", "").split(',')
                        convertedSources.push({source: sources[key]._id, pages: item.object.source[key]})
                        console.log('convertedSources', convertedSources)
                    })
                    
                    return {
                        name: item.object.name,
                        desc: item.object.description,
                        price: item.object.price,
                        enc: item.object.enc,
                        // source: item.object.source,
                        sources: convertedSources
                    }
                });
                
                populateWFRPItems(extractedData)

            } catch (parseErr) {
                console.error("Error parsing JSON:", parseErr);
            }
        });

    } catch (err) {
      console.error('Error populating WFRP Sources:', err);
    }
};

fetchWFRPSources()

const populateWFRPItems = async (extractedData) => {
    console.log(extractedData[0])
    try {
      await WFRPItem.deleteMany();
      await WFRPItem.insertMany(extractedData);
      console.log('WFRP Items Updated');
      mongoose.connection.close();
    } catch (err) {
      console.error('Error populating WFRP Items:', err);
      mongoose.connection.close();
    }
};

console.log('Finished')