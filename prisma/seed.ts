import { PrismaClient } from "../app/generated/prisma";

const prisma = new PrismaClient();

const dummyUserId = "8cbf7da0-16e0-4e98-a309-10321460e553";

const productNames = [
  "Wireless Mouse",
  "Mechanical Keyboard",
  "USB-C Charger",
  "Bluetooth Speaker",
  "Noise Cancelling Headphones",
  "Laptop Stand",
  "Smartwatch",
  "HD Webcam",
  "LED Desk Lamp",
  "External SSD",
  "Gaming Chair",
  "Microphone",
  "HDMI Cable",
  "Wireless Earbuds",
  "Portable Power Bank",
  "Fitness Tracker",
  "USB Hub",
  "Monitor Arm",
  "Ergonomic Mouse Pad",
  "Graphic Tablet",
  "Smart Plug",
  "Mini Projector",
  "Wi-Fi Router",
  "Tripod Stand",
  "Streaming Light"
];

async function seedProducts() {
  await prisma.product.createMany({
    data: productNames.map((name, i) => ({
      userId: dummyUserId,
      name,
      price: parseFloat((Math.random() * 90 + 10).toFixed(2)),
      quantity: Math.floor(Math.random() * 20),
      lowStockAt: 5,
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * (i * 5)),
    }))
  });
  console.log("✅ 25 products inserted successfully!");
}

seedProducts()
  .catch((err) => console.error(err))
  .finally(() => prisma.$disconnect());