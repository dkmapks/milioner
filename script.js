let money = 0;
let job = 'Bezrobotny';
let incomeMultiplier = 1;
let unlockedJobs = ['Bezrobotny'];
let cryptocurrencies = {
  Bitcoin: { price: 50000, owned: 0 },
  Ethereum: { price: 3000, owned: 0 },
  Dogecoin: { price: 0.07, owned: 0 },
};

const jobs = [
  { name: "Bezrobotny", earnings: 0, price: 0 },
  { name: "Stażysta", earnings: 2500, price: 5000 },
  { name: "Młodszy Programista", earnings: 5500, price: 15000 },
  { name: "Starszy Programista", earnings: 12000, price: 30000 },
  { name: "Manager", earnings: 27000, price: 60000 },
  { name: "CTO", earnings: 60000, price: 120000 },
  { name: "Przedsiębiorca", earnings: 130000, price: 250000 },
  { name: "Inwestor", earnings: 300000, price: 500000 },
  { name: "Trader", earnings: 800000, price: 1000000 },
  { name: "Ekspert Crypto", earnings: 2000000, price: 2000000 },
  { name: "Milioner", earnings: 5000000, price: 5000000 },
];

function updateStats() {
  document.getElementById('money').textContent = money.toFixed(2);
  document.getElementById('job').textContent = job;
}

function earnMoney() {
  const jobDetails = jobs.find(j => j.name === job);
  if (!jobDetails) return;
  money += (jobDetails.earnings / 20) * incomeMultiplier;
  updateStats();
}

function unlockJob(jobName) {
  const jobDetails = jobs.find(j => j.name === jobName);
  if (!jobDetails || unlockedJobs.includes(jobName)) return alert('Praca jest już odblokowana lub jest nieprawidłowa!');
  if (money >= jobDetails.price) {
    money -= jobDetails.price;
    unlockedJobs.push(jobName);
    alert(`${jobName} odblokowana!`);
    updateStats();
  } else {
    alert('Za mało pieniędzy na odblokowanie tej pracy!');
  }
}

function openShop() {
  const jobOptions = jobs
    .filter(job => !unlockedJobs.includes(job.name))
    .map(job => `${job.name} - $${job.price}`)
    .join('\n');
  if (!jobOptions) return alert('Wszystkie prace są już odblokowane!');
  const selectedJob = prompt(`Dostępne prace:\n${jobOptions}\n\nPodaj nazwę pracy, aby ją odblokować:`);
  if (selectedJob) unlockJob(selectedJob);
}

function openCrypto() {
  const cryptoList = document.getElementById('crypto-list');
  cryptoList.innerHTML = '';
  for (const [cryptoName, crypto] of Object.entries(cryptocurrencies)) {
    const div = document.createElement('div');
    div.textContent = `${cryptoName}: $${crypto.price.toFixed(2)} (Posiadane: ${crypto.owned})`;
    const buyButton = document.createElement('button');
    buyButton.textContent = 'Kup';
    buyButton.onclick = () => buyCrypto(cryptoName, parseInt(prompt(`Ile ${cryptoName} chcesz kupić?`)));
    const sellButton = document.createElement('button');
    sellButton.textContent = 'Sprzedaj';
    sellButton.onclick = () => sellCrypto(cryptoName, parseInt(prompt(`Ile ${cryptoName} chcesz sprzedać?`)));
    div.appendChild(buyButton);
    div.appendChild(sellButton);
    cryptoList.appendChild(div);
  }
  document.getElementById('crypto-market').classList.remove('hidden');
}

function closeCrypto() {
  document.getElementById('crypto-market').classList.add('hidden');
}

function buyCrypto(cryptoName, amount) {
  const crypto = cryptocurrencies[cryptoName];
  if (!crypto) return alert('Nieprawidłowa kryptowaluta!');
  const cost = crypto.price * amount;
  if (money >= cost) {
    money -= cost;
    crypto.owned += amount;
    alert(`Kupiono ${amount} ${cryptoName}!`);
    updateStats();
  } else {
    alert('Za mało pieniędzy!');
  }
}

function sellCrypto(cryptoName, amount) {
  const crypto = cryptocurrencies[cryptoName];
  if (!crypto) return alert('Nieprawidłowa kryptowaluta!');
  if (crypto.owned >= amount) {
    const earnings = crypto.price * amount;
    crypto.owned -= amount;
    money += earnings;
    alert(`Sprzedano ${amount} ${cryptoName}!`);
    updateStats();
  } else {
    alert('Nie masz wystarczająco dużo kryptowaluty!');
  }
}

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
    <button onclick="money += 1000000; updateStats()">Dodaj $1,000,000</button>
    <button onclick="unlockAllJobs()">Odblokuj wszystkie prace</button>
  `;
}

function unlockAllJobs() {
  unlockedJobs = jobs.map(job => job.name);
  alert('Wszystkie prace odblokowane!');
  updateStats();
}

// Inicjalizacja
setInterval(() => {
  for (const crypto in cryptocurrencies) {
    cryptocurrencies[crypto].price *= 1 + (Math.random() * 0.1 - 0.05);
    cryptocurrencies[crypto].price = parseFloat(cryptocurrencies[crypto].price.toFixed(2));
  }
}, 30000);

updateStats();