import React from 'react';

function Image({
  src,
  alt = "Image Name",
  className = "",
  ...props
}) {

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={(e) => {
        // Use a data URL for a simple colored placeholder instead of missing image
        e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='0 0 200 200'%3E%3Crect width='200' height='200' fill='%23f3f4f6'/%3E%3Ctext x='100' y='100' text-anchor='middle' dominant-baseline='middle' font-family='Arial' font-size='14' fill='%236b7280'%3EImage%3C/text%3E%3C/svg%3E"
      }}
      {...props}
    />
  );
}

export default Image;
