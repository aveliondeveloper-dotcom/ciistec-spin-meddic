export function renderHeader(block) {
  const section = document.createElement("section");

  section.className = "block block-header";

  section.innerHTML = `

<div class="header-main">

  ${
    block.icon
      ? `
        <img
          class="header-icon"
          src="${block.icon}"
          alt=""
        >
      `
      : ""
  }

  <h2>
    ${block.title || ""}
  </h2>

</div>

${
  block.subtitle
    ? `
      <p class="header-subtitle">
        ${block.subtitle}
      </p>
    `
    : ""
}

`;

  return section;
}
