import { updateUserProfile } from 'api/profile';

export const updateUserProfileService = async (user: User, data: Record<string, any>) => {
    const userProfile = await updateUserProfile(user, data);
    return userProfile;
};
