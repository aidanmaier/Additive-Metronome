import React from 'react';
import { OutlinedInput, FormControl } from '@mui/material';
// import { Add, Remove } from '@mui/icons-material';

interface NumberFieldProps {
    value: number;
    onChange: (value: number) => void;
    min?: number;
    max?: number;
}

export default function NumberField({ value, onChange, min, max }: NumberFieldProps) {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const parsed = parseInt(e.target.value, 10);
        if (Number.isNaN(parsed)) return;
        let v = parsed;
        if (typeof min === 'number') v = Math.max(min, v);
        if (typeof max === 'number') v = Math.min(max, v);
        onChange(v);
    };

    return (
        <FormControl variant="outlined" >
            <OutlinedInput
                type="number"
                aria-label="Tempo number field"
                value={value}
                onChange={handleChange}
                inputProps={{ min, max }}
                sx={{
                    alignContent: 'center',
                    width: 80,
                    height: 50,
                }}
            />
        </FormControl>
    );
}