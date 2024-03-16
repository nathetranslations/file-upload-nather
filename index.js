const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Set up Multer for file upload
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

// Serve static files (if any)
app.use(express.static(path.join(__dirname, 'public')));

// Route to handle file upload
app.post('/upload', upload.single('file'), (req, res) => {
    res.send('File uploaded successfully.');
});

// Export the Express app
module.exports = app;