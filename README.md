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
- Provides an AI-style recommendation demo based on department, skills, and interest
- Shows eligibility matching, deadline priority, skill gaps, and short opportunity summaries
- Stores saved demo data in browser localStorage
- Includes a MySQL schema for future database integration

## AI / Data Science Features

The current live demo includes a frontend rule-based AI prototype. It does not use a paid AI API or train a machine learning model yet. The demo applies simple scoring and matching logic to show how AI/Data Science can support campus opportunity discovery.

- Opportunity recommendation based on department, skills, and interest
- Eligibility matching between student department and opportunity criteria
- Deadline priority based on remaining days
- Skill gap analysis by comparing required skills with student skills
- Short summary generation for each recommended opportunity

This can later be upgraded with a real ML model or AI API for smarter recommendations and automatic notice summarization.

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
