@frontmatter
{
    "title": "CLI Commands",
    "description": "Command line interface for Shodo.",
    "category": "docs"
}
@endfrontmatter

Shodo provides helpful CLI commands:

## Scaffold a new project

You can scaffold a new project with a starter template full of boilerplate via

```
start-shodo-project
```

It comes with an example blog and some example data with paginated queries, and also includes an RSS feed of the blog entries. Just start swapping out values and create your own site!

## Generate UTC Timestamp

Generate an ISO 8601 formatted UTC timestamp for use in front matter or RSS feeds:

```bash
shodo now
```

Output: `2025-11-28T19:45:32Z`

This is useful for setting publication dates in article front matter:

```jinja
&#x40;frontmatter
{
    "title": "My Article",
    "published_datetime": "2025-11-28T19:45:32Z"
}
&#x40;endfrontmatter
```
