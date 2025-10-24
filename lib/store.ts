import { create } from "zustand";

export type Role = "customer" | "admin";

export type Category = {
  id: string;
  name: string;
  slug: string;
  description: string;
  heroImage: string;
};

export type Product = {
  id: string;
  categoryId: string;
  name: string;
  description: string;
  highlights: string[];
  notes: string[];
  price: number;
  stock: number;
  rating: number;
  reviews: number;
  tags: string[];
  bestseller?: boolean;
  newArrival?: boolean;
  image: string;
};

export type Order = {
  id: string;
  code: string;
  userId: string;
  status: "processing" | "preparing" | "shipped" | "delivered";
  total: number;
  date: string;
  eta: string;
  items: Array<{ productId: string; name: string; quantity: number; price: number }>;
  trackingNumber: string;
};

export type Notification = {
  id: string;
  message: string;
  date: string;
  type: "info" | "success" | "warning";
};

export type User = {
  id: string;
  role: Role;
  name: string;
  email: string;
  password: string;
  avatar: string;
  phone: string;
  address: string;
  loyaltyTier: "Esencia" | "Prestige" | "Iconique";
  fragranceFamily: string;
  skincareFocus: string;
  wishlist: string[];
  notifications: Notification[];
};

function createId(prefix: string) {
  return `${prefix}_${Math.random().toString(36).slice(2, 10)}`;
}

const initialCategories: Category[] = [
  {
    id: "cat_perfumes",
    name: "Perfumería de Autor",
    slug: "perfumes",
    description:
      "Fragancias exclusivas creadas por perfumistas internacionales para un sello inolvidable.",
    heroImage:
      "https://images.unsplash.com/photo-1515468381879-40d0ded8106b?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "cat_skincare",
    name: "Tratamiento Facial",
    slug: "skincare",
    description: "Rutinas clínicas con activos de última generación certificados en Europa.",
    heroImage:
      "https://images.unsplash.com/photo-1509017174183-0b7e0278f1ec?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "cat_makeup",
    name: "Maquillaje Pro",
    slug: "makeup",
    description: "Pigmentos de alta definición para looks impecables en cámara y pasarela.",
    heroImage:
      "https://images.unsplash.com/photo-1512495969015-9f9f0f16d7b4?auto=format&fit=crop&w=1200&q=80",
  },
];

const initialProducts: Product[] = [
  {
    id: "prd_lumina",
    categoryId: "cat_perfumes",
    name: "Lumina Absolue Eau de Parfum",
    description:
      "Una sinfonía floral-ámbar con rosa de damasco, vainilla bourbon y almizcle cristalino.",
    highlights: [
      "72 horas de fijación clínica",
      "Alcohol orgánico destilado en la Provenza",
      "Envase recargable en boutique",
    ],
    notes: ["Salida: Bergamota siciliana", "Corazón: Jazmín Sambac", "Fondo: Sándalo blanco"],
    price: 189,
    stock: 45,
    rating: 4.9,
    reviews: 328,
    tags: ["iconique", "unisex", "nocturna"],
    bestseller: true,
    image:
      "https://images.unsplash.com/photo-1612810806695-30ba70590c33?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "prd_celestia",
    categoryId: "cat_perfumes",
    name: "Celestia Brume Parfum",
    description: "Acorde celestial de pera helada, lirio del valle y madera de cachemira.",
    highlights: ["Cruelty free", "Edición limitada", "Atomizador nebulizante"],
    notes: ["Salida: Pera nashi", "Corazón: Lirio del valle", "Fondo: Cachemira y almizcle"],
    price: 210,
    stock: 20,
    rating: 4.7,
    reviews: 198,
    tags: ["edicion limitada", "diurna"],
    newArrival: true,
    image:
      "https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "prd_serum",
    categoryId: "cat_skincare",
    name: "Serum Clínico Revive C+",
    description:
      "Concentrado antioxidante con 20% de vitamina C estabilizada y péptidos reparadores.",
    highlights: ["Dermatológicamente probado", "Resultados visibles en 7 días", "Testado en pieles sensibles"],
    notes: ["Aplicar de día", "Compatible con retinol", "Incluye protocolo profesional"],
    price: 139,
    stock: 80,
    rating: 4.8,
    reviews: 412,
    tags: ["vitamina c", "antioxidante"],
    bestseller: true,
    image:
      "https://images.unsplash.com/photo-1586985289688-ca3cf47d3e96?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "prd_cushion",
    categoryId: "cat_makeup",
    name: "Cushion HD Velvet",
    description:
      "Base en cushion con cobertura construible y acabado de aerógrafo para sesiones profesionales.",
    highlights: ["SPF 35", "Tecnología second-skin", "Hialurónico encapsulado"],
    notes: ["Disponible en 16 tonos", "Repuesto incluido", "No obstruye poros"],
    price: 72,
    stock: 120,
    rating: 4.6,
    reviews: 156,
    tags: ["studio", "larga duracion"],
    image:
      "https://images.unsplash.com/photo-1526045612212-70caf35c14df?auto=format&fit=crop&w=800&q=80",
  },
];

