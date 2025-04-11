const mongoose = require('mongoose');
const User = require('../../models/user'); // Adjust the path if your user model is in a different directory

const mongoUrl = 'mongodb://127.0.0.1:27017/config'; // Use your MongoDB connection string

const grantAdminRole = async () => {
  try {
    await mongoose.connect(mongoUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const username = 'admin';
    const user = await User.findOne({ username });

    if (!user) {
      console.log(`User with username "${username}" not found.`);
      return;
    }

    user.role = 'admin';
    await user.save();

    console.log(`Role of user "${username}" has been updated to admin.`);
  } catch (error) {
    console.error('Error updating user role:', error);
  } finally {
    mongoose.connection.close();
  }
};

grantAdminRole();
