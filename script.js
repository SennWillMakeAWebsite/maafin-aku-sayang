const particles =
  document.getElementById("particles");

const music =
  document.getElementById("backgroundMusic");

const musicPlayer =
  document.getElementById("musicPlayer");

const musicStatus =
  document.getElementById("musicStatus");

const audioError =
  document.getElementById("audioError");


let storyStarted = false;
let noCount = 0;
let musicPlaying = false;
let enteringWebsite = false;


/* =================================
   AUDIO SETUP
================================= */

if (music) {

  /*
    Volume background music.
    0.45 = 45%
  */

  music.volume = 0.45;


  /*
    Paksa loop juga lewat JS.
    HTML sudah punya loop,
    ini cuma pengaman tambahan.
  */

  music.loop = true;


  /*
    Kalau musik berhasil PLAY.
  */

  music.addEventListener(
    "play",
    () => {

      musicPlaying = true;


      if (musicPlayer) {

        musicPlayer
          .classList
          .add("playing");

      }


      if (musicStatus) {

        musicStatus.textContent =
          "now playing";

      }

    }
  );


  /*
    Kalau musik PAUSE.
  */

  music.addEventListener(
    "pause",
    () => {

      musicPlaying = false;


      if (musicPlayer) {

        musicPlayer
          .classList
          .remove("playing");

      }


      if (musicStatus) {

        musicStatus.textContent =
          "paused";

      }

    }
  );


  /*
    Kalau audio gagal dimuat.
  */

  music.addEventListener(
    "error",
    () => {

      musicPlaying = false;


      if (musicPlayer) {

        musicPlayer
          .classList
          .remove("playing");

      }


      if (musicStatus) {

        musicStatus.textContent =
          "tap to play";

      }


      console.log(
        "Audio gagal dimuat. Cek file shape-of-my-heart.mp3"
      );

    }
  );

}


/* =================================
   ENTER WEBSITE

   PENTING:
   Website TETAP masuk walaupun
   musik gagal diputar.
================================= */

function enterWebsite() {

  /*
    Cegah double click.
  */

  if (enteringWebsite) {
    return;
  }


  enteringWebsite = true;


  const welcome =
    document.getElementById(
      "welcomeScreen"
    );


  const button =
    document.getElementById(
      "enterButton"
    );


  /*
    Ubah tulisan sebentar.
  */

  if (button) {

    button.innerHTML =
      "masuk... ♡";

    button.style.pointerEvents =
      "none";

  }


  /*
    =================================
    COBA PUTAR MUSIK

    TIDAK ditunggu untuk masuk web.
    =================================
  */

  if (music) {

    music.currentTime = 0;

    music.volume = 0.45;

    music.loop = true;


    const playPromise =
      music.play();


    if (
      playPromise !== undefined
    ) {

      playPromise
        .then(() => {

          musicPlaying = true;


          if (musicPlayer) {

            musicPlayer
              .classList
              .add("playing");

          }


          if (musicStatus) {

            musicStatus.textContent =
              "now playing";

          }

        })

        .catch(error => {

          /*
            MUSIK GAGAL?

            Tidak masalah.
            Web tetap masuk.
          */

          console.log(
            "Musik belum bisa diputar:",
            error
          );


          musicPlaying = false;


          if (musicStatus) {

            musicStatus.textContent =
              "tap to play";

          }

        });

    }

  }


  /*
    =================================
    MASUK WEBSITE

    Tidak tergantung musik.
    =================================
  */

  setTimeout(() => {

    if (welcome) {

      welcome
        .classList
        .add("hide");

    }


    if (musicPlayer) {

      musicPlayer
        .classList
        .add("show");

    }


    pinkFlash();

    heartBurst();


    /*
      Reset scroll ke atas.
    */

    window.scrollTo({

      top: 0,

      behavior: "smooth"

    });


  }, 450);

}


/* =================================
   MUSIC BUTTON
================================= */

