// Toggle contacts visibility
const toggleBtn = document.getElementById("toggle-contacts");
const contactsList = document.getElementById("contacts");

if (toggleBtn && contactsList) {
  toggleBtn.addEventListener("click", () => {
    const isHidden = contactsList.classList.toggle("hidden");
    toggleBtn.textContent = isHidden ? "Show contacts" : "Hide contacts";
  });
}

// Science filter
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
