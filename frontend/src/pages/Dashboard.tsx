// src/pages/Dashboard.tsx
import { useState, useEffect } from 'react';
import { Star, ArrowRight, Briefcase, Award, Zap, Sparkles, Rocket, Shield, Target, Globe, Heart, Edit3 } from 'lucide-react';
import Header from '../components/Header';

// ===================================================================
// Giao diện cho khách (chưa đăng nhập) - LANDING PAGE ĐẦY ĐỦ CỦA BẠN
// ===================================================================
const LandingPageView = ({ isLoggedIn, onLogout }: { isLoggedIn: boolean; onLogout: () => void }) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    const features = [
        { 
            icon: <Zap className="w-8 h-8" />, 
            title: 'Tạo CV trong 10 phút', 
            description: 'Công cụ AI thông minh giúp bạn tạo CV chuyên nghiệp chỉ trong vài phút.',
            color: 'from-yellow-400 to-orange-500'
        }, 
        { 
            icon: <Shield className="w-8 h-8" />, 
            title: '100% ATS Friendly', 
            description: 'CV của bạn được tối ưu hóa để vượt qua mọi hệ thống tuyển dụng tự động.',
            color: 'from-green-400 to-emerald-500'
        }, 
        { 
            icon: <Target className="w-8 h-8" />, 
            title: 'Tăng cơ hội việc làm', 
            description: 'Người dùng của chúng tôi có tỷ lệ phỏng vấn cao hơn 3x so với CV thông thường.',
            color: 'from-blue-400 to-cyan-500'
        }, 
        { 
            icon: <Rocket className="w-8 h-8" />, 
            title: 'Xuất PDF/Word', 
            description: 'Tải xuống CV của bạn dưới nhiều định dạng khác nhau, sẵn sàng gửi ứng tuyển.',
            color: 'from-purple-400 to-pink-500'
        }
    ];

    const templates = [
        { name: 'Modern', users: '12,500+', color: 'from-blue-500 to-purple-600', popular: true },
        { name: 'Professional', users: '8,900+', color: 'from-emerald-500 to-teal-600' },
        { name: 'Creative', users: '6,200+', color: 'from-pink-500 to-rose-600' },
        { name: 'Minimal', users: '9,100+', color: 'from-gray-500 to-slate-600' },
        { name: 'ATS Optimized', users: '15,300+', color: 'from-orange-500 to-red-600', popular: true },
        { name: 'Executive', users: '4,700+', color: 'from-indigo-500 to-blue-600' }
    ];

    const testimonials = [
        { 
            name: 'Nguyễn Minh Anh', 
            role: 'Software Engineer tại FPT',
            rating: 5, 
            content: 'CV Builder đã giúp tôi tạo ra một CV chuyên nghiệp trong 15 phút. Tôi đã nhận được 3 lời mời phỏng vấn trong tuần đầu!',
            avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face'
        },
        { 
            name: 'Trần Văn Nam', 
            role: 'Marketing Manager',
            rating: 5, 
            content: 'Giao diện rất dễ sử dụng và CV xuất ra trông rất chuyên nghiệp. Tôi đã được tuyển dụng sau 2 tuần sử dụng!',
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face'
        },
        { 
            name: 'Lê Thị Hương', 
            role: 'Business Analyst',
            rating: 5, 
            content: 'Tính năng AI gợi ý nội dung rất hữu ích. CV của tôi trông như được viết bởi chuyên gia!',
            avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face'
        }
    ];

    const stats = [
        { number: '50,000+', label: 'CV được tạo mỗi tháng' },
        { number: '95%', label: 'Tỷ lệ hài lòng của người dùng' },
        { number: '3x', label: 'Tăng cơ hội phỏng vấn' },
        { number: '24/7', label: 'Hỗ trợ khách hàng' }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
            {/* Animated Background */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-pink-400/20 to-yellow-600/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
            </div>

            {/* Header */}
            <Header isLoggedIn={isLoggedIn} onLogout={onLogout} />

            {/* Hero Section */}
            <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                        <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
                            <Sparkles className="w-4 h-4" />
                            Được tin dùng bởi 50,000+ người dùng
                        </div>
                        <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 leading-tight mb-6">
                            Tạo CV{' '}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
                                chuyên nghiệp
                            </span>
                            <br />
                            trong 10 phút
                        </h1>
                        <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                            Công cụ AI thông minh giúp bạn tạo CV đẹp, chuẩn ATS và tăng cơ hội việc làm lên 3x.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 mb-8">
                            {isLoggedIn ? (
                                <a href="/editor/new" className="group bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl hover:shadow-xl hover:scale-105 transition-all duration-300 text-lg font-semibold text-center flex items-center justify-center gap-2">
                                    <Rocket className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                                    Tạo CV mới
                                </a>
                            ) : (
                                <>
                                    <a href="/register" className="group bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl hover:shadow-xl hover:scale-105 transition-all duration-300 text-lg font-semibold text-center flex items-center justify-center gap-2">
                                        <Rocket className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                                        Tạo CV miễn phí
                                    </a>
                                    <a href="#demo" className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-xl hover:border-blue-500 hover:text-blue-600 transition-all duration-300 text-lg font-semibold text-center">
                                        Xem demo
                                    </a>
                                </>
                            )}
                        </div>
                        <div className="flex items-center gap-6">
                            <div className="flex items-center gap-2">
                                <div className="flex -space-x-2">
                                    {[1,2,3,4,5].map((i) => (
                                        <div key={i} className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full border-2 border-white"></div>
                                    ))}
                                </div>
                                <span className="text-sm text-gray-600">+2,847 người dùng</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                                <span className="font-semibold text-gray-900">4.9/5</span>
                                <span className="text-gray-600">(2,847 đánh giá)</span>
                        </div>
                        </div>
                    </div>
                    
                    <div className={`relative transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <div className="relative">
                            {/* CV Preview Card */}
                            <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md mx-auto transform hover:scale-105 transition-transform duration-300">
                            <div className="flex items-center gap-4 mb-6">
                                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                                        <span className="text-white font-bold text-lg">MA</span>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-900">Minh Anh</h3>
                                        <p className="text-gray-600">Software Engineer</p>
                                    </div>
                            </div>
                                
                                <div className="bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 px-4 py-3 rounded-xl inline-flex items-center gap-2 mb-6">
                                    <Target className="w-5 h-5" />
                                    <span className="text-lg font-bold">95%</span>
                                    <span className="text-sm">Điểm ATS</span>
                            </div>
                                
                            <div className="space-y-4 mb-6">
                                    <div className="bg-gray-50 p-4 rounded-lg">
                                        <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                                            <Briefcase className="w-4 h-4 text-blue-500" />
                                            Kinh nghiệm
                                        </h4>
                                        <p className="text-sm text-gray-600">3+ năm phát triển ứng dụng web với React, Node.js</p>
                                    </div>
                                    <div className="bg-gray-50 p-4 rounded-lg">
                                        <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                                            <Award className="w-4 h-4 text-purple-500" />
                                            Kỹ năng
                                        </h4>
                                        <p className="text-sm text-gray-600">JavaScript, Python, AWS, Docker</p>
                                </div>
                            </div>
                                
                            <div className="flex items-center justify-between">
                                    <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-lg">
                                        <span className="text-sm font-semibold flex items-center gap-1">
                                            <Shield className="w-4 h-4" />
                                            ATS Ready
                                        </span>
                                    </div>
                                    <button className="text-blue-600 font-semibold hover:text-blue-700 flex items-center gap-1">
                                        <Edit3 className="w-4 h-4" />
                                        Chỉnh sửa
                                </button>
                            </div>
                        </div>
                            
                            {/* Floating Stats */}
                            <div className="absolute -top-4 -right-4 bg-white px-6 py-3 rounded-full shadow-lg animate-bounce">
                            <p className="text-center">
                                    <span className="text-2xl font-bold text-blue-600">2,847</span>
                                    <span className="text-gray-600 ml-2 text-sm">CV tạo hôm nay</span>
                                </p>
                            </div>
                            
                            <div className="absolute -bottom-4 -left-4 bg-white px-6 py-3 rounded-full shadow-lg">
                                <p className="text-center flex items-center gap-2">
                                    <Heart className="w-4 h-4 text-red-500" />
                                    <span className="text-sm text-gray-600">Được yêu thích</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* Features Section */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                            Tại sao chọn{' '}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                                CV Builder?
                            </span>
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Chúng tôi cung cấp tất cả công cụ bạn cần để tạo CV chuyên nghiệp và tăng cơ hội việc làm.
                        </p>
                    </div>
                    
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {features.map((feature, index) => (
                            <div 
                                key={index} 
                                className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-blue-200"
                            >
                                <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${feature.color} text-white rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300`}>
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
                                    {feature.title}
                                </h3>
                                <p className="text-gray-600 leading-relaxed">
                                    {feature.description}
                                </p>
                                
                                {/* Hover Effect */}
                                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300`}></div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            {/* Templates Section */}
            <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                            Mẫu CV{' '}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                                chuyên nghiệp
                            </span>
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Chọn từ hàng chục mẫu CV được thiết kế bởi chuyên gia, tối ưu cho mọi ngành nghề.
                        </p>
                    </div>
                    
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                        {templates.map((template, index) => (
                            <div key={index} className="group relative">
                                <div className="relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300">
                                    <div className={`aspect-[3/4] bg-gradient-to-br ${template.color} relative`}>
                                        {template.popular && (
                                            <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                                                Phổ biến
                                            </div>
                                        )}
                                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                            <button className="bg-white text-gray-900 px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors">
                                                Xem trước
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-4 text-center">
                                    <h3 className="font-bold text-gray-900 text-lg mb-2">{template.name}</h3>
                                    <p className="text-gray-600 text-sm">{template.users} người dùng</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    
                    <div className="text-center">
                        <button className="group bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl hover:shadow-xl hover:scale-105 transition-all duration-300 inline-flex items-center gap-2 text-lg font-semibold">
                            Xem tất cả mẫu CV
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>
                </div>
            </section>
            {/* Stats Section */}
            <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
                            Số liệu{' '}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400">
                                ấn tượng
                            </span>
                        </h2>
                        <p className="text-xl text-blue-100 max-w-3xl mx-auto">
                            Hàng triệu người dùng đã tin tưởng CV Builder để tạo CV chuyên nghiệp.
                        </p>
                    </div>
                    
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {stats.map((stat, index) => (
                            <div key={index} className="text-center group">
                                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 hover:bg-white/20 transition-all duration-300 group-hover:scale-105">
                                    <div className="text-4xl lg:text-5xl font-bold text-white mb-2">
                                        {stat.number}
                                    </div>
                                    <div className="text-blue-100 font-medium">
                                        {stat.label}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                            Khách hàng{' '}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                                nói gì
                            </span>
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Hàng nghìn người dùng đã thành công trong sự nghiệp nhờ CV Builder.
                        </p>
                    </div>
                    
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {testimonials.map((testimonial, index) => (
                            <div key={index} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 group">
                                <div className="flex items-center gap-4 mb-6">
                                    <img 
                                        src={testimonial.avatar} 
                                        alt={testimonial.name}
                                        className="w-12 h-12 rounded-full object-cover"
                                    />
                                    <div>
                                        <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                                        <p className="text-sm text-gray-600">{testimonial.role}</p>
                                    </div>
                                </div>
                                
                                <div className="flex gap-1 mb-4">
                                    {[...Array(testimonial.rating)].map((_, i) => (
                                        <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                                    ))}
                                </div>
                                
                                <p className="text-gray-600 leading-relaxed italic">
                                    "{testimonial.content}"
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            {/* CTA Section */}
            <section className="py-20 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 relative overflow-hidden">
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-4xl lg:text-6xl font-bold text-white mb-6">
                        Sẵn sàng tạo CV{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400">
                            chuyên nghiệp?
                        </span>
                    </h2>
                    <p className="text-xl text-blue-100 mb-12 max-w-2xl mx-auto">
                        Tham gia hơn 50,000+ người dùng đã thành công trong sự nghiệp. Bắt đầu miễn phí ngay hôm nay!
                    </p>
                    <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                        {isLoggedIn ? (
                            <a href="/editor/new" className="group bg-white text-blue-600 px-10 py-5 rounded-2xl hover:shadow-2xl hover:scale-105 transition-all duration-300 text-xl font-bold inline-flex items-center gap-3">
                                <Rocket className="w-6 h-6 group-hover:rotate-12 transition-transform" />
                                Tạo CV mới
                            </a>
                        ) : (
                            <>
                                <a href="/register" className="group bg-white text-blue-600 px-10 py-5 rounded-2xl hover:shadow-2xl hover:scale-105 transition-all duration-300 text-xl font-bold inline-flex items-center gap-3">
                                    <Rocket className="w-6 h-6 group-hover:rotate-12 transition-transform" />
                                    Tạo CV miễn phí
                                </a>
                                <div className="text-white/80 text-sm">
                                    <p>✓ Không cần thẻ tín dụng</p>
                                    <p>✓ Hoàn toàn miễn phí</p>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 text-gray-300 py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-4 gap-8 mb-12">
                        <div>
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                                    <Sparkles className="w-6 h-6 text-white" />
                                </div>
                                <span className="text-xl font-bold text-white">CV Builder</span>
                            </div>
                            <p className="text-gray-400 mb-6">
                                Công cụ tạo CV chuyên nghiệp với AI, giúp bạn có việc làm mơ ước.
                            </p>
                            <div className="flex gap-4">
                                <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors cursor-pointer">
                                    <Globe className="w-5 h-5" />
                                </div>
                                <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors cursor-pointer">
                                    <Heart className="w-5 h-5" />
                                </div>
                            </div>
                        </div>
                        
                        <div>
                            <h3 className="text-white font-bold mb-6">Sản phẩm</h3>
                            <ul className="space-y-3">
                                <li><a href="#" className="hover:text-white transition-colors">Tạo CV bằng AI</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Mẫu CV chuyên nghiệp</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Điểm ATS</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Xuất PDF/Word</a></li>
                            </ul>
                        </div>
                        
                        <div>
                            <h3 className="text-white font-bold mb-6">Tài nguyên</h3>
                            <ul className="space-y-3">
                                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Hướng dẫn viết CV</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Mẹo phỏng vấn</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Tìm việc làm</a></li>
                            </ul>
                        </div>
                        
                        <div>
                            <h3 className="text-white font-bold mb-6">Hỗ trợ</h3>
                            <ul className="space-y-3">
                                <li><a href="#" className="hover:text-white transition-colors">Trung tâm trợ giúp</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Liên hệ</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Điều khoản dịch vụ</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Chính sách bảo mật</a></li>
                            </ul>
                        </div>
                    </div>
                    
                    <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
                        <p className="text-gray-400 text-sm">
                            © 2025 CV Builder. Tất cả quyền được bảo lưu.
                        </p>
                        <div className="flex gap-6 mt-4 md:mt-0">
                            <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Facebook</a>
                            <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Twitter</a>
                            <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">LinkedIn</a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};


// ===================================================================
// Component Dashboard chính - Quyết định hiển thị giao diện nào
// ===================================================================
export default function Dashboard() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('jwt_token');
        setIsLoggedIn(!!token);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('jwt_token');
        setIsLoggedIn(false);
        window.location.reload();
    };

    return <LandingPageView isLoggedIn={isLoggedIn} onLogout={handleLogout} />;
}