document.addEventListener("DOMContentLoaded", () => {

  "use strict";


  /* =========================================
     HELPERS
  ========================================= */

  const $ = (selector, root = document) =>
    root.querySelector(selector);

  const $$ = (selector, root = document) =>
    [...root.querySelectorAll(selector)];

  const wait = (ms) =>
    new Promise((resolve) => {
      window.setTimeout(resolve, ms);
    });


  /* =========================================
     ELEMENTS
  ========================================= */

  const scenes = $$(".scene");

  const progressBar =
    $("#progressBar");

  const particleLayer =
    $("#particleLayer");


  const sceneCaption =
    $("#sceneCaption");

  const husenCharacter =
    $("#husenCharacter");

  const ikeCharacter =
    $("#ikeCharacter");

  const husenFlowerArm =
    $("#husenFlowerArm");

  const ikeFlowerArm =
    $("#ikeFlowerArm");

  const giftFlower =
    $("#giftFlower");

  const stageHeart =
    $("#stageHeart");

  const characterStage =
    $("#characterStage");

  const skipIntroButton =
    $("#skipIntroButton");


  const yesButton =
    $("#yesButton");

  const noButton =
    $("#noButton");

  const noMessage =
    $("#noMessage");


  const openEnvelopeSceneButton =
    $("#openEnvelopeSceneButton");

  const envelope =
    $("#envelope");

  const envelopeHint =
    $("#envelopeHint");

  const readLetterButton =
    $("#readLetterButton");

  const memoryButton =
    $("#memoryButton");

  const memoryCards =
    $$(".memory-card");

  const memoryHint =
    $("#memoryHint");

  const finalButton =
    $("#finalButton");

  const replayButton =
    $("#replayButton");


  /* =========================================
     STATE
  ========================================= */

  let currentSceneIndex = 0;

  let introRunId = 0;

  let noClickCount = 0;

  let envelopeOpened = false;

  let yesLocked = false;

  const openedCards =
    new Set();


  /* =========================================
     SCENES
  ========================================= */

  function showScene(
    id,
    scroll = true
  ) {

    const target =
      document.getElementById(id);

    if (!target) {
      console.error(
        `Scene tidak ditemukan: ${id}`
      );

      return;
    }


    scenes.forEach((scene) => {

      const active =
        scene === target;

      scene.classList.toggle(
        "scene--active",
        active
      );

      scene.setAttribute(
        "aria-hidden",
        active
          ? "false"
          : "true"
      );

    });


    const index =
      scenes.indexOf(target);

    if (index >= 0) {

      currentSceneIndex =
        index;

      if (progressBar) {

        const progress =
          ((index + 1) /
            scenes.length) *
          100;

        progressBar.style.width =
          `${progress}%`;
      }
    }


    if (scroll) {

      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth"
      });

    }
  }


  /* =========================================
     PARTICLES
  ========================================= */

  function createHeart(
    x,
    y
  ) {

    if (!particleLayer) {
      return;
    }


    const heart =
      document.createElement("span");

    heart.className =
      "particle";

    heart.textContent =
      "♡";


    heart.style.left =
      `${x}px`;

    heart.style.top =
      `${y}px`;


    heart.style.setProperty(
      "--x",
      `${
        (Math.random() - 0.5) *
        150
      }px`
    );

    heart.style.setProperty(
      "--y",
      `${
        -50 -
        Math.random() * 120
      }px`
    );

    heart.style.setProperty(
      "--r",
      `${
        (Math.random() - 0.5) *
        100
      }deg`
    );


    particleLayer.appendChild(
      heart
    );


    window.setTimeout(() => {
      heart.remove();
    }, 900);

  }


  function heartBurst(
    x,
    y,
    amount = 15
  ) {

    for (
      let i = 0;
      i < amount;
      i += 1
    ) {

      window.setTimeout(() => {

        createHeart(
          x,
          y
        );

      }, i * 18);

    }
  }


  /* =========================================
     INTRO RESET
  ========================================= */

  function resetIntro() {

    husenCharacter?.classList.remove(
      "is-near"
    );

    ikeCharacter?.classList.remove(
      "is-happy"
    );

    husenFlowerArm?.classList.remove(
      "is-giving"
    );

    ikeFlowerArm?.classList.remove(
      "is-receiving"
    );

    giftFlower?.classList.remove(
      "is-moving",
      "is-given"
    );

    stageHeart?.classList.remove(
      "is-visible"
    );


    if (sceneCaption) {

      sceneCaption.textContent =
        "tunggu sebentar...";

    }
  }


  /* =========================================
     INTRO
  ========================================= */

  async function runIntro() {

    const runId =
      ++introRunId;


    resetIntro();


    await wait(600);

    if (runId !== introRunId) {
      return;
    }


    if (sceneCaption) {
      sceneCaption.textContent =
        "aku mau kasih ini...";
    }


    husenCharacter?.classList.add(
      "is-near"
    );


    await wait(1300);

    if (runId !== introRunId) {
      return;
    }


    husenFlowerArm?.classList.add(
      "is-giving"
    );


    await wait(450);

    if (runId !== introRunId) {
      return;
    }


    if (sceneCaption) {
      sceneCaption.textContent =
        "ini buat kamu.";
    }


    giftFlower?.classList.add(
      "is-moving"
    );


    await wait(900);

    if (runId !== introRunId) {
      return;
    }


    ikeFlowerArm?.classList.add(
      "is-receiving"
    );


    await wait(400);

    if (runId !== introRunId) {
      return;
    }


    giftFlower?.classList.add(
      "is-given"
    );

    ikeCharacter?.classList.add(
      "is-happy"
    );


    if (sceneCaption) {
      sceneCaption.textContent =
        "buat kamu 🌷";
    }


    stageHeart?.classList.add(
      "is-visible"
    );


    if (characterStage) {

      const rect =
        characterStage
          .getBoundingClientRect();

      heartBurst(
        rect.left +
          rect.width * 0.57,

        rect.top +
          rect.height * 0.36,

        8
      );
    }


    await wait(1300);

    if (runId !== introRunId) {
      return;
    }


    showScene(
      "questionScene"
    );
  }


  /* =========================================
     SKIP INTRO
  ========================================= */

  function skipIntro() {

    /*
      Membatalkan runIntro yang sedang
      menunggu di await.
    */

    introRunId += 1;


    husenCharacter?.classList.add(
      "is-near"
    );

    husenFlowerArm?.classList.add(
      "is-giving"
    );

    ikeFlowerArm?.classList.add(
      "is-receiving"
    );

    giftFlower?.classList.add(
      "is-moving",
      "is-given"
    );

    ikeCharacter?.classList.add(
      "is-happy"
    );

    stageHeart?.classList.add(
      "is-visible"
    );


    if (sceneCaption) {
      sceneCaption.textContent =
        "buat kamu 🌷";
    }


    showScene(
      "questionScene"
    );
  }


  skipIntroButton?.addEventListener(
    "click",
    skipIntro
  );


  /* =========================================
     NO
  ========================================= */

  const noTexts = [
    "yakin?",
    "serius?",
    "masih gak?",
    "beneran?",
    ":("
  ];


  const noMessages = [
    "hmm...",
    "aku masih nunggu 😭",
    "tombol satunya makin gede tuh",
    "masih yakin?",
    "oke, tombol ini menyerah."
  ];


  function handleNo() {

    noClickCount += 1;


    if (noButton) {

      const index =
        Math.min(
          noClickCount - 1,
          noTexts.length - 1
        );

      noButton.textContent =
        noTexts[index];


      const scale =
        Math.max(
          0,
          1 -
            noClickCount *
            0.19
        );

      noButton.style.transform =
        `scale(${scale})`;

    }


    if (yesButton) {

      const scale =
        Math.min(
          1.65,
          1 +
            noClickCount *
            0.13
        );

      yesButton.style.transform =
        `scale(${scale})`;

    }


    if (noMessage) {

      const index =
        Math.min(
          noClickCount - 1,
          noMessages.length - 1
        );

      noMessage.textContent =
        noMessages[index];

    }


    if (
      noClickCount >= 5 &&
      noButton
    ) {

      noButton.style.opacity =
        "0";

      noButton.style.pointerEvents =
        "none";

      noButton.style.transform =
        "scale(0)";

    }
  }


  noButton?.addEventListener(
    "click",
    handleNo
  );


  /* =========================================
     YES
  ========================================= */

  yesButton?.addEventListener(
    "click",
    (event) => {

      if (yesLocked) {
        return;
      }


      yesLocked =
        true;


      yesButton.disabled =
        true;

      if (noButton) {
        noButton.disabled =
          true;
      }


      const rect =
        yesButton
          .getBoundingClientRect();


      const x =
        event.clientX ||
        rect.left +
          rect.width / 2;

      const y =
        event.clientY ||
        rect.top +
          rect.height / 2;


      heartBurst(
        x,
        y,
        22
      );


      yesButton.textContent =
        "makasih ♡";


      window.setTimeout(() => {

        showScene(
          "acceptedScene"
        );

        yesLocked =
          false;

        yesButton.disabled =
          false;

      }, 650);

    }
  );


  /* =========================================
     ACCEPTED
  ========================================= */

  openEnvelopeSceneButton
    ?.addEventListener(
      "click",
      () => {

        showScene(
          "envelopeScene"
        );

      }
    );


  /* =========================================
     ENVELOPE
  ========================================= */

  envelope?.addEventListener(
    "click",
    () => {

      if (envelopeOpened) {
        return;
      }


      envelopeOpened =
        true;


      envelope.classList.add(
        "is-open"
      );

      envelope.setAttribute(
        "aria-expanded",
        "true"
      );


      if (envelopeHint) {
        envelopeHint.textContent =
          "buat kamu.";
      }


      window.setTimeout(() => {

        readLetterButton
          ?.classList.remove(
            "is-hidden"
          );

      }, 650);

    }
  );


  readLetterButton
    ?.addEventListener(
      "click",
      () => {

        showScene(
          "letterScene"
        );

      }
    );


  /* =========================================
     LETTER
  ========================================= */

  memoryButton
    ?.addEventListener(
      "click",
      () => {

        showScene(
          "memoryScene"
        );

      }
    );


  /* =========================================
     MEMORY CARDS
  ========================================= */

  function updateCards() {

    const opened =
      openedCards.size;

    const total =
      memoryCards.length;


    if (memoryHint) {

      if (opened < total) {

        memoryHint.textContent =
          `${opened} dari ${total} pesan sudah dibuka`;

      } else {

        memoryHint.textContent =
          "udah kebuka semua ♡";

      }
    }


    if (
      total > 0 &&
      opened === total
    ) {

      finalButton
        ?.classList.remove(
          "is-hidden"
        );


      heartBurst(
        window.innerWidth / 2,
        window.innerHeight * 0.75,
        8
      );

    }
  }


  memoryCards.forEach(
    (card, index) => {

      card.addEventListener(
        "click",
        () => {

          if (
            card.classList.contains(
              "is-flipped"
            )
          ) {
            return;
          }


          card.classList.add(
            "is-flipped"
          );

          card.setAttribute(
            "aria-pressed",
            "true"
          );


          openedCards.add(
            index
          );


          updateCards();

        }
      );

    }
  );


  /* =========================================
     FINAL
  ========================================= */

  finalButton
    ?.addEventListener(
      "click",
      () => {

        showScene(
          "finalScene"
        );


        window.setTimeout(() => {

          heartBurst(
            window.innerWidth / 2,
            window.innerHeight * 0.4,
            18
          );

        }, 350);

      }
    );


  /* =========================================
     RESET
  ========================================= */

  function resetQuestion() {

    noClickCount =
      0;

    yesLocked =
      false;


    if (noButton) {

      noButton.textContent =
        "gak";

      noButton.style.transform =
        "";

      noButton.style.opacity =
        "";

      noButton.style.pointerEvents =
        "";

      noButton.disabled =
        false;

    }


    if (yesButton) {

      yesButton.textContent =
        "maafin ♡";

      yesButton.style.transform =
        "";

      yesButton.disabled =
        false;

    }


    if (noMessage) {

      noMessage.textContent =
        "";

    }
  }


  function resetEnvelope() {

    envelopeOpened =
      false;


    envelope?.classList.remove(
      "is-open"
    );

    envelope?.setAttribute(
      "aria-expanded",
      "false"
    );


    if (envelopeHint) {

      envelopeHint.textContent =
        "tekan amplopnya";

    }


    readLetterButton
      ?.classList.add(
        "is-hidden"
      );
  }


  function resetCards() {

    openedCards.clear();


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


    if (memoryHint) {

      memoryHint.textContent =
        "buka ketiga pesan";

    }


    finalButton
      ?.classList.add(
        "is-hidden"
      );
  }


  /* =========================================
     REPLAY
  ========================================= */

  replayButton?.addEventListener(
    "click",
    () => {

      /*
        Membatalkan intro lama kalau
        masih ada timeout/await hidup.
      */

      introRunId += 1;


      resetQuestion();
      resetEnvelope();
      resetCards();
      resetIntro();


      showScene(
        "flowerScene",
        false
      );


      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "auto"
      });


      window.setTimeout(() => {

        runIntro();

      }, 300);

    }
  );


  /* =========================================
     BUTTON PARTICLES
  ========================================= */

  document.addEventListener(
    "pointerdown",
    (event) => {

      const button =
        event.target.closest(
          "button"
        );


      if (!button) {
        return;
      }


      createHeart(
        event.clientX,
        event.clientY
      );

    }
  );


  /* =========================================
     INITIALIZE
  ========================================= */

  scenes.forEach(
    (scene, index) => {

      const active =
        scene.classList.contains(
          "scene--active"
        );


      scene.setAttribute(
        "aria-hidden",
        active
          ? "false"
          : "true"
      );


      if (active) {

        currentSceneIndex =
          index;

      }

    }
  );


  resetQuestion();
  resetEnvelope();
  resetCards();
  resetIntro();


  if (progressBar) {

    progressBar.style.width =
      `${
        ((currentSceneIndex + 1) /
          scenes.length) *
        100
      }%`;

  }


  /* =========================================
     START
  ========================================= */

  window.setTimeout(() => {

    runIntro();

  }, 350);

});
