// Floating hearts
const heartTypes = ["❤️","💖","💘","💕","💓","💞","💗","🩷"];
const heartContainer = document.querySelector('.floating-hearts');
function spawnHeart() {
  if (!heartContainer) return;
  const heart = document.createElement('div');
  heart.className = 'animated-heart';
  heart.innerText = heartTypes[Math.floor(Math.random()*heartTypes.length)];
  heart.style.left = Math.random() * 98 + 'vw';
  heart.style.fontSize = (32 + Math.random()*16) + 'px';
  heart.style.animationDuration = (4 + Math.random()*4) + 's';
  heartContainer.appendChild(heart);
  setTimeout(() => heart.remove(), 7000);
}
setInterval(spawnHeart, 350);

// Sparkles
const sparkleContainer = document.querySelector('.sparkle-bg');
function createSparkle() {
  if (!sparkleContainer) return;
  const dot = document.createElement('div');
  dot.className = 'sparkle-dot';
  dot.style.left = Math.random() * 100 + 'vw';
  dot.style.top = Math.random() * 100 + 'vh';
  dot.style.animationDuration = (1.2 + Math.random()) + 's';
  sparkleContainer.appendChild(dot);
  setTimeout(() => dot.remove(), 1800);
}
setInterval(createSparkle, 300);

// ---- Lock Screen Logic ----
function checkBothLock() {
  const pd = document.getElementById('princeDay').value.trim();
  const pm = document.getElementById('princeMonth').value.trim();
  const ld = document.getElementById('latanshaDay').value.trim();
  const lm = document.getElementById('latanshaMonth').value.trim();
  if (pd === "25" && pm === "11" && ld === "25" && lm === "08") {
    document.getElementById('lockScreen').classList.add('hidden');
    startCountdown();
  } else {
    document.getElementById('lockError').textContent = "Wrong! Both birthdays must be correct to unlock 🎂❤️";
  }
}

// ---- Countdown Logic ----
function startCountdown() {
  document.getElementById('countdownScreen').classList.remove('hidden');
  const bgMusic = document.getElementById('bgMusic');
  setTimeout(()=>{bgMusic.play();},300);
  let count = 3;
  document.getElementById('countdownNum').textContent = count;
  const interval = setInterval(() => {
    count--;
    if (count > 0) {
      document.getElementById('countdownNum').textContent = count;
    } else {
      clearInterval(interval);
      document.getElementById('countdownScreen').classList.add('hidden');
      showFlyingButterflies();
      setTimeout(showWish, 2700);
    }
  }, 1000);
}

// ---- Flying Butterflies Animation ----
function showFlyingButterflies() {
  const container = document.getElementById('butterflyContainer');
  container.innerHTML = '';
  container.classList.remove('hidden');
  for (let i = 0; i < 7; i++) {
    const butterfly = document.createElement('div');
    butterfly.className = 'butterfly';
    butterfly.innerText = '🦋';
    // Randomize path
    const startX = Math.random() * 80;
    const startY = 60 + Math.random() * 20;
    const mid1X = startX + (Math.random() * 10 - 5);
    const mid1Y = startY - (10 + Math.random() * 10);
    const mid2X = startX + (Math.random() * 20 - 10);
    const mid2Y = mid1Y - (10 + Math.random() * 8);
    const endX = startX + (Math.random() * 25 - 12);
    const endY = mid2Y - (20 + Math.random() * 8);
    butterfly.style.setProperty('--start-x', startX + 'vw');
    butterfly.style.setProperty('--start-y', startY + 'vh');
    butterfly.style.setProperty('--mid1-x', mid1X + 'vw');
    butterfly.style.setProperty('--mid1-y', mid1Y + 'vh');
    butterfly.style.setProperty('--mid2-x', mid2X + 'vw');
    butterfly.style.setProperty('--mid2-y', mid2Y + 'vh');
    butterfly.style.setProperty('--end-x', endX + 'vw');
    butterfly.style.setProperty('--end-y', endY + 'vh');
    butterfly.style.animationDelay = (Math.random() * 0.8) + "s";
    container.appendChild(butterfly);
  }
  setTimeout(() => container.classList.add('hidden'), 2700);
}

// ---- Show Wish ----
function showWish() {
  document.getElementById('wishSection').classList.remove('hidden');
}

// ---- Scroll Functions ----
function scrollToMemories() {
  document.getElementById('memoriesSection').classList.remove('hidden');
  document.getElementById('memoriesSection').scrollIntoView({behavior: "smooth"});
}
function scrollToNote() {
  document.getElementById('noteSection').classList.remove('hidden');
  document.getElementById('noteSection').scrollIntoView({behavior: "smooth"});
}
function scrollToGame() {
  document.getElementById('gameSection').classList.remove('hidden');
  document.getElementById('gameSection').scrollIntoView({behavior: "smooth"});
}

