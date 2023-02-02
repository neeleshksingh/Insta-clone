const express = require('express')
const Post = require('../model/model')
const bodyParser = require('body-parser')
const multer = require('multer')
const path = require('path')
const fs = require('fs')

const router = express.Router()
router.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.json())

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'images')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})
const upload = multer({ storage: storage })

router.post('/posts', upload.single('photu'), async (req, res) => {
    console.log(req.file)
    try {
        let { name, location, description, likes, Date } = req.body
        if (name && location && description) {
            let data = await Post.create({ likes, Date, name, location, description, PostImage: { data: fs.readFileSync(path.join(__dirname, '..', 'images/' + req.file.filename)), contentType: 'image/png' }, })
            return res.status(201).json({ message: 'Post Created', data })
        }
        else {
            return res.status(400).json({ message: 'details are missing' })
        }
    }
    catch (err) {
        return res.status(400).json({ message: err.message })
    }
})

router.get('/posts', async (req, res) => {
    try {
        let data = await Post.find().sort({ $natural: -1 })
        return res.status(200).json(data)
    }
    catch (err) {
        return res.status(400).json({ message: err.message })
    }
})

router.delete('/posts/:id', async (req, res)=>{
    try{
        const user = await Post.deleteOne({_id : req.params.id});
        res.status(200).json({
            status: "Success",
            user
        })
    }catch(e){
        res.status(500).json({
            status: "Failed",
            message: e.message
        })
    }
})

module.exports = router