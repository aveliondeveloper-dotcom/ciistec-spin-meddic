export function renderTable(block) {
  const section = document.createElement("section");

  section.className = "block";

  const rows = block.items || [];

  section.innerHTML = `
  
  <div class="table-wrapper">

    <table class="executive-table">

      <thead>
        <tr>
          <th>Antes</th>
          <th>Después</th>
        </tr>
      </thead>

      <tbody>

        ${rows
          .map(
            (row) => `
              <tr>
                <td>${row.before || ""}</td>
                <td>${row.after || ""}</td>
              </tr>
            `,
          )
          .join("")}

      </tbody>

    </table>

  </div>

  <div class="table-mobile">

    ${rows
      .map(
        (row) => `
          <article class="table-card">

            <div class="table-card-section before">

              <div class="table-card-label">
                Antes
              </div>

              <div class="table-card-value">
                ${row.before || ""}
              </div>

            </div>

            <div class="table-card-section after">

              <div class="table-card-label">
                Después
              </div>

              <div class="table-card-value">
                ${row.after || ""}
              </div>

            </div>

          </article>
        `,
      )
      .join("")}

  </div>

`;

  return section;
}
