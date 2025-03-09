const express = require("express");
const multer = require("multer");
const Poem = require("../models/poem");
const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, "public/images/"),
    filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

router.get("/", async (req, res) => {
    const poems = await Poem.find().sort({ date: -1 });
    res.render("index", { poems });
});

// Place the /add route BEFORE the /:id route
router.get("/add", (req, res) => res.render("addPoems"));

router.get("/:id", async (req, res) => {
    try {
        const poem = await Poem.findById(req.params.id);
        if (!poem) return res.status(404).send("Poem not found");
        res.render("poem", { poem });
    } catch (error) {
        console.log(error);
        res.status(400).send("Invalid ID");
    }
});

router.post("/add", upload.single("image"), async (req, res) => {
    const { title, content, category } = req.body;
    const image = req.file ? "/images/" + req.file.filename : "";
    await Poem.create({ title, content, image, category });
    res.redirect("/poems");
});

module.exports = router;
