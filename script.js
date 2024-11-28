let isEditMode = false;
let currentDay;
let currentEventToDelete = null;

const addEventButtons = document.querySelectorAll('.add-event-btn');
const eventPopup = document.getElementById('event-popup');
const saveEventBtn = document.getElementById('save-event-btn');
const eventInput = document.getElementById('event-input');
const closePopup = document.getElementById('close-popup');
const editIcon = document.getElementById('edit-icon');
const deletePopup = document.getElementById('delete-popup');
const confirmDeleteBtn = document.getElementById('confirm-delete-btn');
const cancelDeleteBtn = document.getElementById('cancel-delete-btn');

// Load events from local storage
const loadEvents = () => {
  ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'].forEach(day => {
    const events = JSON.parse(localStorage.getItem(day)) || [];
    const eventsContainer = document.querySelector(`#${day} .events-container`);
    eventsContainer.innerHTML = '';
    events.forEach((event, index) => {
      const eventDiv = document.createElement('div');
      eventDiv.classList.add('event');
      eventDiv.textContent = event;
      eventDiv.addEventListener('click', () => {
        if (isEditMode) {
          currentEventToDelete = { day, index };
          deletePopup.classList.add('active');
        }
      });
      eventsContainer.appendChild(eventDiv);
    });
  });
};

// Save event to localStorage
const saveEvent = (day, event) => {
  const events = JSON.parse(localStorage.getItem(day)) || [];
  events.push(event);
  localStorage.setItem(day, JSON.stringify(events));
  loadEvents();
};

// Delete event
const deleteEvent = () => {
  if (currentEventToDelete) {
    const { day, index } = currentEventToDelete;
    const events = JSON.parse(localStorage.getItem(day)) || [];
    events.splice(index, 1);
    localStorage.setItem(day, JSON.stringify(events));
    loadEvents();
    deletePopup.classList.remove('active');
  }
};

// Show the event popup
addEventButtons.forEach(button => {
  button.addEventListener('click', () => {
    currentDay = button.dataset.day;
    eventPopup.classList.add('active');
  });
});

// Save event from the popup
saveEventBtn.addEventListener('click', () => {
  const event = eventInput.value;
  if (event) {
    saveEvent(currentDay, event);
    eventInput.value = '';
    eventPopup.classList.remove('active');
  }
});

// Close the event popup
closePopup.addEventListener('click', () => {
  eventPopup.classList.remove('active');
});

// Toggle edit mode
editIcon.addEventListener('click', () => {
  isEditMode = !isEditMode;
  editIcon.textContent = isEditMode ? 'check' : 'edit';
  addEventButtons.forEach(button => {
    button.style.display = isEditMode ? 'none' : 'inline-block';
  });
});

// Confirm delete
confirmDeleteBtn.addEventListener('click', deleteEvent);

// Cancel delete
cancelDeleteBtn.addEventListener('click', () => {
  deletePopup.classList.remove('active');
});

loadEvents();
