function logout() {
  localStorage.clear();
  window.location.href = 'index.html';
}

function getZodiacSign(month, day) {
  const signs = [
    { sign: "Capricorn", from: [12, 22], to: [1, 19] },
    { sign: "Aquarius", from: [1, 20], to: [2, 18] },
    { sign: "Pisces", from: [2, 19], to: [3, 20] },
    { sign: "Aries", from: [3, 21], to: [4, 19] },
    { sign: "Taurus", from: [4, 20], to: [5, 20] },
    { sign: "Gemini", from: [5, 21], to: [6, 20] },
    { sign: "Cancer", from: [6, 21], to: [7, 22] },
    { sign: "Leo", from: [7, 23], to: [8, 22] },
    { sign: "Virgo", from: [8, 23], to: [9, 22] },
    { sign: "Libra", from: [9, 23], to: [10, 22] },
    { sign: "Scorpio", from: [10, 23], to: [11, 21] },
    { sign: "Sagittarius", from: [11, 22], to: [12, 21] }
  ];

  for (const { sign, from, to } of signs) {
    if ((month === from[0] && day >= from[1]) || (month === to[0] && day <= to[1])) {
      return sign;
    }
  }

  return "Unknown";
}
document.getElementById('signupForm')?.addEventListener('submit', function (e) {
  e.preventDefault();

  const username = e.target[0].value.trim();
  const password = e.target[1].value.trim();
  const birthdate = new Date(e.target[2].value);
  const zodiac = getZodiacSign(birthdate.getMonth() + 1, birthdate.getDate());

  if (username && password && birthdate) {
    localStorage.setItem('username', username);
    localStorage.setItem('password', password);
    localStorage.setItem('zodiac', zodiac);

    document.getElementById('signupMessage').style.color = "lightgreen";
    document.getElementById('signupMessage').textContent = "✔️ Account created successfully! Redirecting...";

    setTimeout(() => {
      window.location.href = 'login.html';
      localStorage.setItem('zodiac', zodiac);
    }, 1500);
  }
});
document.getElementById('loginForm')?.addEventListener('submit', function (e) {
  e.preventDefault();

  const inputUser = e.target[0].value.trim();
  const inputPass = e.target[1].value.trim();
  const storedUser = localStorage.getItem('username');
  const storedPass = localStorage.getItem('password');
  const loginMsg = document.getElementById('loginMessage');

  loginMsg.textContent = ""; // Clear previous messages

  if (inputUser === storedUser && inputPass === storedPass) {
    loginMsg.style.color = "lightgreen";
    loginMsg.textContent = "✔️ Login successful! Redirecting...";
    setTimeout(() => {
      window.location.href = 'fortune.html';
    }, 1500);
  } else {
    loginMsg.style.color = "red";
    loginMsg.textContent = "❌ Incorrect username or password!";
  }
});
function getFortune(zodiac) {
  const fortunes = {
    Aries: "Embrace your adventurous spirit today — risks might lead to big rewards.",
    Taurus: "Patience will win you respect. Steady persistence beats dramatic flair.",
    Gemini: "Conversations spark breakthroughs. Share your thoughts boldly.",
    Cancer: "Protect your energy — not everyone deserves your kindness today.",
    Leo: "You’re the star of the show, but don’t forget to lift others up too.",
    Virgo: "Details matter. Fine-tune your work and watch success follow.",
    Libra: "Seek balance, but make decisions swiftly — indecision clouds clarity.",
    Scorpio: "Trust your instincts. Something mysterious may work in your favor.",
    Sagittarius: "Explore new ideas. Your curiosity unlocks opportunity.",
    Capricorn: "Discipline will be tested — stay focused on long-term goals.",
    Aquarius: "Innovate. Your unique view could shift someone’s perspective.",
    Pisces: "Creativity flows strongly — dive into something expressive today."
  };

  return fortunes[zodiac] || "The stars are quiet today. Tune in again later.";
}

