import ImageKit from "imagekit";
import dotenv from "dotenv"
dotenv.config();

const imagekit = new ImageKit({
    urlEndpoint: process.env.IMAGE_KIT_ENDPOINT,
    publicKey: process.env.IMAGE_KIT_PUBLIC_KEY,
    privateKey: process.env.IMAGE_KIT_PRIVATE_KEY,
})

export const imagekitAuth = (req, res) => {
    try {
        const authParams = imagekit.getAuthenticationParameters();
        res.json(authParams);
    } catch (error) {
        res.status(500).json({ error: "ImageKit auth failed" });
    }
};