import './style.css';
import data from './data.json';
const mainNav = document.querySelector('#main-navigation');
const sectionNav = document.querySelector('.Planet-nav');
const planetHolder = document.querySelector('.Planet');
const hamby = document.querySelector('.Hamby');
const graphic = document.querySelector('.Planet-graphicInner');
const links = mainNav.querySelectorAll('a');
const sections = sectionNav.querySelectorAll('a');
const title = document.title;

const name = document.querySelector('[data-name]');
const overview = document.querySelector('[data-overview]');
const structure = document.querySelector('[data-structure]');
const geology = document.querySelector('[data-geology]');

const contentOverview = overview.querySelector('[data-content]');
const sourceOverview = overview.querySelector('[data-source]');

const contentStructure = structure.querySelector('[data-content]');
const sourceStructure = structure.querySelector('[data-source]');

const contentGeology = geology.querySelector('[data-content]');
const sourceGeology = geology.querySelector('[data-source]');
const panels = document
    .querySelector('.Planet-description')
    .querySelectorAll('[id^="section"]');

const rotation = document.querySelector('[data-rotation]');
const revolution = document.querySelector('[data-revolution]');
const radius = document.querySelector('[data-radius]');
const temperature = document.querySelector('[data-temperature]');
let oldPlanet;

// TABS
(function () {
    // Get relevant elements and collections
    const tabbed = document.querySelector('.Planet-nav');
    const tablist = tabbed.querySelector('ul');
    const tabs = tablist.querySelectorAll('a');

    // The tab switching function
    const switchTab = (oldTab, newTab) => {
        newTab.focus();
        // Make the active tab focusable by the user (Tab key)
        newTab.removeAttribute('tabindex');
        // Set the selected state
        newTab.setAttribute('aria-selected', 'true');
        oldTab.removeAttribute('aria-selected');
        oldTab.setAttribute('tabindex', '-1');
        // Get the indices of the new and old tabs to find the correct
        // tab panels to show and hide
        let index = Array.prototype.indexOf.call(tabs, newTab);
        let oldIndex = Array.prototype.indexOf.call(tabs, oldTab);
        panels[oldIndex].hidden = true;
        panels[index].hidden = false;
    };

    // Add the tablist role to the first <ul> in the .tabbed container
    tablist.setAttribute('role', 'tablist');

    // Add semantics are remove user focusability for each tab
    Array.prototype.forEach.call(tabs, (tab, i) => {
        tab.setAttribute('role', 'tab');
        tab.setAttribute('id', 'tab' + (i + 1));
        tab.setAttribute('tabindex', '-1');
        tab.parentNode.setAttribute('role', 'presentation');

        // Handle clicking of tabs for mouse users
        tab.addEventListener('click', (e) => {
            // e.preventDefault();
            let currentTab = tablist.querySelector('[aria-selected]');
            if (e.currentTarget !== currentTab) {
                switchTab(currentTab, e.currentTarget);
            }
        });

        // Handle keydown events for keyboard users
        tab.addEventListener('keydown', (e) => {
            // Get the index of the current tab in the tabs node list
            let index = Array.prototype.indexOf.call(tabs, e.currentTarget);
            // Work out which key the user is pressing and
            // Calculate the new tab's index where appropriate
            let dir =
                e.which === 37
                    ? index - 1
                    : e.which === 39
                    ? index + 1
                    : e.which === 38
                    ? 'up'
                    : null;
            if (dir !== null) {
                e.preventDefault();
                // If the up key is pressed, move focus to the open panel,
                // otherwise switch to the adjacent tab
                dir === 'up'
                    ? panels[i].focus()
                    : tabs[dir]
                    ? switchTab(e.currentTarget, tabs[dir])
                    : void 0;
            }
        });
    });

    // Add tab panel semantics and hide them all
    Array.prototype.forEach.call(panels, (panel, i) => {
        panel.setAttribute('role', 'tabpanel');
        panel.setAttribute('tabindex', '-1');
        panel.setAttribute('aria-labelledby', tabs[i].id);
        panel.hidden = true;
    });

    // Initially activate the first tab and reveal the first tab panel
    // tabs[0].removeAttribute('tabindex');
    // tabs[0].setAttribute('aria-selected', 'true');
    // panels[0].hidden = false;
})();

