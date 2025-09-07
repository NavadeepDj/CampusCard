import type { Vendor, Transaction, Product } from './types';

export const vendors: Vendor[] = [
  {
    id: '1',
    name: 'Bombay Chaatwala',
    description: 'Freshly brewed coffee, pastries, and sandwiches. The perfect spot to recharge between classes.',
    image: 'https://placehold.co/600x400.png',
    dataAiHint: 'coffee shop',
    products: [
      { id: '101', name: 'Espresso', price: 2.50, stock: 50, image: 'https://placehold.co/400x300.png', dataAiHint: 'espresso shot' },
      { id: '102', name: 'Croissant', price: 3.00, stock: 25, image: 'https://placehold.co/400x300.png', dataAiHint: 'croissant pastry' },
      { id: '103', name: 'Chicken Sandwich', price: 7.50, stock: 15, image: 'https://placehold.co/400x300.png', dataAiHint: 'chicken sandwich' },
      { id: '104', name: 'Iced Latte', price: 4.50, stock: 40, image: 'https://placehold.co/400x300.png', dataAiHint: 'iced coffee' },
    ],
  },
  {
    id: '2',
    name: 'Lee Corner',
    description: 'Quick bites, energy drinks, and healthy snacks to fuel your study sessions.',
    image: 'https://placehold.co/600x400.png',
    dataAiHint: 'snack aisle',
    products: [
      { id: '201', name: 'Energy Drink', price: 3.50, stock: 100, image: 'https://placehold.co/400x300.png', dataAiHint: 'energy drink' },
      { id: '202', name: 'Protein Bar', price: 2.75, stock: 80, image: 'https://placehold.co/400x300.png', dataAiHint: 'protein bar' },
      { id: '203', name: 'Bag of Chips', price: 1.50, stock: 120, image: 'https://placehold.co/400x300.png', dataAiHint: 'potato chips' },
      { id: '204', name: 'Apple', price: 1.00, stock: 60, image: 'https://placehold.co/400x300.png', dataAiHint: 'red apple' },
    ],
  },
  {
    id: '3',
    name: 'Samosa Spot',
    description: 'Authentic, flavorful samosas and Indian street food. A campus favorite!',
    image: 'https://placehold.co/600x400.png',
    dataAiHint: 'indian food',
    products: [
      { id: '301', name: 'Vegetable Samosa', price: 2.00, stock: 75, image: 'https://placehold.co/400x300.png', dataAiHint: 'samosa food' },
      { id: '302', name: 'Chicken Samosa', price: 2.50, stock: 50, image: 'https://placehold.co/400x300.png', dataAiHint: 'chicken samosa' },
      { id: '303', name: 'Mango Lassi', price: 4.00, stock: 30, image: 'https://placehold.co/400x300.png', dataAiHint: 'mango lassi' },
      { id: '304', name: 'Chai Tea', price: 2.50, stock: 45, image: 'https://placehold.co/400x300.png', dataAiHint: 'chai tea' },
    ],
  },
  {
    id: '4',
    name: 'Fruit Shop',
    description: 'Fresh and juicy fruits, smoothies, and healthy juices.',
    image: 'https://placehold.co/600x400.png',
    dataAiHint: 'fruit stand',
    products: [
      { id: '401', name: 'Banana', price: 0.50, stock: 150, image: 'https://placehold.co/400x300.png', dataAiHint: 'banana fruit' },
      { id: '402', name: 'Orange Juice', price: 3.50, stock: 50, image: 'https://placehold.co/400x300.png', dataAiHint: 'orange juice' },
      { id: '403', name: 'Fruit Salad', price: 5.00, stock: 30, image: 'https://placehold.co/400x300.png', dataAiHint: 'fruit salad' },
      { id: '404', name: 'Berry Smoothie', price: 6.00, stock: 25, image: 'https://placehold.co/400x300.png', dataAiHint: 'berry smoothie' },
    ],
  },
];

export const transactions: Transaction[] = [
  {
    id: 't1',
    vendorName: 'Bombay Chaatwala',
    date: '2024-05-20',
    items: [
      { name: 'Espresso', quantity: 1, price: 2.50 },
      { name: 'Croissant', quantity: 1, price: 3.00 },
    ],
    total: 5.50,
  },
  {
    id: 't2',
    vendorName: 'Samosa Spot',
    date: '2024-05-18',
    items: [
      { name: 'Vegetable Samosa', quantity: 2, price: 2.00 },
      { name: 'Mango Lassi', quantity: 1, price: 4.00 },
    ],
    total: 8.00,
  },
  {
    id: 't3',
    vendorName: 'Lee Corner',
    date: '2024-05-15',
    items: [
      { name: 'Energy Drink', quantity: 2, price: 3.50 },
      { name: 'Protein Bar', quantity: 1, price: 2.75 },
    ],
    total: 9.75,
  },
];

export const user = {
    name: 'Alex Doe',
    email: 'alex.doe@university.edu',
    avatar: 'https://placehold.co/100x100.png',
    dataAiHint: 'student portrait',
}
