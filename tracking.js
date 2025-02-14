(async function () {
  let trackingStartTime;

  // Create log container
  const logContainer = document.createElement("div");
  logContainer.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    background: rgba(0, 0, 0, 0.5);
    color: white;
    padding: 15px;
    border-radius: 8px;
    font-family: monospace;
    max-width: 400px;
    max-height: 300px;
    overflow-y: auto;
    z-index: 9999;
  `;
  document.body.appendChild(logContainer);

  // Custom log function with auto-scroll
  const customLog = (message) => {
    console.log(message);
    const logEntry = document.createElement("div");
    logEntry.textContent = message;
    logEntry.style.marginBottom = "5px";
    logContainer.appendChild(logEntry);
    logContainer.scrollTop = logContainer.scrollHeight;
  };

  // Cache handling functions
  const saveToCache = (data) => {
    localStorage.setItem(
      "forumTrackerData",
      JSON.stringify({
        timestamp: new Date().getTime(),
        data: data,
      })
    );
  };

  const getFromCache = () => {
    const cached = localStorage.getItem("forumTrackerData");
    return cached ? JSON.parse(cached) : null;
  };

  // Format forum data for copying
  const formatForumData = (data) => {
    let output = "Forum:\n";
    data.forEach((forum) => {
      output += `${forum.forumTitle}\n\n`;
      output += `Course: ${forum.matkul}\n`;
      output += "Topics:\n";
      forum.topics.forEach((topic, index) => {
        output += `  ${index + 1}. 📃 ${topic.title}: ${topic.link}\n`;
      });
      output += "\n";
    });
    return output;
  };

  // Create or get container
  const createContainer = () => {
    let container = document.querySelector(".forum-tracker-container");
    if (!container) {
      container = document.createElement("div");
      container.className = "forum-tracker-container";
      container.style.cssText = `
      background: #f5f5f5;
      margin: 15px 0;
      border-radius: 8px;
      overflow: hidden;
    `;

      // Create header with title only
      const header = document.createElement("div");
      header.style.cssText = `
      padding: 15px;
      background: #e9ecef;
      border-bottom: 1px solid #dee2e6;
    `;

      const title = document.createElement("h2");
      title.textContent = "Forum Diskusi Yang Belum Dikerjakan";
      title.style.cssText = `
      margin: 0 0 10px 0;
      color: #333;
      font-size: 20px;
    `;

      const controls = document.createElement("div");
      controls.style.cssText = `
      display: flex;
      gap: 10px;
      align-items: center;
    `;

      // Tracking time display
      const timeDisplay = document.createElement("div");
      timeDisplay.className = "tracking-time";
      timeDisplay.style.cssText = `
      font-size: 14px;
      color: #666;
      margin-right: 15px;
    `;
      controls.appendChild(timeDisplay);

      // Track button
      const trackButton = document.createElement("button");
      trackButton.textContent = "🔄 Track Ulang";
      trackButton.style.cssText = `
      padding: 6px 12px;
      background: #007bff;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 14px;
      transition: background-color 0.2s;
    `;
      trackButton.onmouseover = () =>
        (trackButton.style.backgroundColor = "#0056b3");
      trackButton.onmouseout = () =>
        (trackButton.style.backgroundColor = "#007bff");
      trackButton.onclick = () => startTracking();
      controls.appendChild(trackButton);

      // Copy button
      const copyButton = document.createElement("button");
      copyButton.textContent = "📋 Copy Semua";
      copyButton.style.cssText = `
      padding: 6px 12px;
      background: #28a745;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 14px;
      transition: background-color 0.2s;
    `;
      copyButton.onmouseover = () =>
        (copyButton.style.backgroundColor = "#218838");
      copyButton.onmouseout = () =>
        (copyButton.style.backgroundColor = "#28a745");
      copyButton.onclick = () => {
        const cached = getFromCache();
        if (cached) {
          const formattedText = formatForumData(cached.data);
          navigator.clipboard.writeText(formattedText);
          copyButton.textContent = "✅ Tersalin!";
          setTimeout(() => (copyButton.textContent = "📋 Copy Semua"), 2000);
        }
      };
      controls.appendChild(copyButton);

      header.appendChild(title);
      header.appendChild(controls);
      container.appendChild(header);

      // Grid container for cards
      const gridContainer = document.createElement("div");
      gridContainer.className = "forum-tracker-grid";
      gridContainer.style.cssText = `
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 15px;
      padding: 15px;
    `;
      container.appendChild(gridContainer);

      // Footer with social links and watermark
      const footer = document.createElement("div");
      footer.style.cssText = `
      padding: 15px;
      text-align: center;
      font-size: 14px;
      color: #666;
    `;

      // Social media links
      const socialLinks = document.createElement("div");
      socialLinks.style.cssText = `
      margin-bottom: 10px;
      display: flex;
      justify-content: center;
      gap: 15px;
    `;

      const createSocialLink = (icon, text, url) => {
        const link = document.createElement("a");
        link.href = url;
        link.target = "_blank";
        link.style.cssText = `
        color: #666;
        text-decoration: none;
        display: flex;
        align-items: center;
        gap: 5px;
        transition: color 0.2s;
      `;
        link.onmouseover = () => (link.style.color = "#007bff");
        link.onmouseout = () => (link.style.color = "#666");
        link.innerHTML = `${icon} ${text}`;
        return link;
      };

      const githubLink = createSocialLink(
        '<svg height="16" width="16" viewBox="0 0 16 16" style="fill: currentColor;"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path></svg>',
        "",
        "https://github.com/Lukman754"
      );

      const instagramLink = createSocialLink(
        '<svg height="16" width="16" viewBox="0 0 16 16" style="fill: currentColor;"><path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z"></path></svg>',
        "",
        "https://instagram.com/_.chopin"
      );

      const facebookLink = createSocialLink(
        '<svg height="16" width="16" viewBox="0 0 16 16" style="fill: currentColor;"><path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z"></path></svg>',
        "",
        "https://facebook.com/lukman.mauludin.754"
      );

      socialLinks.appendChild(githubLink);
      socialLinks.appendChild(instagramLink);
      socialLinks.appendChild(facebookLink);

      // Watermark
      const watermark = document.createElement("div");
      watermark.innerHTML =
        'Made with <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Heart%20on%20Fire.png" alt="Heart on Fire" width="20"/> by Lukman Muludin';
      watermark.style.cssText = `
      color: #666;
      font-size: 13px;
    `;

      footer.appendChild(socialLinks);
      footer.appendChild(watermark);
      container.appendChild(footer);

      const targetContainer = document.querySelector(".block-region");
      if (targetContainer) {
        targetContainer.appendChild(container);
      }
    }
    return container;
  };

  // Update tracking time
  const updateTrackingTime = (startTime) => {
    const timeDisplay = document.querySelector(".tracking-time");
    if (timeDisplay && startTime) {
      const elapsed = (new Date().getTime() - startTime) / 1000;
      timeDisplay.textContent = `⏱️ Loading : ${elapsed.toFixed(2)} detik`;
    }
  };

  // Create forum card
  function createForumCard(forumData) {
    const gridContainer = document.querySelector(".forum-tracker-grid");
    const card = document.createElement("div");
    card.className = "forum-card";
    card.style.cssText = `
      background: white;
      border-radius: 6px;
      padding: 15px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      opacity: 0;
      transform: translateY(20px);
      transition: all 0.3s ease;
    `;

    const matkulHeader = document.createElement("div");
    matkulHeader.style.cssText = `
      font-weight: bold;
      color: #1976d2;
      margin-bottom: 10px;
      padding-bottom: 10px;
      border-bottom: 1px solid #eee;
      font-size: 14px;
    `;
    matkulHeader.textContent = forumData.matkul;
    card.appendChild(matkulHeader);

    const forumHeader = document.createElement("div");
    forumHeader.style.cssText = `
      font-weight: 500;
      margin-bottom: 10px;
      color: #495057;
      font-size: 13px;
    `;
    forumHeader.textContent = forumData.forumTitle;
    card.appendChild(forumHeader);

    const topicContainer = document.createElement("div");
    topicContainer.style.cssText = `
      background: #f8f9fa;
      border-radius: 4px;
      padding: 8px;
      font-size: 12px;
    `;

    forumData.topics.forEach((topic) => {
      const topicLink = document.createElement("a");
      topicLink.href = topic.link;
      topicLink.style.cssText = `
        display: block;
        color: #495057;
        text-decoration: none;
        padding: 5px;
        margin: 3px 0;
        border-radius: 4px;
        transition: all 0.2s;
      `;
      topicLink.textContent = topic.title;

      topicLink.onmouseover = () => {
        topicLink.style.backgroundColor = "#e9ecef";
        topicLink.style.color = "#1976d2";
      };
      topicLink.onmouseout = () => {
        topicLink.style.backgroundColor = "transparent";
        topicLink.style.color = "#495057";
      };

      topicContainer.appendChild(topicLink);
    });

    card.appendChild(topicContainer);
    gridContainer.appendChild(card);

    requestAnimationFrame(() => {
      card.style.opacity = "1";
      card.style.transform = "translateY(0)";
    });
  }

  // Process course function
  async function processCourse(courseLink) {
    const courseURL = courseLink.href;
    customLog(`🔍 Memeriksa course: ${courseURL}`);

    try {
      const response = await fetch(courseURL);
      const text = await response.text();
      const parser = new DOMParser();
      const doc = parser.parseFromString(text, "text/html");

      const forums = doc.querySelectorAll(".activity.modtype_forum");
      customLog(`📑 Ditemukan ${forums.length} forum di course ini`);

      const forumPromises = Array.from(forums).map(async (forum) => {
        const forumTitle = forum
          .querySelector(".instancename")
          ?.textContent.trim();
        const forumLink = forum.querySelector("a.aalink")?.href;
        const todoButton = forum.querySelector(
          "button.btn.btn-sm.dropdown-toggle:not(.btn-success)"
        );

        if (
          forumTitle?.includes("FORUM DISKUSI") &&
          todoButton &&
          todoButton.textContent.trim() === "To do"
        ) {
          customLog(`✨ Menemukan forum TODO: ${forumTitle}`);

          try {
            customLog(`📥 Mengambil detail forum: ${forumLink}`);
            const forumResponse = await fetch(forumLink);
            const forumText = await forumResponse.text();
            const forumDoc = parser.parseFromString(forumText, "text/html");

            const breadcrumb = forumDoc.querySelector(
              ".breadcrumb li:first-child a"
            );
            const matkulName = breadcrumb?.textContent.trim();
            customLog(`📘 Mata Kuliah: ${matkulName}`);

            const discussions = forumDoc.querySelectorAll(".discussion");
            const topicList = [];

            discussions.forEach((discussion) => {
              const topicLink = discussion.querySelector(".topic a");
              if (topicLink) {
                topicList.push({
                  title: topicLink.textContent.trim(),
                  link: topicLink.href,
                });
              }
            });

            customLog(`📝 Ditemukan ${topicList.length} topik diskusi`);

            if (matkulName && topicList.length > 0) {
              return {
                matkul: matkulName,
                forumTitle: forumTitle,
                topics: topicList,
              };
            }
          } catch (error) {
            customLog(
              `❌ Gagal mengambil data forum dari ${forumLink}: ${error.message}`
            );
          }
        }
        return null;
      });

      const forumResults = await Promise.all(forumPromises);
      return forumResults.filter((result) => result !== null);
    } catch (error) {
      customLog(`❌ Gagal mengambil data dari ${courseURL}: ${error.message}`);
      return [];
    }
  }

  // Batch processing function
  async function processBatch(items, batchSize, processFunction) {
    const results = [];
    for (let i = 0; i < items.length; i += batchSize) {
      const batch = items.slice(i, i + batchSize);
      const batchResults = await Promise.all(
        batch.map((item) => processFunction(item))
      );
      results.push(...batchResults.filter((result) => result !== null));
    }
    return results;
  }

  // Main tracking function
  async function startTracking() {
    // Clear existing cards
    const gridContainer = document.querySelector(".forum-tracker-grid");
    if (gridContainer) {
      gridContainer.innerHTML = "";
    }

    trackingStartTime = new Date().getTime();
    const trackingTimeInterval = setInterval(
      () => updateTrackingTime(trackingStartTime),
      100
    );

    customLog("⏳ Menunggu 5 detik untuk memastikan halaman terload...");
    await new Promise((resolve) => setTimeout(resolve, 5000));
    customLog("✅ Halaman sudah siap!");

    customLog("🚀 Memulai pengambilan data forum diskusi...");
    const courseLinks = Array.from(
      document.querySelectorAll(".minimal-course-card a.course-link")
    );

    customLog(`📚 Ditemukan ${courseLinks.length} course untuk diproses`);

    // Process courses in batches
    const BATCH_SIZE = 7;
    const forumData = await processBatch(
      courseLinks,
      BATCH_SIZE,
      processCourse
    );
    const flattenedData = forumData.flat();

    // Save to cache
    saveToCache(flattenedData);

    // Create cards
    flattenedData.forEach((data) => createForumCard(data));

    clearInterval(trackingTimeInterval);
    updateTrackingTime(trackingStartTime);

    customLog("✨ Selesai! Semua forum telah diproses");

    setTimeout(() => {
      logContainer.style.transition = "opacity 0.5s ease";
      logContainer.style.opacity = "0";
      setTimeout(() => logContainer.remove(), 500);
    }, 3000);
  }

  // Initialize
  createContainer();

  // Load cached data if available
  const cached = getFromCache();
  if (cached) {
    cached.data.forEach((data) => createForumCard(data));
    updateTrackingTime(cached.timestamp);
  } else {
    // Start fresh tracking if no cache
    startTracking();
  }
})();
