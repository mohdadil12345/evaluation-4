
const mongoose = require("mongoose")

const postSchema = ({
    title: String,
    body: String,
    device: String,
    No_of_comments: Number,
    userID: String,
    name: String
})


const PostModel = mongoose.model("post", postSchema)

module.exports = {
    PostModel
}