// ---- Note Section ----
function saveNote() {
  const note = document.getElementById('userNote').value.trim();
  if (note.length === 0) {
    document.getElementById('noteMsg').innerText = "Please write something!";
    return;
  }
  localStorage.setItem('latanshaNote', note);
  document.getElementById('noteMsg').innerText = "Thank you for your note! 💖";
  document.getElementById('userNote').value = "";
}

// ---- Game Section: Multi-question Game ----
const gameQuestions = [
  {
    question: "Ours 1st meet-up day ??👀",
    type: "heart",
    label: "On which date did we meet up for the first time?",
    placeholder: "DD Month YYYY",
    check: answer => {
      const a = answer.trim().toLowerCase();
      return (
        a === "13 august 2025" ||
        a === "13 aug 2025" ||
        a === "13-08-2025" ||
        a === "13/08/2025" ||
        a === "13 08 2025"
      );
    }
  },
  {
    question: "Which month I meet you first ?👀",
    type: "input",
    label: "Which month was our first meet?",
    placeholder: "Month (e.g. January)",
    check: answer => answer.trim().toLowerCase() === "january"
  },
  {
    question: "What a best thing in me ?",
    type: "input",
    label: "What, in your opinion, is the best thing in me?",
    placeholder: "Your opinion",
    check: answer => answer.trim().length > 0 // always accept
  }
];

let gameAnswers = [];
let currentGameIndex = 0;

function startGame() {
  gameAnswers = [];
  currentGameIndex = 0;
  showGameQuestion();
}
function showGameQuestion() {
  document.getElementById('gameResult').innerText = "";
  document.getElementById('gameHearts').innerHTML = "";
  document.getElementById('answerInput').classList.add('hidden');
  document.getElementById('userAnswer').value = "";
  const q = gameQuestions[currentGameIndex];
  document.getElementById('gameQuestion').innerText = q.question;
  if(q.type === "heart") {
    const gameHearts = document.getElementById('gameHearts');
    const specialIndex = Math.floor(Math.random()*12);
    for(let i=0; i<12; i++) {
      const btn = document.createElement('button');
      btn.className = 'heart-btn';
      btn.innerText = "❤️";
      btn.onclick = function() {
        if(i === specialIndex) {
          btn.innerText = "💖";
          btn.disabled = true;
          Array.from(gameHearts.children).forEach(b => b.disabled = true);
          document.getElementById('answerInput').classList.remove('hidden');
          document.getElementById('answerLabel').textContent = q.label;
          document.getElementById('userAnswer').placeholder = q.placeholder;
        } else {
          btn.innerText = "🖤";
          btn.disabled = true;
        }
      };
      gameHearts.appendChild(btn);
    }
  } else {
    document.getElementById('answerInput').classList.remove('hidden');
    document.getElementById('answerLabel').textContent = q.label;
    document.getElementById('userAnswer').placeholder = q.placeholder;
  }
}

function submitAnswer() {
  const q = gameQuestions[currentGameIndex];
  const ans = document.getElementById('userAnswer').value.trim();
  if (!q.check(ans)) {
    document.getElementById('gameResult').innerHTML = "Nope! Try again, love. 🫶🏻";
    return;
  }
  gameAnswers.push(ans);
  currentGameIndex++;
  if(currentGameIndex < gameQuestions.length) {
    setTimeout(showGameQuestion, 800);
    document.getElementById('gameResult').innerHTML = "Correct! 💖";
    document.getElementById('answerInput').classList.add('hidden');
  } else {
    document.getElementById('gameSection').classList.add('hidden');
    showSummary();
  }
}

function showSummary() {
  document.getElementById('summarySection').classList.remove('hidden');
  const list = document.getElementById('summaryList');
  list.innerHTML = "";
  for(let i=0;i<gameQuestions.length;i++){
    const li = document.createElement('li');
    li.innerHTML = `<b>Q:</b> ${gameQuestions[i].label} <br><b>Your answer:</b> ${gameAnswers[i]}`;
    list.appendChild(li);
  }
  const feedback = localStorage.getItem('latanshaNote');
  document.getElementById('summaryFeedback').innerHTML = feedback
    ? `<b>Your feedback:</b> ${feedback}`
    : "";
}

window.addEventListener('DOMContentLoaded', () => {
  updateGalleryListeners();
  const memSection = document.getElementById('memoriesSection');
  if (memSection) {
    new MutationObserver(updateGalleryListeners).observe(memSection, { childList: true, subtree: true });
  }
  let obs = new MutationObserver(() => {
    if (!document.getElementById('gameSection').classList.contains('hidden')) {
      startGame();
    }
  });
  obs.observe(document.getElementById('gameSection'), {attributes: true});
});

// ------ Full Size Photo/Video Modal (with flip) ------
let fullGallery = null;
let fullGalleryIndex = 0;
let fullGalleryImgs = [];
let flipTimeout = null;

