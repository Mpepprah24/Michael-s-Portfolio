import { useEffect, useRef } from 'react';

const CONNECTION_DISTANCE = 120;
const POINTER_DISTANCE = 160;
const MAX_PARTICLES = 90;

export default function AnimatedBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    if (!canvas || !context) return undefined;

    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const pointer = { x: 0, y: 0, active: false };
    let particles = [];
    let width = 0;
    let height = 0;
    let frameId = 0;

    const draw = () => {
      context.clearRect(0, 0, width, height);

      particles.forEach((particle, index) => {
        if (!motionPreference.matches) {
          particle.x += particle.vx;
          particle.y += particle.vy;

          if (particle.x < 0) particle.x = width;
          if (particle.x > width) particle.x = 0;
          if (particle.y < 0) particle.y = height;
          if (particle.y > height) particle.y = 0;
        }

        for (let nextIndex = index + 1; nextIndex < particles.length; nextIndex += 1) {
          const nextParticle = particles[nextIndex];
          const distance = Math.hypot(particle.x - nextParticle.x, particle.y - nextParticle.y);

          if (distance < CONNECTION_DISTANCE) {
            const opacity = 0.18 * (1 - distance / CONNECTION_DISTANCE);
            context.beginPath();
            context.moveTo(particle.x, particle.y);
            context.lineTo(nextParticle.x, nextParticle.y);
            context.strokeStyle = `rgba(255, 111, 92, ${opacity})`;
            context.stroke();
          }
        }

        if (pointer.active) {
          const distance = Math.hypot(particle.x - pointer.x, particle.y - pointer.y);

          if (distance < POINTER_DISTANCE) {
            const opacity = 0.3 * (1 - distance / POINTER_DISTANCE);
            context.beginPath();
            context.moveTo(particle.x, particle.y);
            context.lineTo(pointer.x, pointer.y);
            context.strokeStyle = `rgba(255, 196, 123, ${opacity})`;
            context.stroke();
          }
        }

        context.beginPath();
        context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        context.fillStyle = 'rgba(255, 196, 123, 0.72)';
        context.fill();
      });

      if (!motionPreference.matches) {
        frameId = window.requestAnimationFrame(draw);
      }
    };

    const resize = () => {
      const bounds = canvas.getBoundingClientRect();
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 1.5);
      width = bounds.width;
      height = bounds.height;
      canvas.width = Math.round(width * pixelRatio);
      canvas.height = Math.round(height * pixelRatio);
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

      const particleCount = Math.min(
        MAX_PARTICLES,
        Math.max(28, Math.floor((width * height) / 19000)),
      );

      particles = Array.from({ length: particleCount }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.32,
        vy: (Math.random() - 0.5) * 0.32,
        radius: Math.random() * 1.4 + 0.7,
      }));

      if (motionPreference.matches) draw();
    };

    const updatePointer = (event) => {
      const bounds = canvas.getBoundingClientRect();
      pointer.x = event.clientX - bounds.left;
      pointer.y = event.clientY - bounds.top;
      pointer.active = pointer.x >= 0
        && pointer.x <= width
        && pointer.y >= 0
        && pointer.y <= height;
    };

    const clearPointer = () => {
      pointer.active = false;
    };

    const updateMotionPreference = () => {
      window.cancelAnimationFrame(frameId);
      if (motionPreference.matches) {
        draw();
      } else {
        frameId = window.requestAnimationFrame(draw);
      }
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas.parentElement);
    window.addEventListener('pointermove', updatePointer, { passive: true });
    window.addEventListener('pointerleave', clearPointer);
    motionPreference.addEventListener('change', updateMotionPreference);
    resize();

    if (!motionPreference.matches) {
      frameId = window.requestAnimationFrame(draw);
    }

    return () => {
      window.cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      window.removeEventListener('pointermove', updatePointer);
      window.removeEventListener('pointerleave', clearPointer);
      motionPreference.removeEventListener('change', updateMotionPreference);
    };
  }, []);

  return (
    <div className="animated-background" aria-hidden="true">
      <div className="animated-background__art" />
      <div className="animated-background__isometric" />
      <div className="animated-background__node-field">
        <span /><span /><span /><span /><span /><span />
      </div>
      <div className="animated-background__triangles">
        <span /><span /><span />
      </div>
      <div className="animated-background__swoosh animated-background__swoosh--one" />
      <div className="animated-background__swoosh animated-background__swoosh--two" />
      <canvas className="animated-background__particles" ref={canvasRef} />
    </div>
  );
}
