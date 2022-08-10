import axios, { AxiosInstance, AxiosRequestConfig, AxiosRequestHeaders } from 'axios';
import { AUTH_KEY } from '../constants/Environment';

const axiosInstance = axios.create();

const onRequest = (config: AxiosRequestConfig): AxiosRequestConfig => {
  const setHeaderToken = async () => {
    const tokenUsuario = AUTH_KEY;
    const encodedToken = window.btoa(tokenUsuario);
    if (tokenUsuario) {
      const configAxiosRequest = config;
      configAxiosRequest.headers = {
        Authorization: `Basic ${encodedToken}`,
        'Content-Type': 'application/json-patch+json',
      } as AxiosRequestHeaders;
    }
  };
  setHeaderToken();
  return config;
};

const setupInterceptorsTo = (axiosInstanceParams: AxiosInstance): AxiosInstance => {
  axiosInstanceParams.interceptors.request.use(onRequest);

  return axiosInstanceParams;
};

export default setupInterceptorsTo(axiosInstance);
