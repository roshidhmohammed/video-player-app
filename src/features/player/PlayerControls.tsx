export const PlayerControls = ({ togglePlay, seek }: any) => {
  return (
    <div className="flex items-center justify-center gap-6 p-4 text-white">
      <button onClick={() => seek(-10)}>⏪ 10s</button>
      <button onClick={togglePlay}>⏯</button>
      <button onClick={() => seek(10)}>⏩ 10s</button>
    </div>
  );
};
