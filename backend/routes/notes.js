const express=require('express');
const router=express.Router();
var fetchuser=require('../middleware/fetchuser');
const Notes=require('../models/Notes');
const { body, validationResult } = require('express-validator');

//get all the notes

router.get('/fetchallnotes',fetchuser, async (req,res)=>{

    const notes=await Notes.find({user:req.user.id})
    res.json(notes);
})
// add a note
router.post('/addnote',fetchuser,[

    body('title',"enter a valid title").isLength({ min: 3 }),
    body('description',"description must be atleast 5 cahracters").isLength({min:5})
], async (req,res)=>{

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });

     
}
notes=await Notes.create({
    user:req.user.id,
    title:req.body.title,
    description:req.body.description,
    tag:req.body.tag
})

res.json(notes);


})

// update a note

router.put('/updatenote/:id',fetchuser, async (req,res)=>{
    const{title,description,tag}=req.body;
    const newNote={};
    if(title){newNote.title=title}
    if(description){newNote.description=description}
    if(tag){newNote.tag=tag}

    let note=await Notes.findById(req.params.id);
    if(!note){return res.status(401).send("Not found")}
    if(note.user.toString()!=req.user.id)
    {
        return res.status(401).send("Not Allowed")

    }
    note=await Notes.findByIdAndUpdate(req.params.id, {$set: newNote}, {new:true});
    res.json({note});

})

//delete an existing note

router.delete('/deletenote/:id',fetchuser, async (req,res)=>{

    let note=await Notes.findById(req.params.id);
    if(!note){return res.status(401).send("Not found")}
    if(note.user.toString()!=req.user.id)
    {
        return res.status(401).send("Not Allowed")

    }
    note=await Notes.findByIdAndDelete(req.params.id);
    res.json({"Success":"Note has been deleted","note":note});

})

module.exports=router