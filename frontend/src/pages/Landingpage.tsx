// src/pages/LandingPage.tsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, CheckCircle, ArrowRight, Briefcase, ChevronDown, Award, Zap, Users, TrendingUp, Menu, X } from 'lucide-react';

export default function LandingPage() {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [accountMenuOpen, setAccountMenuOpen] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('jwt_token');
        setIsLoggedIn(!!token);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('jwt_token');
        setIsLoggedIn(false);
        setAccountMenuOpen(false);
    };

    // (Đây là toàn bộ code giao diện của bạn, được giữ nguyên)
    const dropdownMenus = {
        templates: [
            { title: 'Word', desc: 'Mẫu Microsoft Word hoàn hảo để tải xuống, chỉnh sửa và tùy chỉnh ngoại tuyến.' },
            { title: 'Đơn giản', desc: 'Mẫu vô thời gian, sạch sẽ với cấu trúc cân bằng cổ điển. Một canvas cơ bản hoàn hảo' },
            { title: 'Chuyên nghiệp', desc: 'Mẫu chiến thắng công việc để thể hiện tính chuyên nghiệp, độ tin cậy và chuyên môn' },
            { title: 'Hiện đại', desc: 'Cảm giác hiện đại và phong cách cho các ứng viên có tư duy tiến bộ trong các lĩnh vực sáng tạo' },
            { title: 'Google docs', desc: 'Mẫu Google Docs để chỉnh sửa nhanh chóng, linh hoạt—dễ cập nhật, chia sẻ và tùy chỉnh ở mọi nơi.' },
            { title: 'ATS', desc: 'Tối ưu hóa CV của bạn và gây ấn tượng với nhà tuyển dụng bằng những thiết kế thân thiện với ATS.' }
        ],
        examples: [ { title: 'Ví dụ theo ngành', desc: 'Khám phá CV được thiết kế cho ngành của bạn' }, { title: 'Ví dụ theo cấp độ', desc: 'Tìm CV phù hợp với kinh nghiệm của bạn' } ],
        coverLetter: [ { title: 'Mẫu thư xin việc', desc: 'Các mẫu chuyên nghiệp cho thư xin việc' }, { title: 'Ví dụ thư xin việc', desc: 'Xem các ví dụ thư xin việc thực tế' } ],
        resources: [ { title: 'Blog', desc: 'Lời khuyên nghề nghiệp và mẹo tìm việc' }, { title: 'Trợ giúp CV', desc: 'Hướng dẫn viết CV chuyên nghiệp' }, { title: 'Phỏng vấn việc làm', desc: 'Chuẩn bị cho phỏng vấn của bạn' }, { title: 'Sự nghiệp', desc: 'Phát triển sự nghiệp của bạn' } ]
    };
    const templates = [ { name: 'Chuyên nghiệp', users: '4,800+', color: 'from-emerald-500 to-teal-600' }, { name: 'Prime ATS', users: '3,200+', color: 'from-blue-500 to-indigo-600' }, { name: 'Pure ATS', users: '2,900+', color: 'from-slate-500 to-gray-600' }, { name: 'Specialist', users: '4,100+', color: 'from-purple-500 to-pink-600' }, { name: 'Clean', users: '3,600+', color: 'from-orange-500 to-red-600' }, { name: 'Simple ATS', users: '3,400+', color: 'from-cyan-500 to-blue-600' } ];
    const features = [ { icon: <Zap className="w-8 h-8" />, title: 'Hoàn thành trong 10 phút', description: 'Công cụ AI giúp tạo CV nhanh gấp 10 lần so với tự làm.' }, { icon: <CheckCircle className="w-8 h-8" />, title: 'Không có lỗi', description: 'Đừng lo về lỗi chính tả, bạn sẽ nghe thật chuyên nghiệp!' }, { icon: <Award className="w-8 h-8" />, title: 'Mẫu ATS chuẩn', description: 'CV của bạn sẽ 100% tương thích. Nhà tuyển dụng sẽ thấy bạn.' }, { icon: <TrendingUp className="w-8 h-8" />, title: 'Tăng lương 7% trở lên', description: 'Chúng tôi có thể giúp bạn đàm phán mức lương khởi điểm cao hơn.' } ];
    const reviews = [ { name: 'Joyce Jones', rating: 5, title: 'Rất được đề xuất!', content: 'Resume.io đã giúp tôi chỉnh sửa CV hiện tại và điều chỉnh nó cho công việc tôi đang ứng tuyển. Rất được đề xuất!', time: '5 ngày trước' }, { name: 'Jeremy', rating: 5, title: 'Phần mềm xuất sắc', content: 'Resume.io rất hữu ích với tìm kiếm việc làm. Họ dễ sử dụng và làm cho việc làm CV và sơ yếu lý lịch trở nên dễ dàng...', time: '6 ngày trước' }, { name: 'Amar Gir', rating: 5, title: 'Trải nghiệm rất tốt', content: 'Trải nghiệm rất tốt. Tôi đã xây dựng CV chỉ trong vài phút mà đáng lẽ sẽ mất hàng giờ khi tôi tự làm...', time: '2 ngày trước' } ];
    const companies = [ 'Booking.com', 'Apple', 'DHL', 'Amazon', 'American Express', 'Accenture', 'KPMG' ];

    return (
        <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white">
            {/* Header */}
            <header className="bg-white sticky top-0 z-50 border-b border-gray-200">
                <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <a href="/" className="flex items-center gap-1.5">
                            <div className="w-7 h-7 bg-gradient-to-br from-blue-500 to-cyan-500 rounded"></div>
                            <div><span className="text-lg font-bold text-gray-900">CV Builder</span></div>
                        </a>
                        <div className="hidden md:flex items-center gap-8">
                            {/* ✅ LOGIC HIỂN THỊ TÙY THEO TRẠNG THÁI ĐĂNG NHẬP */}
                            {isLoggedIn ? (
                                <div className="relative">
                                    <button
                                        onClick={() => setAccountMenuOpen(!accountMenuOpen)}
                                        onBlur={() => setTimeout(() => setAccountMenuOpen(false), 200)}
                                        className="font-semibold text-gray-700 hover:text-blue-600 flex items-center gap-2"
                                    >
                                        Tài khoản của tôi <ChevronDown className="w-4 h-4" />
                                    </button>
                                    {accountMenuOpen && (
                                        <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border py-2 z-50">
                                            <a href="/my-cvs" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">CV của tôi</a>
                                            <a href="/editor/new" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Tạo CV mới</a>
                                            <hr className="my-1"/>
                                            <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100">Đăng xuất</button>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <>
                                    <a href="/login" className="text-sm text-blue-600 hover:text-blue-700 font-medium">Đăng nhập</a>
                                    <a href="/register" className="bg-blue-600 text-white text-sm px-5 py-2.5 rounded-md hover:bg-blue-700 font-medium">Tạo CV của tôi</a>
                                </>
                            )}
                        </div>
                    </div>
                </nav>
            </header>
            {/* Hero Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
                            Công cụ tạo CV này giúp bạn có{' '}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600">việc làm mơ ước</span>
                        </h1>
                        <p className="text-xl text-gray-600 mb-8">Chỉ 2% CV thành công. CV của bạn sẽ là một trong số đó.</p>
                        <div className="flex flex-col sm:flex-row gap-4 mb-8">
                            <a href="/register" className="bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition-colors text-lg font-semibold text-center">Tạo CV của tôi</a>
                        </div>
                        <div className="flex items-center gap-2 mt-4">
                            <Star className="w-5 h-5 fill-green-600 text-green-600" />
                            <span className="font-semibold">Trustpilot</span>
                            <span className="text-gray-600">4.4 trên 5 | 37,389 đánh giá</span>
                        </div>
                    </div>
                    <div className="relative">
                        <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-md mx-auto">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full"></div>
                                <div><h3 className="text-xl font-bold text-gray-900">Alice Hart</h3><p className="text-gray-600">Giáo viên Toán</p></div>
                            </div>
                            <div className="bg-green-100 text-green-800 px-4 py-2 rounded-lg inline-flex items-center gap-2 mb-4"><span className="text-2xl font-bold">81%</span><span className="text-sm">Điểm CV</span></div>
                            <div className="space-y-4 mb-6"><div className="bg-gray-50 p-4 rounded-lg"><h4 className="font-semibold text-gray-900 mb-2">Hồ sơ</h4><p className="text-sm text-gray-600">Giáo viên toán với hơn 8 năm kinh nghiệm...</p></div><div className="bg-gray-50 p-4 rounded-lg"><h4 className="font-semibold text-gray-900 mb-2">Lịch sử làm việc</h4><p className="text-sm text-gray-600">Trường Trung học Tuscaloosa County...</p></div></div>
                            <div className="flex items-center justify-between"><div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-lg"><span className="text-sm font-semibold">✨ ATS Hoàn hảo</span></div><button className="text-blue-600 font-semibold hover:text-blue-700">+ Thêm kỹ năng</button></div>
                        </div>
                        <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-white px-6 py-3 rounded-full shadow-lg"><p className="text-center"><span className="text-3xl font-bold text-blue-600">27,329</span><span className="text-gray-600 ml-2">CV được tạo hôm nay</span></p></div>
                    </div>
                </div>
            </section>
            {/* Các section khác (Features, Templates, Reviews...) */}
            <section className="bg-white py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">Mọi công cụ bạn cần đều ở đây...</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {features.map((feature, index) => (<div key={index} className="text-center"><div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl mb-4">{feature.icon}</div><h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3><p className="text-gray-600">{feature.description}</p></div>))}
                    </div>
                </div>
            </section>
            <section className="py-16 bg-gradient-to-b from-white to-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-4xl font-bold text-center text-gray-900 mb-4">Các mẫu CV đã được kiểm chứng</h2>
                    <p className="text-center text-gray-600 mb-12">Sử dụng các mẫu mà nhà tuyển dụng yêu thích. Tải xuống dưới dạng Word hoặc PDF.</p>
                    <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-6 mb-8">
                        {templates.map((template, index) => (<div key={index} className="group cursor-pointer"><div className={`aspect-[3/4] bg-gradient-to-br ${template.color} rounded-lg shadow-lg mb-3 transform transition-transform group-hover:scale-105`}></div><h3 className="font-semibold text-gray-900 text-center">{template.name}</h3><p className="text-sm text-gray-600 text-center">{template.users} người dùng chọn mẫu này</p></div>))}
                    </div>
                    <div className="text-center"><button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors inline-flex items-center gap-2">Xem tất cả mẫu CV <ArrowRight className="w-5 h-5" /></button></div>
                </div>
            </section>
            <section className="py-12 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><p className="text-center text-gray-600 mb-8">Ứng viên của chúng tôi đã được tuyển dụng tại:</p><div className="flex flex-wrap justify-center items-center gap-8">{companies.map((company, index) => (<div key={index} className="text-2xl font-semibold text-gray-400 hover:text-gray-600 transition-colors">{company}</div>))}</div></div>
            </section>
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-4xl font-bold text-center text-gray-900 mb-4">92% khách hàng giới thiệu chúng tôi</h2>
                    <div className="flex items-center justify-center gap-2 mb-12"><div className="text-4xl font-bold">4.3</div><div><div className="flex gap-1">{[...Array(5)].map((_, i) => (<Star key={i} className={`w-5 h-5 ${i < 4 ? 'fill-green-600 text-green-600' : 'fill-gray-300 text-gray-300'}`} />))}</div><p className="text-sm text-gray-600">dựa trên 55,040 đánh giá</p></div><div className="ml-4"><Star className="w-6 h-6 fill-green-600 text-green-600 inline" /><span className="font-semibold ml-1">Trustpilot</span></div></div>
                    <div className="grid md:grid-cols-3 gap-6">{reviews.map((review, index) => (<div key={index} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow"><div className="flex gap-1 mb-3">{[...Array(review.rating)].map((_, i) => (<Star key={i} className="w-5 h-5 fill-green-600 text-green-600" />))}</div><h3 className="font-bold text-gray-900 mb-2">{review.title}</h3><p className="text-gray-600 text-sm mb-4">{review.content}</p><div className="flex justify-between items-center text-sm text-gray-500"><span>{review.name}</span><span>{review.time}</span></div></div>))}</div>
                </div>
            </section>
            <section className="py-16 bg-gradient-to-r from-blue-600 to-cyan-600">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center"><h2 className="text-4xl font-bold text-white mb-6">Tham gia hơn 27,329 người tạo CV hôm nay</h2><p className="text-xl text-blue-100 mb-8">Bắt đầu ngay và được tuyển dụng nhanh hơn.</p><a href="/register" className="bg-white text-blue-600 px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors text-lg font-semibold">Tạo CV của tôi</a></div>
            </section>
            <footer className="bg-gray-900 text-gray-300 py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-4 gap-8 mb-8"><div><h3 className="text-white font-semibold mb-4">CV</h3><ul className="space-y-2"><li><a href="#" className="hover:text-white">Tạo CV bằng AI</a></li><li><a href="#" className="hover:text-white">Điểm ATS</a></li><li><a href="#" className="hover:text-white">Ví dụ CV</a></li><li><a href="#" className="hover:text-white">Mẫu CV</a></li></ul></div><div><h3 className="text-white font-semibold mb-4">TÌM VIỆC</h3><ul className="space-y-2"><li><a href="#" className="hover:text-white">Tìm việc làm</a></li></ul></div><div><h3 className="text-white font-semibold mb-4">TÀI NGUYÊN</h3><ul className="space-y-2"><li><a href="#" className="hover:text-white">Blog</a></li><li><a href="#" className="hover:text-white">Trợ giúp CV</a></li><li><a href="#" className="hover:text-white">Phỏng vấn việc làm</a></li><li><a href="#" className="hover:text-white">Sự nghiệp</a></li></ul></div><div><h3 className="text-white font-semibold mb-4">HỖ TRỢ</h3><ul className="space-y-2"><li><a href="#" className="hover:text-white">FAQ</a></li><li><a href="#" className="hover:text-white">Liên hệ chúng tôi</a></li><li><a href="#" className="hover:text-white">Điều khoản dịch vụ</a></li><li><a href="#" className="hover:text-white">Quyền riêng tư</a></li></ul></div></div>
                    <div className="border-t border-gray-800 pt-8 text-center"><p className="text-sm">Copyright 2025 - CV Builder</p></div>
                </div>
            </footer>
        </div>
    );

}