const importGraphics = async (planet) => {
    const initial = document.createElement('img');
    const internal = document.createElement('img');
    const image = document.createElement('img');

    Object.assign(initial, {
        ariaHidden: 'true',
        src: `/planet-${planet}.svg`,
    });

    Object.assign(internal, {
        ariaHidden: 'true',
        src: `/planet-${planet}-internal.svg`,
    });

    Object.assign(image, {
        ariaHidden: 'true',
        width: 163,
        height: 199,
        src: `/geology-${planet}.png`,
    });

    let finalFragments = [image, initial, internal];

    graphic.replaceChildren(...finalFragments);
};

const handleActiveClass = (link, group) => {
    group.forEach((oldLink) => {
        oldLink.classList.remove('is-active');
    });
    link.classList.add('is-active');
};

const handleSections = (link, group, section) => {
    group.forEach((oldLink) => {
        oldLink.removeAttribute('aria-selected');
    });
    link.setAttribute('aria-selected', 'true');

    [...panels].forEach((panel) => {
        panel.hidden = true;
    });

    document.querySelector(`[data-${section}]`).removeAttribute('hidden');

    const type = [...sections]
        .find((section) => section.getAttribute('aria-selected') === 'true')
        .getAttribute('data-section');

    const structureSvg = graphic.querySelector('img:nth-child(3)');
    const geologyImg = graphic.querySelector('img');

    if (structureSvg) {
        structureSvg.classList.remove('is-active');

        if (type === 'structure') {
            structureSvg.classList.add('is-active');
        }
    }

    if (geologyImg) {
        geologyImg.classList.remove('is-active');

        if (type === 'geology') {
            geologyImg.classList.add('is-active');
        }
    }
};

const generateSections = (planet) => {
    sectionNav
        .querySelector('[data-section="overview"]')
        .setAttribute('href', `#planet=${planet}&section=overview`);
    sectionNav
        .querySelector('[data-section="structure"]')
        .setAttribute('href', `#planet=${planet}&section=structure`);
    sectionNav
        .querySelector('[data-section="geology"]')
        .setAttribute('href', `#planet=${planet}&section=geology`);
};

const setPlanetContent = (planet) => {
    name.innerText = planet.name;

    contentOverview.innerText = planet.overview.content;
    sourceOverview.setAttribute('href', planet.overview.source);

    contentStructure.innerText = planet.structure.content;
    sourceStructure.setAttribute('href', planet.structure.source);

    contentGeology.innerText = planet.geology.content;
    sourceGeology.setAttribute('href', planet.geology.source);

    rotation.innerText = planet.rotation;
    revolution.innerText = planet.revolution;
    radius.innerText = planet.radius;
    temperature.innerText = planet.temperature;
};

const loadPlanet = async () => {
    let hash = window.location.hash
        .substring(1)
        .split('&')
        .map((v) => v.split('='))
        .reduce((pre, [key, value]) => ({ ...pre, [key]: value }), {});

    if (Object.keys(hash).length === 1) {
        hash = {
            planet: 'mercury',
            section: 'overview',
        };
    }

    const planet = data.find(
        (planet) => planet.name.toLowerCase() === hash.planet
    );

    const link = [...links].find(
        (link) => link.getAttribute('data-planet') === planet.name.toLowerCase()
    );

    const sectionLink = [...sections].find(
        (link) => link.getAttribute('data-section') === hash.section
    );

    if (hash.planet !== oldPlanet) {
        await importGraphics(planet.name.toLowerCase());
    }

    handleActiveClass(link, links);
    generateSections(hash.planet);

    setPlanetContent(planet);

    handleSections(sectionLink, sections, hash.section);

    document.title = `${title} - ${planet.name}`;

    oldPlanet = hash.planet;

    planetHolder.setAttribute('data-planet', planet.name.toLowerCase());
};

hamby.addEventListener('click', function () {
    const isExpanded = JSON.parse(hamby.getAttribute('aria-expanded'));
    hamby.setAttribute('aria-expanded', !isExpanded);
    mainNav.classList.toggle('is-open');
});

loadPlanet();
window.addEventListener('hashchange', loadPlanet, false);

links.forEach((link) => {
    link.addEventListener('click', () => {
        if (mainNav.classList.contains('is-open')) {
            hamby.click();
        }
    });
});
