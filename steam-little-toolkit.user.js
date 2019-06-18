// ==UserScript==

// @name            Steam little toolkit
// @version         1.21
// @author          VoidlessSeven7
// @description     Tampermonkey script for the steam store that makes your experience better, works best with the SteamDB Extension, find all the utilites by reading the settings!
// @copyright       2019, VoidlessSeven7, (https://akbal.dev)
// @license         GPL-3.0-or-later; http://www.gnu.org/licenses/gpl-3.0.txt

// @namespace       https://greasyfork.org/users/309931
// @homepageURL     https://github.com/VoidlessSeven7/steam-little-toolkit/
// @website         https://akbal.dev
// @icon            https://store.steampowered.com/favicon.ico

// @updateURL       https://github.com/VoidlessSeven7/steam-little-toolkit/raw/master/steam-little-toolkit.user.js
// @downloadURL     https://github.com/VoidlessSeven7/steam-little-toolkit/raw/master/steam-little-toolkit.user.js
// @supportURL      https://github.com/VoidlessSeven7/steam-little-toolkit/issues
// @contributionURL https://paypal.me/Alejandrorr7

// @match           http*://store.steampowered.com/*
// @match           http*://steamcommunity.com/linkfilter/?url=*
// @exclude         http*://store.steampowered.com/checkout/*
// @exclude         http*://store.steampowered.com/cart/*
// @exclude         http*://store.steampowered.com/login/*
// @exclude         http*://store.steampowered.com/join/*

// @run-at          document-end
// @grant           GM_setValue
// @grant           GM_getValue

// ==/UserScript==

