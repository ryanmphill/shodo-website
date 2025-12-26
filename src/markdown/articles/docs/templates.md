@frontmatter
{
    "title": "Templates",
    "description": "Templating engine useage in Shodo",
    "category": "docs"
}
@endfrontmatter

## Templating Engine

This project uses Jinja2 as its templating engine, so it would be beneficial to visit the [Jinja docs](https://jinja.palletsprojects.com/en/stable/). Jinja integrates nicely with Python and makes it simple to build HTML from templates that have access to functions and variables.

## Basic Syntax

Jinja allows you to do mostly what any other templating engine does, so most of it should feel fairly intuitive. You get access to if statements, includes, loops, and even [component-like macros](https://jinja.palletsprojects.com/en/stable/templates/#macros).

### If Statements

Just like in Python, you can use `if` statements directly in Jinja templates for conditional rendering or to ensure a value exists.

```html+jinja
{% if animal.dog %}
    Woof!
{% elif animal.cow %}
    Moo!
{% else %}
    Meow!
{% endif %}
```

### For Loops

Loop over items in a sequence just like in any programming language

```html+jinja
<h1>Animals</h1>
<ul>
{% for animal in animals %}
  <li>{{ animal.name }}</li>
{% endfor %}
</ul>
```

### Includes

Import a partial template into another one:

```html+jinja
{% include 'partials/nav.jinja' %}
```

## Shodo-Specific Values and Functions

Shodo provides some helpful variables and functions that are passed to the Jinja templates. Some variables are specific to [frontmatter](/docs/frontmatter) and [pagination](/docs/pagination), while the `{{ article }}` variable is reserved for rendering [markdown pages](/docs/project-structure/#generating-full-pages-from-markdown) in a layout template. [Template API functions](/docs/template-api-functions) are helpful for common tasks such as querying data, trimming content, and more.

## Read More

More information about Jinja is available in the library's [documentation](https://jinja.palletsprojects.com/en/stable/).