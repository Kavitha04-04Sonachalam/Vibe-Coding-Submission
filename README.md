# Vibecoding Assignments

This repository contains my submissions for the VibeCoding assignments. It includes two projects:

- **Assignment A — UPI Payment Flow**
- **Assignment B — Movie App (React)**

---

## Assignment A — UPI Payment Flow

**Hosted URL:** [Live Demo](http://vibe-coding-alpha-fawn.vercel.app)  
**Folder:** `/assignment-a/`  

### Description
A simple web page demonstrating a UPI payment flow using a custom UPI deep-link. The app allows users to pay INR 1 via popular UPI apps like GPay, PhonePe, or BHIM. It also includes a manual confirmation system and SMS parsing simulation to show payment status.

### Features
- Display order summary  
- Pay via UPI button generating deep-link  
- Manual “I Paid” confirmation  
- Simulated SMS parser to confirm payment  

### How to Test Locally
1. Open `assignment-a/index.html` in a browser (mobile recommended).  
2. Click **Pay via UPI** to open your UPI app.  
3. Use **Simulate Incoming SMS** or **I Paid** button to confirm payment.  

### References
- [SuperLabs: Direct UPI Integration](https://blog.superlabs.co/direct-upi-integration/)

---

## Assignment B — Movie App (React)

**Hosted URL:** [Live Demo](http://react-app-phi-silk.vercel.app)  
**Folder:** `/assignment-b/`  

### Description
A React-based Movie App that shows top movies by default and allows users to search for any movie. Built to demonstrate React skills, API integration, and interactive UI design.

### Features
- Display top trending movies  
- Search movies by name  
- Responsive and interactive UI  

### How to Run Locally
1. Navigate to the folder:
cd assignment-b

2. Install dependencies:
      npm install

3. Start the development server:
      npm start

4. Open your browser at http://localhost:3000

**Technologies Used:**

React

Tailwind CSS / CSS

Axios / Fetch API for movie data

**Why I Built It**

To practice React, state management, API integration, and to showcase a functional and interactive frontend project for VibeCoding.
Implemented debouncing for the search input to optimize API calls and improve performance.