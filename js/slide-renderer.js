import { state } from "./state.js";

import { renderers } from "./registry.js";

const VALID_ANIMATIONS = ["reveal", "fade-up", "zoom", "cards", "timeline"];

function getSlideContainer() {
  return document.getElementById("slide-container");
}

function getBackgroundLayer() {
  return document.getElementById("background-layer");
}

export function renderSlide(index) {
  const slide = state.presentation.slides[index];

  if (!slide) return;

  const container = getSlideContainer();

  container.innerHTML = "";

  container.className = "slide";

  const animation = VALID_ANIMATIONS.includes(slide.animation)
    ? slide.animation
    : "zoom";

  container.classList.add(animation);

  updateBackground(slide);

  slide.blocks.forEach((block) => {
    const renderer = renderers[block.type];

    if (!renderer) {
      console.warn(`Renderer no encontrado: ${block.type}`);

      return;
    }

    const node = renderer(block);

    if (node) {
      container.appendChild(node);
    }
  });
}

function updateBackground(slide) {
  const layer = getBackgroundLayer();

  layer.className = "background-layer";

  if (slide.background) {
    layer.classList.add(`bg-${slide.background}`);
  }
}
