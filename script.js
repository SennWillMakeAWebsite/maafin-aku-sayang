/* =========================================
   FOR IKE ♡
   SCRIPT.JS
========================================= */


/* =========================================
   ELEMENTS
========================================= */

const particles =
  document.getElementById("particles");

const pinkFlashElement =
  document.getElementById("pinkFlash");

const welcomeScreen =
  document.getElementById("welcomeScreen");

const enterButton =
  document.getElementById("enterButton");

const audioError =
  document.getElementById("audioError");


/* MUSIC */

const music =
  document.getElementById("backgroundMusic");

const musicPlayer =
  document.getElementById("musicPlayer");

const musicButton =
  document.getElementById("musicButton");

const musicStatus =
  document.getElementById("musicStatus");


/* STORY */

const startButton =
  document.getElementById("startButton");

const yesButton =
  document.getElementById("yesButton");

const noButton =
  document.getElementById("noButton");

const beforeEndButton =
  document.getElementById("beforeEndButton");

const finalButton =
  document.getElementById("finalButton");


/* =========================================
   VARIABLES
========================================= */

let websiteEntered = false;

let storyStarted = false;

let noCount = 0;


/* =========================================
   MUSIC SETUP
========================================= */

if (music) {

  music.volume = 0.45;

  music.loop = true;

}


/* =========================================
   MUSIC EVENTS
========================================= */

if (music) {

  music.addEventListener(
    "playing",
    function () {

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
          "loading...";

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
          "ready";

      }

    }
  );


  music.addEventListener(
    "error",
    function () {

      console.error(
        "Audio gagal dimuat."
      );


      if (musicPlayer) {

        musicPlayer.classList.remove(
          "playing"
        );

      }


      if (musicStatus) {

        musicStatus.textContent =
          "audio error";

      }


      if (audioError) {

        audioError.textContent =
          "musiknya belum kebaca :(";

      }

    }
  );

}


/* =========================================
   ENTER WEBSITE
========================================= */

