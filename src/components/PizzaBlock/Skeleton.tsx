import React from 'react';
import ContentLoader from 'react-content-loader';

const Skeleton: React.FC = () => (
  <ContentLoader
    speed={2}
    width={280}
    height={480}
    viewBox="0 0 280 480"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <circle cx="134" cy="148" r="120" />
    <rect x="0" y="274" rx="8" ry="8" width="280" height="27" />
    <rect x="0" y="317" rx="26" ry="26" width="280" height="86" />
    <rect x="0" y="423" rx="11" ry="11" width="97" height="27" />
    <rect x="173" y="414" rx="25" ry="25" width="107" height="45" />
  </ContentLoader>
);

export default Skeleton;
