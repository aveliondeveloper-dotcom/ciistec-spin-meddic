import { state, setCurrentSlide } from "./state.js";

import { renderSlide } from "./slide-renderer.js";

function getCounter() {
  return document.getElementById("slide-counter");
}

function getProgressBar() {
  return document.getElementById("progress-bar");
}

export function initializeNavigation() {
  bindKeyboard();

  bindButtons();

  bindTouch();

  updateNavigationUI();
}

export function nextSlide() {
  if (state.currentSlide >= state.totalSlides - 1) {
    return;
  }

  setCurrentSlide(state.currentSlide + 1);

  renderSlide(state.currentSlide);

  updateNavigationUI();
}

export function previousSlide() {
  if (state.currentSlide <= 0) {
    return;
  }

  setCurrentSlide(state.currentSlide - 1);

  renderSlide(state.currentSlide);

  updateNavigationUI();
}

function bindButtons() {
  const next = document.getElementById("next-slide");

  const prev = document.getElementById("prev-slide");

  next?.addEventListener("click", nextSlide);

  prev?.addEventListener("click", previousSlide);
}

function bindKeyboard() {
  window.addEventListener("keydown", (event) => {
    if (event.key === "ArrowRight") {
      nextSlide();
    }

    if (event.key === "ArrowLeft") {
      previousSlide();
    }
  });
}

function bindTouch() {
  document.addEventListener("touchstart", (event) => {
    state.touchStartX = event.changedTouches[0].screenX;
  });

  document.addEventListener("touchend", (event) => {
    state.touchEndX = event.changedTouches[0].screenX;

    const delta = state.touchEndX - state.touchStartX;

    if (delta > 80) {
      previousSlide();
    }

    if (delta < -80) {
      nextSlide();
    }
  });
}

export function updateNavigationUI() {
  const counter = getCounter();

  const progress = getProgressBar();

  if (counter) {
    counter.textContent = `${state.currentSlide + 1} / ${state.totalSlides}`;
  }

  if (progress) {
    const width = ((state.currentSlide + 1) / state.totalSlides) * 100;

    progress.style.width = `${width}%`;
  }
}
