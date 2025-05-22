document.addEventListener("DOMContentLoaded", function() {
    document.querySelectorAll(".faq-question").forEach(button => {
        button.addEventListener("click", function() {
            let answer = this.nextElementSibling;

            // Zatvori sve otvorene odgovore osim trenutnog
            document.querySelectorAll(".faq-answer").forEach(item => {
                if (item !== answer) {
                    item.style.display = "none";
                }
            });

            // Otvori/zatvori trenutni odgovor
            answer.style.display = (answer.style.display === "block") ? "none" : "block";
        });
    });
});

document.querySelectorAll('.faq-question').forEach(button => {
    button.addEventListener('click', () => {
        const faqItem = button.parentElement;
        const answer = faqItem.querySelector('.faq-answer');
        
        faqItem.classList.toggle('active');
        answer.classList.toggle('active');
    });
});



// padajuci meni valjda??
function toggleDropdown(event) {
    event.preventDefault(); // Sprečava da se link izvrši
    const dropdown = document.getElementById("shopMenu");
    dropdown.classList.toggle("show");
}

window.addEventListener("click", function(event) {
    const dropdown = document.getElementById("shopMenu");
    const toggle = document.getElementById("shopDropdown");

    if (!toggle.contains(event.target)) {
        dropdown.classList.remove("show");
    }
});

// validacija
document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");
    const ime = form.querySelector("input[name='ime']");
    const prezime = form.querySelector("input[name='prezime']");
    const email = form.querySelector("input[name='email']");
    const poruka = form.querySelector("textarea[name='poruka']");

    form.addEventListener("submit", function (e) {
        let valid = true;

        // Resetuj stilove
        [ime, prezime, email, poruka].forEach(field => {
            field.style.border = "none";
        });

        // Proveri ime
        if (ime.value.trim().length < 2) {
            valid = false;
        }

        // Proveri prezime
        if (prezime.value.trim().length < 2) {
            valid = false;
        }

        // Proveri email (osnovna provera)
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.value.trim())) {
            valid = false;
        }

        // Proveri poruku
        if (poruka.value.trim().length < 10) {
            valid = false;
        }

        if (!valid) {
            e.preventDefault(); // Sprečava slanje forme
            alert("Molimo te da ispravno popuniš sva polja.");
        }
    });
});


// slajder slika
const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dot");
const prev = document.querySelector(".prev");
const next = document.querySelector(".next");

let index = 0;

function showSlide(i) {
    slides.forEach(slide => slide.classList.remove("active"));
    dots.forEach(dot => dot.classList.remove("active"));

    slides[i].classList.add("active");
    dots[i].classList.add("active");
}

function nextSlide() {
    index = (index + 1) % slides.length;
    showSlide(index);
}

function prevSlide() {
    index = (index - 1 + slides.length) % slides.length;
    showSlide(index);
}

next.addEventListener("click", nextSlide);
prev.addEventListener("click", prevSlide);

dots.forEach((dot, i) => {
    dot.addEventListener("click", () => {
        index = i;
        showSlide(index);
    });
});

// Automatska promena svakih 5 sekundi
setInterval(nextSlide, 5000);


  // Promena teme svetlo/tama
  document.addEventListener("DOMContentLoaded", function() {
    const toggleButton = document.getElementById('theme-toggle');
    const body = document.body;

    // Učitaj prethodnu temu ako postoji
    if (localStorage.getItem('theme') === 'dark') {
        body.classList.add('dark-mode');
    }

    if (toggleButton) {
        toggleButton.addEventListener('click', () => {
            body.classList.toggle('dark-mode');

            // Sačuvaj izbor
            if (body.classList.contains('dark-mode')) {
                localStorage.setItem('theme', 'dark');
            } else {
                localStorage.setItem('theme', 'light');
            }
        });
    } else {
        console.warn('Dugme sa id "theme-toggle" nije pronađeno.');
    }
});

  
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


 
