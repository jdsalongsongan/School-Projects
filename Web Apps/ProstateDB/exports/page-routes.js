const express = require('express');
const path = require('path');
const router = express.Router();

let initialPath = path.join(__dirname);

router.get('/', (req, res) => {
    res.sendFile(path.join(initialPath, "../view/index.html"))
})

router.get('/login', (req, res) => {
    res.sendFile(path.join(initialPath, "../view/login.html"))
})

router.get('/add-patient', (req, res) => {
    res.sendFile(path.join(initialPath, "../view/demographics.html"))
})

router.get('/view-patient', (req, res) => {
    res.sendFile(path.join(initialPath, "../view/view-patient.html"))
})

router.get('/search', (req, res) => {
    res.sendFile(path.join(initialPath, "../view/search.html"))
})

router.get('/count', (req, res) => {
    res.sendFile(path.join(initialPath, "../view/count.html"))
})

router.get('/therapy', (req, res) => {
    res.sendFile(path.join(initialPath, "../view/theraphy.html"))
})

router.get('/post-therapy', (req, res) => {
    res.sendFile(path.join(initialPath, "../view/post-theraphy.html"))
})

router.get('/follow-up', (req, res) => {
    res.sendFile(path.join(initialPath, "../view/follow-up.html"))
})

module.exports = router