export interface IUser {
  access_token: string;
  token_type: string;
  refresh_token: string;
  expires_in: string;
  scope: string;
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  company_id: string;
  company_code: string;
  company_name: string;
  jti: string;
  password_reset_token?: string;
}
export interface QueryParams{
  limit: number;
  offset: number;
  name?: string;
  token: string
}