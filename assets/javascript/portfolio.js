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
      link: 'https://www.instagram.com/miconiia?igsh=c3h2cTI4MnI4enJ1',
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

  for (var i in links) {
    var link = links[i];

    $('#marquee').append(`<a href="${link.link}" target="_BLANK">${link.name}</a>`);

    link = $('#marquee').children('a').last();

    if (i != links.length - 1) $('#marquee').append('<img class="emoticon" src="assets/icons/icons16.png">');
  }

  if (mobileAndTabletCheck()) {
    $('#background').replaceWith('<div id="background" style="background-image: url(assets/image/6ace7d86f9a6a7b4ccf9abd56ac9314c.jpg);"></div>');

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

setInterval(() => {
  $('.troll').remove();
}, 600);

$.fn.extend({
  animateCss: function (animationName) {
    const animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';

    this.addClass(`animated ${animationName}`).one(animationEnd, () => {
      $(this).removeClass(`animated ${animationName}`);
    });

    return this;
  },
});

const writeLine = (text, speed, timeout, callback) => {
  timeout = typeof timeout === 'number' ? timeout : [0, (callback = timeout)];

  const lineNumber = app.id !== 2 ? ++app.id : (app.id += 2);

  setTimeout(() => {
    const typed = new Typed(`#line${lineNumber}`, {
      strings: text,
      typeSpeed: speed,
      onComplete: callback,
    });
  }, timeout);
};



app.skippedIntro = true;

timeouts.forEach((timeout) => {
  clearTimeout(timeout);
});

$('.top-right').remove();

$('#main').fadeOut(100, () => {
  $('#main').remove();

  $('#marquee').marquee({
    duration: 15000,
    gap: 420,
    delayBeforeStart: 1000,
    direction: 'left',
    duplicated: true,
  });

  setTimeout(() => {
    $('.brand-header').animateCss(app.effects[Math.floor(Math.random() * app.effects.length)]);
  }, 200);

  setTimeout(() => {
    const typed = new Typed('#brand', {
      strings: app.brandDescription,
      typeSpeed: 40,

      onComplete: () => {
        clearCursor();
      },
    });
  }, 1350);

  setTimeout(() => {
    if (!app.shouldIgnoreVideo) {
      app.videoElement.play();
      app.audioElement.play();
    }

    app.videoElement.addEventListener(
      'timeupdate',
      () => {
        $.cookie('videoTime', app.videoElement.currentTime, { expires: 1 });
      },
      false
    );

    $('.marquee-container').css('visibility', 'visible').hide().fadeIn(100);

    $('.marquee-container').animateCss('zoomIn');

    $('.container').fadeIn();

    $('.background').fadeIn(200, () => {
      if (!app.shouldIgnoreVideo) $('#audio').animate({ volume: app.musicVolume }, app.musicFadeIn);
    });
  }, 200);
});

const clearCursor = () => {
  return $('span').siblings('.typed-cursor').css('opacity', '0');
};
