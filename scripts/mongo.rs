mongo
use mongodb://127.0.0.1:27017/config
db.pages.find().pretty()  // Check the pages collection
db.pagecontents.find().pretty()  // Check the pageContents collection