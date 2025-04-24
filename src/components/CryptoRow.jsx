// CryptoRow.js
import React from 'react';
import SparklineChart from './SparklineChart';
import styled from 'styled-components';

const Td = styled.td`
    padding: 16px;
    font-size: 14px;
    color: #212529;
`;

const CoinInfo = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
`;

const Logo = styled.img`
    width: 32px;
    height: 32px;
    border-radius: 50%;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
`;

const Symbol = styled.span`
    color: #6c757d;
    font-size: 13px;
`;

const PercentageBadge = styled.span`
    display: inline-block;
    padding: 4px 8px;
    border-radius: 4px;
    background: ${({ value }) => value >= 0 ? 'rgba(0, 192, 115, 0.1)' : 'rgba(255, 65, 65, 0.1)'};
    color: ${({ value }) => value >= 0 ? '#00c073' : '#ff4141'};
    font-weight: 500;
`;

const PriceText = styled.span`
    color: ${({ value }) => value >= 0 ? '#00c073' : value < 0 ? '#ff4141' : '#212529'};
    font-weight: 500;
`;

const CryptoRow = ({ coin, index }) => {
    const formatNumber = (num) => {
        if (!num) return '—';
        return num.toLocaleString(undefined, { maximumFractionDigits: 0 });
    };

    return (
        <tr>
            <Td>{index}</Td>
            <Td>
                <CoinInfo>
                    <Logo src={coin.image} alt={coin.name} />
                    <div>
                        <div>{coin.name}</div>
                        <Symbol>{coin.symbol.toUpperCase()}</Symbol>
                    </div>
                </CoinInfo>
            </Td>
            <Td>
                <PriceText value={coin.price_change_percentage_24h_in_currency}>
                    ${coin.current_price?.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: coin.current_price < 1 ? 6 : 2
                    })}
                </PriceText>
            </Td>
            <Td>
                <PercentageBadge value={coin.price_change_percentage_1h_in_currency}>
                    {coin.price_change_percentage_1h_in_currency?.toFixed(2)}%
                </PercentageBadge>
            </Td>
            <Td>
                <PercentageBadge value={coin.price_change_percentage_24h_in_currency}>
                    {coin.price_change_percentage_24h_in_currency?.toFixed(2)}%
                </PercentageBadge>
            </Td>
            <Td>
                <PercentageBadge value={coin.price_change_percentage_7d_in_currency}>
                    {coin.price_change_percentage_7d_in_currency?.toFixed(2)}%
                </PercentageBadge>
            </Td>
            <Td>${formatNumber(coin.market_cap)}</Td>
            <Td>${formatNumber(coin.total_volume)}</Td>
            <Td>{formatNumber(coin.circulating_supply)} {coin.symbol.toUpperCase()}</Td>
            <Td>
                <SparklineChart 
                    data={coin.sparkline_in_7d?.price || []}
                    trend={coin.price_change_percentage_7d_in_currency}
                />
            </Td>
        </tr>
    );
};

export default CryptoRow;