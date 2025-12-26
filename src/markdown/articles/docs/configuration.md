@frontmatter
{
    "title": "Configuration",
    "description": "How to define settings for your Shodo project.",
    "category": "docs"
}
@endfrontmatter

There are two main ways to define global settings for a Shodo project. 

The first is `build_settings.json`, which is used to configure where files are read from and where they are written to.

The second is under the reserved `config` namespace in the `src/store` directory. It can be located in any json file within that directory, but the convention would be to have it live in its own file called `config.json`.

## build_settings.json

Here is an example of a `build_settings.json` that is provided in the initial project template.

```json
{
    "===The highest level directories to load templates from===": "",
    "root_template_paths": [
        "src/views"
    ],
    "===The directory containing markdown content files===": "",
    "markdown_path": "src/markdown",
    "===The directory containing JSON configuration files===": "",
    "json_config_path": "src/store",
    "===The path to the src favicon file===": "",
    "favicon_path": "src/favicon.ico",
    "===The directory containing static script files===": "",
    "scripts_path": "src/static/scripts",
    "===The directory containing static style files===": "",
    "styles_path": "src/static/styles",
    "===The directory containing any static asset files===": "",
    "assets_path": "src/static/assets",
    "===The directory containing files and directories to be copied directly to the root of the build directory===": "",
    "root_files_path": "src/root",
    "===The output build directory===": "",
    "build_dir": "dist",
    "===Enable or disable automatic generation of header IDs in markdown files===": "",
    "markdown_header_ids": true
}
```

In most cases, this can be left as it is, but it can be customized however you like. For the purposes of this documentation, these file paths may be referred to occasionally. Just know that you can rename them to whatever you would prefer.

*One thing to note is that while you can define multiple root paths for templates in `root_template_paths`, the first one listed in the array will be the one that Shodo reads the `partials`, `pages`, and `articles` subdirectories from. This will be your main "views" directory (although you may call it whatever you like). Then, additional paths can be added to the template context if, for example, you wanted an entirely separate path for just rendering SVG via Jinja.*

## Store Directory Config

JSON in the `/store` directory is used to globally pass any data you would like to the templates at build time. The `config` value has been reserved by the framework for some specific values that are used by the package.

Example:

```json
{
    "config": {
        "metadata": {
            "title": "Shodo - Static Site Generator",
            "description": "Shodo is a static site generator that uses Markdown and JSON files to generate a static site.",
            "author": "Ryan Phillips",
            "google_font_link": "https://fonts.googleapis.com/css2?family=Momo+Trust+Display&family=Open+Sans:ital,wght@0,300..800;1,300..800&display=swap"
        },
        "url_origin": "https://my-shodo-site.dev",
        "timezone": "America/Chicago"
    }
}
```

### Config Values

**`metadata`**: 

This is used for rendering certain tags in the `<head>` section of the HTML document. The metadata values are also used in [frontmatter](/docs/frontmatter), but the difference is that metadata defined in the `config` JSON is global, meaning it will be applied to every HTML page *unless* it is overwritten in individual file's frontmatters. Metadata defined in frontmatter will be merged with the global metadata, so it will only overwrite individual values and not the whole object. [Read more here](/docs/frontmatter).

**`url_origin`**: 

This is the root origin (protocal, scheme, and port if applicable) of your website. This is used by the site generator to generate peramlinks, as well as replacing relative urls with absolute ones when generating RSS feeds.

**`timezone`**: 

This is only needed if you want to generate local times out of the default UTC date strings that are used in frontmatter. A value will be passed to the rendering context so that the local date object can be accessed in the [layout](/docs/project-structure/#generating-full-pages-from-markdown) template when rendering content from markdown pages.