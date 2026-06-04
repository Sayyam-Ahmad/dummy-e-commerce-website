const products = [
  // Men's Clothing
  {
    id: 1,
    name: "Classic Oxford Shirt",
    category: "mens",
    price: 59.99,
    originalPrice: 79.99,
    badge: "Sale",
    image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&h=750&fit=crop",
    description: "Crisp cotton Oxford shirt with a relaxed fit. Perfect for office or weekend.",
    sizes: ["S", "M", "L", "XL"],
    colors: ["White", "Light Blue", "Pink"]
  },
  {
    id: 2,
    name: "Slim Fit Chinos",
    category: "mens",
    price: 69.99,
    badge: "New",
    image: "https://images.unsplash.com/photo-1473966968600-fa801b869a51?w=600&h=750&fit=crop",
    description: "Stretch cotton chinos with a modern slim silhouette.",
    sizes: ["28", "30", "32", "34", "36"],
    colors: ["Khaki", "Navy", "Olive"]
  },
  {
    id: 3,
    name: "Leather Biker Jacket",
    category: "mens",
    price: 249.99,
    originalPrice: 299.99,
    badge: "Sale",
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&h=750&fit=crop",
    description: "Genuine leather jacket with asymmetric zip and quilted shoulders.",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Black", "Brown"]
  },
  {
    id: 4,
    name: "Cotton Polo Shirt",
    category: "mens",
    price: 44.99,
    image: "https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?w=600&h=750&fit=crop",
    description: "Soft piqué cotton polo with ribbed collar and cuffs.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Navy", "White", "Forest Green"]
  },
  {
    id: 5,
    name: "Wool Blend Blazer",
    category: "mens",
    price: 189.99,
    badge: "Bestseller",
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&h=750&fit=crop",
    description: "Tailored wool-blend blazer for smart casual occasions.",
    sizes: ["38", "40", "42", "44", "46"],
    colors: ["Charcoal", "Navy"]
  },
  {
    id: 6,
    name: "Dark Wash Denim Jeans",
    category: "mens",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=600&h=750&fit=crop",
    description: "Classic straight-leg jeans in premium selvedge denim.",
    sizes: ["28", "30", "32", "34", "36"],
    colors: ["Indigo", "Black"]
  },
  {
    id: 7,
    name: "Henley Long Sleeve Tee",
    category: "mens",
    price: 34.99,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=750&fit=crop",
    description: "Soft jersey henley with three-button placket.",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Heather Grey", "Black", "Burgundy"]
  },
  {
    id: 8,
    name: "Linen Cargo Shorts",
    category: "mens",
    price: 54.99,
    badge: "New",
    image: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=600&h=750&fit=crop",
    description: "Breathable linen shorts with utility pockets for summer.",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Sand", "Olive", "Stone"]
  },

  // Women's Clothing
  {
    id: 9,
    name: "Floral Maxi Dress",
    category: "womens",
    price: 79.99,
    badge: "Bestseller",
    image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=600&h=750&fit=crop",
    description: "Flowing maxi dress with delicate floral print and smocked bodice.",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Floral Print", "Navy Floral"]
  },
  {
    id: 10,
    name: "High-Waist Skinny Jeans",
    category: "womens",
    price: 74.99,
    image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=600&h=750&fit=crop",
    description: "Stretch denim with a flattering high-rise waist and skinny leg.",
    sizes: ["24", "26", "28", "30", "32"],
    colors: ["Medium Wash", "Black", "Light Wash"]
  },
  {
    id: 11,
    name: "Silk Button-Down Blouse",
    category: "womens",
    price: 89.99,
    originalPrice: 110.00,
    badge: "Sale",
    image: "https://images.unsplash.com/photo-1564257631407-4deb1f99d992?w=600&h=750&fit=crop",
    description: "Luxurious silk blouse with hidden button placket.",
    sizes: ["XS", "S", "M", "L"],
    colors: ["Ivory", "Blush", "Black"]
  },
  {
    id: 12,
    name: "Oversized Knit Cardigan",
    category: "womens",
    price: 64.99,
    badge: "New",
    image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=600&h=750&fit=crop",
    description: "Cozy oversized cardigan in soft merino wool blend.",
    sizes: ["S/M", "L/XL"],
    colors: ["Camel", "Grey", "Cream"]
  },
  {
    id: 13,
    name: "Pleated Midi Skirt",
    category: "womens",
    price: 59.99,
    image: "https://images.unsplash.com/photo-1583496665940-2d4000b577f0?w=600&h=750&fit=crop",
    description: "Elegant pleated midi skirt with elastic waistband.",
    sizes: ["XS", "S", "M", "L"],
    colors: ["Black", "Burgundy", "Emerald"]
  },
  {
    id: 14,
    name: "Wrap Front Midi Dress",
    category: "womens",
    price: 94.99,
    badge: "Bestseller",
    image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=600&h=750&fit=crop",
    description: "Flattering wrap dress with tie waist and flutter sleeves.",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Red", "Navy", "Emerald"]
  },
  {
    id: 15,
    name: "Wide-Leg Linen Trousers",
    category: "womens",
    price: 69.99,
    image: "https://images.unsplash.com/photo-1594633312681-425a7b956cc9?w=600&h=750&fit=crop",
    description: "Relaxed wide-leg trousers in breathable linen blend.",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["White", "Beige", "Black"]
  },
  {
    id: 16,
    name: "Cropped Tailored Blazer",
    category: "womens",
    price: 129.99,
    originalPrice: 159.99,
    badge: "Sale",
    image: "https://images.unsplash.com/photo-1591369822096-ffd140ec948f?w=600&h=750&fit=crop",
    description: "Structured cropped blazer with single-button closure.",
    sizes: ["XS", "S", "M", "L"],
    colors: ["Black", "White", "Check"]
  }
];
