/* ============================================
   PROSPER PRODUCTION — Main Script
   GSAP + Lenis + Custom Cursor + Interactions
   ============================================ */

(function () {
  "use strict";

  // ---- GSAP Defaults ----
  gsap.defaults({
    ease: "power4.out",
    duration: 1,
  });

  gsap.registerPlugin(ScrollTrigger);

  const EASE = "power4.out";
  const EASE_SLOW = "power3.inOut";

  // ============================================
  // PRELOADER
  // ============================================
  function initPreloader() {
    const preloader = document.getElementById("preloader");
    const paths = document.querySelectorAll(".logo-path");
    const preText = document.querySelector(".preloader__text");

    // Animate SVG paths
    const tl = gsap.timeline();

    paths.forEach((path, i) => {
      const length = path.getTotalLength();
      path.style.strokeDasharray = length;
      path.style.strokeDashoffset = length;

      tl.to(
        path,
        {
          strokeDashoffset: 0,
          duration: 1.8,
          ease: EASE,
        },
        i * 0.4
      );
    });

    // Show brand text
    tl.add(() => {
      preText.classList.add("visible");
    }, 1.5);

    // Curtain reveal
    tl.add(() => {
      preloader.classList.add("done");
    }, 3);

    // Remove preloader & start page animations
    tl.add(() => {
      preloader.classList.add("hidden");
      initPageAnimations();
    }, 4.2);
  }

  // ============================================
  // LENIS SMOOTH SCROLL
  // ============================================
  let lenis;

  function initLenis() {
    lenis = new Lenis({
      duration: 1.2,
      easing: function (t) {
        return Math.min(1, 1.001 - Math.pow(2, -10 * t));
      },
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      touchMultiplier: 2,
    });

    // Connect Lenis to GSAP ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add(function (time) {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    // Handle anchor links smoothly
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
      anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
          lenis.scrollTo(target, { offset: 0, duration: 1.5 });
          // Close mobile menu if open
          const mobileMenu = document.getElementById("mobile-menu");
          const menuBtn = document.getElementById("menu-toggle");
          if (mobileMenu.classList.contains("open")) {
            mobileMenu.classList.remove("open");
            menuBtn.classList.remove("active");
          }
        }
      });
    });
  }

  // ============================================
  // CUSTOM CURSOR
  // ============================================
  function initCursor() {
    const dot = document.getElementById("cursor-dot");
    const ring = document.getElementById("cursor-ring");

    // Check for touch device
    if ("ontouchstart" in window) return;

    let mouseX = -100,
      mouseY = -100;
    let dotX = -100,
      dotY = -100;
    let ringX = -100,
      ringY = -100;

    document.addEventListener("mousemove", function (e) {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.classList.add("visible");
      ring.classList.add("visible");
    });

    document.addEventListener("mouseleave", function () {
      dot.classList.remove("visible");
      ring.classList.remove("visible");
    });

    // Smooth follow with RAF
    function animateCursor() {
      // Dot follows closely
      dotX += (mouseX - dotX) * 0.2;
      dotY += (mouseY - dotY) * 0.2;
      dot.style.left = dotX + "px";
      dot.style.top = dotY + "px";

      // Ring follows with more lag
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;
      ring.style.left = ringX + "px";
      ring.style.top = ringY + "px";

      requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Hover detection
    function addHoverListeners() {
      document
        .querySelectorAll('a, button, [data-cursor-hover], input, textarea')
        .forEach(function (el) {
          el.addEventListener("mouseenter", function () {
            dot.classList.add("hovering");
            ring.classList.add("hovering");
          });
          el.addEventListener("mouseleave", function () {
            dot.classList.remove("hovering");
            ring.classList.remove("hovering");
          });
        });
    }
    addHoverListeners();

    // Watch for DOM changes
    new MutationObserver(addHoverListeners).observe(document.body, {
      childList: true,
      subtree: true,
    });
  }

  // ============================================
  // MOBILE MENU
  // ============================================
  function initMobileMenu() {
    const btn = document.getElementById("menu-toggle");
    const menu = document.getElementById("mobile-menu");

    btn.addEventListener("click", function () {
      btn.classList.toggle("active");
      menu.classList.toggle("open");
    });
  }

  // ============================================
  // PAGE ANIMATIONS (after preloader)
  // ============================================
  function initPageAnimations() {
    // Show navbar
    document.getElementById("navbar").classList.add("visible");

    // Hero animations
    initHeroAnimation();

    // Scroll-triggered animations
    initScrollAnimations();

    // Works hover interaction
    initWorksHover();
  }

  // ============================================
  // HERO ANIMATION
  // ============================================
  function initHeroAnimation() {
    const tl = gsap.timeline({ delay: 0.3 });

    // Label
    tl.to(".hero__label", {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: EASE,
    });

    // Headline words stagger
    tl.to(
      ".hero-word",
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        stagger: 0.15,
        ease: EASE,
      },
      0.2
    );

    // Subtitle words
    tl.to(
      ".sub-word",
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.08,
        ease: EASE,
      },
      0.8
    );

    // Divider
    tl.to(
      ".hero__divider",
      {
        scaleX: 1,
        duration: 1.5,
        ease: EASE,
      },
      1.2
    );

    // Side lines
    tl.add(function () {
      document.querySelectorAll(".hero__line").forEach(function (line) {
        line.classList.add("visible");
      });
    }, 0.5);

    // Scroll indicator
    tl.to(
      ".hero__scroll",
      {
        opacity: 1,
        duration: 1,
      },
      1.8
    );
  }

  // ============================================
  // SCROLL-TRIGGERED ANIMATIONS
  // ============================================
  function initScrollAnimations() {
    // Fade in
    gsap.utils.toArray('[data-animate="fade"]').forEach(function (el) {
      gsap.to(el, {
        opacity: 1,
        duration: 1,
        ease: EASE,
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          once: true,
        },
        delay: parseFloat(el.dataset.delay || 0),
      });
    });

    // Slide up
    gsap.utils.toArray('[data-animate="slide-up"]').forEach(function (el) {
      gsap.to(el, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: EASE,
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          once: true,
        },
        delay: parseFloat(el.dataset.delay || 0),
      });
    });

    // Line scale
    gsap.utils.toArray('[data-animate="line"]').forEach(function (el) {
      gsap.to(el, {
        scaleX: 1,
        duration: 1.2,
        ease: EASE,
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          once: true,
        },
        delay: parseFloat(el.dataset.delay || 0),
      });
    });
  }

  // ============================================
  // WORKS - HOVER THUMBNAIL REVEAL
  // ============================================
  function initWorksHover() {
    const container = document.getElementById("works-list");
    const thumbnail = document.getElementById("works-thumbnail");
    const thumbInner = document.getElementById("thumb-inner");
    const items = document.querySelectorAll(".works__item");

    if (!container || !thumbnail || window.innerWidth < 769) return;

    let currentX = 0,
      currentY = 0;
    let targetX = 0,
      targetY = 0;

    // Mouse move → update target position
    container.addEventListener("mousemove", function (e) {
      targetX = e.clientX;
      targetY = e.clientY;
    });

    // Smooth follow
    function animateThumb() {
      currentX += (targetX - currentX) * 0.1;
      currentY += (targetY - currentY) * 0.1;
      thumbnail.style.left = currentX + "px";
      thumbnail.style.top = currentY + "px";
      thumbnail.style.transform =
        "translate(-50%, -50%) scale(" +
        (thumbnail.classList.contains("visible") ? "1" : "0.85") +
        ")";
      requestAnimationFrame(animateThumb);
    }
    animateThumb();

    // Hover events on each item
    items.forEach(function (item) {
      item.addEventListener("mouseenter", function () {
        const category = item.dataset.category;
        const color = item.dataset.color || "rgba(212,175,55,0.1)";

        thumbInner.style.background =
          "linear-gradient(135deg, " + color + ", rgba(10,14,20,0.95) 70%)";
        thumbInner.innerHTML =
          '<span style="font-family: Cinzel, serif; font-size: 1rem; color: rgba(212,175,55,0.3);">' +
          category +
          "</span>";

        thumbnail.classList.add("visible");
      });

      item.addEventListener("mouseleave", function () {
        thumbnail.classList.remove("visible");
      });
    });
  }

  // ============================================
  // INIT
  // ============================================
  document.addEventListener("DOMContentLoaded", function () {
    initLenis();
    initCursor();
    initMobileMenu();
    initPreloader();
  });
})();
