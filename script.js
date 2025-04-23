let money = 0;
let job = 'Unemployed';
let incomeMultiplier = 1;

// List of jobs with random salaries up to 1 million
const jobs = [
  { name: "Intern", salary: 5000 },
  { name: "Junior Developer", salary: 15000 },
  { name: "Senior Developer", salary: 50000 },
  { name: "Manager", salary: 100000 },
  { name: "CTO", salary: 300000 },
  { name: "Entrepreneur", salary: 200000 },
  { name: "Investor", salary: 500000 },
  { name: "Trader", salary: 800000 },
  { name: "Crypto Expert", salary: 900000 },
  { name: "Millionaire", salary: 1000000 }
];

// Randomly assign a job at the start
function assignRandomJob() {
  const randomIndex = Math.floor(Math.random() * jobs.length);
  job = jobs[randomIndex].name;
  updateStats();
}

// Earn money based on job salary and income multiplier
function earnMoney() {
  if (job === 'Unemployed') {
    alert('You need a job to earn money!');
    return;
  }
  const jobDetails = jobs.find(j => j.name === job);
  money += jobDetails.salary * incomeMultiplier;
  updateStats();
}

// Upgrade income multiplier
function upgradeMultiplier() {
  if (money >= 100000) { // Example cost for upgrade
    money -= 100000;
    incomeMultiplier += 0.5; // Increase multiplier
    alert('Income multiplier upgraded!');
    updateStats();
  } else {
    alert('Not enough money to upgrade multiplier!');
  }
}

// Open shop placeholder
function openShop() {
  alert('Shop is under construction!');
}

// Open bank placeholder
function openBank() {
  alert('Bank is under construction!');
}

// Update stats display
function updateStats() {
  document.getElementById('money').textContent = money.toFixed(2);
  document.getElementById('job').textContent = job;
}

// Toggle mod menu visibility
function toggleModMenu() {
  const modMenu = document.getElementById('mod-menu');
  modMenu.classList.toggle('hidden');
}

// Check mod menu code and unlock features
function checkModCode() {
  const code = document.getElementById('mod-code').value;
  if (code === '7432') {
    alert('Mod Menu Unlocked!');
    enableModMenuFeatures();
  } else {
    alert('Wrong code!');
  }
}

// Mod menu features
function enableModMenuFeatures() {
  const modMenu = document.getElementById('mod-menu');
  modMenu.innerHTML = `
    <h2>Mod Menu</h2>
    <button onclick="addMoney()">Add $1,000,000</button>
    <button onclick="selectJob()">Select Job</button>
  `;
}

// Add money cheat
function addMoney() {
  money += 1000000;
  updateStats();
  alert('Added $1,000,000!');
}

// Select a specific job
function selectJob() {
  const jobNames = jobs.map(job => job.name).join('\n');
  const selectedJob = prompt(`Select a job:\n${jobNames}`);
  if (jobs.some(j => j.name === selectedJob)) {
    job = selectedJob;
    updateStats();
    alert(`You are now a ${selectedJob}!`);
  } else {
    alert('Invalid job selected!');
  }
}

// Initialize game
assignRandomJob();