import _ from "lodash"

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    if(!Array.isArray(blogs) || blogs.length===0){
        return 0
    }
    return blogs.reduce((sum, blog) => sum+blog.likes, 0)
}

const favoriteBlog = (blogs) => {
    if (blogs.length === 0){
        return {}
    }

    return blogs.reduce((max, blog) => blog.likes > max.likes ? blog : max, blogs[0])
}

const mostBlogs = (blogs) => {
    if(blogs.length === 0){
        return {}
    }

    const authorBlogs = _.countBy(blogs, 'author')
    const [author, blogsCount] = Object.entries(authorBlogs).reduce((max,entry) => 
        entry[1]>max[1] ? entry : max
    )
    return {author, blogs: blogsCount}
}

const mostLikes = (blogs) => {
    if(blogs.length === 0){
        return {}
    }

    const authorBlogs = _.groupBy(blogs, 'author')
    const authorLikes = _.mapValues(authorBlogs, totalLikes)
    const [author, likes] = Object.entries(authorLikes).reduce((max, entry) => 
        entry[1] > max[1] ? entry : max
    )

    return {author, likes}
}

export { dummy, totalLikes, favoriteBlog , mostBlogs, mostLikes}