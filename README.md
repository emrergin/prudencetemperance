# Prudence and Temperance Testing

Web based experimentation for the concepts of *Prudence* and *Temperance*. Also will include treatments for *Risk Aversion*.

Joint project with [Mehmet Yiğit Gürdal](https://econ.boun.edu.tr/mehmet-yigit-gurdal-0)

The front end will use **Vue3** while the backend will use **MongoDB** and **Node.js**.

## Details

Some introductory readings for the concepts.

- https://www.mathematik.uni-ulm.de/carfi/vortraege/downloads/AER-2006-1.pdf
- http://hschlesinger.people.ua.edu/uploads/2/6/8/4/26840405/prudence-temperance-res-final.pdf
- http://www.restud.com/wp-content/uploads/2013/08/MS-17166-Manuscript.pdf

## Sources

- Ball: Created by David Khai from the Noun Project https://thenounproject.com/icon/ball-1691965/
- Pipes: https://www.kenney.nl/assets/puzzle-pack-2
- Some edits using Inkscape: https://inkscape.org/
- Custom click and drag code. Heavily modified for the actual implementation. https://javascript.info/mouse-drag-and-drop
- Selecting a list of points easily from a given image: https://www.mobilefish.com/services/record_mouse_coordinates/record_mouse_coordinates.php

## What I learned
- `findIndex()` returns -1 if no match is found.
- `closest()` is not about closeness in terms of pixel location, it checks only the parents.
- For sequential animations, default browser behaviour of removing filling animations should be evaded by `persist()`.
- For nodes removed with `v-if` condition, any dynamic class assignments will not work for child elements, even if they are not children of the original parent anymore.