class Api {
  constructor() {
    // Sửa thành constructor
    this.url = "https://671bfad62c842d92c381e9ea.mockapi.io/Products";
  }

  getListPhone() {
    return axios.get(this.url);
  }

  addPhone(phone) {
    return axios.post(this.url, phone); // Thêm biến phone vào post
  }

  updatePhone(phone) {
    return axios.put(`${this.url}/${phone.id}`, phone);
  }

  deletePhone(id) {
    return axios.delete(`${this.url}/${id}`);
  }

  getPhoneById(id) {
    return axios.get(`${this.url}/${id}`);
  }
}

export default Api;
