// // require("dotenv").config();
// const express = require("express");
// const app = express();

// const bodyParser = require("body-parser");

// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());

// app.use((req, res, next) => {
//   console.log("request_method", req.method);
//   next();
// });

// function protectMiddleware(req, res, next) {
//     next();
// }

// app.post("/health_check", protectMiddleware, (req, res) => {
//   console.log("endpoint was accessed");
//   res.status(200).send("test_string");
// });

// app.post('/upload', )

// app.listen(5000, () => console.log(`App is up and working on port ${5000}`));

console.log(1);
setTimeout(() => {
  console.log(2);
});
new Promise((resolve, reject) => resolve(console.log(3)));
console.log(4);
console.log(5);
Promise.resolve(console.log(6)).then(() => {
  console.log(7);
});
console.log(8);


//1
//3
//4
//5
//6
//8
//7
//2
