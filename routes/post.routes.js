


const express = require("express")
const { PostModel } = require("../models/post.model")
const { auth } = require("../middleware/auth.middleware")


const postRouter = express.Router()


// post
postRouter.post("/add", auth, async (req, res) => {
    const { userID } = req.body

    try {

        const data = new PostModel({ ...req.body, userID })
        await data.save()
        res.status(200).json({ msg: "posts added" })

    } catch (err) {
        res.status(400).json({ msg: err.message })
    }
})


//  get
postRouter.get("/", auth, async (req, res) => {
    const { min_comm, max_comm, page } = req.query
    const query = { ...req.query }

    const limit = 3
    const skip = (page - 1) * limit

    delete query.min_comm
    delete query.max_comm
    delete query.page



    //  min_com
    if (min_comm) {
        if (!query.No_of_comments) {
            query.No_of_comments = {}
        }
        query.No_of_comments.$gt = min_comm
    }
    // max_com
    if (max_comm) {
        if (!query.No_of_comments) {
            query.No_of_comments = {}
        }
        query.No_of_comments.$lt = max_comm
    }



    try {

        let data = await PostModel.find({ userID: req.body.userID, ...query }).skip(skip).limit(limit)

        res.status(200).json({ msg: "get data", data })

    } catch (err) {
        res.status(400).json({ msg: err.message })
    }
})








//  get top 

postRouter.get("/top", auth, async (req, res) => {
    const { page } = req.query
    const limit = 3
    const skip = (page - 1) * limit


    try {

        const data = await PostModel.find().skip(skip).limit(limit)

        res.status(200).json({ msg: "users top data", data })

    } catch (err) {
        res.status(400).json({ msg: err.message })
    }
})




//  patch


postRouter.patch("/update/:id", auth, async (req, res) => {
    const { id } = req.params
    const abc = await PostModel.findOne({ _id: id })


    try {


        if (req.body.userID == abc.userID) {
            await PostModel.findByIdAndUpdate({ _id: id }, req.body)
            res.status(200).json({ msg: "users updated" })
        } else {
            res.status(400).json({ msg: "not authoeized" })
        }


    } catch (err) {
        res.status(400).json({ msg: err.message })
    }
})



// //  delete
postRouter.delete("/delete/:id",  auth, async(req, res) => {
    const {id} = req.params
    const abc =  await PostModel.findOne({_id : id})

    try{
            if(req.body.userID == abc.userID){
                await PostModel.findByIdAndDelete({_id : id}, req.body)
                res.status(200).json({ msg: "users deleted" })
            }else{
                res.status(400).json({ msg: "not authoeized"})
            }


    }catch(err){
       res.status(400).json({ msg: err.message })
    }
})









module.exports = {
    postRouter
}