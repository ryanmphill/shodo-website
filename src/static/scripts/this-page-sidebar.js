export function initThisPageSidebar() {
  const mainContent = document.querySelector(".docs-page__main");
  const sidebarList = document.getElementById("this-page-sidebar-items");

  if (!mainContent || !sidebarList) {
    console.warn("Main content or sidebar list not found");
    return;
  }

  const headers = mainContent.querySelectorAll("h2, h3");
  headers.forEach((header) => {
    const li = document.createElement("li");
    li.classList.add(
      `this-page-sidebar__item`,
      `this-page-sidebar__item--${header.tagName.toLowerCase()}`
    );

    const a = document.createElement("a");
    a.href = `#${header.id}`;
    a.textContent = header.textContent;
    a.classList.add("this-page-sidebar__link");
    a.setAttribute("data-content", header.textContent);

    // Add this-page-sidebar__link--active on first iteration
    if (header === headers[0]) {
      a.classList.add("this-page-sidebar__link--active");
    }

    li.appendChild(a);
    sidebarList.appendChild(li);
  });

  // Intersection Observer to highlight current section
  const options = {
    root: null,
    // rootMargin: "62px 0px 0px 0px", // To determine this value, consider header height
    // threshold: 0.01, // Trigger when 10% of the header is visible
    // Trigger when the header is at the top of the viewport
    threshold: 0,
    rootMargin: "-64px 0px -80% 0px", // Adjust for fixed header height
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const id = entry.target.id;
      const sidebarLink = sidebarList.querySelector(`a[href="#${id}"]`);

      if (entry.isIntersecting) {
        sidebarList
          .querySelectorAll(".this-page-sidebar__link")
          .forEach((link) => {
            link.classList.remove("this-page-sidebar__link--active");
          });
        if (sidebarLink) {
          sidebarLink.classList.add("this-page-sidebar__link--active");
        }
      }
    });
  }, options);

  headers.forEach((header) => {
    observer.observe(header);
  });

  // Smooth scroll behavior for sidebar links
  sidebarList.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      const targetId = link.getAttribute("href").substring(1);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        window.scrollTo({
          top:
            targetElement.getBoundingClientRect().top + window.pageYOffset - 64, // Adjust for fixed header height
          behavior: "smooth",
        });
        // Make sure the clicked link is marked active
        sidebarList
          .querySelectorAll(".this-page-sidebar__link")
          .forEach((l) => {
            l.classList.remove("this-page-sidebar__link--active");
          });
        link.classList.add("this-page-sidebar__link--active");
      }
    });
  });

  // If the url has a hash on page load, scroll to that section and highlight it
  window.addEventListener("load", () => {
    if (window.location.hash) {
        const targetId = window.location.hash.substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
        window.scrollTo({
            top:
            targetElement.getBoundingClientRect().top +
            window.pageYOffset -
            64, // Adjust for fixed header height
            behavior: "smooth",
        });
        const sidebarLink = sidebarList.querySelector(
            `a[href="#${targetId}"]`
        );
        if (sidebarLink) {
            sidebarList
            .querySelectorAll(".this-page-sidebar__link")
            .forEach((l) => {
                l.classList.remove("this-page-sidebar__link--active");
            });
            sidebarLink.classList.add("this-page-sidebar__link--active");
        }
        }
    }
    });
}
