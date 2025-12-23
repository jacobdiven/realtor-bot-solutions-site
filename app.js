// Reveal animations (Apple-ish)
const revealEls = [...document.querySelectorAll(".reveal")];
const io = new IntersectionObserver((entries) => {
  for (const e of entries) {
    if (e.isIntersecting) {
      e.target.classList.add("in");
      io.unobserve(e.target);
    }
  }
}, { threshold: 0.14 });
revealEls.forEach(el => io.observe(el));

// Smooth anchor scrolling with nav offset
const nav = document.querySelector(".nav");
const navOffset = () => (nav?.offsetHeight || 0) + 18;

document.addEventListener("click", (ev) => {
  const a = ev.target.closest("a[href^='#']");
  if (!a) return;
  const href = a.getAttribute("href");
  if (!href || href === "#") return;

  const target = document.querySelector(href);
  if (!target) return;

  ev.preventDefault();
  closeMobile();

  const top = target.getBoundingClientRect().top + window.scrollY - navOffset();
  window.scrollTo({ top, behavior: "smooth" });
  history.pushState(null, "", href);
});

// Mobile menu
const burger = document.querySelector(".burger");
const mobile = document.querySelector(".mobile");

function openMobile(){
  burger?.setAttribute("aria-expanded", "true");
  mobile?.classList.add("show");
  mobile?.setAttribute("aria-hidden", "false");
}
function closeMobile(){
  burger?.setAttribute("aria-expanded", "false");
  mobile?.classList.remove("show");
  mobile?.setAttribute("aria-hidden", "true");
}
burger?.addEventListener("click", () => {
  const expanded = burger.getAttribute("aria-expanded") === "true";
  expanded ? closeMobile() : openMobile();
});

// Subtle “liquid glass” tilt (very light)
const tilts = document.querySelectorAll(".glass");
tilts.forEach(el => {
  let raf = null;

  el.addEventListener("mousemove", (e) => {
    if (raf) cancelAnimationFrame(raf);
    raf = requestAnimationFrame(() => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      el.style.transform = `translateY(-1px) rotateX(${(-y * 3.2).toFixed(2)}deg) rotateY(${(x * 4.2).toFixed(2)}deg)`;
    });
  });

  el.addEventListener("mouseleave", () => {
    el.style.transform = "";
  });
});
