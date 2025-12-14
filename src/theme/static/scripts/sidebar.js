export function addMobileSidebarFunctionality(
  sidebarSelector,
  toggleButtonSelector,
  mobileBreakpoint = 992
) {
  const sidebar = document.querySelector(sidebarSelector);
  const toggleButtons = document.querySelectorAll(toggleButtonSelector);

  if (!sidebar || toggleButtons.length === 0) {
    console.warn("Sidebar or toggle button not found");
    return;
  }

  toggleButtons.forEach((toggleButton) => {
    toggleButton.addEventListener("click", () => {
      // When closing, Ensure no focus remains in the sidebar before adding aria hidden
      const isOpen = sidebar.classList.contains("sidebar--open");
      if (isOpen) {
        sidebar.querySelector(":focus")?.blur();
        sidebar.classList.remove("sidebar--open");
        setTimeout(() => {
          sidebar.classList.add("sidebar--closed");
          toggleButtons.forEach((btn) =>
            btn.setAttribute("aria-expanded", "false")
          );
        }, 200); // Match the CSS transition duration
      } else {
        sidebar.classList.remove("sidebar--closed");
        // Allow time for display to switch before removing the class
        window.requestAnimationFrame(() => {
          window.requestAnimationFrame(() => {
            sidebar.classList.add("sidebar--open");
            toggleButtons.forEach((btn) =>
              btn.setAttribute("aria-expanded", "true")
            );
            // Focus the first focusable element in the sidebar
            const firstFocusable = sidebar.querySelector(
              'a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])'
            );
            firstFocusable?.focus();
          });
        });
      }

      //   sidebar.classList.toggle("sidebar--open");
      //   sidebar.setAttribute(
      //     "aria-hidden",
      //     sidebar.classList.contains("sidebar--open") ? "false" : "true"
      //   );
      //   toggleButton.setAttribute(
      //     "aria-expanded",
      //     sidebar.classList.contains("sidebar--open") ? "true" : "false"
      //   );
    });
  });

  // Ensure sidebar automatically closes when tabbing out of it
  sidebar.addEventListener("keydown", (event) => {
    if (window.innerWidth > mobileBreakpoint) {
      return; // Only apply on mobile viewports
    }
    if (event.key === "Tab") {
      const focusableElements = sidebar.querySelectorAll(
        'a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (event.shiftKey) {
        // Tabbing backwards
        if (document.activeElement === firstElement) {
          sidebar.classList.remove("sidebar--open");
          setTimeout(() => {
            sidebar.classList.add("sidebar--closed");
            toggleButtons.forEach((btn) =>
              btn.setAttribute("aria-expanded", "false")
            );
            // Move focus to the toggle button
            toggleButtons[0].focus();
          }, 200);
        }
      } else {
        // Tabbing forwards
        if (document.activeElement === lastElement) {
          sidebar.classList.remove("sidebar--open");
          setTimeout(() => {
            sidebar.classList.add("sidebar--closed");
            toggleButtons.forEach((btn) =>
              btn.setAttribute("aria-expanded", "false")
            );
            // Move focus to the toggle button
            toggleButtons[0].focus();
            // Move focus +1 to prevent immediate re-entry
            const nextTabbableEl = getNextTabbableElement(toggleButtons[0]);
            nextTabbableEl?.focus();
          }, 200);
        }
      }
    }
  });

  // Close sidebar when clicking outside
  document.addEventListener("click", (event) => {
    if (window.innerWidth > mobileBreakpoint) {
      return; // Only apply on mobile viewports
    }
    if (
      !sidebar.contains(event.target) &&
      !Array.from(toggleButtons).some((btn) => btn.contains(event.target))
    ) {
      sidebar.classList.remove("sidebar--open");
      setTimeout(() => {
        sidebar.classList.add("sidebar--closed");
        toggleButtons.forEach((btn) =>
          btn.setAttribute("aria-expanded", "false")
        );
      }, 200);
    }
  });

  // Close sidebar after clicking link inside it
  sidebar.addEventListener("click", (event) => {
    if (window.innerWidth > mobileBreakpoint) {
      return; // Only apply on mobile viewports
    }
    const target = event.target;
    if (target.tagName === "A") {
      sidebar.classList.remove("sidebar--open");
      setTimeout(() => {
        sidebar.classList.add("sidebar--closed");
        toggleButtons.forEach((btn) =>
          btn.setAttribute("aria-expanded", "false")
        );
      }, 200);
    }
  });

  const handleViewportResize = () => {
    if (window.innerWidth > mobileBreakpoint) {
      // Ensure sidebar is visible on larger screens
      sidebar.classList.remove("sidebar--open");
      sidebar.classList.remove("sidebar--closed");
      //   sidebar.setAttribute("aria-hidden", "false");
      toggleButtons.forEach((btn) => btn.setAttribute("aria-expanded", "true"));
    } else {
      // On smaller screens, ensure sidebar is closed initially
      sidebar.classList.add("sidebar--closed");
      //   sidebar.setAttribute("aria-hidden", "true");
      toggleButtons.forEach((btn) =>
        btn.setAttribute("aria-expanded", "false")
      );
    }
  };

  // Initial check
  handleViewportResize();

  // Debounced resize event listener
  window.addEventListener("resize", debounce(handleViewportResize, 150));
}

function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

function getNextTabbableElement(currentElement) {
  const focusableElements = Array.from(
    document.querySelectorAll(
      'a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )
  ).filter((el) => !el.hasAttribute("disabled") && el.offsetParent !== null);

  const currentIndex = focusableElements.indexOf(currentElement);
  if (currentIndex === -1 || currentIndex === focusableElements.length - 1) {
    return null;
  }
  let result = focusableElements?.[currentIndex + 1] ?? null;
  if (result === null) {
    // Wrap around to the first element
    result = focusableElements[0];
  }
  return result;
}