const initialNotifications: Notification[] = [
  {
    id: "noti_welcome",
    message: "Bienvenida al universo Tu-Line Prestige. Tu diagnóstico de fragancias está listo.",
    date: "2024-09-01",
    type: "info",
  },
  {
    id: "noti_event",
    message: "Acceso prioritario al showroom privado de París el 12 de octubre.",
    date: "2024-09-18",
    type: "success",
  },
];

const initialUsers: User[] = [
  {
    id: "user_admin",
    role: "admin",
    name: "Isabella Curie",
    email: "admin@tu-line.com",
    password: "admin123",
    avatar: "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=256&q=80",
    phone: "+34 600 123 456",
    address: "Avenida de la Alta Perfumería 45, Madrid",
    loyaltyTier: "Iconique",
    fragranceFamily: "Ámbar especiado",
    skincareFocus: "Glow clínico",
    wishlist: ["prd_celestia"],
    notifications: initialNotifications,
  },
  {
    id: "user_clienta",
    role: "customer",
    name: "Elena Duarte",
    email: "elena@tu-line.com",
    password: "clienta",
    avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=256&q=80",
    phone: "+34 620 556 789",
    address: "Paseo de Gracia 101, Barcelona",
    loyaltyTier: "Prestige",
    fragranceFamily: "Floral moderno",
    skincareFocus: "Redensificación",
    wishlist: ["prd_lumina", "prd_serum"],
    notifications: [initialNotifications[0]],
  },
];

const initialOrders: Order[] = [
  {
    id: "order_001",
    code: "TL-84231",
    userId: "user_clienta",
    status: "shipped",
    total: 328,
    date: "2024-08-26",
    eta: "Entrega estimada 02/09",
    trackingNumber: "TLX-99231-ES",
    items: [
      { productId: "prd_lumina", name: "Lumina Absolue Eau de Parfum", quantity: 1, price: 189 },
      { productId: "prd_serum", name: "Serum Clínico Revive C+", quantity: 1, price: 139 },
    ],
  },
];

type AuthError = { success: false; message: string };
type AuthSuccess = { success: true };

type AuthResult = AuthError | AuthSuccess;

type StoreState = {
  currentUserId?: string;
  users: User[];
  categories: Category[];
  products: Product[];
  orders: Order[];
  announcements: string[];
  login: (email: string, password: string) => AuthResult;
  logout: () => void;
  register: (payload: Omit<User, "id" | "role" | "wishlist" | "notifications" | "loyaltyTier"> & { password: string }) => AuthResult;
  updateProfile: (updates: Partial<Omit<User, "id" | "email" | "role">>) => void;
  toggleWishlist: (productId: string) => void;
  addCategory: (payload: Omit<Category, "id">) => void;
  updateCategory: (id: string, updates: Partial<Omit<Category, "id">>) => void;
  deleteCategory: (id: string) => void;
  addProduct: (payload: Omit<Product, "id">) => void;
  updateProduct: (id: string, updates: Partial<Omit<Product, "id">>) => void;
  deleteProduct: (id: string) => void;
};

