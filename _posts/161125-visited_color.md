---
layout: post 
title: color 
---

<div class="col-md-4">
    <h3><a href="{{site.baseurl}}{{post.url}}">{{post.title}}</a></h3>
    <span class="post-meta">
        <time datetime="2016-04-01T18:43:46.000Z" itemprop="datePublished">{{post.date | date_to_string}} </time>
    </span>
</div>
<div class="col-md-8">
    <p>{{post.date | date_to_string}}</p>
    <p class="pull-right readMore">
        <a href="{{site.baseurl}}{{post.url}}">Read More...</a>
    </p>
</div>
