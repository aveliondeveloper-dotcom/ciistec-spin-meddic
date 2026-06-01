import { setPresentation } from "./state.js";

const PRESENTATION_PATH = "./data/ciistec_spin_sys.json";

export async function loadPresentation() {
  const response = await fetch(PRESENTATION_PATH);

  if (!response.ok) {
    throw new Error(`Error cargando JSON: ${response.status}`);
  }

  const data = await response.json();

  if (!data.presentation || !Array.isArray(data.presentation.slides)) {
    throw new Error("Formato JSON inválido");
  }

  setPresentation(data.presentation);

  return data.presentation;
}
