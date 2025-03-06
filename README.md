# Storage Management System

## Project Overview

The Storage Management System is a robust application that allows users to securely store, manage, and organize files and folders. It offers user authentication, folder and file management, file encryption, and insightful summaries of storage usage. The system is designed to handle various file types and provides a user-friendly interface for seamless file and folder operations.

## Features

### 1. User Authentication & Authorization

- **Register & Login:** Users can register and log in securely.
- **Password Management:** Supports forgot password, reset password, and change password functionality.
- **JWT Authentication:** Manages secure access to user-specific data.

### 2. Folder Management

- **Create Folders:** Organize files into custom folders.
- **Delete & Rename Folders:** Manage and update folder names.
- **Duplicate Folders:** Create copies of existing folders.

### 3. File Management

- **Upload Files:** Supports image, PDF, and document uploads.
- **Delete, Rename, and Duplicate Files:** Flexible file management.
- **File Encryption:** Set, remove, and manage encrypted pins for files and folders.
- **Datewise Filtering:** Filter files and folders by date.

### 4. File & Folder Encryption

- **Set Encryption Pin:** Users can hide files and folders with a secure pin.
- **Access Control:** Only accessible through pin validation.
- **Remove Encryption:** Allows users to remove the encryption pin.

### 5. Storage Summary

- **Dashboard Overview:** Recent files, total folders, PDFs, notes, and images.
- **Storage Management:** Displays used storage, total storage, and available storage.

## Known Issue

- **DOCX File Upload Issue:** There is currently an issue when trying to upload `.docx` files through Postman or API requests. While image files upload successfully, `.docx` files result in an error: "Unsupported ZIP file". Manual upload to Cloudinary works, but programmatic upload via API does not. Further investigation is needed to resolve this issue.

## Technology Stack

- **Backend:** Node.js, Express
- **Database:** MongoDB, Mongoose
- **Cloud Storage:** Cloudinary for file storage
- **Authentication:** JSON Web Tokens (JWT)

## Setup & Installation

### Prerequisites

- Node.js and npm installed
- MongoDB instance running

### Steps

1. **Clone the Repository**

```sh
git clone https://github.com/AbuBokorprog/storage-management-system
cd storage-management-system
```

2. **Install Dependencies**

```sh
npm install
```

3. **Configure Environment Variables**
   Create a `.env` file in the root directory and add the following variables:

```plaintext
NODE_ENV= development
PORT=5000
MONGODB_URL=database-url
SALT=12
JWT_ACCESS_SECRET = 091b2c529dec033b5ff4531e622ea3f93170e045222963319662b7e4a34f0cdd
JWT_EXPIRES_IN=10d
JWT_REFRESH_SECRET = 41b991b21dc0a439cb45fed544992ba3fafa3f912d3c4dedebec3592d7d552fb74a86a4d69ea560bcf7bf988d173ddecaffa9815dd5a6661bcacd58c0cdb2dc5
JWT_REFRESH_EXPIRES_IN=365d
CLOUDINARY_CLOUD_NAME=cloud-name
CLOUDINARY_API_KEY=cloudinary-api-key
CLOUDINARY_API_SECRET=cloudinary-api-secret
CLIENT_URL=http://localhost:3000
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-email-password
```

4. **Start the Server**

```sh
npm run dev
```

## Conclusion

The Storage Management System is a complete solution for file and folder management with advanced features like encryption and detailed storage analysis. This project can be extended with additional features such as sharing files and integrating with third-party services.
