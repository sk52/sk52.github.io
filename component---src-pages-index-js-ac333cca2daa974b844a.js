(self.webpackChunksk52_github_io=self.webpackChunksk52_github_io||[]).push([[678],{7361:function(e){"use strict";e.exports=JSON.parse('{"layout":"fixed","backgroundColor":"#d8d8d8","images":{"fallback":{"src":"/static/9c21e5577257a9790949903d968b1782/e5610/profile-pic.png","srcSet":"/static/9c21e5577257a9790949903d968b1782/e5610/profile-pic.png 50w,\\n/static/9c21e5577257a9790949903d968b1782/e9b55/profile-pic.png 100w","sizes":"50px"},"sources":[{"srcSet":"/static/9c21e5577257a9790949903d968b1782/d4bf4/profile-pic.avif 50w,\\n/static/9c21e5577257a9790949903d968b1782/ee81f/profile-pic.avif 100w","type":"image/avif","sizes":"50px"},{"srcSet":"/static/9c21e5577257a9790949903d968b1782/3faea/profile-pic.webp 50w,\\n/static/9c21e5577257a9790949903d968b1782/6a679/profile-pic.webp 100w","type":"image/webp","sizes":"50px"}]},"width":50,"height":50}')},9535:function(e,t,l){"use strict";var i=l(7294),a=l(5444),r=l(8605);t.Z=function(){var e,t,n=(0,a.useStaticQuery)("230163734"),c=null===(e=n.site.siteMetadata)||void 0===e?void 0:e.author,s=null===(t=n.site.siteMetadata)||void 0===t?void 0:t.social;return i.createElement("div",{className:"bio"},i.createElement(r.S,{className:"bio-avatar",layout:"fixed",formats:["AUTO","WEBP","AVIF"],src:"../images/profile-pic.png",width:50,height:50,quality:95,alt:"Profile picture",__imageData:l(7361)}),(null==c?void 0:c.name)&&i.createElement("p",null,"Written by ",i.createElement("strong",null,c.name),", ",(null==c?void 0:c.summary)||null," ",i.createElement("a",{target:"_blank",rel:"noreferrer",href:"https://github.com/"+((null==s?void 0:s.github)||"")},"GitHub")))}},7704:function(e,t,l){"use strict";l.r(t);var i=l(7294),a=l(5444),r=l(9535),n=l(7198),c=l(3751);t.default=function(e){var t,l=e.data,s=e.location,o=(null===(t=l.site.siteMetadata)||void 0===t?void 0:t.title)||"Title",p=l.allMarkdownRemark.nodes;return 0===p.length?i.createElement(n.Z,{location:s,title:o},i.createElement(c.Z,{title:"All posts"}),i.createElement(r.Z,null),i.createElement("p",null,'No blog posts found. Add markdown posts to "content/blog" (or the directory you specified for the "gatsby-source-filesystem" plugin in gatsby-config.js).')):i.createElement(n.Z,{location:s,title:o},i.createElement(c.Z,{title:"All posts"}),i.createElement(r.Z,null),i.createElement("ol",{style:{listStyle:"none"}},p.map((function(e){var t=e.frontmatter.title||e.fields.slug;return i.createElement("li",{key:e.fields.slug},i.createElement("article",{className:"post-list-item",itemScope:!0,itemType:"http://schema.org/Article"},i.createElement("header",null,i.createElement("h2",null,i.createElement(a.Link,{to:e.fields.slug,itemProp:"url"},i.createElement("span",{itemProp:"headline"},t))),i.createElement("small",null,e.frontmatter.date)),i.createElement("section",null,i.createElement("p",{dangerouslySetInnerHTML:{__html:e.frontmatter.description||e.excerpt},itemProp:"description"}))))}))))}}}]);
//# sourceMappingURL=component---src-pages-index-js-ac333cca2daa974b844a.js.map