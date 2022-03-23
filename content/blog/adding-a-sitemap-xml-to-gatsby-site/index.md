---
title: Adding a Sitemap.xml to Gatsby Site
tags: ['Gatsby', 'Sitemap']
date: '2022-03-23T08:00:00.000Z'
---

For those new to web development with Gatsby, search engine optimisation (SEO) might not be the main priority.
We'll look at how we can add a sitemap.xml file to a Gatsby site to help improve SEO. 

## Why 

A sitemap.xml is simply a page on your site which tells Google which pages exist on your site. It can also include details such as page priority, and last modified dates. By adding a sitemap.xml file, it allows search engines to crawl and index your site more easily. This improves the likelihood of showing up on search engine results. 

## Prerequisites

We'll assume that you already have a list of all URL's present on your site. There are various ways to create this. It is usually not practical to manually gather a list of all URL's, generating it automatically is a preferred approach due to the size and complexity of most websites. 

## How

The sitemap.xml itself adheres to a [schema](https://www.sitemaps.org/protocol.html). This schema is made up of a top-level xml element `<urlset>` which contains a list of `<url>` elements. 

Each `<url>` element can contain a number of other elements: `<loc>`, `<lastmod>`, `<changefreq>`, and `<priority>`. 

We'll be demonstrating a simple sitemap.xml file which only includes the `<loc>` element (this specifies the URL of the given page, it will begin with the protocol, as per the schema above).

Here's an example:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
        <loc>https://sk52.github.io</loc>
    </url>
    <url>
        <loc>https://sk52.github.io/env-var-validation</loc>
    </url>
</urlset>
```

Once you have formatted the list of site URL's to follow the above example, save it as `static/sitemap.xml`.

Next time you deploy your Gatsby site, the sitemap will be available. 

## Updating Robots.txt

Now that the sitemap is available on the site, specify it's location in the `robots.txt` file.

In `static/robots.txt`, append the following line, replacing the URL with your site URL:

```txt
Sitemap: https://sk52.github.io/sitemap.xml
```

This will help search engines to know where to find the `sitemap.xml`.

## Summary

Adding a `sitemap.xml` file to a Gatsby site is straightforward and can really help with SEO. There are numerous ways to generate the `sitemap.xml` file itself, which will be covered in future posts. 
