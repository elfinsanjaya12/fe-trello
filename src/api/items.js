import axios from 'axios';
import { config } from '../config';

export function getOneItem(id) {
  return axios.get(`${config.api_host}/api/v1/items/${id}`);
}

export function deleteItem(id) {
  return axios.delete(`${config.api_host}/api/v1/items/${id}`);
}

export function createItem(data) {
  return axios.post(`${config.api_host}/api/v1/items`, data);
}

export function updateItem(id, data) {
  return axios.put(`${config.api_host}/api/v1/items/${id}`, data);
}
export function moveItem(id, data) {
  return axios.put(`${config.api_host}/api/v1/items/${id}/move`, data);
}
