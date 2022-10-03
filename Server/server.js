const { request, response } = require('express');
const express = require('express');

//initilization

const app = express();
app.use(express.json()); //applicatio now will use json format for data

const port = 8081;

const toDOList = ["Complete Node Byte", "Play Cricket"];

app.get("/todos",(request,response)=>{

    response.status(200).send(toDOList);
});
app.post("/todos",(request,response)=>{
    //callback
    let newToDoItem = request.body.item;
    toDOList.push(newToDoItem);
    response.status(201).send({
        message: "Task complted",
    });
});

app.delete("/todos",(request,response)=>{
   const itemToDelete = request.body.item;
   
   toDOList.find((element,index)=>{
    if(element===itemToDelete){
        toDOList.splice(index,1);
    }
   });
   response.status(202).send({
    message: `Deleted item - ${request.body.item}`,
   })
});
//  app.all("/todos",(request,response)=>{
    response.status(501).send();
//  });
app.all("*",(request,response)=>{
    response.status(404).send();
})
app.listen(port,()=>{
    console.log(`Nodejs server started on port ${port}`);
});