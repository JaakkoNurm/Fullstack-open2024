const dummy = (blogs) => 1

const totalLikes = (blogs) => blogs.reduce((totalLikes, blog) => totalLikes + blog.likes, 0)

module.exports = {
    dummy, totalLikes
}