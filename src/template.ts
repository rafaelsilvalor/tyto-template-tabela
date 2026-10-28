/**
 * `tabela` — the house's table in one 1080×1350 image (Tyto TYTO-218), moved out of Tyto's
 * repository as the pilot of E18 (TYTO-434).
 *
 * The piece is drawn by `@tyto/house-style`'s `oneImageTable` for any brand of the house; this
 * template is that composition in roxo's accent, which is its default. The logo and signature
 * are not here: Tyto hands them to `build` from the brand kit installed on the machine.
 */

import { ROXO_TABLE, oneImageTable } from '@tyto/house-style';

import type { TemplateBuild } from '@tyto/core';

export const build: TemplateBuild = oneImageTable({ ...ROXO_TABLE, accent: '#5900a7' });
