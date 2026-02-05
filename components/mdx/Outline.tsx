import React from 'react';

interface OutlineProps {
  level: 1 | 2 | 3 | 4;
  children: React.ReactNode;
}

/**
 * 개조식 구조를 시각적으로 표현하는 컴포넌트
 * 기존의 "1.", "가.", "나." 등의 기호를 대체하여 폰트 크기와 색상으로 계층을 구분
 */
export function Outline({ level, children }: OutlineProps) {
  const styles: Record<1 | 2 | 3 | 4, React.CSSProperties> = {
    1: {
      // "1.", "2.", "3." 대체 - 최상위 계층
      fontSize: '1.5rem',
      fontWeight: 700,
      color: '#1a1a1a',
      marginTop: '2rem',
      marginBottom: '1rem',
      borderLeft: '4px solid #1890ff',
      paddingLeft: '1rem',
      lineHeight: 1.5,
    },
    2: {
      // "가.", "나.", "다." 대체 - 2차 계층
      fontSize: '1.25rem',
      fontWeight: 600,
      color: '#333333',
      marginTop: '1.5rem',
      marginBottom: '0.75rem',
      borderLeft: '3px solid #52c41a',
      paddingLeft: '1rem',
      marginLeft: '0.5rem',
      lineHeight: 1.4,
    },
    3: {
      // "1)", "2)", "3)" 대체 - 3차 계층
      fontSize: '1.1rem',
      fontWeight: 500,
      color: '#555555',
      marginTop: '1rem',
      marginBottom: '0.5rem',
      paddingLeft: '1rem',
      marginLeft: '2rem',
      lineHeight: 1.3,
    },
    4: {
      // "•", "-" 대체 - 4차 계층
      fontSize: '1rem',
      fontWeight: 400,
      color: '#666666',
      marginTop: '0.5rem',
      marginBottom: '0.25rem',
      paddingLeft: '0.5rem',
      marginLeft: '3rem',
      lineHeight: 1.2,
    },
  };

  return <div style={styles[level]}>{children}</div>;
}
