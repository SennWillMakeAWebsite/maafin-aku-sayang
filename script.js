const particles =
  document.getElementById(
    "particles"
  );


const music =
  document.getElementById(
    "backgroundMusic"
  );


const musicPlayer =
  document.getElementById(
    "musicPlayer"
  );


const musicStatus =
  document.getElementById(
    "musicStatus"
  );


const audioError =
  document.getElementById(
    "audioError"
  );


let storyStarted = false;

let noCount = 0;

let musicPlaying = false;



/* =================================
   AUDIO SETTINGS
================================= */

if (music) {

  music.volume = 0.6;


  music.addEventListener(
    "play",
    () => {

      musicPlaying = true;

      musicPlayer
        .classList
        .add(
          "playing"
        );


      musicStatus.textContent =
        "now playing";

    }
  );


  music.addEventListener(
    "pause",
    () => {

      musicPlaying = false;

      musicPlayer
        .classList
        .remove(
          "playing"
        );


      musicStatus.textContent =
        "paused";

    }
  );


  music.addEventListener(
    "error",
    () => {

      audioError.textContent =
        "musiknya belum kebaca :( cek file shape-of-my-heart.mp3";

      musicStatus.textContent =
        "audio error";

    }
  );

}



/* =================================
   ENTER WEBSITE + PLAY MUSIC
================================= */

function enterWebsite() {

  const welcome =
    document.getElementById(
      "welcomeScreen"
    );


  const button =
    document.getElementById(
      "enterButton"
    );


  button.textContent =
    "sebentar... ♡";


  /*
    Karena fungsi ini dipanggil
    langsung dari klik user,
    browser seharusnya mengizinkan
    musik bersuara.
  */

  music
    .play()

    .then(() => {

      musicPlaying = true;


      musicPlayer
        .classList
        .add(
          "playing"
        );


      musicStatus.textContent =
        "now playing";


      audioError.textContent =
        "";


      /*
        Baru masuk setelah musik
        berhasil dimainkan.
      */

      setTimeout(() => {

        welcome
          .classList
          .add(
            "hide"
          );


        musicPlayer
          .classList
          .add(
            "show"
          );


        heartBurst();

      }, 350);

    })


    .catch(error => {

      console.error(
        "Audio gagal:",
        error
      );


      /*
        Kalau file musik tidak
        ditemukan atau browser gagal
        membacanya, jangan pura-pura
        seolah musik sedang jalan.
      */

      button.textContent =
        "coba nyalain lagi ♫";


      audioError.textContent =
        "musiknya belum kebaca. pastiin file shape-of-my-heart.mp3 ada di folder yang sama.";

    });

}



/* =================================
   MUSIC TOGGLE
================================= */

function toggleMusic() {

  if (!music) {
    return;
  }


  if (music.paused) {

    music
      .play()

      .then(() => {

        musicPlaying = true;


        musicPlayer
          .classList
          .add(
            "playing"
          );


        musicStatus.textContent =
          "now playing";

      })


      .catch(error => {

        console.error(
          error
        );


        musicStatus.textContent =
          "audio error";

      });

  }

  else {

    music.pause();


    musicPlaying = false;


    musicPlayer
      .classList
      .remove(
        "playing"
      );


    musicStatus.textContent =
      "paused";

  }

}



/* =================================
   PARTICLES
================================= */

function createParticle() {

  if (!particles) {
    return;
  }


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
    Math.random() *
    100 +
    "vw";


  particle.style.fontSize =
    Math.random() *
    11 +
    7 +
    "px";


  particle.style.animationDuration =
    Math.random() *
    7 +
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

  if (storyStarted) {
    return;
  }


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


    text
      .classList
      .remove(
        "active"
      );


    setTimeout(() => {

      text.textContent =
        texts[index];


      text
        .classList
        .add(
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

          text
            .classList
            .remove(
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
   WALKING
================================= */

function startWalking() {

  const scene =
    document.getElementById(
      "openingScene"
    );


  scene
    .classList
    .add(
      "walking"
    );


  setTimeout(() => {

    scene
      .classList
      .add(
        "together"
      );

  }, 300);


  setTimeout(() => {

    scene
      .classList
      .remove(
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

    behavior:
      "smooth"

  });

}



/* =================================
   CLICK GAK
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
    Tombol GAK makin kecil,
    tapi tetap ada.
  */

  const noScale =
    Math.max(

      .3,

      1 -
      noCount *
      .13

    );


  /*
    Tombol MAAFIN makin besar.
  */

  const yesScale =
    Math.min(

      2.1,

      1 +
      noCount *
      .15

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

    "oke... aku tetep minta maaf.",

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
        translate:
          "0 0"
      },

      {
        translate:
          "-4px 0"
      },

      {
        translate:
          "4px 0"
      },

      {
        translate:
          "0 0"
      }

    ],

    {

      duration:
        180

    }

  );

}



/* =================================
   CLICK MAAFIN
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

    behavior:
      "smooth"

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

    behavior:
      "smooth"

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

    behavior:
      "smooth"

  });


  setTimeout(() => {

    scene
      .classList
      .add(
        "walking"
      );

  }, 900);


  setTimeout(() => {

    scene
      .classList
      .add(
        "together"
      );

  }, 1200);


  setTimeout(() => {

    scene
      .classList
      .remove(
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


  flash
    .classList
    .add(
      "active"
    );


  setTimeout(() => {

    flash
      .classList
      .remove(
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
          Math.random() *
          50
        ) +
        "vw";


      heart.style.bottom =
        (
          5 +
          Math.random() *
          20
        ) +
        "vh";


      heart.style.fontSize =
        (
          Math.random() *
          18 +
          8
        ) +
        "px";


      heart.style.animationDuration =
        (
          Math.random() *
          3 +
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
