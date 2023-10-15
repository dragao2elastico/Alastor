function success() {
    console.log("Êxito na execução");
}

function error() {
    console.log("Erro na execução");
}

try {
    success()
} catch (err) {
    error()
}