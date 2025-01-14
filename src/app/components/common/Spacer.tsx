import React from 'react';

interface SpacerProps {
  size?: number;
  d?: 'horizontal' | 'vertical';
}

const Spacer: React.FC<SpacerProps> = ({ size = 0, d = 'vertical' }) => {
  return (
    <div
      style={{
        marginBottom: d === 'vertical' ? size : undefined,
        marginRight: d === 'horizontal' ? size : undefined,
      }}
    />
  );
};

export default Spacer;
