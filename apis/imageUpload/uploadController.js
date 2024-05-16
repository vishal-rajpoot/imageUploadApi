import fs from "fs";
import path from "path";

const port = 8088;

const allowedMimeTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif"];

const uploadImage = (req, res) => {
  try {
    if (!req.file)
      return res
        .status(400)
        .json({ error: "Error - Please select image to upload !" });

    if (allowedMimeTypes.includes(req.file.mimetype)) {
      const url = `http://localhost:${port}/${req.file.path}`;
      const response = {
        msg: "Image uploaded successfully",
        data: url,
      };
      return res.status(200).json(response);

    } else {
      return res
        .status(401)
        .json({ error: "Error - Please select jpg image to upload" });
    }
  } catch (error) {
    console.error("Server Encountered a Problem:", error);
    return res.status(500).json({
      err: error,
    });
  }
};

const getImages = (req, res) => {
  const uploadsDir = path.join("./uploads");

  fs.readdir(uploadsDir, (err, files) => {
    if (err) {
      console.error("Error reading directory:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    const imageFiles = files.filter((file) => {
      const ext = path.extname(file).toLowerCase();
      return [".jpg", ".jpeg", ".png", ".gif"].includes(ext);
    });

    const imageData = imageFiles.map((file) => {
      const filePath = path.join(uploadsDir, file);
      const stats = fs.statSync(filePath);
      return {
        name: file,
        created_date: stats.birthtime,
        url: `http://localhost:${port}/uploads/${file}`,
      };
    });

    return res.status(200).json(imageData);
  });
};

export { uploadImage, getImages };
