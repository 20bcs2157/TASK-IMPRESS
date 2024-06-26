const userForm = document.getElementById('user-form');
const userTableBody = document.getElementById('user-list-body');
const users = [];

userForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;

  if (!validateEmail(email)) {
    alert('Invalid email address');
    return;
  }

  if (!name ||!email) {
    alert('Please fill in both name and email fields');
    return;
  }

  users.push({ name, email });
  renderUserList();

  userForm.reset();
});

function renderUserList() {
  userTableBody.innerHTML = '';
  users.forEach((user, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${user.name}</td>
      <td>${user.email}</td>
      <td>
        <button class="ant-btn ant-btn-danger" onclick="deleteUser(${index})">Delete</button>
        <button class="ant-btn ant-btn-primary" onclick="editUser(${index})">Edit</button>
      </td>
    `;
    userTableBody.appendChild(row);
  });
}

function deleteUser(index) {
  users.splice(index, 1);
  renderUserList();
}

function editUser(index) {
  const user = users[index];
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  nameInput.value = user.name;
  emailInput.value = user.email;
  nameInput.focus();
}

function validateEmail(email) {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
}

renderUserList();