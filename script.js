/* =========================================
   FOR IKE ♡
   FULL SCRIPT.JS
========================================= */


/* =========================================
   ELEMENTS
========================================= */

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

const welcomeScreen =
  document.getElementById("welcomeScreen");

const enterButton =
  document.getElementById("enterButton");


/* =========================================
   VARIABLES
========================================= */

let storyStarted = false;

let noCount = 0;

let musicPlaying = false;

let websiteEntered = false;


/* =========================================
   AUDIO INITIAL SETUP
========================================= */

if (music) {

  music.volume = 0.55;

  music.loop = true;

  /*
    Paksa browser load audio.
  */

  try {

    music.load();

  }

  catch (error) {

    console.log(
      "Audio load error:",
      error
    );

  }

}


/* =========================================
   AUDIO EVENTS
========================================= */

if (music) {

  music.addEventListener(
    "playing",
    function () {

      musicPlaying = true;


      if (musicPlayer) {

        musicPlayer.classList.add(
          "playing"
        );

      }


      if (musicStatus) {

        musicStatus.textContent =
          "now playing";

      }


      if (audioError) {

        audioError.textContent =
          "";

      }

    }
  );


  music.addEventListener(
    "pause",
    function () {

      musicPlaying = false;


      if (musicPlayer) {

        musicPlayer.classList.remove(
          "playing"
        );

      }


      if (musicStatus) {

        musicStatus.textContent =
          "paused";

      }

    }
  );


  music.addEventListener(
    "waiting",
    function () {

      if (musicStatus) {

        musicStatus.textContent =
          "loading music...";

      }

    }
  );


  music.addEventListener(
    "canplay",
    function () {

      if (
        music.paused &&
        musicStatus
      ) {

        musicStatus.textContent =
          "tap to play";

      }

    }
  );


  music.addEventListener(
    "error",
    function () {

      musicPlaying = false;


      if (musicStatus) {

        musicStatus.textContent =
          "music unavailable";

      }


      if (audioError) {

        audioError.textContent =
          "file musiknya gak kebaca";

      }


      console.log(
        "Audio gagal dibaca."
      );

    }
  );

}


/* =========================================
   ENTER WEBSITE
========================================= */

function enterWebsite() {

  /*
    Jangan jalankan dua kali.
  */

  if (websiteEntered) {

    return;

  }


  websiteEntered = true;


  /*
    ================================
    1. PLAY MUSIK LANGSUNG

    Ini dilakukan PALING AWAL
    karena fungsi ini berasal dari
    klik user.

    Jangan pakai await.
    Jangan tunggu loading.
    ================================
  */

  if (music) {

    music.volume = 0.55;

    music.loop = true;


    try {

      const playResult =
        music.play();


      if (
        playResult &&
        typeof playResult.catch ===
        "function"
      ) {

        playResult.catch(
          function (error) {

            console.log(
              "Play ditolak:",
              error
            );


            if (musicStatus) {

              musicStatus.textContent =
                "tap to play";

            }

          }
        );

      }

    }

    catch (error) {

      console.log(
        "Music play error:",
        error
      );

    }

  }


  /*
    ================================
    2. TUTUP WELCOME LANGSUNG

    Tidak peduli musik sukses/gagal.
    ================================
  */

  if (welcomeScreen) {

    welcomeScreen.style.opacity =
      "0";


    welcomeScreen.style.visibility =
      "hidden";


    welcomeScreen.style.pointerEvents =
      "none";

  }


  /*
    ================================
    3. TAMPILKAN MUSIC PLAYER
    ================================
  */

  if (musicPlayer) {

    musicPlayer.classList.add(
      "show"
    );


    musicPlayer.style.opacity =
      "1";


    musicPlayer.style.pointerEvents =
      "auto";

  }


  /*
    ================================
    4. KEMBALIKAN KE ATAS
    ================================
  */

  window.scrollTo(
    0,
    0
  );


  /*
    ================================
    5. EFFECT MASUK
    ================================
  */

  setTimeout(
    function () {

      pinkFlash();

      heartBurst();

    },
    150
  );

}


