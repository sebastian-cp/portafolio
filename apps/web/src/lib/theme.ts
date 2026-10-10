export function toggleTheme(): "light" | "dark" {
  const root = document.documentElement;
  const next = root.dataset.theme === "dark" ? "light" : "dark";
  root.dataset.theme = next;
  try {
    localStorage.setItem("theme", next);
  } catch {
    /* sin almacenamiento */
  }
  return next;
}

/** Se ejecuta antes del primer paint para evitar el flash de tema incorrecto. */
export const themeInitScript = `try{var t=localStorage.getItem("theme")||(matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light");document.documentElement.dataset.theme=t}catch(e){}`;
