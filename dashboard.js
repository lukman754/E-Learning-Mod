// Create and append styles
document.querySelectorAll(".col.d-flex.px-0.mb-2").forEach((el) => {
  el.classList.add("col-4");
});

const createStyles = () => {
  const styleElement = document.createElement("style");
  styleElement.textContent = `
    /* Hide filter controls */
    [data-region="filter"] {
      display: none !important;
    }

    .card-grid .col{
      padding: 5px !important;
      margin-bottom: 0 !important;
      }

    .minimal-course-card {
      width: 100%;
      border: 1px solid #e5e7eb;
      border-radius: 0.5rem;
      background-color: white;
      transition: all 0.2s ease;
    }

    .minimal-course-card:hover {
      background-color: #f8fafc;
      border-color: #cbd5e1;
    }

    .course-link {
      text-decoration: none;
      color: inherit;
      display: block;
    }

    .course-link:hover{
      text-decoration: none;
      color: #2c3e50;
    }

    .course-content {
      padding: 1rem;
    }

    .course-name {
      font-size: 1rem;
      font-weight: 500;
      color: #334155;
      margin-bottom: 0.75rem;
      line-height: 1.5;
    }

    .course-badges {
      display: flex;
      gap: 0.5rem;
    }

    .badge {
      padding: 0.25rem 0.5rem;
      border-radius: 0.25rem;
      font-size: 0.75rem;
      font-weight: 500;
      letter-spacing: 0.025em;
    }

    .sks-badge {
      background-color: #f1f5f9;
      color: #475569;
    }

    .sks-3 {
      background: linear-gradient(135deg, #6366f1, #818cf8);
      color: white;
    }

    .day-badge {
      background-color: #f1f5f9;
      color: #475569;
    }
  `;
  document.head.appendChild(styleElement);
};

// Create a new card element
const createCardElement = (link, name, sks, day) => {
  const card = document.createElement("div");
  card.className = "minimal-course-card";

  const content = document.createElement("a");
  content.href = link;
  content.className = "course-link";

  const courseContent = document.createElement("div");
  courseContent.className = "course-content";

  // Badge container
  const badges = document.createElement("div");
  badges.className = "course-badges";

  const sksBadge = document.createElement("span");
  sksBadge.className = `badge sks-badge sks-${sks}`;
  sksBadge.textContent = `${sks} SKS`;

  const dayBadge = document.createElement("span");
  dayBadge.className = "badge day-badge";
  dayBadge.textContent = day;

  badges.appendChild(sksBadge);
  badges.appendChild(dayBadge);

  // Course name
  const courseName = document.createElement("h3");
  courseName.className = "course-name";
  courseName.textContent = name;

  // Urutan diubah: Badge di atas, Course Name di bawah
  courseContent.appendChild(badges);
  courseContent.appendChild(courseName);

  content.appendChild(courseContent);
  card.appendChild(content);

  return card;
};

// Transform a single course card
const transformCourseCard = (card) => {
  // Skip if already transformed
  if (card.classList.contains("minimal-course-card")) return;

  const linkElement = card.querySelector('a[href*="course/view.php?id="]');
  const courseText = card
    .querySelector(".multiline span.sr-only")
    ?.textContent.trim();

  if (linkElement && courseText) {
    const link = linkElement.href;
    const match = courseText.match(/\[(\d+)]\s+(.+?)\s+#\s+\S+\s+\((\S+)\)/);

    if (match) {
      const [, sks, name, day] = match;
      const newCard = createCardElement(link, name, sks, day);
      card.replaceWith(newCard);
    }
  }
};

// Initialize MutationObserver to watch for new course cards
const initializeObserver = () => {
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        // Check if the added node is an element and has the course-card class
        if (node.nodeType === 1 && node.classList?.contains("course-card")) {
          transformCourseCard(node);
        }

        // Check for course cards within the added node
        if (node.nodeType === 1) {
          node.querySelectorAll(".course-card").forEach(transformCourseCard);
        }
      });
    });
  });

  // Start observing the entire document for added nodes
  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });

  // Transform any existing course cards
  document.querySelectorAll(".course-card").forEach(transformCourseCard);
};

// Initialize everything when DOM is fully loaded
const init = () => {
  // Create styles immediately
  createStyles();

  // Wait for DOM to be fully loaded
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initializeObserver);
  } else {
    initializeObserver();
  }
};

// Run the initialization
init();
