# Wanderlust - A Full-Stack Hotels listing Platform

Wanderlust is a full-stack web application that allows users to browse, list, and review vacation rental properties. Built with a robust MVC (Model-View-Controller) architecture, it ensures a clean separation of concerns and scalable code.

**Live Demo**: [https://wanderlust-hotels-app.onrender.com](https://wanderlust-hotels-app.onrender.com)

**GitHub Repository**: [https://github.com/MouryaRaviKumar/wanderlust-hotels-app](https://github.com/MouryaRaviKumar/wanderlust-hotels-app)

---

## Key Features ✨

* **MVC Architecture**: The project follows the Model-View-Controller design pattern, separating application logic, data, and UI for maintainability.
* **Full CRUD Functionality**: Authenticated users can create, read, update, and delete their own property listings.
* **User Authentication**: Secure signup, login, and logout functionality using Passport.js.
* **Image Uploads**: Property images are uploaded to and served from Cloudinary.
* **Interactive Maps**: Each property's location is displayed on an interactive map using the Mapbox API.
* **Reviews and Ratings**: Users can leave text-based reviews and star ratings for properties.
* **Custom Error Handling**: Implements a custom `ExpressError` class for consistent and clear error management throughout the backend.

---

## Validation 🛡️

The application implements robust validation on both the client and server sides to ensure data integrity.

* **Client-Side Validation**: Uses Bootstrap's built-in form validation to provide immediate feedback to users, preventing invalid form submissions.
* **Server-Side Validation**: Middleware validates incoming data against predefined schemas before it reaches the route handlers, preventing invalid or malicious data from being processed.

---

## Technical Stack 🛠️

* **Backend**: Node.js, Express.js
* **Database**: MongoDB with Mongoose ODM
* **Authentication**: Passport.js (Local Strategy)
* **Image Hosting**: Cloudinary with Multer
* **Mapping**: Mapbox API
* **Frontend**: EJS (Embedded JavaScript templates)
* **Styling**: Bootstrap, Custom CSS

---

## Getting Started 🚀

### Prerequisites

* Node.js and npm
* MongoDB Atlas account
* Cloudinary account
* Mapbox account

### Installation and Setup

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/MouryaRaviKumar/wanderlust-hotels-app.git](https://github.com/MouryaRaviKumar/wanderlust-hotels-app.git)
    cd wanderlust-hotels-app
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    Create a `.env` file in the root directory and add the following, replacing the placeholder values with your own credentials:
    ```env
    CLOUD_NAME=<your_cloudinary_cloud_name>
    CLOUD_API_KEY=<your_cloudinary_api_key>
    CLOUD_API_SECRET=<your_cloudinary_api_secret>
    MAP_TOKEN=<your_mapbox_api_token>
    ATLASDB_URL=<your_mongodb_atlas_connection_string>
    ```

4.  **Start the server:**
    ```bash
    node app.js
    ```
    The application will be running at `http://localhost:8080`.

---

## Contact

For any questions or feedback, please reach out!

* **Name**: Mourya Ravi Kumar
* **GitHub**: [MouryaRaviKumar](https://github.com/MouryaRaviKumar)
