const mongoose = require('mongoose');

const PersonSchema = new mongoose.Schema({
  username: {
    type: String
  },
  title: {
    type: String
  },
  fname: {
    type: String
  },
  sname: {
    type: String
  },
  dob: {
    type: String
  },
  email: {
    type: String
  },
  status: {
    admin: {
      type: Boolean
    },
    verified: {
      type: Boolean
    },
    posts: {
      type: Number
    },
    rank: {
      type: Number
    },
    exp: {
      type: Number
    }
  },
  tags: [
    {
      type: String
    }
  ],
  address: {
    street: {
      type: String
    },
    city: {
      type: String
    },
    zip: {
      type: String
    }
  },
  createdAt: {
    type: String
  }
});

module.exports = mongoose.model('Person', PersonSchema);