let money = 0;
let incomePerSecond = 0;
let stockAmount = 0;
let stockPrice = 100;

// Aktualizacja wyświetlacza
function updateDisplay() {
  document.getElementById('money').textContent = money.toFixed(2);
  document.getElementById('stock-amount').textContent = stockAmount;
  document.getElementById('stock-price').textContent = stockPrice.toFixed(2);
}

// Giełda
document.getElementById('buy-stock').addEventListener('click', () => {
  if (money >= stockPrice) {
    money -= stockPrice;
    stockAmount += 1;
    updateDisplay();
  } else {
    alert('Nie masz wystarczająco pieniędzy!');
  }
});

document.getElementById('sell-stock').addEventListener('click', () => {
  if (stockAmount > 0) {
    money += stockPrice;
    stockAmount -= 1;
    updateDisplay();
  } else {
    alert('Nie masz akcji do sprzedaży!');
  }
});

// Zmienność ceny akcji
setInterval(() => {
  stockPrice += (Math.random() - 0.5) * 10; // Losowa zmiana ceny
  stockPrice = Math.max(10, stockPrice); // Minimalna cena to 10$
  updateDisplay();
}, 60000); // Co minutę