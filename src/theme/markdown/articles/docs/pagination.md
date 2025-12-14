@frontmatter
{
    "title": "Pagination",
    "description": "Learn how to paginate a list of markdown pages or store data.",
    "category": "docs"
}
@endfrontmatter

Shodo supports automatic pagination for article listings and store queries. Simply add pagination configuration to your template's front matter.

## How to Paginate

First, we define `paginate` in the front matter, with a value of either `shodo_get_articles` or `shodo_query_store`, depending on [which data we want to query](/docs/template-api-functions/).

Then, we define `per_page` in the frontmatter as well, with the number of items we want on each page.

Finally, we add a `limit` and `offset` to the query with some convenient values from the `pagination` object. More on that [below](/docs/pagination/#pagination-object).

### Example

```jinja
&#x40;frontmatter
{
    "title": "Blog Archive",
    "paginate": "shodo_get_articles",
    "per_page": 10
}
&#x40;endfrontmatter

<h1>Blog Posts</h1>

{% for post in shodo_get_articles({
    "where": {
        "directory": { "starts_with": "/blog" }
    },
    "order_by": {"desc": "published_datetime"},
    "limit": pagination.per_page,
    "offset": pagination.per_page * (pagination.current_page - 1),
}) %}
    <article>
        <h2><a href="{{ post.link }}">{{ post.title }}</a></h2>
        <p>{{ shodo_get_excerpt(post.content, 150) }}</p>
    </article>
{% endfor %}

{# Optionally include generated pagination navigation HTML #}
{{ pagination.page_links|safe }}
```

## Pagination Object

The `pagination` object provides:
- `pagination.per_page`: Value provided in the `per_page` frontmatter
- `pagination.current_page`: Current page number
- `pagination.total_pages`: Total number of pages
- `pagination.has_previous`: Boolean for previous page
- `pagination.has_next`: Boolean for next page
- `pagination.previous_page`: Previous page number
- `pagination.next_page`: Next page number
- `pagination.previous_page_url`: URL to previous page
- `pagination.next_page_url`: URL to next page
- `pagination.page_links`: HTML markup for pagination navigation

Make sure to provide `limit` and `offset` values in the query, with `pagination.per_page` passed as the `limit`, and `pagination.per_page * (pagination.current_page - 1)` as the `offset`

Pages are automatically generated at:
- First page: `/blog/index.html`
- Subsequent pages: `/blog/page/2/index.html`, `/blog/page/3/index.html`, etc.
