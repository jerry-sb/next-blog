import React from 'react';

interface SpacerProps {
  size?: number;
  d?: 'horizontal' | 'vertical';
}

const Spacer: React.FC<SpacerProps> = ({ size = 0, d = 'vertical' }) => {
  return (
    <div
      style={{
        height: d === 'vertical' ? size : undefined,
        width: d === 'horizontal' ? size : undefined,
        flexShrink: 0, // flex 컨테이너 내에서도 줄어들지 않도록
      }}
    />
  );
};

export default Spacer;
