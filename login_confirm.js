(function () {
  // Reset body styles
  document.body.style.cssText = `
        margin: 0;
        padding: 0;
        font-family: inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 100vh;
        
        background: linear-gradient(135deg, #f0f9ff 0%, #cbebff 50%, #f0f9ff 100%);
    `;

  // Find the modal content
  const modalContent = document.querySelector("#modal-content");
  if (!modalContent) return;

  // Create new container
  const container = document.createElement("div");
  container.style.cssText = `
        width: 100%;
        max-width: 400px;
        background: white;
        border-radius: 12px;
        box-shadow: 0 10px 25px -3px rgba(0,0,0,0.1);
        padding: 30px;
        text-align: center;
    `;

  // Create warning icon
  const icon = document.createElement("div");
  icon.innerHTML = "⚠️";
  icon.style.cssText = `
        font-size: 4rem;
        margin-bottom: 20px;
    `;

  // Create header
  const header = document.createElement("h2");
  header.textContent = "Login Confirmation";
  header.style.cssText = `
        color: #333;
        margin-bottom: 15px;
        font-size: 1.5rem;
    `;

  // Create message
  const message = document.createElement("p");
  message.textContent = document.querySelector("#modal-body p").textContent;
  message.style.cssText = `
        color: #666;
        margin-bottom: 25px;
        line-height: 1.6;
    `;

  // Create button container
  const buttonContainer = document.createElement("div");
  buttonContainer.style.cssText = `
        display: flex;
        gap: 15px;
        justify-content: center;
    `;

  // Create buttons
  const buttons = document.querySelectorAll(
    "#modal-footer .singlebutton form button"
  );
  buttons.forEach((originalButton) => {
    const newButton = document.createElement("button");
    newButton.textContent = originalButton.textContent;
    newButton.onclick = () => {
      originalButton.click();
    };
    newButton.style.cssText = `
            padding: 10px 20px;
            border: none;
            border-radius: 6px;
            cursor: pointer;
            transition: background-color 0.3s ease;
            font-weight: 500;
        `;

    if (originalButton.classList.contains("btn-secondary")) {
      newButton.style.backgroundColor = "#f3f4f6";
      newButton.style.color = "#374151";
      newButton.addEventListener("mouseenter", () => {
        newButton.style.backgroundColor = "#e5e7eb";
      });
      newButton.addEventListener("mouseleave", () => {
        newButton.style.backgroundColor = "#f3f4f6";
      });
    } else {
      newButton.style.backgroundColor = "#3b82f6";
      newButton.style.color = "white";
      newButton.addEventListener("mouseenter", () => {
        newButton.style.backgroundColor = "#2563eb";
      });
      newButton.addEventListener("mouseleave", () => {
        newButton.style.backgroundColor = "#3b82f6";
      });
    }

    buttonContainer.appendChild(newButton);
  });

  // Assemble container
  container.appendChild(icon);
  container.appendChild(header);
  container.appendChild(message);
  container.appendChild(buttonContainer);

  // Replace page content
  document.body.innerHTML = "";
  document.body.appendChild(container);
})();
