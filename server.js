require('dotenv').config();
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const apiRoutes = require('./api/routes/apiRoutes');  // Pastikan rute API ini ada dan berfungsi dengan baik
const app = express();
const cors = require('cors');

// CORS configuration
app.use(cors({
  origin: 'https://pemesanan-online-gelora.vercel.app',  // Ganti dengan URL frontend Anda
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Middleware untuk parsing JSON body (POST, PUT)
app.use(express.json());  // Memungkinkan untuk menerima JSON di body

// Middleware untuk menyajikan file statis
app.use(express.static(path.join(__dirname, 'public')));

// Rute utama untuk halaman utama (index.html)
app.get('/', (req, res) => {
  console.log('Serving index.html');
  res.sendFile(path.join(__dirname, 'public', 'index.html')); 
});

// MongoDB connection (tetap dipertahankan)
mongoose.connect(process.env.MONGODB_URI, {})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
  });

// Routes untuk API
app.use('/api', apiRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
