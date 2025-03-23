<br />
<div align="center">
  <h3 style="border-bottom: 0;">💊</h3>

  <h3 align="center" style="border-bottom: 0;">Pharmaceutical Inventory Management System</h3>

  <h4><a href="https://youtu.be/tVA-JaVj-Io">Demo Video</a></h4>
</div>

## About the Project

Submission for [StackUp March 2025 Coding Challenge](https://hackathon.stackup.dev/web/events/stackup-march-2025-coding-challenge)

## Why Adopt This Tool?

* **Improved Compliance:** Adherence to regulatory standards and ensure compliance.
* **Scalability & Security:** Designed for scalability and equipped with strong security measures to protect sensitive data.
* **User-Friendly Interface:** Intuitive interface designed to be easy to use for all staff members.
* **Data integrity:** Utilizes transaction based upserts to ensure data integrity when creating and or modifying purchase orders and prescriptions.

## Features

* Inventory Tracking: Manage drug quantities, expiry dates, and batch numbers.
* Procurement: Create and manage purchase orders, track supplier information, and receive shipments.
* Distribution: Record drug dispensing, patient information, and prescription details.

## Built With

* **Supabase:** PostgreSQL database and backend services.
* **Next.js:** React framework for the frontend.
* **Refine:** To easily build enterprise-grade React application.
* **Material UI:** Intuitive React UI tools.
* **React Hook Form:** Performant, flexible & extensible forms.

## Pre-requisite

You will need to have Node.js and Docker installed locally to run this application.

## Running Locally

1.  Clone the Repository:
    ```bash
    git clone https://github.com/kit-t/stackup-march-2025-coding-challenge.git
    cd stackup-march-2025-coding-challenge
    ```

2.  Install Dependencies:
    ```bash
    npm install
    ```

3.  Start Supabase Locally (Docker Required):
    ```bash
    npx run supabase:start
    ```

4. Set Up Frontend:
    ```bash
    cd frontend
    npm install
    ```

5.  Set Up Environment Variables:
    * Create a `.env.local` file in the `/frontend` directory.
    * Copy the contents of `.env.example` into `.env.local`.
    * Modify the variables in `.env.local` to match your Supabase configuration.

6.  Start the Frontend:
    ```bash
    npm run dev
    ```

7.  Access the Application:
    * Navigate to `http://localhost:3000` for frontend
    * Navigate to `http://localhost:54323/project/default` for supabase studio