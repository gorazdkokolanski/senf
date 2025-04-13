document.addEventListener("DOMContentLoaded", () => {
  // Translation dictionary contains translations for Dari ("fa") and Pashto ("ps")
  const translations = {
    fa: {
      newsUpdate: "اخبار/تازه‌ها",
      kankorResults: "نتایج کانکور",
      kankorSubjects: "مضامین کانکور",
      questionBank: "بانک سوالات",
      exams: "امتحانات",
      faqs: "سوالات متداول",
      mainTitle: "آموزش کانکور<br>افغانستان",
      getStarted: "شروع کنید",
      privacy: "پالیسی حریم خصوصی"
    },
    ps: {
      newsUpdate: "خبرونه/تازه",
      kankorResults: "د کانکور نتایج",
      kankorSubjects: "د کانکور مضامین",
      questionBank: "د سوالاتو بانک",
      exams: "امتحانات",
      faqs: "پرله پسې پوښتنې",
      mainTitle: "د افغانستان<br>کانکور زده کړه",
      getStarted: "پیل کړئ",
      privacy: "د محرمیت تګلاره"
    }
  };

  // Set default language to Dari (fa) because the page is always RTL.
  const defaultLang = "fa";
  let currentLang = localStorage.getItem("preferredLang") || defaultLang;
  
  // Get language switcher elements.
  const langToggleBtn = document.getElementById("langToggleBtn");
  const langDropdown = document.getElementById("langDropdown");
  const selectedLangSpan = document.getElementById("selected-lang");
  
  // Force document direction to RTL.
  document.documentElement.setAttribute("dir", "rtl");
  
  // Function to apply the language changes to all text elements.
  function applyLanguage(lang) {
    currentLang = lang;
    // Update the label shown on the language toggle button.
    let label = "دری";
    if (lang === "ps") label = "پښتو";
    selectedLangSpan.textContent = label;
  
    // Update all elements that have a data-i18n attribute.
    document.querySelectorAll("[data-i18n]").forEach(el => {
      const key = el.getAttribute("data-i18n");
      if (translations[lang][key]) {
        el.innerHTML = translations[lang][key];
      }
    });
  
    // Save the selected language so it persists on future visits.
    localStorage.setItem("preferredLang", lang);
  }
  
  // Toggle dropdown visibility when the language button is clicked.
  langToggleBtn.addEventListener("click", () => {
    langDropdown.classList.toggle("hidden");
  });
  
  // Set event listeners on language options.
  langDropdown.querySelectorAll(".lang-option").forEach(btn => {
    btn.addEventListener("click", (evt) => {
      const newLang = evt.target.getAttribute("data-lang");
      langDropdown.classList.add("hidden");
      applyLanguage(newLang);
    });
  });
  
  // Close the dropdown if the user clicks outside of it.
  document.addEventListener("click", (e) => {
    if (!langToggleBtn.contains(e.target) && !langDropdown.contains(e.target)) {
      langDropdown.classList.add("hidden");
    }
  });
  
  // Initialize the page with the stored or default language.
  applyLanguage(currentLang);
});
