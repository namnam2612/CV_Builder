// src/Editor.tsx

import React, { useState, ChangeEvent } from 'react';
import { Download, Briefcase, User, Mail, Phone, MapPin, Plus, Sparkles, Camera, X } from 'lucide-react';

export default function Editor() { // Tên component chính là Editor
    const [personalDetails, setPersonalDetails] = useState({
        fullName: 'MARIANNE ROUSSEAU',
        email: 'john.doe@email.com',
        phone: '(123) 456-7890',
        address: 'San Francisco, CA',
        avatar: null as string | null // Thêm kiểu cho TypeScript
    });

    const [jobs, setJobs] = useState([
        {
            title: 'Software Engineer',
            employer: 'Google',
            startDate: '2022-01',
            endDate: 'Present',
            description: '- Developed and maintained web applications using React and Node.js.\n- Collaborated with cross-functional teams to deliver high-quality features.\n- Optimized application performance, reducing load times by 40%.'
        }
    ]);

    const addJob = () => {
        setJobs([...jobs, { title: '', employer: '', startDate: '', endDate: '', description: '' }]);
    };

    const updateJob = (index: number, field: string, value: string) => {
        const newJobs = [...jobs];
        // Dùng as keyof để TypeScript hiểu field là một key hợp lệ của object job
        newJobs[index][field as keyof typeof newJobs[number]] = value;
        setJobs(newJobs);
    };

    const updatePersonalDetail = (field: string, value: string) => {
        setPersonalDetails({ ...personalDetails, [field]: value });
    };

    const handleAvatarChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPersonalDetails({ ...personalDetails, avatar: reader.result as string });
            };
            reader.readAsDataURL(file);
        }
    };

    const removeAvatar = () => {
        setPersonalDetails({ ...personalDetails, avatar: null });
    };

    return (
        <div className="h-screen flex flex-col bg-gradient-to-br from-indigo-50 via-white to-purple-50">
            {/* Navigation Bar */}
            <nav className="bg-white/80 backdrop-blur-md border-b border-indigo-100 px-8 py-4 flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                        <Sparkles className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                    CV Builder
                  </span>
                </div>
                <div className="flex items-center gap-4">
                    <select className="px-5 py-2.5 border-2 border-indigo-200 rounded-xl bg-white hover:border-indigo-400 transition-colors font-medium text-gray-700 cursor-pointer">
                        <option>Mẫu: Hiện đại</option>
                        <option>Mẫu: Cổ điển</option>
                        <option>Mẫu: Tối giản</option>
                    </select>
                </div>
                <button className="px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:shadow-lg hover:scale-105 transition-all font-medium flex items-center gap-2">
                    <Download className="w-4 h-4" />
                    Tải xuống PDF
                </button>
            </nav>

            {/* Main Content */}
            <div className="flex flex-1 overflow-hidden">
                {/* Left Column - Form Panel */}
                <div className="w-1/2 bg-gradient-to-br from-slate-50 to-indigo-50 overflow-y-auto p-8">
                    {/* Personal Details Section */}
                    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 mb-6 shadow-xl border border-indigo-100 hover:shadow-2xl transition-shadow">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center">
                                <User className="w-5 h-5 text-white" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-800">Thông tin cá nhân</h2>
                        </div>

                        <div className="space-y-5">
                            <div className="group flex justify-center mb-6">
                                <div className="relative">
                                    {personalDetails.avatar ? (
                                        <div className="relative">
                                            <img
                                                src={personalDetails.avatar}
                                                alt="Avatar"
                                                className="w-32 h-32 rounded-full object-cover border-4 border-indigo-200 shadow-lg"
                                            />
                                            <button
                                                onClick={removeAvatar}
                                                className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-all shadow-lg"
                                            >
                                                <X className="w-4 h-4" />
                                            </button>
                                        </div>
                                    ) : (
                                        <label className="cursor-pointer">
                                            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 border-4 border-dashed border-indigo-300 flex flex-col items-center justify-center hover:border-indigo-500 transition-all group">
                                                <Camera className="w-8 h-8 text-indigo-400 group-hover:text-indigo-600 mb-2" />
                                                <span className="text-xs text-indigo-600 font-semibold">Tải ảnh lên</span>
                                            </div>
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={handleAvatarChange}
                                                className="hidden"
                                            />
                                        </label>
                                    )}
                                </div>
                            </div>

                            <div className="group">
                                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                                    <User className="w-4 h-4 text-indigo-500" />
                                    Họ và tên
                                </label>
                                <input
                                    type="text"
                                    placeholder="VD: Nguyễn Văn A"
                                    value={personalDetails.fullName}
                                    onChange={(e) => updatePersonalDetail('fullName', e.target.value)}
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all bg-white hover:border-indigo-300"
                                />
                            </div>

                            <div className="group">
                                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                                    <Mail className="w-4 h-4 text-indigo-500" />
                                    Email
                                </label>
                                <input
                                    type="email"
                                    placeholder="VD: nguyenvana@email.com"
                                    value={personalDetails.email}
                                    onChange={(e) => updatePersonalDetail('email', e.target.value)}
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all bg-white hover:border-indigo-300"
                                />
                            </div>

                            <div className="group">
                                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                                    <Phone className="w-4 h-4 text-indigo-500" />
                                    Số điện thoại
                                </label>
                                <input
                                    type="text"
                                    placeholder="VD: 0912 345 678"
                                    value={personalDetails.phone}
                                    onChange={(e) => updatePersonalDetail('phone', e.target.value)}
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all bg-white hover:border-indigo-300"
                                />
                            </div>

                            <div className="group">
                                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                                    <MapPin className="w-4 h-4 text-indigo-500" />
                                    Địa chỉ
                                </label>
                                <input
                                    type="text"
                                    placeholder="VD: Hà Nội, Việt Nam"
                                    value={personalDetails.address}
                                    onChange={(e) => updatePersonalDetail('address', e.target.value)}
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all bg-white hover:border-indigo-300"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Employment History Section */}
                    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-indigo-100 hover:shadow-2xl transition-shadow">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                                <Briefcase className="w-5 h-5 text-white" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-800">Kinh nghiệm làm việc</h2>
                        </div>

                        {jobs.map((job, index) => (
                            <div key={index} className="mb-6 pb-6 border-b-2 border-gradient-to-r from-indigo-100 to-purple-100 last:border-b-0">
                                <div className="space-y-5">
                                    <div className="group">
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Vị trí công việc
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="VD: Kỹ sư phần mềm"
                                            value={job.title}
                                            onChange={(e) => updateJob(index, 'title', e.target.value)}
                                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all bg-white hover:border-purple-300"
                                        />
                                    </div>

                                    <div className="group">
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Công ty
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="VD: FPT Software"
                                            value={job.employer}
                                            onChange={(e) => updateJob(index, 'employer', e.target.value)}
                                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all bg-white hover:border-purple-300"
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="group">
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                Ngày bắt đầu
                                            </label>
                                            <input
                                                type="month"
                                                value={job.startDate}
                                                onChange={(e) => updateJob(index, 'startDate', e.target.value)}
                                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all bg-white hover:border-purple-300"
                                            />
                                        </div>

                                        <div className="group">
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                Ngày kết thúc
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="Hiện tại"
                                                value={job.endDate}
                                                onChange={(e) => updateJob(index, 'endDate', e.target.value)}
                                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all bg-white hover:border-purple-300"
                                            />
                                        </div>
                                    </div>

                                    <div className="group">
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Mô tả công việc
                                        </label>
                                        <textarea
                                            rows={4}
                                            placeholder="Mô tả trách nhiệm và thành tựu của bạn..."
                                            value={job.description}
                                            onChange={(e) => updateJob(index, 'description', e.target.value)}
                                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all resize-none bg-white hover:border-purple-300"
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}

                        <button
                            onClick={addJob}
                            className="w-full px-4 py-3 border-2 border-dashed border-indigo-300 text-indigo-600 rounded-xl hover:bg-indigo-50 hover:border-indigo-400 font-semibold transition-all flex items-center justify-center gap-2 group"
                        >
                            <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform" />
                            Thêm kinh nghiệm
                        </button>
                    </div>
                </div>

                {/* Right Column - Preview Panel */}
                <div className="w-1/2 bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 overflow-y-auto p-8 flex justify-center">
                    {/* A4-sized Resume Preview */}
                    <div className="bg-white shadow-2xl w-full max-w-3xl h-fit p-12 rounded-lg border border-indigo-100" style={{ aspectRatio: '210/297' }}>
                        {/* Resume Header */}
                        <div className="text-center mb-8 pb-6 border-b-4 border-gradient-to-r from-indigo-500 to-purple-500 relative" style={{ borderImage: 'linear-gradient(to right, rgb(99, 102, 241), rgb(168, 85, 247)) 1' }}>
                            {personalDetails.avatar && (
                                <div className="flex justify-center mb-4">
                                    <img
                                        src={personalDetails.avatar}
                                        alt="Avatar"
                                        className="w-24 h-24 rounded-full object-cover border-4 border-indigo-300 shadow-lg"
                                    />
                                </div>
                            )}
                            <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-3">
                                {personalDetails.fullName || 'YOUR NAME'}
                            </h1>
                            <p className="text-sm text-gray-600 flex items-center justify-center gap-4 flex-wrap">
                                    <span className="flex items-center gap-1">
                                    <Mail className="w-3 h-3" />
                                        {personalDetails.email}
                                    </span>
                                <span>•</span>
                                <span className="flex items-center gap-1">
                                    <Phone className="w-3 h-3" />
                                    {personalDetails.phone}
                                    </span>
                                <span>•</span>
                                <span className="flex items-center gap-1">
                                    <MapPin className="w-3 h-3" />
                                    {personalDetails.address}
                                    </span>
                            </p>
                        </div>

                        {/* Employment History */}
                        <div className="mb-6">
                            <h2 className="text-xl font-bold text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text uppercase mb-3 flex items-center gap-2">
                                <Briefcase className="w-5 h-5 text-indigo-600" />
                                Kinh nghiệm làm việc
                            </h2>
                            <div className="border-t-2 border-indigo-200 mb-4"></div>

                            {jobs.map((job, index) => (
                                <div key={index} className="mb-6 pl-4 border-l-4 border-indigo-300">
                                    <h3 className="text-lg font-bold text-gray-800">
                                        {job.title || 'Job Title'}
                                    </h3>
                                    <p className="text-sm text-indigo-600 font-semibold mb-2">
                                        {job.employer || 'Employer'} | {job.startDate ? new Date(job.startDate + '-01').toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : 'Start'} - {job.endDate || 'End'}
                                    </p>
                                    <div className="text-sm text-gray-700 whitespace-pre-line leading-relaxed">
                                        {job.description || '- Add your responsibilities and achievements'}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}