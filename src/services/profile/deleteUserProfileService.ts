import { deleteUserProfile } from 'api/profile';

export const deleteUserProfileService = async (user: User) => {
    const userProfile = await deleteUserProfile(user);
    return userProfile;
};
