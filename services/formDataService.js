import axios from "axios";
import * as FileSystem from "expo-file-system";

//TRANSOFMADORES A BYTES
async function readFile(uri) {
  try {
    const fileData = await FileSystem.readAsStringAsync(uri, {
      encoding: FileSystem.EncodingType.Base64,
    });
    const array = base64ToUint8Array(fileData);
    return array;
  } catch (error) {
    console.error("Failed to read file", error);
  }
}

function base64ToUint8Array(base64) {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

const baseSasUrl = `https://filesmunicipios.blob.core.windows.net/imagenes`;

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

export const getImage = (blobName) => {
  return `https://filesmunicipios.blob.core.windows.net/imagenes/${blobName}?sp=r&st=2024-06-23T22:07:27Z&se=2024-08-01T06:07:27Z&sv=2022-11-02&sr=c&sig=0nyRjAc5E%2BT8XGlUy29Zjtku2w34LhcLejnTjn2x3pE%3D`;
};
