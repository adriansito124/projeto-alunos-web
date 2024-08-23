let foton = document.getElementById('perfil-foto');
let arquivo = document.getElementById('fileInput');

foton.addEventListener('click', function () {
    arquivo.click();

    arquivo.onchange = evt => {
        const [file] = arquivo.files;
        if (file) {
            foton.src = URL.createObjectURL(file)
        }
        else {
            foton.src = 'user.png';
        }
    }

});

