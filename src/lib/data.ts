import type { Vendor, Transaction, Product } from './types';

export const vendors: Vendor[] = [
  {
    id: '1',
    name: 'Bombay Chaatwala',
    description: 'Authentic Indian street food, bursting with flavor. A campus favorite for a spicy kick!',
    image: 'https://picsum.photos/600/400',
    dataAiHint: 'indian food',
    products: [
      { id: '101', name: 'Vegetable Samosa', price: 2.25, stock: 60, image: 'https://picsum.photos/400/300', dataAiHint: 'samosa' },
      { id: '102', name: 'Pani Puri', price: 5.00, stock: 40, image: 'https://picsum.photos/400/300', dataAiHint: 'pani puri' },
      { id: '103', name: 'Mango Lassi', price: 4.50, stock: 35, image: 'https://picsum.photos/400/300', dataAiHint: 'mango lassi' },
      { id: '104', name: 'Chai Tea', price: 2.50, stock: 50, image: 'https://picsum.photos/400/300', dataAiHint: 'chai tea' },
    ],
  },
  {
    id: '2',
    name: 'Lee Corner',
    description: 'Your campus convenience store for quick bites, drinks, and study essentials.',
    image: 'https://picsum.photos/600/400',
    dataAiHint: 'convenience store',
    products: [
      { id: '201', name: 'Energy Drink', price: 3.50, stock: 100, image: 'https://picsum.photos/400/300', dataAiHint: 'energy drink' },
      { id: '202', name: 'Protein Bar', price: 2.75, stock: 80, image: 'https://picsum.photos/400/300', dataAiHint: 'protein bar' },
      { id: '203', name: 'Bag of Chips', price: 1.50, stock: 120, image: 'https://picsum.photos/400/300', dataAiHint: 'potato chips' },
      { id: '204', name: 'Instant Noodles', price: 2.00, stock: 90, image: 'https://picsum.photos/400/300', dataAiHint: 'instant noodles' },
    ],
  },
  {
    id: '3',
    name: 'Samosa Spot',
    description: 'Authentic, flavorful samosas and Indian street food. A campus favorite!',
    image: 'https://picsum.photos/600/400',
    dataAiHint: 'indian restaurant',
    products: [
      { id: '301', name: 'Vegetable Samosa', price: 2.00, stock: 75, image: 'https://picsum.photos/400/300', dataAiHint: 'samosas' },
      { id: '302', name: 'Chicken Samosa', price: 2.50, stock: 50, image: 'https://picsum.photos/400/300', dataAiHint: 'chicken samosa' },
      { id: '303', name: 'Mango Lassi', price: 4.00, stock: 30, image: 'https://picsum.photos/400/300', dataAiHint: 'lassi drink' },
      { id: '304', name: 'Chai Tea', price: 2.50, stock: 45, image: 'https://picsum.photos/400/300', dataAiHint: 'masala chai' },
    ],
  },
  {
    id: '4',
    name: 'Fruit Shop',
    description: 'Fresh and juicy fruits, smoothies, and healthy juices.',
    image: 'https://picsum.photos/600/400',
    dataAiHint: 'fruit stand',
    products: [
      { id: '401', name: 'Banana', price: 0.50, stock: 150, image: 'https://picsum.photos/400/300', dataAiHint: 'banana' },
      { id: '402', name: 'Orange Juice', price: 3.50, stock: 50, image: 'https://picsum.photos/400/300', dataAiHint: 'orange juice' },
      { id: '403', name: 'Fruit Salad', price: 5.00, stock: 30, image: 'https://picsum.photos/400/300', dataAiHint: 'fruit salad' },
      { id: '404', name: 'Berry Smoothie', price: 6.00, stock: 25, image: 'https://picsum.photos/400/300', dataAiHint: 'berry smoothie' },
    ],
  },
];

export const transactions: Transaction[] = [
  {
    id: 't1',
    vendorName: 'Bombay Chaatwala',
    date: '2024-05-20',
    items: [
      { name: 'Pani Puri', quantity: 1, price: 5.00 },
      { name: 'Chai Tea', quantity: 1, price: 2.50 },
    ],
    total: 7.50,
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
    avatar: 'https://picsum.photos/100/100',
    dataAiHint: 'student portrait',
}
