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
      answer: "",
      answers: [],
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

function renderEvaluation(evaluation, sectionKey, questionId) {
  if (!evaluation) {
    return "";
  }

  const { type, options = [] } = evaluation;

  if (type === "single-choice") {
    return `
      <div class="question-block">

        <div class="group-label">
          Respuesta del Cliente
        </div>

        <div class="answer-options">

          ${options
            .map(
              (option) => `
                <label>

                  <input
                    type="radio"
                    name="${sectionKey}_${questionId}_answer"
                    value="${option}"
                  />

                  ${option}

                </label>
              `,
            )
            .join("")}

        </div>

      </div>
    `;
  }

  if (type === "multi-choice") {
    return `
      <div class="question-block">

        <div class="group-label">
          Respuestas del Cliente
        </div>

        <div class="answer-options">

          ${options
            .map(
              (option) => `
                <label>

                  <input
                    type="checkbox"
                    name="${sectionKey}_${questionId}_answers"
                    value="${option}"
                  />

                  ${option}

                </label>
              `,
            )
            .join("")}

        </div>

      </div>
    `;
  }

  return "";
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

          const evaluation = typeof item === "object" ? item.evaluation : null;

          return `
          
            <article
              class="question-card"
              data-section="${sectionKey}"
              data-question="${questionId}"
            >

              <div class="question-title">
                ${question}
              </div>

              ${renderEvaluation(evaluation, sectionKey, questionId)}

              <div class="question-block">

                <div class="group-label">
                 Observaciones
                </div>

             
              <div class="question-block">


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

    if (saved.answer) {
      const radio = card.querySelector(
        `input[name="${sectionKey}_${questionId}_answer"][value="${saved.answer}"]`,
      );

      if (radio) {
        radio.checked = true;
      }
    }

    if (Array.isArray(saved.answers)) {
      saved.answers.forEach((value) => {
        const checkbox = card.querySelector(
          `input[name="${sectionKey}_${questionId}_answers"][value="${value}"]`,
        );

        if (checkbox) {
          checkbox.checked = true;
        }
      });
    }

    if (saved.status) {
      const status = card.querySelector(
        `input[name="${sectionKey}_${questionId}_status"][value="${saved.status}"]`,
      );

      if (status) {
        status.checked = true;
      }
    }

    if (saved.priority) {
      const priority = card.querySelector(
        `input[name="${sectionKey}_${questionId}_priority"][value="${saved.priority}"]`,
      );

      if (priority) {
        priority.checked = true;
      }
    }

    const notes = card.querySelector(".question-notes");

    notes.value = saved.notes || "";

    const persist = () => {
      const answer =
        card.querySelector(
          `input[name="${sectionKey}_${questionId}_answer"]:checked`,
        )?.value || "";

      const answers = Array.from(
        card.querySelectorAll(
          `input[name="${sectionKey}_${questionId}_answers"]:checked`,
        ),
      ).map((input) => input.value);

      const status =
        card.querySelector(
          `input[name="${sectionKey}_${questionId}_status"]:checked`,
        )?.value || "";

      const priority =
        card.querySelector(
          `input[name="${sectionKey}_${questionId}_priority"]:checked`,
        )?.value || "";

      saveQuestion(sectionKey, questionId, {
        answer,
        answers,
        status,
        priority,
        notes: notes.value,
        updatedAt: new Date().toISOString(),
      });
    };

    card
      .querySelectorAll('input[type="radio"], input[type="checkbox"]')
      .forEach((input) => {
        input.addEventListener("change", persist);
      });

    notes.addEventListener("input", persist);
  });
}
