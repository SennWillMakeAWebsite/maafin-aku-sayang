document.addEventListener("DOMContentLoaded", function () {

  /* =====================================================
     ELEMENT
  ===================================================== */

  const welcomeScreen = document.getElementById("welcomeScreen");
  const enterButton = document.getElementById("enterButton");

  const startButton = document.getElementById("startButton");
  const openingScene = document.getElementById("openingScene");
  const storyText = document.getElementById("storyText");

  const flowerSection = document.getElementById("flowerSection");
  const yesButton = document.getElementById("yesButton");
  const noButton = document.getElementById("noButton");
  const noMessage = document.getElementById("noMessage");

  const hugSection = document.getElementById("hugSection");
  const hugScene = document.getElementById("hugScene");
  const openLetterButton = document.getElementById("openLetterButton");

  const letter = document.getElementById("letter");
  const beforeEndButton = document.getElementById("beforeEndButton");

  const beforeEnd = document.getElementById("beforeEnd");
  const finalButton = document.getElementById("finalButton");

  const final = document.getElementById("final");
  const finalScene = document.getElementById("finalScene");

  const particles = document.getElementById("particles");
  const pinkFlash = document.getElementById("pinkFlash");


  /* =====================================================
     STATE
  ===================================================== */

  let storyRunning = false;
  let apologyAccepted = false;
  let noCount = 0;


  /* =====================================================
     HELPER
  ===================================================== */

  function wait(ms) {
    return new Promise(function (resolve) {
      setTimeout(resolve, ms);
    });
  }


  function scrollToSection(element) {

    if (!element) return;

    element.scrollIntoView({
      behavior: "smooth",
      block: "center"
    });

  }


  function showSection(element) {

    if (!element) return;

    element.classList.add("show");

  }


  function setStory(text) {

    if (!storyText) return;

    storyText.classList.remove("active");

    setTimeout(function () {

      storyText.textContent = text;
      storyText.classList.add("active");

    }, 150);

  }


  function flash() {

    if (!pinkFlash) return;

    pinkFlash.classList.remove("flash");

    void pinkFlash.offsetWidth;

    pinkFlash.classList.add("flash");

  }


  /* =====================================================
     WELCOME
  ===================================================== */

  document.body.classList.add("locked");


  if (enterButton) {

    enterButton.onclick = function () {

      document.body.classList.remove("locked");

      if (welcomeScreen) {

        welcomeScreen.classList.add("hide");

        setTimeout(function () {
          welcomeScreen.style.display = "none";
        }, 700);

      }

      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });

    };

  }


  /* =====================================================
     PARTICLES
  ===================================================== */

  function makeParticle() {

    if (!particles) return;

    if (particles.children.length > 20) {
      return;
    }


    const particle = document.createElement("span");

    particle.className = "particle";

    particle.textContent =
      Math.random() > 0.75 ? "♥" : "♡";

    particle.style.left =
      Math.random() * 100 + "%";

    particle.style.fontSize =
      9 + Math.random() * 10 + "px";

    particle.style.animationDuration =
      7 + Math.random() * 4 + "s";


    particles.appendChild(particle);


    setTimeout(function () {
      particle.remove();
    }, 12000);

  }


  setInterval(makeParticle, 1000);


  /* =====================================================
     HEART BURST
  ===================================================== */

  function heartBurst(element, amount = 12) {

    if (!element) return;


    const rect =
      element.getBoundingClientRect();


    const centerX =
      rect.left + rect.width / 2;

    const centerY =
      rect.top + rect.height / 2;


    for (let i = 0; i < amount; i++) {

      const heart =
        document.createElement("span");


      heart.className =
        "burst-heart";


      heart.textContent =
        i % 3 === 0 ? "♥" : "♡";


      heart.style.left =
        centerX + "px";

      heart.style.top =
        centerY + "px";


      document.body.appendChild(heart);


      const angle =
        Math.PI * 2 * i / amount;


      const distance =
        60 + Math.random() * 80;


      const x =
        Math.cos(angle) * distance;

      const y =
        Math.sin(angle) * distance;


      if (heart.animate) {

        heart.animate(
          [
            {
              transform:
                "translate(-50%, -50%) scale(.3)",
              opacity: 0
            },

            {
              transform:
                "translate(-50%, -50%) scale(1)",
              opacity: 1,
              offset: 0.2
            },

            {
              transform:
                `translate(
                  calc(-50% + ${x}px),
                  calc(-50% + ${y}px)
                )
                scale(1.2)`,
              opacity: 0
            }
          ],
          {
            duration: 1100,
            easing: "ease-out",
            fill: "forwards"
          }
        );

      }


      setTimeout(function () {
        heart.remove();
      }, 1300);

    }

  }


  /* =====================================================
     START STORY
  ===================================================== */

  if (startButton) {

    startButton.onclick = async function () {

      if (storyRunning) return;

      storyRunning = true;


      startButton.disabled = true;

      startButton.style.opacity = ".55";


      /*
        1. MULAI CERITA
      */

      setStory(
        "jadi... aku datang bawa sesuatu kecil buat kamu."
      );


      scrollToSection(openingScene);


      await wait(1200);


      /*
        2. HUSEN JALAN
      */

      if (openingScene) {

        openingScene.classList.add(
          "walking"
        );

      }


      setStory(
        "bentar, aku kesana dulu..."
      );


      await wait(400);


      /*
        3. MENDEKAT KE IKE
      */

      if (openingScene) {

        openingScene.classList.add(
          "together"
        );

      }


      await wait(1300);


      /*
        4. BERHENTI JALAN
      */

      if (openingScene) {

        openingScene.classList.remove(
          "walking"
        );

      }


      /*
        5. KASIH BUNGA
      */

      setStory(
        "ini buat kamu 🌷"
      );


      if (openingScene) {

        openingScene.classList.add(
          "giving-flower"
        );

      }


      await wait(1000);


      heartBurst(
        openingScene,
        8
      );


      await wait(1100);


      /*
        6. LANJUT KE PERTANYAAN
      */

      setStory(
        "terus... aku mau nanya sesuatu."
      );


      await wait(1200);


      /*
        7. TAMPILKAN SECTION MAAF
      */

      showSection(
        flowerSection
      );


      await wait(200);


      scrollToSection(
        flowerSection
      );


      storyText?.classList.remove(
        "active"
      );

    };

  }


  /* =====================================================
     TOMBOL GAK
  ===================================================== */

  const rejectMessages = [
    "yahh 🥲",
    "masih gak?",
    "aku minta maaf beneran...",
    "bunganya masih aku pegang 🌷",
    "maafinnya udah gede banget 😭"
  ];


  if (noButton && yesButton) {

    noButton.onclick = function () {

      if (apologyAccepted) return;


      noCount++;


      /*
        MA-AFIN MEMBESAR
      */

      const yesScale =
        Math.min(
          2.6,
          1 + noCount * 0.32
        );


      yesButton.style.transform =
        `scale(${yesScale})`;


      /*
        GAK MENGECIL
      */

      const noScale =
        Math.max(
          0.45,
          1 - noCount * 0.12
        );


      noButton.style.transform =
        `scale(${noScale})`;


      /*
        PESAN
      */

      if (noMessage) {

        const index =
          Math.min(
            noCount - 1,
            rejectMessages.length - 1
          );


        noMessage.textContent =
          rejectMessages[index];

      }


      /*
        OPACITY TOMBOL GAK
      */

      noButton.style.opacity =
        Math.max(
          0.35,
          1 - noCount * 0.13
        );


      /*
        SUDAH MENTOK
      */

      if (noCount >= 5) {

        yesButton.style.transform =
          "scale(2.6)";


        noButton.classList.add(
          "disappear"
        );


        noButton.disabled = true;


        if (noMessage) {

          noMessage.textContent =
            "oke... tombol gak-nya nyerah 😭";

        }


        setTimeout(function () {

          noButton.style.display =
            "none";

        }, 450);

      }

    };

  }


  /* =====================================================
     MAAFIN
  ===================================================== */

  if (yesButton) {

    yesButton.onclick = async function () {

      if (apologyAccepted) return;


      apologyAccepted = true;


      yesButton.disabled = true;


      /*
        Hilangkan tombol gak.
      */

      if (noButton) {

        noButton.classList.add(
          "disappear"
        );


        noButton.disabled = true;


        setTimeout(function () {

          noButton.style.display =
            "none";

        }, 400);

      }


      /*
        YES kembali normal.
      */

      yesButton.style.transform =
        "scale(1.08)";


      yesButton.textContent =
        "makasih ♡";


      if (noMessage) {

        noMessage.textContent =
          "makasih udah mau dengerin aku :)";

      }


      flash();

      heartBurst(
        yesButton,
        18
      );


      await wait(800);


      /*
        TAMPILKAN PELUKAN
      */

      showSection(
        hugSection
      );


      await wait(200);


      scrollToSection(
        hugSection
      );


      await wait(600);


      /*
        MULAI ANIMASI PELUK
      */

      if (hugScene) {

        hugScene.classList.add(
          "hugging"
        );

      }


      await wait(900);


      heartBurst(
        hugScene,
        14
      );

    };

  }


  /* =====================================================
     BUKA SURAT
  ===================================================== */

  if (openLetterButton) {

    openLetterButton.onclick =
      async function () {


        openLetterButton.disabled =
          true;


        flash();


        showSection(
          letter
        );


        await wait(200);


        scrollToSection(
          letter
        );


        await wait(400);


        const paragraphs =
          document.querySelectorAll(
            ".letter-card p"
          );


        paragraphs.forEach(
          function (paragraph, index) {

            setTimeout(function () {

              paragraph.classList.add(
                "reveal"
              );

            }, index * 220);

          }
        );

      };

  }


  /* =====================================================
     SEBELUM SELESAI
  ===================================================== */

  if (beforeEndButton) {

    beforeEndButton.onclick =
      async function () {


        beforeEndButton.disabled =
          true;


        showSection(
          beforeEnd
        );


        await wait(200);


        scrollToSection(
          beforeEnd
        );


        await wait(400);


        const messages =
          document.querySelectorAll(
            ".message-line"
          );


        messages.forEach(
          function (message, index) {

            setTimeout(function () {

              message.classList.add(
                "reveal"
              );

            }, index * 400);

          }
        );

      };

  }


  /* =====================================================
     FINAL
  ===================================================== */

  if (finalButton) {

    finalButton.onclick =
      async function () {


        finalButton.disabled =
          true;


        flash();


        showSection(
          final
        );


        await wait(200);


        scrollToSection(
          final
        );


        await wait(600);


        /*
          KARAKTER MENDEKAT
        */

        if (finalScene) {

          finalScene.classList.add(
            "final-together"
          );

        }


        await wait(900);


        heartBurst(
          finalScene,
          15
        );


        await wait(400);


        /*
          PESAN FINAL
        */

        const finalMessage =
          document.querySelector(
            ".final-message"
          );


        if (finalMessage) {

          finalMessage.classList.add(
            "reveal"
          );

        }


        await wait(700);


        /*
          SIGNATURE
        */

        const signature =
          document.querySelector(
            ".signature"
          );


        if (signature) {

          signature.classList.add(
            "reveal"
          );

        }

      };

  }


});ccepted ||
          noButtonRemoved
        ) {
          return;
        }


        noCount++;


        /*
          YES membesar bertahap.
        */

        const yesScale =
          Math.min(
            2.55,
            1 +
            noCount * 0.3
          );


        /*
          NO mengecil.
        */

        const noScale =
          Math.max(
            0.48,
            1 -
            noCount * 0.11
          );


        yesButton.style.transform =
          "scale(" +
          yesScale +
          ")";


        noButton.style.transform =
          "scale(" +
          noScale +
          ")";


        if (noMessage) {

          const index =
            Math.min(
              noCount - 1,
              noMessages.length - 1
            );


          noMessage.textContent =
            noMessages[index];

        }


        /*
          NO makin pudar.
        */

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
          Setelah 5x ditolak:
          YES sudah mentok besar,
          NO menghilang.
        */

        if (noCount >= 5) {

          noButtonRemoved =
            true;


          yesButton.style.transform =
            "scale(2.55)";


          noButton.classList.add(
            "disappear"
          );


          if (noMessage) {

            noMessage.textContent =
              "oke... tombol gak-nya menyerah 😭";

          }


          setTimeout(function () {

            noButton.style.display =
              "none";

          }, 450);

        }

      }
    );

  }


  /* ==================================================
     YES BUTTON
  ================================================== */

  if (yesButton) {

    yesButton.addEventListener(
      "click",
      async function () {

        if (apologyAccepted) {
          return;
        }


        apologyAccepted =
          true;


        yesButton.disabled =
          true;


        /*
          NO langsung hilang kalau
          belum menghilang sebelumnya.
        */

        if (
          noButton &&
          !noButtonRemoved
        ) {

          noButtonRemoved =
            true;


          noButton.classList.add(
            "disappear"
          );


          setTimeout(function () {

            noButton.style.display =
              "none";

          }, 400);

        }


        /*
          Balikin YES agar transisi
          berikutnya tidak kelewat besar.
        */

        yesButton.style.transform =
          "scale(1.08)";


        yesButton.textContent =
          "makasih ♡";


        if (noMessage) {

          noMessage.textContent =
            "makasih udah mau dengerin aku :)";

        }


        flashPink();


        const rect =
          yesButton
            .getBoundingClientRect();


        createHeartBurst(
          rect.left +
          rect.width / 2,

          rect.top +
          rect.height / 2,

          18
        );


        await wait(900);


        if (hugSection) {

          hugSection.classList.add(
            "show"
          );

        }


        await wait(250);


        smoothScroll(
          hugSection
        );


        await wait(700);


        if (hugScene) {

          hugScene.classList.add(
            "hugging"
          );

        }


        await wait(900);


        if (hugScene) {

          const hugRect =
            hugScene
              .getBoundingClientRect();


          createHeartBurst(
            hugRect.left +
            hugRect.width / 2,

            hugRect.top +
            hugRect.height * 0.45,

            12
          );

        }

      }
    );

  }


  /* ==================================================
     OPEN LETTER
  ================================================== */

  if (openLetterButton) {

    openLetterButton.addEventListener(
      "click",
      async function () {

        openLetterButton.disabled =
          true;


        flashPink();


        if (letter) {

          letter.classList.add(
            "show"
          );

        }


        await wait(250);


        smoothScroll(
          letter
        );


        await wait(500);


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
                  "reveal"
                );

              },
              index * 250
            );

          }
        );

      }
    );

  }


  /* ==================================================
     BEFORE END
  ================================================== */

  if (beforeEndButton) {

    beforeEndButton.addEventListener(
      "click",
      async function () {

        beforeEndButton.disabled =
          true;


        if (beforeEnd) {

          beforeEnd.classList.add(
            "show"
          );

        }


        await wait(250);


        smoothScroll(
          beforeEnd
        );


        await wait(450);


        const lines =
          document.querySelectorAll(
            ".message-line"
          );


        lines.forEach(
          function (
            line,
            index
          ) {

            setTimeout(
              function () {

                line.classList.add(
                  "reveal"
                );

              },
              index * 450
            );

          }
        );

      }
    );

  }


  /* ==================================================
     FINAL
  ================================================== */

  if (finalButton) {

    finalButton.addEventListener(
      "click",
      async function () {

        finalButton.disabled =
          true;


        flashPink();


        if (final) {

          final.classList.add(
            "show"
          );

        }


        await wait(250);


        smoothScroll(
          final
        );


        await wait(700);


        if (finalScene) {

          finalScene.classList.add(
            "final-together"
          );

        }


        await wait(900);


        if (finalScene) {

          const rect =
            finalScene
              .getBoundingClientRect();


          createHeartBurst(
            rect.left +
            rect.width / 2,

            rect.top +
            rect.height * 0.45,

            14
          );

        }


        await wait(500);


        const finalMessage =
          document.querySelector(
            ".final-message"
          );


        if (finalMessage) {

          finalMessage.classList.add(
            "reveal"
          );

        }


        await wait(850);


        const signature =
          document.querySelector(
            ".signature"
          );


        if (signature) {

          signature.classList.add(
            "reveal"
          );

        }

      }
    );

  }


});* ==================================================
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
