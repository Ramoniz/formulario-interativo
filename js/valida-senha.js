export default function ehUmaSenha(campo) {
    const senha = document.querySelector("#senha");
    const senhaConfirmada = campo.value;

    if (validaSenha(senhaConfirmada)) {
        campo.setCustomValidity('As senhas não são iguais!');
    }
}


