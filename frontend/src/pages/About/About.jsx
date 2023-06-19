import React, { useEffect } from "react";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import "./About.scss";
import anh1 from "./img/anh1.png";
import anh2 from "./img/anh2.png";
import anh3 from "./img/anh3.png";

const About = () => {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <Navbar />
      <div className="about-container">
        <div className="about-left"></div>
        <div className="about-content">
          <div className="about-title">
            <h2>Giới thiệu</h2>
          </div>

          <div className="about-logo">
            <div className="about-logo-color">
              <p>MAFLINE</p>
            </div>

            <div className="about-logo-anh1">
              <img src={anh1} alt="" />
            </div>

            <div className="about-logo-anh2">
              <img src={anh2} alt="" />
            </div>

            <div className="about-logo-anh3">
              <img src={anh3} alt="" />
            </div>
            <div className="about-logo-anh4">
              <img src={anh3} alt="" />
            </div>
          </div>

          <div className="about-text">
            <p>
              <b>
                &emsp;<span className='text-application'>MAF</span><span className="text-application2">LINE</span> là local brand được thành lập và xuất hiện lần đầu tiên
                vào đầu tháng 09-2022.
              </b>
            </p>
            <i>

              <p>
                &emsp;&emsp;Với nổ lực không ngừng <b><span className='text-application1'>MAF</span><span className="text-application2">LINE</span></b> đã mang đến một góc nhìn khác hơn
                về giá thành của thương hiệu <b>VIỆT</b> Bước ngoặc lớn nhất vào tháng
                05-2021 <b><span className='text-application1'>MAF</span><span className="text-application2">LINE</span></b> tự hào là local đầu tiên đưa sản phẩm về mức giá <b>#SALE 99K</b> nhưng vẫn đảm bảo tuyệt đối chất lượng đầu ra của thương
                hiệu với tiêu chí : <b>“ rẻ - đẹp - chất lượng “</b>
              </p>

              <p>
                &emsp;&emsp;Và hứa hẹn trong tương lai chúng ta sẽ cùng bùng nổ hơn nữa chứ
                không phải chỉ riêng khoảnh khắc này.
              </p>

              <p>
                &emsp;&emsp;Hãy cùng nhau đón chờ những sản phẩm mới nhất từ <b><span className='text-application1'>MAF</span><span className="text-application2">LINE</span></b> nhé. <b>Cảm
                  ơn các bạn rất nhiều!</b>
              </p>
            </i>
          </div>
        </div>
        <div className="about-right"></div>
      </div>
      <Footer />
    </div>
  );
};

export default About;
