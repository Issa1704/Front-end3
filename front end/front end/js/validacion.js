
document.getElementById("formulario").addEventListener("submit", function(event) {
    if (!validarFormulario()) {
        event.preventDefault();
    }
});

function validarFormulario() {
    return validarUsuario() && validarContrasena() && validarDireccion() && validarComuna() && validarTelefono() && validar_url() && validarAficiones();
}

// Validación de usuario
function validarUsuario() {
    var inputUsuario = document.getElementById("username");
    var divErrorUsuario = document.getElementById("error-usuario");
    var usuario = inputUsuario.value.trim();

    if (usuario === "") {
        mostrarError(divErrorUsuario, "El Nombre de usuario es obligatorio");
        return false;
    }
    if (usuario.length < 5 || usuario.length > 10) {
        mostrarError(divErrorUsuario, "El Nombre de usuario debe tener entre 5 y 10 caracteres");
        return false;
    }
    if (!esLetra(usuario.charAt(0))) {
        mostrarError(divErrorUsuario, "El Nombre de usuario debe comenzar con una letra");
        return false;
    }
    for (var i = 1; i < usuario.length; i++) {
        var char = usuario.charAt(i);
        if (!esLetra(char) && !esDigito(char)) {
            mostrarError(divErrorUsuario, "El Nombre de usuario no puede contener caracteres especiales");
            return false;
        }
    }
    ocultarError(divErrorUsuario);
    return true;
}

function esLetra(caracter) {
    return (caracter >= 'a' && caracter <= 'z') || (caracter >= 'A' && caracter <= 'Z');
}

function esDigito(caracter) {
    return (caracter >= '0' && caracter <= '9');
}

function mostrarError(elemento, mensaje) {
    elemento.innerHTML = mensaje;
}

function ocultarError(elemento) {
    elemento.innerHTML = "";
}

// Validación de contraseña
function validarContrasena() {
    var password = document.getElementById("password").value;
    var confirmPassword = document.getElementById("confirm-password").value;
    var errorPassword = document.getElementById("error-contraseña");
    var errorConfirmPassword = document.getElementById("error-confirm-password");

    if (!validarContraseña(password)) {
        mostrarError(errorPassword, "La contraseña debe tener entre 3 y 6 caracteres y al menos un dígito y una letra.");
        return false;
    }
    if (password !== confirmPassword) {
        mostrarError(errorConfirmPassword, "Las contraseñas no coinciden.");
        return false;
    }
    ocultarError(errorPassword);
    ocultarError(errorConfirmPassword);
    return true;
}

function validarContraseña(password) {
    if (password.length < 3 || password.length > 6) {
        return false;
    }
    var tieneLetra = false;
    var tieneDigito = false;
    for (var i = 0; i < password.length; i++) {
        var char = password.charAt(i);
        if (char >= '0' && char <= '9') {
            tieneDigito = true;
        }
        if ((char >= 'a' && char <= 'z') || (char >= 'A' && char <= 'Z')) {
            tieneLetra = true;
        }
    }
    return tieneLetra && tieneDigito;
}

// Validación de dirección
function validarDireccion() {
    var direccion = document.getElementById("address").value.trim();
    var errorDireccion = document.getElementById("error-direccion");

    if (direccion === "") {
        mostrarError(errorDireccion, "La dirección es obligatoria.");
        return false;
    }
    ocultarError(errorDireccion);
    return true;
}

// Validación de comuna
function validarComuna() {
    var seleccionComuna = document.getElementById("comuna");
    var errorComuna = document.getElementById("error-comuna");

    if (seleccionComuna.value === "") {
        mostrarError(errorComuna, "Debe seleccionar una comuna.");
        return false;
    }
    ocultarError(errorComuna);
    return true;
}

// Validación de teléfono
function validar_telefono() {
    var input_telefono = document.getElementById("input-telefono");
    var div_error_telefono = document.getElementById("error-telefono");
    var telefono = input_telefono.value;

    if (telefono === "") {
        div_error_telefono.innerHTML = "El número de teléfono es obligatorio";
        div_error_telefono.className = "text-intense-danger mt-1";
        return false;
    }
    if (telefono.charAt(0) !== '+') {
        div_error_telefono.innerHTML = "El número de teléfono debe comenzar con +";
        div_error_telefono.className = "text-intense-danger mt-1";
        return false;
    }
    for (var i = 1; i < telefono.length; i++) {
        var char = telefono.charAt(i);
        if (char !== ' ' && isNaN(char)) {
            div_error_telefono.innerHTML = "El número de teléfono solo puede contener dígitos y espacios";
            div_error_telefono.className = "text-intense-danger mt-1";
            return false;
        }
    }
    div_error_telefono.innerHTML = "";
    return true;
}

// Validación de sitio web
function validar_url() {
    var input_website = document.getElementById("input-website");
    var div_error_sitio = document.getElementById("error-sitio");
    var url = input_website.value;

    if (!(url.startsWith("http://") || url.startsWith("https://"))) {
        div_error_sitio.innerHTML = "La url debe comenzar con http:// o https://"
        div_error_sitio.className = "text-intense-danger mt-1";
        return false;
    }
    if (url.indexOf(".", url.indexOf("//") + 2) == -1) {
        div_error_sitio.innerHTML = "La url debe contener al menos un punto despues del dominio"
        div_error_sitio.className = "text-intense-danger mt-1";
        return false;
    }
    div_error_sitio.innerHTML = "";
    return true; 

}

// Validación de aficiones
function validarAficiones() {
    var hobbiesList = document.getElementById("hobbies-list");
    var errorAficiones = document.getElementById("error-aficiones");

    if (hobbiesList.children.length < 2) {
        mostrarError(errorAficiones, "Debe ingresar al menos 2 aficiones.");
        return false;
    }
    ocultarError(errorAficiones);
    return true;
}

// Añadir aficiones
document.getElementById("add-hobby").addEventListener("click", function() {
    var hobbyInput = document.getElementById("hobby-input");
    var hobby = hobbyInput.value.trim();
    if (hobby !== "") {
        var hobbiesList = document.getElementById("hobbies-list");
        var li = document.createElement("li");
        li.textContent = hobby;
        hobbiesList.appendChild(li);
        hobbyInput.value = "";
        ocultarError(document.getElementById("error-aficiones"));
    }
});