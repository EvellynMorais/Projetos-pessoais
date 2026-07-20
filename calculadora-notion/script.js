const d = document.getElementById("d");
let expressao = "";
let resultadoMostrado = false;

function atualizarDisplay() {
    d.value = expressao
        .replace(/\*/g, "×")
        .replace(/\//g, "÷");
}

function p(v) {
    if (v === "=") {
        try {
            expressao = eval(expressao).toString();
            atualizarDisplay();
            resultadoMostrado = true;
        } catch {
            d.value = "Erro";
            expressao = "";
            resultadoMostrado = false;
        }
        return;
    }

    if (v === "C") {
        expressao = "";
        d.value = "";
        resultadoMostrado = false;
        return;
    }

    // Se acabou de mostrar um resultado e o usuário digitou um número
    if (resultadoMostrado && /[0-9.]/.test(v)) {
        expressao = "";
    }

    // Se digitou um operador após o resultado, continua a conta
    resultadoMostrado = false;

    expressao += v;
    atualizarDisplay();
}

document.addEventListener("keydown", e => {
    if ("0123456789+-*/.".includes(e.key)) {
        if (resultadoMostrado && /[0-9.]/.test(e.key)) {
            expressao = "";
        }
        resultadoMostrado = false;
        expressao += e.key;
        atualizarDisplay();
    }
    if (e.key === "Enter") {
        e.preventDefault();
        p("=");
    }
    if (e.key === "Backspace") {
        expressao = expressao.slice(0, -1);
        atualizarDisplay();
    }
});