export function renderTable(block) {
  const section = document.createElement("section");

  section.className = "block";

  const rows = block.items || [];

  section.innerHTML = `

<div class="table-wrapper">

  <table
    class="executive-table"
  >

    <thead>

      <tr>

        <th>
          Antes
        </th>

        <th>
          Después
        </th>

      </tr>

    </thead>

    <tbody>

      ${rows
        .map(
          (row) => `

          <tr>

            <td>
              ${row.before}
            </td>

            <td>
              ${row.after}
            </td>

          </tr>

        `,
        )
        .join("")}

    </tbody>

  </table>

</div>

`;

  return section;
}
