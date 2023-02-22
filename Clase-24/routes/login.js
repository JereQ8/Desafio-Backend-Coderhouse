const {Router}= require('express')
const userModel= require('../models/User.js')
const { validatePassword } = require('../utils.js')
const passport= require('passport')

const router= Router()

router.get('/login', (req, res)=>{
    res.render('login')
})

router.post('/login',passport.authenticate('login',{failureRedirect:'/loginFail',failureMessage:true}), async (req, res)=>{
    const user= req.user
    req.session.user= {
        id: user._id,
        gmail: user.email,
        role: user.role,
        name: user.name
    }
    // console.log(req.session.user)
    res.status(200).send({status: 'Success', message:'Usuario logueado exitosamente'})
})

router.get('/loginFail', (req, res)=>{
    res.render('loginFail')
})

router.get('/check', (req, res)=>{ 
    res.render('check', {user: req.session.user})
    // console.log(req.session.user)
})

module.exports= router