const express = require('express')
const router=new express.Router()
const ToDo = require('../models/task')
const auth=require('../middleware/auth')

router.post('/tasks',auth,async(req,res)=>{

    const task = new ToDo({
        ...req.body,
        owner: req.user._id
    })

    try {
        await task.save()
        res.status(201).send(task)
    } catch (e) {
        res.status(400).send(e)
    }
    })
    
    router.get('/tasks',auth, async(req,res)=>{
        try {
            await req.user.populate('tasks').execPopulate()
         
            res.send(req.user.tasks)
        } catch (e) {
            res.status(500).send()
        }
    })
    
    router.get('/tasks/:id',auth, async(req,res)=>{
    
        const _id=req.params.id
        try{
            
            const task=await ToDo.findOne({_id, owner: req.user._id})
            if(!task){
                res.status(404).send()
            }
            res.status(200).send(task)
            
        }
        catch(e){
            res.status(500).send(e)
        }
       
      })
      router.patch("/tasks/:id",auth , async(req,res)=>{
        const updates=Object.keys(req.body)
        const allowedUpdate=['description','completed']
        const isValid=updates.every((update)=>allowedUpdate.includes(update))
        if(!isValid){
            return res.status(400).send("Error: Invalid updates")
        }
        try{

            const task=await ToDo.findOne({_id:req.params.id , owner : req.user._id})
            updates.forEach((update)=>task[update]=req.body[update])
            await task.save()
            
            if(!task){
                res.status(401).send()
            }
            res.status(202).send(task)
    
        }
        catch(e){
            res.status(400).send(e)
        }
    })
    
    router.delete('/tasks/:id',auth ,async(req,res)=>{
        try{
            const task=await ToDo.findOneAndDelete({_id:req.params.id,owner:req.user._id})
            if(!task){
                return res.status(404).send()
            }
            res.status(200).send(task)
        }
        catch(e){
            res.status(500).send(e)
        }
    })

    module.exports=router
    