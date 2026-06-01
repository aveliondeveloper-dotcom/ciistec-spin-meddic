export function renderTimeline(block) {
  const section = document.createElement("section");

  section.className = "block timeline-block";

  section.innerHTML = `

<div
  class="timeline-container"
>

  ${(block.items || [])
    .map(
      (item) => `

      <div
        class="timeline-item"
      >

        <div
          class="timeline-phase"
        >
          ${item.phase}
        </div>

        <div
          class="timeline-name"
        >
          ${item.name}
        </div>

      </div>

    `,
    )
    .join("")}

</div>

`;

  return section;
}
