const addBtn = document.querySelector("#addBtn");
const main = document.querySelector("#main");


// addbtn calling the addnote function which add the notes in html

addBtn.addEventListener("click", function () {
    addNote();
});


 // This function will save the note by clicking the save btn
 
const saveNotes = () => {
    const notes = document.querySelectorAll(".note textarea");
    const data = [];
    notes.forEach((note) => {
        data.push(note.value);
    });
    if (data.length === 0) {
        localStorage.removeItem("notes");
    } else {
        localStorage.setItem("notes", JSON.stringify(data));
    }
};


// this function for adding the note in html through DOM

const addNote = (text = "") => {
    const note = document.createElement("div");
    note.classList.add("note");
    note.innerHTML = `
    <div class="tool">
         <i class="save fas fa-save"></i>
         <i class="trash fas fa-trash"></i> 
    </div>
    <textarea>${text}</textarea>
    `;

// This function will delete the note by clicking the delete btn

    note.querySelector(".trash").addEventListener("click", function () {
        note.remove();
        saveNotes();
    });

 // This function will save the note by clicking the save btn

    note.querySelector(".save").addEventListener("click", function () {
        saveNotes();
    });

// This function will Auto save the notes when the focus get out from the textarea 

    note.querySelector("textarea").addEventListener("focusout", function () {
        saveNotes();
    });

    main.appendChild(note);
    saveNotes();
};


// this is self calling function for auto create a textarea box after the page is load

(function () {
    const localStorageNotes = JSON.parse(localStorage.getItem("notes"));
    if (localStorageNotes === null) {
        addNote();
    } else {
        localStorageNotes.forEach((localStorageNotes) => {
            addNote(localStorageNotes);
        });
    }
})();
