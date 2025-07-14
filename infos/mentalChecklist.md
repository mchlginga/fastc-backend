# Mental Checklist

1. Core Features
2. Tech Stack
3. Project Folder Setup
4. Task Breakdown
5. Version Control

---

## Core Features

- To digitize trainee profiling, automate attendance, manage certification, and match then with jobs via AI.

1. Digital Trainee Registration and Profiling

    - Allow trainees to register online, providing personal information and educational background.
    - Store trainee profiles in a secure database for easy access and management.

2. Facial Recognition-Based Attendance

    - Camera capture + face detection.
    - Log attendance by matching faces (probably 3rd party service or pre-trained model).
    - Timestamps with location (if needed).

3. Automated Certificate Generation

    - After training completion > auto-generate PDF certificates.
    - Include trainee name, course, date, unique cert ID

4. Role-Based Access System

    - Admin(TESDA/PESO):    Full access (CRUD users, verify attendance, generate certs).
    - Company:              View/Search trainees, offer jobs.
    - Trainee:              View own profile, attendance, certificate status

5. Searchable Trainee Profiles
    
    - Filter by skills, location, certification status.
    - Company side can search and contact qualified trainees.

6. AI-Powered Job Matching

    - Basic version:        Rule-based matching(skills match + certificate validity).
    - Advanced:             Integrate basic ML later (optional if time permits).

### Optional Features (If may time pa)

    - Notification System   (email or dashboard alerts).
    - Admin dashboard stats (no. of trainees, attendance%, certs issued).

---

## Tech Stack

1. Node.js          – runtime
2. Express.js       – server framework
3. MongoDB Atlas    – cloud database


### Essential Libraries / Tools (by Feature)

1. Authentication & Roles

    - jsonwebtoken  : for JWT auth

    - bcryptjs      : for password hashing

    - dotenv        : for managing secrets

2. File Uploads

    - multer        : for uploading trainee images, certs, IDs

3. Validation & Errors

    - joi or zod    : for validating user input

    - http-errors   : clean error handling

    - morgan        : request logging

4. Database Modeling

    - mongoose      : ODM for MongoDB

5. Facial Recognition

    - TBD (e.g., face-api.js, opencv4nodejs, or 3rd party API like Face++ or AWS Rekognition)

6. PDF Generation

    - pdfkit or html-pdf – to generate certificates

7. Testing (optional for now)

    - jest, supertest

8. Optional But Useful

    - cors – kung may frontend na gusto mo i-connect

    - express-rate-limit – para maiwasan spam / abuse

    - helmet – basic HTTP security

    - express-validator – alternative to Joi

---

## Project Folder Setup
