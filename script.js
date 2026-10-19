"use strict";

document.addEventListener("DOMContentLoaded", () => {
  /* =======================================================
     HELPERS
  ======================================================= */

  const $ = (selector, parent = document) =>
    parent.querySelector(selector);

  const $$ = (selector, parent = document) =>
    [...parent.querySelectorAll(selector)];

  const wait = (ms) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const clamp = (value, min, max) =>
    Math.min(Math.max(value, min), max);

  const reducedMotion =
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;


  /* =======================================================
     ELEMENTS
  ======================================================= */

  const scenes = $$(".scene");

  const progressBar = $("#progressBar");

  const particleLayer = $("#particleLayer");

  const petalCounter = $("#petalCounter");
  const petalCount = $("#petalCount");

  const flowerScene = $("#flowerScene");
  const questionScene = $("#questionScene");
  const acceptedScene = $("#acceptedScene");
  const envelopeScene = $("#envelopeScene");
  const letterScene = $("#letterScene");
  const memoryScene = $("#memoryScene");
  const holdScene = $("#holdScene");
  const finalScene = $("#finalScene");

  const characterStage = $("#characterStage");

  const husenCharacter = $("#husenCharacter");
  const ikeCharacter = $("#ikeCharacter");

  const giftFlower = $("#giftFlower");
  const stageHeart = $("#stageHeart");

  const sceneCaption = $("#sceneCaption");
  const skipFlowerButton = $("#skipFlowerButton");

  const yesButton = $("#yesButton");
  const noButton = $("#noButton");
  const noMessage = $("#noMessage");

  const openEnvelopeButton = $("#openEnvelopeButton");

  const envelope = $("#envelope");
  const envelopeHint = $("#envelopeHint");
  const readLetterButton = $("#readLetterButton");

  const collectibles = $$(".collectible");
  const secretMessage = $("#secretMessage");

  const memoryButton = $("#memoryButton");

  const memoryCards = $$(".memory-card");
  const memoryHint = $("#memoryHint");
  const holdSceneButton = $("#holdSceneButton");

  const holdButton = $("#holdButton");
  const holdProgress = $("#holdProgress");
  const holdText = $("#holdText");
  const holdPercent = $("#holdPercent");

  const replayButton = $("#replayButton");


  /* =======================================================
     SAFETY CHECK

     Kalau elemen inti hilang akibat HTML kepotong,
     JS berhenti dengan jelas daripada meledak random.
  ======================================================= */

  const requiredElements = [
    flowerScene,
    questionScene,
    acceptedScene,
    envelopeScene,
    letterScene,
    memoryScene,
    holdScene,
    finalScene,
    yesButton,
    noButton,
    envelope,
    holdButton
  ];

  if (requiredElements.some((element) => !element)) {
    console.error(
      "Website gagal dimulai: ada elemen HTML penting yang hilang."
    );

    return;
  }


  /* =======================================================
     STATE
  ======================================================= */

  const state = {
    currentScene: "flowerScene",

    flowerAnimationFinished: false,
    flowerAnimationRunning: false,

    noClicks: 0,

    envelopeOpened: false,

    foundPetals: new Set(),

    flippedCards: new Set(),

    holdStart: null,
    holdFrame: null,
    holdComplete: false
  };


  const sceneOrder = [
    "flowerScene",
    "questionScene",
    "acceptedScene",
    "envelopeScene",
    "letterScene",
    "memoryScene",
    "holdScene",
    "finalScene"
  ];


  /* =======================================================
     SCENE SYSTEM
  ======================================================= */

  function showScene(id) {
    const target = document.getElementById(id);

    if (!target) {
      console.error(`Scene "${id}" tidak ditemukan.`);
      return;
    }

    scenes.forEach((scene) => {
      scene.classList.remove("scene--active");
    });

    target.classList.add("scene--active");

    state.currentScene = id;

    const index = sceneOrder.indexOf(id);

    if (index !== -1) {
      const percentage =
        (index / (sceneOrder.length - 1)) * 100;

      progressBar.style.width = `${percentage}%`;
    }

    if (id === "letterScene") {
      petalCounter.classList.add(
        "petal-counter--visible"
      );
    } else {
      petalCounter.classList.remove(
        "petal-counter--visible"
      );
    }

    window.scrollTo({
      top: 0,
      behavior: reducedMotion
        ? "auto"
        : "smooth"
    });

    requestAnimationFrame(() => {
      observeReveals();
    });
  }


  /* =======================================================
     TAP / CLICK PARTICLES
  ======================================================= */

  function createParticle(x, y, symbol = "♡") {
    if (!particleLayer) {
      return;
    }

    const particle =
      document.createElement("span");

    particle.className = "tap-particle";
    particle.textContent = symbol;

    const moveX =
      Math.round(
        Math.random() * 80 - 40
      );

    const moveY =
      Math.round(
        -55 - Math.random() * 75
      );

    const rotation =
      Math.round(
        Math.random() * 100 - 50
      );

    particle.style.setProperty(
      "--start-x",
      `${x}px`
    );

    particle.style.setProperty(
      "--start-y",
      `${y}px`
    );

    particle.style.setProperty(
      "--move-x",
      `${moveX}px`
    );

    particle.style.setProperty(
      "--move-y",
      `${moveY}px`
    );

    particle.style.setProperty(
      "--rotate",
      `${rotation}deg`
    );

    particleLayer.appendChild(particle);

    window.setTimeout(() => {
      particle.remove();
    }, 1000);
  }


  function particleBurst(
    x,
    y,
    amount = 12,
    symbols = ["♡", "♥", "✦"]
  ) {
    const safeAmount =
      clamp(amount, 1, 30);

    for (
      let i = 0;
      i < safeAmount;
      i += 1
    ) {
      window.setTimeout(() => {
        const symbol =
          symbols[
            Math.floor(
              Math.random() *
              symbols.length
            )
          ];

        createParticle(
          x,
          y,
          symbol
        );
      }, i * 25);
    }
  }


  document.addEventListener(
    "pointerdown",
    (event) => {
      const target =
        event.target;

      if (
        target.closest(
          "button, a, .letter-paper"
        )
      ) {
        return;
      }

      createParticle(
        event.clientX,
        event.clientY,
        "♡"
      );
    }
  );


  /* =======================================================
     BACKGROUND POINTER REACTION
  ======================================================= */

  const ambientOrbs =
    $$(".ambient__orb");

  document.addEventListener(
    "pointermove",
    (event) => {
      if (
        reducedMotion ||
        window.innerWidth < 700
      ) {
        return;
      }

      const x =
        event.clientX /
        window.innerWidth - 0.5;

      const y =
        event.clientY /
        window.innerHeight - 0.5;

      ambientOrbs.forEach(
        (orb, index) => {
          const strength =
            10 + index * 8;

          orb.style.transform =
            `translate(
              ${x * strength}px,
              ${y * strength}px
            )`;
        }
      );
    }
  );


  /* =======================================================
     CARD TILT
  ======================================================= */

  $$(".interactive-card").forEach(
    (card) => {
      card.addEventListener(
        "pointermove",
        (event) => {
          if (
            reducedMotion ||
            window.innerWidth < 700
          ) {
            return;
          }

          const rect =
            card.getBoundingClientRect();

          const x =
            (
              event.clientX -
              rect.left
            ) /
            rect.width;

          const y =
            (
              event.clientY -
              rect.top
            ) /
            rect.height;

          const rotateY =
            (x - 0.5) * 4;

          const rotateX =
            (0.5 - y) * 4;

          card.style.transform =
            `perspective(900px)
             rotateX(${rotateX}deg)
             rotateY(${rotateY}deg)`;
        }
      );

      card.addEventListener(
        "pointerleave",
        () => {
          card.style.transform = "";
        }
      );
    }
  );


  /* =======================================================
     FLOWER INTRO

     Tidak ada loader.
     Web langsung masuk scene ini.
  ======================================================= */

  async function playFlowerAnimation() {
    if (
      state.flowerAnimationRunning ||
      state.flowerAnimationFinished
    ) {
      return;
    }

    state.flowerAnimationRunning = true;

    if (reducedMotion) {
      giftFlower.classList.add(
        "is-received"
      );

      ikeCharacter.classList.add(
        "is-happy"
      );

      sceneCaption.textContent =
        "buat kamu.";

      state.flowerAnimationFinished = true;
      state.flowerAnimationRunning = false;

      await wait(350);

      showScene("questionScene");

      return;
    }

    sceneCaption.textContent =
      "bentar...";

    await wait(350);

    characterStage.classList.add(
      "is-walking"
    );

    sceneCaption.textContent =
      "aku cuma mau ngasih ini.";

    await wait(850);

    husenCharacter.classList.add(
      "is-giving"
    );

    ikeCharacter.classList.add(
      "is-receiving"
    );

    giftFlower.classList.add(
      "is-given"
    );

    await wait(800);

    giftFlower.classList.remove(
      "is-given"
    );

    giftFlower.classList.add(
      "is-received"
    );

    ikeCharacter.classList.add(
      "is-happy"
    );

    stageHeart.classList.add(
      "is-visible"
    );

    sceneCaption.textContent =
      "buat kamu. 🌷";

    const stageRect =
      characterStage.getBoundingClientRect();

    particleBurst(
      stageRect.left +
        stageRect.width * 0.69,

      stageRect.top +
        stageRect.height * 0.4,

      12,

      ["♡", "♥", "✦"]
    );

    await wait(900);

    state.flowerAnimationFinished = true;
    state.flowerAnimationRunning = false;

    showScene("questionScene");
  }


  skipFlowerButton?.addEventListener(
    "click",
    () => {
      state.flowerAnimationFinished = true;

      showScene("questionScene");
    }
  );


  /* =======================================================
     QUESTION / NO BUTTON
  ======================================================= */

  const noLabels = [
    "gak",
    "yakin?",
    "serius?",
    "masih gak?",
    ":( ",
    "..."
  ];

  const noMessages = [
    "",
    "hmm...",
    "dipikirin lagi boleh kali 😭",
    "tombol sebelah keliatan lebih bagus deh",
    "dia makin kecil tuh...",
    "oke dia menyerah."
  ];


  function updateChoiceButtons() {
    const clicks =
      state.noClicks;

    const isMobile =
      window.innerWidth <= 480;

    const maxYesScale =
      isMobile ? 1.55 : 1.8;

    const yesScale =
      clamp(
        1 + clicks * 0.14,
        1,
        maxYesScale
      );

    const noScale =
      clamp(
        1 - clicks * 0.18,
        0.12,
        1
      );

    document.documentElement.style.setProperty(
      "--yes-scale",
      yesScale.toFixed(2)
    );

    document.documentElement.style.setProperty(
      "--no-scale",
      noScale.toFixed(2)
    );

    const labelIndex =
      Math.min(
        clicks,
        noLabels.length - 1
      );

    noButton.textContent =
      noLabels[labelIndex];

    noMessage.textContent =
      noMessages[labelIndex] || "";

    if (clicks >= 2) {
      const movement =
        Math.min(
          clicks * 6,
          24
        );

      const directionX =
        clicks % 2 === 0
          ? 1
          : -1;

      const directionY =
        clicks % 3 === 0
          ? -1
          : 1;

      noButton.style.setProperty(
        "--no-x",
        `${directionX * movement}px`
      );

      noButton.style.setProperty(
        "--no-y",
        `${directionY * Math.min(
          movement / 2,
          10
        )}px`
      );
    }

    if (clicks >= 5) {
      noButton.classList.add(
        "is-gone"
      );

      noMessage.textContent =
        "kayaknya tinggal satu pilihan deh ♡";
    }
  }


  noButton.addEventListener(
    "click",
    (event) => {
      if (state.noClicks >= 5) {
        return;
      }

      state.noClicks += 1;

      updateChoiceButtons();

      const rect =
        event.currentTarget
          .getBoundingClientRect();

      particleBurst(
        rect.left +
          rect.width / 2,

        rect.top +
          rect.height / 2,

        5,

        ["·", "♡"]
      );
    }
  );


  yesButton.addEventListener(
    "click",
    async (event) => {
      yesButton.disabled = true;
      noButton.disabled = true;

      const rect =
        event.currentTarget
          .getBoundingClientRect();

      particleBurst(
        rect.left +
          rect.width / 2,

        rect.top +
          rect.height / 2,

        24,

        ["♡", "♥", "✦"]
      );

      await wait(
        reducedMotion
          ? 80
          : 450
      );

      showScene("acceptedScene");

      yesButton.disabled = false;
      noButton.disabled = false;
    }
  );


  /* =======================================================
     ACCEPTED
  ======================================================= */

  openEnvelopeButton.addEventListener(
    "click",
    () => {
      showScene("envelopeScene");
    }
  );


  /* =======================================================
     ENVELOPE
  ======================================================= */

  envelope.addEventListener(
    "click",
    async () => {
      if (state.envelopeOpened) {
        return;
      }

      state.envelopeOpened = true;

      envelope.classList.add(
        "is-open"
      );

      envelopeHint.textContent =
        "buat kamu ♡";

      const rect =
        envelope.getBoundingClientRect();

      particleBurst(
        rect.left +
          rect.width / 2,

        rect.top +
          rect.height / 2,

        16,

        ["♡", "✦"]
      );

      await wait(
        reducedMotion
          ? 80
          : 750
      );

      readLetterButton.classList.add(
        "primary-button--visible"
      );
    }
  );


  readLetterButton.addEventListener(
    "click",
    () => {
      showScene("letterScene");
    }
  );


  /* =======================================================
     SCROLL REVEAL
  ======================================================= */

  let revealObserver = null;


  function observeReveals() {
    if (revealObserver) {
      revealObserver.disconnect();
    }

    const elements =
      $$(".scene--active .reveal");

    if (reducedMotion) {
      elements.forEach(
        (element) => {
          element.classList.add(
            "is-visible"
          );
        }
      );

      return;
    }

    revealObserver =
      new IntersectionObserver(
        (entries) => {
          entries.forEach(
            (entry) => {
              if (
                entry.isIntersecting
              ) {
                entry.target.classList.add(
                  "is-visible"
                );

                revealObserver.unobserve(
                  entry.target
                );
              }
            }
          );
        },
        {
          threshold: 0.12,
          rootMargin:
            "0px 0px -35px 0px"
        }
      );

    elements.forEach(
      (element) => {
        revealObserver.observe(
          element
        );
      }
    );
  }


  /* =======================================================
     LETTER HIGHLIGHT INTERACTION
  ======================================================= */

  $$(".letter-highlight").forEach(
    (highlight) => {
      highlight.addEventListener(
        "click",
        (event) => {
          const rect =
            event.currentTarget
              .getBoundingClientRect();

          particleBurst(
            rect.left +
              rect.width / 2,

            rect.top +
              rect.height / 2,

            8,

            ["♡", "✦"]
          );
        }
      );
    }
  );


  /* =======================================================
     COLLECTIBLE FLOWERS
  ======================================================= */

  function updatePetalCounter() {
    const total =
      collectibles.length;

    const found =
      state.foundPetals.size;

    petalCount.textContent =
      `${found}/${total}`;

    if (
      found === total &&
      total > 0
    ) {
      secretMessage.classList.add(
        "is-visible",
        "is-visible"
      );

      secretMessage.classList.add(
        "is-visible"
      );

      requestAnimationFrame(() => {
        secretMessage.classList.add(
          "is-visible"
        );
      });
    }
  }


  collectibles.forEach(
    (collectible) => {
      collectible.addEventListener(
        "click",
        (event) => {
          const id =
            event.currentTarget.dataset.petal;

          if (
            state.foundPetals.has(id)
          ) {
            return;
          }

          state.foundPetals.add(id);

          event.currentTarget.classList.add(
            "is-found"
          );

          const rect =
            event.currentTarget
              .getBoundingClientRect();

          particleBurst(
            rect.left +
              rect.width / 2,

            rect.top +
              rect.height / 2,

            9,

            ["🌷", "♡", "✦"]
          );

          updatePetalCounter();
        }
      );
    }
  );


  /* =======================================================
     LETTER -> MEMORY
  ======================================================= */

  memoryButton.addEventListener(
    "click",
    () => {
      showScene("memoryScene");
    }
  );


  /* =======================================================
     FLIP CARDS
  ======================================================= */

  memoryCards.forEach(
    (card, index) => {
      card.addEventListener(
        "click",
        () => {
          const isFlipped =
            card.classList.contains(
              "is-flipped"
            );

          if (!isFlipped) {
            card.classList.add(
              "is-flipped"
            );

            card.setAttribute(
              "aria-pressed",
              "true"
            );

            state.flippedCards.add(
              index
            );
          }

          if (
            state.flippedCards.size ===
            memoryCards.length
          ) {
            memoryHint.textContent =
              "udah kebuka semua ♡";

            holdSceneButton.classList.add(
              "primary-button--visible"
            );
          }
        }
      );
    }
  );


  holdSceneButton.addEventListener(
    "click",
    () => {
      showScene("holdScene");
    }
  );


  /* =======================================================
     HOLD BUTTON
  ======================================================= */

  const HOLD_DURATION = 1400;


  function resetHold() {
    if (state.holdComplete) {
      return;
    }

    state.holdStart = null;

    if (state.holdFrame) {
      cancelAnimationFrame(
        state.holdFrame
      );
    }

    state.holdFrame = null;

    holdButton.classList.remove(
      "is-holding"
    );

    holdProgress.style.width =
      "0%";

    holdPercent.textContent =
      "0%";

    holdText.textContent =
      "tahan di sini";
  }


  function finishHold() {
    state.holdComplete = true;

    state.holdStart = null;

    holdButton.classList.remove(
      "is-holding"
    );
    holdButton.classList.add(
      "is-complete"
    );

    holdProgress.style.transform =
      "scaleX(1)";

    holdPercent.textContent =
      "100%";

    holdText.textContent =
      "selesai ♡";

    createHeartBurst(
      window.innerWidth / 2,
      window.innerHeight / 2,
      18
    );

    setTimeout(() => {
      showScene("finalScene");
    }, 700);
  }


  /* =======================================================
     HOLD EVENTS
  ======================================================= */

  holdButton.addEventListener(
    "pointerdown",
    (event) => {
      event.preventDefault();

      startHold();
    }
  );


  holdButton.addEventListener(
    "pointerup",
    () => {
      if (!state.holdComplete) {
        cancelHold();
      }
    }
  );


  holdButton.addEventListener(
    "pointercancel",
    () => {
      if (!state.holdComplete) {
        cancelHold();
      }
    }
  );


  holdButton.addEventListener(
    "pointerleave",
    (event) => {
      if (
        event.pointerType === "mouse" &&
        !state.holdComplete
      ) {
        cancelHold();
      }
    }
  );


  /* =======================================================
     REPLAY
  ======================================================= */

  replayButton.addEventListener(
    "click",
    () => {
      state.noClicks = 0;
      state.accepted = false;

      state.collectedPetals.clear();

      state.openedCards = 0;

      state.holdStart = null;
      state.holdComplete = false;


      /* -----------------------------
         RESET QUESTION
      ----------------------------- */

      noButton.hidden = false;

      noButton.style.opacity = "";
      noButton.style.pointerEvents = "";
      noButton.style.transform = "";

      noButton.textContent =
        "gak";


      yesButton.style.transform =
        "scale(1)";


      noMessage.textContent =
        "";


      /* -----------------------------
         RESET FLOWER INTRO
      ----------------------------- */

      husenCharacter.classList.remove(
        "is-near"
      );

      ikeCharacter.classList.remove(
        "has-flower",
        "is-happy"
      );

      giftFlower.classList.remove(
        "is-moving",
        "is-given"
      );

      stageHeart.classList.remove(
        "is-visible"
      );

      sceneCaption.textContent =
        "bentar...";


      /* -----------------------------
         RESET ENVELOPE
      ----------------------------- */

      envelope.classList.remove(
        "is-open"
      );

      envelopeHint.textContent =
        "tekan untuk buka";

      readLetterButton.classList.add(
        "primary-button--hidden"
      );


      /* -----------------------------
         RESET FLOWERS
      ----------------------------- */

      collectibles.forEach(
        (flower) => {
          flower.classList.remove(
            "is-collected"
          );

          flower.disabled = false;
        }
      );

      petalCount.textContent =
        "0/5";

      petalCounter.classList.remove(
        "is-visible"
      );

      secretMessage.classList.remove(
        "is-visible"
      );


      /* -----------------------------
         RESET CARDS
      ----------------------------- */

      memoryCards.forEach(
        (card) => {
          card.classList.remove(
            "is-flipped"
          );

          card.setAttribute(
            "aria-pressed",
            "false"
          );
        }
      );

      memoryHint.textContent =
        "buka ketiga kartu untuk lanjut";

      holdSceneButton.classList.add(
        "primary-button--hidden"
      );


      /* -----------------------------
         RESET HOLD
      ----------------------------- */

      holdButton.classList.remove(
        "is-holding",
        "is-complete"
      );

      holdProgress.style.transform =
        "scaleX(0)";

      holdPercent.textContent =
        "0%";

      holdText.textContent =
        "tahan di sini";


      /* -----------------------------
         RESET REVEAL
      ----------------------------- */

      revealElements.forEach(
        (element) => {
          element.classList.remove(
            "is-visible"
          );
        }
      );


      /* -----------------------------
         BACK TO START
      ----------------------------- */

      showScene(
        "flowerScene",
        false
      );

      setTimeout(() => {
        playFlowerIntro();
      }, 350);
    }
  );


  /* =======================================================
     POINTER PARTICLES
  ======================================================= */

  document.addEventListener(
    "pointerdown",
    (event) => {
      createParticle(
        event.clientX,
        event.clientY
      );
    }
  );


  /* =======================================================
     INTERACTIVE CARD TILT
  ======================================================= */

  const interactiveCards =
    document.querySelectorAll(
      ".interactive-card"
    );


  interactiveCards.forEach(
    (card) => {

      card.addEventListener(
        "pointermove",
        (event) => {

          if (
            event.pointerType !== "mouse"
          ) {
            return;
          }


          const rect =
            card.getBoundingClientRect();


          const x =
            event.clientX -
            rect.left;


          const y =
            event.clientY -
            rect.top;


          const rotateY =
            (
              (x / rect.width) -
              0.5
            ) * 5;


          const rotateX =
            (
              0.5 -
              (y / rect.height)
            ) * 5;


          card.style.transform =
            `perspective(900px)
             rotateX(${rotateX}deg)
             rotateY(${rotateY}deg)`;
        }
      );


      card.addEventListener(
        "pointerleave",
        () => {
          card.style.transform = "";
        }
      );

    }
  );


  /* =======================================================
     BACKGROUND POINTER REACTION
  ======================================================= */

  document.addEventListener(
    "pointermove",
    (event) => {

      if (
        window.matchMedia(
          "(prefers-reduced-motion: reduce)"
        ).matches
      ) {
        return;
      }


      const x =
        event.clientX /
        window.innerWidth;


      const y =
        event.clientY /
        window.innerHeight;


      document.documentElement.style.setProperty(
        "--pointer-x",
        `${x * 100}%`
      );


      document.documentElement.style.setProperty(
        "--pointer-y",
        `${y * 100}%`
      );
    }
  );


  /* =======================================================
     PREVENT DRAGGING
  ======================================================= */

  document.addEventListener(
    "dragstart",
    (event) => {
      event.preventDefault();
    }
  );


  /* =======================================================
     INITIAL STATE
  ======================================================= */

  updateProgress();

  updatePetalCounter();

  observeReveals();


  setTimeout(() => {
    playFlowerIntro();
  }, 500);

});
