document.addEventListener("DOMContentLoaded", () => {
  /* =========================================================
     HELPERS
  ========================================================= */

  const $ = (selector, root = document) =>
    root.querySelector(selector);

  const $$ = (selector, root = document) =>
    [...root.querySelectorAll(selector)];

  const wait = (ms) =>
    new Promise((resolve) => setTimeout(resolve, ms));


  /* =========================================================
     ELEMENTS
  ========================================================= */

  const scenes = $$(".scene");

  const progressBar =
    $("#progressBar");

  const particleLayer =
    $("#particleLayer");


  /* =========================================================
     INTRO
  ========================================================= */

  const flowerScene =
    $("#flowerScene");

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

  const skipIntroButton =
    $("#skipIntroButton");


  /* =========================================================
     QUESTION
  ========================================================= */

  const yesButton =
    $("#yesButton");

  const noButton =
    $("#noButton");

  const noMessage =
    $("#noMessage");


  /* =========================================================
     ACCEPTED
  ========================================================= */

  const openEnvelopeSceneButton =
    $("#openEnvelopeSceneButton");


  /* =========================================================
     ENVELOPE
  ========================================================= */

  const envelope =
    $("#envelope");

  const envelopeHint =
    $("#envelopeHint");

  const readLetterButton =
    $("#readLetterButton");


  /* =========================================================
     LETTER
  ========================================================= */

  const memoryButton =
    $("#memoryButton");


  /* =========================================================
     THREE CARDS
  ========================================================= */

  const memoryCards =
    $$(".memory-card");

  const memoryHint =
    $("#memoryHint");

  const finalButton =
    $("#finalButton");


  /* =========================================================
     FINAL
  ========================================================= */

  const replayButton =
    $("#replayButton");


  /* =========================================================
     STATE
  ========================================================= */

  let currentSceneIndex = 0;

  let introRunId = 0;

  let introFinished = false;

  let noClickCount = 0;

  const openedCards =
    new Set();


  /* =========================================================
     SCENE SYSTEM
  ========================================================= */

  function getSceneIndex(id) {
    return scenes.findIndex(
      (scene) => scene.id === id
    );
  }


  function updateProgress(index) {
    if (!progressBar) return;

    const total =
      scenes.length;

    const progress =
      ((index + 1) / total) * 100;

    progressBar.style.width =
      `${progress}%`;
  }


  function showScene(
    id,
    options = {}
  ) {
    const {
      scroll = true
    } = options;

    const target =
      document.getElementById(id);

    if (!target) {
      console.warn(
        `Scene "${id}" tidak ditemukan.`
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
      getSceneIndex(id);

    if (index !== -1) {
      currentSceneIndex =
        index;

      updateProgress(index);
    }


    if (scroll) {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth"
      });
    }
  }


  /* =========================================================
     PARTICLES
  ========================================================= */

  function createHeartParticle(
    x,
    y
  ) {
    if (!particleLayer) return;


    const particle =
      document.createElement("span");


    particle.className =
      "particle particle--heart";


    particle.textContent =
      "♡";


    particle.style.left =
      `${x}px`;

    particle.style.top =
      `${y}px`;


    const randomX =
      (Math.random() - 0.5) * 160;

    const randomY =
      -40 -
      Math.random() * 120;

    const randomRotation =
      (Math.random() - 0.5) * 100;


    particle.style.setProperty(
      "--particle-x",
      `${randomX}px`
    );

    particle.style.setProperty(
      "--particle-y",
      `${randomY}px`
    );

    particle.style.setProperty(
      "--particle-r",
      `${randomRotation}deg`
    );


    particleLayer.appendChild(
      particle
    );


    window.setTimeout(() => {
      particle.remove();
    }, 850);
  }


  function heartBurst(
    x = window.innerWidth / 2,
    y = window.innerHeight / 2,
    amount = 15
  ) {
    for (
      let i = 0;
      i < amount;
      i += 1
    ) {
      window.setTimeout(() => {
        createHeartParticle(
          x,
          y
        );
      }, i * 18);
    }
  }


  /* =========================================================
     RESET INTRO
  ========================================================= */

  function resetIntroVisuals() {
    husenCharacter?.classList.remove(
      "is-near"
    );


    ikeCharacter?.classList.remove(
      "is-happy"
    );


    const ike =
      $(".character--ike");

    ike?.classList.remove(
      "has-flower"
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


  /* =========================================================
     COMPLETE INTRO IMMEDIATELY
  ========================================================= */

  function completeIntroImmediately() {
    introRunId += 1;

    introFinished = true;


    husenCharacter?.classList.add(
      "is-near"
    );


    husenFlowerArm?.classList.add(
      "is-giving"
    );


    giftFlower?.classList.add(
      "is-moving",
      "is-given"
    );


    const ike =
      $(".character--ike");


    ike?.classList.add(
      "has-flower"
    );


    ikeCharacter?.classList.add(
      "is-happy"
    );


    ikeFlowerArm?.classList.add(
      "is-receiving"
    );


    stageHeart?.classList.add(
      "is-visible"
    );


    if (sceneCaption) {
      sceneCaption.textContent =
        "buat kamu 🌷";
    }
  }


  /* =========================================================
     INTRO ANIMATION
  ========================================================= */

  async function runIntroAnimation() {
    const runId =
      ++introRunId;


    introFinished =
      false;


    resetIntroVisuals();


    if (sceneCaption) {
      sceneCaption.textContent =
        "tunggu sebentar...";
    }


    /*
      1. Diam sebentar.
    */

    await wait(700);


    if (
      runId !== introRunId
    ) {
      return;
    }


    /*
      2. Husen mulai mendekat.
    */

    if (sceneCaption) {
      sceneCaption.textContent =
        "aku mau kasih ini...";
    }


    husenCharacter?.classList.add(
      "is-near"
    );


    await wait(1450);


    if (
      runId !== introRunId
    ) {
      return;
    }


    /*
      3. Tangan Husen maju.
    */

    husenFlowerArm?.classList.add(
      "is-giving"
    );


    await wait(300);


    if (
      runId !== introRunId
    ) {
      return;
    }


    /*
      4. Bunga bergerak menuju Ike.
    */

    giftFlower?.classList.add(
      "is-moving"
    );


    if (sceneCaption) {
      sceneCaption.textContent =
        "ini buat kamu.";
    }


    await wait(950);


    if (
      runId !== introRunId
    ) {
      return;
    }


    /*
      5. Ike mengangkat tangan.
    */

    ikeFlowerArm?.classList.add(
      "is-receiving"
    );


    await wait(350);


    if (
      runId !== introRunId
    ) {
      return;
    }


    /*
      6. Bunga sekarang diterima Ike.
    */

    giftFlower?.classList.add(
      "is-given"
    );


    const ike =
      $(".character--ike");


    ike?.classList.add(
      "has-flower"
    );


    ikeCharacter?.classList.add(
      "is-happy"
    );


    if (sceneCaption) {
      sceneCaption.textContent =
        "buat kamu 🌷";
    }


    await wait(400);


    if (
      runId !== introRunId
    ) {
      return;
    }


    /*
      7. Heart kecil muncul.
    */

    stageHeart?.classList.add(
      "is-visible"
    );


    const stageRect =
      $("#characterStage")
        ?.getBoundingClientRect();


    if (stageRect) {
      heartBurst(
        stageRect.left +
          stageRect.width * 0.56,

        stageRect.top +
          stageRect.height * 0.36,

        7
      );
    }


    await wait(1200);


    if (
      runId !== introRunId
    ) {
      return;
    }


    introFinished =
      true;


    /*
      8. Masuk pertanyaan.
    */

    showScene(
      "questionScene"
    );
  }


  /* =========================================================
     SKIP INTRO
  ========================================================= */

  skipIntroButton?.addEventListener(
    "click",
    () => {
      completeIntroImmediately();


      window.setTimeout(() => {
        showScene(
          "questionScene"
        );
      }, 250);
    }
  );


  /* =========================================================
     NO BUTTON
  ========================================================= */

  const noButtonTexts = [
    "yakin?",
    "serius?",
    "masih gak?",
    "beneran?",
    ":("
  ];


  const noMessages = [
    "",
    "hmm...",
    "aku masih nunggu 😭",
    "tombol satunya makin gede tuh",
    "oke tombol ini menyerah."
  ];


  function handleNoButton() {
    noClickCount += 1;


    const textIndex =
      Math.min(
        noClickCount - 1,
        noButtonTexts.length - 1
      );


    if (noButton) {
      noButton.textContent =
        noButtonTexts[textIndex];


      const noScale =
        Math.max(
          0.12,
          1 -
            noClickCount * 0.18
        );


      noButton.style.transform =
        `scale(${noScale})`;
    }


    if (yesButton) {
      const yesScale =
        Math.min(
          1.65,
          1 +
            noClickCount * 0.13
        );


      yesButton.style.transform =
        `scale(${yesScale})`;
    }


    if (noMessage) {
      const messageIndex =
        Math.min(
          noClickCount - 1,
          noMessages.length - 1
        );


      noMessage.textContent =
        noMessages[messageIndex];
    }


    /*
      Setelah beberapa kali,
      tombol "gak" benar-benar hilang.
    */

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
    handleNoButton
  );


  /* =========================================================
     YES BUTTON
  ========================================================= */

  yesButton?.addEventListener(
    "click",
    (event) => {
      /*
        Cegah klik berkali-kali.
      */

      if (
        yesButton.dataset.clicked ===
        "true"
      ) {
        return;
      }


      yesButton.dataset.clicked =
        "true";


      yesButton.disabled =
        true;


      noButton?.setAttribute(
        "disabled",
        ""
      );


      const rect =
        yesButton.getBoundingClientRect();


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


        yesButton.disabled =
          false;


        yesButton.dataset.clicked =
          "false";
      }, 700);
    }
  );


  /* =========================================================
     ACCEPTED -> ENVELOPE
  ========================================================= */

  openEnvelopeSceneButton
    ?.addEventListener(
      "click",
      () => {
        showScene(
          "envelopeScene"
        );
      }
    );


  /* =========================================================
     ENVELOPE
  ========================================================= */

  let envelopeOpened =
    false;


  envelope?.addEventListener(
    "click",
    () => {
      if (
        envelopeOpened
      ) {
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
            "primary-button--hidden"
          );
      }, 700);
    }
  );


  /* =========================================================
     ENVELOPE -> LETTER
  ========================================================= */

  readLetterButton
    ?.addEventListener(
      "click",
      () => {
        showScene(
          "letterScene"
        );
      }
    );


  /* =========================================================
     LETTER -> THREE MESSAGES
  ========================================================= */

  memoryButton
    ?.addEventListener(
      "click",
      () => {
        showScene(
          "memoryScene"
        );
      }
    );


  /* =========================================================
     MEMORY CARDS
  ========================================================= */

  function updateMemoryProgress() {
    const total =
      memoryCards.length;


    const opened =
      openedCards.size;


    if (!memoryHint) {
      return;
    }


    if (total === 0) {
      memoryHint.textContent =
        "";

      return;
    }


    if (opened < total) {
      memoryHint.textContent =
        `${opened} dari ${total} pesan sudah dibuka`;

      return;
    }


    memoryHint.textContent =
      "udah kebuka semua ♡";


    finalButton?.classList.remove(
      "primary-button--hidden"
    );


    heartBurst(
      window.innerWidth / 2,
      window.innerHeight * 0.75,
      8
    );
  }


  memoryCards.forEach(
    (card, index) => {
      card.addEventListener(
        "click",
        () => {
          /*
            Setelah dibuka,
            kartu tetap terbuka.
          */

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


          updateMemoryProgress();
        }
      );
    }
  );


  /* =========================================================
     MEMORY -> FINAL
  ========================================================= */

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
            window.innerHeight * 0.38,
            15
          );
        }, 400);
      }
    );


  /* =========================================================
     RESET QUESTION
  ========================================================= */

  function resetQuestion() {
    noClickCount =
      0;


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

      yesButton.dataset.clicked =
        "false";
    }


    if (noMessage) {
      noMessage.textContent =
        "";
    }
  }


  /* =========================================================
     RESET ENVELOPE
  ========================================================= */

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
        "primary-button--hidden"
      );
  }


  /* =========================================================
     RESET CARDS
  ========================================================= */

  function resetMemoryCards() {
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


    finalButton?.classList.add(
      "primary-button--hidden"
    );
  }


  /* =========================================================
     REPLAY
  ========================================================= */

  replayButton?.addEventListener(
    "click",
    () => {
      /*
        Batalkan animasi intro
        yang mungkin masih hidup.
      */

      introRunId += 1;


      resetQuestion();

      resetEnvelope();

      resetMemoryCards();

      resetIntroVisuals();


      showScene(
        "flowerScene",
        {
          scroll: false
        }
      );


      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "auto"
      });


      window.setTimeout(() => {
        runIntroAnimation();
      }, 400);
    }
  );


  /* =========================================================
     OPTIONAL CLICK PARTICLE
  ========================================================= */

  document.addEventListener(
    "pointerdown",
    (event) => {
      const target =
        event.target;


      /*
        Particle kecil hanya untuk
        elemen interaktif.
      */

      if (
        target.closest(
          "button"
        )
      ) {
        createHeartParticle(
          event.clientX,
          event.clientY
        );
      }
    }
  );


  /* =========================================================
     KEYBOARD SUPPORT
  ========================================================= */

  document.addEventListener(
    "keydown",
    (event) => {
      /*
        Escape tidak melakukan apa-apa.
        Sengaja supaya scene tidak
        lompat-lompat aneh.
      */

      if (
        event.key === "Escape"
      ) {
        return;
      }
    }
  );
/* =========================================================
   INITIAL STATE
========================================================= */

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

updateProgress(
  currentSceneIndex
);

resetQuestion();

resetEnvelope();

resetMemoryCards();

resetIntroVisuals();


/* =========================================================
   START
========================================================= */

window.setTimeout(() => {
  runIntroAnimation();
}, 350);

});
