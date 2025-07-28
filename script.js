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
// Step 1: Get birth date from localStorage
const birthDate = localStorage.getItem("birthDate");

// Step 2: Zodiac calculation
function getZodiacSign(dateStr) {
  const date = new Date(dateStr);
  const day = date.getDate();
  const month = date.getMonth() + 1;

  if ((month == 3 && day >= 21) || (month == 4 && day <= 19)) return "Aries";
  if ((month == 4 && day >= 20) || (month == 5 && day <= 20)) return "Taurus";
  if ((month == 5 && day >= 21) || (month == 6 && day <= 20)) return "Gemini";
  if ((month == 6 && day >= 21) || (month == 7 && day <= 22)) return "Cancer";
  if ((month == 7 && day >= 23) || (month == 8 && day <= 22)) return "Leo";
  if ((month == 8 && day >= 23) || (month == 9 && day <= 22)) return "Virgo";
  if ((month == 9 && day >= 23) || (month == 10 && day <= 22)) return "Libra";
  if ((month == 10 && day >= 23) || (month == 11 && day <= 21)) return "Scorpio";
  if ((month == 11 && day >= 22) || (month == 12 && day <= 21)) return "Sagittarius";
  if ((month == 12 && day >= 22) || (month == 1 && day <= 19)) return "Capricorn";
  if ((month == 1 && day >= 20) || (month == 2 && day <= 18)) return "Aquarius";
  if ((month == 2 && day >= 19) || (month == 3 && day <= 20)) return "Pisces";
  return "Unknown";
}

// Step 3: Get a random fortune
function getRandomFortune() {
  const fortunes = [
    "A lucky surprise is on the way.",
    "Your kindness will bring blessings.",
    "You will reach a goal very soon.",
    "Your smile will change someone’s day.",
    "Great things are coming your way!"
  ];
  return fortunes[Math.floor(Math.random() * fortunes.length)];
}

// Step 4: Check and display
if (!birthDate) {
  alert("Please login again.");
  window.location.href = "login.html";
} else {
  const zodiacSign = getZodiacSign(birthDate);
  document.getElementById("zodiacDisplay").innerText = zodiacSign;
  document.getElementById("fortuneDisplay").innerText = getRandomFortune();
}

