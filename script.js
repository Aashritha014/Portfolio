// Typing Animation
const text = "Learning, coding, and building stuff...";
const typingElement = document.querySelector(".typing");
let index = 0;

function type() {
  if (index < text.length) {
    typingElement.innerHTML += text.charAt(index);
    index++;
    setTimeout(type, 100);
  } else {
    setTimeout(() => {
      typingElement.innerHTML = "";
      index = 0;
      type();
    }, 2000);
  }
}
type();

// Smooth Scroll with offset
const sections = document.querySelectorAll("section");
const sidebarLinks = document.querySelectorAll(".sidebar-link");

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    const offsetTop = target.offsetTop - 50;
    window.scrollTo({
      top: offsetTop,
      behavior: "smooth"
    });
  });
});

// Highlight active section in sidebar
window.addEventListener("scroll", () => {
  let current = "";
  const offset = 150; // adjust to match sidebar/spacing

  sections.forEach(section => {
    const sectionTop = section.offsetTop - offset;
    const sectionBottom = sectionTop + section.offsetHeight;
    if (window.scrollY >= sectionTop && window.scrollY < sectionBottom) {
      current = section.getAttribute("id");
    }
  });

  sidebarLinks.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
});


// Dark/Light Mode Toggle
const themeToggle = document.querySelector(".theme-btn"); // single button

const body = document.body;

// Load saved theme
if (localStorage.getItem("theme") === "dark") {
  body.classList.add("dark");
  body.classList.remove("light");
  themeToggle.textContent = "☀️";
} else {
  body.classList.add("light");
  body.classList.remove("dark");
  themeToggle.textContent = "🌙";
}

themeToggle.addEventListener("click", () => {
  body.classList.toggle("dark");
  body.classList.toggle("light");
  if (body.classList.contains("dark")) {
    localStorage.setItem("theme", "dark");
    themeToggle.textContent = "☀️";
  } else {
    localStorage.setItem("theme", "light");
    themeToggle.textContent = "🌙";
  }
});
