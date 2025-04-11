const mongoose = require('mongoose');
const WFRPSources = require('../../models/wfrp/wfrpSources');

const db = 'mongodb://127.0.0.1:27017/config';

mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

const payload = [
  { name: 'Custom', desc: 'Custom', code: 0 },
  { name: 'WFRP Core Rulebook', desc: 'WFRP Core Rulebook Description', code: 1 },
  { name: 'Unknown', desc: 'Unknown Description', code: 2 },
  { name: 'Archives of the Empire Volume I', desc: 'Unknown Description', code: 3 },
  { name: 'Archives of the Empire Volume II', desc: 'Unknown Description', code: 4 },
  { name: 'Archives of the Empire Volume III', desc: 'Unknown Description', code: 5 },
  { name: 'Up in Arms', desc: 'Up in Arms Description', code: 6 },
  { name: 'Winds of Magic', desc: 'Unknown Description', code: 7 },
  { name: 'Middenheim', desc: 'Unknown Description', code: 8 },
  { name: 'Sea of Claws', desc: 'Unknown Description', code: 9 },
  { name: 'Lustria', desc: 'Unknown Description', code: 10 },
  { name: 'Unknown', desc: 'Unknown Description', code: 11 },
  { name: 'Unknown', desc: 'Unknown Description', code: 12 },
  { name: 'Death of the Reik Companion', desc: 'Unknown Description', code: 13 },
  { name: 'Unknown', desc: 'Unknown Description', code: 14 },
  { name: 'Death of the Reik', desc: 'Unknown Description', code: 15 },
  { name: 'Unknown', desc: 'Unknown Description', code: 16 },
  { name: 'Power Behind the Throne Companion', desc: 'Unknown Description', code: 17 },
  { name: 'The Horned Rat', desc: 'Unknown Description', code: 18 },
  { name: 'The Horned Rat Companion', desc: 'Unknown Description', code: 19 },
  { name: 'Unknown', desc: 'Unknown Description', code: 20 },
  { name: 'Empire in Ruins Companion', desc: 'Unknown Description', code: 21 },
  { name: 'The Imperial Zoo', desc: 'Unknown Description', code: 22 },
  { name: 'Altdorf Crown of the Empire', desc: 'Unknown Description', code: 23 },
  { name: 'Unknown', desc: 'Unknown Description', code: 24 },
  { name: 'Unknown', desc: 'Unknown Description', code: 25 },
  { name: 'Guide to Ubersreik', desc: 'Unknown Description', code: 26 },
  { name: 'Unknown', desc: 'Unknown Description', code: 27 },
  { name: 'Ubersreik Adventures 3', desc: 'Unknown Description', code: 28 },
  { name: 'Tribes and Tribulations', desc: 'Unknown Description', code: 29 },
  { name: 'Reikland Miscellanea', desc: 'Unknown Description', code: 30 },
  { name: 'Patrons Of The Old World', desc: 'Unknown Description', code: 31 },
  { name: 'Unknown', desc: 'Unknown Description', code: 32 },
  { name: 'Unknown', desc: 'Unknown Description', code: 33 },
  { name: 'Unknown', desc: 'Unknown Description', code: 34 },
  { name: 'Shrines Of Sigmar', desc: 'Unknown Description', code: 35 }
];
  
const populateWFRPSources = async () => {
    try {
      await WFRPSources.deleteMany();
      await WFRPSources.insertMany(payload);
      console.log('WFRP Sources Updated');
      mongoose.connection.close();
    } catch (err) {
      console.error('Error populating WFRP Sources:', err);
      mongoose.connection.close();
    }
};

populateWFRPSources()