---
title: Deploying a Gatsby Site to GitHub Pages Using GitHub Actions CI/CD
tags: ['Gatsby', 'CI/CD']
date: '2021-03-28T15:37:00.000Z'
---

In this post I will talk about setting up GitHub Actions CI/CD to automatically build and deploy my Gatsby site to GitHub Pages when I push any changes to the `main` branch. The post will cover:

1. What I want to achieve with CI/CD, and why
2. How I set up CI/CD using GitHub Actions to deploy to GitHub Pages

## What and Why

Gatsby provides a simple set of [instructions](https://www.gatsbyjs.com/docs/how-to/previews-deploys-hosting/how-gatsby-works-with-github-pages/) which allow this deployment to be carried out manually by specifying a `deploy` command in the `package.json` and just running it locally. However, I'm keen to explore migrating from markdown blog posts to a headless CMS in the future, so this approach works with that in mind and provides the following benefits:

- Allows me to automatically deploy changes when I merge PR's to my `main` branch
- It will allow me to setup some webhooks in future to easily trigger a new build and deploy when new content gets published in the CMS

## How I set up CI/CD

1. Firstly install `gh-pages` by running `npm install gh-pages --save`, this package provides a way to publish the build files to a specified branch (defaults to `gh-pages` branch)
2. Next, create a GitHub access token, this will allow repository access from the GitHub Actions workflow, needed to push changes to the `gh-pages` branch for deployment.
   - Navigate to GitHub -> Settings -> Developer Settings -> Personal access tokens
   - Select "Generate new token", create one which gives access to "repo" and save it with a descriptive name
   - Copy the value of this token
   - Navigate to the GitHub repository -> Settings -> Secrets
   - Select "New repository secret"
   - Paste the token as the Value, and set the name as `GH_TOKEN`
3. Now write two scripts in `package.json`
   - `"deploy": "gatsby build --prefix-paths && gh-pages -d public"` - this script allows deployment to be carried out manually
   - `"deploy:ci": "gatsby build --prefix-paths && gh-pages -d public -r https://$GH_TOKEN@github.com/username/repo.git"` - this script will be used by our GitHub Actions workflow, it uses the token created in the previous step
4. Create a GitHub Actions workflow: `.github/workflows/deploy.yml` and add the following:

```yml
name: Gatsby Deploy

on:
  push:
    branches: main

env:
  GH_TOKEN: ${{ secrets.GH_TOKEN }}

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: GitHub Config
        run: |
          git config --global user.email "example@example.example"
          git config --global user.name "example"
      - name: Checkout
        uses: actions/checkout@v2
      - name: Install dependencies
        run: |
          npm install
      - name: Deploy
        run: npm run deploy:ci
```

5. Replace the example username and email with your own details in the `.yml` file (alternatively, if you have privacy concerns, you can set these up as GitHub secrets too following the steps used above, simply replace the email and quotation marks with something like `$EMAIL`)
6. And that's it! Commit and push the changes to your `main` branch and it will trigger the workflow and deploy to GitHub Pages
