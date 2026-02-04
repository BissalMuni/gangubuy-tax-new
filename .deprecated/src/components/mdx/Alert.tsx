import React from 'react';
import { Alert as AntAlert, Tag, Typography } from 'antd';

const { Text } = Typography;

interface AlertProps {
  variant: 'warning' | 'success' | 'error' | 'info';
  title: string;
  children: React.ReactNode;
  emphasis?: string;
}

export const Alert: React.FC<AlertProps> = ({ variant, title, children, emphasis }) => (
  <AntAlert
    type={variant}
    message={<Text strong style={{ fontSize: 16 }}>{title}</Text>}
    description={
      <div style={{ width: '100%' }}>
        <div style={{ fontSize: 14, wordBreak: 'keep-all', lineHeight: 1.6 }}>
          {children}
        </div>
        {emphasis && (
          <Tag color={variant === 'warning' ? 'orange' : 'green'} style={{ marginTop: 8 }}>
            {emphasis}
          </Tag>
        )}
      </div>
    }
    showIcon
    style={{ width: '100%', marginBottom: 16 }}
  />
);
