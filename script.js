const notifications = [
  {
    title: "AI/ML Workshop Registration Open",
    message: "Students can register for a beginner-friendly machine learning session."
  },
  {
    title: "Dataset Collection Drive",
    message: "Submit simple dataset ideas for classification, prediction, or analysis projects."
  },
  {
    title: "Data Science Mini Project Review",
    message: "Share your project idea and get it listed for mentor review."
  }
];

const forms = [
  {
    title: "AI Workshop Registration",
    description: "Register your interest for an introductory AI/ML learning session."
  },
  {
    title: "Dataset Idea Submission",
    description: "Submit a dataset idea that can be used for analysis or machine learning practice."
  },
  {
    title: "Mini Project Proposal",
    description: "Share a simple AI, ML, or data science project idea for review."
  },
  {
    title: "Learning Feedback Form",
    description: "Give feedback about AI sessions, datasets, or project guidance."
  }
];

const STORAGE_KEY = "ai_learning_portal_submissions_v1";

function renderNotifications() {
  const list = document.getElementById("notificationList");
  list.innerHTML = "";

  notifications.forEach((notification) => {
    const li = document.createElement("li");
    li.className = "list-group-item";
    li.innerHTML = `
      <strong>${escapeHtml(notification.title)}</strong>
      <div class="small text-muted">${escapeHtml(notification.message)}</div>
    `;
    list.appendChild(li);
  });
}

function renderForms() {
  const container = document.getElementById("formsContainer");
  container.innerHTML = "";

  forms.forEach((form, index) => {
    const col = document.createElement("div");
    col.className = "col-md-6";
    col.innerHTML = `
      <div class="form-card p-3">
        <h3 class="form-card-title h6">${escapeHtml(form.title)}</h3>
        <p class="mb-3 small-muted">${escapeHtml(form.description)}</p>
        <button class="btn btn-sm btn-success" onclick="openForm(${index})">Fill Form</button>
      </div>
    `;
    container.appendChild(col);
  });
}

let currentModalInstance = null;

function openForm(index) {
  document.getElementById("form_id").value = index;
  document.getElementById("formTitle").innerText = forms[index].title;
  document.getElementById("student_name").value = "";
  document.getElementById("student_email").value = "";
  document.getElementById("student_response").value = "";

  const modalEl = document.getElementById("formModal");
  currentModalInstance = new bootstrap.Modal(modalEl);
  currentModalInstance.show();
}

function saveSubmission(submission) {
  const all = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  all.unshift(submission);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
}

function renderSubmissions() {
  const container = document.getElementById("submissionsContainer");
  const all = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  container.innerHTML = "";

  if (all.length === 0) {
    container.innerHTML = `<div class="text-muted">No submissions yet. Fill a form to see saved responses here.</div>`;
    return;
  }

  all.forEach((submission, index) => {
    const form = forms[submission.form_id] || { title: "AI Portal Form" };
    const div = document.createElement("div");
    div.className = "submission";
    div.innerHTML = `
      <div class="d-flex justify-content-between gap-3">
        <div>
          <strong>${escapeHtml(form.title)}</strong>
          <div class="small text-muted">${new Date(submission.created_at).toLocaleString()}</div>
        </div>
        <button class="btn btn-sm btn-outline-warning" onclick="deleteSubmission(${index})">Delete</button>
      </div>
      <div class="mt-2"><strong>${escapeHtml(submission.name)}</strong> - ${escapeHtml(submission.email)}</div>
      <div class="mt-2">${escapeHtml(submission.response)}</div>
    `;
    container.appendChild(div);
  });
}

function deleteSubmission(index) {
  const all = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  all.splice(index, 1);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
  renderSubmissions();
}

function clearAllSubmissions() {
  if (!confirm("Delete all saved demo submissions?")) return;
  localStorage.removeItem(STORAGE_KEY);
  renderSubmissions();
}

function exportSubmissions() {
  const data = localStorage.getItem(STORAGE_KEY) || "[]";
  const blob = new Blob([data], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "ai-learning-submissions.json";
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

function escapeHtml(text) {
  const map = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  };

  return String(text || "").replace(/[&<>"']/g, (char) => map[char]);
}

document.getElementById("studentForm").addEventListener("submit", (event) => {
  event.preventDefault();

  const formId = Number.parseInt(document.getElementById("form_id").value, 10);
  const name = document.getElementById("student_name").value.trim();
  const email = document.getElementById("student_email").value.trim();
  const response = document.getElementById("student_response").value.trim();

  if (!name || !email || !response) {
    alert("Please fill all fields.");
    return;
  }

  saveSubmission({
    form_id: formId,
    name,
    email,
    response,
    created_at: new Date().toISOString()
  });

  if (currentModalInstance) {
    currentModalInstance.hide();
  }

  setTimeout(() => {
    alert("Response submitted successfully.");
    renderSubmissions();
  }, 200);
});

document.getElementById("clearBtn").addEventListener("click", clearAllSubmissions);
document.getElementById("exportBtn").addEventListener("click", exportSubmissions);

renderNotifications();
renderForms();
renderSubmissions();
