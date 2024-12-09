const mysql = require('mysql') ;
// buat konfigurasi koneksi
const koneksi = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'latihanrestapi'
});

// koneksi databse
koneksi.connect((err) => {
    if (err) throw err;
    console.log('mysql connected...');
    });

module.exports = koneksi 