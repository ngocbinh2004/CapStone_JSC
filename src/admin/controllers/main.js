import Phone from "../model/Phone.js";
import Api from "../services/Api.js";
import Validation from "../model/Validation.js";

const api = new Api();
const validation = new Validation();

let listPhone = [];
let currentEditingId = null;

const getEleId = (id) => document.getElementById(id);

getEleId("addPhoneForm").onclick = () => {
  // Đặt giá trị của các trường input về rỗng
  getEleId("name").value = "";
  getEleId("price").value = "";
  getEleId("screen").value = "";
  getEleId("backCam").value = "";
  getEleId("frontCam").value = "";
  getEleId("img").value = "";
  getEleId("desc").value = "";
  getEleId("type").value = "";

  // Hiển thị nút Add và ẩn nút Update
  getEleId("btnAddPhone").style.display = "block";
  getEleId("btnUpdate").style.display = "none";

  // Đặt lại currentEditingId về null để biết rằng không đang chỉnh sửa
  currentEditingId = null;

  // Mở modal
  document.getElementById("exampleModal").classList.remove("hidden");
  document.getElementById("exampleModal").classList.add("flex");
};

/**
 * Hàm render danh sách điện thoại
 */
const renderPhone = (phoneList) => {
  let contentHTML = "";
  phoneList.forEach((phone) => {
    contentHTML += `
            <tr>
                <td>${phone.id}</td>
                <td>${phone.name}</td>
                <td>${phone.price}</td>
                <td><img src="${phone.img}" alt="Phone image" style="width:40px;height:auto;"></td>
                <td>${phone.desc}</td>
                <td>
                    <button class="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded" onclick="deletePhone('${phone.id}')">Delete</button>
                    <button class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded" onclick="editPhone('${phone.id}')">Edit</button>
                </td>
            </tr>
        `;
  });
  getEleId("tablePhone").innerHTML = contentHTML;
};

/**
 * Lấy danh sách điện thoại từ API và render ra giao diện
 */
const fetchPhoneList = () => {
  api
    .getListPhone()
    .then((res) => {
      listPhone = res.data;
      renderPhone(listPhone);
    })
    .catch((err) => console.log("Error fetching phones:", err));
};
fetchPhoneList();

/**
 * Lấy thông tin từ form
 */
const getInfoPhone = () => {
  const id = currentEditingId ? currentEditingId : listPhone.length + 1;
  const name = getEleId("name").value;
  const price = getEleId("price").value;
  const screen = getEleId("screen").value;
  const backCam = getEleId("backCam").value;
  const frontCam = getEleId("frontCam").value;
  const img = getEleId("img").value;
  const desc = getEleId("desc").value;
  const type = getEleId("type").value;

  return new Phone(id, name, price, screen, backCam, frontCam, img, desc, type);
};

/**
 * Thêm điện thoại mới
 */
getEleId("btnAddPhone").onclick = () => {
  const name = getEleId("name").value;
  const price = getEleId("price").value;
  const screen = getEleId("screen").value;
  const backCam = getEleId("backCam").value;
  const frontCam = getEleId("frontCam").value;
  const img = getEleId("img").value;
  const desc = getEleId("desc").value;
  const type = getEleId("type");

  // Validate the form fields
  const isValid =
    validation.isEmpty(name, "tbname", "Vui lòng điền tên sản phẩm") &&
    validation.isNumber(price, "tbprice", "Giá phải là số và lớn hơn 0") &&
    validation.isEmpty(screen, "tbscreen", "Vui lòng điền Sreen") &&
    validation.isEmpty(backCam, "tbbackCam", "Vui lòng điền BackCamera") &&
    validation.isEmpty(frontCam, "tbfrontCam", "Vui lòng điền FontCamera") &&
    validation.isEmpty(img, "tbimg", "Vui lòng điền link hình ảnh") &&
    validation.isEmpty(desc, "tbdesc", "Vui lòng nhập mô tả sản phẩm") &&
    validation.isOptionSelected(type, "tbtype", "Vui lòng chọn loại sản phẩm");

  if (!isValid) {
    return;
  }
  const phone = getInfoPhone();
  api
    .addPhone(phone)
    .then(() => {
      fetchPhoneList(); // Cập nhật danh sách sau khi thêm
      getEleId("btnClose").click(); // Đóng modal
    })
    .catch((err) => console.log("Error adding phone:", err));
};

/**
 * Sửa điện thoại
 */
const editPhone = (id) => {
  api
    .getPhoneById(id)
    .then((res) => {
      const phone = res.data;
      currentEditingId = phone.id;

      // Điền thông tin vào form
      getEleId("name").value = phone.name;
      getEleId("price").value = phone.price;
      getEleId("screen").value = phone.screen;
      getEleId("backCam").value = phone.backCam;
      getEleId("frontCam").value = phone.frontCam;
      getEleId("img").value = phone.img;
      getEleId("desc").value = phone.desc;
      getEleId("type").value = phone.type;

      // Hiển thị nút Update và ẩn nút Add
      getEleId("btnAddPhone").style.display = "none";
      getEleId("btnUpdate").style.display = "block";

      // Mở modal
      document.getElementById("exampleModal").classList.remove("hidden");
      document.getElementById("exampleModal").classList.add("flex");
    })
    .catch((err) => console.log("Error editing phone:", err));
};
window.editPhone = editPhone;

/**
 * Cập nhật điện thoại
 */
getEleId("btnUpdate").onclick = () => {
  const phone = getInfoPhone();
  api
    .updatePhone(phone)
    .then(() => {
      fetchPhoneList(); // Cập nhật danh sách sau khi cập nhật
      getEleId("btnClose").click(); // Đóng modal
    })
    .catch((err) => console.log("Error updating phone:", err));
};

/**
 * Xóa điện thoại
 */
const deletePhone = (id) => {
  api
    .deletePhone(id)
    .then(() => {
      fetchPhoneList(); // Cập nhật danh sách sau khi xóa
    })
    .catch((err) => console.log("Error deleting phone:", err));
};
window.deletePhone = deletePhone;

// Tìm kiếm theo tên
getEleId("searchPhone").addEventListener("input", function () {
  const searchTerm = this.value.toLowerCase();
  const filteredPhones = listPhone.filter((phone) =>
    phone.name.toLowerCase().includes(searchTerm)
  );
  renderPhone(filteredPhones);
});

document.addEventListener("DOMContentLoaded", function () {
  // Tìm kiếm theo tên điện thoại
  getEleId("searchPhone").addEventListener("input", function () {
    const searchTerm = this.value.toLowerCase();
    const filteredPhones = listPhone.filter((phone) =>
      phone.name.toLowerCase().includes(searchTerm)
    );
    renderPhone(filteredPhones);
  });

  // Sắp xếp giá tăng dần
  getEleId("sortPriceAsc").addEventListener("click", function () {
    listPhone.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
    renderPhone(listPhone);
  });

  // Sắp xếp giá giảm dần
  getEleId("sortPriceDesc").addEventListener("click", function () {
    listPhone.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
    renderPhone(listPhone);
  });
});
