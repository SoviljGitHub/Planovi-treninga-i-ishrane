// SVETLO/TAMNA TEMA (PREVEDENO)
const prekidacTeme = document.getElementById('prekidac');
const teloStranice = document.body;

function zameniIkonice() {
    const tamnaTema = teloStranice.classList.contains('tamni-režim');

    const oznake = document.querySelectorAll('.dodatna-informacija img, .informacioni-kontejner img');

    oznake.forEach(slika => {
        slika.src = tamnaTema ? 'plava-oznaka.png' : 'ikonica-provera.png';
    });

    const kontaktSlike = document.querySelectorAll('.kontakt-info img');

    kontaktSlike.forEach(slika => {
        const alt = slika.alt.toLowerCase();

        if (alt.includes("adresa")) {
            slika.src = tamnaTema ? 'adresa2.png' : 'adresa.png';
        } else if (alt.includes("telefon")) {
            slika.src = tamnaTema ? 'telefon2.png' : 'telefon.png';
        } else if (alt.includes("imejl")) {
            slika.src = tamnaTema ? 'imejl2.png' : 'imejl.png';
        }
    });
}

if (localStorage.getItem('tema') === 'mrak') {
    teloStranice.classList.add('tamni-režim');
    zameniIkonice();
}

prekidacTeme.addEventListener('click', () => {
    teloStranice.classList.toggle('tamni-režim');
    localStorage.setItem('tema', teloStranice.classList.contains('tamni-režim') ? 'mrak' : 'svetlo');
    zameniIkonice();
});

// NAJČEŠĆA PITANJA
document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".najcesca-pitanja").forEach(dugme => {
        dugme.addEventListener("click", function () {
            let odgovor = this.nextElementSibling;

            document.querySelectorAll(".odgovor").forEach(item => {
                if (item !== odgovor) {
                    item.style.display = "none";
                    item.parentElement.classList.remove("aktivan");
                }
            });

            if (odgovor.style.display === "block") {
                odgovor.style.display = "none";
                this.parentElement.classList.remove("aktivan");
            } else {
                odgovor.style.display = "block";
                this.parentElement.classList.add("aktivan");
            }
        });
    });
});

// PADAJUĆI MENI
document.addEventListener("DOMContentLoaded", function () {
    const dugme = document.getElementById("dugmeProdavnica");
    const link = dugme?.querySelector("a");
    const meni = document.getElementById("meniProdavnica");

    if (dugme && link && meni) {
        link.addEventListener("click", function (dogadjaj) {
            dogadjaj.preventDefault();
            meni.classList.toggle("prikazi");
        });

        window.addEventListener("click", function (dogadjaj) {
            if (!dugme.contains(dogadjaj.target)) {
                meni.classList.remove("prikazi");
            }
        });
    }
});

// VALIDACIJA
document.addEventListener("DOMContentLoaded", function () {
    const forma = document.querySelector("form");
    if (!forma) return;

    const ime = forma.querySelector("input[name='ime']");
    const prezime = forma.querySelector("input[name='prezime']");
    const email = forma.querySelector("input[name='email']");
    const poruka = forma.querySelector("textarea[name='poruka']");

    forma.addEventListener("submit", function (e) {
        let validno = true;

        [ime, prezime, email, poruka].forEach(polje => {
            if (polje) polje.style.border = "none";
        });

        if (!ime || ime.value.trim().length < 2) validno = false;
        if (!prezime || prezime.value.trim().length < 2) validno = false;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || !emailRegex.test(email.value.trim())) validno = false;
        if (!poruka || poruka.value.trim().length < 10) validno = false;

        if (!validno) {
            e.preventDefault();
            alert("Molimo te da ispravno popuniš sva polja.");
        }
    });
});

// SLAJDER
const slajdovi = document.querySelectorAll(".slajd");
const tacke = document.querySelectorAll(".tacka");
const prethodno = document.querySelector(".prethodno");
const sledece = document.querySelector(".sledece");

