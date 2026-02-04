'use client';

import { Button, Result } from 'antd';

export default function TaxError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <Result
      status="error"
      title="오류가 발생했습니다"
      subTitle={error.message || '페이지를 로드하는 중 문제가 발생했습니다.'}
      extra={
        <Button type="primary" onClick={reset}>
          다시 시도
        </Button>
      }
    />
  );
}
