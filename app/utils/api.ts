// utils/api.ts
const API_URL = 'https://your-api.com/api';

export const fetchWithAuth = async (endpoint: string, options: RequestInit = {})  => {
  const token = localStorage.getItem('token');
  
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  // Handle 401 Unauthorized - token expired or invalid
  if (response.status === 401) {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
    throw new Error('Session expired. Please login again.');
  }

  return response;
};

export const get = (endpoint: string) => 
  fetchWithAuth(endpoint).then(res => res.json());

export const post = (endpoint: string, data: any) => 
  fetchWithAuth(endpoint, {
    method: 'POST',
    body: JSON.stringify(data),
  }).then(res => res.json());

export const put = (endpoint: string, data: any) => 
  fetchWithAuth(endpoint, {
    method: 'PUT',
    body: JSON.stringify(data),
  }).then(res => res.json());

export const del = (endpoint: string) => 
  fetchWithAuth(endpoint, {
    method: 'DELETE',
  }).then(res => res.json());
