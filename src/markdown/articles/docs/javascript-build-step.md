@frontmatter
{
    "title": "JavaScript Build Step",
    "description": "How to add a JavaScript build step to your Shodo project.",
    "category": "docs"
}
@endfrontmatter

Shodo doesn't have any strong opinions about how you handle JavaScript building, bundling, minification, etc. (if it is needed), but it should be *fairly* straighforward to add whichever method you prefer by integrating it into `site_builder.py`.

## Overview

What we will need to do to add the JS build step is:

1. Update your source JavaScript file location in `build_settings.json` to whatever the output of your bundler will be.
2. Add that source filepath to your `.gitignore` if applicable.
3. Configure the bundler
4. Integrate the bundler into `site_builder.py`

## Example Using ESBuild

We'll show a quick and easy example using [ESBuild](https://esbuild.github.io/getting-started/).

### Shodo Config

Lets go into `build_settings.json` and change the script value:

```JavaScript
{
    // ...other settings,
    "scripts_path": "src/static/scripts/dist"
}
```

Now, add `src/static/scripts/src` to your project. This is where you will write your JavaScript (or TypeScript).

If you are using source control, now would be a good time to add `src/static/scripts/dist` to your `.gitignore`.

### Install ESBuild

Visit the [ESBuild](https://esbuild.github.io/getting-started/) docs and install the package.

### ESBuild Config


Now, create `esbuild.config.mjs` at the root of your project and paste in the following:

```JavaScript
import * as esbuild from "esbuild";

const isWatch = process.argv.includes("--watch");
const isBuild = process.argv.includes("--build");
const isDev = process.argv.includes("--dev");

const entryPoints = [
  "src/static/scripts/src/main.js",
  // Optionally add more sources
];

async function cleanUp(ctx) {
  if (ctx) {
    console.log("\nStopping watch...");
    await ctx.dispose(); // Clean up esbuild context
    console.log("✅ Watch mode stopped gracefully.");
  }
  process.exit(0); // Exit with a success code
}

if (isWatch) {
  let ctx = await esbuild.context({
    entryPoints: entryPoints,
    entryNames: "[name]",
    outdir: "src/static/scripts/dist",
    outbase: "src",
    bundle: true,
    minify: false,
  });
  await ctx.watch();
  console.log(
    "✅ Watching for changes in the following esbuild entry points..."
  );
  console.log(entryPoints);

  // Handle SIGINT (Ctrl+C) and SIGTERM (e.g., from Docker container)
  process.on("SIGINT", () => cleanUp(ctx));
  process.on("SIGTERM", () => cleanUp(ctx));

  console.log("Press Ctrl+C to stop watching.");
}

// Build once
if (isBuild) {
  let result = await esbuild.build({
    entryPoints: entryPoints,
    entryNames: "[name]",
    outdir: "src/static/scripts/dist",
    outbase: "src",
    bundle: true,
    minify: true,
  });
  if (result && result.errors.length === 0 && result.warnings.length === 0) {
    console.log("✅ Build complete");
  } else {
    console.log("❌ Build failed");
    if (result.errors.length > 0) {
      console.log(result.errors);
    }
    if (result.warnings.length > 0) {
      console.log(result.warnings);
    }
  }
}

if (isDev) {
  let result = await esbuild.build({
    entryPoints: entryPoints,
    entryNames: "[name]",
    outdir: "src/static/scripts/dist",
    outbase: "src",
    bundle: true,
    minify: false,
    sourcemap: "linked",
  });
  if (result && result.errors.length === 0 && result.warnings.length === 0) {
    console.log("✅ Build complete");
  } else {
    console.log("❌ Build failed");
    if (result.errors.length > 0) {
      console.log(result.errors);
    }
    if (result.warnings.length > 0) {
      console.log(result.warnings);
    }
  }
}
```

### Update Build Script

Finally, go into `site_builder.py` at the root of the project and add

```Python
os.system("npm run build")
```

right before the `build_static_site` function. (Replace `npm` if you are using a different package manager)

The final result will look something like this:

```Python
"""
This module builds a static site in the destination directory from jinja2
templates and all static assets
"""

import os
from shodo_ssg import build_static_site

if __name__ == "__main__":
    # Set the ROOT_PATH variable to the directory of this file
    root_path = os.path.dirname(os.path.abspath(__file__))
    # Bundle and minify the JavaScript files
    os.system("npm run build")
    build_static_site(root_path)
```

And in `serve.py`, you can include the source map:

```Python
"""
This module script is similar to running `python3 -m http.server --bind 127.0.0.1 3000 -d dist`
from the command line, but automatically runs the build script prior to starting up
the web server
"""

import os
import subprocess
from shodo_ssg import build_static_site, start_server

if __name__ == "__main__":
    # Set the ROOT_PATH variable to the directory of this file
    root_path = os.path.dirname(os.path.abspath(__file__))
    # Bundle and minify the JavaScript files
    subprocess.run(["npm", "run", "dev"], check=True)
    build_static_site(root_path)
    start_server(root_path)
```

Now you're all set to use NPM packages with your Shodo project!
