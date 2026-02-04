import React from 'react';
<<<<<<< HEAD

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'md', 
  text = '로딩 중...' 
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-2">
      <div
        className={`${sizeClasses[size]} border-2 border-gray-200 border-t-blue-600 rounded-full animate-spin`}
      />
      {text && (
        <p className="text-sm text-gray-600">{text}</p>
=======
import { Spin, Typography } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const { Text } = Typography;

interface LoadingSpinnerProps {
  size?: 'small' | 'default' | 'large';
  text?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'default',
  text = '로딩 중...',
}) => {
  const iconSize = {
    small: 16,
    default: 32,
    large: 48,
  };

  const antIcon = <LoadingOutlined style={{ fontSize: iconSize[size] }} spin />;

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
        gap: 12,
      }}
    >
      <Spin indicator={antIcon} size={size} />
      {text && (
        <Text type="secondary" style={{ fontSize: size === 'small' ? 12 : 14 }}>
          {text}
        </Text>
>>>>>>> 9e33101fa373775de70c7d7e1713d78538caaddf
      )}
    </div>
  );
};

<<<<<<< HEAD
export default LoadingSpinner;
=======
export default LoadingSpinner;
>>>>>>> 9e33101fa373775de70c7d7e1713d78538caaddf
