let money = 0;
let incomePerSecond = 0;
let level = 1;

// Aktualizacja wyświetlanych danych
function updateDisplay() {
  document.getElementById('money').textContent = money.toFixed(2);
  document.getElementById('income').textContent = incomePerSecond.toFixed(2);
  document.getElementById('level').textContent = level;
}

// Zarabianie za kliknięcie
document.getElementById('click-button').addEventListener('click', () => {
  money += 1 + level * 0.5; // Bonus zależny od poziomu
  updateDisplay();
});

// Automatyczny dochód
setInterval(() => {
  money += incomePerSecond;
  updateDisplay();
}, 1000);

// Obsługa ulepszeń
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

// Obsługa inwestycji
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

// Obsługa Mod Menu
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
  incomePerSecond += 500;
  updateDisplay();
});

document.getElementById('speed-up').addEventListener('click', () => {
  alert('Przyspieszono grę!');
});