export const useTuLineStore = create<StoreState>((set, get) => ({
  currentUserId: "user_clienta",
  users: initialUsers,
  categories: initialCategories,
  products: initialProducts,
  orders: initialOrders,
  announcements: [
    "Entrega express 24h en península para clientes Prestige e Iconique.",
    "Nuevas cabinas diagnósticas Tu-Line Skin Lab en Madrid y Barcelona.",
    "Programa de fidelidad: triplica tus puntos en lanzamientos edición limitada.",
  ],
  login: (email, password) => {
    const user = get().users.find((u) => u.email === email && u.password === password);
    if (!user) {
      return { success: false, message: "Credenciales incorrectas" };
    }
    set({ currentUserId: user.id });
    return { success: true };
  },
  logout: () => set({ currentUserId: undefined }),
  register: (payload) => {
    const { users } = get();
    if (users.some((u) => u.email === payload.email)) {
      return { success: false, message: "Ya existe una cuenta con este email" };
    }
    const newUser: User = {
      id: createId("user"),
      role: "customer",
      name: payload.name,
      email: payload.email,
      password: payload.password,
      avatar:
        payload.avatar ||
        "https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&w=256&q=80",
      phone: payload.phone,
      address: payload.address,
      loyaltyTier: "Esencia",
      fragranceFamily: "Aroma por definir",
      skincareFocus: "Objetivo personalizado",
      wishlist: [],
      notifications: [
        {
          id: createId("noti"),
          message: "Bienvenida a Tu-Line. Descubre tu diagnóstico personalizado en el panel.",
          date: new Date().toISOString().split("T")[0],
          type: "info",
        },
      ],
    };
    set({ users: [...users, newUser], currentUserId: newUser.id });
    return { success: true };
  },
  updateProfile: (updates) => {
    const { currentUserId, users } = get();
    if (!currentUserId) return;
    const updated = users.map((user) =>
      user.id === currentUserId ? { ...user, ...updates } : user
    );
    set({ users: updated });
  },
  toggleWishlist: (productId) => {
    const { currentUserId, users } = get();
    if (!currentUserId) return;
    const updated = users.map((user) => {
      if (user.id !== currentUserId) return user;
      const exists = user.wishlist.includes(productId);
      return {
        ...user,
        wishlist: exists
          ? user.wishlist.filter((id) => id !== productId)
          : [...user.wishlist, productId],
      };
    });
    set({ users: updated });
  },
  addCategory: (payload) => {
    const { categories } = get();
    const newCategory: Category = { id: createId("cat"), ...payload };
    set({ categories: [...categories, newCategory] });
  },
  updateCategory: (id, updates) => {
    const { categories } = get();
    set({
      categories: categories.map((category) =>
        category.id === id ? { ...category, ...updates } : category
      ),
    });
  },
  deleteCategory: (id) => {
    const { categories, products } = get();
    set({
      categories: categories.filter((category) => category.id !== id),
      products: products.filter((product) => product.categoryId !== id),
    });
  },
  addProduct: (payload) => {
    const { products } = get();
    const newProduct: Product = { id: createId("prd"), ...payload };
    set({ products: [...products, newProduct] });
  },
  updateProduct: (id, updates) => {
    const { products } = get();
    set({
      products: products.map((product) =>
        product.id === id ? { ...product, ...updates } : product
      ),
    });
  },
  deleteProduct: (id) => {
    const { products } = get();
    set({ products: products.filter((product) => product.id !== id) });
  },
}));

export const selectors = {
  currentUser: (state: StoreState) =>
    state.users.find((user) => user.id === state.currentUserId),
  isAdmin: (state: StoreState) => {
    const user = state.users.find((u) => u.id === state.currentUserId);
    return user?.role === "admin";
  },
  productsByCategory: (categoryId: string) => (state: StoreState) =>
    state.products.filter((product) => product.categoryId === categoryId),
  ordersForCurrentUser: (state: StoreState) =>
    state.orders.filter((order) => order.userId === state.currentUserId),
};

