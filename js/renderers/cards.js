export function renderCards(block) {
  const section = document.createElement("section");

  section.className = "block";

  const items = block.items || [];

  section.innerHTML = `

<div class="cards-grid">

  ${items
    .map(
      (item) => `

      <article class="card">

        ${
          item.icon
            ? `
            <img
              class="card-icon"
              src="${item.icon}"
              alt=""
            >
          `
            : ""
        }

        <h3>
          ${item.title || ""}
        </h3>

      </article>

    `,
    )
    .join("")}

</div>

`;

  return section;
}
