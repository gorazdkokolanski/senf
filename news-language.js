// news-language.js

document.addEventListener("DOMContentLoaded", () => {
    // Translation dictionary for static texts on the news page
    const translations = {
      fa: {
        newsHeading: "خبرها",
        homePageBtn: "صفحه اصلی",
        getStartedBtn: "شروع کنید"
      },
      ps: {
        newsHeading: "خبرونه",
        homePageBtn: "اصلي صفحه",
        getStartedBtn: "پیل کړئ"
      }
    };
  
    // Array of news items.
    // In the future, to add more news items, just add additional objects to this array.
    const newsData = [
      {
        date: "8.4.2025",
        title: {
          fa: "عنوان خبر ۱",
          ps: "د خبر ۱ سرلیک"
        },
        description: {
          fa: "توضیحات خبر ۱ به زبان دری. توضیحات خبر ۱ به زبان دری.",
          ps: "د خبر ۱ تفصیل په پښتو. د خبر ۱ تفصیل په پښتو."
        }
      },
      {
        date: "8.4.2025",
        title: {
          fa: "عنوان خبر ۲",
          ps: "د خبر ۲ سرلیک"
        },
        description: {
          fa: "توضیحات خبر ۲ به زبان دری. توضیحات خبر ۲ به زبان دری.",
          ps: "د خبر ۲ تفصیل په پښتو. د خبر ۲ تفصیل په پښتو."
        }
      },
      {
        date: "8.4.2025",
        title: {
          fa: "عنوان خبر ۳",
          ps: "د خبر ۳ سرلیک"
        },
        description: {
          fa: "توضیحات خبر ۳ به زبان دری. توضیحات خبر ۳ به زبان دری.",
          ps: "د خبر ۳ تفصیل په پښتو. د خبر ۳ تفصیل په پښتو."
        }
      }
    ];
  
    // Set default language to Dari (fa)
    const defaultLang = "fa";
    let currentLang = localStorage.getItem("preferredLang") || defaultLang;
  
    // Get elements for language switcher
    const langToggleBtn = document.getElementById("langToggleBtn");
    const langDropdown = document.getElementById("langDropdown");
    const selectedLangSpan = document.getElementById("selected-lang");
  
    // Always force document direction to RTL
    document.documentElement.setAttribute("dir", "rtl");
  
    // Function to update static elements with data-i18n attributes
    function applyStaticTranslations(lang) {
      document.querySelectorAll("[data-i18n]").forEach(el => {
        const key = el.getAttribute("data-i18n");
        if (translations[lang] && translations[lang][key]) {
          el.innerHTML = translations[lang][key];
        }
      });
    }
  
    // Function to render news items dynamically
    function renderNewsItems(lang) {
      const newsContainer = document.getElementById("news-items");
      newsContainer.innerHTML = ""; // Clear existing items
  
      newsData.forEach(item => {
        // Create news item container
        const newsDiv = document.createElement("div");
        newsDiv.classList.add("new");
  
        // Date (assumed constant for both languages)
        const dateDiv = document.createElement("div");
        dateDiv.classList.add("news-date");
        dateDiv.textContent = item.date;
        newsDiv.appendChild(dateDiv);
  
        // Title
        const titleDiv = document.createElement("div");
        titleDiv.classList.add("news-title");
        titleDiv.textContent = item.title[lang] || "";
        newsDiv.appendChild(titleDiv);
  
        // Description
        const descDiv = document.createElement("div");
        descDiv.classList.add("news-description");
        descDiv.textContent = item.description[lang] || "";
        newsDiv.appendChild(descDiv);
  
        // Append news item to container
        newsContainer.appendChild(newsDiv);
      });
    }
  
    // Function to apply language changes throughout the page
    function applyLanguage(lang) {
      currentLang = lang;
      // Update the switcher label
      let label = "دری";
      if (lang === "ps") label = "پښتو";
      selectedLangSpan.textContent = label;
  
      // Update static translations using data-i18n keys
      applyStaticTranslations(lang);
  
      // Render news items from the newsData array
      renderNewsItems(lang);
  
      // Save user preference to localStorage
      localStorage.setItem("preferredLang", lang);
    }
  
    // Toggle the dropdown when the user clicks the language button
    langToggleBtn.addEventListener("click", () => {
      langDropdown.classList.toggle("hidden");
    });
  
    // Set event listeners on language option buttons
    langDropdown.querySelectorAll(".lang-option").forEach(btn => {
      btn.addEventListener("click", (evt) => {
        const newLang = evt.target.getAttribute("data-lang");
        langDropdown.classList.add("hidden");
        applyLanguage(newLang);
      });
    });
  
    // Close the dropdown if clicking outside of it
    document.addEventListener("click", (e) => {
      if (!langToggleBtn.contains(e.target) && !langDropdown.contains(e.target)) {
        langDropdown.classList.add("hidden");
      }
    });
  
    // Initialize page with stored or default language
    applyLanguage(currentLang);
  });
  