const savedState = localStorage.getItem("notesState");

let state = savedState
    ? JSON.parse(savedState)
    : {
        notes: {
            "new note": ""
        },
        selected: "new note",
        history: []
    };

if (!state.history) {
    state.history = [];
}

const select = document.querySelector("#note-select");
const textarea = document.querySelector("#note-text");
const historyList = document.querySelector("#history-list");

function setState(newState, action) {
    const oldData = JSON.stringify({
        notes: state.notes,
        selected: state.selected
    });

    const newData = JSON.stringify({
        notes: newState.notes,
        selected: newState.selected
    });

    if (oldData !== newData) {
        const log = {
            time: new Date().toLocaleTimeString(),
            action: action
        };

        newState.history = [
            ...state.history,
            log
        ].slice(-10);
    }

    state = newState;

    localStorage.setItem(
        "notesState",
        JSON.stringify(state)
    );

    render();
}

function render() {
    select.innerHTML = "";

    for (const name in state.notes) {
        const option = document.createElement("option");

        option.value = name;
        option.textContent = name;
        option.selected = name === state.selected;

        select.appendChild(option);
    }

    textarea.value = state.notes[state.selected];
    historyList.innerHTML = "";

    for (const log of state.history) {
        const item = document.createElement("li");

        item.textContent =
            log.time + " - " + log.action;

        historyList.appendChild(item);
    }
}

function selectNote() {
    setState({
        ...state,
        selected: select.value
    }, "select");
}

function editNote() {
    const newNotes = Object.assign({}, state.notes);
    newNotes[state.selected] = textarea.value;

    setState({
        ...state,
        notes: newNotes
    }, "edit");
}

function addNote() {
    const name = prompt("Anna uuden muistiinpanon nimi:");

    if (name && !state.notes[name]) {
        const newNotes = Object.assign({}, state.notes);
        newNotes[name] = "";

        setState({
            ...state,
            notes: newNotes,
            selected: name
        }, "add");
    } else if (name) {
        alert("Nimi on jo käytössä.");
    }
}

function renameNote() {
    const newName = prompt(
        "Anna uusi nimi:",
        state.selected
    );

    if (
        newName &&
        newName !== state.selected &&
        !state.notes[newName]
    ) {
        const newNotes = Object.assign({}, state.notes);

        newNotes[newName] =
            newNotes[state.selected];

        delete newNotes[state.selected];

        setState({
            ...state,
            notes: newNotes,
            selected: newName
        }, "rename");
    } else if (newName && newName !== state.selected) {
        alert("Nimi on jo käytössä.");
    }
}

function deleteNote() {
    const answer = confirm(
        "Haluatko varmasti poistaa muistiinpanon?"
    );

    if (answer) {
        const newNotes = Object.assign({}, state.notes);
        delete newNotes[state.selected];

        if (Object.keys(newNotes).length === 0) {
            newNotes["new note"] = "";
        }

        setState({
            ...state,
            notes: newNotes,
            selected: Object.keys(newNotes)[0]
        }, "delete");
    }
}

function changeTheme() {
    const currentTheme =
        document.documentElement.dataset.theme;

    const newTheme =
        currentTheme === "dark" ? "light" : "dark";

    document.documentElement.dataset.theme = newTheme;
    localStorage.setItem("theme", newTheme);

    updateThemeButton();
}

function updateThemeButton() {
    const theme =
        document.documentElement.dataset.theme;

    const themeButton =
        document.querySelector("#theme-btn");

    if (theme === "dark") {
        themeButton.textContent = "Light theme";
    } else {
        themeButton.textContent = "Dark theme";
    }
}

const savedTheme =
    localStorage.getItem("theme") || "light";

document.documentElement.dataset.theme = savedTheme;

select.addEventListener("change", selectNote);
textarea.addEventListener("change", editNote);

document.querySelector("#add-btn")
    .addEventListener("click", addNote);

document.querySelector("#rename-btn")
    .addEventListener("click", renameNote);

document.querySelector("#delete-btn")
    .addEventListener("click", deleteNote);

document.querySelector("#theme-btn")
    .addEventListener("click", changeTheme);

render();
updateThemeButton();