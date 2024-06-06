document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('appointment-form');
    const confirmation = document.getElementById('confirmation');

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const formData = new FormData(form);
        fetch('/submit', {
            method: 'POST',
            body: JSON.stringify({
                firstName: formData.get('first-name'),
                lastName: formData.get('last-name'),
                phone: formData.get('phone'),
                appointmentTime: formData.get('appointment-time'),
                appointmentDate: formData.get('appointment-date')
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.text())
        .then(data => {
            confirmation.classList.remove('hidden');
            form.reset();
        })
        .catch(error => console.error('Error:', error));
    });
});

