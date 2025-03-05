# 📁 Storage Management System

The **Storage Management System** is a cloud-based file storage solution, similar to Google Drive, allowing users to upload, manage, and organize files within a specified storage limit. Each user has a default storage allocation of 15 GB, with automatic storage management features to handle file uploads, deletions, and storage usage.

---

## 🚀 **Features**

### 🔒 **Authentication & Authorization**

- Secure login and registration.
- Role-based access control.

### 📂 **File Management**

- Upload files to folders.
- Delete files and restore storage.
- Organize files into directories.
- Support for various file types (e.g., images, PDFs, documents).
- Real-time storage usage updates.

### 📊 **Storage Management**

- Default 15 GB storage allocation per user.
- Automatically updates used and available storage.
- Displays storage usage in a human-readable format.

### 📅 **Recent Files & File Filtering**

- Fetch recently uploaded files.
- Filter files by type (e.g., images, documents, videos).

---

## 🗃️ **Data Models**

### **1. User Model**

```ts
import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  maxStorage: { type: Number, default: 15 * 1024 * 1024 * 1024 }, // 15 GB
  storageUsed: { type: Number, default: 0 },
});

export const User = mongoose.model('User', userSchema);
```

### **2. File Model**

```ts
import mongoose, { Schema } from 'mongoose';

const fileSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  folderId: { type: Schema.Types.ObjectId, ref: 'Folder', required: true },
  name: { type: String, required: true },
  type: { type: String, required: true },
  path: { type: String, required: true },
  size: { type: Number, required: true },
});

export const File = mongoose.model('File', fileSchema);
```

### **3. Folder Model**

```ts
import mongoose, { Schema } from 'mongoose';

const folderSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  files: [{ type: Schema.Types.ObjectId, ref: 'File' }],
});

export const Folder = mongoose.model('Folder', folderSchema);
```

---

## 🛠️ **Core Functionalities**

### 1. **File Upload**

- Uploads file to Cloudinary.
- Stores file metadata in the database.
- Updates user storage usage.

### 2. **File Deletion**

- Deletes file from Cloudinary.
- Removes file metadata from the database.
- Restores available storage to the user.

### 3. **Storage Calculation**

```ts
const totalStorage = formatBytes(user?.maxStorage || 0);
const usedStorage = formatBytes(user?.storageUsed || 0);
const availableStorage = formatBytes(
  (user?.maxStorage || 0) - (user?.storageUsed || 0),
);
```

---

## 📦 **Installation**

```bash
# Clone the repository
git clone https://github.com/your-repo/storage-management-system.git

# Install dependencies
cd storage-management-system
npm install

# Set up environment variables
cp .env.example .env

# Start the server
npm run dev
```

---

## 🌐 **API Endpoints**

### **Authentication**

- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration

### **File Management**

- `POST /api/files/upload/:folderId` - Upload file
- `DELETE /api/files/:fileId` - Delete file
- `GET /api/files/recent` - Fetch recent files

### **Storage Management**

- `GET /api/storage` - Fetch user storage details

---

## 🧑‍💻 **Contributing**

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new feature branch (`git checkout -b feature-branch`).
3. Commit your changes (`git commit -m 'Add new feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Open a pull request.

---

## 📄 **License**

This project is licensed under the MIT License.
