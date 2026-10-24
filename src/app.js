import { screens, screenById } from "./screens/index.js";

const selector = document.querySelector("#screen-selector");
const navigation = document.querySelector("#screen-navigation");
const output = document.querySelector("#screen-output");
const toggleAllButton = document.querySelector("#toggle-all");

let mostrarTodas = false;

// La URL conserva la pantalla activa para que el prototipo pueda compartirse.
function getScreenIdFromHash() {
  const params = new URLSearchParams(window.location.hash.slice(1));
  const candidate = params.get("pantalla");
  return screenById.has(candidate) ? candidate : screens[0].id;
}

function setScreenHash(screenId) {
  const nextHash = `pantalla=${encodeURIComponent(screenId)}`;
  if (window.location.hash.slice(1) !== nextHash) {
    window.history.replaceState(null, "", `#${nextHash}`);
  }
}

function createNavigationButton(screen, activeId) {
  const button = document.createElement("button");
  button.type = "button";
  button.className = "navigation-button";
  button.textContent = screen.label;
  button.setAttribute("aria-pressed", String(screen.id === activeId));

  if (screen.id === activeId) {
    button.classList.add("is-active");
  }

  button.addEventListener("click", () => {
    mostrarTodas = false;
    setScreenHash(screen.id);
    render();
  });

  return button;
}

function renderNavigation(activeId) {
  navigation.replaceChildren(
    ...screens.map((screen) => createNavigationButton(screen, activeId))
  );
}

// El marcado proviene únicamente de módulos locales y no de contenido introducido por usuarios.
function createScreenPreview(screen) {
  const article = document.createElement("article");
  article.className = "screen-card";
  article.setAttribute("aria-labelledby", `heading-${screen.id}`);

  const heading = document.createElement("h2");
  heading.id = `heading-${screen.id}`;
  heading.textContent = screen.label;

  const viewport = document.createElement("div");
  viewport.className = "screen-viewport";
  viewport.innerHTML = screen.markup;

  article.append(heading, viewport);
  return article;
}

function render() {
  const activeId = getScreenIdFromHash();
  const activeScreen = screenById.get(activeId);

  selector.value = activeId;
  document.title = `${activeScreen.title} · Consultorio Salud Integral`;
  toggleAllButton.textContent = mostrarTodas ? "Mostrar una" : "Mostrar todas";
  toggleAllButton.setAttribute("aria-pressed", String(mostrarTodas));

  renderNavigation(activeId);

  const screensToRender = mostrarTodas ? screens : [activeScreen];
  output.replaceChildren(...screensToRender.map(createScreenPreview));
}

function populateSelector() {
  for (const screen of screens) {
    const option = document.createElement("option");
    option.value = screen.id;
    option.textContent = screen.label;
    selector.append(option);
  }

  selector.addEventListener("change", () => {
    mostrarTodas = false;
    setScreenHash(selector.value);
    render();
  });

  toggleAllButton.addEventListener("click", () => {
    mostrarTodas = !mostrarTodas;
    render();
  });
}

window.addEventListener("hashchange", render);

populateSelector();
setScreenHash(getScreenIdFromHash());
render();
