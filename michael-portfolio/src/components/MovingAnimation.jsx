export default function MovingAnimation({ progress }) {
  const playerPosition = progress * 0.78;
  const ballPosition = Math.min(playerPosition + 10, 96);

  return (
    <div
      className="moving-animation"
      role="img"
      aria-label="Pixel-art Lionel Messi dribbling a soccer ball"
    >
      <img
        className="moving-animation__player"
        src="/assets/messi-pixel.png"
        alt=""
        draggable="false"
        style={{ left: `${playerPosition}%` }}
      />
      <svg
        className="moving-animation__ball"
        viewBox="0 0 32 32"
        aria-hidden="true"
        style={{ left: `${ballPosition}%` }}
      >
        <circle cx="16" cy="16" r="13" />
        <path d="m16 8 5 4-2 6h-6l-2-6 5-4Zm-5 4-5-1m3 9 5-2m10-7 5-1m-3 10-5-2m-5 0-3 6m5-6 3 6" />
      </svg>
    </div>
  );
}