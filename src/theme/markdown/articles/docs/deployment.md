@frontmatter
{
    "title": "Deployment",
    "description": "Tips for deploying your Shodo project.",
    "category": "docs"
}
@endfrontmatter

Shodo always generates static websites, which means they can be deployed just about anywhere and everywhere! For convenience, we'll briefly go over how to deploy to Netlify.

## Netlify

### Prepare Dependencies

1. If you are using pipenv, Netflify will install dependencies directly from the `pipfile`. Otherwise, you will need to generate a `requirements.txt` file via `pip freeze > requirements.txt`, `poetry export --format=requirements.txt > requirements.txt`, `uv pip compile pyproject.toml -o requirements.txt`, or similar to allow the dependencies to be installed via pip.

#### pipenv

If using pipenv, your `pipfile` dependency should look something like this:

```py
[packages]
shodo-ssg = "*"
```

If you haven't already, generate the lock file via pipenv lock, then go ahead and verify the package is installable with the command pipenv sync.

If you installed the project via `pipenv install`, this was already done and you can move on to the next step

#### pip

If using pip, after generating your `requirements.txt`, the file should look similar to this:

```py
Jinja2==<version>
markdown2==<version>
MarkupSafe==<version>
shodo_ssg===<version>
```


### Upload Project

2. Create a new repository on GitHub and push the Shodo project up to it (or add the project manually if you don't want to use GitHub)
3. Now, we have everything we will need to build and deploy the static site on Netlify. We will have to make a few specifications since Netlify won't be able to autodetect everything about the build configuration
4. Choose "Add new site" on Netlify, and select the repository with your site
5. For the `build command`, specify `python site_builder.py`
6. Luckily, Netlify supports Python and will be able to automatically install dependencies from either the pipfile or requirements.txt. The only extra step we need to take is to change the default python version from 3.8 to a current version supported by Shodo. To do this, go to the environment variables section and add `PYTHON_VERSION` for the variable name, and put your project's Python version (`3.9` or greater) for the value.
7. Now click to deploy the site. After around a minute, verify that the build was successful, and you should be able to view the deployed site!

### Reference

Reference: [Netlify Python Documentation](https://docs.netlify.com/configure-builds/manage-dependencies/#python)
