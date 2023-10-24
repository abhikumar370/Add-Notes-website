const addButton = document.querySelector('#add');

const updateLSData = () => {
  const textAreaData = document.querySelectorAll('textarea');
  const notes = [];


  textAreaData.forEach((note) => {
    return notes.push(note.value);
  })

  localStorage.setItem('notes', JSON.stringify(notes));
}

const addNewNote = (text = '') => {

  const note = document.createElement('div');
  note.classList.add('note');

  const htmlData = `
   <div class="operation">
   <button  class="Edit"><i class="fa-solid fa-pen-to-square"></i></button>

   <button  class="Delete"><i class="fa-solid fa-trash"></i></button>
</div>

<div class="main ${text ? "" : "hidden"} "></div>
<textarea class="${text ? "hidden" : ""}"></textarea>`;

  note.insertAdjacentHTML('afterbegin', htmlData);
  // console.log(note);

  const editbutton = note.querySelector('.Edit');
  const delbutton = note.querySelector('.Delete');
  const maindiv = note.querySelector('.main');
  const textarea = note.querySelector('textarea');


  delbutton.addEventListener('click', () => {
    note.remove();
    updateLSData();
  })


  textarea.value = text;
  maindiv.innerHTML = text;


  editbutton.addEventListener('click', () => {
    maindiv.classList.toggle('hidden');
    textarea.classList.toggle('hidden');

  })

  textarea.addEventListener('change', (event) => {
    const value = event.target.value;
    maindiv.innerHTML = value;

    updateLSData();
  })


  document.body.appendChild(note);

}

const notes = JSON.parse(localStorage.getItem('notes'));

if (notes) {
  notes.forEach((note) => addNewNote(note));
}

addButton.addEventListener('click', () => addNewNote());