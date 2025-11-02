import { readUserProfile } from 'api/profile';

export const readUserProfileService = async (uid: string) => {
    const userProfile = await readUserProfile(uid);
    return userProfile;
};
