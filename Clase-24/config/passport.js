const passport= require('passport')
const local= require('passport-local')
const {validatePassword}= require('../utils.js')
const userModel= require('../models/User.js')

const LocalStrategy= local.Strategy; 

const initializeStrategies= ()=>{
    passport.use('login', new LocalStrategy({usernameField: 'gmail'}, async (gmail, password, done)=>{
        if(!gmail || !password) return done(null, false, {message: 'Campos vacios'});
        const exist= await userModel.findOne({email: gmail});
        if(!exist) return done(null, false, {message: 'El usuario no existe'})
        const passValidada= await validatePassword(password, exist.password)
        if(passValidada== false) return done(null, false, {message:'La contraseña es invalida'})
        return done(null, exist)
    }))

    passport.serializeUser((user, done)=>{
        done(null, user._id)
    })

    passport.deserializeUser(async (id, done)=>{
        const result=await userModel.findOne({_id: id})
        done(null,result)
    })
}


module.exports= initializeStrategies
