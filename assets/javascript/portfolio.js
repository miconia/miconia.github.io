/*

Credits:
    - Lummit - https://obnoxious.club/ | https://github.com/Lumm1t/ | Discord: Lummit#0201
    - expl0it, shellcode.team

Thanks for:
    - Google
    - StackOverflow
    - jQuery
    - jQuery Marquee
    - animate.css
    - typed.js

GitHub: https://github.com/Lumm1t/obnoxious.club

*/

'use strict';

const ipgeolocation = 'https://api.ipgeolocation.io/ipgeo?apiKey=71d5413f6eb746e9bbbae5559f600a0a';

const timeouts = [];

const mobileAndTabletCheck = () => /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

$(document).ready(() => {
  const links = [
    {
      name: '⠀telegram⠀',
      link: 'https://t.me/miconia',
    },
    {
      name: '⠀instagram⠀',
      link: 'https://ru.pinterest.com/mic0nia/~~/',
    },
    {
      name: '⠀vk⠀',
      link: 'https://vk.com/miconia',
    },
    {
      name: '⠀♡⠀',
      link: 'https://ru.pinterest.com/mic0nia/~~/',
    },
    {
      name: '⠀2008⠀',
      link: 'https://steamcommunity.com/profiles/76561197997579653',
    },
    {
      name: '⠀fullbright⠀',
      link: 'https://steamcommunity.com/groups/600600',
    },
  ];

  for (let i in links) {
    let link = links[i];

    $('#marquee').append(`<a href="${link.link}" target="_BLANK">${link.name}</a>`);

    link = $('#marquee').children('a').last();

    if (i != links.length - 1) $('#marquee').append('<img class="emoticon" src="assets/icons/icons16.png">');
  }

  if (mobileAndTabletCheck()) {
    $('#background').replaceWith('<div id="background" style="background-image: url(assets/image/ae3e18841ce9527dd4d47419c2f2ccc4.jpg);"></div>');

    app.shouldIgnoreVideo = true;
  }

  app.titleChanger(['m', 'mi','mic','mico','micon','miconi','miconia','miconi','micon','mico','mic','mi']);
  app.iconChanger(['assets/icons/baby.png']);
});

if ($.cookie('videoTime')) {
  app.videoElement.currentTime = $.cookie('videoTime');
  app.audioElement.currentTime = $.cookie('videoTime');
}

document.addEventListener('contextmenu', (event) => {
  event.preventDefault();
});

document.body.onkeyup = (event) => {
  if (event.keyCode == 32 && app.skippedIntro) {
    if (app.backgroundToggler) {
      app.videoElement.play();
      app.audioElement.play();
    } else {
      app.videoElement.pause();
      app.audioElement.pause();
    }

    return (app.backgroundToggler = !app.backgroundToggler);
  }
};

const clearCursor = () => {
  return $('span').siblings('.typed-cursor').css('opacity', '0');
};
