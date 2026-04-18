export type ApiKey = {
  id: string;
  name: string;
  user_id: string;
  key_prefix: string;
  valid_from: string;
  valid_to: null;
  revoked_at: null;
  created_at: string;
  last_used_at: string;
  usage_count: number;
  rate_limit_per_minute: number;
  metadata: null;
};
