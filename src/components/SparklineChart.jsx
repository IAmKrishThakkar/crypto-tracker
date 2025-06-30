// components/SparklineChart.jsx
import React, { useEffect, useState } from 'react';

const SparklineChart = ({ data, trend, width = 120, height = 40 }) => {
  const [pathData, setPathData] = useState('');

  useEffect(() => {
    if (!data || data.length === 0) return;

    const max = Math.max(...data);
    const min = Math.min(...data);
    const range = max - min || 1;

    const normalizedData = data.map((value) => ((value - min) / range) * height);

    let path = '';
    normalizedData.forEach((value, index) => {
      const x = (index / (data.length - 1)) * width;
      const y = height - value;
      path += index === 0 ? `M ${x} ${y} ` : `L ${x} ${y} `;
    });

    setPathData(path);
  }, [data, height, width]);

  const lineColor = trend >= 0 ? '#00c073' : '#ff4141';
  const fillColor = trend >= 0 ? 'rgba(0, 192, 115, 0.1)' : 'rgba(255, 65, 65, 0.1)';

  if (!data || data.length === 0) {
    return (
      <div style={{ width, height, fontSize: '0.7rem', color: '#999', textAlign: 'center' }}>
        No data
      </div>
    );
  }

  return (
    <svg viewBox={`0 0 ${width} ${height}`} width={width} height={height}>
      <defs>
        <linearGradient id="sparkline-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={lineColor} stopOpacity="0.5" />
          <stop offset="100%" stopColor={fillColor} stopOpacity="0.1" />
        </linearGradient>
      </defs>
      {/* Area fill */}
      <path
        d={`${pathData} L ${width} ${height} L 0 ${height} Z`}
        fill="url(#sparkline-fill)"
        stroke="none"
      />
      {/* Sparkline stroke */}
      <path
        d={pathData}
        fill="none"
        stroke={lineColor}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default SparklineChart;
