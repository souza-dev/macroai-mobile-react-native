import { getDownloadURL, getStorage, ref, uploadBytesResumable } from '@react-native-firebase/storage';
import recognizeFoodPhoto from 'api/photo/recognizeFoodPhoto';
import { CameraType, CameraView, useCameraPermissions } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import * as Localization from 'expo-localization';
import { useEffect, useRef, useState } from 'react';

export default function usePhotoUpload(user: User) {
    const cameraRef = useRef<CameraView>(null);
    const [facing, setFacing] = useState<CameraType>('back');
    const [permission, requestPermission] = useCameraPermissions();
    const [cameraPermissionGranted, setCameraPermissionGranted] = useState<boolean | null>(null);

    const [loadingUploadPhoto, setLoadingUploadPhoto] = useState(false);
    const [loadingPhotoRecognition, setLoadingPhotoRecognition] = useState(false);

    const [imageUrl, setImageUrl] = useState('');
    const storage = getStorage();
    const locale = Localization.getLocales()[0]?.languageCode || 'en';

    useEffect(() => {
        if (permission) {
            setCameraPermissionGranted(permission.granted);
        }
    }, [permission]);

    const requestCameraAccess = async () => {
        const newPermission = await requestPermission();
        setCameraPermissionGranted(newPermission.granted);
        return newPermission.granted;
    };

    const takePhoto = async () => {
        if (!cameraPermissionGranted) {
            const granted = await requestCameraAccess();
            if (!granted) return null;
        }

        if (!cameraRef) return null;

        try {
            const photo = await cameraRef.current?.takePictureAsync({
                quality: 1,
                base64: false,
            });
            return photo?.uri;
        } catch (error) {
            console.log('Erro ao tirar foto:', error);
            return null;
        }
    };

    const openImagePicker = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images', 'videos'],
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            return result.assets[0].uri;
        }
    };

    const uploadPhotoToStorage = async (localUri: string, userId: string) => {
        try {
            setLoadingUploadPhoto(true);
            const filename = `${Date.now()}.jpg`;
            const storageRef = ref(storage, `foods/${userId}/${filename}`);
            const metadata = {
                customMetadata: {
                    userId,
                    source: 'foodUpload',
                },
            };
            const response = await fetch(localUri);
            const blob = await response.blob();
            await uploadBytesResumable(storageRef, blob, metadata);
            const downloadUrl = await getDownloadURL(storageRef);
            return downloadUrl;
        } catch (error) {
            console.error('❌ Error uploading photo:', error);
            throw error;
        } finally {
            setLoadingUploadPhoto(false);
        }
    };

    const recognizePhotoWithOpenAI = async (photoUrl: string, language: string = 'en') => {
        try {
            console.log('idioma da photo', language);
            setLoadingPhotoRecognition(true);
            const res = await recognizeFoodPhoto(photoUrl, language);
            return res.content;
        } catch (error) {
            console.error('❌ Error recognizing photo:', error);
            throw error;
        } finally {
            setLoadingPhotoRecognition(false);
        }
    };

    const uploadAndRecognizePhoto = async (localUri: string) => {
        try {
            const downloadUrl = await uploadPhotoToStorage(localUri, user.uid as string);
            setImageUrl(downloadUrl);
            const content = await recognizePhotoWithOpenAI(downloadUrl, locale);
            console.log(content);
            return content;
        } catch (error) {
            console.error('❌ Error uploading or recognizing photo:', error);
            throw error;
        }
    };

    return {
        openImagePicker,
        takePhoto,
        loadingUploadPhoto,
        loadingPhotoRecognition,
        uploadAndRecognizePhoto,
        imageUrl,
        cameraRef,
        facing,
        setFacing,
        permission,
        requestPermission,
        cameraPermissionGranted,
        requestCameraAccess,
    };
}
