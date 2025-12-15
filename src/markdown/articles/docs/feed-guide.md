@frontmatter
{
    "title": "RSS/Atom Guide",
    "description": "Learn how to add a feed to your Shodo site.",
    "category": "docs"
}
@endfrontmatter

Generate RSS or Atom feeds by creating an XML template with `file_type: xml` in the front matter:

## Example

```jinja
&#x40;frontmatter
{
    "file_type": "xml"
}
&#x40;endfrontmatter

<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
    <channel>
        <title>shodo.dev (blog)</title>
        <description>Shodo blog feed</description>
        <link>{{ config.url_origin }}/blog/</link>
        <lastBuildDate>{{ get_rfc822(current_dt()) }}</lastBuildDate>
        <atom:link href="{{ config.url_origin }}/blog/feed.xml" rel="self" type="application/rss+xml" />
        <language>en-US</language>
        {% for post in shodo_get_articles({
            "where": {
            "directory": { "starts_with": "/blog" }
            },
            "order_by": { "desc": "published_datetime" },
            "limit": 3
        }) %}
        <item>
            <title>{{ post.title }}</title>
            <description>{{ shodo_get_excerpt(post.content, 30) }}</description>
            <link>{{ post.link }}</link>
            <guid isPermaLink="true">{{ post.link }}</guid>
            <pubDate>{{ get_rfc822(post.published_datetime) }}</pubDate>
            <content:encoded>
                <![CDATA[{{ rel_to_abs(post.content, "https://example.com) }}]]>
            </content:encoded>
        </item>
        {% endfor %}
    </channel>
</rss>
```

You can add the template to the `views/pages` directory like any other additional page would be added.

**Note**: Unlike the default behavior for HTML files, XML files will be rendered directly as the template name plus the `.xml` extension (instead of an index file being rendered in a directory named after the template).

## Additional Resources

It may be helpful to read up on the following functions:

[shodo_get_articles](/docs/template-api-functions/#shodo_get_articles)

[get_rfc822](/docs/template-api-functions/#get_rfc822)

[current_dt](/docs/template-api-functions/#current_dt)

[rel_to_abs](/docs/template-api-functions/#rel_to_abs)
