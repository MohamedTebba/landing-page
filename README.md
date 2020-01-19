# Landing Page Project

## Table of Contents

* [Instructions](#instructions)
* [Functions](#functions)

## Instructions

The starter project has some HTML and CSS styling to display a static version of the Landing Page project. You'll need to convert this project from a static project to an interactive one. This will require modifying the HTML and CSS files, but primarily the JavaScript file.

To get started, open `js/app.js` and start building out the app's functionality

For specific, detailed instructions, look at the project instructions in the Udacity Classroom.

## Functions

### UIController

UIController, takes as an argument dom elements, to have control over the dom dynamicaly, which retruns functions that help modify the state of elements such as hide and show, and other functions that create dom elements, which are:
#### createNavBar: 
creates the navbar according to sections number.
#### createCollapsibleBtn: 
creates buttons according to sections number, which they are used in collapsing those sections.
#### isInViewPort:
check if the section is within the boundries of the viewport or not.

### RUN

run() is an IIFE, which contains the main code and the event listeners: click and scroll events, it takes as arguments the UIController function and the domElements.   
