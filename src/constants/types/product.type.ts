export type Product = {
  id: string;
  created_at: string;
  category: string;
  name: string;
  price_identifiable: boolean;
  price: number;
  profit_identifiable: boolean;
  profit: number;
  created_by: string;
  categories: Category;
};

export type Category = {
  name: string;
  created_at: string;
  created_by: string;
  id: string;
  is_active: boolean;
};
