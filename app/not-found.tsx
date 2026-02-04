import { Button, Result } from 'antd';
import Link from 'next/link';

export default function NotFound() {
  return (
    <Result
      status="404"
      title="404"
      subTitle="요청하신 페이지를 찾을 수 없습니다."
      extra={
        <Link href="/">
          <Button type="primary">홈으로 돌아가기</Button>
        </Link>
      }
    />
  );
}
