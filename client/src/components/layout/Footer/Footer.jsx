import React from 'react'
import './Footer.css'
import Logo from '../../../assets/logo-hh-shop.png'


const Footer = () => {

    return (
        <React.Fragment>

            <footer className="site-footer">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12 col-md-6">
                            <img src={Logo} width="50" alt="" />
                            <p className="text-justify">
                                Đồ án công nghệ phần mềm của
                                Trường Đại học Yersin Đà Lạt do
                                <br />
                                Bùi Đoàn Quang Huy và
                                Phạm Văn Hoàng K17 (nhóm 6) thực hiện.</p>
                        </div>

                        <div className="col-xs-6 col-md-3">
                            <h6>Thể loại</h6>
                            <ul className="footer-links">
                                <li><span>iPhone</span></li>
                                <li><span >Macbook</span></li>
                                <li><span >iPad</span></li>
                                <li><span >AppleWatch</span></li>
                                <li><span >Orthers</span></li>
                            </ul>
                        </div>

                        <div className="col-xs-6 col-md-3">
                            <h6>Liên kết</h6>
                            <ul className="footer-links">
                                <li><span >Giới thiệu</span></li>
                                <li><span>Liên hệ</span></li>
                                <li><span >Đóng góp</span></li>
                                <li><span >Chính sách bảo mật</span></li>
                                <li><span >Địa chỉ</span></li>
                            </ul>
                        </div>
                    </div>
                    <hr />
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 col-sm-6 col-xs-12">
                            <p className="copyright-text">Copyright &copy;Nhóm 6 K17. Đồ án Công nghệ phần mềm
                            </p>
                        </div>

                        <div className="col-md-4 col-sm-6 col-xs-12">
                            <ul className="social-icons">
                                <li><a className="facebook" href="#!"><i className="fa fa-facebook"></i></a></li>
                                <li><a className="twitter" href="#!"><i className="fa fa-twitter"></i></a></li>
                                <li><a className="instagram" href="#!"><i className="fa fa-instagram"></i></a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </footer>

        </React.Fragment>
    );
}

export default Footer;