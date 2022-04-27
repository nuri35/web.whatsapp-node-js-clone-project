const mongoose = require("mongoose")
const {
  DB_HOST,
  DB_PORT,
  DB_NAME,
  DB_USER,
  DB_PASSWORD
} = process.env;

 async function main() {

          
           try{
     
              if(process.env.NODE_ENV === "localhost"){
               
                await mongoose.connect(`mongodb://localhost:${process.env.MONGO_DB_LOCAL}/${process.env.DB_NAME}`,{
                  
                    useNewUrlParser:true,
                    useUnifiedTopology:true
                });
              }
          
      
          console.log(process.env.NODE_ENV + " modunda baglantı salandı");
     


           }catch(err){
            console.log(err+"baglantı saglanamadı")
        }
      
          
      
    


  }


 

module.exports = {
  main

};

