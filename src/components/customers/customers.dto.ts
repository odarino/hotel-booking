export type CustomersCreateDto = {
  first_name: string;
  last_name: string;
  email: string;
  phone_number?: string;
  address?: string;
  city?: string;
  country?: string;
  post_code?: string;
};
