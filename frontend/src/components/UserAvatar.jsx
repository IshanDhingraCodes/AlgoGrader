import React, { useState } from "react";
import { User } from "lucide-react";

const UserAvatar = ({ user, className = "size-7" }) => {
  const [imgError, setImgError] = useState(false);

  const name = user?.name || user?.email || "User";
  const initial = name.charAt(0).toUpperCase();

  const handleImageError = () => {
    setImgError(true);
  };

  // If custom user image URL exists and hasn't errored, try rendering it
  if (user?.image && !imgError) {
    return (
      <img
        src={user.image}
        alt={name}
        onError={handleImageError}
        className={`rounded-full object-cover shrink-0 ${className}`}
      />
    );
  }

  // Elegant letter badge fallback with gradient background (never breaks)
  return (
    <div
      className={`rounded-full bg-gradient-to-tr from-primary via-primary/80 to-secondary flex items-center justify-center font-bold text-primary-content shadow-sm shrink-0 select-none ${className}`}
      title={name}
    >
      <span className="text-xs uppercase leading-none">{initial}</span>
    </div>
  );
};

export default UserAvatar;
