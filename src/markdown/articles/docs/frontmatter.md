@frontmatter
{
    "title": "Frontmatter",
    "description": "Configuring Frontmatter for Shodo Static Site Generator",
    "category": "docs"
}
@endfrontmatter

Both Jinja templates and Markdown files support front matter - metadata enclosed by `&#x40;frontmatter` and `&#x40;endfrontmatter` tags. Front matter is currently supported in JSON format and can include several possible values.

## Example

```
&#x40;frontmatter
{
    "title": "My Page Title",
    "description": "Page description for SEO",
    "author": "Your Name",
    "body_class": "custom-page-class",
    "body_id": "custom-page-id",
    "keywords": ["web", "development", "shodo"],
    "head_extra": [
        "<link rel='stylesheet' href='/custom.css'>",
        "<script src='/custom.js'></script>"
    ]
}
&#x40;endfrontmatter
```

## Frontmatter Options

### Base Options
*These values are available in both Jinja templates and Markdown pages*

- `title`: Page title meta (used in `<title>` tag) (`str`)
- `description`: Meta description for SEO (`str`)
- `author`: Page author meta (`str`)
- `keywords`: Array of keywords for meta tags (`str[]`)
- `lang`: Language code (`str`)
- `canonical`: Main site url (`str`)
- `charset`: ex. UTF-8 (`str`)
- `theme_color`: Optionally render the theme-color meta tag (`str`)
- `google_font_link`: Optional link to google fonts (`str`)
- `body_class`: CSS class(es) to add to `<body>` tag (`str`)
- `body_id`: ID to add to `<body>` tag (`str`)
- `head_extra`: Array of additional custom HTML to inject in `<head>` (`str[]`)
- `file_type`: Specify file type other than html (e.g., `"xml"` for RSS feeds) (`str[]`)
- `no_wrapper`: Set to `true` to skip HTML `!DOCTYPE` and `<head>` wrapper (`bool`)
- OG values, including:
     - `og_image` (`str`)
     - `og_image_alt` (`str`)
     - `og_title` (`str`)
     - `og_description` (`str`)
     - `og_type` (`str`)
     - `og_site_name` (`str`)
     - `og_url` (`str`)
     - `og_locale` (`str`)

### Templates
*These values are specific to Jinja templates and won't have any effect in Markdown pages*

- `paginate`: Enable pagination (e.g., `"shodo_get_articles"`) (`str`)
- `per_page`: Number of items per page when paginating (`number`)

### Markdown Articles

*These values will get pulled from markdown page frontmatter and be included in the `article` object when the layout template is rendered.*

- `title` (`str`)
- `description` (`str`)
- `summary` (`str`)
- `keywords` (`str[]`)
- `author` (`str`)
- `category` (`str`)
- `tags` (`str[]`)
- `published_datetime` (will also generate `published_dt_local` if timezone is set) (`str`)
- `modified_datetime` (will also generate `modified_dt_local` if timezone is set) (`str`)
- `draft` (default "false") (`bool`)
- `image` (url) (`str`)
- `image_alt` (`str`)
- `extra` (optional nested json of custom metadata)

`content` and `link` will be automatically generated and included in the `article` object as well.

## Heirarchy

Since frontmatter can potentially be defined multiple places for the same page, values will be merged and/or overwritten (when values conflict). At the base, `config.metadata` JSON in the `store` directory will be globally applied and can be overwritten by any frontmatter. 

For the frontmatter itself, the general pattern is that it will be overwritten by any frontmatter that comes after it on the main rendering page. So, for example, if you had `main-page.jinja` with the following contents:

```html+jinja
&#x40;frontmatter
{
    "title": "Base Title",
}
&#x40;endfrontmatter

<div>
    {% include 'partials/first-partial.jinja' %}
    {% include 'partials/second-partial.jinja' %}
</div>

```

where `first-partial.jinja` contains:

```html+jinja
&#x40;frontmatter
{
    "title": "First Partial Title",
    "description", "Now this page has a description"
}
&#x40;endfrontmatter

<p>Hello</p>

```

and `second-partial.jinja` contains:

```html+jinja
&#x40;frontmatter
{
    "title": "Second Partial Title",
    "body_class": "my-page"
}
&#x40;endfrontmatter

<p>World!</p>

```

the final output would look something like:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8"> <!-- default -->
    <meta name="viewport" content="width=device-width, initial-scale=1.0"> <!-- default -->
    <title>Second Partial Title</title>
    <meta name="description" content="Now this page has a description">
    <!-- ...(style + script links) -->
</head>
<body class="my-page">
    <div>
        <p>Hello</p>
        <p>World!</p>
    </div>
    <script type="module" src="/static/scripts/main.js"></script>
</body>
</html>
```
