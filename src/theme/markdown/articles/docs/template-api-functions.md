@frontmatter
{
    "title": "Template API Functions",
    "description": "Learn about the template functions available in Shodo.",
    "category": "docs"
}
@endfrontmatter

Shodo provides several built-in functions that can be called from within templates:

## shodo_get_articles()

Query and filter articles from the `markdown/articles` directory.

**Basic usage:**
```jinja
{% for post in shodo_get_articles() %}
    <h2>{{ post.title }}</h2>
    <p>{{ post.excerpt }}</p>
    <a href="{{ post.link }}">Read more</a>
{% endfor %}
```

**With filters:**
```jinja
{% for post in shodo_get_articles(filters={
    "where": {
        "category": "technology",
        "tags": {"contains": "python"}
    },
    "order_by": {"desc": "date"},
    "limit": 5
}) %}
    <article>
        <h2>{{ post.title }}</h2>
        <time>{{ post.date }}</time>
        <p>{{ shodo_get_excerpt(post.content, 150) }}</p>
    </article>
{% endfor %}
```

**Filter operators:**

- `equals`: Exact match
- `contains`: Check if value is in a list
- `starts_with`: String starts with value
- `ends_with`: String ends with value
- `gt`, `gte`, `lt`, `lte`: Comparison operators
- `in`: Value is in list
- `not_in`: Value is not in list
- `not_equals`: Not equal to value
- `not_contains`: Value not in list
- `regex`: Regular expression match

**Logical operators:**
```jinja
{% for post in shodo_get_articles(filters={
    "where": {
        "and": [
            {"category": "tech"},
            {"tags": {"contains": "python"}}
        ],
        "or": [
            {"author": "John"},
            {"author": "Jane"}
        ]
    }
}) %}
```

## shodo_query_store()

Query JSON data from the `/store` directory with the same powerful filtering as `shodo_get_articles()`. The only difference with the `filters` argument is that `collection` is required, the value of which is a key in your [JSON store](/docs/project-structure/#json-store).

```jinja
{% for item in shodo_query_store(
    filters={
        "collection": "products",
        "where": {"price": {"lt": 100}},
        "order_by": {"asc": "name"},
        "limit": 10
    }
) %}
    <div>{{ item.name }} - ${{ item.price }}</div>
{% endfor %}
```

## shodo_get_excerpt()

Extract a text excerpt from content with a specified character limit.

```jinja
{{ shodo_get_excerpt(article.content, 200) }}
```

## get_rfc822()

Convert a datetime to RFC 822 format (required for RSS feeds).

```jinja
<pubDate>{{ get_rfc822(article.published_datetime) }}</pubDate>
```

## rel_to_abs()

Convert relative URLs to absolute URLs (required for RSS feeds). Uses `config.url_origin` value set in `store` directory, otherwise the second argument is required with the base url origin.

```jinja
{{ rel_to_abs(article.content, "https://example.com") }}
```

## current_dt()

Get the current datetime during build.

```jinja
<lastBuildDate>{{ get_rfc822(current_dt()) }}</lastBuildDate>
```