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

}.style.opacity =
          opacity;


        /*
          TEKS
        */

        if (rejectText) {

          let messageIndex =
            rejectCount - 1;

          if (
            messageIndex >=
            rejectMessages.length
          ) {

            messageIndex =
              rejectMessages.length - 1;
          }


          rejectText.textContent =
            rejectMessages[messageIndex];
        }


        heartBurst(
          yesBtn,
          4
        );


        /*
          5 KALI GAK:
          TOMBOL GAK HILANG.
        */

        if (rejectCount >= 5) {

          noRemoved = true;

          noBtn.disabled = true;

          noBtn.classList.add(
            "disappear"
          );


          yesBtn.style.transform =
            "scale(2.5)";


          if (rejectText) {

            rejectText.textContent =
              "oke... tombol gak-nya nyerah 😭";
          }


          setTimeout(function () {

            noBtn.style.display =
              "none";

          }, 450);
        }
      }
    );
  }


  /* =======================================================
     BUTTON "MAAFIN ♡"
  ======================================================= */

  if (yesBtn) {

    yesBtn.addEventListener(
      "click",
      async function () {

        if (accepted) {
          return;
        }

        accepted = true;


        /*
          Normalisasi tombol.
        */

        yesBtn.style.transform =
          "scale(1.05)";

        yesBtn.textContent =
          "makasih ♡";

        yesBtn.disabled =
          true;


        /*
          Hilangkan tombol GAK.
        */

        if (noBtn) {

          noRemoved = true;

          noBtn.disabled = true;

          noBtn.classList.add(
            "disappear"
          );


          setTimeout(function () {

            noBtn.style.display =
              "none";

          }, 400);
        }


        if (rejectText) {

          rejectText.textContent =
            "makasih udah mau dengerin aku :)";
        }


        pinkFlash();

        heartBurst(
          yesBtn,
          16
        );


        await wait(800);


        /*
          BUKA HUG.
        */

        showSection(hug);


        await wait(250);


        scrollToElement(hug);


        await wait(700);


        /*
          PELUKAN.
        */

        if (hugScene) {

          hugScene.classList.add(
            "hugging"
          );
        }


        await wait(900);


        heartBurst(
          hugScene,
          12
        );
      }
    );

  } else {

    console.error(
      "yesBtn TIDAK DITEMUKAN"
    );
  }


  /* =======================================================
     LETTER
  ======================================================= */

  if (letterBtn) {

    letterBtn.addEventListener(
      "click",
      async function () {

        if (letterOpened) {
          return;
        }

        letterOpened = true;

        letterBtn.disabled = true;


        pinkFlash();


        showSection(letter);


        await wait(250);


        scrollToElement(letter);


        await wait(450);


        /*
          PARAGRAF MUNCUL SATU-SATU.
        */

        const paragraphs =
          document.querySelectorAll(
            ".letter-card p"
          );


        for (
          let i = 0;
          i < paragraphs.length;
          i++
        ) {

          (function (index) {

            setTimeout(function () {

              paragraphs[index]
                .classList
                .add("reveal");

            }, index * 220);

          })(i);
        }
      }
    );

  } else {

    console.error(
      "letterBtn TIDAK DITEMUKAN"
    );
  }


  /* =======================================================
     MORE
  ======================================================= */

  if (continueBtn) {

    continueBtn.addEventListener(
      "click",
      async function () {

        if (moreOpened) {
          return;
        }

        moreOpened = true;

        continueBtn.disabled = true;


        showSection(more);


        await wait(250);


        scrollToElement(more);


        await wait(450);


        const messages =
          document.querySelectorAll(
            ".message"
          );


        for (
          let i = 0;
          i < messages.length;
          i++
        ) {

          (function (index) {

            setTimeout(function () {

              messages[index]
                .classList
                .add("reveal");

            }, index * 400);

          })(i);
        }
      }
    );

  } else {

    console.error(
      "continueBtn TIDAK DITEMUKAN"
    );
  }


  /* =======================================================
     FINAL
  ======================================================= */

  if (finalBtn) {

    finalBtn.addEventListener(
      "click",
      async function () {

        if (finalOpened) {
          return;
        }

        finalOpened = true;

        finalBtn.disabled = true;


        pinkFlash();


        /*
          BUKA FINAL SECTION.
        */

        showSection(
          finalSection
        );


        await wait(250);


        scrollToElement(
          finalSection
        );


        await wait(700);


        /*
          HUSEN + IKE MENDEKAT.
        */

        if (finalScene) {

          finalScene.classList.add(
            "together"
          );
        }


        await wait(1200);


        heartBurst(
          finalScene,
          15
        );


        await wait(450);


        /*
          PESAN AKHIR.
        */

        if (finalMessage) {

          finalMessage.classList.add(
            "reveal"
          );
        }


        await wait(900);


        /*
          SIGNATURE.
        */

        if (signature) {

          signature.classList.add(
            "reveal"
          );
        }
      }
    );

  } else {

    console.error(
      "finalBtn TIDAK DITEMUKAN"
    );
  }


  /* =======================================================
     FINAL DEBUG CHECK
  ======================================================= */

  console.log(
    "V30 ELEMENT CHECK:",
    {
      welcome: !!welcome,
      enterBtn: !!enterBtn,
      startBtn: !!startBtn,
      openingScene: !!openingScene,
      apology: !!apology,
      yesBtn: !!yesBtn,
      noBtn: !!noBtn,
      hug: !!hug,
      letterBtn: !!letterBtn,
      continueBtn: !!continueBtn,
      finalBtn: !!finalBtn
    }
  );


  console.log(
    "FOR IKE V30 READY ♡"
  );

});       HUSEN MULAI JALAN
        */

        if (openingScene) {

          openingScene.classList.add(
            "walking"
          );

        }


        showStory(
          "bentar, aku kesana dulu..."
        );


        await wait(500);


        /*
          POSISI HUSEN BERGERAK
          MENDEKATI IKE
        */

        if (openingScene) {

          openingScene.classList.add(
            "together"
          );

        }


        await wait(1700);


        /*
          BERHENTI JALAN
        */

        if (openingScene) {

          openingScene.classList.remove(
            "walking"
          );

        }


        await wait(250);


        /*
          KASIH BUNGA
        */

        showStory(
          "ini buat kamu 🌷"
        );


        if (openingScene) {

          openingScene.classList.add(
            "give-flower"
          );

        }


        await wait(1000);


        /*
          HEART EFFECT
        */

        heartBurst(
          openingScene,
          9
        );


        await wait(1300);


        /*
          TEKS TERAKHIR
        */

        showStory(
          "terus... aku mau nanya sesuatu."
        );


        await wait(1400);


        hideStory();


        /*
          TAMPILKAN PERTANYAAN MAAF
        */

        showSection(
          apology
        );


        await wait(200);


        scrollToElement(
          apology
        );


        console.log(
          "SENN V2: apology opened"
        );

      }
    );

  } else {

    console.error(
      "SENN V2 ERROR: #startBtn tidak ditemukan"
    );

  }


  /* ===================================================
     REJECT / "GAK"
  =================================================== */

  const rejectMessages = [

    "yahh 🥲",

    "masih gak?",

    "aku minta maaf beneran...",

    "bunganya masih aku pegang 🌷",

    "maafinnya udah gede banget 😭"

  ];


  if (
    noBtn &&
    yesBtn
  ) {

    noBtn.addEventListener(
      "click",
      function () {

        if (
          apologyAccepted ||
          noRemoved
        ) {
          return;
        }


        rejectCount++;


        /*
          YES MAKIN GEDE.
        */

        const yesScale =
          Math.min(
            2.6,
            1 +
            rejectCount *
            0.31
          );


        yesBtn.style.transform =
          "scale(" +
          yesScale +
          ")";


        /*
          NO MAKIN KECIL.
        */

        const noScale =
          Math.max(
            0.43,
            1 -
            rejectCount *
            0.12
          );


        noBtn.style.transform =
          "scale(" +
          noScale +
          ")";


        /*
          NO MAKIN PUDAR.
        */

        const noOpacity =
          Math.max(
            0.32,
            1 -
            rejectCount *
            0.13
          );


        noBtn.style.opacity =
          noOpacity;


        /*
          TEKS REAKSI.
        */

        if (rejectText) {

          const index =
            Math.min(
              rejectCount - 1,
              rejectMessages.length - 1
            );


          rejectText.textContent =
            rejectMessages[index];

        }


        /*
          HEART KECIL DI YES.
        */

        heartBurst(
          yesBtn,
          4
        );


        /*
          SETELAH 5 KALI:
          NO MENYERAH.
        */

        if (
          rejectCount >= 5
        ) {

          noRemoved = true;


          yesBtn.style.transform =
            "scale(2.6)";


          noBtn.disabled = true;


          noBtn.classList.add(
            "disappear"
          );


          if (rejectText) {

            rejectText.textContent =
              "oke... tombol gak-nya nyerah 😭";

          }


          setTimeout(function () {

            noBtn.style.display =
              "none";

          }, 450);

        }

      }
    );

  }


  /* ===================================================
     ACCEPT APOLOGY
  =================================================== */

  if (yesBtn) {

    yesBtn.addEventListener(
      "click",
      async function () {

        if (apologyAccepted) {
          return;
        }


        apologyAccepted = true;


        console.log(
          "SENN V2: apology accepted"
        );


        /*
          YES NORMAL LAGI.
        */

        yesBtn.style.transform =
          "scale(1.08)";


        yesBtn.textContent =
          "makasih ♡";


        yesBtn.disabled =
          true;


        /*
          NO HILANG.
        */

        if (noBtn) {

          noRemoved = true;


          noBtn.disabled = true;


          noBtn.classList.add(
            "disappear"
          );


          setTimeout(function () {

            noBtn.style.display =
              "none";

          }, 400);

        }


        if (rejectText) {

          rejectText.textContent =
            "makasih udah mau dengerin aku :)";

        }


        /*
          EFFECT.
        */

        pinkFlash();


        heartBurst(
          yesBtn,
          18
        );


        await wait(900);


        /*
          TAMPILKAN HUG SECTION.
        */

        showSection(
          hug
        );


        await wait(200);


        scrollToElement(
          hug
        );


        /*
          BIAR SECTION SUDAH
          BENAR-BENAR KELIHATAN.
        */

        await wait(700);


        /*
          MULAI PELUKAN.
        */

        if (hugScene) {

          hugScene.classList.add(
            "hugging"
          );

        }


        await wait(1000);


        heartBurst(
          hugScene,
          13
        );

      }
    );

  }


  /* ===================================================
     OPEN LETTER
  =================================================== */

  if (letterBtn) {

    letterBtn.addEventListener(
      "click",
      async function () {

        console.log(
          "SENN V2: letter opened"
        );


        letterBtn.disabled =
          true;


        pinkFlash();


        /*
          TAMPILKAN SURAT.
        */

        showSection(
          letter
        );


        await wait(200);


        scrollToElement(
          letter
        );


        await wait(500);


        /*
          REVEAL PARAGRAF SATU-SATU.
        */

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

              index * 240
            );

          }
        );

      }
    );

  }


  /* ===================================================
     CONTINUE
  =================================================== */

  if (continueBtn) {

    continueBtn.addEventListener(
      "click",
      async function () {

        console.log(
          "SENN V2: more section opened"
        );


        continueBtn.disabled =
          true;


        showSection(
          more
        );


        await wait(200);


        scrollToElement(
          more
        );


        await wait(500);


        /*
          REVEAL MESSAGE.
        */

        const messages =
          document.querySelectorAll(
            ".message"
          );


        messages.forEach(
          function (
            message,
            index
          ) {

            setTimeout(
              function () {

                message.classList.add(
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


  /* ===================================================
     FINAL
  =================================================== */

  if (finalBtn) {

    finalBtn.addEventListener(
      "click",
      async function () {

        console.log(
          "SENN V2: final opened"
        );


        finalBtn.disabled =
          true;


        pinkFlash();


        /*
          TAMPILKAN FINAL.
        */

        showSection(
          final
        );


        await wait(200);


        scrollToElement(
          final
        );


        await wait(700);


        /*
          KARAKTER MENDEKAT.
        */

        if (finalScene) {

          finalScene.classList.add(
            "together"
          );

        }


        await wait(1200);


        /*
          HEART BURST.
        */

        heartBurst(
          finalScene,
          16
        );


        await wait(450);


        /*
          PESAN AKHIR.
        */

        if (finalMessage) {

          finalMessage.classList.add(
            "reveal"
          );

        }


        await wait(900);


        /*
          SIGNATURE.
        */

        if (signature) {

          signature.classList.add(
            "reveal"
          );

        }

      }
    );

  }


  /* ===================================================
     FINAL CHECK
  =================================================== */

  console.log(
    "SENN V2 READY",
    {
      enterBtn:
        Boolean(enterBtn),

      startBtn:
        Boolean(startBtn),

      yesBtn:
        Boolean(yesBtn),

      noBtn:
        Boolean(noBtn),

      letterBtn:
        Boolean(letterBtn),

      continueBtn:
        Boolean(continueBtn),

      finalBtn:
        Boolean(finalBtn)
    }
  );

});         "makasih udah mau dengerin aku :)";

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
