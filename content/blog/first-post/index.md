---
title: First Post
date: '2021-03-27T16:57:00.000Z'
---

This is the first post on my new blog.

The purpose of this blog is to document and share my learning journey. In this post I will cover:

1. Introduction
2. Ideas going forward
3. Setting up a basic Gatsby blog using the [Gatsby Starter Blog](https://github.com/gatsbyjs/gatsby-starter-blog)

## Introduction

I'm a software engineer living and working in London, UK.

The first topic which I'll be writing about is in fact about this very site - I'm keen to document the journey, starting with a basic Gatsby template and modifying it to suit my needs.

## Ideas

Things that I've got in mind for future changes include:

- Deploying the site using GitHub Pages (if you're reading this then it's safe to assume this task is complete!)
- Moving towards using a headless CMS rather than markdown for my blog posts
- Setting up a basic CI/CD pipeline to suit my needs, likely GitHub Actions to begin with for easy deployment to GitHub Pages. Although I would like to extend this to handle auto redeploys on publishing new posts in the CMS of choice

## Setting up a basic Gatsby blog

1. The first step is to install the Gatsby CLI globally by running `npm install -g gatsby-cli` as documented at [www.gatsbyjs.com](https://www.gatsbyjs.com/docs/reference/gatsby-cli/)
2. Next it's as simple as running the Gatsby `new` command specifying which starter template to use. In this case, I used the blog starter by running the command `gatsby new blog-site https://github.com/gatsbyjs/gatsby-starter-blog`
3. Once installed, `gatsby develop` will run the new blog locally on the default port 8000

It really is as simple as that, Gatsby makes it super quick and easy to get a basic template set up. To create new content just create a new folder in the `content/blog` and start writing in markdown. Gatsby will rebuild and your changes will be visible on localhost.
