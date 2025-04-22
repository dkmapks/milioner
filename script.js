let money = 0;
let incomePerSecond = 0;
let experience = 0;
let level = 1;
let bonusAvailable = true;
let gameSpeed = 1; // Domyślna prędkość gry
let savings = 0; // Lokaty
let savingsInterest = 0;
let prestigeBonus = 0; // Prestiż

function updateDisplay() {
  document.getElementById('money').textContent = money.toFixed(2);
  document.getElementById('income').textContent = incomePerSecond.toFixed(2);
  document.getElementById('experience').textContent = experience;
  document.getElementById('level').textContent = level;
  document.getElementById('savings-amount').textContent = savings.toFixed(2);
  document.getElementById('savings-interest').textContent = savingsInterest.toFixed(2);
  document.getElementById('prestige-bonus').textContent = `${prestigeBonus}%`;
}

// Zarabianie za kliknięcie
document.getElementById('click-button').addEventListener('click', () => {
  const clickIncome = (1 + level * 0.5) * (1 + prestigeBonus / 100);
  money += clickIncome;
  experience += 1;
  levelUp();
  updateDisplay();
});

// Automatyczny dochód
setInterval(() => {
  money += incomePerSecond * gameSpeed;
  if (savings > 0) {
    savingsInterest += savings * 0.05; // 5% na minutę
  }
  updateDisplay();
}, 1000);

// Ulepszenia
document.querySelectorAll('.upgrade').forEach(button => {
  button.addEventListener('click', () => {
    const cost = parseInt(button.getAttribute('data-cost'));
    const income = parseInt(button.getAttribute('data-income'));

    if (money >= cost) {
      money -= cost;
      incomePerSecond += income;
      updateDisplay();
    } else {
      alert('Nie masz wystarczająco pieniędzy!');
    }
  });
});

// Lokaty
document.getElementById('open-savings').addEventListener('click', () => {
  if (money >= 10000) {
    money -= 10000;
    savings += 10000;
    updateDisplay();
  } else {
    alert('Nie masz wystarczająco pieniędzy na lokatę!');
  }
});

document.getElementById('withdraw-savings').addEventListener('click', () => {
  money += savings + savingsInterest;
  savings = 0;
  savingsInterest = 0;
  updateDisplay();
});

// Prestiż
document.getElementById('prestige-reset').addEventListener('click', () => {
  if (confirm('Czy na pewno chcesz zresetować grę i zyskać prestiż?')) {
    prestigeBonus += 10;
    money = 0;
    incomePerSecond = 0;
    experience = 0;
    level = 1;
    savings = 0;
    savingsInterest = 0;
    updateDisplay();
  }
});

// Mod Menu
document.getElementById('mod-code').addEventListener('input', (e) => {
  if (e.target.value === '7432') {
    document.getElementById('mod-menu').style.display = 'block';
  }
});

document.getElementById('add-money').addEventListener('click', () => {
  money += 10000;
  updateDisplay();
});

document.getElementById('reset').addEventListener('click', () => {
  if (confirm('Resetować grę?')) {
    money = 0;
    incomePerSecond = 0;
    level = 1;
    experience = 0;
    updateDisplay();
  }
});