// Egyszerűsített párosító játék, csak 10 véletlen szóval
let sikeres = 0;
let sikertelen = 0;
let magyarValasztott = null;
let angolValasztott = null;
let valasztottSzavak = [];
let zoldSzavak = [];

const startGomb = document.getElementById('startBtn');
const jatekTer = document.getElementById('gameArea');
const magyarOszlop = document.getElementById('huColumn');
const angolOszlop = document.getElementById('enColumn');
const szamlalo = document.getElementById('scoreboard');
const sikerSpan = document.getElementById('successCount');
const sikertelenSpan = document.getElementById('failCount');

function kever(tomb) {
    for (let i = tomb.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [tomb[i], tomb[j]] = [tomb[j], tomb[i]];
    }
}

function veletlenSzavak(szavak, db) {
    let masolat = [...szavak];
    kever(masolat);
    return masolat.slice(0, db);
}

function oszlopokKirajzol() {
    magyarOszlop.innerHTML = '';
    angolOszlop.innerHTML = '';
    let magyarSzavak = valasztottSzavak.map(w => w.hu);
    let angolSzavak = valasztottSzavak.map(w => w.en);

    kever(magyarSzavak);
    kever(angolSzavak);
    magyarSzavak.forEach(magyar => {
        let gomb = document.createElement('button');
        gomb.textContent = magyar;
        gomb.className = 'word-btn';
        if (zoldSzavak.includes(magyar)) gomb.style.background = '#7fff7f';
        gomb.onclick = function() {
            magyarValasztott = magyar;
            kijelolesFrissit();
            parosit();
        };
        magyarOszlop.appendChild(gomb);
    });
    angolSzavak.forEach(angol => {
        let gomb = document.createElement('button');
        gomb.textContent = angol;
        gomb.className = 'word-btn';
        if (zoldSzavak.includes(angol)) gomb.style.background = '#7fff7f';
        gomb.onclick = function() {
            angolValasztott = angol;
            kijelolesFrissit();
            parosit();
        };
        angolOszlop.appendChild(gomb);
    });
}

function kijelolesFrissit() {
    Array.from(magyarOszlop.children).forEach(g => {
        g.classList.toggle('selected', g.textContent === magyarValasztott);
    });
    Array.from(angolOszlop.children).forEach(g => {
        g.classList.toggle('selected', g.textContent === angolValasztott);
    });
}

function parosit() {
    if (magyarValasztott && angolValasztott) {
        let talalat = valasztottSzavak.find(w => w.hu === magyarValasztott && w.en === angolValasztott);
        if (talalat) {
            sikeres++;
            sikerSpan.textContent = sikeres;
            zoldSzavak.push(magyarValasztott);
            zoldSzavak.push(angolValasztott);

            Array.from(magyarOszlop.children).forEach(g => {
                if (g.textContent === magyarValasztott) g.style.background = '#7fff7f';
            });
            Array.from(angolOszlop.children).forEach(g => {
                if (g.textContent === angolValasztott) g.style.background = '#7fff7f';
            });
        } else {
            sikertelen++;
            sikertelenSpan.textContent = sikertelen;
        }
        magyarValasztott = null;
        angolValasztott = null;
        kijelolesFrissit();
    }
}

startGomb.onclick = function() {
    startGomb.style.display = 'none';
    jatekTer.style.display = 'flex';
    szamlalo.style.display = 'block';
    sikeres = 0;
    sikertelen = 0;
    sikerSpan.textContent = '0';
    sikertelenSpan.textContent = '0';
    zoldSzavak = [];
    valasztottSzavak = veletlenSzavak(words, 10);
    oszlopokKirajzol();
};
