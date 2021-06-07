import axios from 'axios';

const getData = (url) => {  
  axios.defaults.headers.get['Authorization'] = sessionStorage.getItem('authorization');
  return axios.get(`/api/${url}`);
}

const getDataById = (url, id) => {
  axios.defaults.headers.get['Authorization'] = sessionStorage.getItem('authorization');
  return axios.get(`/api/${url}/${id}`);
}

const postData = (url, record) => {
  axios.defaults.headers.post['Authorization'] = sessionStorage.getItem('authorization');
  return axios.post(`/api/${url}`, record);
}

const putData = (url, record) => {
  axios.defaults.headers.put['Authorization'] = sessionStorage.getItem('authorization');
  return axios.put(`/api/${url}/${record._id}`, record);
}

const daleteData = (url, id) => {
  axios.defaults.headers.delete['Authorization'] = sessionStorage.getItem('authorization');
  return axios.delete(`/api/${url}/${id}`);
}

export {
  getData,
  getDataById,
  postData,
  putData,
  daleteData
};
