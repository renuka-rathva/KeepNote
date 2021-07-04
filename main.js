const addNotes = document.getElementById('add');
let parent = document.querySelector('#board');

const updateStorageData = ()=>{
    const textAreaData = document.querySelectorAll('textarea');
    const notes = [];
    textAreaData.forEach((note)=>{
        return notes.push(note.value)
    })

    localStorage.setItem('notes',JSON.stringify(notes));
}
  
const addNewNote = (text='')=>{

    const note = document.createElement('div');
    // note.classList.add();

    const htmlData = ` <div class="card shadow p-3 mb-5 bg-body rounded" style="width: 18rem;">
    <div class="card-body">
      <div class="main ${text ?" ":"hidden"}"></div>
      <textarea class="card-text form-control ${text ?"hidden":" "}" id="exampleFormControlTextarea1" rows="5"></textarea></p>
      <a href="#" class="btn btn-danger delete-note"><i class="fas fa-trash-alt"></i></a>
      <a href="#" class="btn btn-success edit"><i class="fas fa-pencil-alt"></i></i></a>
    </div>
  </div>`;

  note.insertAdjacentHTML('afterbegin',htmlData);

  const editBtn = note.querySelector('.edit');
  const delBtn = note.querySelector('.delete-note');
  const mainDiv = note.querySelector('.main');
  const textArea = note.querySelector('textarea');

  //delete the node
  delBtn.addEventListener('click',()=>{
      note.remove();
      const notes = JSON.parse(localStorage.getItem('notes'));
      let n= notes.indexOf(textArea.value);
      notes.splice(n,1);
      localStorage.setItem('notes',JSON.stringify(notes));
  })

  //toggle using edit button
textArea.value = text;
mainDiv.innerHTML = text;


editBtn.addEventListener('click',()=>{
      mainDiv.classList.toggle('hidden');
      textArea.classList.toggle('hidden');
  })


textArea.addEventListener('change',(event)=>{
    const value = event.target.value;
    mainDiv.innerHTML = value;
    updateStorageData();
});

  parent.appendChild(note);
  //It appends/add a node as the last child of a node
}
  // getting data back from localStorage
  const notes = JSON.parse(localStorage.getItem('notes'));
  if(notes){notes.forEach((note)=>{
      addNewNote(note);
  })}


addNotes.addEventListener('click',()=>{
    addNewNote();
})