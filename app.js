const express = require('express');
const bodyparser = require('body-parser');
const koneksi = require('./ggg/database');
const app = express();
const jwt = require('jsonwebtoken');
const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt');
const PORT = process.env.PORT || 3000;

// set body parser
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));

// create data / insert data
app.post('/api/latihan', (req, res) => {
    // buat variabel penampung  data dan query sql
    const data = {...req.body };
    const querySql = 'INSERT INTO latihan SET?';
    
    // jalankan query
    koneksi.query(querySql, data, (err, rows, field) => {
        if (err) {
            return res.status(500).json({ message: 'Gagal insert data!', error: err });
        }

        res.status(201).json({ success: true, message: 'Data berhasil diinsert!' });
    });
});

// read data / get data
app.get('/api/latihan', (req, res) => {
    // buat query sql
    const querySql = 'SELECT * FROM latihan';
    // jalankan query
    koneksi.query(querySql, (err, rows, field) => {
    // error handling
    if (err) {
    return res.status(500).json({ message: 'Ada kesalahan', error: err });
    }
    // jika request berhasil
    res.status(200).json({ success: true, data: rows });
    });
});

// update data
app.put('/api/latihan/:id', (req, res) => {
    // buat variabel penampung data dan query sql
    const data = { ...req.body };
    const querySearch = 'SELECT * FROM latihan WHERE id = ?';
    const queryUpdate = 'UPDATE latihan SET ? WHERE id = ?';
    // jalankan query untuk melakukan pencarian data
    koneksi.query(querySearch, req.params.id, (err, rows, field) => {
    // error handling
    if (err) {
    return res.status(500).json({ message: 'Ada kesalahan', error: err });
    }
    // jika id yang dimasukkan sesuai dengan data yang ada di db
if (rows.length) {
    // jalankan query update
    koneksi.query(queryUpdate, [data, req.params.id], (err, rows, field) => {
    // error handling
    if (err) {
    return res.status(500).json({ message: 'Ada kesalahan', error: err });
    }
    // jika update berhasil
    res.status(200).json({ success: true, message: 'Berhasil update data!' });
    });
    } else {
    return res.status(404).json({ message: 'Data tidak ditemukan!', success: false });
    }
    });
});

// delete data
app.delete('/api/latihan/:id', (req, res) => {
    // buat query sql untuk mencari data dan hapus
    const querySearch = 'SELECT * FROM latihan WHERE id = ?';
    const queryDelete = 'DELETE FROM latihan WHERE id = ?';
    // jalankan query untuk melakukan pencarian data
    koneksi.query(querySearch, req.params.id, (err, rows, field) => {
        // error handling
        if (err) {
        return res.status(500).json({ message: 'Ada kesalahan', error: err });
        }
        // jika id yang dimasukkan sesuai dengan data yang ada di db
        if (rows.length) {
        // jalankan query delete
        koneksi.query(queryDelete, req.params.id, (err, rows, field) => {
        // error handling
        if (err) {
        return res.status(500).json({ message: 'Ada kesalahan', error: err });
        }
        // jika delete berhasil
        res.status(200).json({ success: true, message: 'Berhasil hapus data!' });
    });
    } else {
    return res.status(404).json({ message: 'Data tidak ditemukan!', success: false });
    }
    });
});


// buat server nya
app.listen(PORT, () => console.log(`server running at port: ${PORT}`));