(function () {
    'use strict';

    // User Settings
    const settings = {
        useMenu: true,
        bypassLinkFilter: true,
        bypassAgeCheck: true,
        removeOwned: true,
        removeIgnored: false,
        removeOwnedRecentlyUpdatedList: false,
        removeIgnoredRecentlyUpdatedList: false,
        removeLiveStreams: true
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
        if (settings.bypassLinkFilter === true && urlContains('linkfilter') > -1) {

            window.location = String(window.location).substr(43);

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

            if (settings.removeLiveStreams === true) {
                removeElements(document.querySelectorAll(".home_ctn.live_streams_ctn.no_paging"));
                console.log('Removed livestreams');
            }

        } // End of Category: Normal usage


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


    /* ----- Category: Section Menu ----- */

    if (settings.useMenu === true) {

        // CSS code injection

        const htmlCode = `<div class="slt-menu-icon-toggler slt-Menu-Toggler"> <img src="https://store.steampowered.com/favicon.ico" alt="Steam Little Toolkit's menu toggler"> </div><div id="slt-menu" class="slt-menu slt-d-none"> <div class="slt-menu-header"> <h2 class="slt-text-center">Steam Little Toolkit Settings</h2> </div><div class="slt-menu-body"> <div class="slt-d-inline-flex"> <p>Use menu?</p><label class="slt-switch"> <input id="sltuseMenuSetting" type="checkbox"> <span class="slt-slider"></span> </label> </div><div class="slt-d-inline-flex"> <p>Bypass Link Filter</p><label class="slt-switch"> <input id="sltbypassLinkFilterSetting" type="checkbox"> <span class="slt-slider"></span> </label> </div><div class="slt-d-inline-flex"> <p>Bypass Age Check</p><label class="slt-switch"> <input id="sltbypassAgeCheckSetting" type="checkbox"> <span class="slt-slider"></span> </label> </div><div class="slt-d-inline-flex"> <p>Remove Owned Games</p><label class="slt-switch"> <input id="sltremoveOwnedSetting" type="checkbox"> <span class="slt-slider"></span> </label> </div><div class="slt-d-inline-flex"> <p>Remove Ignored Games</p><label class="slt-switch"> <input id="sltremoveIgnoredSetting" type="checkbox"> <span class="slt-slider"></span> </label> </div><div class="slt-d-inline-flex"> <p>Remove Owned on <em>Recently Updated</em></p><label class="slt-switch"> <input id="sltremoveOwnedRecentlyUpdatedListSetting" type="checkbox"> <span class="slt-slider"></span> </label> </div><div class="slt-d-inline-flex"> <p>Remove Ignored on <em>Recently Updated</em></p><label class="slt-switch"> <input id="sltremoveIgnoredRecentlyUpdatedListSetting" type="checkbox"> <span class="slt-slider"></span> </label> </div><div class="slt-d-inline-flex"> <p>Remove Live Streams</p><label class="slt-switch"> <input id="sltremoveLiveStreamsSetting" type="checkbox"> <span class="slt-slider"></span> </label> </div></div><div class="slt-menu-footer"> <p class="slt-text-center slt-text-nowrap"><small>&hearts; If you are enjoying the script, <a href="https://paypal.me/Alejandrorr7">please help me continue development</a> &hearts;</small> </p></div></div>`;
        const cssCode = `.slt-menu,.slt-menu h2,.slt-menu-body,.slt-menu-footer,.slt-menu-header{margin:0;padding:0;-webkit-box-sizing:border-box;box-sizing:border-box;color:rgba(255,255,255,.8)}.slt-menu{border-top-left-radius:2vh;border-bottom-right-radius:2vh;height:50vh;width:50vw;background:rgba(0,0,0,.95);display:-webkit-box;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;flex-direction:column;top:25%;bottom:25%;left:25%;right:25%;position:fixed;z-index:696969}.slt-overflow-x-hidden{overflow-x:hidden}.slt-menu-header{padding:20px}.slt-menu-body{border-top:1px solid rgba(255,255,255,.6);padding-left:1rem;padding-right:1rem;display:-webkit-box;display:flex;-ms-flex-wrap:wrap;flex-wrap:wrap;-webkit-box-pack:space-evenly;justify-content:space-evenly;overflow-x:hidden;overflow-y:scroll}.slt-menu-footer{margin-top:auto;padding-bottom:5px}.slt-menu a{color:rgba(127,255,212,.8)}.slt-blur{filter:blur(5px)}.slt-text-center{text-align:center}.slt-overflow-hidden{overflow:hidden}.slt-text-nowrap{white-space:nowrap}.slt-d-none{display:none}.slt-d-inline-flex{display:-webkit-inline-box;display:inline-flex}.slt-menu-body>.slt-d-inline-flex{margin-top:10px}.slt-menu-icon-toggler{position:fixed;top:25%;right:-25px;-webkit-transition:right .3s ease-in-out;-o-transition:right .3s ease-in-out;transition:right .3s ease-in-out;z-index:696969}.slt-menu-icon-toggler:hover{right:10px}.slt-menu-icon-toggler img{max-height:64px;max-width:64px}.responsive_page_frame.with_header{transition:filter .3s linear;-webkit-transition:.3s -webkit-filter linear}.slt-switch{position:relative;display:inline-block;width:50px;height:20px;margin-left:8px}.slt-switch input{opacity:0;width:0;height:0}.slt-slider{position:absolute;cursor:pointer;top:0;left:0;right:0;bottom:0;background-color:rgba(204,204,204,.8);-webkit-transition:.4s;-o-transition:.4s;transition:.4s;border-radius:34px}.slt-slider:before{position:absolute;content:"";height:13px;width:13px;left:4px;bottom:4px;background-color:#fff;-webkit-transition:.4s;-o-transition:.4s;transition:.4s;border-radius:50%}input:checked+.slt-slider{background-color:rgba(33,149,243,.8)}input:focus+.slt-slider{-webkit-box-shadow:0 0 1px rgba(33,149,243,.8);box-shadow:0 0 1px rgba(33,149,243,.8)}input:checked+.slt-slider:before{-webkit-transform:translateX(29px);transform:translateX(29px)}`;

        document.body.innerHTML += htmlCode;
        document.body.innerHTML += "<style>" + cssCode + "</style>";

        // End of CSS code injection

        // Add listeners

        function sltToggleMenu() {
            document.body.classList.toggle('slt-overflow-x-hidden');
            document.getElementById('slt-menu').classList.toggle('slt-d-none');
            document.querySelector('.responsive_page_frame.with_header').classList.toggle('slt-blur');
        }

        const sltMenuTogglers = document.getElementsByClassName('slt-Menu-Toggler');

        Array.from(sltMenuTogglers).forEach(function (element) {
            element.addEventListener('click', sltToggleMenu, false);
        });

        // End of Add listeners

        // Toggle the checklist for the menu

        Object.entries(settings).forEach(([settingName, value]) => {

            let idSettingName = `slt${settingName}Setting`;

            if (value === true) {
                document.getElementById(idSettingName).checked = true;
            }

            document.getElementById(idSettingName).addEventListener('change', function () {

                if (this.checked) {

                    settings[settingName] = true;
                    alert(`${settings[settingName]}: This doesnt work since I dont know how to set the variables in tampermonkey`);

                } else {

                    settings[settingName] = false;
                    alert(`${settings[settingName]}: This doesnt work since I dont know how to set the variables in tampermonkey`);

                }
            });




        }); // End of Toggle the checklist for the menu

    } // End of Category: Section Menu


})(); // End of Tampermonkey script