function openFullSize(el) {
  let modal = document.getElementById('fullSizeModal');
  let content = document.getElementById('fullSizeContent');
  let prevBtn = document.getElementById('fullPrevBtn');
  let nextBtn = document.getElementById('fullNextBtn');
  content.innerHTML = '';
  fullGallery = null;
  fullGalleryIndex = 0;
  fullGalleryImgs = [];
  prevBtn.classList.add('hidden');
  nextBtn.classList.add('hidden');
  const galleryName = el.getAttribute('data-gallery');
  if (galleryName !== null) {
    fullGalleryImgs = Array.from(document.querySelectorAll('img[data-gallery="'+galleryName+'"]'));
    fullGalleryIndex = Number(el.getAttribute('data-index'));
    fullGallery = galleryName;
    showFullImg();
    if (fullGalleryImgs.length > 1) {
      prevBtn.classList.remove('hidden');
      nextBtn.classList.remove('hidden');
    }
  } else {
    if (el.tagName === 'IMG') {
      let img = document.createElement('img');
      img.src = el.src;
      img.className = "fullscreen-flip-img";
      content.appendChild(img);
    } else if (el.tagName === 'VIDEO') {
      let video = document.createElement('video');
      video.src = el.querySelector('source') ? el.querySelector('source').src : el.src;
      video.controls = true;
      video.autoplay = true;
      content.appendChild(video);
    }
  }
  modal.classList.remove('hidden');
}
function showFullImg(flipDir = '') {
  let content = document.getElementById('fullSizeContent');
  content.innerHTML = '';
  let imgEl = document.createElement('img');
  imgEl.src = fullGalleryImgs[fullGalleryIndex].src;
  imgEl.className = "fullscreen-flip-img";
  if (flipDir === 'next') imgEl.classList.add('flip-next');
  if (flipDir === 'prev') imgEl.classList.add('flip-prev');
  content.appendChild(imgEl);
  if (flipDir) {
    flipTimeout && clearTimeout(flipTimeout);
    flipTimeout = setTimeout(()=>{
      imgEl.classList.remove('flip-next','flip-prev');
    },150);
  }
}
function flipFullNext(e) {
  e.stopPropagation();
  if (fullGallery && fullGalleryImgs.length > 1) {
    fullGalleryIndex = (fullGalleryIndex+1)%fullGalleryImgs.length;
    showFullImg('next');
  }
}
function flipFullPrev(e) {
  e.stopPropagation();
  if (fullGallery && fullGalleryImgs.length > 1) {
    fullGalleryIndex = (fullGalleryIndex-1+fullGalleryImgs.length)%fullGalleryImgs.length;
    showFullImg('prev');
  }
}
function closeFullSize() {
  document.getElementById('fullSizeModal').classList.add('hidden');
  document.getElementById('fullSizeContent').innerHTML = '';
  document.getElementById('fullPrevBtn').classList.add('hidden');
  document.getElementById('fullNextBtn').classList.add('hidden');
  fullGallery = null;
  fullGalleryImgs = [];
  fullGalleryIndex = 0;
}
function updateGalleryListeners() {
  document.querySelectorAll('.memory-photo').forEach(el => {
    el.onclick = function(e){
      e.stopPropagation();
      openFullSize(this);
    }
  });
  document.querySelectorAll('.book-photo').forEach(el => {
    el.onclick = function(e){
      e.stopPropagation();
      openFullSize(this);
    }
  });
  document.querySelectorAll('.heart-photo').forEach(el => {
    el.onclick = function(e){
      e.stopPropagation();
      openFullSize(this);
    }
  });
  document.querySelectorAll('.memory-video').forEach(el => {
    el.onclick = function(e){
      e.stopPropagation();
      openFullSize(this);
    }
  });
}

// ------ Gallery Navigation Logic ------
function setupGallery(segmentClass, photoClass, prevClass, nextClass) {
  document.querySelectorAll(`.${segmentClass} .${prevClass}`).forEach(btn => {
    btn.onclick = function(e) {
      e.stopPropagation();
      const gallery = btn.parentElement;
      const images = Array.from(gallery.querySelectorAll(`.${photoClass}`));
      let activeIndex = images.findIndex(img => img.classList.contains('active'));
      images[activeIndex].classList.remove('active');
      activeIndex = (activeIndex - 1 + images.length) % images.length;
      images[activeIndex].classList.add('active');
    };
  });
  document.querySelectorAll(`.${segmentClass} .${nextClass}`).forEach(btn => {
    btn.onclick = function(e) {
      e.stopPropagation();
      const gallery = btn.parentElement;
      const images = Array.from(gallery.querySelectorAll(`.${photoClass}`));
      let activeIndex = images.findIndex(img => img.classList.contains('active'));
      images[activeIndex].classList.remove('active');
      activeIndex = (activeIndex + 1) % images.length;
      images[activeIndex].classList.add('active');
    };
  });
}
document.addEventListener('DOMContentLoaded', function() {
  setupGallery('book-segment', 'book-photo', 'book-prev', 'book-next');
  setupGallery('heart-segment', 'heart-photo', 'heart-prev', 'heart-next');
});