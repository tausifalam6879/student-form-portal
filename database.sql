CREATE DATABASE IF NOT EXISTS ai_learning_portal;
USE ai_learning_portal;

CREATE TABLE IF NOT EXISTS notifications (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS forms (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS submissions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    form_id INT NOT NULL,
    student_name VARCHAR(120) NOT NULL,
    student_email VARCHAR(160) NOT NULL,
    response TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (form_id) REFERENCES forms(id)
);

INSERT INTO notifications (title, description) VALUES
('AI/ML Workshop Registration Open', 'Students can register for a beginner-friendly machine learning workshop.'),
('Dataset Collection Drive', 'Submit dataset ideas for classification, prediction, visualization, or basic analysis.'),
('Data Science Mini Project Review', 'Share simple AI/ML project ideas for mentor review and feedback.');

INSERT INTO forms (title, description) VALUES
('AI Workshop Registration', 'Register interest for an introductory AI and machine learning learning session.'),
('Dataset Idea Submission', 'Submit a dataset idea that can be used for analysis or machine learning practice.'),
('Mini Project Proposal', 'Share a simple AI, ML, or data science project idea for review.'),
('Learning Feedback Form', 'Give feedback about AI sessions, datasets, or project guidance.');
