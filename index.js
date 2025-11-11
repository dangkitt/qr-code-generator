// import các thư viện của NPM
import inquirer from "inquirer";
import qr from "qr-image";
import fs from "fs";

inquirer
  .prompt([
    {
      message: "Nhập URL bạn muốn tạo QR code:",
      name: "URL",  // URL là biến lưu giá trị câu trả lời của người nhập
    },
  ])
  .then((answers) => { // answers là object chứa câu trả lời
    const url = answers.URL; //Lấy giá trị người dùng nhập và gán vào biến url để dùng tiếp.

    // Tạo ảnh QR. qr.image() tạo một Readable stream chứa dữ liệu ảnh QR cho chuỗi url
    const qr_png = qr.image(url);  // qr_png là một stream dữ liệu ảnh (PNG/SVG tùy package default/option).

    qr_png.pipe(fs.createWriteStream("qr_img.png")); // ghi liên tục dữ liệu QR vào file qr_img.png

    // Ghi URL vào file txt
    fs.writeFile("URL.txt", url, (err) => {
      if (err) throw err;
      console.log("Đã tạo QR code và lưu URL vào file!");
    })
})
.catch((error) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else went wrong
    }
});
