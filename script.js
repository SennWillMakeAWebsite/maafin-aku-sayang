const particles =
  document.getElementById("particles");

let storyStarted = false;
let noCount = 0;
let musicPlaying = false;


/* =================================
   LOADER + AUTO MUSIC
================================= */

window.addEventListener(
  "load",
  () => {

    setTimeout(() => {

      document
        .getElementById("loader")
        .classList
        .add("hide");

    }, 1600);


    /*
      COBA AUTOPLAY MUSIK
    */

    startMusic();

  }
);


/* =================================
   MUSIC
================================= */

function startMusic() {

  const music =
    document.getElementById(
      "backgroundMusic"
    );

  const player =
    document.getElementById(
      "musicPlayer"
    );

  const status =
    document.getElementById(
      "musicStatus"
    );


  if (!music) return;


  music.volume = 0.55;


  const playPromise =
    music.play();


  if (
    playPromise !== undefined
  ) {

    playPromise
      .then(() => {

        musicPlaying = true;

        player.classList.add(
          "playing"
        );

        status.textContent =
          "now playing";

      })

      .catch(() => {

        /*
          Browser memblokir autoplay.

          Klik pertama user di halaman
          bakal langsung nyalain musik.
        */

        musicPlaying = false;

        status.textContent =
          "Shape of My Heart ♡";

      });

  }

}


/* =================================
   FALLBACK AUTOPLAY

   Kalau browser blok autoplay,
   interaksi pertama di halaman
   langsung memainkan musik.
================================= */

function unlockMusic() {

  const music =
    document.getElementById(
      "backgroundMusic"
    );


  if (!music) return;


  if (
    musicPlaying
  ) {

    removeMusicUnlock();

    return;

  }


  music.volume = 0.55;


  music.play()
    .then(() => {

      musicPlaying = true;


      document
        .getElementById(
          "musicPlayer"
        )
        .classList
        .add("playing");


      document
        .getElementById(
          "musicStatus"
        )
        .textContent =
        "now playing";


      removeMusicUnlock();

    })

    .catch(() => {

      /*
        Kalau masih diblokir,
        biarkan event berikutnya mencoba.
      */

    });

}


/* EVENT UNTUK HP + PC */

document.addEventListener(
  "pointerdown",
  unlockMusic
);

document.addEventListener(
  "touchstart",
  unlockMusic,
  {
    passive: true
  }
);

document.addEventListener(
  "keydown",
  unlockMusic
);


/* HAPUS EVENT SETELAH MUSIK BERHASIL */

function removeMusicUnlock() {

  document.removeEventListener(
    "pointerdown",
    unlockMusic
  );

  document.removeEventListener(
    "touchstart",
    unlockMusic
  );

  document.removeEventListener(
    "keydown",
    unlockMusic
  );

}


/* =================================
   MUSIC BUTTON

   Tombol tetap bisa pause/play.
================================= */

function toggleMusic() {

  const music =
    document.getElementById(
      "backgroundMusic"
    );

  const player =
    document.getElementById(
      "musicPlayer"
    );

  const status =
    document.getElementById(
      "musicStatus"
    );


  if (!music) return;


  if (
    music.paused
  ) {

    music.play()
      .then(() => {

        musicPlaying = true;

        player.classList.add(
          "playing"
        );

        status.textContent =
          "now playing";

      });

  }

  else {

    music.pause();

    musicPlaying = false;

    player.classList.remove(
      "playing"
    );

    status.textContent =
      "paused";

  }

}


/* =================================
   PARTICLES
================================= */

function createParticle() {

  if (!particles) return;


  const particle =
    document.createElement(
      "span"
    );


  particle.className =
    "particle";


  const symbols = [
    "♡",
    "♥",
    "✦",
    "·"
  ];


  particle.textContent =
    symbols[
      Math.floor(
        Math.random() *
        symbols.length
      )
    ];


  particle.style.left =
    Math.random() * 100 +
    "vw";


  particle.style.fontSize =
    Math.random() * 11 +
    7 +
    "px";


  particle.style.animationDuration =
    Math.random() * 7 +
    8 +
    "s";


  particles.appendChild(
    particle
  );


  setTimeout(() => {

    particle.remove();

  }, 16000);

}


setInterval(
  createParticle,
  650
);


/* =================================
   START STORY
================================= */

function startStory() {

  /*
    Tombol pertama ditekan,
    pastikan musik sudah hidup.
  */

  unlockMusic();


  if (
    storyStarted
  ) return;


  storyStarted = true;


  const button =
    document.getElementById(
      "startButton"
    );


  button.textContent =
    "bentar ya... ♡";


  button.style.opacity =
    ".45";


  button.style.pointerEvents =
    "none";


  const texts = [

    "sebenernya aku bingung mulai dari mana.",

    "karena kadang satu kata maaf aja rasanya nggak cukup.",

    "jadi aku nyoba nyampeinnya dengan cara aku sendiri.",

    "aku cuma mau mendekat dan bilang sesuatu ke kamu."

  ];


  let index = 0;


  function nextText() {

    const text =
      document.getElementById(
        "storyText"
      );


    text.classList.remove(
      "active"
    );


    setTimeout(() => {

      text.textContent =
        texts[index];


      text.classList.add(
        "active"
      );


      index++;


      if (
        index <
        texts.length
      ) {

        setTimeout(
          nextText,
          2100
        );

      }

      else {

        setTimeout(() => {

          text.classList.remove(
            "active"
          );

          startWalking();

        }, 1900);

      }

    }, 400);

  }


  nextText();

}


/* =================================
   WALK + FLOWER
================================= */

