import React from 'react';

const Snowfall: React.FC = () => {
  // Create an array of snowflakes to be rendered.
  // The number of snowflakes can be adjusted here.
  const snowflakeCount = 150;
  const snowflakes = Array.from({ length: snowflakeCount }).map((_, i) => {
    // Randomize size for a more natural look
    const size = Math.random() * 3 + 2; // size between 2px and 5px
    const style = {
      width: `${size}px`,
      height: `${size}px`,
      // Randomize horizontal position
      left: `${Math.random() * 100}vw`,
      // Randomize opacity
      opacity: Math.random() * 0.5 + 0.3, // opacity between 0.3 and 0.8
      // Randomize animation durations for falling and swaying
      animationDuration: `${Math.random() * 10 + 5}s, ${Math.random() * 4 + 3}s`, // duration for fall, sway
      // Randomize animation delay to prevent all snowflakes from starting at once
      animationDelay: `${Math.random() * 7}s`,
    };
    return <div key={i} className="snowflake" style={style}></div>;
  });

  return (
    <>
      <style>{`
        /* Keyframe animation for the falling motion (using 'top' to avoid transform conflict) */
        @keyframes fall {
          to {
            top: 110vh;
          }
        }

        /* Keyframe animation for the side-to-side swaying motion */
        @keyframes sway {
          0%, 100% {
            transform: translateX(0);
          }
          50% {
            transform: translateX(40px);
          }
        }

        /* Base styles for each snowflake */
        .snowflake {
          position: fixed;
          /* Start snowflakes above the viewport */
          top: -10vh;
          background: white;
          border-radius: 50%;
          /* Prevent snowflakes from interfering with mouse events */
          pointer-events: none;
          /* Ensure snowflakes are above the background but below other UI elements */
          z-index: 10;
          /* Apply both animations. 'fall' controls 'top', 'sway' controls 'transform'. No conflict. */
          animation-name: fall, sway;
          animation-timing-function: linear, ease-in-out;
          animation-iteration-count: infinite, infinite;
        }
      `}</style>
      <div aria-hidden="true">
        {snowflakes}
      </div>
    </>
  );
};

export default Snowfall;
