@frontmatter
{
    "title": "Project Structure",
    "description": "Understanding the project structure for Shodo Static Site Generator",
    "category": "docs"
}
@endfrontmatter

## Recommended Project Layout

```
project-root/
├── src/
│   ├── store/ # Any JSON data to expose to templates
│   │   └── config.json # Recommended for global metadata
│   ├── markdown/
|   │   ├── articles/ # Render full pages from markdown
|   │   └── partials/ # Partial md content to include in templates
│   ├── static/
|   │   ├── assets/ # Fonts, Images, etc.
|   │   ├── scripts/
|   │   └── styles/
│   ├── views/
|   │   ├── articles/
|   │   │   └── layout.jinja # Layout for markdown/articles content
|   │   ├── pages/ # Render full pages from templates
|   │   ├── partials/ # Partial templates to include in other templates
|   │   └── home.jinja # Root page of site
|   ├── root/
│   │   └── # Anything in this directory is copied as-is to the root
│   └── favicon.ico
│
├── build_settings.json # Build configuration
├── serve.py
└── site_builder.py
```

## Home Page

The root page `index.html` of the site is written from `src/views/home.jinja`

## Pages

Any template added to the `views/pages/` directory will be written as an index.html file in its own subfolder within the `dist` directory. When linking between pages, simply write a backslash followed by the page name, exluding any file extensions. So if you wanted to link to `pages/linked-page.jinja` from `home.jinja`, the anchor tag would be

```html
<a href="/linked-page">Click Here!</a>
```

### Nested Pages

You can create nested pages by adding a subdirectory within `pages/` with the name of the route. For routes with multiple pages, the index page of that route will need to be on the same level as the route subdirectory with the same name followed by the `.jinja` extension. For example:
```
├── pages/
    ├── about.jinja # (template for '/about')
    ├── nested.jinja # (index template for '/nested')
    └── nested/
        └── nested-page.jinja # (template for '/nested/nested-page')
```

## Markdown Content

### Partial markdown content

Any markdown files added to the `/markdown/partials` directory will be exposed to Jinja templates with a variable name identical to the markdown file name, minus the extension. So, the contents of `summary.md` can be passed to the Jinja template as `{{ summary }}`, where it will be converted to HTML upon running the build script.

#### Prefixed variables for nested markdown directories

In order to avoid any naming conflicts, The articles further nested in directories within "articles/partials/" will have a variable prefix that is the accumulated names of the preceding directories in dot notation (excluding '/partials' and higher). 

For example, a markdown file located in 

```
markdown/partials/collections/quotes/my_quote.md
```

 will be exposed to all templates with the following variable using the jinja variable syntax:

```
{{ collections.quotes.my_quote }}
```

### Generating full pages from markdown

In addition to partial variables that can be included in templates, entire new pages can also be automatically be generated from markdown files added to the 
`markdown/articles` directory. The url path to the page will match file path following everything after `markdown/articles/`, so 

```
markdown/articles/blog/hello.md
``` 

will be accessible at `{siteUrl}/blog/hello`.

Articles from the `markdown/articles` directory are rendered with a reusable template defined in `views/articles/` Just add a `layout.jinja` file under a subdirectory that matches the subdirectory tree used in `markdown/articles`, or simply define a `layout.jinja` at the root of `views/articles` if you want to use a single layout template for all articles. In the `layout.jinja` file, control where you would like your content to be dynamically inserted by passing in the reserved `{{ article }}` variable.

The site builder will always match up the layout template that is closest in the tree, so 

```
markdown/articles/blog/updates/new-post.md
``` 

would be matched with 

```
views/articles/blog/layout.jinja
``` 

if no layout is defined for the `updates` directory.

#### Example:

```
├── markdown/
    └── articles/
        ├── blog/
        ├── updates/
        └── new-post.md
```

```
├── views/
    └── articles/
        ├── layout.jinja # (default root layout for all markdown 'articles')
        └── blog/
            ├── layout.jinja # (Maps to markdown/articles/blog, overwrites root layout)
            ├── updates/
            └── layout.jinja # (Maps to markdown/articles/blog/updates, overwrites other previous layouts in tree)
```

### layout.jinja

The `layout.jinja` is just a normal jinja template, but the `{{ article }}` variable has been reserved for passing in the content from each file in `markdown/articles`. Simply define whatever repeated layout you would like to wrap the `{{ article }}` content, such as a header and footer.

Here is an example layout template:

```jinja
&#x40;frontmatter
{
    "title": "Blog Layout",
    "body_class": "blog-page"
}
&#x40;endfrontmatter

<div class="container">
    <header class="page-header">
        <h1>{{ article.title }}</h1>
        <time datetime="{{ article.published_datetime.strftime("%Y-%m-%d %H:%M:%S") }}">
            {{ article.published_datetime.month }}-{{ article.published_datetime.day }}-{{ article.published_datetime.year }}
        </time>
    </header>
    <main>
        {{ article.content }}
    </main>
    <footer>Thanks for reading</footer>
</div>
```

## JSON Store

We've already gone over [adding a `config` object to your JSON store](/docs/configuration/#store-directory-config). 

Other than that one key/value pair, you can add whatever else you'd like to this directory! Any JSON you add in the `src/store` directory will be accessible in your templates. It doesn't matter what the name of the file is, or how many files you have, as long as it ends with `.json` and is located in the store directory.

### Example

```json
{
    "animals": [
        {
            "type": "dog",
            "name": "Claire"
        },
        {
            "type": "cat",
            "name": "Oscar"
        },
        {
            "type": "lizard",
            "name": "Wallace"
        },
    ]
}
```

Then in the templates, you can access the data

```jinja
<div>
{% for animal in animals %}
    <p>{{ animal.name }} is a {{ animal.type }}</p>
{% endfor %}
</div>
```

### Nested JSON

For avoiding naming conflicts, it can be helpful to nest JSON. Nested values can be accessed in the templates via dot notation:

```json
{
    "my_animals": {
        "animals": [
            {
                "type": "dog",
                "name": "Claire"
            },
            {
                "type": "cat",
                "name": "Oscar"
            },
            {
                "type": "lizard",
                "name": "Wallace"
            },
        ]
    }
}
```

Now, `my_animals` acts as a namespace for the data:

```jinja
<div>
{% for animal in my_animals.animals %}
    <p>{{ animal.name }} is a {{ animal.type }}</p>
{% endfor %}
</div>
```

### Further Reading

Continue on to learn how to [query JSON data with filtering options](/docs/template-api-functions/#shodo_query_store).
