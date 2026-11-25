import { useEffect, useState } from 'react';
import MovingAnimation from './MovingAnimation';

const LOADING_DURATION = 2800;

export default function LoadingEffect({ onComplete }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const startedAt = performance.now();
    let animationFrame;
    let completionTimeout;

    const updateProgress = (now) => {
      const nextProgress = Math.min(100, Math.floor(((now - startedAt) / LOADING_DURATION) * 100));
      setProgress(nextProgress);

      if (nextProgress < 100) {
        animationFrame = requestAnimationFrame(updateProgress);
      } else {
        completionTimeout = window.setTimeout(onComplete, 350);
      }
    };

    animationFrame = requestAnimationFrame(updateProgress);

    return () => {
      cancelAnimationFrame(animationFrame);
      window.clearTimeout(completionTimeout);
    };
  }, [onComplete]);

  return (
    <main className="loading-screen" aria-label="Portfolio loading">
      <section className="loading-panel">
        <p className="loading-brand">Michael&apos;s Portfolio</p>
        <h1 className="loading-title">THE WORLD IS OPENING...</h1>
        <MovingAnimation progress={progress} />
        <div
          className="loading-bar"
          role="progressbar"
          aria-label="Portfolio loading progress"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={progress}
        >
          <div className="loading-bar__fill" style={{ width: `${progress}%` }} />
        </div>
        <p className="loading-percentage" aria-hidden="true">{progress}%</p>
      </section>
    </main>
  );
}