let indeks = 0;
if (slajdovi.length > 0 && tacke.length > 0) {
    function prikaziSlajd(i) {
        slajdovi.forEach(slajd => slajd.classList.remove("aktivno"));
        tacke.forEach(tacka => tacka.classList.remove("aktivno"));
        slajdovi[i].classList.add("aktivno");
        tacke[i].classList.add("aktivno");
    }

    function sledeciSlajd() {
        indeks = (indeks + 1) % slajdovi.length;
        prikaziSlajd(indeks);
    }

    function prethodniSlajd() {
        indeks = (indeks - 1 + slajdovi.length) % slajdovi.length;
        prikaziSlajd(indeks);
    }

    sledece?.addEventListener("click", sledeciSlajd);
    prethodno?.addEventListener("click", prethodniSlajd);

    tacke.forEach((tacka, i) => {
        tacka.addEventListener("click", () => {
            indeks = i;
            prikaziSlajd(indeks);
        });
    });

    prikaziSlajd(indeks);
    setInterval(sledeciSlajd, 5000);
}

// PREVOD TEKSTA
function promeniJezik(izborElement) {
    const izabraniJezik = izborElement.value;
    const elementiZaPrevod = document.querySelectorAll('[prevod-sr][prevod-en]');

    elementiZaPrevod.forEach(el => {
        el.innerHTML = el.getAttribute(izabraniJezik === 'sr' ? 'prevod-sr' : 'prevod-en');
    });
}


// FUNKCIJE ZA KOLAČIĆE
function postaviKolacic(naziv, vrednost, dani) {
    const datum = new Date();
    datum.setTime(datum.getTime() + dani * 24 * 60 * 60 * 1000);
    document.cookie = `${naziv}=${vrednost};expires=${datum.toUTCString()};path=/`;
}

function uzmiKolacic(naziv) {
    const trazeni = naziv + "=";
    const sviKolacici = decodeURIComponent(document.cookie).split(';');
    for (let k of sviKolacici) {
        k = k.trim();
        if (k.indexOf(trazeni) === 0) return k.substring(trazeni.length);
    }
    return "";
}

// PODEŠAVANJE VELIČINE FONTA SA KOLAČIĆEM
const dugmePovecaj = document.getElementById("povecaj-font");
const dugmeUmanji = document.getElementById("umanji-font");
const htmlElement = document.documentElement;

let velicinaFonta = parseInt(uzmiKolacic("velicinaFonta")) || 100;
htmlElement.style.fontSize = velicinaFonta + "%";

dugmePovecaj?.addEventListener("click", () => {
    if (velicinaFonta < 130) {
        velicinaFonta += 10;
        htmlElement.style.fontSize = velicinaFonta + "%";
        postaviKolacic("velicinaFonta", velicinaFonta, 30);
    }
});

dugmeUmanji?.addEventListener("click", () => {
    if (velicinaFonta > 70) {
        velicinaFonta -= 10;
        htmlElement.style.fontSize = velicinaFonta + "%";
        postaviKolacic("velicinaFonta", velicinaFonta, 30);
    }
});

// PRIMENA TEME IZ KOLAČIĆA
function primeniTemu(izabranaTema) {
    document.documentElement.setAttribute("data-tema", izabranaTema);
}

let trenutnaTema = uzmiKolacic("tema") || "svetla";
postaviKolacic("tema", trenutnaTema, 30);
primeniTemu(trenutnaTema);

const dugmeZaTemu = document.getElementById("prekidac");
dugmeZaTemu?.addEventListener("click", () => {
    trenutnaTema = trenutnaTema === "svetla" ? "tamna" : "svetla";
    primeniTemu(trenutnaTema);
    postaviKolacic("tema", trenutnaTema, 30);
});

// BEZ SKROLA U HAMBURGER MENIJU
function prikaziMeni() {
    const meni = document.getElementById("meni");
    meni.classList.toggle("prikazano");
    document.documentElement.classList.toggle("bez-skrolovanja");
    document.body.classList.toggle("bez-skrolovanja");
}
