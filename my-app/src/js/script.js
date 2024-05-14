function addNote() {
    var noteInput = document.getElementById('noteInput').value;
    if (noteInput !== '') {
      var notesContainer = document.getElementById('notes');
      var noteElement = document.createElement('div');
      noteElement.classList.add('note');
      noteElement.innerHTML = '<p>' + noteInput + '</p><button class="theme1" onclick="deleteNote(this)">Delete</button>';
      notesContainer.appendChild(noteElement);
      document.getElementById('noteInput').value = '';
    } else {
      alert('Please enter a note.');
    }
  }
  
  function deleteNote(note) {
    note.parentNode.remove();
  }
  