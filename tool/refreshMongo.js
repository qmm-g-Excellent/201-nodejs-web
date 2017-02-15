 const mongoose = require("mongoose");
 const refreshMongo = require("./mongoTool");

 mongoose.connect('mongodb://localhost/supermarket', (err)=>{
   if(err){
     console.log('connect err');
   }else{
     console.log('connect success!');
     refreshMongo(()=>{
        process.exit(0);
     })
   }
 });