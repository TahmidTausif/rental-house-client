const Loader = () => {
  const flakes = Array.from({ length: 12 });

  return (
    <div className="flex items-center justify-center min-h-screen w-full overflow-hidden">
      <div className="relative w-full h-24 flex items-center justify-center gap-2">
        {flakes.map((_, i) => (
          <div
            key={i}
            className="snow-bounce w-3 h-3 bg-secondary rounded-full"
            style={{
              animationDelay: `${i * 0.1}s`,
              animationDuration: "1.5s",
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Loader;
