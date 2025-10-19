// Typing Animation
const text = "Learning, coding, and building stuff...";
const typingElement = document.querySelector(".typing");
let index = 0;

function type() {
  if (index < text.length) {
    typingElement.innerHTML += text.charAt(index);
    index++;
    setTimeout(type, 100);
  } else {
    setTimeout(() => {
      typingElement.innerHTML = "";
      index = 0;
      type();
    }, 2000);
  }
}
type();

// Smooth Scroll with offset
const sections = document.querySelectorAll("section");
const sidebarLinks = document.querySelectorAll(".sidebar-link");

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    const offsetTop = target.offsetTop - 50;
    window.scrollTo({
      top: offsetTop,
      behavior: "smooth"
    });
  });
});

// Highlight active section in sidebar
window.addEventListener("scroll", () => {
  let current = "";
  const offset = 150; // adjust to match sidebar/spacing

  sections.forEach(section => {
    const sectionTop = section.offsetTop - offset;
    const sectionBottom = sectionTop + section.offsetHeight;
    if (window.scrollY >= sectionTop && window.scrollY < sectionBottom) {
      current = section.getAttribute("id");
    }
  });

  sidebarLinks.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
});


// Dark/Light Mode Toggle
const themeToggle = document.querySelector(".theme-btn");
const body = document.body;

if (themeToggle) { // Only run if button exists
  // Load saved theme
  if (localStorage.getItem("theme") === "dark") {
    body.classList.add("dark");
    body.classList.remove("light");
    themeToggle.textContent = "☀️";
  } else {
    body.classList.add("light");
    body.classList.remove("dark");
    themeToggle.textContent = "🌙";
  }

  // Toggle theme on click
  themeToggle.addEventListener("click", () => {
    body.classList.toggle("dark");
    body.classList.toggle("light");
    if (body.classList.contains("dark")) {
      localStorage.setItem("theme", "dark");
      themeToggle.textContent = "☀️";
    } else {
      localStorage.setItem("theme", "light");
      themeToggle.textContent = "🌙";
    }
  });
}


// Dino Game

const canvas = document.getElementById("dino-game");
const ctx = canvas.getContext("2d");

let dino = { x: 50, y: 120, width: 25, height: 25, dy: 0, gravity: 0.6, jumpPower: -12, grounded: true };
let obstacles = [];
let gameSpeed = 4;
let gameOver = false;
let gameStarted = false; // <-- game starts only after interaction

// Event listeners
document.addEventListener("keydown", e => {
  if (!gameStarted) {
    gameStarted = true; // start game
  } else if (e.code === "Space") {
    if (gameOver) restartGame();
    else if (dino.grounded) {
      dino.dy = dino.jumpPower;
      dino.grounded = false;
    }
  }
});

canvas.addEventListener("click", () => {
  if (!gameStarted) {
    gameStarted = true;
  } else if (gameOver) {
    restartGame();
  }
});

// Restart function
function restartGame() {
  dino = { x: 50, y: 120, width: 25, height: 25, dy: 0, gravity: 0.6, jumpPower: -12, grounded: true };
  obstacles = [];
  gameOver = false;
  gameStarted = false; // back to start screen
}

// Obstacle generator
function spawnObstacle() {
  const height = Math.random() * 20 + 20;
  obstacles.push({ x: canvas.width, y: canvas.height - height, width: 20, height: height });
}

// Draw ground
function drawGround() {
  ctx.strokeStyle = "#b0a890";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(0, canvas.height - 2);
  ctx.lineTo(canvas.width, canvas.height - 2);
  ctx.stroke();
}

// Draw Dino
function drawDino() {
  ctx.fillStyle = "#9caf88";
  ctx.fillRect(dino.x, dino.y, dino.width, dino.height);
  // Legs
  ctx.fillRect(dino.x + 2, dino.y + dino.height, 6, 4);
  ctx.fillRect(dino.x + dino.width - 8, dino.y + dino.height, 6, 4);
}

// Draw obstacles
function drawObstacle(ob) {
  ctx.fillStyle = "#7b936c";
  ctx.fillRect(ob.x, ob.y, ob.width, ob.height);
  ctx.fillStyle = "#5a704a"; // spikes
  ctx.fillRect(ob.x + 5, ob.y - 5, 2, 5);
  ctx.fillRect(ob.x + ob.width - 7, ob.y - 5, 2, 5);
}

// Draw messages
function drawMessage(text, subtext) {
  ctx.fillStyle = "#ff4d4f"; // red color for start and game over
  ctx.font = "20px monospace";
  ctx.textAlign = "center";
  ctx.fillText(text, canvas.width / 2, canvas.height / 2);
  if (subtext) {
    ctx.font = "14px monospace";
    ctx.fillText(subtext, canvas.width / 2, canvas.height / 2 + 25);
  }
}

// Game loop
function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawGround();

  if (!gameStarted) {
    drawMessage("Press Space or Click to Start");
  } else if (!gameOver) {
    // Dino physics
    dino.dy += dino.gravity;
    dino.y += dino.dy;
    if (dino.y >= canvas.height - dino.height) {
      dino.y = canvas.height - dino.height;
      dino.dy = 0;
      dino.grounded = true;
    }

    drawDino();

    // Obstacles
    if (Math.random() < 0.02) spawnObstacle();
    obstacles.forEach((ob, i) => {
      ob.x -= gameSpeed;
      drawObstacle(ob);

      // Collision
      if (dino.x < ob.x + ob.width &&
          dino.x + dino.width > ob.x &&
          dino.y < ob.y + ob.height &&
          dino.y + dino.height > ob.y) {
        gameOver = true;
      }

      if (ob.x + ob.width < 0) obstacles.splice(i, 1);
    });
  } else {
    drawMessage("GAME OVER", "Press Space or Click to Restart");
  }

  requestAnimationFrame(update);
}

update();


// View more 

function setupViewMore(sectionId, linkHref, maxVisible = 4) {
  const container = document.querySelector(`#${sectionId} .projects-grid`);
  const viewMoreContainer = container.nextElementSibling;
  const items = container.querySelectorAll('.project');

  // Hide items beyond the maxVisible limit
  items.forEach((item, index) => {
    if (index >= maxVisible) {
      item.style.display = 'none';
    }
  });

  // Show "View More" only if there are more than maxVisible items
  if (items.length > maxVisible) {
    viewMoreContainer.style.display = 'block';
    viewMoreContainer.querySelector('a').href = linkHref;
  }
}

// Blog section: show max 4
setupViewMore('blog', 'all-blogs.html', 4);

// Projects section: show max 4
setupViewMore('projects', 'all-projects.html', 4);




