const express=require('express')
const app=express();
const fs=require("fs");
const PORT=8000;
app.use(express.json());
const student=[
 {id: 1, name:"annu the don", branch:"billu mafia da leader"},
 {id: 2, name:"annu da dhaba", branch:"billu mafia da karamchaari"},
 {id: 3, name:"annu di gaddi", branch:"billu mafia da billu badmosh"}]

 //ROUTE TO HOMEPAGE
app.get("/",(req,res)=>{
    res.send("welcome to home page");
})

//  1) GET METHOD
//  a) ROUTE TO STUDENT PAGE WHERE ALL REGISTERED STUDENT DETAILS ARE PRESENT
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

// b) STUDENT CAN BE SEARCHED USING THEIR IDS
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



// 2) POST METHOD
// a) ADDING NEW STUDENT: without database
app.post("/student/register", (req, res) => {
  const data = req.body;

  if (!data || !data.name || !data.branch|| !data.id) {
    return res.status(400).send("Please provide student details");
  }
  

  const validID=student.find( student=>student.id===data.id)
  if(validID){
    return res.status(409).send("id already exists")
  }

 
  student.push(data);
  res.status(201).json({
    message: "Student registered successfully",
    student: data
  });
});


// b) ADDING STUDENT: using database(students.json)
app.post("student/register2",(req,res)=>{
    const{name,branch}=req.body;
    if(!name|| !branch) return res.status(400).send("Details missing");
    //send the file first
    // fs.readFile("./student.json","utf-8",(err,data)=>{
    //     if(err) return res.status(500).send("could not read file");

    //     //parsing existing data or start with empty array
    //     const student=JSON.parse(data||"[]");
    const existing=readStudentsFromFile();

        // create and push new student
        const newStudent={
            id: student.length>0?student[student.length-1].id+1:1,
            name,
            branch
        };
        student.push(newStudent);

        //write the whole array back to the file (overwriting)
        fs.writeFile("./student.json",JSON.stringify(student,null,2), (err)=>{
            if(err) return res.status(500).send("error in writing the file");

            //only send response inside the success callback
            return res
                .status(201)
                .json({message:"Registered!!!", student:newStudent});
        })

    })
//})


//UPDATE THE STUDENT DETAIL
app.put("/student/update/:id",(req, res) =>{
  const Id = Number(req.params.id);
  const index = student.findIndex(s => s.id === Id) // 1
  const user = student[index];
 
  if(!user) {
    res.status(404).json("User Not found");
    return;
  }

  student[index] = { ...student[index], ...req.body
  }
  res.status(200).json({
    message:"User Updated Sucessfully",
    student: student[index]
  })
})


const readStudentsFromFile=()=>{
    const results=fs.readFile("./student.json","utf-8",(err,data)=>{
        const students=JSON.parse(data||"[]");
        return students;

    })
    
}


app.listen(PORT,()=>{
    console.log("Server is listening on port: 8000");
})