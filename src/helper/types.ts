export type Product = {
  productID: String;
  name: String;
  cost: String;
  description: String;
  imageUrl: String;
  stock: number | null;
  email: string;
};

export type Customer = {
  email: String;
  name: String;
  profile_picture: String;
  banner_url: String;
};
