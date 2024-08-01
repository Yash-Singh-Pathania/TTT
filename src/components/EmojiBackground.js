// src/components/EmojiBackground.js
import React, { useMemo } from 'react';
import { Typography, Box } from '@mui/material';

const EmojiBackground = React.memo(() => {
    const emojis = ['🌋', '💻', '🏓', '🏸', '🐐', '🐍'];
    const gridSize = 17; // Number of rows and columns in the grid
    const cellSize = 100 / gridSize; // Size of each cell in percentage

    const createGrid = () => {
        const grid = [];
        for (let row = 0; row < gridSize; row++) {
            for (let col = 0; col < gridSize; col++) {
                const emoji = emojis[Math.floor(Math.random() * emojis.length)];
                const x = col * cellSize + Math.random() * (cellSize / 2);
                const y = row * cellSize + Math.random() * (cellSize / 2);
                grid.push({ emoji, x, y });
            }
        }
        return grid;
    };

    const grid = useMemo(createGrid, []); // Memoize the grid to prevent re-creation

    return (
        <Box
            sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                zIndex: 0,
                overflow: 'hidden',
            }}
        >
            {grid.map((item, index) => (
                <Typography
                    key={index}
                    sx={{
                        position: 'absolute',
                        left: `${item.x}%`,
                        top: `${item.y}%`,
                        fontSize: `${Math.random() * 20 + 20}px`,
                        opacity: 0.7,
                        transform: `rotate(${Math.random() * 360}deg)`,
                    }}
                >
                    {item.emoji}
                </Typography>
            ))}
        </Box>
    );
});

export default EmojiBackground;
