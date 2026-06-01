import { renderHeader } from "./renderers/header.js";

import { renderCards } from "./renderers/cards.js";

import { renderList } from "./renderers/list.js";

import { renderText } from "./renderers/text.js";

import { renderKpis } from "./renderers/kpis.js";

import { renderComparison } from "./renderers/comparison.js";

import { renderTable } from "./renderers/table.js";

import { renderTimeline } from "./renderers/timeline.js";

import { renderDiagnostic } from "./renderers/diagnostic.js";

export const renderers = {
  header: renderHeader,

  cards: renderCards,

  list: renderList,

  text: renderText,

  kpis: renderKpis,

  comparison: renderComparison,

  table: renderTable,

  timeline: renderTimeline,

  diagnostic: renderDiagnostic,
};
