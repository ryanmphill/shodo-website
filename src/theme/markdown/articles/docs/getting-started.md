@frontmatter
{
    "title": "Getting Started",
    "description": "Installation and setup for Shodo Static Site Generator",
    "category": "docs"
}
@endfrontmatter

## Installing the package

1. Create a new project directory and start a virtual environment using your preferred method

2. Install the `shodo_ssg` package by running one of the following commands:

**Via pip**:
```bash
pip install shodo-ssg
```

**Via pipenv**:
```bash
pipenv install shodo-ssg
```

**Via Poetry**:
```bash
poetry add shodo-ssg
```

**Via uv**:
```bash
uv add shodo-ssg
```

## Scaffolding a New Project

Once the package is installed, you can scaffold a new project using the command

```bash
start-shodo-project <name of project directory>
```

To create the project in the current directory, run

```bash
start-shodo-project .
```

Build the starter site and serve it to localhost by running the following command from the root directory of the project:

```bash
python3 serve.py
```

You should now be able to view the site on localhost and can start by making changes to `home.jinja`. When you simply want to build the static site, run the following command from the root directory:

```bash
python3 site_builder.py
```

and you can find your static site located in the `dist/` directory

## How it works (brief overview)

First, there is the main home page template located at `src/theme/views/home.jinja` that can render partial sub-views, which can either be other Jinja2 templates located in `src/theme/views/partials`, or markdown files located in `src/theme/markdown/partials`. 

Additional pages can be created by adding a new file with a `.jinja` extension to the `src/theme/views/pages` directory.

Pages can also be [generated entirely from markdown files](/docs/project-structure/#generating-full-pages-from-markdown) located in `src/theme/markdown/articles`, and will be rendered through a `layout.jinja` file located in `src/theme/views/articles` via the `{{ article.content}}` placeholder.

## Next Steps

The best thing to do from here is just play around with the project by changing values until you get something on the screen you like! When you get stuck or want to know more about the [frontmatter](/docs/frontmatter) or [querying markdown pages](/docs/template-api-functions), come back to the docs and read further into it.
