import React from "react";

const FeedbackCard = ({ content, name, title }) => {
  const getInitials = (fullName) => {
    const names = fullName.split(" ");
    const initials = (names[0]?.[0] || "") + (names[1]?.[0] || "");
    return initials.toUpperCase();
  };

  // Generate a unique gradient ID per card
  const gradientId = `gradient-${name
    .replace(/\s+/g, "-")
    .toLowerCase()}-${Math.random().toString(36).substr(2, 5)}`;

  return (
    <div className="card bg-base-300 shadow-xl border border-base-200 p-6 rounded-2xl max-w-[370px] my-5">
      <svg
        width="25"
        height="25"
        viewBox="0 0 43 28"
        xmlns="http://www.w3.org/2000/svg"
        className="relative z-10"
      >
        <defs>
          <linearGradient
            id={gradientId}
            x1="28.8615"
            y1="-24.7969"
            x2="41.7939"
            y2="24.1471"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0.00887753" stopColor="#FFFFFF" />
            <stop offset="0.1723" stopColor="#E6E6E6" />
            <stop offset="0.4204" stopColor="#B3B3B3" />
            <stop offset="0.5512" stopColor="#808080" />
            <stop offset="0.7154" stopColor="#4D4D4D" />
            <stop offset="1" stopColor="#000000" />
          </linearGradient>
        </defs>
        <path
          d="M11.7984 27.6L18.9984 0H12.3984L0.398438 27.6H11.7984ZM35.7984 27.6L42.9984 0H36.3984L24.3984 27.6H35.7984Z"
          fill={`url(#${gradientId})`}
        />
      </svg>

      <p className="text-lg leading-loose my-10">{content}</p>

      <div className="flex items-center">
        <div
          className="avatar w-10 h-10 rounded-full bg-primary flex items-center justify-center"
          aria-label={`Avatar for ${name}`}
          title={name}
        >
          <span className="text-white font-bold text-xl">
            {getInitials(name)}
          </span>
        </div>
        <div className="ml-4">
          <h4 className="font-bold text-xl">{name}</h4>
          <p className="text-base text-base-content/70">{title}</p>
        </div>
      </div>
    </div>
  );
};

export default FeedbackCard;
