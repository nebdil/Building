import React, { Component } from 'react';
import $ from 'jquery';
import {TweenLite, Back} from "gsap";
import About from './About.jsx';

export default class Animation extends Component {
  componentDidMount() {

    (function () {
    var element = $('.Buildings');

    var scene = $('#Page-1');
    var background = $('#background');

    var buildings = [];
    var buildingWindows = [];

    var windowAnimationTime = 0.170;

    var timeBeteweenBuldings = 0.175;
    var timeBeforeBackgorund = 1.5;
    var backgroundAnimationTime = 1;

    var buildingAnimationMaxTime = 400;
    var buildingAnimationMinTime = 300;

    var buildingsNames = [{
      name: '#building1',
      windows: '#windows1'
    }, {
      name: '#building2',
      windows: '#windows2'
    }, {
      name: '#building3',
      windows: '#windows3'
    }, {
      name: '#building4',
      windows: '#windows4'
    }, {
      name: '#building5',
      windows: '#windows5'
    }, {
      name: '#building6',
      windows: '#windows6'
    }, {
      name: '#building7',
      windows: '#windows7'
    }];

    $(document).ready(init);
    // $(window).load(startAnimation);
    window.addEventListener('load', startAnimation);

    function init() {
      initBuildings();
      hideAllElements();
    }

    function hideAllElements() {
      buildings.forEach(hideBuilding);
      buildingWindows.forEach(hideWindows);
      hideBackground();
    }

    function initBuildings() {
      buildingsNames = shuffle(buildingsNames);
      buildingsNames.forEach(findBuildings);
    }

    function findBuildings(building, index) {
      var object = scene.find(building.name);
      populateBuildings(object, index);
    }

    function populateBuildings(building, index) {
      buildings.push($(building));
      populateWindows(building, index);
    }

    function populateWindows(building, index) {
      var windowsGroup = building.find(buildingsNames[index].windows);
      windowsGroup = windowsGroup.find('g');
      windowsGroup = windowsGroup.toArray().reverse();
      buildingWindows.push(windowsGroup);
    }

    function hideBuilding(building) {
      TweenLite.set(building, { scaleY: 0, transformOrigin: '100% 100%' });
    }

    function hideWindows(windowsGroup) {
      windowsGroup.forEach(hideWindow);
    }

    function hideWindow(buildingWindow) {
      TweenLite.set($(buildingWindow), { scaleY: 0, scaleX: 0, transformOrigin: '50% 50%' });
    }

    function hideBackground() {
      TweenLite.set(background, { scaleY: 0, transformOrigin: '100% 100%' });
    }

    function startAnimation() {
      element.css('visibility', 'visible');
      buildings.forEach(showBuildings);
      showBackground();
    }

    function showBuildings(building, index) {
      TweenLite.to(
        building,
        getRandomAnimationTime(buildingAnimationMinTime, buildingAnimationMaxTime),
        {
          delay: timeBeteweenBuldings + timeBeteweenBuldings * index,
          scaleY: 1,
          onComplete: windowsAnimation(index),
          ease: Back.easeOut.config(1.7)
        }
      );
    }

    function windowsAnimation(windowsIndex) {
      var windowGroup = buildingWindows[windowsIndex];
      return function showWindows() {
        animateWindow(windowGroup[0], 0, windowGroup);
      };
    }

    function animateWindow(buildingWindow, index, windowGroup) {
      TweenLite.to(
        $(buildingWindow),
        windowAnimationTime,
        {
          scaleX: 1,
          scaleY: 1,
          onComplete: nextWindowAnimation(index, windowGroup),
          ease: Back.easeOut.config(1.7)
        }
      );
    }

    function nextWindowAnimation(index, windowGroup) {
      var nextWindow = getNextWindow(index, windowGroup);

      if (!nextWindow) return;

      return function() {
        animateWindow(nextWindow, index + 1, windowGroup);
      };
    }

    function getNextWindow(currentIndex, windowGroup) {
      if (currentIndex + 1 >= windowGroup.length) return;

      return windowGroup[currentIndex + 1];
    }

    function showBackground()  {
      TweenLite.to(
        background,
        backgroundAnimationTime,
        {
          delay: timeBeforeBackgorund,
          scaleY: 1,
          ease: Back.easeOut.config(1.7)
        }
      );
    }

    function getRandomAnimationTime(min, max) {
      return (Math.floor(Math.random() * (max - min)) + min) / 1000;
    }

    function shuffle(array) {
      let shuffledArray = array;
      for (
        var j, x, i = shuffledArray.length; i;
        j = Math.floor(Math.random() * i),
        x = shuffledArray[--i],
        shuffledArray[i] = shuffledArray[j],
        shuffledArray[j] = x
      );
      return shuffledArray;
    }
  })()
  }
  render() {
    return(
      <div className="Hero">
  <svg className="Buildings" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" id="svg2" viewBox="0 0 939 563">
    <title id="title4">
      town-sketch
    </title>
    <defs id="defs6">
      <linearGradient id="linearGradient-1" x1="50%" x2="50%" y1="0%" y2="100%">
        <stop id="stop9" stopColor="#EEE7D5" offset="0%" />
        <stop id="stop11" stopColor="#E1D9C8" offset="100%" />
      </linearGradient>
      <path id="path-2" d="M0 0h106.13v9.8H0z" />
      <linearGradient id="linearGradient-3" x1="50%" x2="50%" y1="0%" y2="97.9%">
        <stop id="stop15" stopColor="#7DB6BE" offset="0%" />
        <stop id="stop17" stopColor="#68A5AD" offset="100%" />
      </linearGradient>
      <linearGradient id="linearGradient-4" x1="50%" x2="50%" y1="0%" y2="100%">
        <stop id="stop20" stopColor="#18D7F6" offset="0%" />
        <stop id="stop22" stopColor="#45BFFF" offset="100%" />
      </linearGradient>
      <linearGradient id="linearGradient-5" x1="50%" x2="50%" y1="0%" y2="100%">
        <stop id="stop25" stopColor="#768A93" offset="0%" />
        <stop id="stop27" stopColor="#44616E" offset="100%" />
      </linearGradient>
      <linearGradient id="linearGradient-6" x1="50%" x2="50%" y1="0%" y2="100%">
        <stop id="stop30" stopColor="#608490" offset="0%" />
        <stop id="stop32" stopColor="#395B63" offset="100%" />
      </linearGradient>
      <linearGradient id="linearGradient-7" x1="50%" x2="50%" y1="0%" y2="100%">
        <stop id="stop35" stopColor="#8BD8E5" offset="0%" />
        <stop id="stop37" stopColor="#57C4D7" offset="100%" />
      </linearGradient>
      <linearGradient id="linearGradient-8" x1="50%" x2="50%" y1="0%" y2="100%">
        <stop id="stop40" stopColor="#4391B4" offset="0%" />
        <stop id="stop42" stopColor="#2E6882" offset="100%" />
      </linearGradient>
      <linearGradient id="linearGradient-9" x1="50%" x2="50%" y1="0%" y2="100%">
        <stop id="stop45" stopColor="#F9F9F9" offset="0%" />
        <stop id="stop47" stopColor="#E6E6E6" offset="100%" />
      </linearGradient>
      <path id="path-10" d="M0 0h106.13v9.8H0z" />
      <linearGradient id="linearGradient3337" x1="18.67" x2="18.67" y2="37.34" xlinkHref="#linearGradient-4" gradientTransform="matrix(2.397 0 0 .417 0 -3.463)" gradientUnits="userSpaceOnUse" />
      <linearGradient id="linearGradient3339" x1="25.64" x2="25.64" y1="511.44" y2="550.67" xlinkHref="#linearGradient-4" gradientTransform="matrix(2.906 0 0 .344 0 -2)" gradientUnits="userSpaceOnUse" />
    </defs>
    <g id="Page-1" fill="none" fillRule="evenodd">
      <g id="Artboard-13-Copy">
        <g id="town-sketch">
          <g id="background">
            <path id="Rectangle-673-Copy-10" fill="#f4f9f9" d="M746.64 136.84l55.76-33.5 6.77-58V99.9l38.47-22.56v484.43h-101V136.84z" />
            <path id="Rectangle-673-Copy-12" fill="#f4f9f9" d="M646.64 77.35h108.1v484.43h-108.1V77.35z" />
            <path id="Rectangle-673-Copy-25" fill="#F4F9F9" d="M418 110.1h78.37v452.4H418V110.1z" />
            <path id="Rectangle-673-Copy-11" fill="#E3F0F4" d="M444 196.38l-87-51.25V562.5h87V196.38z" />
            <path id="Rectangle-673-Copy-24" fill="#E3F0F4" d="M556 171.2h12.54v-16.06H458v16.05h11v391.3h87V171.2z" />
            <path id="Rectangle-673-Copy-9" fill="#f4f9f9" d="M126.64 78.97l49.02-79.7 51.98 79.7v482.8h-101V78.97z" />
            <path id="Rectangle-673-Copy-22" fill="#f4f9f9" d="M206.64 203.54l49.02-59.13 51.98 59.17V561.8h-101V203.53z" />
            <path id="Rectangle-673-Copy-7" fill="#e3f0f4" d="M275.64 168.43h108v393.35h-108V168.43z" />
            <path id="Rectangle-673-Copy-23" fill="#e3f0f4" d="M543.64 109.38l108-54.05v506.45h-108v-452.4z" />
            <path id="Rectangle-673-Copy-26" fill="#e3f0f4" d="M157.64 257.96h12.54V245.5H59.64v12.46h11v303.82h87V257.96z" />
          </g>
          <g id="building7">
            <path id="Rectangle-371-Copy-31" fill="url(#linearGradient-1)" d="M4.08 0h97.96v222.87H4.08z" transform="translate(689 339)" />
            <path id="Rectangle-371-Copy-23" fill="#000" fillOpacity=".05" d="M693.08 348.8h97.96v4.08h-97.96z" />
            <g id="Rectangle-371-Copy-24" transform="translate(689 339)">
              <use id="use68" fill="#5E8FA5" xlinkHref="#path-2" />
              <use id="use70" xlinkHref="#path-2" />
            </g>
            <path id="Rectangle-371-Copy-25" fill="#BF6363" d="M693.08 523.1h97.96v39.18h-97.96z" />
            <path id="Rectangle-371-Copy-26" fill="#C34400" d="M693.08 523.5h97.96v-.82h-97.96z" />
            <path id="Rectangle-371-Copy-27" fill="#FFF" d="M693.43 533.5h98v-1h-98z" />
            <path id="Rectangle-371-Copy-28" fill="#FFF" d="M693.43 541.5h98v-1h-98z" />
            <path id="Rectangle-371-Copy-29" fill="#FFF" d="M693.43 548.5h98v-1h-98z" />
            <path id="Rectangle-371-Copy-30" fill="#FFF" d="M693.43 555.5h98v-1h-98z" />
            <g id="windows7">
              <g id="Rectangle-372-Copy-73-+-Rectangle-372-Copy-75-+-Rectangle-372-Copy-76">
                <path id="Rectangle-372-Copy-73" fill="#f0fafe" stroke="#4b4b4b" strokeWidth="6" d="M723.7 510.5h36.74v48.72H723.7z" />
                <path id="Rectangle-372-Copy-75" fill="#000" fillOpacity=".1" d="M726.14 511.73h31.03v4.06h-26.13v39.33h-4.9V511.7z" />
                <path id="Rectangle-372-Copy-76" fill="#f06f2a" d="M751.04 532.1h3.27v6.17h-3.23z" />
              </g>
              <g id="Rectangle-372-Copy-71-+-Rectangle-372-Copy-72-+-Rectangle-372-Copy-74">
                <path id="Rectangle-372-Copy-71" fill="#000" fillOpacity=".05" d="M724.1 474.8h36.74v26H724.1z" />
                <path id="Rectangle-372-Copy-72" fill="#e1f4fa" stroke="#fff" strokeWidth="6" d="M723.7 469.98h36.74v25.98H723.7z" />
                <path id="Rectangle-372-Copy-74" fill="#000" fillOpacity=".05" d="M726.14 472.4h31.03v4.07h-26.13v16.65h-4.9v-20.7z" />
              </g>
              <g id="Rectangle-372-Copy-68-+-Rectangle-372-Copy-69-+-Rectangle-372-Copy-70">
                <path id="Rectangle-372-Copy-68" fill="#000" fillOpacity=".05" d="M724.1 430.16h36.74v25.98H724.1z" />
                <path id="Rectangle-372-Copy-69" fill="#e1f4fa" stroke="#fff" strokeWidth="6" d="M723.7 425.32h36.74v25.98H723.7z" />
                <path id="Rectangle-372-Copy-70" fill="#000" fillOpacity=".05" d="M726.14 427.76h31.03v4.06h-26.13v16.64h-4.9v-20.7z" />
              </g>
              <g id="Rectangle-372-Copy-58-+-Rectangle-372-Copy-59-+-Rectangle-372-Copy-67">
                <path id="Rectangle-372-Copy-58" fill="#000" fillOpacity=".05" d="M724.1 385.5h36.74v26H724.1z" />
                <path id="Rectangle-372-Copy-59" fill="#e1f4fa" stroke="#fff" strokeWidth="6" d="M723.7 380.67h36.74v25.98H723.7z" />
                <path id="Rectangle-372-Copy-67" fill="#000" fillOpacity=".05" d="M726.14 383.1h31.03v4.07h-26.13v16.64h-4.9v-20.7z" />
              </g>
            </g>
          </g>
          <g id="building5">
            <path id="Rectangle-371-Copy-20" fill="url(#linearGradient-3)" d="M6.5 18.5h136v301H6.5z" transform="translate(538 242)" />
            <path id="Rectangle-371-Copy-16" fill="#000" fillOpacity=".05" d="M544 268h136v5.5H544z" />
            <path id="Rectangle-371-Copy-19" fill="#FCBC57" d="M538 242h147v26.5H538z" />
            <g id="windows5">
              <g id="Group">
                <path id="Rectangle-372-Copy-50" fill="#000" fillOpacity=".05" d="M559.5 431.5h105V481h-105z" />
                <path id="Rectangle-372-Copy-52" fill="#e1f4fa" stroke="#fff" strokeWidth="6" d="M560 425.5h105V475H560z" />
              </g>
              <g id="Rectangle-372-Copy-47-+-Rectangle-372-Copy-53-+-Rectangle-372-Copy-103">
                <path id="Rectangle-372-Copy-47" fill="#000" fillOpacity=".05" d="M558.5 371H664v26.5H558.5z" />
                <path id="Rectangle-372-Copy-53" fill="#e1f4fa" stroke="#fff" strokeWidth="6" d="M558.5 365.5H664V392H558.5z" />
                <path id="Rectangle-372-Copy-103" fill="#000" fillOpacity=".05" d="M561.85 368.75h97.5V373h-94v15.25h-3.5v-19.5z" />
              </g>
              <g id="Rectangle-372-Copy-46-+-Rectangle-372-Copy-48-+-Rectangle-372-Copy-102">
                <path id="Rectangle-372-Copy-46" fill="#000" fillOpacity=".05" d="M558.5 331.5H664V358H558.5z" />
                <path id="Rectangle-372-Copy-48" fill="#e1f4fa" stroke="#fff" strokeWidth="6" d="M558.5 326H664v26.5H558.5z" />
                <path id="Rectangle-372-Copy-102" fill="#000" fillOpacity=".05" d="M561.85 329.25h97.5v4.25h-94v15.25h-3.5v-19.5z" />
              </g>
              <g id="Rectangle-372-Copy-90-+-Rectangle-372-Copy-88-+-Rectangle-372-Copy-101">
                <path id="Rectangle-372-Copy-90" fill="#000" fillOpacity=".05" d="M558.5 291.5H664V318H558.5z" />
                <path id="Rectangle-372-Copy-88" fill="#e1f4fa" stroke="#fff" strokeWidth="6" d="M558.5 286H664v26.5H558.5z" />
                <path id="Rectangle-372-Copy-101" fill="#000" fillOpacity=".05" d="M561.85 289.25h97.5v4.25h-94v15.25h-3.5v-19.5z" />
              </g>
            </g>
            <path id="Rectangle-484-Copy-13" fill="#000" fillOpacity=".05" d="M555.5 420.5h114V434h-114z" />
            <path id="Rectangle-484-Copy-14" fill="url(#linearGradient3339)" d="M17.5 174h114v13.5h-114z" transform="translate(538 242)" />
          </g>
          <g id="building6">
            <path id="rect118" fill="url(#linearGradient-5)" d="M5.45 0h130.9v297.82H5.45z" transform="translate(797 265)" />
            <path id="rect120" fill="#000" fillOpacity=".05" d="M802.45 278.1h130.9v5.44h-130.9z" />
            <path id="rect122" fill="#C16565" d="M797 265h141.82v13.1H797z" />
            <g id="windows6">
              <g id="g125">
                <path id="rect127" fill="#2c4b56" stroke="#fff" strokeWidth="6" d="M843.36 494.08h49.1v65.45h-49.1z" />
                <path id="path129" fill="#000" fillOpacity=".05" d="M846.64 496.72h41.45v5.45h-34.95v52.9h-6.54v-58.35z" />
                <path id="rect131" fill="#123340" d="M879.9 523.1h4.37v8.3h-4.36z" />
              </g>
              <g id="g133">
                <path id="rect135" fill="#000" fillOpacity=".05" d="M813.9 446.68H863v34.9h-49.1z" />
                <path id="rect137" fill="#e1f4fa" stroke="#fff" strokeWidth="6" d="M813.36 441.36h49.1v34.9h-49.1z" />
                <path id="Rectangle-372-Copy-86" fill="#000" fillOpacity=".05" d="M873.9 446.68H923v34.9h-49.1z" />
                <path id="Rectangle-372-Copy-87" fill="#e1f4fa" stroke="#fff" strokeWidth="6" d="M873.36 441.36h49.1v34.9h-49.1z" />
                <path id="Rectangle-372-Copy-95" fill="#000" fillOpacity=".05" d="M816.5 444.5h43v6H822V473h-5.5v-28.5z" />
                <path id="Rectangle-372-Copy-94" fill="#000" fillOpacity=".05" d="M876.5 444.5h43v6H882V473h-5.5v-28.5z" />
              </g>
              <g id="g143">
                <path id="rect145" fill="#000" fillOpacity=".05" d="M813.9 386.68H863v34.9h-49.1z" />
                <path id="rect147" fill="#e1f4fa" stroke="#fff" strokeWidth="6" d="M813.36 381.36h49.1v34.9h-49.1z" />
                <path id="Rectangle-372-Copy-84" fill="#000" fillOpacity=".05" d="M873.9 386.68H923v34.9h-49.1z" />
                <path id="Rectangle-372-Copy-85" fill="#e1f4fa" stroke="#fff" strokeWidth="6" d="M873.36 381.36h49.1v34.9h-49.1z" />
                <path id="Rectangle-372-Copy-93" fill="#000" fillOpacity=".05" d="M816.5 384.5h43v6H822V413h-5.5v-28.5z" />
                <path id="Rectangle-372-Copy-92" fill="#000" fillOpacity=".05" d="M876.5 384.5h43v6H882V413h-5.5v-28.5z" />
              </g>
              <g id="g153">
                <path id="rect155" fill="#000" fillOpacity=".05" d="M813.9 326.68H863v34.9h-49.1z" />
                <path id="rect157" fill="#e1f4fa" stroke="#fff" strokeWidth="6" d="M813.36 321.36h49.1v34.9h-49.1z" />
                <path id="Rectangle-372-Copy-77" fill="#000" fillOpacity=".05" d="M816.5 324.5h43v6H822V353h-5.5v-28.5z" />
                <path id="Rectangle-372-Copy-91" fill="#000" fillOpacity=".05" d="M873.9 326.68H923v34.9h-49.1z" />
                <path id="Rectangle-372-Copy-83" fill="#e1f4fa" stroke="#fff" strokeWidth="6" d="M873.36 321.36h49.1v34.9h-49.1z" />
                <path id="Rectangle-372-Copy-78" fill="#000" fillOpacity=".05" d="M876.5 324.5h43v6H882V353h-5.5v-28.5z" />
              </g>
            </g>
          </g>
          <g id="building3">
            <path id="rect164" fill="url(#linearGradient-6)" d="M6.5 18.5h136v301H6.5z" transform="translate(266 242)" />
            <path id="rect166" fill="#000" fillOpacity=".1" d="M272 268h136v5.5H272z" />
            <path id="rect168" fill="#1FA7C8" d="M266 242h147v26.5H266z" />
            <g id="windows3">
              <g id="Rectangle-372-Copy-47-+-Rectangle-372-Copy-53-+-Rectangle-372-Copy-97">
                <path id="rect172" fill="#000" fillOpacity=".05" d="M286.5 373H392v26.5H286.5z" />
                <path id="rect174" fill="#e1f4fa" stroke="#fff" strokeWidth="6" d="M286.5 367.5H392V394H286.5z" />
                <path id="Rectangle-372-Copy-97" fill="#000" fillOpacity=".05" d="M289.5 370.5H392v4.25h-99V390h-3.5v-19.5z" />
              </g>
              <g id="Rectangle-372-Copy-46-+-Rectangle-372-Copy-48-+-Rectangle-372-Copy-98">
                <g id="g178">
                  <path id="rect180" fill="#000" fillOpacity=".05" d="M286.5 333H392v26.5H286.5z" />
                  <path id="rect182" fill="#e1f4fa" stroke="#fff" strokeWidth="6" d="M286.5 328H392v26.5H286.5z" />
                  <path id="Rectangle-372-Copy-98" fill="#000" fillOpacity=".05" d="M289.5 331H392v4.25h-99v15.25h-3.5V331z" />
                </g>
              </g>
              <g id="g185">
                <path id="Rectangle-372-Copy-60" fill="#000" fillOpacity=".05" d="M287.5 296h46v26.5h-46z" />
                <path id="Rectangle-372-Copy-61" fill="#000" fillOpacity=".05" d="M345.5 296h46v26.5h-46z" />
                <path id="Rectangle-372-Copy-62" fill="#e1f4fa" stroke="#fff" strokeWidth="6" d="M287.5 291h46v26.5h-46z" />
                <path id="Rectangle-372-Copy-65" fill="#e1f4fa" stroke="#fff" strokeWidth="6" d="M346 291h46v26.5h-46z" />
                <path id="Rectangle-372-Copy-99" fill="#000" fillOpacity=".05" d="M290.5 294.5h40v4.25H294V314h-3.5v-19.5z" />
                <path id="Rectangle-372-Copy-100" fill="#000" fillOpacity=".05" d="M349 294.5h40v4.25h-36.5V314H349v-19.5z" />
              </g>
              <g id="g193">
                <path id="rect195" fill="#000" fillOpacity=".05" d="M287.5 432.5h105V482h-105z" />
                <path id="rect197" fill="#E1F4FA" stroke="#FFF" strokeWidth="6" d="M288 427.5h105V477H288z" />
                <path id="Rectangle-372-Copy-96" fill="#000" fillOpacity=".05" d="M291 429h97.5v6.75H296V474h-5v-45z" />
              </g>
            </g>
            <path id="rect200" fill="#000" fillOpacity=".05" d="M283.5 422.5h114V436h-114z" />
            <path id="rect202" fill="#FCBC57" d="M283.5 418h114v13.5h-114z" />
          </g>
          <g id="building4">
            <path id="Rectangle-603" fill="#000" fillOpacity=".05" d="M383.5 241.5h167v320h-167z" />
            <path id="Rectangle-371-Copy-18" fill="url(#linearGradient-7)" d="M12.75 27.25h154.5V467.5H12.75z" transform="translate(377 94)" />
            <path id="Rectangle-371-Copy-14" fill="#000" fillOpacity=".05" d="M389.75 124.25h154.5v6.44h-154.5z" />
            <path id="Rectangle-371-Copy-13" fill="#2E7EAA" d="M383.3 94.47h167.37v30H383.3z" />
            <path id="Rectangle-484-Copy-12" fill="#000" fillOpacity=".05" d="M389.5 205H545v22.5H389.5z" />
            <path id="Rectangle-484-Copy-2" fill="#3DE6D3" d="M377 199h177v22.5H377z" />
            <g id="windows4">
              <g id="g212">
                <path id="Rectangle-372-Copy-37" fill="#b4e1f0" stroke="#fff" strokeWidth="6" d="M431.75 468.1h68.5v89.93h-68.5z" />
                <path id="Rectangle-372-Copy-38" fill="#d0f2fd" stroke="#fff" strokeWidth="6" d="M431.75 468.1h35.5v89.93h-35.5z" />
                <path id="Rectangle-372-Copy-41" fill="#000" fillOpacity=".05" d="M434.97 559.55v-83.4h4.12v83.4h-4.16z" />
                <path id="Rectangle-389-Copy" fill="#474747" d="M459.5 510.3h15v7.03h-15z" />
              </g>
              <g id="Rectangle-372-Copy-36-+-Rectangle-372-Copy-28">
                <path id="Rectangle-372-Copy-36" fill="#000" fillOpacity=".05" d="M406 406h120v30H406z" />
                <path id="Rectangle-372-Copy-28" fill="#e1f4fa" stroke="#fff" strokeWidth="6" d="M406 401h120v30H406z" />
              </g>
              <g id="g221">
                <path id="Rectangle-372-Copy-89" fill="#000" fillOpacity=".05" d="M407.37 391.63v-150h30v150h-30z" />
                <path id="Rectangle-372-Copy-81" fill="#000" fillOpacity=".05" d="M452.87 391.63v-150h30v150h-30z" />
                <path id="Rectangle-372-Copy-82" fill="#000" fillOpacity=".05" d="M497.37 391.63v-150h30v150h-30z" />
                <g id="Rectangle-372-Copy-29-+-Rectangle-372-Copy-31-+-Rectangle-372-Copy-35" fill="#E1F4FA" stroke="#FFF" strokeWidth="6">
                  <path id="Rectangle-372-Copy-29" d="M407.37 386.63v-150h30v150h-30z" />
                  <path id="Rectangle-372-Copy-31" d="M452.87 386.63v-150h30v150h-30z" />
                  <path id="Rectangle-372-Copy-35" d="M497.37 386.63v-150h30v150h-30z" />
                </g>
              </g>
              <g id="g230">
                <path id="Rectangle-372-Copy-39" fill="#c0e8f5" stroke="#fff" strokeWidth="6" d="M406 141.17h120v56.25H406z" />
                <path id="Rectangle-372-Copy-44" fill="#e1f4fa" stroke="#fff" strokeWidth="6" d="M406 141.17h61.25v56.25H406z" />
                <path id="Rectangle-372-Copy-109" fill="#000" fillOpacity=".05" d="M409 144h55v4.25h-51.5v46.25H409V144z" />
                <path id="Rectangle-372-Copy-110" fill="#000" fillOpacity=".05" d="M467.5 144h55v4.25H471v46.25h-3.5V144z" />
              </g>
            </g>
            <g id="Rectangle-484-Copy-+-Rectangle-484">
              <path id="Rectangle-484-Copy" fill="#000" fillOpacity=".05" d="M421 460.56h89.5v15.58H421z" />
              <path id="Rectangle-484" fill="url(#linearGradient3337)" d="M0-3.46h89.5v15.58H0z" transform="translate(421 459)" />
            </g>
            <path id="Rectangle-484-Copy-3" fill="#55A6D6" fillOpacity=".15" stroke="#FFF" strokeWidth="4" d="M377 199h177v-20H377z" />
            <path id="Rectangle-484-Copy-4" stroke="#FFF" strokeWidth="4" d="M377 199h45v-20h-45z" />
            <path id="Rectangle-484-Copy-5" stroke="#FFF" strokeWidth="4" d="M420.5 199h45v-20h-45z" />
            <path id="Rectangle-484-Copy-6" stroke="#FFF" strokeWidth="4" d="M464 199h45v-20h-45z" />
          </g>
          <g id="building2">
            <path id="rect244" fill="url(#linearGradient-8)" d="M5.45 2h130.9v297.82H5.45z" transform="translate(113 262)" />
            <path id="rect246" fill="#000" fillOpacity=".05" d="M118.45 275.1h130.9v5.44h-130.9z" />
            <path id="rect248" fill="#3DE6D3" d="M113 262h141.82v13.1H113z" />
            <g id="windows2">
              <g id="g251">
                <path id="rect253" fill="#2c4b56" stroke="#fff" strokeWidth="6" d="M159.36 493.43h49.1v65.45h-49.1z" />
                <path id="path255" fill="#000" fillOpacity=".05" d="M162.64 495.07h41.45v5.45h-34.95v52.9h-6.54v-58.35z" />
                <path id="rect257" fill="#123340" d="M195.9 522.45h4.37v8.3h-4.36z" />
              </g>
              <g id="g259">
                <path id="rect261" fill="#000" fillOpacity=".05" d="M129.9 443.68H179v34.9h-49.1z" />
                <path id="rect263" fill="#000" fillOpacity=".05" d="M189.9 443.68H239v34.9h-49.1z" />
                <path id="rect265" fill="#e1f4fa" stroke="#fff" strokeWidth="6" d="M129.36 438.36h49.1v34.9h-49.1z" />
                <path id="rect267" fill="#e1f4fa" stroke="#fff" strokeWidth="6" d="M189.36 438.36h49.1v34.9h-49.1z" />
                <path id="path269" fill="#000" fillOpacity=".05" d="M132.5 441.5h43v6H138V470h-5.5v-28.5z" />
                <path id="path271" fill="#000" fillOpacity=".05" d="M192.5 441.5h43v6H198V470h-5.5v-28.5z" />
              </g>
              <g id="Group-+-Rectangle-372-Copy-92">
                <g id="g274">
                  <path id="rect276" fill="#000" fillOpacity=".05" d="M129.9 383.68H179v34.9h-49.1z" />
                  <path id="rect278" fill="#000" fillOpacity=".05" d="M189.9 383.68H239v34.9h-49.1z" />
                  <path id="rect280" fill="#e1f4fa" stroke="#fff" strokeWidth="6" d="M129.36 378.36h49.1v34.9h-49.1z" />
                  <path id="rect282" fill="#e1f4fa" stroke="#fff" strokeWidth="6" d="M189.36 378.36h49.1v34.9h-49.1z" />
                  <path id="path284" fill="#000" fillOpacity=".05" d="M132.5 381.5h43v6H138V410h-5.5v-28.5z" />
                </g>
                <path id="path286" fill="#000" fillOpacity=".05" d="M192.5 381.5h43v6H198V410h-5.5v-28.5z" />
              </g>
              <g id="g288">
                <path id="rect290" fill="#000" fillOpacity=".05" d="M129.9 323.68H179v34.9h-49.1z" />
                <path id="rect292" fill="#000" fillOpacity=".05" d="M189.9 323.68H239v34.9h-49.1z" />
                <path id="rect294" fill="#e1f4fa" stroke="#fff" strokeWidth="6" d="M129.36 318.36h49.1v34.9h-49.1z" />
                <path id="path296" fill="#000" fillOpacity=".05" d="M132.5 321.5h43v6H138V350h-5.5v-28.5z" />
                <path id="rect298" fill="#e1f4fa" stroke="#fff" strokeWidth="6" d="M189.36 318.36h49.1v34.9h-49.1z" />
                <path id="path300" fill="#000" fillOpacity=".05" d="M192.5 321.5h43v6H198V350h-5.5v-28.5z" />
              </g>
            </g>
          </g>
          <g id="building1">
            <path id="rect303" fill="url(#linearGradient-9)" d="M4.08 0h97.96v222.87H4.08z" transform="translate(0 338)" />
            <path id="rect305" fill="#DADADA" d="M4.08 347.8h97.96v4.08H4.08z" />
            <g id="g307" transform="translate(0 338)">
              <use id="use309" fill="#5E8FA5" xlinkHref="#path-10" />
              <use id="use311" xlinkHref="#path-10" />
            </g>
            <path id="rect313" fill="#F06F2A" d="M4.08 522.1h97.96v39.18H4.08z" />
            <path id="rect315" fill="#C34400" d="M4.08 522.5h97.96v-.82H4.08z" />
            <path id="rect317" fill="#FEA474" d="M4.43 532.5h98v-1h-98z" />
            <path id="rect319" fill="#FEA474" d="M4.43 540.5h98v-1h-98z" />
            <path id="rect321" fill="#FEA474" d="M4.43 547.5h98v-1h-98z" />
            <path id="rect323" fill="#FEA474" d="M4.43 554.5h98v-1h-98z" />
            <g id="windows1">
              <g id="g326">
                <path id="rect328" fill="#E2E2E2" d="M35.1 384.53h36.74v26.12H35.1z" />
                <path id="rect330" fill="#e1f4fa" stroke="#fff" strokeWidth="6" d="M34.7 379.68h36.74v26.12H34.7z" />
                <path id="path332" fill="#000" fillOpacity=".05" d="M37.14 382.12h31.03v4.1H42.04v16.72h-4.9v-20.82z" />
              </g>
              <g id="g334">
                <path id="rect336" fill="#E2E2E2" d="M35.1 429.43h36.74v26.12H35.1z" />
                <path id="rect338" fill="#e1f4fa" stroke="#fff" strokeWidth="6" d="M34.7 424.58h36.74v26.12H34.7z" />
                <path id="path340" fill="#000" fillOpacity=".05" d="M37.14 427.02h31.03v4.1H42.04v16.72h-4.9v-20.82z" />
              </g>
              <g id="g342">
                <path id="rect344" fill="#E2E2E2" d="M35.1 474.33h36.74v26.12H35.1z" />
                <path id="rect346" fill="#e1f4fa" stroke="#fff" strokeWidth="6" d="M34.7 469.48h36.74v26.12H34.7z" />
                <path id="path348" fill="#000" fillOpacity=".05" d="M37.14 471.92h31.03v4.1H42.04v16.72h-4.9v-20.82z" />
              </g>
              <g id="g350">
                <path id="rect352" fill="#f0fafe" stroke="#4b4b4b" strokeWidth="6" d="M34.7 509.1h36.74v48.98H34.7z" />
                <path id="path354" fill="#000" fillOpacity=".05" d="M36.14 511.33h31.03v4.08H41.04V555h-4.9v-43.67z" />
                <path id="rect356" fill="#f06f2a" d="M62.04 530.82h3.27v6.2h-3.23z" />
              </g>
            </g>
          </g>
        </g>
      </g>
    </g>
  </svg>
  <About propS={this.props}/>
</div>
    )
  }

}
