document.addEventListener('DOMContentLoaded', function() {
    // Handle form submission on the landing page
    const form = document.getElementById('guestbook-form');
    if (form) {
        // Pre-fill the name field if a name is stored in localStorage
        const storedName = localStorage.getItem('guestbookName');
        if (storedName) {
            document.getElementById('name').value = storedName;
        }

        form.addEventListener('submit', function(event) {
            event.preventDefault();
            const name = document.getElementById('name').value;
            const message = document.getElementById('message').value;

            // Store the name in localStorage
            localStorage.setItem('guestbookName', name);

            // Store the message in localStorage
            let entries = JSON.parse(localStorage.getItem('guestbookEntries')) || [];
            entries.push({ name, message });
            localStorage.setItem('guestbookEntries', JSON.stringify(entries));

            window.location.href = 'guestbook.html';
        });
    }

    // Display entries on the guestbook page
    const entriesDiv = document.getElementById('entries');
    if (entriesDiv) {
        const entries = JSON.parse(localStorage.getItem('guestbookEntries')) || [];
        entries.forEach(entry => {
            const note = document.createElement('div');
            note.className = 'sticky-note';
            note.innerHTML = `<strong>${entry.name}</strong><p>${entry.message}</p>`;
            entriesDiv.appendChild(note);
        });

        const addMoreButton = document.getElementById('add-more');
        addMoreButton.addEventListener('click', function() {
            window.location.href = 'index.html';
        });

        const settingsButton = document.getElementById('settings');
        settingsButton.addEventListener('click', function() {
            const password = prompt('Enter password to clear all messages:');
            if (password === 'jiwon129') {
                localStorage.removeItem('guestbookEntries');
                location.reload();
            } else {
                alert('Incorrect password!');
            }
        });
    }
});

