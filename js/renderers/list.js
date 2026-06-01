export function renderList(block) {
  const section = document.createElement("section");

  const variant = block.variant || "default";

  section.className = `block list-block list-${variant}`;

  const items = block.items || [];

  section.innerHTML = `

<ul class="executive-list">

  ${items
    .map(
      (item) => `

      <li>

        <span class="list-dot"></span>

        <span>
          ${item}
        </span>

      </li>

    `,
    )
    .join("")}

</ul>

`;

  return section;
}
