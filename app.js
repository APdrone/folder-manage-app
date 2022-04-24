const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const port = 3000;

app.post("/create", (req, res) => {
  const current_TimeStamp = new Date();
  const hours = current_TimeStamp.getHours().toString();
  const minutes = current_TimeStamp.getMinutes().toString();
  const secs = current_TimeStamp.getSeconds().toString();
  const day = current_TimeStamp.getDate().toString();
  const month = (current_TimeStamp.getMonth() + 1).toString();
  const year = current_TimeStamp.getFullYear().toString();

  fs.mkdirSync(__dirname + "/new", { recursive: true }, (err) => {
    if (err) throw err;
  });

  const fileName = `${
    day + "." + month + "." + year + "__" + hours + "_" + minutes + "_" + secs
  }.txt`;

  fs.appendFileSync(
    path.join(__dirname + "/new", fileName),

    current_TimeStamp.toString() + "\n",
    (err) => {
      if (err) {
        console.log(err);
      }
      console.log('The "data to append" was appended to file!');
    }
  );

  res.status(201).send({
    Success: true,
    Status: "File Created successfully",
  });
});

app.get("/allFiles", (req, res) => {
  const fileNames = fs
    .readdirSync(`${__dirname}/new`, { withFileTypes: true })
    .filter((item) => !item.isDirectory())
    .map((item) => item.name);

  res.status(200).send({
    TotalFiles: fileNames.length,
    Files: fileNames,
  });
});

app.listen(port, () => {
  console.log(`App running on the port ${port}`);
});
