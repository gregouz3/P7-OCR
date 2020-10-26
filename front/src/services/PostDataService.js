import http from "../../http-common";

class PostDataService {
  getAll() {
    return http.get("/posts");
  }

  get(id) {
    return http.get(`/posts/${id}`);
  }

  getComments(id) {
    return http.get(`/posts/${id}/comments/${id}`);
  }

  getAllc(id) {
    return http.get(`/posts/${id}/comments`);
  }


  create(data) {
    return http.post("/posts", data);
  }
  createComment(id, data) {
    return http.post(`/posts/${id}/comments`, data);
  }
  
  update(id, data) {
    return http.put(`/posts/${id}`, data);
  }
  
  updateC(id, data) {
    return http.put(`/posts/${id}/comments/${id}`, data);
  }

  delete(id) {
    return http.delete(`/posts/${id}`);
  }

  deleteC(id) {
    return http.delete(`/posts/${id}/comments/${id}`);
  }
  

  deleteAll() {
    return http.delete(`/posts`);
  }

findByTitle(title) {
  return http.get(`/posts?title=${title}`);
}
}
export default new PostDataService();