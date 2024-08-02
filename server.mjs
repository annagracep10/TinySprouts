import express from 'express';
import multer from 'multer';
import path from 'path';
import cors from 'cors'; 
import { fileURLToPath } from 'url';

// Create directory path based on current file's location
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 5000;

// Use CORS middleware
app.use(cors());

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, 'public/images')); // Directory to save images
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); 
  }
});

const upload = multer({ storage: storage });

app.post('/upload', upload.single('image'), (req, res) => {
  try {
    res.status(200).json({ message: 'Image uploaded successfully', filePath: `/uploads/${req.file.filename}` });
  } catch (error) {
    res.status(500).json({ message: 'Image upload failed', error });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
