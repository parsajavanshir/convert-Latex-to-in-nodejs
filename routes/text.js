const express = require("express");
const router = express.Router();
const fs = require("fs");
const { exec } = require('child_process');

router.post("/", (req, res) => {
    const name = req.body.text;

    const t =
        "\\documentclass{article}\n" +
        "\\usepackage[a4paper,top=2.5cm,right=3cm,bottom=2.5cm,left=2.5cm]{geometry}\n" +
        "\\usepackage{xepersian}\n" +
        "\\settextfont{DejaVu Sans}\n" +
        "\\title{" + name + "}\n" +
        "\\author{" + name + "}\n" +
        "\\date{۱ خرداد ۱۴۰۰}\n" +
        "\\begin{document}\n" +
        "\\maketitle\n" +
        name + "\n" +
        "\\begin{flushleft}\n" +
        "\\end{flushleft}\n" +
        "\\begin{center}\n" +
        "سلام\n" +
        name + "\n" +
        "\\end{center}\n" +
        "\\end{document}";

    fs.writeFile('1latex.tex', t, (err) => {
        if (err) {
            console.error("Error writing file:", err);
            return res.status(500).send("Error writing LaTeX file");
        }

        exec('xelatex 1latex.tex', (error, stdout, stderr) => {
            if (error) {
                console.error(`xelatex error: ${error.message}`);
                return res.status(500).send("Error compiling LaTeX");
            }
            if (stderr) {
                console.error(`xelatex stderr: ${stderr}`);
            }
            console.log(`xelatex stdout: ${stdout}`);

            res.send("LaTeX compiled successfully");
        });
    });
});

module.exports = router;
