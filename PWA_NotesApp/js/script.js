let notes = [
	{ id: 1, title: 'note 1', desc: 'Hello ATS' },
	{ id: 2, title: 'note 2', desc: 'Welcome' },
	{ id: 3, title: 'Another Note', desc: 'Taking notes is easier now' },
];

let selectedNoteId = -1;

// event handlers
btnAddNote.addEventListener('click', (event)=>{
	// console.log('add note');
	show(popupScreen);
	hide(btnAddNote);
});

btnCancel.addEventListener('click', (event)=>{
	clearPopup();
});

btnCreate.addEventListener('click', (event)=>{
	createNote();
	clearPopup();
});

// init

refreshNotes();

function refreshNotes() {
	let noteHtml = '';
	notes.forEach(note => {
		// noteHtml += `
		// <div id="note_${note.id}" class="note">
		// <div class="title" title="${note.title}">${display(note.title, 12)}</div>
		// <div class="desc" title="${note.desc}">${display(note.desc, 20)}</div>
		// </div>`;

		noteHtml += `
		<div id="note_${note.id}" class="note">
		<div class="title" title="${note.title}">${note.title}</div>
		<div class="desc" title="${note.desc}">${note.desc}</div>
		</div>`;
	});

	allNotes.innerHTML = noteHtml;

	document.querySelectorAll('.note').forEach(note => {
		note.addEventListener('click', (event)=>{
			onNoteClicked(note.id);
		});
	});
	
}

function createNote(){
	let title = noteTitle.value;
	let desc = noteDesc.value;
	
	// validation
	if(title.trim()=='' || desc.trim()==''){
		return;
	}

	console.log(title, desc);
	let newId = notes.map(note=>note.id).sort()[notes.length-1] + 1;
	notes.push({id: newId, title: title, desc: desc});
	refreshNotes();
}

function onNoteClicked(noteId){
	selectedNoteId = noteId;
	selectNote(noteId)
}

// sub methods

function selectNote(noteId){
	let prevSelected = document.querySelector('.note.selected');
	if(prevSelected != null){
		prevSelected.classList.remove('selected');
	}
	console.log(`#${noteId}`);
	document.querySelector(`#${noteId}`).classList.add('selected');
}

function clearPopup(){
	noteTitle.value = '';
	noteDesc.value = '';
	hide(popupScreen);
	show(btnAddNote);
}

function display(str, maxLength = 20){
	if(str.length > maxLength){
		return str.substr(0,maxLength) + '..';
	}
	else{
		return str;
	}
}

function hide(el){
	el.classList.add('hidden');
}

function show(el){
	el.classList.remove('hidden');
}