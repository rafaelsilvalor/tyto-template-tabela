# tyto-template-tabela

`tabela`, a [Tyto](https://github.com/rafaelsilvalor/tyto) code template in its own repository:
a title over a whole table, sized by measuring so every row fits one 1080×1350 post. It is the
pilot of Tyto's E18 (TYTO-434, Tyto ADR 0151): a template that lives, is tested and is released
here, with no pull request in Tyto's repository.

Its defaults are the house's roxo: the header in roxo's accent and roxo's signature beside the
logo. **This repository holds the composition only.** The logo and the signature are not here:
Tyto hands them to the template from the brand kit installed on the machine, and without one it
draws placeholders (Tyto ADR 0063, ADR 0065). The example briefs are invented copy.

## Install into Tyto

```
tyto plugin install git+https://github.com/rafaelsilvalor/tyto-template-tabela.git
```

Tyto clones the default branch and never builds it, so `dist/index.js` is committed on `main`
and every release is a tag of it. To take a change pushed here, run the same command again:
installing a name that is already installed replaces it.

A pack brings templates and no formats. Copy `templates/formats.yaml` into the project that
renders `tabela`, or merge its `grid` line into the project's own. Then a brief starts with:

```
---
template: tabela
formats: [grid]
---
```

## What it may reach

| Permission        | Why                                                                     |
| ----------------- | ----------------------------------------------------------------------- |
| `font:CircularXX` | The table is sized by measuring CircularXX, a licensed face (ADR 0048). |

**The install asks for it once.** Faces Tyto ships cross to a plugin freely; a face installed
on the machine crosses only under this permission. Without it the render warns
`W_PLUGIN_FONT_WITHHELD` and the table falls back to its unmeasured sizes. On a machine without
CircularXX, Tyto measures and draws its bundled substitute and needs no permission.

## What a configuration may change

`templates/tabela/manifest.yaml` declares the same eleven `values` as Tyto's built-in
`tabela-roxo` (Tyto ADR 0153): the gap under the title, the title's and the body's size limits,
the optical drop, and the paper, ink, zebra, on-accent and signature colours. Not the accent,
which is the brand's. Each default is the constant the table drew with before, so with nothing
configured it draws the same bytes. A manifest with `values` needs a Tyto whose plugin API is
0.7 or newer. `engine` is `>=0.11`, the plugin API of the release whose export centres a
tracked line by its ink (Tyto 0.12, TYTO-491), which the snapshots record.

## Development

`pnpm check` runs Prettier, the type checker, ESLint and the tests; `pnpm build` writes
`dist/index.js`, one ES module with every `@tyto` import inlined, which is committed and which
CI rebuilds and compares.

The template depends on Tyto's published contract, held by GitHub Packages under the owner's
scope (Tyto ADR 0149) and aliased in `package.json`: `@tyto/house-style` draws the table,
`@tyto/template-kit` and `@tyto/core` are what it is drawn with, and `@tyto/plugin-api` is what
loads it. The committed `.npmrc` names the scope only. GitHub asks for a token with
`read:packages` even for public packages, and it goes in your user-level `~/.npmrc`:

```sh
gh auth refresh -s read:packages
echo '//npm.pkg.github.com/:_authToken=${NODE_AUTH_TOKEN}' >> ~/.npmrc
NODE_AUTH_TOKEN=$(gh auth token) pnpm install
```

The tests, all without Tyto:

- `src/template.test.ts`: the table's rules on the scene — every cell's words inside its cell,
  no value split across lines, the header in roxo's accent, the floor for a table too long.
- `tests/examples.test.ts`: both example briefs compiled as Tyto compiles them, through
  `@tyto/template-kit/testing` (Tyto ADR 0152), against the HTML in `tests/__snapshots__/`.
  Nothing is measured and faces are placeholders, so the snapshot moves when the composition
  does and not when a machine has another font.
- `tests/values.test.ts`: the declared values — the same names as the built-in, each default
  pinned to the one the code falls back to, and a colour set in a test found in the HTML.
- `tests/plugin.test.ts`: the built `dist/index.js`, loaded through
  `@tyto/plugin-api/testing` (Tyto ADR 0150), drawing `tabela` across the isolation protocol.

The `contract` workflow runs every Monday against the newest published contract, past the
ranges `package.json` asks for, so a Tyto release that breaks this template turns it red before
somebody installs it.
