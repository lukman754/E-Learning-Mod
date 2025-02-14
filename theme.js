// theme.js
const darkTheme = `
    html, body {
    height: 100%;
    color: #e0e0e0;
  }

  * {
    color: black;
  }
    
  /* Membalik warna halaman kecuali gambar & video */
  html {
    filter: invert(1) hue-rotate(180deg);
  }

  /* Mengembalikan warna asli gambar & video */
  img, video, iframe {
    filter: invert(1) hue-rotate(180deg) !important;
  }

`;

class ThemeManager {
  constructor() {
    this.darkModeStyleSheet = null;
    this.init();
  }

  init() {
    // Cek tema yang tersimpan
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      this.enableDarkMode();
    }

    // Tambahkan tombol toggle
    this.createToggleButton();
  }

  createToggleButton() {
    const userMenu = document.querySelector(".usermenu");
    if (userMenu) {
      const toggleBtn = document.createElement("button");
      toggleBtn.innerHTML =
        localStorage.getItem("theme") === "dark" ? "☀️" : "🌙";
      toggleBtn.className = "theme-toggle-btn";
      toggleBtn.style.cssText = `
        margin-left: 10px;
        padding: 5px 10px;
        border: none;
        border-radius: 5px;
        background: transparent;
        cursor: pointer;
      `;

      toggleBtn.addEventListener("click", () => this.toggleTheme());
      userMenu.appendChild(toggleBtn);
    }
  }

  enableDarkMode() {
    if (!this.darkModeStyleSheet) {
      this.darkModeStyleSheet = document.createElement("style");
      this.darkModeStyleSheet.id = "dark-theme-style";
      this.darkModeStyleSheet.textContent = darkTheme;
      document.head.appendChild(this.darkModeStyleSheet);
    }
    localStorage.setItem("theme", "dark");
    this.updateToggleButton("☀️");
  }

  disableDarkMode() {
    if (this.darkModeStyleSheet) {
      this.darkModeStyleSheet.remove();
      this.darkModeStyleSheet = null;
    }
    localStorage.setItem("theme", "light");
    this.updateToggleButton("🌙");
  }

  toggleTheme() {
    if (localStorage.getItem("theme") === "dark") {
      this.disableDarkMode();
    } else {
      this.enableDarkMode();
    }
  }

  updateToggleButton(icon) {
    const toggleBtn = document.querySelector(".theme-toggle-btn");
    if (toggleBtn) {
      toggleBtn.innerHTML = icon;
    }
  }
}

// Inisialisasi Theme Manager
window.addEventListener("load", () => {
  new ThemeManager();
});

let theme = document.createElement("style");
theme.innerText = `

  /* vercel login button*/
  .navbar.fixed-top .usermenu .login a{
    background-color: #4d94ff;
    text-decoration: none;
    color: white;
    padding: 5px 10px;
    font-weight: bold;
    box-shadow: 0 4px 15px rgba(77, 148, 255, 0.4);
    border-radius: 5px;
  }

`;
document.head.appendChild(theme);
