const mongoose=require('mongoose');
const mongoURI='mongodb://127.0.0.1/notebook?directConnection=true&tls=false&readPreference=primary';
const  connectToMongo=()=>{
      mongoose.connect(mongoURI).then( console.log("connect to mongo"));
}

module.exports=connectToMongo;