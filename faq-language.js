// faq-language.js

document.addEventListener("DOMContentLoaded", () => {
    // Translation dictionary for static text on the FAQ page.
    const translations = {
      fa: {
        faqTitle: "سوالات متداول",
        homePageBtn: "صفحه اصلی",
        getStartedBtn: "شروع کنید"
      },
      ps: {
        faqTitle: "پرله پسې پوښتنې",
        homePageBtn: "اصلي صفحه",
        getStartedBtn: "پیل کړئ"
      }
    };
  
    // FAQ data array: add more items here as needed.
    const faqData = [
      {
        question: {
          fa: "سوال ۱: Lorem ipsum dolor sit amet?",
          ps: "پوښتنه ۱: Lorem ipsum dolor sit amet?"
        },
        answer: {
          fa: "پاسخ ۱: اینجا توضیحات مربوط به سوال ۱ در زبان دری قرار می‌گیرد.",
          ps: "ځواب ۱: دلته د پوښتنې ۱ په اړه پښتو توضیحات لیکل شوي."
        }
      },
      {
        question: {
          fa: "سوال ۲: Consectetur adipiscing elit?",
          ps: "پوښتنه ۲: Consectetur adipiscing elit?"
        },
        answer: {
          fa: "پاسخ ۲: اینجا توضیحات مربوط به سوال ۲ در زبان دری قرار می‌گیرد.",
          ps: "ځواب ۲: دلته د پوښتنې ۲ په اړه پښتو توضیحات لیکل شوي."
        }
      },
      {
        question: {
          fa: "سوال ۳: Sed do eiusmod tempor incididunt?",
          ps: "پوښتنه ۳: Sed do eiusmod tempor incididunt?"
        },
        answer: {
          fa: "پاسخ ۳: اینجا توضیحات مربوط به سوال ۳ در زبان دری قرار می‌گیرد.",
          ps: "ځواب ۳: دلته د پوښتنې ۳ په اړه پښتو توضیحات لیکل شوي."
        }
      }
    ];
  
    // Set default language to Dari (fa) as the page is RTL.
    const defaultLang = "fa";
    let currentLang = localStorage.getItem("preferredLang") || defaultLang;
  
    // Elements for language switcher
    const langToggleBtn = document.getElementById("langToggleBtn");
    const langDropdown = document.getElementById("langDropdown");
    const selectedLangSpan = document.getElementById("selected-lang");
  
    // Always force document direction to RTL
    document.documentElement.setAttribute("dir", "rtl");
  
    // Function to update static text using data-i18n
    function applyStaticTranslations(lang) {
      document.querySelectorAll("[data-i18n]").forEach(el => {
        const key = el.getAttribute("data-i18n");
        if (translations[lang] && translations[lang][key]) {
          el.innerHTML = translations[lang][key];
        }
      });
    }
  
    // Function to render FAQ items dynamically based on current language
    function renderFaqItems(lang) {
      const faqContainer = document.getElementById("faq-items");
      faqContainer.innerHTML = ""; // Clear previous items
  
      faqData.forEach((item, index) => {
        // Create container for a single FAQ item
        const faqItem = document.createElement("div");
        faqItem.classList.add("faq-item");
        
        // Create question button
        const questionBtn = document.createElement("button");
        questionBtn.classList.add("faq-question");
        // Set question text based on current language
        questionBtn.textContent = item.question[lang] || "";
        
        // Create answer container
        const answerDiv = document.createElement("div");
        answerDiv.classList.add("faq-answer");
        answerDiv.textContent = item.answer[lang] || "";
        
        // Append question and answer to faq item container
        faqItem.appendChild(questionBtn);
        faqItem.appendChild(answerDiv);
        
        // Append the faq item to the main container
        faqContainer.appendChild(faqItem);
  
        // Add toggle functionality for the FAQ item
        questionBtn.addEventListener("click", () => {
          questionBtn.classList.toggle("active");
          answerDiv.classList.toggle("open");
        });
      });
    }
  
    // Function to apply language changes to the entire page
    function applyLanguage(lang) {
      currentLang = lang;
      // Update switcher label
      let label = "دری";
      if (lang === "ps") label = "پښتو";
      selectedLangSpan.textContent = label;
  
      // Update static text
      applyStaticTranslations(lang);
      // Render FAQ items with the chosen language
      renderFaqItems(lang);
  
      // Save user preference
      localStorage.setItem("preferredLang", lang);
    }
  
    // Toggle the language dropdown when clicking the toggle button
    langToggleBtn.addEventListener("click", () => {
      langDropdown.classList.toggle("hidden");
    });
  
    // Setup event listeners on the language options
    langDropdown.querySelectorAll(".lang-option").forEach(btn => {
      btn.addEventListener("click", (evt) => {
        const newLang = evt.target.getAttribute("data-lang");
        langDropdown.classList.add("hidden");
        applyLanguage(newLang);
      });
    });
  
    // Close dropdown when clicking outside the switcher
    document.addEventListener("click", (e) => {
      if (!langToggleBtn.contains(e.target) && !langDropdown.contains(e.target)) {
        langDropdown.classList.add("hidden");
      }
    });
  
    // Initialize page with stored or default language
    applyLanguage(currentLang);
  });
  