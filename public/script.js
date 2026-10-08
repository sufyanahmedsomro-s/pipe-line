document.getElementById('loadContacts').addEventListener('click', () => {
  fetch('/contacts')
    .then(res => res.json())
    .then(data => {
      const list = document.getElementById('contactList');
      list.innerHTML = '';
      data.forEach(contact => {
        const li = document.createElement('li');
        li.textContent = contact.name;
        list.appendChild(li);
      });
    });
});
