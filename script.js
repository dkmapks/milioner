let money = 0;
let totalAssets = 0;
let job = 'Bezrobotny';
let incomeMultiplier = 1;
let unlockedJobs = ['Bezrobotny'];
let ownedAssets = [];
let cryptocurrencies = {
  Bitcoin: { price: 50000, owned: 0 },
  Ethereum: { price: 3000, owned: 0 },
  Dogecoin: { price: 0.07, owned: 0 },
};

// Lista prac, w tym firma
const jobs = [
  { name: "Bezrobotny", earnings: 10, interval: 1000, price: 0 },
  { name: "Firma", earnings: 6000000, interval: 180000, price: 50000000 },
];

// Początkowe zarobki
function earnMoney() {
  const jobDetails = jobs.find(j => j.name === job);
  if (!jobDetails) return;
  money += (jobDetails.earnings * incomeMultiplier);
  updateStats();
}

function updateStats() {
  document.getElementById('money').textContent = money.toFixed(2);
  document.getElementById('job').textContent = job;
  calculateTotalAssets();
}

// Otwarcie firmy
function openBusiness() {
  if (job === "Firma") return alert("Jesteś już właścicielem firmy!");
  const business = jobs.find(j => j.name === "Firma");
  if (!business) return;
  if (money >= business.price) {
    money -= business.price;
    job = "Firma";
    alert("Otworzyłeś firmę! Zarabiasz teraz 6 milionów co 3 minuty.");
    updateStats();
    setInterval(earnMoney, business.interval);
  } else {
    alert("Za mało pieniędzy, aby otworzyć firmę!");
  }
}

// Mod Menu
function toggleModMenu() {
  document.getElementById('mod-menu').classList.toggle('hidden');
}

function checkModCode() {
  const code = document.getElementById('mod-code').value;
  if (code === '7432') {
    alert('Mod Menu Odblokowane!');
    enableModMenuFeatures();
  } else {
    alert('Nieprawidłowy kod!');
  }
}

function enableModMenuFeatures() {
  document.getElementById('mod-menu').innerHTML = `
    <h2>Mod Menu</h2>
    <button onclick="addCustomMoney()">Dodaj Pieniądze</button>
  `;
}

function addCustomMoney() {
  const amount = parseFloat(prompt("Podaj kwotę, którą chcesz dodać:"));
  if (!isNaN(amount)) {
    money += amount;
    alert(`Dodano ${amount} $!`);
    updateStats();
  } else {
    alert("Nieprawidłowa kwota!");
  }
}

// Podsumowanie majątku
function calculateTotalAssets() {
  totalAssets = money;
  for (const [crypto, details] of Object.entries(cryptocurrencies)) {
    totalAssets += details.price * details.owned;
  }
  totalAssets += ownedAssets.reduce((sum, asset) => sum + asset.price, 0);
  document.getElementById('total-assets').textContent = totalAssets.toFixed(2);
}

// Zapisywanie gry
function saveGame() {
  const gameState = {
    money,
    job,
    unlockedJobs,
    ownedAssets,
    cryptocurrencies,
  };
  localStorage.setItem('gameState', JSON.stringify(gameState));
  alert('Gra zapisana!');
}

// Wczytywanie gry
function loadGame() {
  const gameState = JSON.parse(localStorage.getItem('gameState'));
  if (gameState) {
    money = gameState.money;
    job = gameState.job;
    unlockedJobs = gameState.unlockedJobs;
    ownedAssets = gameState.ownedAssets;
    cryptocurrencies = gameState.cryptocurrencies;
    alert('Gra wczytana!');
    updateStats();
  } else {
    alert('Brak zapisanej gry!');
  }
}