import * as stylex from "@stylexjs/stylex";
import { ArrowRightIcon, ArrowUpRightIcon, SparklesIcon } from "@heroicons/react/20/solid";
import { Button } from "./components/Button";
import { Heading } from "./components/Heading";
import { Stack } from "./components/Stack";
import { themeAttributes, type Theme } from "./styles/foundation/theme";
import { colors, fonts, leading, shadows, space, text, weights } from "./styles/tokens.stylex";

function App() {
  return (
    <div {...stylex.props(styles.app)}>
      <header {...stylex.props(styles.header)}>
        <nav aria-label="Primary" {...stylex.props(styles.nav)}>
          <a href="#foundation" {...stylex.props(styles.wordmark)}>
            foundation/x
          </a>
          <code {...stylex.props(styles.inlineCode)}>light theme foundation</code>
        </nav>

        <div {...stylex.props(styles.hero)}>
          <div {...stylex.props(styles.heroTitle)}>
            <p {...stylex.props(styles.kicker)}>CSS custom properties × StyleX</p>
            <Heading preset="display">One contract. Any context.</Heading>
          </div>
          <div {...stylex.props(styles.heroCopy)}>
            <p>
              Themes own the values. Color contexts establish the local surface. Components only consume a small,
              typed set of contextual tokens.
            </p>
            <code {...stylex.props(styles.inlineCode)}>
              data-theme · data-color-context
            </code>
          </div>
        </div>
      </header>

      <main id="foundation">
        <ThemeShowcase
          description="Warm neutrals with orange interaction color. The canvas is quiet; surfaces add structure without changing component code."
          nestedTheme="ocean"
          theme="paper"
          title="Theme A — Paper"
        />
        <ThemeShowcase
          description="A dark-blue canvas with pale surfaces in light mode. The same link, heading, and button recipes adapt to every color context."
          nestedTheme="paper"
          theme="ocean"
          title="Theme B — Ocean"
        />
      </main>

      <footer {...stylex.props(styles.footer)}>
        <div>
          <strong>Foundation starter</strong>
          <p>Primitives → theme slots → contextual tokens → StyleX recipes</p>
        </div>
        <code>paper / ocean · canvas / surface / floating · raised as treatment</code>
      </footer>
    </div>
  );
}

type ThemeShowcaseProps = {
  description: string;
  nestedTheme: Theme;
  theme: Theme;
  title: string;
};

function ThemeShowcase({ description, nestedTheme, theme, title }: ThemeShowcaseProps) {
  const titleId = `${theme}-title`;

  return (
    <section
      aria-labelledby={titleId}
      {...themeAttributes({ theme, colorContext: "canvas" })}
      {...stylex.props(styles.themeSection)}
    >
      <div {...stylex.props(styles.themeInner)}>
        <div {...stylex.props(styles.themeHeading)}>
          <div>
            <p {...stylex.props(styles.kicker)}>Canvas context</p>
            <Heading id={titleId} preset="page">
              {title}
            </Heading>
          </div>
          <code {...stylex.props(styles.attributeCode)}>
            {`data-theme="${theme}" data-color-context="canvas"`}
          </code>
        </div>

        <div {...stylex.props(styles.showcaseGrid)}>
          <div {...stylex.props(styles.introPanel)}>
            <p {...stylex.props(styles.themeDescription)}>{description}</p>
            <p {...stylex.props(styles.mutedCopy)}>
              This is muted canvas text. A <a href={`#${theme}-surface`}>regular contextual link</a> always uses
              <code> --color-link-default</code>.
            </p>
            <Stack direction="row" gap="sm" wrap>
              <Button leadingIcon={<SparklesIcon />}>Filled</Button>
              <Button variant="outlined">Outlined</Button>
              <Button trailingIcon={<ArrowRightIcon />} variant="ghost">
                Ghost
              </Button>
              <Button size="small" state="success" variant="outlined">
                Small
              </Button>
            </Stack>
          </div>

          <div id={`${theme}-surface`} {...stylex.props(styles.cardGrid)}>
            <article {...themeAttributes({ colorContext: "surface" })} {...stylex.props(styles.card)}>
              <CardContent
                eyebrow="Surface context"
                text="The local values now come from the surface slots. Nothing inside asks which theme is active."
                title="Surface"
              />
            </article>
            <article
              {...themeAttributes({ colorContext: "surface" })}
              {...stylex.props(styles.card, styles.raised)}
            >
              <CardContent
                eyebrow="Surface + treatment"
                text="Raised adds elevation without changing the card's inherited color context."
                title="Raised"
              />
            </article>
          </div>
        </div>

        <aside
          {...themeAttributes({ theme: nestedTheme, colorContext: "surface" })}
          {...stylex.props(styles.nestedBoundary)}
        >
          <div>
            <p {...stylex.props(styles.kicker)}>Nested theme boundary</p>
            <Heading as="h3" preset="subsection">
              {nestedTheme} inside {theme}
            </Heading>
            <p {...stylex.props(styles.nestedCopy)}>
              A new theme can begin at any depth. <a href={`#${nestedTheme}-title`}>This link</a> still consumes the
              same semantic variable.
            </p>
          </div>
          <div
            {...themeAttributes({ colorContext: "floating" })}
            {...stylex.props(styles.nestedContext, styles.overlay)}
          >
            <code>{`colorContext="floating" → treatment="overlay"`}</code>
            <Button size="small" trailingIcon={<ArrowUpRightIcon />} variant="outlined">
              Nested action
            </Button>
          </div>
        </aside>
      </div>
    </section>
  );
}

