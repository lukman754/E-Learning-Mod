// Define functions globally first
function updateGif() {
  const input = document.getElementById("gifUrlInput");
  const img = document.getElementById("customGif");
  const newUrl = input.value.trim();

  if (newUrl) {
    if (newUrl.toLowerCase().endsWith(".gif") || newUrl.includes("tenor.com")) {
      img.src = newUrl;
      localStorage.setItem("customGifUrl", newUrl);
    } else {
      alert("Pastikan URL yang dimasukkan adalah URL GIF yang valid!");
    }
  }
}

function resetGif() {
  const defaultGif =
    "https://media1.tenor.com/m/lsPL3K-FPMwAAAAC/dandadan-op-dandadan-ken-takakura.gif";
  const img = document.getElementById("customGif");
  const input = document.getElementById("gifUrlInput");

  img.src = defaultGif;
  input.value = defaultGif;
  localStorage.setItem("customGifUrl", defaultGif);
}

async function pasteFromClipboard() {
  try {
    const text = await navigator.clipboard.readText();
    const input = document.getElementById("gifUrlInput");
    input.value = text;
    updateGif();
  } catch (err) {
    alert("Tidak dapat mengakses clipboard. Silakan paste manual.");
  }
}

document.querySelectorAll(".header-maxwidth.d-print-none").forEach((el) => {
  const savedGifUrl =
    localStorage.getItem("customGifUrl") ||
    "https://media1.tenor.com/m/lsPL3K-FPMwAAAAC/dandadan-op-dandadan-ken-takakura.gif";

  // Check if header contains "My courses"
  const headerEl = el.querySelector(".h2");
  const headerText = headerEl ? headerEl.textContent.trim() : "";

  // Regex untuk mendeteksi sapaan seperti "Hi, [nama]! 👋"
  const greetingRegex = /^Hi, .+! 👋$/;

  const isMyCoursesPage =
    headerText !== "Dashboard" && !greetingRegex.test(headerText);

  // Prepare the content based on the page
  const content = isMyCoursesPage
    ? `
    <div style="text-align: center; padding-bottom: 20px;">
      <div style="position: relative;" class="gif-container">
        <img src="${savedGifUrl}" 
          alt="Custom GIF" 
          id="customGif"
          style="
            width: 100%;
            aspect-ratio: 16/5;
            object-fit: cover;
            border-radius: 20px;
            box-shadow: 0 4px 15px rgba(126, 182, 255, 0.3);
          ">
        <div style="position: absolute; top: -15px; right: -15px; background: #4d94ff; padding: 8px 15px; border-radius: 20px; transform: rotate(5deg);">
          <img src="https://img.icons8.com/?size=100&id=RlkHMHJofPY9&format=png&color=000000" width="20" >
        </div>
      </div>
    </div>
  `
    : `
    <div style="text-align: center; padding: 20px; background: linear-gradient(135deg, #e6f3ff, #f0f9ff); border: 3px solid #7eb6ff; border-radius: 15px;">
      <!-- Original full content here -->
      <div style="position: relative;" class="gif-container">
        <img src="${savedGifUrl}" 
          alt="Custom GIF" 
          id="customGif"
          style="
            width: 100%;
            aspect-ratio: 16/9;
            object-fit: cover;
            border-radius: 20px;
            box-shadow: 0 4px 15px rgba(126, 182, 255, 0.3);
          ">
        <div style="position: absolute; top: -15px; right: -15px; background: #4d94ff; padding: 8px 15px; border-radius: 20px; transform: rotate(5deg);">
          <span style="color: white; font-weight: bold; font-size: 14px;">₍ᐢ. ̫ .ᐢ₎</span>
        </div>
      </div>
      
      <div style="margin-top: 20px; background: rgba(255, 255, 255, 0.7); padding: 0 16px; border-radius: 12px; border: 2px dashed #7eb6ff;">
        <div class="container-fluid p-0">
            <div class="row">
            <!-- My Courses -->
            <div class="col-12 col-md-6 p-1">
                <a href="https://el-filkom.unpam.ac.id/my/courses.php" class="text-decoration-none">
                <div class="card" style="border: 1px solid #7eb6ff; border-radius: 10px;">
                    <div class="card-body d-flex align-items-center p-3">
                    <img src="https://img.icons8.com/?size=100&id=16369&format=png&color=000000" width="24" height="24" alt="courses" class="me-3">
                    <span style="color: #3385ff; font-weight: 500;"> My Courses</span>
                    </div>
                </div>
                </a>
            </div>

            <!-- Courses Search -->
            <div class="col-12 col-md-6 p-1">
                <a href="https://el-filkom.unpam.ac.id/course" class="text-decoration-none">
                <div class="card" style="border: 1px solid #7eb6ff; border-radius: 10px;">
                    <div class="card-body d-flex align-items-center p-3">
                    <img src="https://img.icons8.com/?size=100&id=KPmthqkeTgDN&format=png&color=000000" width="24" height="24" alt="search" class="me-3">
                    <span style="color: #3385ff; font-weight: 500;"> Courses Search</span>
                    </div>
                </div>
                </a>
            </div>

            <!-- Kalender Akademik -->
            <div class="col-12 col-md-6 p-1">
                <a href="https://el-filkom.unpam.ac.id/mod/page/view.php?id=10795684" class="text-decoration-none">
                <div class="card" style="border: 1px solid #7eb6ff; border-radius: 10px;">
                    <div class="card-body d-flex align-items-center p-3">
                    <img src="https://img.icons8.com/?size=100&id=WpQIVxfhhzqt&format=png&color=000000" width="24" height="24" alt="calendar" class="me-3">
                    <span style="color: #3385ff; font-weight: 500;"> Kalender Akademik</span>
                    </div>
                </div>
                </a>
            </div>

            <!-- Kalender Perkuliahan -->
            <div class="col-12 col-md-6 p-1">
                <a href="https://event.unpam.ac.id/" class="text-decoration-none">
                <div class="card" style="border: 1px solid #7eb6ff; border-radius: 10px;">
                    <div class="card-body d-flex align-items-center p-3">
                    <img src="https://img.icons8.com/?size=100&id=fTBV7GkKahC6&format=png&color=000000" width="24" height="24" alt="schedule" class="me-3">
                    <span style="color: #3385ff; font-weight: 500;"> Event Unpam</span>
                    </div>
                </div>
                </a>
            </div>

            <!-- My Unpam -->
            <div class="col-12 col-md-6 p-1">
                <a href="https://my.unpam.ac.id/" class="text-decoration-none">
                <div class="card" style="border: 1px solid #7eb6ff; border-radius: 10px;">
                    <div class="card-body d-flex align-items-center p-3">
                    <img src="https://img.icons8.com/?size=100&id=12197&format=png&color=000000" width="24" height="24" alt="university" class="me-3">
                    <span style="color: #3385ff; font-weight: 500;"> My Unpam</span>
                    </div>
                </div>
                </a>
            </div>

            <!-- Presensi -->
            <div class="col-12 col-md-6 p-1">
                <a href="https://my.unpam.ac.id/presensi/" class="text-decoration-none">
                <div class="card" style="border: 1px solid #7eb6ff; border-radius: 10px;">
                    <div class="card-body d-flex align-items-center p-3">
                    <img src="https://img.icons8.com/?size=100&id=l0ssKjbdEr07&format=png&color=000000" width="24" height="24" alt="attendance" class="me-3">
                    <span style="color: #3385ff; font-weight: 500;"> Presensi</span>
                    </div>
                </div>
                </a>
            </div>
            </div>
        </div>
        
      </div>
      
      <fieldset style="border: none; margin: 0; margin-top: 10px; padding: 0;">
        <legend style="text-align: left; font-size: 14px; color: #4d94ff; font-weight: bold; margin-bottom: 5px;">
          Personalisasi GIF 🎨
        </legend>
        <div style="display: flex; background: rgba(255, 255, 255, 0.7); padding: 15px; border-radius: 12px; border: 2px dashed #7eb6ff;">
          <div style="position: relative; flex-grow: 1; margin-right: 10px;">
            <input type="url" 
                   id="gifUrlInput" 
                   placeholder="Masukkan URL GIF baru"
                   value="${savedGifUrl}"
                   style="width: 100%; padding: 8px 35px 8px 8px; border: 2px solid #7eb6ff; border-radius: 10px;">
            <button id="pasteBtn"
                    style="position: absolute; right: 8px; top: 50%; transform: translateY(-50%);
                           padding: 4px 8px; background: #4d94ff; border: 0px; 
                           border-radius: 6px; cursor: pointer; font-size: 12px;">
              📋
            </button>
          </div>
          <button id="updateGifBtn"
                  style="padding: 8px 15px; background: #4d94ff; color: white; border: none; border-radius: 10px; cursor: pointer;">
            Change
          </button>
          <button id="resetGifBtn"
                  style="padding: 8px 15px; background: #ff4d4d; color: white; border: none; border-radius: 10px; cursor: pointer; margin-left: 5px;">
            Reset
          </button>
        </div>
      </fieldset>
        <div id="emote" style="margin-top: 15px; font-size: 12px; color: #4d94ff;">
        ˎ₍^ᴥ^₎ˏ
      </div>

        <div style="text-align: center; margin-top: 20px;">
            <!-- Social Links -->
            <div style="margin-bottom: 15px;">
                <!-- Github -->
                <a href="https://github.com/Lukman754" style="text-decoration: none; margin: 0 10px; color: #666;">
                    <svg height="16" width="16" viewBox="0 0 16 16" style="fill: currentColor;">
                        <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
                    </svg>
                </a>

                <!-- Instagram -->
                <a href="https://instagram.com/_.chopin" style="text-decoration: none; margin: 0 10px; color: #666;">
                <svg height="16" width="16" viewBox="0 0 16 16" style="fill: currentColor;">
                    <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z"/>
                </svg>
                </a>

                <!-- Facebook -->
                <a href="https://facebook.com/lukman.mauludin.754" style="text-decoration: none; margin: 0 10px; color: #666;">
                <svg height="16" width="16" viewBox="0 0 16 16" style="fill: currentColor;">
                    <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z"/>
                </svg>
                </a>
            </div>

            <!-- Watermark -->
                
            <div style="color: #666; font-size: 13px;">
                    Made with 
                    <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Heart%20on%20Fire.png" alt="Heart on Fire" width="20" style="vertical-align: middle;"/> 
                    by Lukman Muludin
            </div>
        </div>
    </div>
  `;

  el.innerHTML = content;

  // Add event listeners after creating the elements
  if (!isMyCoursesPage) {
    setTimeout(() => {
      document
        .getElementById("updateGifBtn")
        .addEventListener("click", updateGif);
      document
        .getElementById("resetGifBtn")
        .addEventListener("click", resetGif);
      document
        .getElementById("pasteBtn")
        .addEventListener("click", pasteFromClipboard);

      document.getElementById("gifUrlInput").addEventListener("paste", (e) => {
        setTimeout(updateGif, 50);
      });
    }, 100);
  }
});

// Hide timeline and calendar blocks
document.querySelectorAll(".block_timeline.block.card.mb-3").forEach((el) => {
  el.style.display = "none";
});

document
  .querySelectorAll(".block_calendar_month.block.card.mb-3")
  .forEach((el) => {
    el.style.display = "none";
  });

// Emote animation (only for non-My courses pages)
if (!document.querySelector(".h2")?.textContent.includes("My courses")) {
  const emoteElement = document.getElementById("emote");
  const emotes = ["ˎ₍^ᴥ^₎ˏ", "ˎ₍●ᴥ●₎ˏ", "ˎ₍˄ᴥ˄₎ˏ"];
  let index = 0;

  function changeEmote() {
    index = (index + 1) % emotes.length;
    emoteElement.textContent = emotes[index];
  }

  setInterval(changeEmote, 500);
}