function enterWebsite() {

  /*
    Cegah double click.
  */

  if (websiteEntered) {

    return;

  }


  websiteEntered = true;


  /*
    PENTING:

    Website dibuka LANGSUNG.

    Kita tidak menunggu:
    - audio load
    - audio play
    - promise
    - event canplay

    Jadi kalau MP3 bermasalah,
    website tetap masuk.
  */

  if (welcomeScreen) {

    welcomeScreen.classList.add(
      "hide"
    );

  }


  if (musicPlayer) {

    musicPlayer.classList.add(
      "show"
    );

  }


  /*
    Efek masuk.
  */

  pinkFlash();

  heartBurst();


  /*
    Coba nyalakan musik.

    Karena fungsi ini dipanggil
    langsung dari klik user,
    browser mengizinkan audio
    jauh lebih konsisten.
  */

  if (music) {

    music.volume = 0.45;

    music.loop = true;


    try {

      const playPromise =
        music.play();


      if (
        playPromise &&
        typeof playPromise.catch ===
        "function"
      ) {

        playPromise.catch(
          function (error) {

            console.error(
              "Musik gagal dimainkan:",
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

      console.error(
        "Music error:",
        error
      );


      if (musicStatus) {

        musicStatus.textContent =
          "tap to play";

      }

    }

  }


  /*
    Hapus welcome dari DOM
    setelah animasi selesai.

    Jadi overlay mustahil
    masih menutupi website.
  */

  setTimeout(
    function () {

      if (welcomeScreen) {

        welcomeScreen.style.display =
          "none";

      }

    },
    800
  );


  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

}


/* =========================================
   ENTER BUTTON
========================================= */

if (enterButton) {

  enterButton.addEventListener(
    "click",
    enterWebsite
  );

}


/* =========================================
   MUSIC TOGGLE
========================================= */

function toggleMusic() {

  if (!music) {

    return;

  }


  /*
    Kalau sedang pause:
    PLAY.
  */

  if (music.paused) {

    music.volume = 0.45;


    try {

      const playPromise =
        music.play();


      if (
        playPromise &&
        typeof playPromise.catch ===
        "function"
      ) {

        playPromise.catch(
          function (error) {

            console.error(
              "Gagal play audio:",
              error
            );


            if (musicStatus) {

              musicStatus.textContent =
                "audio error";

            }

          }
        );

      }

    }

    catch (error) {

      console.error(
        error
      );

    }

  }


  /*
    Kalau sedang play:
    PAUSE.
  */

  else {

    music.pause();

  }

}


/* =========================================
   MUSIC BUTTON
========================================= */

if (musicButton) {

  musicButton.addEventListener(
    "click",
    toggleMusic
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


  particle.textContent =
    symbols[
      Math.floor(
        Math.random() *
        symbols.length
      )
    ];


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


/*
  Background particles.
*/

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


  if (startButton) {

    startButton.textContent =
      "bentar ya... ♡";


    startButton.style.opacity =
      ".45";


    startButton.style.pointerEvents =
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

    const storyText =
      document.getElementById(
        "storyText"
      );


    if (!storyText) {

      startWalking();

      return;

    }


    storyText.classList.remove(
      "active"
    );


    setTimeout(
      function () {

        storyText.textContent =
          texts[index];


        storyText.classList.add(
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

              storyText.classList.remove(
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
   START BUTTON
========================================= */

if (startButton) {

  startButton.addEventListener(
    "click",
    startStory
  );

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


  /*
    Husen mulai jalan.
  */

  scene.classList.add(
    "walking"
  );


  /*
    Mendekat.
  */

  setTimeout(
    function () {

      scene.classList.add(
        "together"
      );

    },
    300
  );


  /*
    Berhenti jalan.
  */

  setTimeout(
    function () {

      scene.classList.remove(
        "walking"
      );

    },
    2600
  );


  /*
    Buka pertanyaan.
  */

  setTimeout(
    openFlowerQuestion,
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


  section.scrollIntoView({

    behavior:
      "smooth",

    block:
      "start"

  });

}


/* =========================================
   CLICK "GAK"
========================================= */

function rejectApology() {

  noCount++;


  const message =
    document.getElementById(
      "noMessage"
    );


  if (
    !noButton ||
    !yesButton
  ) {

    return;

  }


  /*
    Tombol gak mengecil.

    Tapi tetap bisa diklik.
    Jadi pilihan tetap ada.
  */

  const noScale =
    Math.max(
      .35,
      1 -
      noCount *
      .12
    );


  /*
    Tombol maafin membesar.
  */

  const yesScale =
    Math.min(
      1.85,
      1 +
      noCount *
      .13
    );


  noButton.style.transform =
    `scale(${noScale})`;


  yesButton.style.transform =
    `scale(${yesScale})`;


  /*
    Pesan setiap klik.
  */

  const messages = [

    "yahh... 🥲",

    "masih gak? 😭",

    "aku minta maaf beneran...",

    "bunganya ikut sedih 🌷",

    "tombol maafnya malah makin gede 😭",

    "oke oke... aku masih minta maaf.",

    "aku ngerti kok 🥲",

    "🌷♡"

  ];


  if (message) {

    const messageIndex =
      Math.min(
        noCount - 1,
        messages.length - 1
      );


    message.textContent =
      messages[
        messageIndex
      ];

  }


  /*
    Shake kecil.
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
   NO BUTTON
========================================= */

if (noButton) {

  noButton.addEventListener(
    "click",
    rejectApology
  );

}


/* =========================================
   ACCEPT APOLOGY
========================================= */

function acceptApology() {

  const message =
    document.getElementById(
      "noMessage"
    );


  /*
    Tombol YES berubah.
  */

  if (yesButton) {

    yesButton.textContent =
      "♡";


    yesButton.style.pointerEvents =
      "none";

  }


  /*
    Tombol NO hilang.
  */

  if (noButton) {

    noButton.style.opacity =
      "0";


    noButton.style.pointerEvents =
      "none";

  }


  /*
    Pesan.
  */

  if (message) {

    message.textContent =
      "makasih udah mau dengerin aku ♡";

  }


  /*
    Effects.
  */

  pinkFlash();

  heartBurst();


  /*
    Lanjut surat.
  */

  setTimeout(
    openLetter,
    1800
  );

}


/* =========================================
   YES BUTTON
========================================= */

if (yesButton) {

  yesButton.addEventListener(
    "click",
    acceptApology
  );

}


/* =========================================
   OPEN LETTER
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


  letter.scrollIntoView({

    behavior:
      "smooth",

    block:
      "start"

  });


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
   OPEN BEFORE END
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


  section.scrollIntoView({

    behavior:
      "smooth",

    block:
      "start"

  });


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
   BEFORE END BUTTON
========================================= */

if (beforeEndButton) {

  beforeEndButton.addEventListener(
    "click",
    openBeforeEnd
  );

}


/* =========================================
   OPEN FINAL
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


  final.scrollIntoView({

    behavior:
      "smooth",

    block:
      "start"

  });


  /*
    Final character animation.
  */

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


  /*
    Final message.
  */

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
   FINAL BUTTON
========================================= */

if (finalButton) {

  finalButton.addEventListener(
    "click",
    openFinal
  );

}


/* =========================================
   PINK FLASH
========================================= */

function pinkFlash() {

  if (!pinkFlashElement) {

    return;

  }


  pinkFlashElement.classList.add(
    "active"
  );


  setTimeout(
    function () {

      pinkFlashElement.classList.remove(
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
    i < 45;
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
   INITIAL CHECK
========================================= */

document.addEventListener(
  "DOMContentLoaded",
  function () {

    /*
      Pastikan welcome muncul
      setiap halaman pertama dibuka.
    */

    if (welcomeScreen) {

      welcomeScreen.classList.remove(
        "hide"
      );


      welcomeScreen.style.display =
        "flex";

    }


    /*
      Player belum tampil.
    */

    if (musicPlayer) {

      musicPlayer.classList.remove(
        "show"
      );

    }


    /*
      Status awal musik.
    */

    if (musicStatus) {

      musicStatus.textContent =
        "paused";

    }

  }
);) {

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
