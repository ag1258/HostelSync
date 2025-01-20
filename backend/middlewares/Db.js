const mongoose=require('mongoose');

const url = 'mongodb+srv://Ananya:ananya123@cluster0.cccoiol.mongodb.net/hostelsync?retryWrites=true&w=majority&appName=Cluster0';

const Dbconnect=async()=>
    {
        try{
            await mongoose.connect(url)
            console.log('Db connected');
        }
        catch(err)
        {
            console.log(err);
        }
    }    
module.exports=Dbconnect;