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
      name: 'Steam',
      link: 'https://steamcommunity.com/groups/voltedcc',
    },
    {
      name: 'Discord',
      link: 'https://discord.com/invite/MSgu32t',
    },
    {
      name: 'Twitch',
      link: 'https://www.twitch.tv/eswj',
    },
    {
      name: 'Weheartit',
      link: 'https://weheartit.com/scripter',
    },
    {
      name: 'SoundCloud',
      link: 'https://soundcloud.com/0154',
    },
  ];

  for (let i in links) {
    let link = links[i];

    $('#marquee').append(`<a href="${link.link}" target="_BLANK">${link.name}</a>`);

    link = $('#marquee').children('a').last();

    if (i != links.length - 1) $('#marquee').append(' <img class="emoticon" src="assets/icons/rose.png"> ');
  }

  if (mobileAndTabletCheck()) {
    $('#background').replaceWith('<div id="background" style="background-image: url(assets/image/mobile-background.jpg);"></div>');

    app.shouldIgnoreVideo = true;
  }

  app.titleChanger(['v', 'vo','vol','volt','volte','volted','volted.','volted.c','volted.cc','volted.c','volted.','volted','volte','volt','vol','vo']);
  app.iconChanger(['assets/icons/rose.png']);
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

$('html').on('contextmenu', (event) => {
  const img = document.createElement('img');

  const trollfaceLight = app.skippedIntro ? '' : 'trollface-light';

  img.src = 'assets/icons/rose.png';
  img.width = 18;
  img.height = 18;
  img.alt = 'volted.cc';
  img.style = `position: absolute; left: ${event.pageX}px; top: ${event.pageY}px; z-index: 10`;
  img.className = `troll ${trollfaceLight}`;

  document.body.appendChild(img);
});

setInterval(() => {
  $('.troll').remove();
}, 600);

$('.skip').click(() => {
  skipIntro();
});

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

$.getJSON(ipgeolocation, (data) => {
  writeLine(['Authenticating...', "Granting access to <span style='font-size: 14px; color: #06d;'>[volted.cc]</span>..."], 30, () => {
    if (app.skippedIntro) return;

    clearCursor();

    const usernames = ['user', 'dude'];

    const ip = data.ip ? data.ip : usernames[Math.floor(Math.random() * usernames.length)];
    const country = data.country_name ? data.country_name : 'your country';
    const city = data.city ? data.city : 'your city';

    writeLine([`Access granted! <span style='font-size: 14px; color: #0f0;'>[success]</span>`, `Welcome back, <i style='color: #0f0'>${ip}</i>! /// Location ${city}, ${country}.`], 30, 500, () => {
      if (app.skippedIntro) return;

      clearCursor();

      writeLine([`<i style='color: #F62459'>volted.cc ///</i>`], 120, 500, () => {
        timeouts.push(
          setTimeout(() => {
            if (app.skippedIntro) return;

            clearCursor();

            setTimeout(() => {
              skipIntro();
            }, 500);
          }, 1000)
        );
      });
    });
  });
});

const skipIntro = () => {
  if (app.skippedIntro) return;

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
};

const clearCursor = () => {
  return $('span').siblings('.typed-cursor').css('opacity', '0');
};
