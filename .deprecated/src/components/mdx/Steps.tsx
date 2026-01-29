import React from 'react';
import { Card, Steps as AntSteps, Flex } from 'antd';
import { OrderedListOutlined } from '@ant-design/icons';

const iconMap: Record<string, React.ReactNode> = {
  OrderedListOutlined: <OrderedListOutlined />,
};

interface StepsProps {
  title: string;
  icon?: string;
  children: React.ReactNode;
}

interface StepProps {
  title: string;
  description: string;
}

export const Steps: React.FC<StepsProps> = ({ title, icon, children }) => {
  const childArray = React.Children.toArray(children);
  const items = childArray.map((child) => {
    if (React.isValidElement<StepProps>(child)) {
      return {
        title: <span style={{ fontSize: 14, wordBreak: 'keep-all' }}>{child.props.title}</span>,
        description: <span style={{ fontSize: 14, wordBreak: 'keep-all' }}>{child.props.description}</span>,
      };
    }
    return { title: '', description: '' };
  });

  return (
    <Card
      size="small"
      title={
        <Flex align="center" gap={8}>
          {icon && iconMap[icon]}
          <span style={{ fontSize: 16 }}>{title}</span>
        </Flex>
      }
      style={{ marginBottom: 16 }}
    >
      <AntSteps
        direction="vertical"
        size="small"
        current={-1}
        items={items}
      />
    </Card>
  );
};

export const Step: React.FC<StepProps> = () => null;
