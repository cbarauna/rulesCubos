const express = require("express");
var fs = require("fs");

const app = express();

app.use(express.json());

app.use(require("./routes"));

// app.get("/", (req, res) => {
//   // fs.open("./src/files/day.json", "w", (err, fd) => {
//   //   if (err) throw err;
//   //   //res.send();
//   //   // fs.close(fd, err => {
//   //   //   if (err) throw err;
//   //   // });
//   // });

//   // fs.appendFile("./src/files/day.json", day, function(err) {
//   //   if (err) throw err;
//   //   console.log("Saved!");
//   // });

//   // fs.writeFile(
//   //   "./src/files/day.json",
//   //   `{'day':'{'data':${new Date()}}}`,
//   //   { enconding: "utf-8", flag: "a" },
//   //   function(err) {
//   //     if (err) throw err;
//   //     console.log("Arquivo salvo!");
//   //   }
//   // );

//  // let file = "./src/files/day.json";
//   // fs.access(file, fs.constants.W_OK, err => {
//   //   console.log(`${file} ${err ? "is not writable" : "is writable"}`);
//   // });

//   //Funciona
//   // fs.readFile(file, "utf-8", (err, data) => {
//   //   if (err) throw err;
//   //   res.send(data);
//   // });

//   // fs.writeFile(
//   //   file,
//   //   "Hello World!\n",
//   //   { enconding: "utf-8", flag: "w" },
//   //   function(err) {
//   //     if (err) throw err;
//   //     console.log("Arquivo salvo!");
//   //   }
//   // );

//   // fs.appendFile(file, " This is my text.", function(err) {
//   //   if (err) throw err;
//   //   console.log("Updated!");
//   // });
// });

app.listen(3000, () => {
  console.log("server Started on port 3000");
});
