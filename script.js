let money = 0;
let incomePerSecond = 0;
let experience = 0;
let level = 1;
let bonusAvailable = true;

// Aktualizacja wyświetlanych danych
function updateDisplay() {
  document.getElementById('money').textContent = money.toFixed(2);
  document.getElementById('income').textContent = incomePerSecond.toFixed(2);
  document.getElementById('experience').textContent = experience;
  document.getElementById('level').textContent = level;
}

// Zarabianie za kliknięcie
document.getElementById('click-button').addEventListener('click', () => {
  const clickIncome = 1 + level * 0.5; // Bonus zależny od poziomu
  money += clickIncome;
  experience += 1;
  levelUp();
  updateDisplay();
});

// Automatyczny dochód
setInterval(() => {
  money += incomePerSecond;
  updateDisplay();
}, 1000);

// Ulepszanie
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

// Inwestycje
document.querySelectorAll('.investment').forEach(button => {
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

// Bonus co 5 minut
document.getElementById('collect-bonus').addEventListener('click', () => {
  if (bonusAvailable) {
    money += 500 * level;
    experience += 50;
    bonusAvailable = false;
    setTimeout(() => {
      bonusAvailable = true;
    }, 300000); // 5 minut
    updateDisplay();
  } else {
    alert('Bonus nie jest jeszcze dostępny!');
  }
});

// Poziomy
function levelUp() {
  if (experience >= level * 100) {
    level++;
    incomePerSecond += level * 10; // Nagroda za poziom
    alert(`Awansowałeś na poziom ${level}!`);
    updateDisplay();
  }
}

// Mod Menu
document.getElementById('mod-code').addEventListener('input', (e) => {
  if (e.target.value === '7432') {
    document.getElementById('mod-menu').style.display = 'block';
  }
});

document.getElementById('add-money').addEventListener('click', () => {
  money += 1000;
  updateDisplay();
});

document.getElementById('unlock-all').addEventListener('click', () => {
  incomePerSecond += 1000;
  updateDisplay();
});

document.getElementById('speed-up').addEventListener('click', () => {
  alert('Przyspieszono grę!');
});

document.getElementById('add-xp').addEventListener('click', () => {
  experience += 100;
  levelUp();
  updateDisplay();
});