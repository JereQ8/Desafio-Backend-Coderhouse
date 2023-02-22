const bcrypt= require('bcrypt')

const createHash= async (password)=>{
    const salts= await bcrypt.genSalt(10)
    return bcrypt.hash(password, salts)
}

const validatePassword = async(password,userPassword) =>{
    return bcrypt.compare(password,userPassword);
}

module.exports= { createHash, validatePassword }