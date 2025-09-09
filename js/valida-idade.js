export default function ehMaiorDeIdade(campo) {
    const dataDeNascimento = new Date(campo.value);
    if (!validaIdade(dataDeNascimento)) {
        campo.setCustomValidity('O usuário não é maior de idade')
    }
}

//Verifica se a pessoa é maior de 18 anos
function validaIdade(data) {
    const dataAtual = new Date();
    const dataMais18 = new Date(data.getUTCFullYear() + 18, data.getUTCMonth(), data.getUTCDate());

    return dataAtual >= dataMais18;
}
