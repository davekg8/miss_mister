import { useState } from 'react';
import { storage } from '../firebase'; // Assuming you'll export storage from firebase.ts
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

export const useImageUpload = () => {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [downloadURL, setDownloadURL] = useState<string | null>(null);

  const uploadImage = async (file: File) => {
    setUploading(true);
    setUploadProgress(0);
    setUploadError(null);
    setDownloadURL(null);

    if (!file) {
      setUploadError("No file selected.");
      setUploading(false);
      return null;
    }

    const storageRef = ref(storage, `contestant_photos/${file.name}_${Date.now()}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on('state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress);
      },
      (error) => {
        setUploadError(error.message);
        setUploading(false);
      },
      async () => {
        const url = await getDownloadURL(uploadTask.snapshot.ref);
        setDownloadURL(url);
        setUploading(false);
      }
    );

    return new Promise<string | null>((resolve, reject) => {
      uploadTask.then(() => {
        getDownloadURL(uploadTask.snapshot.ref).then(url => resolve(url));
      }).catch(error => reject(error));
    });
  };

  return { uploadImage, uploadProgress, uploading, uploadError, downloadURL };
};
