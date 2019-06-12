// ==UserScript==

// @name            Steam little toolkit
// @namespace       http://tampermonkey.net/
// @version         1.17
// @author          Alejandro Akbal
// @description     Little additions like removing owned games from the store and bypassing the external link filter

// @source          https://github.com/VoidlessSeven7/steam-in-library-remover/
// @website         https://akbal.dev
// @icon            https://store.steampowered.com/favicon.ico

// @updateURL       https://github.com/VoidlessSeven7/steam-in-library-remover/blob/master/script.js
// @downloadURL     https://github.com/VoidlessSeven7/steam-in-library-remover/blob/master/script.js
// @supportURL      https://github.com/VoidlessSeven7/steam-in-library-remover/issues

// @match           http*://store.steampowered.com/*
// @include         /^https?://(?:www\.)?steamcommunity\.com/linkfilter/.*$/

// @run-at          document-end
// @grant           none

// ==/UserScript==

(function () {
    'use strict';

    // User Settings
    const settings = {
        bypassFilter: true,
        bypassAgeCheck: true,
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


        /* ----- Category: Utilities ----- */

        // Bypass steam link filter
        if (settings.bypassFilter === true) {

            const url = window.location.href,
                regex = /^https?:\/\/(?:www\.)?steamcommunity\.com\/linkfilter\/.+?=(.+)$/i, // This was implemented thanks to https://github.com/Jaex
                match = url.match(regex);

            if (match) {
                window.location.href = match[1];
            }

        }

        // Bypass steam agecheck
        if (settings.bypassAgeCheck === true && urlContains('agecheck') > -1) {

            const formAgeYear = document.getElementById('ageYear');

            if (formAgeYear) {
                formAgeYear.value = 2000;
            }

            document.querySelector('.btnv6_blue_hoverfade.btn_medium').click();

        } // End of Category: Utilities


        /* ----- Category: Normal usage ----- */

        if (urlContains('updated') < 0 && urlContains('bundle') < 0) {

            if (settings.removeOwned === true) {
                removeElements(document.querySelectorAll(".ds_owned"));
                console.log('Removed owned content');
            }

            if (settings.removeIgnored === true) {
                removeElements(document.querySelectorAll(".ds_ignored"));
                console.log('Removed ignored content');
            }

        } // End of Category: Recently updated


        /* ----- Category: Recently updated ----- */
        else if (urlContains('updated') > -1) {

            if (settings.removeOwnedRecentlyUpdatedList === true) {
                removeElements(document.querySelectorAll(".ds_owned"));
                console.log('Removed recently updated owned content');
            }

            if (settings.removeIgnoredRecentlyUpdatedList === true) {
                removeElements(document.querySelectorAll(".ds_ignored"));
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