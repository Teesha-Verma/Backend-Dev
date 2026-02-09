

//DAY2- LEARNING FUNCTIONS: without dataase

const express=require('express')
const app=express()
const PORT=8000;
app.use(express.json());
const student=[
 {id: 1, name:"annu the don", branch:"billu mafia da leader"},
 {id: 2, name:"annu da dhaba", branch:"billu mafia da karamchaari"},
 {id: 3, name:"annu di gaddi", branch:"billu mafia da billu badmosh"}]

//  1) GET METHOD
 // a)ROUTE TO HOMEPAGE
app.get("/",(req,res)=>{
    res.send("welcome to home page");
})



//  b) ROUTE TO STUDENT PAGE WHERE ALL REGISTERED STUDENT DETAILS ARE PRESENT
app.get("/student",(req,res)=>{
    const branch =req.query.branch;
    if(!branch){
        return res.json(student)
    }
    const foundStudents=student.filter(
        (s)=>s.branch===branch
    );
    res.json(foundStudents)
}
)

// c) STUDENTS CAN BE SEARCHED BY THEIR BRANCH
app.get("/students/search", (req, res) => {
  const branch = req.query.branch;

  if (!branch) {
    return res.status(400).send("please provide query parameter");
  }
  const foundStudents = student.filter((s) => s.branch == branch);
  return res.json(foundStudents);
});


// d) STUDENT CAN BE SEARCHED USING THEIR IDS
app.get("/student/:id",(req,res)=>{
    const id=req.params.id;
    const foundStudent=student.find(
        (s)=>s.id==id
    );
    if(!foundStudent){
        return res.status(404).send("student not found");
    }
    res.json(foundStudent);
});



//---------------------------------------------------------------------------------------------



// 2) POST METHOD
// a) ADDING NEW STUDENT
app.post("/student/register", (req, res) => {
  const data = req.body;

  if (!data || !data.name || !data.branch|| !data.id) {
    return res.status(400).send("Please provide student details");
  }
  
  student.push(data);
  res.status(201).json({
    message: "Student registered successfully",
    student: data
  });
});



//===================================================================================================


app.listen(PORT,()=>{
    console.log("Server is listening on port: 8000");
})