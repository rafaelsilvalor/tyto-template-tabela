# How to write a `tabela` brief

`tabela` draws a title over a whole table in **one** 1080×1350 image. The copy usually arrives
as a title line and a table pasted from a spreadsheet or a card, with tabs or several spaces
between the columns. There is no slide and no call to action: one image, two slots.

## Slots

| Slot     | Where       | Rule                                                                                                                                                                                                    |
| -------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `titulo` | directive   | Required, at most 120 characters. The title of the piece, word for word. The template sets it in capitals and picks its size (up to three lines). Write it on one line; a line break you write is kept. |
| `tabela` | directive   | Required. The whole table, one line per row.                                                                                                                                                            |
| `selo`   | frontmatter | Optional image, 1080×140: `selo: ./selo.png`. Glued to the foot of the image; the table fits the page above it. Only when the person has the file.                                                      |

Format: `formats: [grid]`. There is no other.

## Normalisation

Inside `::tabela`:

- **The first line is the header**, its columns separated by `|`: `Concurso | Banca | Vagas`.
  **The number of columns comes from it.** Write the names as they came; the template sets
  them in capitals.
- **Every following line with `|` is a row**, in the header's column order.
- **A line with no `|` is a band** across the full width, a subtitle inside the table. Use one
  only when the copy has such a line. A highlighted line above the table is the title, not a
  band.
- **Cells are literal**, only trimmed: `-` stays `-`, `CR` stays `CR`, `5 mil` stays `5 mil`.
  Do not abbreviate, translate or correct values.
- **Never break a line inside a cell** and never write `\n`. The template chooses where to
  break and never splits a value such as `R$ 3.820,39`; a range `R$ X a R$ Y` breaks between
  the two values by itself.
- A cell never holds `|`. If the copy has one, replace it with `/` and say so.
- An empty cell stays empty between the separators (`Órgão Y |  | -`); do not invent content.

The template draws by itself, so the brief never writes: the logo, the signature, the colours,
each column's width, the line breaks and the type sizes.

## How much fits

The template picks the largest type size at which the whole table fits. Ten rows of four
columns leave room to spare. Measured with the test face: 30 rows do not fit even at the
smallest size; Tyto then draws at the floor and warns `W_TEMPLATE_OVERFLOW`, and the table is
cut at the bottom. Above about 20 rows, tell the person it may not fit and ask whether to
split it into two pieces (two briefs).

## Example

Copy (invented):

```
Título: 8 seleções previstas para o segundo semestre!
Seleção	Situação	Vagas
Órgão Alfa	Banca definida (Banca Beta)	-
Instituto Gama	Comissão formada	40 + CR
Agência Delta	Edital publicado	120
```

Brief:

```brief
---
template: tabela
formats: [grid]
---
::titulo
  8 seleções previstas para o segundo semestre!

::tabela
  Seleção | Situação | Vagas
  Órgão Alfa | Banca definida (Banca Beta) | -
  Instituto Gama | Comissão formada | 40 + CR
  Agência Delta | Edital publicado | 120
```

## Known traps

- The copy sometimes carries **two different titles**: the piece's text and a highlighted line
  at the top of the table. The piece's text wins; with only the highlighted line, use it. When
  both exist and differ, say so.
