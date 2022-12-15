import './style.css';
import data from './data.json';
const mainNav = document.querySelector('#main-navigation');
const template = '<li data-{PLANET}><a href="{HREF}">{LABEL}</a></li>';
let out = '';

for (const planet of data) {
    out += template
        .replace('{LABEL}', planet.name)
        .replace('{HREF}', `#${planet.name.toLowerCase()}`)
        .replace('{PLANET}', planet.name.toLowerCase());
}

mainNav.innerHTML = out;

const links = mainNav.querySelectorAll('a');
links.forEach((link) => {
    link.addEventListener('click', () => {
        console.log(
            data.filter(
                (planet) =>
                    planet.name.toLowerCase() ===
                    link.getAttribute('href').slice(1)
            )
        );
    });
});
