import { initDocsSidebar } from "./docs-sidebar.js";
import { addMobileSidebarFunctionality } from "./sidebar.js";
import { initThisPageSidebar } from "./this-page-sidebar.js";

function init() {
  const currentPath = window.location.pathname.replace(/^\/|\/$/g, "");
  if (currentPath.startsWith("docs/")) {
    // Replace all instances of `&#x40;` with `@` in the docs content
    const docsSection = document.querySelector("main");
    if (docsSection) {
      docsSection.innerHTML = docsSection.innerHTML.replace(/&#x40;/g, '@');
      docsSection.innerHTML = docsSection.innerHTML.replace(/&amp;#x40;/g, "@");
    }
  }

  const docsSidebar = document.querySelector(".docs-sidebar");
  const thisPageSidebar = document.querySelector(".this-page-sidebar");
  if (docsSidebar) {
    addMobileSidebarFunctionality(".docs-sidebar", ".docs-sidebar__toggle");
    initDocsSidebar();
  }
  if (thisPageSidebar) {
    addMobileSidebarFunctionality(
      ".this-page-sidebar",
      ".this-page-sidebar__toggle"
    );
    initThisPageSidebar();
  }
}

init();
