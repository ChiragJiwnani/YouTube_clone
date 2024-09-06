import videofile from "../Models/videofile.js";


export const uploadvideo = async (req, res) => {
    if (!req.file || !['video/mp4'].includes(req.file.mimetype)) {
        res.status(400).json({ message: "Please upload a .mp4 video file only." });
        return;
    }

    try {
        const file = new videofile({
            videotitle: req.body.title.trim() || 'Untitled',
            filename: req.file.originalname,
            filepath: req.file.path,
            filetype: req.file.mimetype,
            filesize: req.file.size,
            videochanel: req.body.chanel.trim() || 'Default Channel',
            uploader: req.body.uploader.trim() || 'Anonymous',
        });

        await file.save();
        res.status(201).send("File uploaded successfully");
    } catch (error) {
        if (error instanceof mongoose.Error.ValidationError) {
            res.status(400).json({ message: "Validation error occurred." });
        } else if (error.name === 'MongoError' && error.code === 11000) {
            res.status(409).json({ message: "Duplicate key error." });
        } else {
            res.status(500).json({ message: "An unexpected error occurred." });
        }
    }
};

export const getallvideos = async (req, res) => {
    try {
        const files = await videofile.find();
        res.status(200).send(files);
    } catch (error) {
        res.status(500).json({ message: "Failed to retrieve videos." });
    }
};
