let money = 0;
let job = 'Unemployed';

function earnMoney() {
  if (job === 'Unemployed') {
    alert('You need a job to earn money!');
    return;
  }
  money += 10; // Example earnings
  updateStats();
}

function openShop() {
  alert('Shop is under construction!');
}

function openBank() {
  alert('Bank is under construction!');
}

function updateStats() {
  document.getElementById('money').textContent = money;
  document.getElementById('job').textContent = job;
}

function toggleModMenu() {
  const modMenu = document.getElementById('mod-menu');
  modMenu.classList.toggle('hidden');
}

function checkModCode() {
  const code = document.getElementById('mod-code').value;
  if (code === '7432') {
    alert('Mod Menu Unlocked!');
    // Add Mod Menu features here
  } else {
    alert('Wrong code!');
  }
}