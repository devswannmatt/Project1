const fs = require('fs');
const mongoose = require('mongoose');
const WFRPItem = require('../models/wfrp/wfrpItem');

const db = 'mongodb://127.0.0.1:27017/config';

mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

var payload

fs.readFile('./uploads/data/items.json', 'utf8', (err, fileContents) => {
    if (err) {
        console.error("Error reading file:", err);
        return;
    }

    try {
        let items = JSON.parse(fileContents);
        let extractedData = items.data.map(item => {

            Object.keys(item.object.source).forEach((key) => {
                item.object.source[key] = item.object.source[key].replace("p. ", "").replace("Miscellanea ", "").split(',') }
            )

            return {
                name: item.object.name,
                desc: item.object.description,
                price: item.object.price,
                enc: item.object.enc,
                source: item.object.source
            }
        });
        var jsonData = JSON.stringify(extractedData);

        payload = extractedData

        fs.writeFile('./uploads/data/items_compressed.json', jsonData, (err) => {
            if (err) {
                console.error('Error writing to file', err);
            } else {
                console.log('Data successfully written to items_compressed.json');
            }
        });

    } catch (parseErr) {
        console.error("Error parsing JSON:", parseErr);
    }
});

const populateWFPRItems = async () => {
    try {
      await WFRPItem.deleteMany();
      await WFRPItem.insertMany(payload);
      console.log('WFRP Items Updated');
      mongoose.connection.close();
    } catch (err) {
      console.error('Error populating WFRP Items:', err);
      mongoose.connection.close();
    }
};

populateWFPRItems()


console.log('Finished')