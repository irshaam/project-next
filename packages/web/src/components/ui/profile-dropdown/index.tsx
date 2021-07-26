import Image from 'next/image';

import ProfileImage from '../../../assets/images/user_profile_picture.png';

const ProfileDropdown = () => {
  return (
    <div className="w-10 h-10 mr-11 flex items-center">
      <Image
        layout="fixed"
        width={40}
        height={40}
        src={ProfileImage}
        alt="Picture of the author"
      />
    </div>
  );
};

export default ProfileDropdown;
