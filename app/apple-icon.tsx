import { ImageResponse } from 'next/og';

// Image metadata
export const size = {
  width: 180,
  height: 180,
};
export const contentType = 'image/png';

// Image generation
export default function Icon() {
  // Same 8-bit invader sprite map
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
  
  // For a 180x180 icon, and a grid of roughly 11x8 (plus padding), 
  // let's scale it nicely. 
  // We want the icon to take up about 70-80% of the space.
  // 180 * 0.8 = 144 pixels. 
  // Max dimension is 11 cols. 144 / 11 ~= 13px per "pixel".
  
  const pixelSize = 13; 
  // Real width of invader = 11 * 13 = 143
  // Real height of invader = 8 * 13 = 104
  // Center it: x = (180 - 143) / 2, y = (180 - 104) / 2
  
  const startX = (180 - (cols * pixelSize)) / 2;
  const startY = (180 - (rows * pixelSize)) / 2;
  
  // Construct SVG rects
  const pixels = [];
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      if (invaderMap[y][x] === '1') {
        pixels.push(
            <div
                key={`${x}-${y}`} 
                style={{
                    position: 'absolute',
                    left: startX + (x * pixelSize),
                    top: startY + (y * pixelSize),
                    width: pixelSize,
                    height: pixelSize,
                    background: '#4ade80', // emerald-400
                }}
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
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '18%', // Standard iOS rounded corner approximation (iOS does its own clipping usually, but this looks nice on Android/Web too)
        }}
      >
         {/* We can just draw div blocks for pixel perfection in ImageResponse */}
         {pixels}
      </div>
    ),
    {
      ...size,
    }
  );
}
