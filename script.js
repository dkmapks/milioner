document.getElementById('calculate-btn').addEventListener('click', () => {
    // Pobierz wartości z formularza
    const tiktokRPM = parseFloat(document.getElementById('tiktok-rpm').value) || 0;
    const tiktokViews = parseFloat(document.getElementById('tiktok-views').value) || 0;
    const youtubeRPM = parseFloat(document.getElementById('youtube-rpm').value) || 0;
    const youtubeViews = parseFloat(document.getElementById('youtube-views').value) || 0;
    const instagramPostRate = parseFloat(document.getElementById('instagram-post-rate').value) || 0;
    const instagramPosts = parseFloat(document.getElementById('instagram-posts').value) || 0;
    const additionalIncome = parseFloat(document.getElementById('additional-income').value) || 0;

    // Oblicz zarobki
    const tiktokIncome = tiktokRPM * tiktokViews;
    const youtubeIncome = youtubeRPM * youtubeViews;
    const instagramIncome = instagramPostRate * instagramPosts;
    const totalIncome = tiktokIncome + youtubeIncome + instagramIncome + additionalIncome;

    // Oblicz podatek
    const taxRate = totalIncome > 120000 ? 0.32 : 0.12;
    const incomeAfterTax = totalIncome * (1 - taxRate);

    // Oblicz wyniki
    const yearlyIncome = incomeAfterTax;
    const monthlyIncome = yearlyIncome / 12;
    const halfYearIncome = yearlyIncome / 2;
    const dailyIncome = yearlyIncome / 365;

    // Wyświetl wyniki
    document.getElementById('monthly-income').textContent = monthlyIncome.toFixed(2);
    document.getElementById('yearly-income').textContent = yearlyIncome.toFixed(2);
    document.getElementById('half-year-income').textContent = halfYearIncome.toFixed(2);
    document.getElementById('daily-income').textContent = dailyIncome.toFixed(2);
});