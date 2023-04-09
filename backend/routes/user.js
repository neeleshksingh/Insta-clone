const express = require('express')
const Post = require('../model/model')
const bodyParser = require('body-parser')

const router = express.Router()
router.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.json())

router.post('/posts', async (req, res) => {
    console.log(req.file)
    try {
        let { name, location, description, likes, Date, PostImage } = req.body
        if (name && location && description && PostImage) {
            let data = await Post.create({ likes, Date, name, location, description, PostImage })
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

router.delete('/posts/:id', async (req, res) => {
    try {
        const user = await Post.deleteOne({ _id: req.params.id });
        res.status(200).json({
            status: "Success",
            user
        })
    } catch (e) {
        res.status(500).json({
            status: "Failed",
            message: e.message
        })
    }
})

module.exports = router