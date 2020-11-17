const {Router} = require('express');
const router = Router();
const task = require('../models/task')

router.get('/',async(req,res)=>{
    const tasks = await task.find();
    res.render('index.html',{
        tasks
    });
})

router.post('/add',async(req,res)=>{
    const newTask = new task(req.body)
    await newTask.save();
    res.redirect('/')

})

router.get('/delete/:id',async(req,res)=>{
    console.log(req.params)
    const {id} = req.params;
    await task.deleteOne({_id:id});
    res.redirect('/')
})

router.get('/turn/:id',async(req,res)=>{
    const {id} = req.params;
    const newTask = await task.findById(id);
    newTask.status = !newTask.status;
    await newTask.save()
    res.redirect('/')
})

router.get('/edit/:id', async(req,res) =>{
    const {id}=req.params;
    const newTask = await task.findById(id);
    res.render('edit.html',{
        newTask
    })
})

router.post('/edit/:id', async(req,res) =>{
    const {id} = req.params
    await task.updateOne({_id:id},req.body);
    res.redirect('/')
})

module.exports = router;
