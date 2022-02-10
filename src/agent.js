import _axios from "axios";
import progressfy from "axios-progressfy";
import toFormData from "utils/toFormData";

const axios = progressfy(
  _axios.create({withCredentials: true}
));

axios.interceptors.response.use(
  (response)=> response.data,
  (error)=> {
    if(!(error.response)) return;
    throw error.response.data
  }
);

const API_ROOT = `${process.env.SERVER_URL}/api`;

console.log(API_ROOT);

const requests = {
  del: (url)=>
    axios.delete(`${API_ROOT}${url}`),

  get: (url, config)=> 
    axios.get(`${API_ROOT}${url}`, config),

  postJSON: (url, body, config)=> 
    axios.post(`${API_ROOT}${url}`, body, 
    {...config, headers: {"Content-Type": "application/json"}}),

  postFormData: (url, body, config)=> 
    axios.post(`${API_ROOT}${url}`, toFormData(body), 
    {...config, headers: {"Content-Type": "multipart/form-data"}}),

  postUrlencoded: (url, body, config)=>
    axios.post(`${API_ROOT}${url}`, body, 
    {...config, headers: {"Content-Type": "application/x-www-form-urlencoded"}}),

  put: (url, body)=>
    axios.put(`${API_ROOT}${url}`, body)
};

const Posts = {
  all: ()=>
    requests.get("/posts/"),

  get: (skip)=> 
    requests.get(`/posts?skip=${skip}&limit=20`),

  publics: (skip)=>
    requests.get(`/posts/publics?skip=${skip}&limit=10`),

  getById: (postId)=>
    requests.get(`/posts/${postId}`),

  add: (post)=> 
    requests.postFormData("/posts/add", post),

  delete: (post)=>
    requests.postJSON("/posts/delete", post),

  example: (data)=> 
    requests.postFormData("/posts/example", data)
};

const Auth = {
  current: (config)=>
    requests.get("/users/user", config),

  signIn: ({ email, password })=> 
    requests.postJSON("/users/login", {email, password}),

  signUp: ({ username, email, password })=>
    requests.postJSON("/users/create", {username, email, password})
};

const User = {
  profile: ()=>
    requests.get("/users/profile")
}

export default {
  Posts,
  Auth,
  User
};