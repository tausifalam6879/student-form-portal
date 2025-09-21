/* script.js - frontend demo with localStorage */

const notifications = [
  { title: "Hackathon Registration Open", message: "Apply before Sept 25th" },
  { title: "Internship Drive", message: "Top companies visiting campus next month" },
  { title: "AI Workshop", message: "Hands-on AI/ML workshop — limited seats" }
];

const forms = [
  { title: "Event Participation Form", description: "Register to participate in upcoming college events." },
  { title: "Internship Application", description: "Apply for internship opportunities posted by the placement cell." },
  { title: "Feedback Form", description: "Give your feedback about college workshops and sessions." }
];

// Keys for localStorage
const STORAGE_KEY = "student_portal_submissions_v1";

// Render notifications
function renderNotifications() {
  const list = document.getElementById("notificationList");
  list.innerHTML = "";
  notifications.forEach(n => {
    const li = document.createElement("li");
    li.className = "list-group-item";
    li.innerHTML = `<div><strong>${n.title}</strong><div class="small text-muted">${n.message}</div></div>`;
    list.appendChild(li);
  });
}

// Render forms
function renderForms() {
  const container = document.getElementById("formsContainer");
  container.innerHTML = "";
  forms.forEach((f, idx) => {
    const col = document.createElement("div");
    col.className = "col-md-6";
    col.innerHTML = `
      <div class="card p-3">
        <div class="d-flex justify-content-between align-items-start">
          <div>
            <h6 class="form-card-title">${f.title}</h6>
            <p class="mb-1 small-muted">${f.description}</p>
          </div>
          <div>
            <button class="btn btn-sm btn-success" onclick="openForm(${idx})">Fill</button>
          </div>
        </div>
      </div>
    `;
    container.appendChild(col);
  });
}

let currentModalInstance = null;

// Open modal for a form
function openForm(index) {
  document.getElementById("form_id").value = index;
  document.getElementById("formTitle").innerText = forms[index].title;
  // reset fields
  document.getElementById("student_name").value = "";
  document.getElementById("student_email").value = "";
  document.getElementById("student_response").value = "";

  const modalEl = document.getElementById("formModal");
  currentModalInstance = new bootstrap.Modal(modalEl);
  currentModalInstance.show();
}

// Save submission to localStorage
function saveSubmission(sub) {
  const all = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  all.unshift(sub);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
}

// Load and render submissions
function renderSubmissions() {
  const container = document.getElementById("submissionsContainer");
  const all = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  container.innerHTML = "";

  if (all.length === 0) {
    container.innerHTML = `<div class="text-muted">No submissions yet. Fill a form to see your responses here.</div>`;
    return;
  }

  all.forEach((s, i) => {
    const div = document.createElement("div");
    div.className = "submission";
    div.innerHTML = `
      <div class="d-flex justify-content-between">
        <div>
          <strong>${forms[s.form_id].title}</strong>
          <div class="small text-muted">${new Date(s.created_at).toLocaleString()}</div>
        </div>
        <div>
          <button class="btn btn-sm btn-outline-danger" onclick="deleteSubmission(${i})">Delete</button>
        </div>
      </div>
      <div class="mt-2"><strong>${escapeHtml(s.name)}</strong> • ${escapeHtml(s.email)}</div>
      <div class="mt-2">${escapeHtml(s.response)}</div>
    `;
    container.appendChild(div);
  });
}

// Delete a specific submission by index
function deleteSubmission(index) {
  const all = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  all.splice(index, 1);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
  renderSubmissions();
}

// Clear all submissions
function clearAllSubmissions() {
  if (!confirm("Are you sure you want to delete all submissions?")) return;
  localStorage.removeItem(STORAGE_KEY);
  renderSubmissions();
}

// Export submissions (download as JSON)
function exportSubmissions() {
  const data = localStorage.getItem(STORAGE_KEY) || "[]";
  const blob = new Blob([data], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "submissions.json";
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

// Escape HTML to avoid injection (safe display)
function escapeHtml(text) {
  const map = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' };
  return (text || "").replace(/[&<>"']/g, function(m){ return map[m]; });
}

// Handle form submit
document.getElementById("studentForm").addEventListener("submit", function(e) {
  e.preventDefault();
  const formId = parseInt(document.getElementById("form_id").value, 10);
  const name = document.getElementById("student_name").value.trim();
  const email = document.getElementById("student_email").value.trim();
  const response = document.getElementById("student_response").value.trim();

  if (!name || !email || !response) {
    alert("Please fill all fields.");
    return;
  }

  const submission = {
    form_id: formId,
    name,
    email,
    response,
    created_at: new Date().toISOString()
  };

  saveSubmission(submission);

  // hide modal
  if (currentModalInstance) {
    currentModalInstance.hide();
  }

  // show success (simple alert)
  setTimeout(() => {
    alert("✅ Response submitted successfully!");
    renderSubmissions();
  }, 200);
});

// Hook up top buttons
document.getElementById("clearBtn").addEventListener("click", clearAllSubmissions);
document.getElementById("exportBtn").addEventListener("click", exportSubmissions);

// Initialize UI
renderNotifications();
renderForms();
renderSubmissions();
