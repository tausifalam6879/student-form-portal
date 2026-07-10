CREATE DATABASE IF NOT EXISTS campusconnect_portal;
USE campusconnect_portal;

CREATE TABLE IF NOT EXISTS departments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(120) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS opportunities (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    opportunity_type ENUM('Placement', 'Internship', 'Hackathon') NOT NULL,
    eligible_departments VARCHAR(255) NOT NULL,
    eligibility TEXT NOT NULL,
    description TEXT NOT NULL,
    deadline DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS student_interests (
    id INT AUTO_INCREMENT PRIMARY KEY,
    opportunity_id INT NOT NULL,
    student_name VARCHAR(120) NOT NULL,
    student_email VARCHAR(160) NOT NULL,
    department VARCHAR(120) NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (opportunity_id) REFERENCES opportunities(id)
);

INSERT INTO departments (name) VALUES
('MCA'),
('Computer Science'),
('Information Technology'),
('Electronics'),
('Mechanical'),
('Civil'),
('Electrical');

INSERT INTO opportunities
(title, opportunity_type, eligible_departments, eligibility, description, deadline)
VALUES
('TCS Ninja Campus Drive', 'Placement', 'MCA, CSE, IT, ECE', 'Final-year students with basic programming and aptitude preparation.', 'Central listing for the company visit so every eligible department can see and track the form.', '2026-08-12'),
('AI/Data Analyst Internship', 'Internship', 'MCA, CSE, IT, Mathematics', 'Python basics, SQL basics, and interest in data analysis.', 'Internship update for students who want to work on datasets, dashboards, and AI-assisted analysis.', '2026-08-18'),
('Smart India Hackathon Registration', 'Hackathon', 'All Departments', 'Teams of students with a project idea and problem statement preference.', 'Hackathon notice board entry so all branches can form teams without depending on separate groups.', '2026-08-20'),
('Startup Product Challenge', 'Hackathon', 'All Departments', 'Students with web, app, AI, design, or presentation skills.', 'College-level innovation challenge for building practical prototypes and pitching ideas.', '2026-08-28'),
('Java Full Stack Trainee Drive', 'Placement', 'MCA, CSE, IT', 'Java, OOPS, DBMS, SQL, and basic web development knowledge.', 'Company update for Java trainee roles with placement form visibility across eligible departments.', '2026-09-02');
