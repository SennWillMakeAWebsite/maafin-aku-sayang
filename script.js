document.addEventListener("DOMContentLoaded", () => {

  /* ==================================================
     ELEMENTS
  ================================================== */

  const welcomeScreen =
    document.getElementById("welcomeScreen");

  const enterButton =
    document.getElementById("enterButton");

  const opening =
    document.getElementById("opening");

  const startButton =
    document.getElementById("startButton");

  const openingScene =
    document.getElementById("openingScene");

  const storyText =
    document.getElementById("storyText");


  const flowerSection =
    document.getElementById("flowerSection");

  const yesButton =
    document.getElementById("yesButton");

  const noButton =
    document.getElementById("noButton");

  const noMessage =
    document.getElementById("noMessage");


  const hugSection =
    document.getElementById("hugSection");

  const hugScene =
    document.getElementById("hugScene");

  const openLetterButton =
    document.getElementById("openLetterButton");


  const letter =
    document.getElementById("letter");

  const beforeEndButton =
    document.getElementById("beforeEndButton");


  const beforeEnd =
    document.getElementById("beforeEnd");

  const finalButton =
    document.getElementById("finalButton");


  const final =
    document.getElementById("final");

  const finalScene =
    document.getElementById("finalScene");


  const particles =
    document.getElementById("particles");

  const pinkFlash =
    document.getElementById("pinkFlash");


  /* ==================================================
     STATE
  ================================================== */

  let storyStarted = false;

  let apologyAccepted = false;

  let noCount = 0;

  let noButtonRemoved = false;


  /* ==================================================
     HELPERS
  ================================================== */

  function wait(ms) {

    return new Promise(
      resolve =>
        setTimeout(resolve, ms)
    );

  }


  function scrollToElement(element) {

    if (!element) {
      return;
    }

    element.scrollIntoView({
      behavior: "smooth",
      block: "center"
    });

  }


  function showStoryText(text) {

    if (!storyText) {
      return;
    }

    storyText.classList.remove(
      "active"
    );

    setTimeout(() => {

      storyText.textContent =
        text;

      storyText.classList.add(
        "active"
      );

    }, 220);

  }


  function hideStoryText() {

    if (!storyText) {
      return;
    }

    storyText.classList.remove(
      "active"
    );

  }


  function flashPink() {

    if (!pinkFlash) {
      return;
    }

    pinkFlash.classList.remove(
      "flash"
    );

    void pinkFlash.offsetWidth;

    pinkFlash.classList.add(
      "flash"
    );

  }


  /* ==================================================
     WELCOME
  ================================================== */

  document.body.classList.add(
    "locked"
  );


  enterButton?.addEventListener(
    "click",
    async () => {

      welcomeScreen?.classList.add(
        "hide"
      );

      document.body.classList.remove(
        "locked"
      );

      createHeartBurst(
        window.innerWidth / 2,
        window.innerHeight / 2,
        10
      );

      await wait(500);

      scrollToElement(
        opening
      );

    }
  );


  /* ==================================================
     BACKGROUND PARTICLES
  ================================================== */

  function createParticle() {

    if (!particles) {
      return;
    }


    const particle =
      document.createElement("span");


    const symbols = [
      "♡",
      "♥",
      "♡",
      "♡"
    ];


    particle.className =
      "particle";


    particle.textContent =
      symbols[
        Math.floor(
          Math.random() *
          symbols.length
        )
      ];


    particle.style.left =
      `${Math.random() * 100}%`;


    particle.style.fontSize =
      `${
        9 +
        Math.random() * 12
      }px`;


    particle.style.animationDuration =
      `${
        7 +
        Math.random() * 5
      }s`;


    particle.style.opacity =
      `${
        0.25 +
        Math.random() * 0.45
      }`;


    particles.appendChild(
      particle
    );


    setTimeout(() => {

      particle.remove();

    }, 12500);

  }


  setInterval(
    createParticle,
    850
  );


  for (
    let i = 0;
    i < 7;
    i++
  ) {

    setTimeout(
      createParticle,
      i * 250
    );

  }


  /* ==================================================
     HEART BURST
  ================================================== */

  function createHeartBurst(
    x,
    y,
    amount = 14
  ) {

    const symbols = [
      "♡",
      "♥",
      "♡"
    ];


    for (
      let i = 0;
      i < amount;
      i++
    ) {

      const heart =
        document.createElement("span");


      heart.className =
        "burst-heart";


      heart.textContent =
        symbols[
          Math.floor(
            Math.random() *
            symbols.length
          )
        ];


      document.body.appendChild(
        heart
      );


      const angle =
        (
          Math.PI * 2 /
          amount
        ) * i;


      const distance =
        65 +
        Math.random() * 95;


      const moveX =
        Math.cos(angle) *
        distance;


      const moveY =
        Math.sin(angle) *
        distance;


      heart.style.left =
        `${x}px`;

      heart.style.top =
        `${y}px`;


      heart.animate(

        [
          {
            transform:
              "translate(-50%, -50%) scale(0.3)",

            opacity: 0
          },

          {
            opacity: 1,

            offset: 0.18
          },

          {
            transform:
              `translate(
                calc(-50% + ${moveX}px),
                calc(-50% + ${moveY}px)
              )
              scale(${
                0.8 +
                Math.random() * 0.7
              })
              rotate(${
                -30 +
                Math.random() * 60
              }deg)`,

            opacity: 0
          }
        ],

        {
          duration:
            900 +
            Math.random() * 550,

          easing:
            "cubic-bezier(.17,.67,.35,1)",

          fill:
            "forwards"
        }

      );


      setTimeout(() => {

        heart.remove();

      }, 1600);

    }

  }


  /* ==================================================
     START STORY
  ================================================== */

  startButton?.addEventListener(
    "click",
    async () => {

      if (storyStarted) {
        return;
      }


      storyStarted = true;


      startButton.disabled =
        true;


      startButton.style.opacity =
        "0.55";


      startButton.style.pointerEvents =
        "none";


      scrollToElement(
        openingScene
      );


      await wait(500);


      showStoryText(
        "jadi... aku datang bawa sesuatu kecil buat kamu."
      );


      await wait(1500);


      openingScene?.classList.add(
        "walking"
      );


      showStoryText(
        "bentar, aku kesana dulu..."
      );


      await wait(450);


      openingScene?.classList.add(
        "together"
      );


      await wait(1200);


      openingScene?.classList.remove(
        "walking"
      );


      showStoryText(
        "ini buat kamu 🌷"
      );


      openingScene?.classList.add(
        "giving-flower"
      );


      await wait(1200);


      const sceneRect =
        openingScene?.getBoundingClientRect();


      if (sceneRect) {

        createHeartBurst(
          sceneRect.left +
          sceneRect.width / 2,

          sceneRect.top +
          sceneRect.height / 2,

          8
        );

      }


      await wait(1400);


      showStoryText(
        "terus... ada satu hal lagi."
      );


      await wait(1400);


      hideStoryText();


      flowerSection?.classList.add(
        "show"
      );


      await wait(250);


      scrollToElement(
        flowerSection
      );

    }
  );


  /* ==================================================
     NO BUTTON
  ================================================== */

  const noMessages = [

    "yahh 🥲",

    "masih gak?",

    "aku minta maaf beneran...",

    "bunganya masih aku pegang 🌷",

    "maafinnya makin gede tuh 😭",

    "oke... tombol gak-nya mulai menyerah.",

    "udah kalah dia."

  ];


  noButton?.addEventListener(
    "click",
    () => {

      if (
        apologyAccepted ||
        noButtonRemoved
      ) {
        return;
      }


      noCount++;


      const yesScale =
        Math.min(
          2.55,
          1 + noCount * 0.28
        );


      const noScale =
        Math.max(
          0.45,
          1 - noCount * 0.11
        );


      yesButton.style.transform =
        `scale(${yesScale})`;


      noButton.style.transform =
        `scale(${noScale})`;


      const messageIndex =
        Math.min(
          noCount - 1,
          noMessages.length - 1
        );


      noMessage.textContent =
        noMessages[
          messageIndex
        ];


      if (noCount === 2) {

        noButton.style.opacity =
          "0.82";

      }


      if (noCount === 3) {

        noButton.style.opacity =
          "0.65";

      }


      if (noCount === 4) {

        noButton.style.opacity =
          "0.45";

      }


      /*
        Setelah YES sudah sangat besar,
        tombol NO menyerah.
      */

      if (noCount >= 5) {

        noButtonRemoved =
          true;


        noMessage.textContent =
          "oke... pilihan satunya menyerah 😭";


        noButton.classList.add(
          "disappear"
        );


        yesButton.style.transform =
          "scale(2.55)";


        setTimeout(() => {

          noButton.style.display =
            "none";

        }, 450);

      }

    }
  );


  /* ==================================================
     YES / ACCEPT APOLOGY
  ================================================== */

  yesButton?.addEventListener(
    "click",
    async () => {

      if (apologyAccepted) {
        return;
      }


      apologyAccepted =
        true;


      yesButton.disabled =
        true;


      if (
        noButton &&
        !noButtonRemoved
      ) {

        noButton.classList.add(
          "disappear"
        );

      }


      yesButton.style.transform =
        "scale(1.08)";


      yesButton.textContent =
        "makasih ♡";


      noMessage.textContent =
        "makasih udah mau dengerin aku :)";


      flashPink();


      const buttonRect =
        yesButton.getBoundingClientRect();


      createHeartBurst(
        buttonRect.left +
        buttonRect.width / 2,

        buttonRect.top +
        buttonRect.height / 2,

        18
      );


      await wait(900);


      hugSection?.classList.add(
        "show"
      );


      await wait(200);


      scrollToElement(
        hugSection
      );


      await wait(800);


      hugScene?.classList.add(
        "hugging"
      );


      await wait(800);


      const hugRect =
        hugScene?.getBoundingClientRect();


      if (hugRect) {

        createHeartBurst(
          hugRect.left +
          hugRect.width / 2,

          hugRect.top +
          hugRect.height * 0.48,

          12
        );

      }

    }
  );


  /* ==================================================
     OPEN LETTER
  ================================================== */

  openLetterButton?.addEventListener(
    "click",
    async () => {

      openLetterButton.disabled =
        true;


      flashPink();


      letter?.classList.add(
        "show"
      );


      await wait(250);


      scrollToElement(
        letter
      );


      await wait(500);


      const paragraphs =
        document.querySelectorAll(
          ".letter-card p"
        );


      paragraphs.forEach(
        (paragraph, index) => {

          setTimeout(() => {

            paragraph.classList.add(
              "reveal"
            );

          }, index * 260);

        }
      );

    }
  );


  /* ==================================================
     BEFORE END
  ================================================== */

  beforeEndButton?.addEventListener(
    "click",
    async () => {

      beforeEndButton.disabled =
        true;


      beforeEnd?.classList.add(
        "show"
      );


      await wait(250);


      scrollToElement(
        beforeEnd
      );


      await wait(450);


      const lines =
        document.querySelectorAll(
          ".message-line"
        );


      lines.forEach(
        (line, index) => {

          setTimeout(() => {

            line.classList.add(
              "reveal"
            );

          }, index * 500);

        }
      );

    }
  );


  /* ==================================================
     FINAL
  ================================================== */

  finalButton?.addEventListener(
    "click",
    async () => {

      finalButton.disabled =
        true;


      flashPink();


      final?.classList.add(
        "show"
      );


      await wait(250);


      scrollToElement(
        final
      );


      await wait(700);


      finalScene?.classList.add(
        "final-together"
      );


      await wait(1000);


      const finalRect =
        finalScene?.getBoundingClientRect();


      if (finalRect) {

        createHeartBurst(
          finalRect.left +
          finalRect.width / 2,

          finalRect.top +
          finalRect.height * 0.45,

          14
        );

      }


      await wait(500);


      document
        .querySelector(
          ".final-message"
        )
        ?.classList.add(
          "reveal"
        );


      await wait(900);


      document
        .querySelector(
          ".signature"
        )
        ?.classList.add(
          "reveal"
        );

    }
  );


});t"

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
