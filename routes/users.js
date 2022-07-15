import express from "express"
import { createUser } from "./helper.js"
import { getuserByName } from "./helper.js"
const router=express.Router()
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

async function genHashedPassword(password){
    const NO_OF_ROUNDS = 10
    const salt= await bcrypt.genSalt(NO_OF_ROUNDS)
    const hashedPassword= await bcrypt.hash(password,salt)
    return hashedPassword
   }
   
   genHashedPassword("password@123")



    router.post("/signup",async function(req,res){
      const {username,password}=req.body
      const userFromDB =await getuserByName(username)
   console.log(userFromDB)

   if(userFromDB){
        res.status(400).send({msg : "username already exists"})
   }else if(password.length<8){
    res.status(400).send({msg : "It must be atleast 8 characters"})
   }
   
   else{
    const hashedPassword=await genHashedPassword(password)
    console.log(hashedPassword)

    const result= await createUser({
        username:username,
        password:hashedPassword
    })
    res.send(result)
}
}) 
  
  
router.post("/login",async function(req,res){
    const {username,password}=req.body 
    const userFromDB =await getuserByName(username)
   console.log(userFromDB)

   if (!userFromDB){
    res.status(401).send({message:"invalid credentials"})
   }else{
    const storedPassword=userFromDB.password
    const isPasswordMatch=await bcrypt.compare(password,storedPassword)
    console.log(isPasswordMatch)

    if(isPasswordMatch){
        const token = jwt.sign({ id:userFromDB._id }, process.env.SECRET_KEY); 
        res.send({msg:"successful login",token:token})
    }else{
        res.status(401).send({message:"invalid credentials"})
    }
   }
})
    
   export const usersRouter=router


