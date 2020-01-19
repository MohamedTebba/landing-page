const domElements = () => {
    const domStrings = {
        SECTION: "section",
        NAVBAR_LIST: "navbar__list",
        TO_UP: ".to-up",
        PAGE_HEADER: ".page__header",
        LIST_ITEM: "ul li"
    };

    return {
        sections: document.querySelectorAll(domStrings.SECTION),
        ulList: document.getElementById(domStrings.NAVBAR_LIST),
        toUp: document.querySelector(domStrings.TO_UP),
        header: document.querySelector(domStrings.PAGE_HEADER),
        listItems: document.querySelectorAll(domStrings.LIST_ITEM),
        modifiers: {
            activeLink: "menu__active-link",
            activeSection: "your-active-class",
            hideNavbar: "hide-navbar",
            displayUpBtn: "display-up",
            collapseBtn: "collapse-btn",
            collapseSection: "collapse-section"
        }
    };
};

const UIController = domElements => {
    return {
        removeActiveLink: function (element) {
            element.classList.remove(domElements().modifiers.activeLink);
        },
        removeActiveSection: function (element) {
            element.classList.remove(domElements().modifiers.activeSection);
        },
        addActiveLink: function (element) {
            element.classList.add(domElements().modifiers.activeLink);
        },
        addActiveSection: function (element) {
            element.classList.add(domElements().modifiers.activeSection);
        },
        displayNavbar: function (element) {
            element.classList.remove(domElements().modifiers.hideNavbar);
        },
        hideNavbar: function (element) {
            element.classList.add(domElements().modifiers.hideNavbar);
        },
        hideUpBtn: function (element) {
            element.classList.remove(domElements().modifiers.displayUpBtn);
        },
        showUpBtn: function (element) {
            element.classList.add(domElements().modifiers.displayUpBtn);
        },
        collapseSection: function (event) {
            if (event.target.className === domElements().modifiers.collapseBtn) {
                event.target.nextElementSibling.classList.toggle(
                    domElements().modifiers.collapseSection
                );
            }
        },
        createNavBar: function (sections) {
            const fragment = document.createDocumentFragment();
            Array.from(sections).forEach(e => {
                const li = document.createElement("li");
                li.setAttribute("class", e.id);
                const a = document.createElement("a");
                a.setAttribute("href", `#${e.id}`);
                a.setAttribute("class", "menu__link");
                const sectionName = document.createTextNode(e.dataset.nav);
                a.appendChild(sectionName);
                li.appendChild(a);
                fragment.appendChild(li);
            });
            return fragment;
        },
        isInViewPort: function (element) {
            //isInViewPort function is to check if an element is in the viewport or not.
            const scrollTop = pageYOffset;
            const offsetTop = element.offsetTop;
            const offsetBottom = element.offsetHeight + element.offsetTop;
            /**
             * why I substracted 4% from the offsetTop and 4% from the offsetBottom?, I used it to adjust the sensitivity of the section when it reaches a near spot of the top of the viewport.
             */
            return offsetTop - (offsetTop * 4) / 100 <= scrollTop &&
                offsetBottom - (offsetBottom * 4) / 100 > scrollTop ?
                true :
                false;
        },
        createCollipsableBtn: function (section, data) {
            const a = `<a class="collapse-btn">${data}</a>`;
            section.insertAdjacentHTML("beforebegin", a);
        }
    };
};



(function run(domElements, UIController) {

    //create the navbar
    domElements().ulList.appendChild(
        UIController().createNavBar(domElements().sections)
    );

    const listItemsArr = Array.from(domElements().listItems);
    const sectionsArr = Array.from(domElements().sections);

    /**create and control collapsible sections */
    sectionsArr.forEach(section =>
        UIController().createCollipsableBtn(section, section.dataset.nav)
    );
    addEventListener("click", UIController(domElements).collapseSection);
    /**END/ create and control collapsible sections */

    /** control over the scroll event */
    let isScrolling;
    addEventListener("scroll", () => {
        
        /**control over the active section */

        //reseting any active link to the default state,
        // to be ready for the next link to be active
        listItemsArr.forEach(li => UIController(domElements).removeActiveLink(li));

        sectionsArr.forEach(section => {
            //reseting any active section to the default state,
            // to be ready for the next section to be active
            UIController(domElements).removeActiveSection(section);

            if (UIController().isInViewPort(section)) {
                UIController(domElements).addActiveSection(section);
                UIController(domElements).addActiveLink(
                    document.querySelector(`.${section.id}`)
                );
            }
        });
        /**END/ control over the active section */


        /*control the visibility of the navbar*/
        clearTimeout(isScrolling);
        
        UIController(domElements).displayNavbar(domElements().header);
        
        if (pageYOffset > innerHeight) {
            UIController(domElements).showUpBtn(domElements().toUp);
            isScrolling = setTimeout(() => {
                UIController(domElements).hideNavbar(domElements().header);
            }, 2000);
        } else {
            UIController(domElements).hideUpBtn(domElements().toUp);
        }
        /*END/ navabar visibility control*/
    });
    /**END/ control over the scroll event */


    //go to up
    domElements().toUp.addEventListener("click", () => scrollTo(0, 0));

})(domElements, UIController);