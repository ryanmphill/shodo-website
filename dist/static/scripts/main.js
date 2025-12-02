function init() {
  const currentPath = window.location.pathname.replace(/^\/|\/$/g, "");
  if (currentPath === "docs") {
    // Replace all instances of `&#x40;` with `@` in the docs content
    const docsSection = document.querySelector("main");
    if (docsSection) {
      // docsSection.innerHTML = docsSection.innerHTML.replace(/&#x40;/g, '@');
      docsSection.innerHTML = docsSection.innerHTML.replace(/&amp;#x40;/g, "@");
    }
  }
}

init();
