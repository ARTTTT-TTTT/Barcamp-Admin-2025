const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Pending = require("./models/pending");
const Topic = require("./models/Topic");
const app = express();
require("dotenv").config();

mongoose
    .connect(process.env.DATABASE_URL)
    .then(() => console.log("connected to Database."));

app.use(express.json());

app.use(
    cors({
        origin: process.env.PRODUCTION ? "*" : "http://localhost:3000",
        methods: "GET,POST,PUT,DELETE",
        credentials: true,
    })
);

app.post("/api2/add_to_pending", (req, res) => {
    Pending.findOneAndUpdate({ id_speaker: req.body.id_speaker }, req.body)
        .then((data) => {
            if (!data) {
                Pending.create(req.body)
                    .then((data) => res.status(200).json(data))
                    .catch((err) => res.status(200).json(err));
            } else {
                res.status(200).json(data);
            }
        })
        .catch((err) => res.status(200).json(err));
});

app.post("/api2/recommend", (req, res) => {
    Pending.findByIdAndUpdate(req.body.id, { recommend: req.body.recommend })
        .then((data) => {
            res.status(200).json(data)
        })
        .catch((err) => res.status(200).json(err));
})

app.post("/api2/get_topic", (req, res) => {


    if (req.body.id) {
        Pending.findOne({ id_speaker: req.body.id }).then((data) => {
            res.status(200).json(data);
        });
    }





});

app.get("/api2/get_all", (req, res) => {
    Pending.find({})
        .then((data) => {
            res.status(200).json(data);
        })
        .catch((err) => res.status(200).json(err));
});

//Add Topic
app.post('/api2/add_topic', async (req, res) => {
    try {

        const data = await req.body

        await Pending.findByIdAndUpdate(data._id, { check: true })

        let category = ""
        if (parseInt(data.category) === 0) {
            category = "Basic"
        }
        if (parseInt(data.category) === 1) {
            category = "Intermediate"
        }
        if (parseInt(data.category) === 2) {
            category = "Advance"
        }
        const topic = await new Topic({ ...data, category })
        await topic.save()

        await res.status(200).send({ message: `Now Added ${topic.title}` })

    } catch (error) {
        await res.status(200).send(error)
    }
})

app.listen(process.env.PORT, () => {
    console.log("Server is running!",process.env.PORT);
});
