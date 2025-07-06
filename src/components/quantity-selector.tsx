'use client';

import { Minus, Plus } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { cn } from '@/lib/utils';

interface QuantitySelectorProps {
  quantity: number;
  onQuantityChange: (quantity: number) => void;
  max?: number;
  className?: string;
}

export default function QuantitySelector({ quantity, onQuantityChange, max = 100, className }: QuantitySelectorProps) {
  const increment = () => {
    if (quantity < max) {
      onQuantityChange(quantity + 1);
    }
  };

  const decrement = () => {
    if (quantity > 0) { // Allows removing by setting to 0, cart logic will filter it out
      onQuantityChange(quantity - 1);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value)) {
      onQuantityChange(Math.max(0, Math.min(value, max)));
    }
  };

  return (
    <div className={cn("flex items-center", className)}>
      <Button variant="outline" size="icon" className="h-8 w-8" onClick={decrement} aria-label="Decrease quantity">
        <Minus className="h-4 w-4" />
      </Button>
      <Input 
        type="number"
        className="h-8 w-12 text-center mx-1 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        value={quantity}
        onChange={handleInputChange}
        aria-label="Current quantity"
        min={0}
        max={max}
      />
      <Button variant="outline" size="icon" className="h-8 w-8" onClick={increment} disabled={quantity >= max} aria-label="Increase quantity">
        <Plus className="h-4 w-4" />
      </Button>
    </div>
  );
}
