import {
  siAngular, siArgo, siBitbucket, siBootstrap, siClaude, siDjango, siGit, siGitlab,
  siJavascript, siJenkins, siJest, siJira, siMui, siNextdotjs, siNodedotjs, siOpenai,
  siPostgresql, siPython, siReact, siSonarqubeserver, siStorybook, siTailwindcss, siTypescript,
} from "simple-icons";

interface Icon {
  title: string;
  path: string;
}

/**
 * Logos de tecnología de simple-icons (CC0). Se pintan en `currentColor`, no en
 * el color de marca: así contrastan en claro y en oscuro, y el conjunto se lee
 * como un sistema y no como una bolsa de colores.
 */
const ICONS: Record<string, Icon> = {
  angular: siAngular,
  react: siReact,
  "next.js": siNextdotjs,
  "next.js 15": siNextdotjs,
  "react 19": siReact,
  "angular 19": siAngular,
  typescript: siTypescript,
  javascript: siJavascript,
  "tailwind css": siTailwindcss,
  "tailwind 4": siTailwindcss,
  "material-ui": siMui,
  "bootstrap 5": siBootstrap,
  bootstrap: siBootstrap,
  "node.js": siNodedotjs,
  django: siDjango,
  python: siPython,
  postgresql: siPostgresql,
  "openai api": siOpenai,
  "claude code": siClaude,
  jest: siJest,
  sonarqube: siSonarqubeserver,
  storybook: siStorybook,
  git: siGit,
  gitlab: siGitlab,
  bitbucket: siBitbucket,
  jenkins: siJenkins,
  argocd: siArgo,
  jira: siJira,
};

/** Devuelve `null` cuando no hay logo disponible: el chip queda solo con texto. */
export function TechIcon({ name, className = "" }: { name: string; className?: string }) {
  const icon = ICONS[name.toLowerCase()];
  if (!icon) return null;
  return (
    <svg
      viewBox="0 0 24 24"
      width="13"
      height="13"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
      className={`shrink-0 ${className}`}
    >
      <path d={icon.path} />
    </svg>
  );
}

export const hasTechIcon = (name: string) => name.toLowerCase() in ICONS;
