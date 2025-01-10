# Features on the File uploader

## Upload a File

1. Create an endpoint that accepts form data that urlencoded
2. Parse through the form and extract the file
3. Load the on a file storage service like cloudinary or supabase(both recommended by odin project).
4. Store the details in a database, like the metadata. The date the file was created, last updated, file size, file name, and file type.
5. I need to create database schema for each of the file

```javascript
const fileSchema = {
  username: string,
  name: string,
  type: string,
  size: number,
  lastUpdated: new Date(),
  Created: new Date(),
};
```

## Create a folder

1. An endpoint that will accept a string that is the name of the folder.
2. create a new database entry for the folder.
3. Each folder document will store a list of files
4. ```javascript
   const FolderSchema = {
     username: string,
     name: string,
     files: [FileSchema],
   };
   ```
5. Folder names are not unique. Users are allowed to create more than one folder with the same name.

## User

1. Store all the data to the designated user
2. Authenticate users using passportjs.
2. Create a user schema
3. Each user has its own Folders and Files
4. ```javascript
   const userSchema = {
     username: string,
     password: string,
   };
   ```

### Users have to logged in to upload Files to this system.
