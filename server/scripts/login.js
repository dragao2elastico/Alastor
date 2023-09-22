import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/dist/sweetalert2.min.css';

document.querySelector('form').addEventListener('submit', async (event) => {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);
    
    try {
        const response = await fetch('/login', {
            method: 'POST',
            body: formData
        });
        
        if (response.ok) {
            const data = await response.json();
            // Exibir pop-up de sucesso usando SweetAlert2
            Swal.fire({
                title: 'Sucesso!',
                text: 'Login realizado com sucesso!',
                icon: 'success'
            }).then(() => {
                // Redirecionar para a página principal após o pop-up ser fechado
                window.location.href = '/home';
            });
        } else {
            // Exibir pop-up de erro usando SweetAlert2
            Swal.fire({
                title: 'Erro!',
                text: 'Credenciais inválidas',
                icon: 'error'
            });
        }
    } catch (error) {
        console.error(error);
    }
});
