import { loadPresentation } from "./presentation-loader.js";

import { renderSlide } from "./slide-renderer.js";

import { initializeNavigation } from "./navigation.js";

function getLoader() {
  return document.getElementById("loader");
}

function getTitleElement() {
  return document.getElementById("presentation-title");
}

async function bootstrap() {
  try {
    const presentation = await loadPresentation();

    const title = getTitleElement();

    if (title) {
      title.textContent = presentation.title;
    }

    renderSlide(0);

    initializeNavigation();

    hideLoader();
  } catch (error) {
    console.error(error);

    showFatalError(error);
  }
}

function hideLoader() {
  const loader = getLoader();

  if (!loader) return;

  loader.style.opacity = "0";

  setTimeout(() => {
    loader.remove();
  }, 600);
}

function showFatalError(error) {
  document.body.innerHTML = `

  <div
    style="
      width:100vw;
      height:100vh;
      display:flex;
      justify-content:center;
      align-items:center;
      flex-direction:column;
      gap:16px;
      background:#05070d;
      color:white;
      font-family:Inter,sans-serif;
    "
  >

<h1>
  Error cargando portal
</h1>

<p>
  ${error.message}
</p>

  </div>

`;
}

window.addEventListener("DOMContentLoaded", bootstrap);
