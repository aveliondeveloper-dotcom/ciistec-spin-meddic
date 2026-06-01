export function renderDiagnostic(block) {
  const section = document.createElement("section");

  section.className = "block diagnostic-block";

  section.innerHTML = `

<div
  class="diagnostic-header"
>

  <h3>
    ${block.title || ""}
  </h3>

</div>

<div
  class="diagnostic-questions"
>

  ${(block.questions || [])
    .map(
      (question) => `

      <div
        class="question-item"
      >

        <span
          class="bullet"
        ></span>

        <p>
          ${question}
        </p>

      </div>

    `,
    )
    .join("")}

</div>

`;

  return section;
}
