'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

interface RangeSliderProps {
  min: number;
  max: number;
  step?: number;
  value: [number, number];
  onChange: (value: [number, number]) => void;
}

export default function RangeSlider({
  min,
  max,
  step = 1,
  value,
  onChange,
}: RangeSliderProps) {
  const [isDragging, setIsDragging] = useState<'min' | 'max' | null>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const getPercentage = useCallback(
    (value: number) => ((value - min) / (max - min)) * 100,
    [min, max]
  );

  const minPos = getPercentage(value[0]);
  const maxPos = getPercentage(value[1]);

  const handleMouseDown = useCallback(
    (event: React.MouseEvent, type: 'min' | 'max') => {
      event.preventDefault();
      setIsDragging(type);
    },
    []
  );

  const handleMouseMove = useCallback(
    (event: MouseEvent) => {
      if (!isDragging || !trackRef.current) return;

      const rect = trackRef.current.getBoundingClientRect();
      const percentage = Math.min(
        Math.max(((event.clientX - rect.left) / rect.width) * 100, 0),
        100
      );
      const newValue = Math.round(((max - min) * percentage) / 100 + min);

      if (isDragging === 'min') {
        if (newValue < value[1]) {
          onChange([newValue, value[1]]);
        }
      } else {
        if (newValue > value[0]) {
          onChange([value[0], newValue]);
        }
      }
    },
    [isDragging, min, max, value, onChange]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(null);
  }, []);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);

  return (
    <div className="relative w-full h-12 select-none touch-none">
      <div
        ref={trackRef}
        className="absolute top-1/2 -translate-y-1/2 h-1 w-full bg-gray-200 rounded-full"
      >
        <div
          className="absolute h-full bg-blue-500 rounded-full"
          style={{
            left: `${minPos}%`,
            right: `${100 - maxPos}%`,
          }}
        />
      </div>

      {/* Min thumb */}
      <div
        onMouseDown={(e) => handleMouseDown(e, 'min')}
        className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-5 bg-white border-2 border-blue-500 rounded-full cursor-pointer"
        style={{ left: `${minPos}%` }}
      >
        <div className="absolute top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
          ₹{value[0].toLocaleString()}
        </div>
      </div>

      {/* Max thumb */}
      <div
        onMouseDown={(e) => handleMouseDown(e, 'max')}
        className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-5 bg-white border-2 border-blue-500 rounded-full cursor-pointer"
        style={{ left: `${maxPos}%` }}
      >
        <div className="absolute top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
          ₹{value[1].toLocaleString()}
        </div>
      </div>
    </div>
  );
} 