function toggleMusic() {

  if (!music) {

    console.log(
      "Elemen audio tidak ditemukan."
    );

    return;

  }


  /*
    Kalau sedang pause,
    coba play.
  */

  if (music.paused) {

    music.volume = 0.45;

    music.loop = true;


    music
      .play()

      .then(() => {

        musicPlaying = true;


        if (musicPlayer) {

          musicPlayer
            .classList
            .add("playing");

        }


        if (musicStatus) {

          musicStatus.textContent =
            "now playing";

        }

      })

      .catch(error => {

        console.log(
          "Audio gagal dimainkan:",
          error
        );


        if (musicStatus) {

          musicStatus.textContent =
            "audio gak kebaca";

        }

      });

  }


  /*
    Kalau sedang main,
    pause.
  */

  else {

    music.pause();


    musicPlaying = false;


    if (musicPlayer) {

      musicPlayer
        .classList
        .remove("playing");

    }


    if (musicStatus) {

      musicStatus.textContent =
        "paused";

    }

  }

}


/* =================================
   PASTIKAN AUDIO LOOP
================================= */

if (music) {

  music.addEventListener(
    "ended",
    () => {

      /*
        Ini sebenarnya jarang terpanggil
        karena music.loop = true.

        Tapi tetap dibuat fallback.
      */

      music.currentTime = 0;


      music
        .play()
        .catch(() => {

          if (musicStatus) {

            musicStatus.textContent =
              "tap to play";

          }

        });

    }
  );

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
    (
      Math.random() *
      11 +
      7
    ) +
    "px";


  particle.style.animationDuration =
    (
      Math.random() *
      7 +
      8
    ) +
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


  if (button) {

    button.textContent =
      "bentar ya... ♡";


    button.style.opacity =
      ".45";


    button.style.pointerEvents =
      "none";

  }


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


    if (!text) {
      return;
    }


    text
      .classList
      .remove("active");


    setTimeout(() => {

      text.textContent =
        texts[index];


      text
        .classList
        .add("active");


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
            .remove("active");


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


  if (!scene) {
    return;
  }


  scene
    .classList
    .add("walking");


  setTimeout(() => {

    scene
      .classList
      .add("together");

  }, 300);


  setTimeout(() => {

    scene
      .classList
      .remove("walking");

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


  if (!section) {
    return;
  }


  section.style.display =
    "flex";


  section.scrollIntoView({

    behavior: "smooth"

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


  if (
    !noButton ||
    !yesButton ||
    !message
  ) {

    return;

  }


  /*
    Tombol GAK mengecil.
  */

  const noScale =
    Math.max(

      .3,

      1 -
      noCount *
      .13

    );


  /*
    Tombol MAAFIN membesar.
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


  if (yes) {

    yes.textContent =
      "♡";


    yes.style.pointerEvents =
      "none";

  }


  if (no) {

    no.style.opacity =
      "0";


    no.style.pointerEvents =
      "none";

  }


  if (message) {

    message.textContent =
      "makasih udah mau dengerin aku ♡";

  }


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


  if (!letter) {
    return;
  }


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
          .add("visible");

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


  if (!section) {
    return;
  }


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
            .add("visible");

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


  if (
    !final ||
    !scene
  ) {

    return;

  }


  final.style.display =
    "flex";


  final.scrollIntoView({

    behavior: "smooth"

  });


  setTimeout(() => {

    scene
      .classList
      .add("walking");

  }, 900);


  setTimeout(() => {

    scene
      .classList
      .add("together");

  }, 1200);


  setTimeout(() => {

    scene
      .classList
      .remove("walking");

  }, 3500);


  setTimeout(() => {

    const finalMessage =
      document.querySelector(
        ".final-message"
      );


    if (finalMessage) {

      finalMessage
        .classList
        .add("visible");

    }


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


  if (!flash) {
    return;
  }


  flash
    .classList
    .add("active");


  setTimeout(() => {

    flash
      .classList
      .remove("active");

  }, 450);

}


/* =================================
   HEART BURST
================================= */

function heartBurst() {

  if (!particles) {
    return;
  }


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

    }}



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