/* =========================================
   EXTRA EVENT UNTUK ENTER BUTTON

   Jadi walaupun onclick HTML
   bermasalah, JS tetap memasang
   click listener sendiri.
========================================= */

if (enterButton) {

  enterButton.addEventListener(
    "click",
    function () {

      enterWebsite();

    }
  );

}


/* =========================================
   MUSIC TOGGLE
========================================= */

function toggleMusic() {

  if (!music) {

    if (musicStatus) {

      musicStatus.textContent =
        "audio not found";

    }

    return;

  }


  /*
    Kalau musik pause,
    PLAY.
  */

  if (music.paused) {

    music.volume = 0.55;

    music.loop = true;


    try {

      const playResult =
        music.play();


      if (
        playResult &&
        typeof playResult.then ===
        "function"
      ) {

        playResult

          .then(
            function () {

              musicPlaying = true;


              if (musicPlayer) {

                musicPlayer
                  .classList
                  .add(
                    "playing"
                  );

              }


              if (musicStatus) {

                musicStatus.textContent =
                  "now playing";

              }

            }
          )

          .catch(
            function (error) {

              console.log(
                "Audio gagal play:",
                error
              );


              if (musicStatus) {

                musicStatus.textContent =
                  "audio gak kebaca";

              }

            }
          );

      }

    }

    catch (error) {

      console.log(
        error
      );


      if (musicStatus) {

        musicStatus.textContent =
          "audio error";

      }

    }

  }


  /*
    Kalau musik sedang main,
    PAUSE.
  */

  else {

    music.pause();


    musicPlaying = false;


    if (musicPlayer) {

      musicPlayer
        .classList
        .remove(
          "playing"
        );

    }


    if (musicStatus) {

      musicStatus.textContent =
        "paused";

    }

  }

}


/* =========================================
   AUDIO LOOP FALLBACK
========================================= */

if (music) {

  music.addEventListener(
    "ended",
    function () {

      music.currentTime =
        0;


      try {

        music.play();

      }

      catch (error) {

        console.log(
          error
        );

      }

    }
  );

}


/* =========================================
   PARTICLES
========================================= */

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


  const randomSymbol =
    Math.floor(
      Math.random() *
      symbols.length
    );


  particle.textContent =
    symbols[randomSymbol];


  particle.style.left =
    (
      Math.random() *
      100
    ) +
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


  setTimeout(
    function () {

      particle.remove();

    },
    16000
  );

}


setInterval(
  createParticle,
  650
);


/* =========================================
   START STORY
========================================= */

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


  let index =
    0;


  function nextText() {

    const text =
      document.getElementById(
        "storyText"
      );


    if (!text) {

      startWalking();

      return;

    }


    text.classList.remove(
      "active"
    );


    setTimeout(
      function () {

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

          setTimeout(
            function () {

              text.classList.remove(
                "active"
              );


              startWalking();

            },
            1900
          );

        }

      },
      400
    );

  }


  nextText();

}


/* =========================================
   WALKING
========================================= */

function startWalking() {

  const scene =
    document.getElementById(
      "openingScene"
    );


  if (!scene) {

    openFlowerQuestion();

    return;

  }


  scene.classList.add(
    "walking"
  );


  setTimeout(
    function () {

      scene.classList.add(
        "together"
      );

    },
    300
  );


  setTimeout(
    function () {

      scene.classList.remove(
        "walking"
      );

    },
    2600
  );


  setTimeout(
    function () {

      openFlowerQuestion();

    },
    4200
  );

}


/* =========================================
   FLOWER QUESTION
========================================= */

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


  section.scrollIntoView(
    {

      behavior:
        "smooth",

      block:
        "start"

    }
  );

}


