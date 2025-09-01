import fs from "fs";
import path from "path";

const uploadDir = path.join(process.cwd(), "upload");

const uploadFile = async (file, allowedMimes = ["image/jpeg", "image/png", "image/gif"]) => {
  // Create upload folder if it does not exist
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  if (!file) {
    throw new Error("File not received");
  }

  // Check mime type
  if (!allowedMimes.includes(file.mimetype)) {
    throw new Error("Invalid file type");
  }

  const fileName = `${Date.now()}_${file.name}`;
  const fullFilePath = path.join(uploadDir, fileName);

  // Save file
  fs.writeFileSync(fullFilePath, file.data);

  // Return the URI you can use later in DB
  const fileUri = `/upload/${fileName}`;
  return fileUri;
};

export default uploadFile;
