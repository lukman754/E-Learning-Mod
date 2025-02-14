(function () {
  // Remove existing body classes and reset page
  document.body.className = "";
  document.body.style.cssText =
    'margin: 0; padding: 0; font-family: inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;';

  // Create main container
  const mainContainer = document.createElement("div");
  mainContainer.style.cssText = `
        display: flex;
        height: 100vh;
        width: 100vw;
        background: linear-gradient(135deg, #f0f9ff 0%, #cbebff 50%, #f0f9ff 100%);
        overflow: hidden;
    `;

  // Left side - Full Cover Background Image
  const leftSection = document.createElement("div");
  leftSection.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-image: url('https://c4.wallpaperflare.com/wallpaper/42/400/40/anime-blue-hair-school-uniform-ayanami-rei-wallpaper-preview.jpg');
        background-size: cover;
        background-position: center;
        opacity: 0.5;
        z-index: 1;
    `;
  mainContainer.appendChild(leftSection);

  // Right side - Login Form Section
  const rightSection = document.createElement("div");
  rightSection.style.cssText = `
        position: relative;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 2;
        background: rgba(255,255,255,0.8);
        backdrop-filter: blur(10px);
    `;

  // Login Form
  const loginForm = document.createElement("div");
  loginForm.style.cssText = `
        width: 90%;
        max-width: 400px;
        padding: 40px;
        border-radius: 12px;
        background-color: white;
        box-shadow: 0 10px 25px -3px rgba(0,0,0,0.1);
    `;

  // Logo and Title
  const logoContainer = document.createElement("div");
  logoContainer.style.cssText = `
        display: flex;
        align-items: center;
        margin-bottom: 30px;
    `;
  const logo = document.querySelector("#logoimage").cloneNode(true);
  logo.style.cssText = `
        width: 50px;
        height: 50px;
        margin-right: 15px;
    `;
  const title = document.createElement("h1");
  title.textContent = "E-Learning Mod";
  title.style.cssText = `
        font-size: 1.5rem;
        font-weight: 600;
        color: #111827;
    `;
  logoContainer.appendChild(logo);
  logoContainer.appendChild(title);

  // Original Login Form
  const originalForm = document.querySelector("#login");
  originalForm.style.cssText = `
        display: flex;
        flex-direction: column;
        gap: 15px;
    `;

  // Input Styling
  const inputs = originalForm.querySelectorAll("input");
  inputs.forEach((input) => {
    input.style.cssText = `
            width: 100%;
            padding: 10px;
            border: 1px solid #e5e7eb;
            border-radius: 6px;
            transition: border-color 0.3s ease;
        `;
    input.addEventListener("focus", () => {
      input.style.borderColor = "#3b82f6";
      input.style.outline = "none";
    });
    input.addEventListener("blur", () => {
      input.style.borderColor = "#e5e7eb";
    });
  });

  // Button Styling
  const buttons = originalForm.querySelectorAll("button");
  buttons.forEach((button) => {
    button.style.cssText = `
            width: 100%;
            padding: 12px;
            background-color: #3b82f6;
            color: white;
            border: none;
            border-radius: 6px;
            cursor: pointer;
            transition: background-color 0.3s ease;
        `;
    button.addEventListener("mouseenter", () => {
      button.style.backgroundColor = "#2563eb";
    });
    button.addEventListener("mouseleave", () => {
      button.style.backgroundColor = "#3b82f6";
    });
  });

  // Forgot Password Link
  const forgotPasswordLink = originalForm.querySelector(
    ".login-form-forgotpassword a"
  );
  forgotPasswordLink.style.cssText = `
        color: #6b7280;
        text-decoration: none;
        transition: color 0.3s ease;
    `;
  forgotPasswordLink.addEventListener("mouseenter", () => {
    forgotPasswordLink.style.color = "#3b82f6";
  });
  forgotPasswordLink.addEventListener("mouseleave", () => {
    forgotPasswordLink.style.color = "#6b7280";
  });

  // Responsive Media Query
  const style = document.createElement("style");
  style.textContent = `
        @media (max-width: 768px) {
            #mainContainer {
                flex-direction: column;
            }
            #leftSection {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-size: cover;
                opacity: 0.2;
            }
            #rightSection {
                width: 100%;
                height: 100%;
                background: rgba(255,255,255,0.5);
            }
            #loginForm {
                width: 90%;
                padding: 20px;
            }
            .toggle-sensitive-btn{
            display: none;}
        }
    `;
  document.head.appendChild(style);

  // Assemble Login Form
  loginForm.appendChild(logoContainer);
  loginForm.appendChild(originalForm);

  // Assemble Sections
  rightSection.appendChild(loginForm);
  mainContainer.appendChild(leftSection);
  mainContainer.appendChild(rightSection);

  // Replace existing page content
  document.body.innerHTML = "";
  mainContainer.id = "mainContainer";
  leftSection.id = "leftSection";
  rightSection.id = "rightSection";
  loginForm.id = "loginForm";
  document.body.appendChild(mainContainer);
})();