/* =========================================
   CLICK "GAK"
========================================= */

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


  const noScale =
    Math.max(
      .3,
      1 -
      noCount *
      .13
    );


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


  /*
    Shake effect.
  */

  if (
    typeof noButton.animate ===
    "function"
  ) {

    noButton.animate(

      [

        {
          transform:
            `scale(${noScale}) translateX(0)`
        },

        {
          transform:
            `scale(${noScale}) translateX(-4px)`
        },

        {
          transform:
            `scale(${noScale}) translateX(4px)`
        },

        {
          transform:
            `scale(${noScale}) translateX(0)`
        }

      ],

      {

        duration:
          180

      }

    );

  }

}


/* =========================================
   CLICK "MAAFIN"
========================================= */

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


  setTimeout(
    function () {

      openLetter();

    },
    1800
  );

}


/* =========================================
   LETTER
========================================= */

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


  letter.scrollIntoView(
    {

      behavior:
        "smooth",

      block:
        "start"

    }
  );


  setTimeout(
    revealLetter,
    700
  );

}


/* =========================================
   REVEAL LETTER
========================================= */

function revealLetter() {

  const paragraphs =
    document.querySelectorAll(
      ".letter-card p"
    );


  paragraphs.forEach(
    function (
      paragraph,
      index
    ) {

      setTimeout(
        function () {

          paragraph.classList.add(
            "visible"
          );

        },
        index *
        280
      );

    }
  );

}


/* =========================================
   BEFORE END
========================================= */

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


  section.scrollIntoView(
    {

      behavior:
        "smooth",

      block:
        "start"

    }
  );


  setTimeout(
    function () {

      const messages =
        document.querySelectorAll(
          ".message-line"
        );


      messages.forEach(
        function (
          message,
          index
        ) {

          setTimeout(
            function () {

              message.classList.add(
                "visible"
              );

            },
            index *
            600
          );

        }
      );

    },
    700
  );

}


/* =========================================
   FINAL
========================================= */

function openFinal() {

  const final =
    document.getElementById(
      "final"
    );


  const scene =
    document.getElementById(
      "finalScene"
    );


  if (!final) {

    return;

  }


  final.style.display =
    "flex";


  final.scrollIntoView(
    {

      behavior:
        "smooth",

      block:
        "start"

    }
  );


  if (scene) {

    setTimeout(
      function () {

        scene.classList.add(
          "walking"
        );

      },
      900
    );


    setTimeout(
      function () {

        scene.classList.add(
          "together"
        );

      },
      1200
    );


    setTimeout(
      function () {

        scene.classList.remove(
          "walking"
        );

      },
      3500
    );

  }


  setTimeout(
    function () {

      const finalMessage =
        document.querySelector(
          ".final-message"
        );


      if (finalMessage) {

        finalMessage.classList.add(
          "visible"
        );

      }


      heartBurst();

    },
    4100
  );

}


/* =========================================
   PINK FLASH
========================================= */

function pinkFlash() {

  const flash =
    document.getElementById(
      "pinkFlash"
    );


  if (!flash) {

    return;

  }


  flash.classList.add(
    "active"
  );


  setTimeout(
    function () {

      flash.classList.remove(
        "active"
      );

    },
    450
  );

}


/* =========================================
   HEART BURST
========================================= */

function heartBurst() {

  if (!particles) {

    return;

  }


  for (
    let i = 0;
    i < 50;
    i++
  ) {

    setTimeout(
      function () {

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


        setTimeout(
          function () {

            heart.remove();

          },
          7000
        );

      },
      i *
      35
    );

  }

}


/* =========================================
   SAFETY CHECK

   Kalau welcome sudah hilang karena
   browser/back-forward cache,
   tampilkan player.
========================================= */

window.addEventListener(
  "pageshow",
  function () {

    if (
      welcomeScreen &&
      welcomeScreen.classList.contains(
        "hide"
      )
    ) {

      if (musicPlayer) {

        musicPlayer.classList.add(
          "show"
        );

      }

    }

  }
);n.animate(

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
