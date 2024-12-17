// Funzione per ottenere i parametri dalla query string
function getQueryParams() {
    const urlParams = new URLSearchParams(window.location.search);
    const params = {};
    urlParams.forEach((value, key) => {
        params[key] = value;
    });
    return params;
}

// Funzione per visualizzare i risultati
function mostraRisultati() {
    const params = getQueryParams();
    let feedback = 'Hai risposto a queste domande:\n\n';
    let correctAnswers = 0;

    // Verifica le risposte per ogni domanda
    if (params.q1) {
        feedback += `Domanda 1: ${params.q1}\n`;
        if (params.q1 === 'Python') correctAnswers++;
    }
    if (params.q2) {
        feedback += `Domanda 2: ${params.q2}\n`;
        if (params.q2 === 'Un software per navigare su Internet') correctAnswers++;
    }
    if (params.q3) {
        feedback += `Domanda 3: ${params.q3}\n`;
        if (params.q3 === 'Una sequenza di istruzioni per risolvere un problema') correctAnswers++;
    }

    // Risposte aperte
    feedback += `\nRisposte aperte:\n`;
    feedback += `1. Intelligenza artificiale: ${params['q1-open']}\n`;
    feedback += `2. Differenza tra RAM e ROM: ${params['q2-open']}\n`;
    feedback += `3. Cloud Computing: ${params['q3-open']}\n`;

    document.getElementById("feedback").innerText = feedback;
    document.getElementById("risultato").innerText = `Punteggio: ${correctAnswers} su 5`;
}

// Funzione per salvare i risultati come JSON
function salvaRisultati() {
    const params = getQueryParams();
    const risultati = {
        risposte: {
            q1: params.q1,
            q2: params.q2,
            q3: params.q3,
            q1_open: params['q1-open'],
            q2_open: params['q2-open'],
            q3_open: params['q3-open']
        },
        punteggio: document.getElementById("risultato").innerText
    };

    const blob = new Blob([JSON.stringify(risultati, null, 2)], { type: 'application/json' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'risultati_quiz.json';
    link.click();
}

// Esegui la funzione per visualizzare i risultati al caricamento della pagina
window.onload = mostraRisultati;
