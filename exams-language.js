document.addEventListener("DOMContentLoaded", () => {
  // --- Translation dictionary for static texts on the exams page ---
  const translations = {
    fa: {
      examsHeading: "کانکور امتحانات",
      homePageBtn: "صفحه اصلی",
      getStartedBtn: "شروع کنید"
    },
    ps: {
      examsHeading: "د کانکور امتحانات",
      homePageBtn: "اصلي صفحه",
      getStartedBtn: "پیل کړئ"
    }
  };

  // --- Exams Data Array (with color property) ---
  // To add more exam objects later, simply add new objects to this array.
  const examsData = [
    {
      id: "exam-1",
      image: "img/exam.png",
      title: { fa: "Exam 1", ps: "امتحان ۱" },
      description: { 
        fa: "Text below subject text for subject text below subject text...", 
        ps: "Text below subject text for subject text below subject text..." 
      },
      color: "#457DBF"
    },
    {
      id: "exam-2",
      image: "img/exam.png",
      title: { fa: "Exam 2", ps: "امتحان ۲" },
      description: { 
        fa: "Text below subject text...", 
        ps: "Text below subject text..." 
      },
      color: "#413794"
    },
    {
      id: "exam-3",
      image: "img/exam.png",
      title: { fa: "Exam 3", ps: "امتحان ۳" },
      description: { 
        fa: "Text below subject text...", 
        ps: "Text below subject text..." 
      },
      color: "#90277E"
    },
    {
      id: "exam-4",
      image: "img/exam.png",
      title: { fa: "Exam 4", ps: "امتحان ۴" },
      description: { 
        fa: "Text below subject text... Text below subject text... Text below subject text...", 
        ps: "Text below subject text... Text below subject text... Text below subject text..." 
      },
      color: "#0C7D7A"
    }
  ];

  // --- Retrieve current language (default to Dari "fa") ---
  const defaultLang = "fa";
  let currentLang = localStorage.getItem("preferredLang") || defaultLang;

  // --- Get container elements ---
  const mobileWrapper = document.getElementById("exams-mobile");
  const desktopContainer = document.getElementById("exams-desktop");
  const overlay = document.querySelector(".overlay");

  // --- Get language switcher elements (for this page) ---
  const langToggleBtn = document.getElementById("langToggleBtn");
  const langDropdown = document.getElementById("langDropdown");
  const selectedLangSpan = document.getElementById("selected-lang");

  // Force document direction to always be RTL
  document.documentElement.setAttribute("dir", "rtl");

  // --- Function to update static texts using data-i18n attributes ---
  function updateStaticTexts(lang) {
    document.querySelectorAll("[data-i18n]").forEach(el => {
      const key = el.getAttribute("data-i18n");
      if (translations[lang] && translations[lang][key]) {
        el.innerHTML = translations[lang][key];
      }
    });
  }

  // --- Function to create an exam card element ---
  function createExamCard(exam, lang) {
    const card = document.createElement("div");
    card.classList.add("subject-card");
    card.classList.add(exam.id);

    const cardInner = document.createElement("div");
    cardInner.classList.add("card-inner");

    // Create front side
    const front = document.createElement("div");
    front.classList.add("subject-card-front");
    front.style.backgroundColor = exam.color; // Apply exam color to front

    const frontImgDiv = document.createElement("div");
    const img = document.createElement("img");
    img.src = exam.image;
    img.alt = "subject";
    frontImgDiv.appendChild(img);

    const frontTitle = document.createElement("div");
    frontTitle.textContent = exam.title[lang] || "";
    front.appendChild(frontImgDiv);
    front.appendChild(frontTitle);

    // Create back side
    const back = document.createElement("div");
    back.classList.add("subject-card-back");
    back.style.backgroundColor = exam.color; // Apply exam color to back

    const backTitle = document.createElement("div");
    backTitle.textContent = exam.title[lang] || "";
    const description = document.createElement("div");
    description.textContent = exam.description[lang] || "";
    back.appendChild(backTitle);
    back.appendChild(description);

    // Assemble card inner and add to card
    cardInner.appendChild(front);
    cardInner.appendChild(back);
    card.appendChild(cardInner);

    // --- Flip/Overlay Functionality ---
    // On desktop (>1024px) the card scales and centers before flipping.
    // On both desktop and mobile, set the height of .card-inner to:
    // (height of .subject-card-back > div:nth-child(1)) + (height of .subject-card-back > div:nth-child(2)) + 30
    card.addEventListener("click", function () {
      if (card.classList.contains("active")) {
        if (window.innerWidth > 1024) {
          card.style.transform = "translate(0, 0) scale(1)";
        } else {
          card.querySelector(".card-inner").style.height = "";
        }
        card.querySelector(".card-inner").classList.remove("flip");
        setTimeout(() => {
          card.classList.remove("active");
        }, 500);
        overlay.classList.remove("active");
        return;
      }
      if (window.innerWidth > 1024) {
        const rect = card.getBoundingClientRect();
        const cardCenterX = rect.left + rect.width / 2;
        const cardCenterY = rect.top + rect.height / 2;
        const viewportCenterX = window.innerWidth / 2;
        const viewportCenterY = window.innerHeight / 2;
        const deltaX = viewportCenterX - cardCenterX;
        const deltaY = viewportCenterY - cardCenterY;
        card.style.transition = "transform 0.5s ease";
        card.style.transform = `translate(${deltaX}px, ${deltaY}px) scale(1.2)`;
      } else {
        // Mobile (or all cases): adjust .card-inner height to be:
        // height of first child of .subject-card-back + height of second child + 30 px
        const backElement = card.querySelector(".subject-card-back");
        const cardInner = card.querySelector(".card-inner");
        if (backElement && backElement.children.length >= 2) {
          const firstDivHeight = backElement.children[0].getBoundingClientRect().height;
          const secondDivHeight = backElement.children[1].getBoundingClientRect().height;
          const totalHeight = firstDivHeight + secondDivHeight + 30;
          cardInner.style.height = totalHeight + "px";
        } else {
          cardInner.style.height = cardInner.scrollHeight + "px";
        }
      }
      card.classList.add("active");
      card.querySelector(".card-inner").classList.add("flip");
      overlay.classList.add("active");
    });
    return card;
  }

  // --- Function to render exam cards into both containers ---
  function renderExams(lang) {
    mobileWrapper.innerHTML = "";
    desktopContainer.innerHTML = "";
    examsData.forEach(exam => {
      // Mobile: create card and wrap it in a swiper-slide
      const mobileCard = createExamCard(exam, lang);
      const slide = document.createElement("div");
      slide.classList.add("swiper-slide");
      slide.appendChild(mobileCard);
      mobileWrapper.appendChild(slide);
      // Desktop: create a separate instance and append directly
      const desktopCard = createExamCard(exam, lang);
      desktopContainer.appendChild(desktopCard);
    });
  }

  // --- Function to apply language changes (updating static texts and exam cards) ---
  function applyExamsLanguage(lang) {
    currentLang = lang;
    updateStaticTexts(lang);
    renderExams(lang);
    localStorage.setItem("preferredLang", lang);
    // Reinitialize the mobile Swiper after rendering content
    setTimeout(() => {
      if (typeof Swiper !== "undefined") {
        new Swiper(".mobile-swiper", {
          slidesPerView: "auto",
          spaceBetween: 20,
          pagination: {
            el: ".swiper-pagination",
            clickable: true
          }
        });
      }
    }, 0);
  }

  // Expose the update function globally for external language switching
  window.updateExamsLanguage = applyExamsLanguage;

  // --- Language Switcher Functionality ---
  langToggleBtn.addEventListener("click", () => {
    langDropdown.classList.toggle("hidden");
  });
  langDropdown.querySelectorAll(".lang-option").forEach(btn => {
    btn.addEventListener("click", (evt) => {
      const newLang = evt.target.getAttribute("data-lang");
      langDropdown.classList.add("hidden");
      applyExamsLanguage(newLang);
      let label = "دری";
      if (newLang === "ps") label = "پښتو";
      selectedLangSpan.textContent = label;
    });
  });
  document.addEventListener("click", (e) => {
    if (!langToggleBtn.contains(e.target) && !langDropdown.contains(e.target)) {
      langDropdown.classList.add("hidden");
    }
  });

  // Initialize the page with stored or default language
  applyExamsLanguage(currentLang);

  // Attach an event listener to the overlay to close any active card
  overlay.addEventListener("click", () => {
    const activeCard = document.querySelector(".subject-card.active");
    if (activeCard) {
      if (window.innerWidth > 1024) {
        activeCard.style.transform = "translate(0, 0) scale(1)";
      } else {
        activeCard.querySelector(".card-inner").style.height = "";
      }
      activeCard.querySelector(".card-inner").classList.remove("flip");
      setTimeout(() => {
        activeCard.classList.remove("active");
      }, 500);
    }
    overlay.classList.remove("active");
  });
});
