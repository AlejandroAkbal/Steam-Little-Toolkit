// ==UserScript==
// @name         Steam owned games remover
// @homepage     https://github.com/VoidlessSeven7/steam-in-library-remover/
// @namespace    http://tampermonkey.net/
// @version      1.01
// @description  Removes from the store the games that you already own
// @icon         http://store.steampowered.com/favicon.ico
// @author       Alejandro Akbal
// @match        https://store.steampowered.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // User Settings
    const settings = {
        removeOwned: true,
        removeIgnored: false
    }

    // Functionality

    async function start() {

        // Function that removes elements by classes
        const removeElements = (elms) => elms.forEach(el => el.remove());

        if (settings.removeOwned === true) {
            removeElements( document.querySelectorAll(".ds_owned") );
            console.log('Removed owned content');
        }

        if (settings.removeIgnored === true) {
            removeElements( document.querySelectorAll(".ds_ignored") );
            console.log('Removed ignored content');
        }

    };


    // Executing the script
    setTimeout(start, 50);

    setInterval(start, 5000);


})();