function CardContent({ eyebrow, text: copy, title }: { eyebrow: string; text: string; title: string }) {
  return (
    <>
      <p {...stylex.props(styles.cardEyebrow)}>{eyebrow}</p>
      <Heading as="h3" preset="subsection">
        {title}
      </Heading>
      <p {...stylex.props(styles.cardCopy)}>{copy}</p>
      <a href="#foundation" {...stylex.props(styles.cardLink)}>
        Contextual link <ArrowUpRightIcon aria-hidden="true" {...stylex.props(styles.linkIcon)} />
      </a>
    </>
  );
}

const styles = stylex.create({
  app: {
    minHeight: "100dvh",
  },
  header: {
    marginInline: "auto",
    maxWidth: "var(--content-width-default)",
    paddingInline: space.gutter,
  },
  nav: {
    alignItems: "center",
    borderBottomColor: colors.borderDefault,
    borderBottomStyle: "solid",
    borderBottomWidth: "1px",
    display: "flex",
    flexWrap: "wrap",
    gap: space.md,
    justifyContent: "space-between",
    paddingBlock: space.md,
  },
  wordmark: {
    color: colors.textDefault,
    fontFamily: fonts.code,
    fontSize: text.sm,
    fontWeight: weights.bold,
    letterSpacing: "-0.03em",
    textDecoration: "none",
    whiteSpace: "nowrap",
  },
  hero: {
    alignItems: "end",
    display: "grid",
    gap: space.xl,
    gridTemplateColumns: {
      default: "minmax(0, 1fr)",
      "@media (min-width: 48rem)": "minmax(0, 7fr) minmax(0, 5fr)",
    },
    paddingBlockEnd: space.section,
    paddingBlockStart: space.xl,
  },
  heroTitle: {
    display: "flex",
    flexDirection: "column",
    gap: space.lg,
    minWidth: 0,
  },
  kicker: {
    color: colors.textMuted,
    fontFamily: fonts.ui,
    fontSize: text.xs,
    fontWeight: weights.bold,
    letterSpacing: "0.09em",
    margin: 0,
    textTransform: "uppercase",
  },
  heroCopy: {
    color: colors.textMuted,
    display: "flex",
    flexDirection: "column",
    fontSize: text.lg,
    gap: space.lg,
    maxWidth: "38rem",
  },
  inlineCode: {
    color: colors.textDefault,
    fontFamily: fonts.code,
    fontSize: text.xs,
    overflowWrap: "anywhere",
  },
  themeSection: {
    borderTopColor: colors.borderDefault,
    borderTopStyle: "solid",
    borderTopWidth: "1px",
    paddingBlock: space.section,
  },
  themeInner: {
    marginInline: "auto",
    maxWidth: "var(--content-width-default)",
    paddingInline: space.gutter,
  },
  themeHeading: {
    alignItems: "end",
    display: "flex",
    flexWrap: "wrap",
    gap: space.lg,
    justifyContent: "space-between",
    marginBottom: space.xxl,
  },
  attributeCode: {
    backgroundColor: colors.fillMuted,
    borderColor: colors.borderDefault,
    borderRadius: "var(--radius-sm)",
    borderStyle: "solid",
    borderWidth: "1px",
    color: colors.textDefault,
    fontFamily: fonts.code,
    fontSize: text.xs,
    maxWidth: "100%",
    overflowWrap: "anywhere",
    paddingBlock: space.xs,
    paddingInline: space.sm,
  },
  showcaseGrid: {
    display: "grid",
    gap: space.xl,
    gridTemplateColumns: {
      default: "minmax(0, 1fr)",
      "@media (min-width: 64rem)": "minmax(0, 7fr) minmax(0, 5fr)",
    },
  },
  introPanel: {
    alignContent: "start",
    display: "grid",
    gap: space.lg,
    paddingBlockEnd: space.lg,
  },
  themeDescription: {
    color: colors.textDefault,
    fontSize: text.xl,
    letterSpacing: "-0.015em",
    lineHeight: leading.heading,
    maxWidth: "48ch",
  },
  mutedCopy: {
    color: colors.textMuted,
    maxWidth: "58ch",
  },
  cardGrid: {
    display: "grid",
    gap: space.md,
    gridTemplateColumns: {
      default: "minmax(0, 1fr)",
      "@media (min-width: 36rem)": "repeat(2, minmax(0, 1fr))",
      "@media (min-width: 64rem)": "minmax(0, 1fr)",
      "@media (min-width: 80rem)": "repeat(2, minmax(0, 1fr))",
    },
  },
  card: {
    alignContent: "start",
    borderColor: colors.borderDefault,
    borderRadius: "var(--radius-md)",
    borderStyle: "solid",
    borderWidth: "1px",
    display: "grid",
    gap: space.md,
    minHeight: "18rem",
    padding: space.lg,
  },
  raised: {
    boxShadow: shadows.raisedDefault,
  },
  overlay: {
    boxShadow: shadows.overlayDefault,
  },
  cardEyebrow: {
    color: colors.textMuted,
    fontFamily: fonts.code,
    fontSize: text.xs,
  },
  cardCopy: {
    color: colors.textMuted,
  },
  cardLink: {
    alignItems: "center",
    alignSelf: "end",
    display: "inline-flex",
    fontFamily: fonts.ui,
    fontSize: text.sm,
    fontWeight: weights.bold,
    gap: space.xs,
    width: "fit-content",
  },
  linkIcon: {
    height: "1rem",
    width: "1rem",
  },
  nestedBoundary: {
    alignItems: "center",
    borderBlockColor: colors.borderDefault,
    borderBlockStyle: "solid",
    borderBlockWidth: "1px",
    display: "grid",
    gap: space.lg,
    gridTemplateColumns: {
      default: "minmax(0, 1fr)",
      "@media (min-width: 48rem)": "minmax(0, 7fr) minmax(0, 5fr)",
    },
    marginTop: space.xxl,
    padding: space.lg,
  },
  nestedCopy: {
    color: colors.textMuted,
    marginTop: space.sm,
    maxWidth: "60ch",
  },
  nestedContext: {
    alignItems: "center",
    borderColor: colors.borderDefault,
    borderRadius: "var(--radius-sm)",
    borderStyle: "solid",
    borderWidth: "1px",
    display: "flex",
    flexWrap: "wrap",
    fontFamily: fonts.code,
    fontSize: text.xs,
    gap: space.md,
    justifyContent: "space-between",
    padding: space.md,
  },
  footer: {
    alignItems: "end",
    borderTopColor: colors.borderDefault,
    borderTopStyle: "solid",
    borderTopWidth: "1px",
    color: colors.textMuted,
    display: "flex",
    flexWrap: "wrap",
    fontFamily: fonts.ui,
    fontSize: text.xs,
    gap: space.lg,
    justifyContent: "space-between",
    marginInline: "auto",
    maxWidth: "var(--content-width-default)",
    paddingBlock: space.xl,
    paddingInline: space.gutter,
  },
});

export default App;
