document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('appointment-form');
    const confirmation = document.getElementById('confirmation');
    const clientsTable = document.getElementById('clients-table');
    const clientsTableBody = clientsTable.querySelector('tbody');

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
        .then(response => response.json())
        .then(data => {
            confirmation.classList.remove('hidden');
            form.reset();
            updateClientsTable(data);
        })
        .catch(error => console.error('Error:', error));
    });

    function updateClientsTable(clients) {
        clientsTableBody.innerHTML = '';
        clients.forEach(client => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${client.firstName}</td>
                <td>${client.lastName}</td>
                <td>${client.phone}</td>
                <td>${client.appointmentTime}</td>
                <td>${client.appointmentDate}</td>
            `;
            clientsTableBody.appendChild(row);
        });
        clientsTable.classList.remove('hidden');
    }

    // Загрузка клиентов при загрузке страницы
    fetch('/clients')
        .then(response => response.json())
        .then(data => updateClientsTable(data))
        .catch(error => console.error('Error:', error));
});

