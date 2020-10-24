import http from "../../http-common";

class ComDataService {

  get(id) {
    return http.get(`/posts/${id}/comments/${id}`);
  }



  createComment(id, data) {
    return http.post(`/posts/${id}/comments`, data);
  }
  
  update(id, data) {
    return http.put(`/posts/${id}/comments/${id}`, data);
  }

  delete(id) {
    return http.delete(`/posts/${id}/comments/${id}`);
  }
  

  deleteAll() {
    return http.delete("/posts/comments");
  }

}
export default new ComDataService();