/**
 * `tabela` — the house's table in one 1080×1350 image (Tyto TYTO-218), moved out of Tyto's
 * repository as the pilot of E18 (TYTO-434).
 *
 * The piece is drawn by `@tyto/house-style`'s `oneImageTable` for any brand of the house; this
 * template is that composition in roxo's accent, which is its default. The logo and signature
 * are not here: Tyto hands them to `build` from the brand kit installed on the machine.
 *
 * The image may close with the brief's `selo`, the house's seal (TYTO-201, TYTO-480): an art
 * 1080 × 140 glued to its foot. The table is then laid out on the page above the seal, so the
 * signature and the fit stand on the seal's top, and framed again at the full size with the
 * seal as its last child. Without a seal the composition is called as it always was.
 */

import { frame } from '@tyto/core/template';
import { ROXO_TABLE, oneImageTable, sealOf } from '@tyto/house-style';
import { sealed } from '@tyto/template-kit';

import type { TemplateBuild, TemplateContext } from '@tyto/core';

const table: TemplateBuild = oneImageTable(ROXO_TABLE);

export const build: TemplateBuild = (context: TemplateContext) => {
  const seal = sealOf(context);
  if (seal === undefined) return table(context);

  // The house owns the composition, so it is handed the shorter page rather than told about
  // the seal: whatever it stands on the page's foot rises by the band (TYTO-469).
  const page = sealed(context.size, seal);
  const above = table({ ...context, size: page.size });
  return frame({
    format: context.format,
    size: context.size,
    idPrefix: context.idPrefix,
    ...(above.background === undefined ? {} : { background: above.background }),
    // The table's nodes keep their ids; the seal takes the next one.
    children: [...above.children, ...page.seal],
  });
};
