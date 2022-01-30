const id = new URLSearchParams(window.location.search).get('id');

const detailsContainer = document.querySelector('.details');
const headline = document.querySelector('.details h1');
const editBtn = document.querySelector('.edit');
const deleteBtn = document.querySelector('.delete');
const detailsBtnGroup = document.querySelector('.details-btn-group');
const editForm = document.querySelector('.edit-form');
const editFormBtn = document.querySelector('.edit-form button');

const renderDetails = async () => {
  const res = await fetch('http://localhost:3000/posts/' + id);
  const post = await res.json();

  const template = `
    <h1>${post.title}</h1>
    <p>${post.body}</p>
  `

  detailsContainer.innerHTML = template;
}

editBtn.addEventListener('click', async (e) => {
  e.preventDefault();
  const res = await fetch('http://localhost:3000/posts/' + id);
  const post = await res.json();

  editForm.editTitle.value = post.title;
  editForm.editBody.value = post.body;

  editForm.classList.remove('hidden');
});

editFormBtn.addEventListener('click', async (e) => {
  e.preventDefault();

  const res = await fetch('http://localhost:3000/posts/' + id);
  const post = await res.json();

  console.log(post);

  const editData = {
    title: editForm.editTitle.value,
    body: editForm.editBody.value,
    likes: post.likes
  }
  
  await fetch('http://localhost:3000/posts/' + id, {
    method: 'PUT',
    body: JSON.stringify(editData),
    headers: { "Content-Type" : "application/json" }
  });

  renderDetails();
  editForm.classList.add('hidden');
})

deleteBtn.addEventListener('click', async () => {
  await fetch('http://localhost:3000/posts/' + id, {
    method: 'DELETE'
  });

  window.location.replace('/');
})

window.addEventListener('DOMContentLoaded', () => renderDetails());