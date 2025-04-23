// Godziny lekcji
const lessons = [
    { start: "08:00", end: "08:45" },
    { start: "08:50", end: "09:35" },
    { start: "09:45", end: "10:30" },
    { start: "10:40", end: "11:25" },
    { start: "11:45", end: "12:30" },
    { start: "12:50", end: "13:35" },
    { start: "13:40", end: "14:25" }
];

let currentLessonIndex = 0;

// Zegar z sekundami
function updateClock() {
    const now = new Date();
    document.getElementById("currentTime").textContent = now.toLocaleTimeString();
}
setInterval(updateClock, 1000);

// Przeliczniki czasu
document.getElementById("minutesToSeconds").textContent = 60;
document.getElementById("hoursToMinutes").textContent = 60;
document.getElementById("hoursToSeconds").textContent = 3600;

// Funkcja odliczania
function updateCountdown() {
    const now = new Date();
    const end = new Date();
    const [endHour, endMinute] = lessons[currentLessonIndex].end.split(":");
    end.setHours(endHour, endMinute, 0, 0);

    const diff = end - now;

    if (diff <= 0) {
        // Lekcja się skończyła — animacja
        triggerAnimation();
        currentLessonIndex = (currentLessonIndex + 1) % lessons.length;
    } else {
        // Wyświetl odliczanie
        const minutes = Math.floor(diff / 60000);
        const seconds = Math.floor((diff % 60000) / 1000);
        document.getElementById("countdownTimer").textContent =
            `${minutes} minut ${seconds} sekund`;
    }
}

// Animacje na koniec lekcji
function triggerAnimation() {
    const animationContainer = document.getElementById("animationContainer");
    animationContainer.innerHTML = ""; // Resetuj poprzednie animacje

    const animation = document.createElement("div");
    animation.style.animation = "pulse 2s infinite";
    animationContainer.appendChild(animation);

    setTimeout(() => {
        animationContainer.innerHTML = ""; // Usuń animację po kilku sekundach
    }, 5000);
}

setInterval(updateCountdown, 1000);

// Uruchom odliczanie od pierwszej lekcji
updateCountdown();
updateClock();