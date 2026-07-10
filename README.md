# CampusConnect - Central Opportunity Portal

A simple college opportunity portal for placement drives, internship updates, hackathons, and department-wise eligibility information.

## Live Demo

[Open Live Demo](https://tausifalam6879.github.io/student-form-portal/)

## Problem Statement

In many colleges, company forms and hackathon updates are circulated in different department WhatsApp groups. If one department does not receive the form, students from that department may miss the opportunity.

CampusConnect solves this by keeping all placement, internship, and hackathon updates in one central portal for the whole college.

## What This Project Does

- Shows company placement drives in one place
- Lists internship updates with eligibility and deadlines
- Lists hackathon opportunities for all departments
- Shows eligible departments for each opportunity
- Allows students to save interest in an opportunity
- Stores saved demo data in browser localStorage
- Includes a MySQL schema for future database integration

## AI Scope

The current live demo is a frontend prototype. In a future version, AI can help with:

- Matching students with relevant opportunities based on department and skills
- Highlighting urgent deadlines
- Suggesting suitable hackathons and internships
- Summarizing company eligibility criteria

No fake AI model is claimed in this version.

## Tech Stack

- HTML
- CSS
- JavaScript
- Bootstrap
- MySQL schema

## Project Structure

```text
student-form-portal/
|-- index.html
|-- style.css
|-- script.js
|-- database.sql
|-- README.md
```

## Run Locally

Open `index.html` directly in a browser.

## MySQL Schema

The `database.sql` file contains tables for:

- departments
- opportunities
- student_interests

Important: The current frontend demo uses localStorage. To store data in MySQL in real time, a backend such as Java Spring Boot or Node.js can be added later.
