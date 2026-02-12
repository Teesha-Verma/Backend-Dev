const express = require("express");
const path = require("path");
const app = express();

app.set("view engine", "ejs")
app.use(express.urlencoded({ extended: true }));
const students=[
 {id: 1, name:"annu the don", branch:"billu mafia da leader"},
 {id: 2, name:"annu da dhaba", branch:"billu mafia da karamchaari"},
 {id: 3, name:"annu di gaddi", branch:"billu mafia da billu badmosh"}]



// serve form.html manually
app.get("/", (req, res) => {
  res.render("form",{allStudents:students})
});

app.post("/students/register", (req, res) => {
  console.log(req.body);
  res.send("Student Registered Successfully");

  
});

app.listen(8000, () => {
  console.log("Server running on port 8000");
});