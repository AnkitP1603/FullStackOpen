import { test, expect, beforeEach, describe } from '@playwright/test'
import { loginWith, createBlog } from '../utils/helper'

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('/api/testing/reset')
    await request.post('/api/users', {
      data: {
        username: 'mluukkai',
        name: 'Matti Luukkainen',
        password: 'salainen'
      }
    })

    await page.goto('/')
  })

  test('Login form is shown', async ({ page }) => {
    await expect(page.getByText('Log in to application')).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
        loginWith(page, 'mluukkai', 'salainen')

        await expect(page.getByText('blogs')).toBeVisible()
        await expect(page.getByText('Matti Luukkainen logged in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
        loginWith(page, 'mluukkai', 'wrong')

        const errorDiv = page.locator('.notification')
        await expect(errorDiv).toContainText('Wrong username or password')
        await expect(page.getByText('blogs')).not.toBeVisible()
        await expect(page.getByText('Matti Luukkainen logged in')).not.toBeVisible()
    })
  })

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
        loginWith(page, 'mluukkai', 'salainen')
    })

    test('a new blog can be created', async ({ page }) => {
        createBlog(page, 'a blog created by playwright', 'playwright author', 'http://playwright.test/blog')
        
        const successDiv = page.locator('.notification')
        await expect(successDiv).toContainText('A new blog a blog created by playwright by playwright author added')
        await expect(page.getByText('a blog created by playwright playwright author')).toBeVisible()
    })

    test('user can like a blog', async ({ page }) => {
        createBlog(page, 'likeable blog', 'like author', 'http://like.test/blog')

        await page.getByRole('button', { name: 'view' }).click()
        const likesDiv = page.locator('.blog-likes')
        const likeButton = likesDiv.getByRole('button', { name: 'like' })
        await expect(likesDiv).toContainText('likes 0')
        await likeButton.click()
        await expect(likesDiv).toContainText('likes 1')
        await likeButton.click()
        await expect(likesDiv).toContainText('likes 2')
    })

    test('user can delete their own blog', async ({ page }) => {
        createBlog(page, 'deletable blog', 'delete author', 'http://delete.test/blog')

        page.on('dialog', dialog => dialog.accept());

        await page.getByRole('button', { name: 'view' }).click()
        const blogDiv = page.locator('.blog-details')
        const deleteButton = blogDiv.getByRole('button', { name: 'remove' })
        await expect(deleteButton).toBeVisible()

        await deleteButton.click()
        await expect(page.getByText('deletable blog delete author')).not.toBeVisible()
    })

    test('user can see delete button on their own blogs', async ({ page, request }) => {
        createBlog(page, 'deletable blog', 'delete author', 'http://delete.test/blog')

        await page.getByRole('button', { name: 'view' }).click()
        const blogDiv = page.locator('.blog-details')
        const deleteButton = blogDiv.getByRole('button', { name: 'remove' })
        await expect(deleteButton).toBeVisible()

        await page.getByRole('button', { name: 'logout'}).click()

        await request.post('/api/users', {
          data: {
            username: 'anotheruser',
            name: 'Another User',
            password: 'anotherpassword'
          }
        })
        loginWith(page, 'anotheruser', 'anotherpassword')

        await page.getByRole('button', { name: 'view' }).click()
        await expect(deleteButton).not.toBeVisible()
    })

    test('blogs are ordered according to likes', async ({ page }) => {
      await createBlog(page, 'most liked blog', 'author3', 'http://blog3.test')
      await createBlog(page, 'medium liked blog', 'author2', 'http://blog2.test')
      await createBlog(page, 'least liked blog', 'author1', 'http://blog1.test')

      const blogElements = page.locator('.blog')
    
      for (let i = 0; i < 4; i++) {
        await blogElements.nth(0).getByRole('button', { name: 'view' }).click()
        await blogElements.nth(0).locator('.blog-likes').getByRole('button', { name: 'like' }).click()
        await blogElements.nth(0).getByRole('button', { name: 'hide' }).click()
      }
      for (let i = 0; i < 2; i++) {
        await blogElements.nth(1).getByRole('button', { name: 'view' }).click()
        await blogElements.nth(1).locator('.blog-likes').getByRole('button', { name: 'like' }).click()
        await blogElements.nth(1).getByRole('button', { name: 'hide' }).click()
      }

      const firstBlogTitle = await blogElements.nth(0).innerText()
      const secondBlogTitle = await blogElements.nth(1).innerText()
      const thirdBlogTitle = await blogElements.nth(2).innerText()

      expect(firstBlogTitle).toContain('most liked blog')
      expect(secondBlogTitle).toContain('medium liked blog')
      expect(thirdBlogTitle).toContain('least liked blog')
    })
  })
})