import axios from 'axios';
import { config } from '../config';

export function getTodos() {
  return axios.get(`${config.api_host}/api/v1/todos`);
}
export function getOneTodo(id) {
  return axios.get(`${config.api_host}/api/v1/todos/${id}`);
}

export function deleteTodo(id) {
  return axios.delete(`${config.api_host}/api/v1/todos/${id}`);
}

export function createTodo(data) {
  return axios.post(`${config.api_host}/api/v1/todos`, data);
}
export function updateTodo(id, data) {
  return axios.put(`${config.api_host}/api/v1/todos/${id}`, data);
}
