# Research overview figure

Source for `images/research-overview.svg` (shown on the Research page). Adapted from Fig. 1 of the
research statement: citations removed, fonts one step larger, hyphenation off, white page background.

Rebuild (TeX Live + poppler):

    pdflatex overview.tex
    pdftocairo -svg overview.pdf ../../images/research-overview.svg

Folders starting with `_` are not published by Jekyll, so nothing here is served.

## Panel images and licenses

- `app_mr.jpg`: "IVAS 1.2 Prototype", U.S. Army photo by Jason Amadi, public domain.
  https://commons.wikimedia.org/wiki/File:IVAS_1.2_Prototype.jpg
- `app_ic_ota.pdf`: five-transistor amplifier schematic, original drawing (circuitikz).
- `app_oran.jpg`: "Cellular Telephone Tower - Knoxville, Tennessee - May 26, 2014" by David Ratledge, CC BY 4.0.
  Attribution required under CC BY 4.0.
  https://commons.wikimedia.org/wiki/File:Cellular_Telephone_Tower_-_Knoxville,_Tennessee_-_May_26,_2014.jpg
- `app_cage.jpg`: `images/figure1.png` from the TTCP CAGE Challenge 2 repository, MIT License.
  https://github.com/cage-challenge/cage-challenge-2

The JPEGs are 240 px wide, flattened onto the green panel colour (RGB 244,249,246) so the SVG stays small.
