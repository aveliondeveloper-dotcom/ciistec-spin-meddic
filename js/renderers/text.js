export function renderText(block) {
  const section = document.createElement("section");

  const variant = block.variant || "body";

  section.className = `block text-block text-${variant}`;

  section.innerHTML = `

<div class="text-content">

  ${block.content || ""}

</div>

`;

  return section;
}
