const domElements = () => {

    const domStrings = {
        SECTION:'section',
        NAVBAR_LIST:'navbar__list',
        TO_UP:'.to-up',
        PAGE_HEADER:'.page__header',
    }
    
    return {
        sections: document.querySelectorAll(domStrings.SECTION),
        ulList: document.getElementById(domStrings.NAVBAR_LIST),
        toUp:document.querySelector(domStrings.TO_UP),
        header:document.querySelector(domStrings.PAGE_HEADER)

    }

}

const createNavBar = (sections) => {
    const fragment = document.createDocumentFragment();
    Array.from(sections).forEach(e => {
        const li = document.createElement('li');
        li.setAttribute('class',e.id);
        const a = document.createElement('a');
        a.setAttribute('href',`#${e.id}`);
        a.setAttribute('class','menu__link');
        const sectionName = document.createTextNode(e.dataset.nav);
        a.appendChild(sectionName);
        li.appendChild(a);
        fragment.appendChild(li);
    })
    
    return fragment;
}

const isInViewPort = (element) => {
    const scrollTop = pageYOffset;
    const scrollBottom = scrollTop+innerHeight;
    const offsetTop = element.offsetTop;
    const offsetBottom = element.offsetHeight+element.offsetTop;
    return ( offsetTop >= (scrollTop - innerHeight*40/100) && offsetBottom <= (scrollBottom + innerHeight*40/100)) ? true :false
}


/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Define Global Variables
 * 
*/


/**
 * End Global Variables
 * Start Helper Functions
 * 
*/



/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav


// Add class 'active' to section when near top of viewport


// Scroll to anchor ID using scrollTO event


/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 

// Scroll to section on link click

// Set sections as active


(function run(domElements,createNavBar,isInViewPort){
    
    domElements().ulList.appendChild(createNavBar(domElements().sections));

    let isScrolling;

    addEventListener('scroll',()=>{
        Array.from(document.querySelectorAll('ul li')).forEach(li=>
            li.classList.remove('menu__active-link')
            )
        
        
        Array.from(domElements().sections).forEach( s => {

            s.classList.remove('your-active-class');

                if(isInViewPort(s)){
                s.classList.add('your-active-class');
                Array.from(document.querySelectorAll('ul li')).forEach(li=>
                    li.classList.remove('menu__active-link')
                    )
                document.querySelector(`.${s.id}`).classList.add('menu__active-link');
            }
            
        })

        clearTimeout(isScrolling);
        domElements().header.classList.remove('hide-navbar');

            if( pageYOffset > innerHeight ){
        
                domElements().toUp.classList.add('display-up');
                isScrolling = setTimeout(()=>{
                    domElements().header.classList.add('hide-navbar');
                },2000);


            }else{ 
                domElements().toUp.classList.remove('display-up');
                
            }
    })

    domElements().toUp.addEventListener('click',()=>{
      scrollTo(0,0);
    })




})(domElements,createNavBar,isInViewPort)