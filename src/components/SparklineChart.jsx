// SparklineChart.js
import React from 'react';
import styled from 'styled-components';

const ChartContainer = styled.div`
  width: 120px;
  height: 40px;
`;

const SparklineChart = ({ data, trend }) => {
  const width = 120;
  const height = 40;
  if (!data || data.length === 0) return <ChartContainer />;

  const max = Math.max(...data);
  const min = Math.min(...data);
  const normalizedData = data.map((value) => ((value - min) / (max - min)) * height);

  const points = normalizedData.map((value, index) => {
    const x = (index / (data.length - 1)) * width;
    const y = height - value;
    return `${x},${y}`;
  }).join(' ');

  const lineColor = trend >= 0 ? '#00c073' : '#ff4141';

  return (
    <ChartContainer>
      <svg width={width} height={height}>
        <polyline
          points={points}
          fill="none"
          stroke={lineColor}
          strokeWidth="2"
          strokeLinejoin="round"
        />
        {trend >= 0 && (
          <linearGradient id="areaGradient" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#00c073" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#00c073" stopOpacity="0" />
          </linearGradient>
        )}
        <path
          d={`M0,${height} L${points} L${width},${height} Z`}
          fill="url(#areaGradient)"
          opacity="0.6"
        />
      </svg>
    </ChartContainer>
  );
};

export default SparklineChart;