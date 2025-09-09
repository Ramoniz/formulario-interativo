const campoDoFormulario = document.querySelectorAll("[required]");
const formulario = document.querySelector("[data-formulario]")

formulario.addEventListener("submit", (e) => {
    e.preventDefault();
    const listaRespostas = {
        "instagram": e.target.elements["instagram"].value,
        "linkedin": e.target.elements["linkedin"].value,
        "GitHub": e.target.elements["GitHub"].value
    }

    localStorage.setItem("estapa-2", JSON.stringify(listaRespostas));

    window.location.href = './etapa-3.html';
})

campoDoFormulario.forEach((campo => {
    campo.addEventListener("blur", () => verificarCampo(campo));
    campo.addEventListener("invalid", evento => evento.preventDefault());
}))

// campoDoFormulario.forEach((campo => {
//     campo.addEventListener('bluer', () => verificarCampo(campo));
//     campo.addEventListener('invalid', evento => evento.preventDefault());
// }))

const tiposDeErros = [
    'valueMissing',             //quando não tem nada no campo
    'tooShort',                 //(ex. numero mínimo de dígitos)
]

const mensagens = {
    instagram: {
        valueMissing: "O campo de instagram não pode estar vazio.",
        tooShort: "Por favor, preencha um usuário válido."
    }
}

function verificarCampo(campo) {
    let mensagem = "";
    campo.setCustomValidity('')
    
    tiposDeErros.forEach(erro => {
        if (campo.validity[erro]) {
            mensagem = mensagens[campo.name][erro];
            console.log(mensagem);
        }
    })

    const mensagemErro = campo.parentNode.querySelector('.mensagem-erro');
    const validadorDeInput = campo.checkValidity();

    if (!validadorDeInput) {
        mensagemErro.textContent = mensagem;
    } else {
        mensagemErro.textContent = "";
    }
}
