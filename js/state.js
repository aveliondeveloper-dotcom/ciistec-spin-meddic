export const state = {
  presentation: null,
  currentSlide: 0,
  totalSlides: 0,
  isLoaded: false,
  touchStartX: 0,
  touchEndX: 0,
};

export function setPresentation(presentation) {
  state.presentation = presentation;
  state.totalSlides = presentation.slides.length;
}

export function setCurrentSlide(index) {
  state.currentSlide = index;
}

export function getCurrentSlide() {
  return state.presentation?.slides?.[state.currentSlide];
}
