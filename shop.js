    const toggleButton = document.getElementById('theme-toggle');
    const body = document.body;

    // Učitaj prethodnu temu ako postoji
    if (localStorage.getItem('theme') === 'dark') {
        body.classList.add('dark-mode');
    }

    toggleButton.addEventListener('click', () => {
        body.classList.toggle('dark-mode');

        // Sačuvaj izbor
        if (body.classList.contains('dark-mode')) {
            localStorage.setItem('theme', 'dark');
        } else {
            localStorage.setItem('theme', 'light');
        }
    });

    // prevod
      function changeLanguage(selectElement) {
  const selectedLang = selectElement.value;

  // Nađi sve elemente koji imaju data-sr i data-en
  const translatableElements = document.querySelectorAll('[data-sr][data-en]');

  translatableElements.forEach(el => {
    if (selectedLang === 'sr') {
      el.textContent = el.getAttribute('data-sr');
    } else if (selectedLang === 'en') {
      el.textContent = el.getAttribute('data-en');
    }
  });
}

