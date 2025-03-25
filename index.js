const scanner = new Html5QrcodeScanner('reader', {
    qrbox: {
        width: 250,
        height: 250
    },
    fps: 20,
});

const success = (result) => {
    const qrdados = result;
    const partes = qrdados.split(" - ");

    const nome = partes[0];
    const email = partes[1];

    document.getElementById('result').innerHTML = `<h2>Success</h2>
    <p>${nome}</p>
    <p>${email}</p>
    <button id="btn">Adicionar</button>
    `;

    const post = async () => {
        const endpoint = "https://api-leitor2-yxid.onrender.com/alunos/new";

        fetch(endpoint, {
            method: "POST",
            body: JSON.stringify({
                nome: nome,
                email: email
            }),
            headers: {
                "Content-Type":
                    "application/json"
            }
        });
    }

    btn.addEventListener("click", () => {
        post(qrdados);

        if (response.ok) {
                // Recarrega a página após sucesso
                location.reload();
            } else {
                console.error("Erro na requisição");
            }
    });

    scanner.clear();
    document.getElementById('reader').remove();
}

const error = (error) => {
    console.log(error);
};

scanner.render(success, error);
