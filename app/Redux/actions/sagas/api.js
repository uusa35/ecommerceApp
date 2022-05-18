import axios from 'axios';
import {apiUrl} from './../../../env';

export async function getTranslations() {
  return await axios
    .get(`${apiUrl}translations`)
    .then(r => r.data)
    .catch(e => console.log(e));
}

export async function getSettings() {
  return await axios
    .get(`${apiUrl}setting`)
    .then(r => r.data)
    .catch(e => console.log(e));
}

export async function getCurrencies() {
  return await axios
    .get(`${apiUrl}currency`)
    .then(r => r.data)
    .catch(e => console.log(e));
}

export async function getCountries() {
  return await axios
    .get(`${apiUrl}country`)
    .then(r => r.data)
    .catch(e => console.log(e));
}

export async function getCateogries() {
  return await axios
    .get(`${apiUrl}category`)
    .then(r => r.data)
    .catch(e => console.log(e));
}

export async function categories() {
  return await axios
    .get(`${apiUrl}category`)
    .then(r => r.data)
    .catch(e => console.log(e));
}

export async function getHomeSlides() {
  return await axios
    .get(`${apiUrl}slide`)
    .then(r => r.data)
    .catch(e => console.log(e));
}

export async function getProducts(data) {
  return await axios
    .get(`${apiUrl}search/product`, data)
    .then(r => r.data)
    .catch(e => console.log(e));
}

export async function getProduct(id) {
  return await axios
    .get(`${apiUrl}product/${id}`)
    .then(r => r.data)
    .catch(e => console.log(e));
}

export async function getUsers(params) {
  return await axios
    .get(`${apiUrl}search/user`, {params})
    .then(r => r.data)
    .catch(e => console.log(e));
}

export async function getUser(id) {
  return await axios
    .get(`${apiUrl}user/${id}`)
    .then(r => r.data)
    .catch(e => console.log(e));
}

export async function postLogin(data) {
  return await axios
    .post(`${apiUrl}login`, data)
    .then(r => r.data)
    .catch(e => e.response.data.message);
}
