/* ====== NAME & DATE AUTO ====== */
const params = new URLSearchParams(window.location.search);
let name = params.get("nama");

if (!name) {
  name = prompt("Masukkan nama orang tersayang 💖", "Sayang");
}
document.getElementById("name").innerText = `💗 ${name} 💗`;

const today = new Date();
const options = { day: 'numeric', month: 'long', year: 'numeric' };
document.getElementById("date").innerText =
  today.toLocaleDateString('id-ID', options);

/* ====== MUSIC + WISH ====== */
const btn = document.getElementById("openBtn");
const music = document.getElementById("bgMusic");
const wish = document.getElementById("wish");

btn.addEventListener("click", () => {
  music.play().catch(()=>{});
  wish.innerText = `
Selamat ulang tahun, ${name} 💕
Semoga setiap langkahmu
selalu ditemani bahagia,
setiap lelahmu terbayar senyum,
dan aku masih boleh
menjadi bagian
dari cerita indahmu ✨
  `;
  wish.classList.remove("hidden");
  startConfetti();
});

/* ====== CONFETTI CANVAS ====== */
const canvas = document.getElementById("confetti");
const ctx = canvas.getContext("2d");
let pieces = [];

function resize() {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
}
addEventListener("resize", resize);
resize();

function createConfetti() {
  return {
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height - canvas.height,
    r: Math.random() * 6 + 4,
    d: Math.random() * 10 + 5,
    color: `hsl(${Math.random()*360},100%,70%)`,
    tilt: Math.random() * 10 - 10
  };
}

function startConfetti() {
  pieces = Array.from({length: 150}, createConfetti);
  requestAnimationFrame(updateConfetti);
}

function updateConfetti() {
  ctx.clearRect(0,0,canvas.width,canvas.height);
  pieces.forEach(p => {
    p.y += p.d / 2;
    p.tilt += 0.1;
    ctx.fillStyle = p.color;
    ctx.beginPath();
    ctx.arc(p.x + p.tilt, p.y, p.r, 0, Math.PI*2);
    ctx.fill();
    if (p.y > canvas.height) {
      p.y = -10;
      p.x = Math.random() * canvas.width;
    }
  });
  requestAnimationFrame(updateConfetti);
}

/* ====== RANDOM FALLING HEARTS ====== */
const hearts = document.getElementById("hearts");
setInterval(() => {
  const heart = document.createElement("span");
  heart.innerText = ["💖","💕","💗","💘","💞"][Math.floor(Math.random()*5)];
  heart.style.left = Math.random() * 100 + "vw";
  heart.style.animationDuration = (3 + Math.random()*3) + "s";
  heart.style.fontSize = (16 + Math.random()*20) + "px";
  hearts.appendChild(heart);
  setTimeout(() => heart.remove(), 6000);
}, 400);
