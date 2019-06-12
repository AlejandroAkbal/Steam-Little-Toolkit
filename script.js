// ==UserScript==
// @name         Steam owned games remover
// @homepage     https://github.com/VoidlessSeven7/steam-in-library-remover/
// @namespace    http://tampermonkey.net/
// @version      1.10
// @description  Removes from the store the games that you already own
// @icon         http://store.steampowered.com/favicon.ico
// @author       Alejandro Akbal
// @include      https://store.steampowered.com/*
// @include      http://store.steampowered.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // User Settings
    const settings = {
        removeOwned: true,
        removeIgnored: false,
        removeOwnedRecentlyUpdatedList: false,
        removeIgnoredRecentlyUpdatedList: false
    }

    // Functionality condensed into a single function
    async function start() {

        // Function that removes elements by classes
        const removeElements = (elms) => elms.forEach(el => el.remove());

        /* Variable for checking if the current url is the updated game section
            "< 0" means that it ISN'T the section
            "> -1" means it is the section */
        const urlContains = (query) => window.location.href.indexOf(`/${query}/`);


        /* ----- Category: Normal usage ----- */

        if(urlContains('updated') < 0 && urlContains('bundle') < 0 ) {

            if (settings.removeOwned === true) {
                removeElements( document.querySelectorAll(".ds_owned") );
                console.log('Removed owned content');
            }

            if (settings.removeIgnored === true) {
                removeElements( document.querySelectorAll(".ds_ignored") );
                console.log('Removed ignored content');
            }

        } // End of Category: Recently updated


        /* ----- Category: Recently updated ----- */

        else if (urlContains('updated') > -1) {

                if (settings.removeOwnedRecentlyUpdatedList === true) {
                    removeElements( document.querySelectorAll(".ds_owned") );
                    console.log('Removed recently updated owned content');
                }

                if (settings.removeIgnoredRecentlyUpdatedList === true) {
                    removeElements( document.querySelectorAll(".ds_ignored") );
                    console.log('Removed recently updated ignored content');
                }


        } // End of Category: Recently updated


    }; // End of function start


    // Executing the script
    setTimeout(start, 1000);

    setInterval(start, 5000);









/* ----- Code that im not gonna use but could be good for optimizing in the future -----

    let isThereOwnedContent;
    isThereOwnedContent = document.querySelectorAll(".ds_owned");
    if (isThereOwnedContent.length > 0) {
        alert("funciona");
    }

*/

})(); // End of Tampermonkey script