function startWalking() {

  const scene =
    document.getElementById(
      "openingScene"
    );


  scene.classList.add(
    "walking"
  );


  setTimeout(() => {

    scene.classList.add(
      "together"
    );

  }, 300);


  setTimeout(() => {

    scene.classList.remove(
      "walking"
    );

  }, 2600);


  setTimeout(() => {

    openFlowerQuestion();

  }, 4200);

}


/* =================================
   FLOWER QUESTION
================================= */

function openFlowerQuestion() {

  const section =
    document.getElementById(
      "flowerSection"
    );


  section.style.display =
    "flex";


  section.scrollIntoView({
    behavior: "smooth"
  });

}


/* =================================
   CLICK "GAK"
================================= */

function rejectApology() {

  noCount++;


  const noButton =
    document.getElementById(
      "noButton"
    );


  const yesButton =
    document.getElementById(
      "yesButton"
    );


  const message =
    document.getElementById(
      "noMessage"
    );


  /*
    GAK MAKIN KECIL
  */

  const noScale =
    Math.max(
      .25,
      1 - noCount * .14
    );


  /*
    MAAFIN MAKIN BESAR
  */

  const yesScale =
    Math.min(
      2.25,
      1 + noCount * .16
    );


  noButton.style.transform =
    `scale(${noScale})`;


  yesButton.style.transform =
    `scale(${yesScale})`;


  const messages = [

    "yahh... 🥲",

    "masih gak? 😭",

    "aku minta maaf beneran...",

    "bunganya ikut sedih 🌷",

    "kok tombol maafnya makin gede ya...",

    "aku masih nungguin nih 🥲",

    "oke... tapi aku tetep minta maaf.",

    "🌷♡"

  ];


  const messageIndex =
    Math.min(
      noCount - 1,
      messages.length - 1
    );


  message.textContent =
    messages[
      messageIndex
    ];


  noButton.animate(

    [

      {
        translate: "0 0"
      },

      {
        translate: "-4px 0"
      },

      {
        translate: "4px 0"
      },

      {
        translate: "0 0"
      }

    ],

    {
      duration: 180
    }

  );

}


/* =================================
   CLICK "MAAFIN"
================================= */

function acceptApology() {

  const yes =
    document.getElementById(
      "yesButton"
    );


  const no =
    document.getElementById(
      "noButton"
    );


  const message =
    document.getElementById(
      "noMessage"
    );


  yes.textContent =
    "♡";


  yes.style.pointerEvents =
    "none";


  no.style.opacity =
    "0";


  no.style.pointerEvents =
    "none";


  message.textContent =
    "makasih udah mau dengerin aku ♡";


  pinkFlash();

  heartBurst();


  setTimeout(() => {

    openLetter();

  }, 1800);

}


/* =================================
   LETTER
================================= */

function openLetter() {

  const letter =
    document.getElementById(
      "letter"
    );


  letter.style.display =
    "flex";


  letter.scrollIntoView({
    behavior: "smooth"
  });


  setTimeout(
    revealLetter,
    700
  );

}


function revealLetter() {

  const paragraphs =
    document.querySelectorAll(
      ".letter-card p"
    );


  paragraphs.forEach(
    (
      paragraph,
      index
    ) => {

      setTimeout(() => {

        paragraph
          .classList
          .add(
            "visible"
          );

      }, index * 280);

    }
  );

}


/* =================================
   BEFORE END
================================= */

function openBeforeEnd() {

  const section =
    document.getElementById(
      "beforeEnd"
    );


  section.style.display =
    "flex";


  section.scrollIntoView({
    behavior: "smooth"
  });


  setTimeout(() => {

    const messages =
      document.querySelectorAll(
        ".message-line"
      );


    messages.forEach(
      (
        message,
        index
      ) => {

        setTimeout(() => {

          message
            .classList
            .add(
              "visible"
            );

        }, index * 600);

      }
    );

  }, 700);

}


/* =================================
   FINAL
================================= */

function openFinal() {

  const final =
    document.getElementById(
      "final"
    );


  const scene =
    document.getElementById(
      "finalScene"
    );


  final.style.display =
    "flex";


  final.scrollIntoView({
    behavior: "smooth"
  });


  setTimeout(() => {

    scene.classList.add(
      "walking"
    );

  }, 900);


  setTimeout(() => {

    scene.classList.add(
      "together"
    );

  }, 1200);


  setTimeout(() => {

    scene.classList.remove(
      "walking"
    );

  }, 3500);


  setTimeout(() => {

    document
      .querySelector(
        ".final-message"
      )
      .classList
      .add(
        "visible"
      );


    heartBurst();

  }, 4100);

}


/* =================================
   PINK FLASH
================================= */

function pinkFlash() {

  const flash =
    document.getElementById(
      "pinkFlash"
    );


  flash.classList.add(
    "active"
  );


  setTimeout(() => {

    flash.classList.remove(
      "active"
    );

  }, 450);

}


/* =================================
   HEART BURST
================================= */

function heartBurst() {

  for (
    let i = 0;
    i < 50;
    i++
  ) {

    setTimeout(() => {

      const heart =
        document.createElement(
          "span"
        );


      heart.className =
        "particle";


      heart.textContent =
        Math.random() > .3
          ? "♥"
          : "♡";


      heart.style.left =
        (
          25 +
          Math.random() * 50
        ) +
        "vw";


      heart.style.bottom =
        (
          5 +
          Math.random() * 20
        ) +
        "vh";


      heart.style.fontSize =
        (
          Math.random() * 18 +
          8
        ) +
        "px";


      heart.style.animationDuration =
        (
          Math.random() * 3 +
          3
        ) +
        "s";


      particles.appendChild(
        heart
      );


      setTimeout(() => {

        heart.remove();

      }, 7000);


    }, i * 35);

  }

             }
