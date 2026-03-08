/**
 * 자동화 파이프라인 스케줄러
 *
 * Docker 컨테이너 안에서 상시 실행되며 주기적으로 orchestrator를 호출합니다.
 * pnpm scheduler:up 으로 컨테이너 시작, scheduler:down 으로 중지합니다.
 *
 * 환경변수:
 *   SCHEDULE_INTERVAL_MINUTES  - 실행 간격 (기본: 30분)
 *   SCHEDULE_RUN_ON_START      - 시작 시 즉시 실행 여부 (기본: true)
 */

import { spawn } from 'child_process';
import path from 'path';

const INTERVAL_MINUTES = parseInt(process.env.SCHEDULE_INTERVAL_MINUTES || '30', 10);
const RUN_ON_START = process.env.SCHEDULE_RUN_ON_START !== 'false';
const INTERVAL_MS = INTERVAL_MINUTES * 60 * 1000;

let isRunning = false;

function log(msg: string) {
  console.log(`[Scheduler] ${new Date().toISOString()} ${msg}`);
}

function runOrchestrator(): Promise<void> {
  return new Promise((resolve) => {
    if (isRunning) {
      log('이전 실행이 아직 진행 중 — 스킵');
      resolve();
      return;
    }

    isRunning = true;
    log('orchestrator 실행 시작');

    // 컨테이너 안에서 직접 local 모드로 실행 (Docker-in-Docker 불필요)
    const proc = spawn('pnpm', ['orchestrate'], {
      cwd: path.join('/workspace'),
      stdio: 'inherit',
      env: { ...process.env },
      shell: true,
    });

    proc.on('close', (code) => {
      isRunning = false;
      if (code === 0) {
        log('orchestrator 완료');
      } else {
        log(`orchestrator 종료 코드: ${code}`);
      }
      resolve();
    });

    proc.on('error', (err) => {
      isRunning = false;
      log(`orchestrator 실행 오류: ${err.message}`);
      resolve();
    });
  });
}

async function main() {
  log(`시작 — ${INTERVAL_MINUTES}분 간격`);

  // 시작 시 즉시 실행
  if (RUN_ON_START) {
    await runOrchestrator();
  }

  // 주기적 실행
  setInterval(() => {
    runOrchestrator();
  }, INTERVAL_MS);
}

// SIGTERM / SIGINT 처리 (docker stop 등)
process.on('SIGTERM', () => {
  log('SIGTERM 수신 — 종료');
  process.exit(0);
});
process.on('SIGINT', () => {
  log('SIGINT 수신 — 종료');
  process.exit(0);
});

main();
