# Prudence and Temperance Testing

Web based experimentation for the concepts of *Prudence* and *Temperance*. Also will include a treatment for *Risk Aversion*.

Joint project with [Mehmet Yiğit Gürdal](https://econ.boun.edu.tr/mehmet-yigit-gurdal-0) who also designed the experiments.

The front end is using **Vue3** while the backend uses **MongoDB** and **Node.js**. The backend code will not be hosted in this repo.

We thank [Gürol Afşar](https://tr.linkedin.com/in/g%C3%BCrol-af%C5%9Far-14981286) for the idea of using pipes for the design, which made things more intuitive.

## Details

Some introductory readings for the concepts.

- https://www.mathematik.uni-ulm.de/carfi/vortraege/downloads/AER-2006-1.pdf
- http://hschlesinger.people.ua.edu/uploads/2/6/8/4/26840405/prudence-temperance-res-final.pdf
- http://www.restud.com/wp-content/uploads/2013/08/MS-17166-Manuscript.pdf

## Usage
- `npm install` to install necessary packages.
- `npm run serve` to have a file that is served by a local server.
- `npm run build` to build a file that works without a server.
- Backend code is not included, so you need to build an API for yourself.

## Sources

- Ball: Created by David Khai from the Noun Project https://thenounproject.com/icon/ball-1691965/
- Pipes: https://www.kenney.nl/assets/puzzle-pack-2
- Some edits using Inkscape: https://inkscape.org/
- Custom click and drag code. Heavily modified for the actual implementation. https://javascript.info/mouse-drag-and-drop
- Selecting a list of points easily from a given image: https://www.mobilefish.com/services/record_mouse_coordinates/record_mouse_coordinates.php
- Adding warning for refreshing the page: https://medium.com/js-dojo/how-to-prevent-browser-refresh-url-changes-or-route-navigation-in-vue-132e3f9f96cc

## What I learned
- `findIndex()` returns -1 if no match is found.
- `closest()` is not about closeness in terms of pixel location, it checks only the parents.
- For sequential animations, default browser behaviour of removing filling animations should be evaded by `persist()`.
- For nodes removed with `v-if` condition, any dynamic class assignments will not work for child elements, even if they are not children of the original parent anymore.
- Accurately modifying data with event listeners is best done with passing the relevant data as an object property.
- For multiple components referencing the same functions, Composition API is a better fit.
