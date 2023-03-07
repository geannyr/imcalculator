function calcularIMC() {
	var peso = document.getElementById("peso").value;
	var altura = document.getElementById("altura").value;
	var imc = peso / (altura/100 * altura/100);
	var resultado = document.getElementById("resultado");
	
	if (peso === "" || altura === "") {
		resultado.innerHTML = "Por favor, preencha todos os campos.";
	} else if (imc < 18.5) {
		resultado.innerHTML = "Seu IMC é " + imc.toFixed(2) + ". Você está abaixo do peso ideal.";
	} else if (imc >= 18.5 && imc <= 24.9) {
		resultado.innerHTML = "Seu IMC é " + imc.toFixed(2) + ". Você está no peso ideal.";
	} else if (imc >= 25 && imc <= 29.9) {
		resultado.innerHTML = "Seu IMC é " + imc.toFixed(2) + ". Você está com sobrepeso.";
    } else if (imc >= 30 && imc <= 39,9) {
		resultado.innerHTML = "Seu IMC é " + imc.toFixed(2) + ". Você está com obesidade do II grau.";
	} else { 
        resultado.innerHTML = "Seu IMC é " + imc.toFixed(2) + ". Você está com obesidade do III grau." ;    
	} 

}

document.getElementById("limpar").addEventListener("click", function() {
    document.getElementById("altura").value = "";
    document.getElementById("peso").value = "";
    document.getElementById("resultado").textContent = "";
});

