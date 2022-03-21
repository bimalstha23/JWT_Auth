const express = require("express");
const app = express();
require("./Database");
app.use(express.json());
let port= process.env.PORT || 8000;

app.listen(port,()=>{
    console.log(`Server Running at Port: ${port}`);
})