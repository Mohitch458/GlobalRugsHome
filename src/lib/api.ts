const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://globalrugshome.onrender.com';

async function request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const token = localStorage.getItem('auth_token');

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
    credentials: 'include',
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Something went wrong');
  }

  return data;
}

// ── Auth ─────────────────────────────────────────────────────────────────────

export async function apiRegister(name: string, email: string, password: string) {
  const data = await request<{ token: string; user: { id: string; name: string; email: string; role: string } }>(
    '/api/auth/register',
    { method: 'POST', body: JSON.stringify({ name, email, password }) }
  );
  localStorage.setItem('auth_token', data.token);
  return data;
}

export async function apiLogin(email: string, password: string) {
  const data = await request<{ token: string; user: { id: string; name: string; email: string; role: string } }>(
    '/api/auth/login',
    { method: 'POST', body: JSON.stringify({ email, password }) }
  );
  localStorage.setItem('auth_token', data.token);
  return data;
}

export function apiLogout() {
  localStorage.removeItem('auth_token');
}

export async function apiGetMe() {
  return request<{ id: string; name: string; email: string; role: string }>('/api/auth/me');
}
