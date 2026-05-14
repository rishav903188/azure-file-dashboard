const express = require("express");
const multer = require("multer");
const cors = require("cors");
const dotenv = require("dotenv");

const {
  BlobServiceClient
} = require("@azure/storage-blob");

dotenv.config();

const app = express();

app.use(cors());

const upload = multer({
  storage: multer.memoryStorage()
});

const blobServiceClient =
  BlobServiceClient.fromConnectionString(
    process.env.AZURE_STORAGE_CONNECTION_STRING
  );
  app.get("/", (req, res) => {
  res.send("Azure backend running successfully 🚀");
});

app.post("/upload", upload.single("file"), async (req, res) => {

  try {

    const containerClient =
      blobServiceClient.getContainerClient(
        process.env.CONTAINER_NAME
      );

    const blockBlobClient =
      containerClient.getBlockBlobClient(
        req.file.originalname
      );

    await blockBlobClient.uploadData(req.file.buffer);

    res.json({
      message: "File uploaded to Azure Blob Storage"
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Upload failed"
    });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});