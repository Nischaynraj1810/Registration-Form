const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const path = require("path");

const app = express();
dotenv.config();

const port = process.env.PORT || 3000;

const username = process.env.MONGODB_USERNAME;
const password = process.env.MONGODB_PASSWORD;

mongoose.connect(`mongodb+srv://nischaynraj1318:nischaynagraj45@cluster0.rohe26d.mongodb.net/RegistrartionDB`, { 
}).then(() => {
    console.log("Connected to MongoDB");
}).catch((error) => {
    console.error("MongoDB connection error:", error);
});

// Registration schema
const registrationSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
});

// Model of schema
const Registration = mongoose.model("Registration", registrationSchema);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/pages/index.html"));
});

app.post("/register", async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const registrationData = new Registration({
            name,
            email,
            password,
        });
        await registrationData.save();
        res.redirect("/success");
    } catch (error) {
        console.log(error);
        res.redirect("/error");
    }
});

app.get("/success", (req, res) => {
    res.sendFile(path.join(__dirname, "/pages/success.html"));
});

app.get("/error", (req, res) => {
    res.sendFile(path.join(__dirname, "/pages/error.html"));
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
