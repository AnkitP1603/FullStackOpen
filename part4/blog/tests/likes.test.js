// import { totalLikes, favoriteBlog, mostBlogs, mostLikes } from "../utils/list_helper.js";
// import { strictEqual, deepStrictEqual } from "node:assert/strict";
// import { test, describe } from "node:test";
// import helper from "../utils/test_helper.js";

// const blogs = helper.initialBlogs

// describe("total likes", () => {
//     const listWithOneBlog = [
//         {
//             _id: '5a422aa71b54a676234d17f8',
//             title: 'Go To Statement Considered Harmful',
//             author: 'Edsger W. Dijkstra',
//             url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
//             likes: 5,
//             __v: 0
//         }
//     ]

//     test('of an empty list is zero',() => {
//         const res = totalLikes([])
//         strictEqual(res, 0)
//     })

//     test('when list has only one blog, equals the likes of that', () => {
//         const result = totalLikes(listWithOneBlog)
//         strictEqual(result, 5)
//     })

//     test('of a bigger list is calculated right', () => {
//         const result = totalLikes(blogs)
//         strictEqual(result, 36)
//     })
// })

// describe("favorite blog",() => {
//     test("with most likes", () => {
//         const res = favoriteBlog(blogs)
//         deepStrictEqual(res, blogs[2])
//     })
// })

// describe("most blogs", () => {
//     test("author with most blogs", () => {
//         const res = mostBlogs(blogs)
//         deepStrictEqual(res, {author: "Robert C. Martin", blogs: 3})
//     })
// })

// describe("most likes", () => {
//     test("author with most likes", () => {
//         const res = mostLikes(blogs)
//         deepStrictEqual(res, {author: "Edsger W. Dijkstra", likes: 17})
//     })
// })
