// ✅ FIX: Prevent auto-scroll to #section on refresh
window.addEventListener("load", () => {
  if (window.location.hash) {
    history.replaceState(null, null, window.location.pathname);
    window.scrollTo(0, 0); // Reset to top
  }
});

// ✅ Optional: Scroll to top before reload (just in case)
window.onbeforeunload = () => {
  window.scrollTo(0, 0);
};

const navbar = document.querySelector(".navbar");

// ✅ Sections that trigger navbar to show
const revealSections = [
  "#about",
  "#skills",
  "#education",
  "#certificates",
  "#projects",
  "#workshop",
  "#contact",
].map(id => document.querySelector(id));

// ✅ Show/hide navbar based on scroll
const navbarObserver = new IntersectionObserver((entries) => {
  const show = entries.some(entry => entry.isIntersecting);
  navbar.classList.toggle("show", show);
}, { threshold: 0.5 });

revealSections.forEach(section => {
  if (section) navbarObserver.observe(section);
});

// ✅ Animate fade-in sections
window.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll(".section");
  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-in-bottom");
      }
    });
  }, { threshold: 0.2 });

  sections.forEach(section => fadeObserver.observe(section));
});

// ✅ Hide nav link for visible section
const sectionMap = {};
document.querySelectorAll("section").forEach(section => {
  const id = section.id;
  const link = document.querySelector(`.navbar a[href="#${id}"]`);
  if (link) sectionMap[id] = link;
});

const activeLinkObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    const id = entry.target.id;
    const link = sectionMap[id];

    if (!link) return;

    if (entry.isIntersecting) {
      link.classList.add("fading-out");
    } else {
      link.classList.remove("fading-out");
    }
  });
}, { threshold: 0.6 });

Object.keys(sectionMap).forEach(id => {
  const section = document.getElementById(id);
  if (section) activeLinkObserver.observe(section);
});

// ✅ Smooth scroll on navbar link click
document.querySelectorAll('.navbar a').forEach(link => {
  link.addEventListener('click', function (e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    const targetSection = document.querySelector(targetId);

    if (targetSection) {
      targetSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});


