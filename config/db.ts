import mongoose from 'mongoose';


 const conectarDB=async()=>{
  try {
    await mongoose.connect(process.env.DB_MONGO||"", {

    });
    console.log("conectado a mongo");
  } catch (error) {
    console.log('error en DB');
    process.exit(1);
      
  }
}
export default conectarDB;