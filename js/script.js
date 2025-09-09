const campoDoFormulario = document.querySelectorAll("[required]");
const formulario = document.querySelector("[data-formulario]")

const senhaInput = document.querySelector("#senha");
const senhaConfirmada = document.querySelector("#confirmar-senha");
const olhoSenha = document.querySelector("#olho-senha");

formulario.addEventListener("submit", (e) => {
    e.preventDefault();
    const listaRespostas = {
        "email": e.target.elements["email"].value,
        "senha": e.target.elements["senha"].value
    }

    localStorage.setItem("estapa-1", JSON.stringify(listaRespostas));

    window.location.href ="./pages/etapa-2.html";
})

campoDoFormulario.forEach((campo => {
    campo.addEventListener('blur', () => verificarCampo(campo));
    campo.addEventListener('invalid', evento => evento.preventDefault());
}))

const tiposDeErros = [
    'valueMissing',             //quando não tem nada no campo
    'typeMismatch',             //elemento não combina com o que foi inserido 
    'patternMismatch',          //não seguiu o padrão do pattern do cpf
    'tooShort',                 //(ex. numero mínimo de dígitos)
    'customError'               //erros customizados, ou seja, feitos por nós
]

const mensagens = {
    email: {
        valueMissing: "O campo de e-mail não pode estar vazio.",
        typeMismatch: "Por favor, preencha um email válido.",
        tooShort: "Por favor, preencha um e-mail válido."
    },
    senha: {
        valueMissing: "O campo de senha não pode estar vazio.",
        tooShort: "Por favor, a senha deve ter entre 4 e 14 digitos.",
        customError:"Por favor, coloque senhas iguais!"
    },
    confirmar_senha: {
        valueMissing: "O campo de confirmar senha não pode estar vazio.",
        customError:"Por favor, coloque senhas iguais!"
    }
}

function verificarCampo(campo) {
    let mensagem = "";
    campo.setCustomValidity('')
    
    if (campo.name == 'confirmar_senha' && campo.value.length >= 4) {
            validarSenha(campo);
    }

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

// Indicador de senha forte:
senhaInput.addEventListener("input", function () {
    const senha = this.value;
    const indicadorDeForca = document.querySelector("#indicador-senha-forte");
    const indicadorTexto = document.querySelector("#senha-forte-texto");

    const forcas = {
        0: "Muito Fraca",
        1: "Fraca",
        2: "Moderada",
        3: "Forte",
        4: "Muito Forte",
        5: "Excelente"
    };

    let pontuacao = 0;

    //requisitos
    if (senha.length >= 8) pontuacao++;
    if (senha.match(/[a-z]/)) pontuacao++;
    if (senha.match(/[A-Z]/)) pontuacao++;
    if (senha.match(/[0-9]/)) pontuacao++;
    if (senha.match(/[^a-zA-Z0-9]/)) pontuacao++;

    //Calculo da %, pois a largura da barra será em %
    const largura = (pontuacao / 4) * 100;

    //Modificar cor
    switch(pontuacao) {
        case 1:
            indicadorDeForca.style.backgroundColor = "#e70b0b";
            break;
        case 2:
            indicadorDeForca.style.backgroundColor = "#ffb74d";
            break;
        case 3:
            indicadorDeForca.style.backgroundColor = "#fff176";
            break;
        case 4:
            indicadorDeForca.style.backgroundColor = "#81c784";
            break;
        default:
            indicadorDeForca.style.backgroundColor = "#transparent";
            break;
    }

    indicadorDeForca.style.width = largura + "%";

    if (senha.length > 0) {
        indicadorTexto.innerHTML = `Força da senha: ${forcas[pontuacao]}`;
    }
})

// Validar Senhas Iguais
function validarSenha() {
    if (senhaInput.value != senhaConfirmada.value) {
        senhaConfirmada.setCustomValidity("As senhas não são iguais");

        return false
    } else {
        senhaConfirmada.setCustomValidity("");

        return true
    }
}

// Olho para verificar senha
olhoSenha.addEventListener("click", function () {
    const type = senhaInput.type === "password" ? "text" : "password";

    senhaInput.type = type;

    // this -> elemento
    this.classList.toggle("fa-eye");
    this.classList.toggle("fa-eye-slash");
});
