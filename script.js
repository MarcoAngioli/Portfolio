// === CONTACTS TOGGLE ===
const toggleBtn = document.getElementById("toggle-contacts");
const contactsList = document.getElementById("contacts");

if (toggleBtn && contactsList) {
  toggleBtn.addEventListener("click", () => {
    const isHidden = contactsList.classList.toggle("hidden");
    toggleBtn.textContent = isHidden ? "Show contacts" : "Hide contacts";
  });
}

// === SCIENCE FILTER ===
const filterButtons = document.querySelectorAll(".filter-btn");
const scienceItems = document.querySelectorAll(".science-item");

filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const filter = btn.dataset.filter;

    filterButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    scienceItems.forEach((item) => {
      const category = item.dataset.category;
      if (filter === "all" || filter === category) {
        item.style.display = "";
      } else {
        item.style.display = "none";
      }
    });
  });
});

// === SCROLL PROGRESS BAR ===
const scrollProgressEl = document.getElementById("scrollProgress");

function updateScrollProgress() {
  if (!scrollProgressEl) return;
  const scrollTop = window.scrollY || window.pageYOffset;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  scrollProgressEl.style.width = progress + "%";
}

window.addEventListener("scroll", updateScrollProgress);
window.addEventListener("resize", updateScrollProgress);
updateScrollProgress();

// === SECTION FADE-IN ON SCROLL & ACTIVE NAV ===
const sections = document.querySelectorAll("main .section");
const navLinks = document.querySelectorAll(".sidebar-nav a");

// IntersectionObserver for fade-in
if ("IntersectionObserver" in window) {
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    {
      threshold: 0.2,
    }
  );

  sections.forEach((section) => sectionObserver.observe(section));
} else {
  // Fallback: just show sections
  sections.forEach((section) => section.classList.add("visible"));
}

// Active nav link on scroll
function updateActiveNav() {
  let currentId = null;

  sections.forEach((section) => {
    const rect = section.getBoundingClientRect();
    if (rect.top <= 120 && rect.bottom >= 120) {
      currentId = section.id;
    }
  });

  navLinks.forEach((link) => {
    const href = link.getAttribute("href") || "";
    const id = href.startsWith("#") ? href.slice(1) : null;
    if (id && id === currentId) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
}

window.addEventListener("scroll", updateActiveNav);
window.addEventListener("resize", updateActiveNav);
updateActiveNav();

// === BACK TO TOP BUTTON ===
const backToTopBtn = document.getElementById("backToTop");

function updateBackToTopVisibility() {
  if (!backToTopBtn) return;
  if (window.scrollY > 400) {
    backToTopBtn.classList.add("visible");
  } else {
    backToTopBtn.classList.remove("visible");
  }
}

if (backToTopBtn) {
  backToTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

window.addEventListener("scroll", () => {
  updateBackToTopVisibility();
});
updateBackToTopVisibility();
