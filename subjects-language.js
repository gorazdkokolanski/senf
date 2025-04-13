document.addEventListener("DOMContentLoaded", () => {
  // --- Translation dictionary for static texts on this page ---
  const translations = {
    fa: {
      subjectsHeading: "کانکور مضامین",
      homePageBtn: "صفحه اصلی",
      getStartedBtn: "شروع کنید"
    },
    ps: {
      subjectsHeading: "د کانکور مضامین",
      homePageBtn: "اصلي صفحه",
      getStartedBtn: "پیل کړئ"
    }
  };

  // --- Subjects Data Array (with color property) ---
  // To add more subjects later, simply add new objects to this array.
  const subjectsData = [
    {
      id: "subject-1",
      image: "img/Math.png",
      title: { fa: "ریاضی", ps: "ریاضي" },
      description: {
        fa: "این یک متن آزمایشی است که برای بررسی عملکرد کارت، ارتفاع و قابلیت نمایش کامل توضیحات به کار می‌رود. هدف از تولید این متن، ایجاد یک مقدار بزرگ از کلمات به گونه‌ای است که بتوانیم اطمینان حاصل کنیم که طراحی صفحه به درستی عمل می‌کند و کاربر می‌تواند تمام اطلاعات را بدون قطعی مشاهده نماید. این متن شامل چندین جمله متفاوت است و تعدادی از اصطلاحات، کلمات و عبارات متنوع به منظور شبیه‌سازی محتوای واقعی به کار رفته‌اند. ما انتظار داریم که طول این توضیحات به طور قابل توجهی از حد معمول بیشتر باشد، بنابراین طراحی باید بدون ایجاد خطا، ارتفاع کارت را تنظیم کند. در صورتی که محتوای صفحه دارای توضیحات بیش از 150 کلمه باشد، باید بتواند به صورت خودکار اندازه خود را افزایش داده و تمامی اطلاعات را نمایش دهد. این امکان باعث می‌شود که کاربران بتوانند به راحتی تمام جزییات موجود را بخوانند و تجربه کاربری بهتری داشته باشند. طراحی رابط کاربری نیز باید قابلیت پاسخگویی به این تغییرات را داشته باشد تا در هر شرایطی، نمایش محتوا به بهترین نحو انجام گیرد. امیدواریم که با استفاده از این متن، بتوانیم مشکل ارتفاع کارت را به خوبی شناسایی و رفع نماییم.",
        ps: "د ریاضي لپاره لنډ توضیحات."
      },
      color: "#457DBF"
    },
    {
      id: "subject-2",
      image: "img/Chemistry.png",
      title: { fa: "شیمی", ps: "کيميا" },
      description: {
        fa: "توضیحات مربوط به شیمی.",
        ps: "د کيميا توضیحات."
      },
      color: "#413794"
    },
    {
      id: "subject-3",
      image: "img/Biology.png",
      title: { fa: "زیست شناسی", ps: "بيولوژي" },
      description: {
        fa: "توضیحات مربوط به زیست شناسی.",
        ps: "د بيولوژي توضیحات."
      },
      color: "#90277E"
    },
    {
      id: "subject-4",
      image: "img/Physics.png",
      title: { fa: "فیزیک", ps: "فيزکس" },
      description: {
        fa: "توضیحات مربوط به فیزیک.",
        ps: "د فيزکس توضیحات."
      },
      color: "#0C7D7A"
    }
  ];

  // --- Retrieve current language (default to Dari "fa") ---
  const defaultLang = "fa";
  let currentLang = localStorage.getItem("preferredLang") || defaultLang;

  // --- Get container elements ---
  const mobileWrapper = document.getElementById("subjects-mobile");
  const desktopContainer = document.getElementById("subjects-desktop");
  const overlay = document.querySelector(".overlay");

  // --- Get language switcher elements (if present on this page) ---
  const langToggleBtn = document.getElementById("langToggleBtn");
  const langDropdown = document.getElementById("langDropdown");
  const selectedLangSpan = document.getElementById("selected-lang");

  // Force document direction to always be RTL
  document.documentElement.setAttribute("dir", "rtl");

  // --- Function to create a subject card element ---
  function createSubjectCard(subject, lang) {
    const card = document.createElement("div");
    card.classList.add("subject-card");
    card.classList.add(subject.id);

    const cardInner = document.createElement("div");
    cardInner.classList.add("card-inner");

    // Create front side
    const front = document.createElement("div");
    front.classList.add("subject-card-front");
    // Apply subject color to front
    front.style.backgroundColor = subject.color;

    const frontImgDiv = document.createElement("div");
    const img = document.createElement("img");
    img.src = subject.image;
    img.alt = "subject";
    frontImgDiv.appendChild(img);

    const frontTitle = document.createElement("div");
    frontTitle.textContent = subject.title[lang] || "";
    front.appendChild(frontImgDiv);
    front.appendChild(frontTitle);

    // Create back side
    const back = document.createElement("div");
    back.classList.add("subject-card-back");
    // Apply subject color to back
    back.style.backgroundColor = subject.color;

    const backTitle = document.createElement("div");
    backTitle.textContent = subject.title[lang] || "";
    const description = document.createElement("div");
    description.textContent = subject.description[lang] || "";
    back.appendChild(backTitle);
    back.appendChild(description);

    // Assemble card inner and add to card
    cardInner.appendChild(front);
    cardInner.appendChild(back);
    card.appendChild(cardInner);

    // --- Flip/Overlay Functionality ---
    // On desktop (window.innerWidth > 1024) the card scales and centers before flipping.
    // On both desktop and mobile, set the height of .subject-card-back to be:
    // (height of the first div child) + (height of the second div child) + 30px.
    

    card.addEventListener("click", function () {
      if (card.classList.contains("active")) {
        if (window.innerWidth > 1024) {
          card.style.transform = "translate(0, 0) scale(1)";
        } else {
          card.querySelector(".subject-card-back").style.height = "";
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
      }
      // Calculate the desired height for .subject-card-back:
      const backElement = card.querySelector(".subject-card-back");
      if (backElement && backElement.children.length >= 2) {
        const firstDivHeight = backElement.children[0].getBoundingClientRect().height;
        const secondDivHeight = backElement.children[1].getBoundingClientRect().height;
        const totalHeight = firstDivHeight + secondDivHeight + 30;
        backElement.style.height = totalHeight + "px";
      } else {
        backElement.style.height = backElement.scrollHeight + "px";
      }
      card.classList.add("active");
      card.querySelector(".card-inner").classList.add("flip");
      overlay.classList.add("active");
    });
    return card;
  }

  // --- Function to render subject cards into both containers ---
  function renderSubjects(lang) {
    // Clear existing content
    mobileWrapper.innerHTML = "";
    desktopContainer.innerHTML = "";
    subjectsData.forEach(subject => {
      // Create a subject card for mobile, wrap it in a swiper-slide
      const mobileCard = createSubjectCard(subject, lang);
      const slide = document.createElement("div");
      slide.classList.add("swiper-slide");
      slide.appendChild(mobileCard);
      mobileWrapper.appendChild(slide);
      // Create a separate instance for desktop and append directly
      const desktopCard = createSubjectCard(subject, lang);
      desktopContainer.appendChild(desktopCard);
    });
  }

  // --- Function to update static texts based on data-i18n attributes ---
  function updateStaticTexts(lang) {
    document.querySelectorAll("[data-i18n]").forEach(el => {
      const key = el.getAttribute("data-i18n");
      if (translations[lang] && translations[lang][key]) {
        el.innerHTML = translations[lang][key];
      }
    });
  }

  // --- Main function to apply language changes and render subjects ---
  function applySubjectsLanguage(lang) {
    currentLang = lang;
    updateStaticTexts(lang);
    renderSubjects(lang);
    localStorage.setItem("preferredLang", lang);
    // Reinitialize Swiper for the mobile container after rendering content
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

  // Expose this function globally for external language switching
  window.updateSubjectsLanguage = applySubjectsLanguage;

  // --- Language Switcher Functionality (if present on the page) ---
  if (langToggleBtn && langDropdown && selectedLangSpan) {
    // Toggle dropdown on button click
    langToggleBtn.addEventListener("click", () => {
      langDropdown.classList.toggle("hidden");
    });
    // Set up event listeners on each language option
    langDropdown.querySelectorAll(".lang-option").forEach(btn => {
      btn.addEventListener("click", (evt) => {
        const newLang = evt.target.getAttribute("data-lang");
        langDropdown.classList.add("hidden");
        applySubjectsLanguage(newLang);
        // Update switcher label
        let label = "دری";
        if (newLang === "ps") label = "پښتو";
        selectedLangSpan.textContent = label;
      });
    });
    // Close dropdown when clicking outside
    document.addEventListener("click", (e) => {
      if (!langToggleBtn.contains(e.target) && !langDropdown.contains(e.target)) {
        langDropdown.classList.add("hidden");
      }
    });
  }

  // Initialize the page with stored or default language
  applySubjectsLanguage(currentLang);

  // Attach an event listener to the overlay to close any active card
  overlay.addEventListener("click", () => {
    const activeCard = document.querySelector(".subject-card.active");
    if (activeCard) {
      if (window.innerWidth > 1024) {
        activeCard.style.transform = "translate(0, 0) scale(1)";
      } else {
        activeCard.querySelector(".subject-card-back").style.height = "";
      }
      activeCard.querySelector(".card-inner").classList.remove("flip");
      setTimeout(() => {
        activeCard.classList.remove("active");
      }, 500);
    }
    overlay.classList.remove("active");
  });
});
