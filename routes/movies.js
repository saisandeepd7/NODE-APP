import express from "express"
const router=express.Router()
import { getallmovies, getmoviebyid, addmovie, deletemovie, editmovie } from "./helper.js"



router.get("/",async function(req,res){
    if(req.query.rating){
      req.query.rating=+req.query.rating
    }
    const movies= await getallmovies(req)
    
   res.send(movies)
  })
  router.get("/:id",async function(req,res){
    const { id }=req.params
    console.log(req.params,id)
   
  
    const movie= await getmoviebyid(id)
  // const movie= movies.find((mv)=>mv.id===id)
    console.log(movie)
    movie ? res.send(movie) : res.status(404).send({msg:"movies not found"})
  })
    router.post("/",async function(req,res){
      const data=req.body
      console.log(data)
    
     const result = await addmovie(data)
     res.send(result)
   })
  
   router.delete("/:id",async function(req,res){
    const { id }=req.params
    console.log(req.params,id)
   
  
    const result= await deletemovie(id)
  
    console.log(result)
    result.deletedCount > 0
    ? res.send(("Movie Deleted"))
    : res.status(404).send(("Movie not found"))
   }) 
  
   router.put("/:id",async function(req,res){
    const { id }=req.params
    console.log(req.params,id)
   const data=req.body
  
    const result= await editmovie(id, data)
    res.send(result)
    
   })
  
   export const moviesRouter=router


