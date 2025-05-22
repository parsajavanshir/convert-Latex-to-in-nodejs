const express = require("express");
const app = express();

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }));

const text = require("./routes/text");

app.get("/", (req, res) => {
    res.send("Live");
});

app.use('/text', text);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

const port = 3000;
app.listen(port, () => console.log(`Devserver live on http://localhost:${port}`));
