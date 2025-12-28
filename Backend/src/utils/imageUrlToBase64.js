import fetch from "node-fetch";

export const imageUrlToBase64 = async (url) => {
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error("Failed to fetch image from ImageKit");
    }

    const buffer = await response.arrayBuffer();

    return {
        data: Buffer.from(buffer).toString("base64"),
        mimeType: response.headers.get("content-type"),
    };
};
