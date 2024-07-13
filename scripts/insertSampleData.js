const { Page, connectDB } = require('../models');

(async () => {
  await connectDB();

  await Page.create({
    title: 'Sample Page',
    content: 'This is a sample page content.',
  });

  console.log('Sample data inserted.');
  process.exit();
})();
