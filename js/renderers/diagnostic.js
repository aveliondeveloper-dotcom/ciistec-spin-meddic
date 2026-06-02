const STORAGE_KEY = "ciistec_diagnostic";

function getStorage() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
  } catch {
    return {};
  }
}

function saveStorage(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function saveQuestion(sectionKey, questionId, payload) {
  const storage = getStorage();

  if (!storage[sectionKey]) {
    storage[sectionKey] = {};
  }

  storage[sectionKey][questionId] = payload;

  saveStorage(storage);
}

function getQuestion(sectionKey, questionId) {
  const storage = getStorage();

  return (
    storage?.[sectionKey]?.[questionId] || {
      status: "",
      priority: "",
      notes: "",
    }
  );
}

export function exportDiagnosticData() {
  return getStorage();
}

export function clearDiagnosticData() {
  localStorage.removeItem(STORAGE_KEY);
}

export function renderDiagnostic(block) {
  const section = document.createElement("section");

  const sectionKey =
    block.storageKey || block.title.toLowerCase().replace(/\s+/g, "_");

  section.className = "block diagnostic-block";

  section.innerHTML = `

    <div class="diagnostic-header">
      <h3>${block.title || ""}</h3>
    </div>

    <div class="diagnostic-questions">

      ${(block.questions || [])
        .map((item, index) => {
          const question = typeof item === "string" ? item : item.question;

          const questionId =
            typeof item === "string" ? `question_${index}` : item.id;

          return `

            <article
              class="question-card"
              data-section="${sectionKey}"
              data-question="${questionId}"
            >

              <div class="question-title">
                ${question}
              </div>

              <div class="question-block">

                <div class="group-label">
                  Estado Actual
                </div>

                <div class="answer-group">

                  <label>
                    <input
                      type="radio"
                      name="${sectionKey}_${questionId}_status"
                      value="excelente"
                    />
                    Excelente
                  </label>

                  <label>
                    <input
                      type="radio"
                      name="${sectionKey}_${questionId}_status"
                      value="bueno"
                    />
                    Bueno
                  </label>

                  <label>
                    <input
                      type="radio"
                      name="${sectionKey}_${questionId}_status"
                      value="regular"
                    />
                    Regular
                  </label>

                  <label>
                    <input
                      type="radio"
                      name="${sectionKey}_${questionId}_status"
                      value="deficiente"
                    />
                    Deficiente
                  </label>

                </div>

              </div>

              <div class="question-block">

                <div class="group-label">
                  Prioridad
                </div>

                <div class="priority-group">

                  <label>
                    <input
                      type="radio"
                      name="${sectionKey}_${questionId}_priority"
                      value="baja"
                    />
                    Baja
                  </label>

                  <label>
                    <input
                      type="radio"
                      name="${sectionKey}_${questionId}_priority"
                      value="media"
                    />
                    Media
                  </label>

                  <label>
                    <input
                      type="radio"
                      name="${sectionKey}_${questionId}_priority"
                      value="alta"
                    />
                    Alta
                  </label>

                </div>

              </div>

              <div class="question-block">

                <div class="group-label">
                  Observaciones
                </div>

                <textarea
                  class="question-notes"
                  rows="4"
                  placeholder="Agregar observaciones del cliente..."
                ></textarea>

              </div>

            </article>

          `;
        })
        .join("")}

    </div>

  `;

  hydrate(section, sectionKey);

  return section;
}

function hydrate(section, sectionKey) {
  const cards = section.querySelectorAll(".question-card");

  cards.forEach((card) => {
    const questionId = card.dataset.question;

    const saved = getQuestion(sectionKey, questionId);

    if (saved.status) {
      const status = card.querySelector(`input[value="${saved.status}"]`);

      if (status) {
        status.checked = true;
      }
    }

    if (saved.priority) {
      const priority = card.querySelector(`input[value="${saved.priority}"]`);

      if (priority) {
        priority.checked = true;
      }
    }

    const notes = card.querySelector(".question-notes");

    notes.value = saved.notes || "";

    const persist = () => {
      const status =
        card.querySelector('input[name$="_status"]:checked')?.value || "";

      const priority =
        card.querySelector('input[name$="_priority"]:checked')?.value || "";

      const notesValue = notes.value;

      saveQuestion(sectionKey, questionId, {
        status,
        priority,
        notes: notesValue,
        updatedAt: new Date().toISOString(),
      });
    };

    card.querySelectorAll('input[type="radio"]').forEach((input) => {
      input.addEventListener("change", persist);
    });

    notes.addEventListener("input", persist);
  });
}
