---
title: Adding a GitHub Actions Status Badge to your README
tags: ['GitHub Actions', 'CI/CD']
date: '2021-04-11T17:57:00.000Z'
---

In this post I will talk about adding a build status badge for a GitHub Actions workflow to the README of your repository.

## What and Why

The GitHub Actions status badge looks something like this:

[![Build](https://github.com/sk52/sk52.github.io/actions/workflows/deploy.yml/badge.svg?branch=main)](https://github.com/sk52/sk52.github.io/actions/workflows/deploy.yml)

It provides a nice looking insight into the status of a chosen GitHub Actions workflow. This can be handy to indicate whether or not a deployment was a success.

GitHub provides an [overview](https://docs.github.com/en/actions/managing-workflow-runs/adding-a-workflow-status-badge) of how to set this up, but it took me a bit of extra googling to get it working.

## Prerequisite

- You will need an existing GitHub Actions workflow of your own already set up in the repository of your choice

## How to

1. Navigate to your GitHub repository, and select the "Actions" tab
2. Find the workflow that you would like to create a status badge for
3. In the URL append "/badge.svg" on the end and hit enter
4. You should see the status badge image for that workflow
5. Simply copy this URL, and add it to your README markdown file like so: `![Build](https://github.com/sk52/sk52.github.io/actions/workflows/deploy.yml/badge.svg)`
   - This will add a build status image to your README which simply links to the build status image itself
   - To link it to the workflow, wrap a markdown link around it like this: `[![Build](https://github.com/sk52/sk52.github.io/actions/workflows/deploy.yml/badge.svg)](https://github.com/sk52/sk52.github.io/actions/workflows/deploy.yml)`
6. Et voilà! Just like that you've got a neat build status svg added to your README

[![Build](https://github.com/sk52/sk52.github.io/actions/workflows/deploy.yml/badge.svg?branch=main)](https://github.com/sk52/sk52.github.io/actions/workflows/deploy.yml)
