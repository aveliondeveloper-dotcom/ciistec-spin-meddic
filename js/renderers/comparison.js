export function renderComparison(block) {
  const section = document.createElement("section");

  section.className = "block comparison-block";

  section.innerHTML = `

<div class="comparison-grid">

  <div
    class="comparison-column"
  >

    <h3>
      ${block.leftTitle || ""}
    </h3>

    <ul>

      ${(block.left || []).map((item) => `<li>${item}</li>`).join("")}

    </ul>

  </div>

  <div
    class="comparison-column"
  >

    <h3>
      ${block.rightTitle || ""}
    </h3>

    <ul>

      ${(block.right || []).map((item) => `<li>${item}</li>`).join("")}

    </ul>

  </div>

</div>

`;

  return section;
}
