import { ImageResponse } from 'next/og';

// Image metadata
export const size = {
  width: 32,
  height: 32,
};
export const contentType = 'image/png';

// Image generation
export default function Icon() {
  // Simple 8-bit invader sprite map
  // 1 = draw color, 0 = transparent
  const invaderMap = [
    "00100000100",
    "00010001000",
    "00111111100",
    "01101110110",
    "11111111111",
    "10111111101",
    "10100000101",
    "00011011000"
  ];
  
  // Calculate pixel size based on map dimensions
  const rows = invaderMap.length;
  const cols = invaderMap[0].length;
  const pixelSize = 2; // size of each "pixel" in the svg space
  
  // Construct SVG rects
  const pixels = [];
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      if (invaderMap[y][x] === '1') {
        pixels.push(
            <rect 
                key={`${x}-${y}`} 
                x={x} 
                y={y} 
                width={1} 
                height={1} 
                fill="#4ade80" // emerald-400
            />
        );
      }
    }
  }

  return new ImageResponse(
    (
      <div
        style={{
          background: '#020617', // slate-950
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '20%',
        }}
      >
        <svg
          width={cols * pixelSize * 1.5} // Scale up
          height={rows * pixelSize * 1.5} // Scale up
          viewBox={`0 0 ${cols} ${rows}`}
          xmlns="http://www.w3.org/2000/svg"
          style={{ shapeRendering: 'crispEdges' }} 
        >
          {pixels}
        </svg>
      </div>
    ),
    {
      ...size,
    }
  );
}
