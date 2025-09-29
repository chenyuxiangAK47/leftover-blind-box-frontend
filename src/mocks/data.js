// src/mocks/data.js
export const mockMerchants = [
  { id: 1, name: "Sweet Candy Shop", bio: "Best candy in town" },
  { id: 2, name: "Choco Factory", bio: "Handmade chocolate" },
  { id: 3, name: "Fruit Snacks", bio: "Healthy & tasty snacks" },
]

export const mockProducts = [
  // merchant 1
  { id: 101, title: "Candy 1", price: 4.99, description: "Yummy candy.", merchant: mockMerchants[0] },
  { id: 102, title: "Candy 2", price: 4.99, description: "Yummy candy.", merchant: mockMerchants[0] },
  { id: 103, title: "Candy 3", price: 4.99, description: "Yummy candy.", merchant: mockMerchants[0] },
  // merchant 2
  { id: 201, title: "Choco 1", price: 6.99, description: "Dark chocolate bar.", merchant: mockMerchants[1] },
  { id: 202, title: "Choco 2", price: 7.49, description: "Milk chocolate bar.", merchant: mockMerchants[1] },
  // merchant 3
  { id: 301, title: "Fruit Snack 1", price: 5.99, description: "Dried mango.", merchant: mockMerchants[2] },
  { id: 302, title: "Fruit Snack 2", price: 5.49, description: "Dried strawberry.", merchant: mockMerchants[2] },
]
