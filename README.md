# Automated Attendance Management System

The Automated Attendance Management System is a web-based application that utilizes face recognition technology to manage attendance records. The system is built using ReactJS for the frontend, Firebase for the backend and database management, and Python Flask for face recognition capabilities.



## Demo admin Login

user : admin@ams.com
pass : password

## Demo user Login

user : user@ams.com
pass : user@123




## Features

- User-friendly interface for easy attendance management
- Face recognition technology to identify and track individuals
- Real-time attendance tracking and reporting
- Secure authentication and access control
- Cloud-based database storage and management

## Prerequisites

Before running the application, ensure you have the following installed:

- Node.js
- Python
- Firebase CLI
- Flask

## Installation

1. Clone the repository:

```bash
git clone https://github.com/SwanSkynet/attendance-management
```

2. Navigate to the project directory:

```bash
cd attendance-management
```

3. Install the frontend dependencies:

```bash
npm install
```

4. Install the backend dependencies:

```bash
pip install -r requirements.txt
```

## Configuration

1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com/).

2. Enable Firebase Authentication and Firestore in your project.

3. Obtain the Firebase project configuration, including the API key, authDomain, databaseURL, and projectId.

4. Create a `.env` file in the root directory and populate it with your Firebase project configuration:

```env
REACT_APP_API_KEY=your_api_key
REACT_APP_AUTH_DOMAIN=your_auth_domain
REACT_APP_DATABASE_URL=your_database_url
REACT_APP_PROJECT_ID=your_project_id
```

## Usage

1. Start the ReactJS frontend development server:

```bash
npm run dev
```

2. In a separate terminal window, start the Flask backend server:

```bash
python app.py
```

3. Access the application in your browser at `http://localhost:3000`.

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, please create a pull request.

## License

This project is licensed under the [MIT License](LICENSE).

## Acknowledgments

- [OpenAI](https://openai.com) for providing the GPT-3.5 language model used to generate this README.
- [ReactJS](https://reactjs.org) for the frontend framework.
- [Firebase](https://firebase.google.com) for the backend and database management.
- [Flask](https://flask.palletsprojects.com) for the Python web framework.
- [Python Face Recognition](https://github.com/ageitgey/face_recognition) library for face recognition capabilities.

## Contact

For any inquiries or support, please contact [your-email@example.com](mailto:your-email@example.com).