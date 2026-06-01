export function renderKpis(block) {
  const section = document.createElement("section");

  section.className = "block";

  const items = block.items || [];

  section.innerHTML = `

<div class="kpis-grid">

  ${items
    .map(
      (item) => `

      <article
        class="kpi-card"
      >

        <div
          class="kpi-value"
        >
          ${item.value || ""}
        </div>

        <div
          class="kpi-label"
        >
          ${item.label || ""}
        </div>

      </article>

    `,
    )
    .join("")}

</div>

`;

  return section;
}
