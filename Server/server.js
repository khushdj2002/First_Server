const http =require("http");

const port = 8081;

const toDOList = ["Complete Node Byte", "Play Cricket"];

http
    .createServer((request,response)=>{
    const {method,url} = request;

    if(url === "/todos"){
        if(method === "GET"){
            response.writeHead(200, {'Content-Type':"text/html"});
            response.write(toDOList.toString())
            // response.write(toDoList);
        }
        else if(method==="POST"){
            let body="";
            request.on("error",(err) => {
                console.error(err);
            }).on("data",(chunk)=>{
                body+=chunk;
           //     console.log(chunk);
            }).on("end",()=>{
                body =JSON.parse(body);
                let newToDo = toDOList;
                newToDo.push(body.item);
                console.log(newToDo);
                response.writeHead(201)
            });
        }
        else if(method==="DELETE"){
            let body = "";
            request.on("error",(err)=>{
                console.error(err);
            }).on("data",(chunk)=>{
                body+=chunk;
            }).on("end",()=>{
                body=JSON.parse(body);
                let deleteThis=(body.item);
                // for(let i=0;i<toDOList.length;i++){
                //     if(toDOList[i]===deleteThis){
                //         toDOList.splice(i,1);
                //         break;
                //     }
                // }

                toDOList.find((element, index)=>{
                    if(element===deleteThis){
                        toDOList.splice(index,1);
                    }
                });

               response.writeHead(204); 
            });
        }
        else
        response.writeHead(404);
    } 

    response.end();

})
    .listen(port,()=>{
    console.log(`Nodejs server started on port ${port}`);
});

// http://localhost:8081/todos
