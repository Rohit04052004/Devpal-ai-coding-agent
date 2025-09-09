import axios from 'axios';

const API_URL = 'http://localhost:8000';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface GenerateCodeRequest {
  user_prompt: string;
  recursion_limit?: number;
}

export interface GenerateCodeResponse {
  status: 'success' | 'error';
  result?: any;
  message?: string;
  generated_code?: string;
}

export const generateCode = async (request: GenerateCodeRequest): Promise<GenerateCodeResponse> => {
  try {
    const response = await api.post<GenerateCodeResponse>('/generate', request);
    return response.data;
  } catch (error) {
    console.error('Error generating code:', error);
    return {
      status: 'error',
      message: 'Failed to connect to the backend service',
    };
  }
};

export const checkApiStatus = async (): Promise<boolean> => {
  try {
    const response = await api.get('/');
    return response.status === 200;
  } catch (error) {
    console.error('API status check failed:', error);
    return false;
  }
};

export default {
  generateCode,
  checkApiStatus,
};