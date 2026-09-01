import { ArrowRightIcon, SparklesIcon } from "@heroicons/react/20/solid";
import { Button } from "./components/Button";
import { Heading } from "./components/Heading";
import { Stack } from "./components/Stack";
import { themeAttributes, type Theme } from "./styles/foundation/theme";

const themeExamples: Array<{ theme: Theme; nestedTheme: Theme; description: string }> = [
  {
    theme: "paper",
    nestedTheme: "ocean",
    description: "Warm neutrals with orange interaction color.",
  },
  {
    theme: "ocean",
    nestedTheme: "paper",
    description: "A deep-blue canvas with pale contextual surfaces.",
  },
];

function App() {
  return (
    <main className="min-h-dvh bg-background px-gutter py-section text-foreground">
      <div className="mx-auto grid max-w-default gap-xl">
        <header className="grid max-w-reading gap-sm">
          <p className="font-ui text-xs font-bold tracking-ui text-foreground-muted uppercase">
            CSS foundation × Tailwind CSS
          </p>
          <Heading preset="page">One token contract, two themes.</Heading>
          <p className="text-lg text-foreground-muted">
            Tailwind utilities consume the same contextual variables as the foundation. Nested boundaries change
            values without changing component recipes.
          </p>
        </header>

        <div className="grid gap-lg lg:grid-cols-2">
          {themeExamples.map((example) => (
            <ThemeExample key={example.theme} {...example} />
          ))}
        </div>
      </div>
    </main>
  );
}

type ThemeExampleProps = {
  description: string;
  nestedTheme: Theme;
  theme: Theme;
};

function ThemeExample({ description, nestedTheme, theme }: ThemeExampleProps) {
  return (
    <section
      {...themeAttributes({ theme, colorContext: "canvas" })}
      className="grid content-start gap-lg rounded-lg border border-border bg-background p-lg text-foreground shadow-sm"
    >
      <Stack gap="xs">
        <p className="font-code text-xs text-foreground-muted uppercase">{theme} · canvas</p>
        <Heading as="h2" preset="section">
          {theme === "paper" ? "Paper theme" : "Ocean theme"}
        </Heading>
        <p className="text-foreground-muted">{description}</p>
      </Stack>

      <Stack direction="row" gap="sm" wrap>
        <Button leadingIcon={<SparklesIcon />}>Filled</Button>
        <Button variant="outlined">Outlined</Button>
        <Button size="small" trailingIcon={<ArrowRightIcon />} variant="ghost">
          Ghost
        </Button>
      </Stack>

      <article
        {...themeAttributes({ colorContext: "surface" })}
        className="grid gap-sm rounded-md border border-border bg-background p-md shadow-raised"
      >
        <p className="font-code text-xs text-foreground-muted uppercase">surface context</p>
        <Heading as="h3" preset="subsection">
          Contextual utilities
        </Heading>
        <p className="text-foreground-muted">
          <code className="text-link">bg-background</code> and <code className="text-link">text-foreground</code>
          {" "}resolve against this surface.
        </p>
      </article>

      <aside
        {...themeAttributes({ theme: nestedTheme, colorContext: "floating" })}
        className="grid gap-sm rounded-md border border-border bg-background p-md text-foreground shadow-overlay"
      >
        <p className="font-code text-xs text-foreground-muted uppercase">
          {nestedTheme} · nested floating
        </p>
        <Heading as="h3" preset="subsection">
          A local theme boundary
        </Heading>
        <Button className="justify-self-start" size="small" style={{ letterSpacing: "0.02em" }} variant="outlined">
          Native overrides work
        </Button>
      </aside>
    </section>
  );
}

export default App;
