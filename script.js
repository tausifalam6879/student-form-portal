const notifications = [
  {
    title: "TCS Ninja campus drive form is open",
    message: "Eligible students from MCA, CSE, IT, and ECE can save interest before 12 Aug."
  },
  {
    title: "Smart India Hackathon internal registration",
    message: "Team submissions are open for all departments. Shortlisting will happen department-wise."
  },
  {
    title: "AI internship opportunity shared by placement cell",
    message: "Students interested in Python, data analysis, and basic ML can apply from the portal."
  }
];

const opportunities = [
  {
    title: "TCS Ninja Campus Drive",
    type: "Placement",
    department: "MCA, CSE, IT, ECE",
    deadline: "12 Aug 2026",
    eligibility: "Final-year students with basic programming and aptitude preparation.",
    description: "Central listing for the company visit so every eligible department can see and track the form."
  },
  {
    title: "AI/Data Analyst Internship",
    type: "Internship",
    department: "MCA, CSE, IT, Mathematics",
    deadline: "18 Aug 2026",
    eligibility: "Python basics, SQL basics, and interest in data analysis.",
    description: "Internship update for students who want to work on datasets, dashboards, and AI-assisted analysis."
  },
  {
    title: "Smart India Hackathon Registration",
    type: "Hackathon",
    department: "All Departments",
    deadline: "20 Aug 2026",
    eligibility: "Teams of students with a project idea and problem statement preference.",
    description: "Hackathon notice board entry so all branches can form teams without depending on separate groups."
  },
  {
    title: "Startup Product Challenge",
    type: "Hackathon",
    department: "All Departments",
    deadline: "28 Aug 2026",
    eligibility: "Students with web, app, AI, design, or presentation skills.",
    description: "A college-level innovation challenge for building practical prototypes and pitching ideas."
  },
  {
    title: "Java Full Stack Trainee Drive",
    type: "Placement",
    department: "MCA, CSE, IT",
    deadline: "02 Sep 2026",
    eligibility: "Java, OOPS, DBMS, SQL, and basic web development knowledge.",
    description: "Company update for Java trainee roles with placement form visibility across eligible departments."
  }
];

const STORAGE_KEY = "campusconnect_saved_interests_v1";

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

function renderOpportunities() {
  const container = document.getElementById("formsContainer");
  const selectedType = document.getElementById("typeFilter").value;
  const filtered = selectedType === "all"
    ? opportunities
    : opportunities.filter((opportunity) => opportunity.type === selectedType);

  container.innerHTML = "";

  filtered.forEach((opportunity) => {
    const index = opportunities.indexOf(opportunity);
    const col = document.createElement("div");
    col.className = "col-md-6";
    col.innerHTML = `
      <div class="form-card">
        <div class="d-flex justify-content-between align-items-start gap-2">
          <h3 class="form-card-title h6">${escapeHtml(opportunity.title)}</h3>
          <span class="badge-type">${escapeHtml(opportunity.type)}</span>
        </div>
        <p class="mb-2 small-muted">${escapeHtml(opportunity.description)}</p>
        <div class="detail-line"><i class="fa fa-building-columns"></i><span>${escapeHtml(opportunity.department)}</span></div>
        <div class="detail-line"><i class="fa fa-calendar-days"></i><span>Deadline: ${escapeHtml(opportunity.deadline)}</span></div>
        <div class="detail-line"><i class="fa fa-check-circle"></i><span>${escapeHtml(opportunity.eligibility)}</span></div>
        <button class="btn btn-sm btn-success mt-3" onclick="openForm(${index})">Save Interest</button>
      </div>
    `;
    container.appendChild(col);
  });
}

let currentModalInstance = null;

function openForm(index) {
  document.getElementById("form_id").value = index;
  document.getElementById("formTitle").innerText = opportunities[index].title;
  document.getElementById("student_name").value = "";
  document.getElementById("student_email").value = "";
  document.getElementById("student_department").value = "";
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

  document.getElementById("savedCount").innerText = all.length;

  if (all.length === 0) {
    container.innerHTML = `<div class="text-muted">No saved interests yet. Students can save an opportunity from the board above.</div>`;
    return;
  }

  all.forEach((submission, index) => {
    const opportunity = opportunities[submission.form_id] || { title: "Campus Opportunity" };
    const div = document.createElement("div");
    div.className = "submission";
    div.innerHTML = `
      <div class="d-flex justify-content-between gap-3">
        <div>
          <strong>${escapeHtml(opportunity.title)}</strong>
          <div class="small text-muted">${new Date(submission.created_at).toLocaleString()}</div>
        </div>
        <button class="btn btn-sm btn-outline-danger" onclick="deleteSubmission(${index})">Delete</button>
      </div>
      <div class="mt-2"><strong>${escapeHtml(submission.name)}</strong> - ${escapeHtml(submission.department)} - ${escapeHtml(submission.email)}</div>
      <div class="mt-2">${escapeHtml(submission.response)}</div>
    `;
    container.appendChild(div);
  });
}

function renderMetrics() {
  document.getElementById("openDrivesCount").innerText = opportunities.filter((item) => item.type !== "Hackathon").length;
  document.getElementById("hackathonCount").innerText = opportunities.filter((item) => item.type === "Hackathon").length;
}

function deleteSubmission(index) {
  const all = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  all.splice(index, 1);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
  renderSubmissions();
}

function clearAllSubmissions() {
  if (!confirm("Delete all saved demo interests?")) return;
  localStorage.removeItem(STORAGE_KEY);
  renderSubmissions();
}

function exportSubmissions() {
  const data = localStorage.getItem(STORAGE_KEY) || "[]";
  const blob = new Blob([data], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "campus-opportunity-interests.json";
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
  const department = document.getElementById("student_department").value.trim();
  const response = document.getElementById("student_response").value.trim();

  if (!name || !email || !department || !response) {
    alert("Please fill all fields.");
    return;
  }

  saveSubmission({
    form_id: formId,
    name,
    email,
    department,
    response,
    created_at: new Date().toISOString()
  });

  if (currentModalInstance) {
    currentModalInstance.hide();
  }

  setTimeout(() => {
    alert("Interest saved successfully.");
    renderSubmissions();
  }, 200);
});

document.getElementById("clearBtn").addEventListener("click", clearAllSubmissions);
document.getElementById("exportBtn").addEventListener("click", exportSubmissions);
document.getElementById("typeFilter").addEventListener("change", renderOpportunities);

renderNotifications();
renderOpportunities();
renderMetrics();
renderSubmissions();
