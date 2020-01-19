const domElements = () => {

    const domStrings = {
        SECTION: 'section',
        NAVBAR_LIST: 'navbar__list',
        TO_UP: '.to-up',
        PAGE_HEADER: '.page__header',
        LIST_ITEM: 'ul li'
    }

    return {
        sections: document.querySelectorAll(domStrings.SECTION),
        ulList: document.getElementById(domStrings.NAVBAR_LIST),
        toUp: document.querySelector(domStrings.TO_UP),
        header: document.querySelector(domStrings.PAGE_HEADER),
        listItems: document.querySelectorAll(domStrings.LIST_ITEM),
        modifiers: {
            activeLink: 'menu__active-link',
            activeSection: 'your-active-class',
            hideNavbar: 'hide-navbar',
            displayUpBtn: 'display-up'
        }

    }

}

const UIController = (domElements) => {

    return {
        removeActiveLink: function (element) {
            element.classList.remove(domElements().modifiers.activeLink)
        },
        removeActiveSection: function (element) {
            element.classList.remove(domElements().modifiers.activeSection)
        },
        addActiveLink: function (element) {
            element.classList.add(domElements().modifiers.activeLink)
        },
        addActiveSection: function (element) {
            element.classList.add(domElements().modifiers.activeSection)
        },
        displayNavbar: function (element) {
            element.classList.remove(domElements().modifiers.hideNavbar)
        },
        hideNavbar: function (element) {
            element.classList.add(domElements().modifiers.hideNavbar)
        },
        hideUpBtn: function (element) {
            element.classList.remove(domElements().modifiers.displayUpBtn)
        },
        showUpBtn: function (element) {
            element.classList.add(domElements().modifiers.displayUpBtn)
        }

    }
}

const createNavBar = (sections) => {
    const fragment = document.createDocumentFragment();
    Array.from(sections).forEach(e => {
        const li = document.createElement('li');
        li.setAttribute('class', e.id);
        const a = document.createElement('a');
        a.setAttribute('href', `#${e.id}`);
        a.setAttribute('class', 'menu__link');
        const sectionName = document.createTextNode(e.dataset.nav);
        a.appendChild(sectionName);
        li.appendChild(a);
        fragment.appendChild(li);
    })

    return fragment;
}

//isInViewPort function is to check if an element is in the viewport or not.
/**
 * why I substracted 2% from the offsetTop?, I used it to adjust the sensitivity of the section when it reaches a near spot of the top of the viewport.
 */

//( offsetTop >= (scrollTop - innerHeight*40/100) && offsetBottom <= (scrollBottom + innerHeight*40/100))

const isInViewPort = (element) => {
    const scrollTop = pageYOffset;
    // const scrollBottom = scrollTop+innerHeight;
    const offsetTop = element.offsetTop;
    const offsetBottom = element.offsetHeight + element.offsetTop;
    return (offsetTop - (offsetTop * 2 / 100) <= scrollTop && offsetBottom > scrollTop) ? true : false

}


(function run(domElements, createNavBar, isInViewPort, UIController) {

    domElements().ulList.appendChild(createNavBar(domElements().sections));

    const listItemsArr = Array.from(domElements().listItems);
    const sectionsArr = Array.from(domElements().sections);

    let isScrolling;

    addEventListener('scroll', () => {

        //reseting any active link to the default state,
        // to be ready for the next link to be active
        listItemsArr.forEach(li =>
            UIController(domElements).removeActiveLink(li)
        )


        sectionsArr.forEach(section => {
            //reseting any active section to the default state,
            // to be ready for the next section to be active
            UIController(domElements).removeActiveSection(section)

            if (isInViewPort(section)) {
                UIController(domElements).addActiveSection(section)
                // listItemsArr.forEach(li=>
                //     UIController(domElements).removeActiveLink(li)
                //     )
                UIController(domElements).addActiveLink(document.querySelector(`.${section.id}`))
            }

        })

        clearTimeout(isScrolling);

        UIController(domElements).displayNavbar(domElements().header);

        if (pageYOffset > innerHeight) {
            UIController(domElements).showUpBtn(domElements().toUp)
            isScrolling = setTimeout(() => {
                UIController(domElements).hideNavbar(domElements().header)
            }, 2000);
        } else {
            UIController(domElements).hideUpBtn(domElements().toUp);
        }
    })

    domElements().toUp.addEventListener('click', () => {
        scrollTo(0, 0);
    })




})(domElements, createNavBar, isInViewPort, UIController)