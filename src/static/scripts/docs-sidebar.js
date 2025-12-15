export function initDocsSidebar() {
  const docsSidebarLinks = document.querySelectorAll(".docs-sidebar__link");

  if (docsSidebarLinks.length === 0) {
    console.warn("No docs sidebar links found");
    return;
  }

  const currentPath = window.location.pathname.replace(/^\/|\/$/g, "");

  docsSidebarLinks.forEach((link) => {
    const linkPath = link.getAttribute("href").replace(/^\/|\/$/g, "");
    if (linkPath === currentPath) {
      link.classList.add("docs-sidebar__link--active");
    }
  });
}