import { readFileSync } from 'node:fs';

import { defineTemplate, formatCatalogue, parseManifest } from '@tyto/core';
import { TABLE_VALUE_DEFAULTS } from '@tyto/house-style';
import { compileTemplate } from '@tyto/template-kit/testing';
import { describe, expect, it } from 'vitest';

import { build } from '../src/template.js';

import type { SuppliedValues } from '@tyto/core';

/**
 * What a configuration may change in `tabela` (TYTO-458, Tyto ADR 0153).
 *
 * The template's code holds no defaults of its own: `oneImageTable` reads each value through
 * `@tyto/core`'s readers and falls back to `TABLE_VALUE_DEFAULTS`. So the pin is between the
 * manifest and that record, and a value set here must reach the HTML.
 */

const read = (path: string): string => readFileSync(new URL(path, import.meta.url), 'utf8');

const manifest = parseManifest(read('../templates/tabela/manifest.yaml'), 'manifest.yaml');
if (!manifest.ok) throw new Error(manifest.error.map((item) => item.message).join('\n'));
const template = defineTemplate(manifest.value, build);
const formats = formatCatalogue({ grid: { w: 1080, h: 1350, kind: 'grid' } });

/**
 * The names the built-in `tabela-roxo` declares in Tyto (ADR 0153 Consequences). A literal,
 * because that manifest is not published; a value Tyto adds there is added here by hand.
 */
const BUILT_IN_NAMES = [
  'title-gap',
  'title-floor',
  'title-ceiling',
  'body-floor',
  'body-ceiling',
  'optical-drop',
  'paper',
  'ink',
  'zebra',
  'on-accent',
  'signature-ink',
];

const html = async (values?: SuppliedValues): Promise<string> => {
  const result = await compileTemplate({
    brief: read('../templates/tabela/examples/quatro-colunas.brief'),
    template,
    formats,
    ...(values === undefined ? {} : { values }),
  });
  if (!result.ok) throw new Error(result.error.map((item) => item.message).join('\n'));
  return result.value.frames[0]!.html;
};

describe('declared values', () => {
  const declared = manifest.value.values ?? {};

  it('declares exactly the eleven values the built-in tabela-roxo declares', () => {
    expect(Object.keys(declared).sort()).toEqual([...BUILT_IN_NAMES].sort());
  });

  it('declares each default equal to the one the code falls back to', () => {
    const defaults = Object.fromEntries(
      Object.entries(declared).map(([name, value]) => [name, value.default]),
    );
    expect(defaults).toEqual(TABLE_VALUE_DEFAULTS);
  });

  it('draws the same HTML with every default supplied as with no values at all', async () => {
    const supplied = Object.fromEntries(
      Object.entries(TABLE_VALUE_DEFAULTS).map(([name, value]) => [name, { value }]),
    );
    expect(await html(supplied)).toBe(await html());
  });

  it('paints the paper a configured colour, found in the HTML', async () => {
    const painted = await html({ paper: { value: '#123456' } });

    expect(painted).toContain('#123456');
    expect(await html()).not.toContain('#123456');
  });
});
