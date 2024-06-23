import axios from "axios";
import * as FileSystem from "expo-file-system";

const baseSasUrl = `https://filesmunicipios.blob.core.windows.net/imagenes`;

async function readFile(uri) {
  try {
    const fileData = await FileSystem.readAsStringAsync(uri, {
      encoding: FileSystem.EncodingType.Base64,
    });
    const raw = atob(fileData);
    const rawLength = raw.length;
    let array = new Uint8Array(new ArrayBuffer(rawLength));
    for (let i = 0; i < rawLength; i++) {
      array[i] = raw.charCodeAt(i);
    }
    return array;
  } catch (error) {
    console.error("Failed to read file", error);
  }
}

export const uploadImages = async (images) => {
  const uploadPromises = images.map(async (image) => {
    const blobName = image.fileName;

    const sasUrl = `${baseSasUrl}/${blobName}?sv=2022-11-02&ss=bfqt&srt=sco&sp=rwdlacupiytfx&se=2024-07-31T04:59:05Z&st=2024-06-22T20:59:05Z&spr=https,http&sig=dDc4lIoSOZct8pL5r%2F1pKeocjxdwKnSKvC5AMQGaql0%3D`;

    fileData = await readFile(image.uri);
    try {
      const response = await axios.put(sasUrl, fileData, {
        headers: {
          "x-ms-blob-type": "BlockBlob",
          "Content-Type": image.mimeType,
        },
      });
    } catch (error) {
      console.error(
        "Error:",
        error.response ? error.response.data : error.message
      );
    }
  });

  await Promise.all(uploadPromises);
};
