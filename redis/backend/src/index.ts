const express = require("express");
const bodyParser = require("body-parser");
const { createClient } = require("redis");

const app = express();


app.use(bodyParser.json());

const client = createClient();
client.connect().then(() => console.log("Redis connected"));
//@ts-ignore
app.post("/submit", async (req, res) => {
    console.log("BODY RECEIVED:", req.body);

    const { code } = req.body || {};

    if (!code) {
        return res.status(400).json({ error: "Missing 'code' in request body" });
    }

    await client.lPush("submissions", JSON.stringify({ code }));
    res.json({ message: "Submission added to queue" });
});

app.listen(3000, () => console.log("Server started on port 3000"));