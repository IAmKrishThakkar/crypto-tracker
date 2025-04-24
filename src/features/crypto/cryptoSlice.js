import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Existing fetchCryptoData thunk
export const fetchCryptoData = createAsyncThunk(
    'crypto/fetchData',
    async () => {
        const res = await axios.get(
            'https://api.coingecko.com/api/v3/coins/markets',
            {
                params: {
                    vs_currency: 'usd',
                    order: 'market_cap_desc',
                    per_page: 100,
                    page: 1,
                    sparkline: true,
                    price_change_percentage: '1h,24h,7d',
                },
            }
        );
        return res.data;
    }
);

// Helper to mutate values randomly
const getRandomOffset = (val, percent = 0.01) => {
    const offset = val * percent * (Math.random() * 2 - 1); // +/- 1%
    return val + offset;
};

const cryptoSlice = createSlice({
    name: 'crypto',
    initialState: {
        assets: [],
        status: 'idle',
        error: null,
    },
    reducers: {
        simulateUpdate: (state) => {
            state.assets = state.assets.map((coin) => {
                const newPrice = getRandomOffset(coin.current_price, 0.01);
                const priceChange1h = ((newPrice - coin.current_price) / coin.current_price) * 100;
                const priceChange24h = getRandomOffset(coin.price_change_percentage_24h_in_currency, 0.05);
                const priceChange7d = getRandomOffset(coin.price_change_percentage_7d_in_currency, 0.02);
                const volume = getRandomOffset(coin.total_volume, 0.03);

                return {
                    ...coin,
                    current_price: newPrice,
                    price_change_percentage_1h_in_currency: priceChange1h,
                    price_change_percentage_24h_in_currency: priceChange24h,
                    price_change_percentage_7d_in_currency: priceChange7d,
                    total_volume: volume,
                };
            });
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCryptoData.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchCryptoData.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.assets = action.payload;
            })
            .addCase(fetchCryptoData.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export const { simulateUpdate } = cryptoSlice.actions;
export default cryptoSlice.reducer;
