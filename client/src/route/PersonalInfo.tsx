import React from "react";
import PersonalInfoStyle from "../static/css/PersonalInfo.module.css"
type PersonalProps = {
	children?: React.ReactNode;
};
export const PersonalInfo = ({ children }: PersonalProps) => {
	return (
		<div>
    <div className={PersonalInfoStyle.web_body}>
        <div style={{display: "flex",flexDirection: "column",}}>
            <div style={{position:"relative"}} className={PersonalInfoStyle.card} id="card-user-info">
                <div className={PersonalInfoStyle.card_background_container}>
{/*                    <img className={PersonalInfoStyle.card_background} src="./img/hust-back.png"></img>*/}
                </div>
                <div
                    style={{
						position: "absolute",
						top:"10vw", left:"2vw" ,
						borderRadius:"50%",
						border: "0.3vw solid white", width: "10vw",height: "10vw", overflow: "hidden",
					}}>
{/*                    <img style={{width:"100%"}} src="./img/avatar.jpeg"></img>*/}
                </div>
{/*                 <!-- <img  src="./img/hust.png"> -->*/}
                <div className={PersonalInfoStyle.card_body} style={{marginTop:"5vw"}}>
                    <ul>
                        <li>MS: 20215296</li>
                        <li>Họ tên: Nguyễn Đại An</li>
                        <li>Lớp: Khoa học máy tính 03-K66</li>
                        <li>Email: an.nd215296@sis.hust.edu.vn</li>
                        <li>Email cá nhân: nguyendaian1945@gmail.com</li>
                    </ul>
                </div>
            </div>
            <div className={PersonalInfoStyle.card} id="card-more-info">
                <div className={PersonalInfoStyle.navbar_list}>
                    <ul>
                        <li><a className={PersonalInfoStyle.active} >Trạng thái</a>
                        </li>
                        <li><a >Quản lý</a></li>
                    </ul>
                </div>
                <div className={PersonalInfoStyle.card_body}>
                    <div id="trangthai">
                        <div className={PersonalInfoStyle.text_block_body}>
                            <div>
                                <p>Trạng thái học tập: Học</p>
                                <p>
                                    CPA: 3.75
                                </p>
                                <p>
                                    Nợ: 0 TC
                                </p>
                                <p>Tích lũy: 73 TC</p>
                                <p>Mức cảnh cáo: M0</p>
                                <p>Trình độ: 3</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className={PersonalInfoStyle.card} id="card-management-info">
            <div className={PersonalInfoStyle.navbar_list}>
                <ul>
                    <li><a className={PersonalInfoStyle.active} >Lý lịch</a>
                    </li>
                    <li><a >Quyết định</a></li>
                    <li><a >Khen thưởng</a></li>
                    <li><a >Liên hệ</a></li>
                    <li><a >Nhận xét</a></li>
                    <li><a >Hoạt động tham gia</a></li>
                </ul>
            </div>
            <div className={PersonalInfoStyle.card_body}>
                <div id="cmi-lylich">
                    <div>
                        <div>
                            <h4>
                                Thông tin cá nhân
                            </h4>
                            <div className={PersonalInfoStyle.text_block_body}>
                                <div>
                                    <p>Ngày sinh: 31/01/2003</p>
                                    <p>Số CMTND: 0123</p>
                                    <p>Dân tộc: Kinh</p>
                                    <p>Ngày vào Đoàn:</p>
                                </div>
                                <div>
                                    <p>Nơi sinh: Hà Nam</p>
                                    <p>Nơi cấp: Hà Nam</p>
                                    <p>Tôn giáo: Không</p>
                                    <p>Ngày vào Đảng:</p>
                                </div>
                                <div>
                                    <p>Giới tính: Nam</p>
                                    <p>
                                        Ngày cấp:
                                    </p>
                                    <p>
                                        Chi đoàn:
                                    </p>
                                    <p>Đoàn viên</p>
                                </div>
                            </div>
                        </div>
                        <div className={PersonalInfoStyle.text_block_body}>
                            <div>
                                <p>
                                    Đối tượng chính sách:
                                </p>
                                <p>
                                    Số thẻ bảo hiểm: 123
                                </p>
                                <p>
                                    Địa chỉ thường trú: 1 Đại Cồ Việt
                                </p>
                                <p>
                                    Nơi ở hiện tại: 1 Đại Cồ Việt
                                </p>
                            </div>
                        </div>
                        <div>
                            <h4>
                                Thông tin gia đình
                            </h4>
                            <div>
                                <div>
                                    <div className={`${PersonalInfoStyle.text_block_body} ${PersonalInfoStyle.text_bold}` }>
                                        <p>
                                            Họ và tên bố: Nguyễn Đại An
                                        </p>
                                    </div>
                                    <div className={PersonalInfoStyle.text_block_body}>
                                        <div>
                                            <p>Dân tộc: Kinh</p>
                                            <p>
                                                Nơi làm việc:
                                            </p>
                                            <p>
                                                Địa chỉ thường trú:
                                            </p>
                                            <p>Liên hệ: 0123</p>
                                        </div>
                                        <div>
                                            <p>Năm sinh: 1960</p>
                                            <p>
                                                Tôn giáo:
                                            </p>
                                        </div>
                                        <div>
                                            <p>Quốc tịch: Kinh</p>
                                            <p>Nghề nghiệp: Không</p>
                                            <p></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className={`${PersonalInfoStyle.text_bold}${PersonalInfoStyle.text_block_body}` }>
                                <p>
                                    Họ và tên mẹ: Nguyễn Đại An
                                </p>
                            </div>
                            <div className={PersonalInfoStyle.text_block_body}>
                                <div>
                                    <p>Dân tộc: Kinh</p>
                                    <p>
                                        Nơi làm việc:
                                    </p>
                                    <p>
                                        Địa chỉ thường trú:
                                    </p>
                                    <p>Liên hệ: 0123</p>
                                </div>
                                <div>
                                    <p>Năm sinh: 1960</p>
                                    <p>
                                        Tôn giáo:
                                    </p>
                                </div>
                                <div>
                                    <p>Quốc tịch: Kinh</p>
                                    <p>Nghề nghiệp: Không</p>
                                    <p></p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={`${PersonalInfoStyle.text_block_body} ${PersonalInfoStyle.text_bold}`}>
                        Thông tin người thân khác:
                    </div>
                    <div className={`${PersonalInfoStyle.text_block_body} ${PersonalInfoStyle.text_bold}`}>
                        <div>
                            Thuộc hộ:
                        </div>
                        <div>
                            Số sổ:
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
		</div>
	);
};
