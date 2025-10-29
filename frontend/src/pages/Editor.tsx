// src/Editor.tsx

import React, { useState, ChangeEvent, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Download, Briefcase, User, Mail, Phone, MapPin, Plus, Sparkles, Camera, X } from 'lucide-react';
import { createCV, getCVById, updateCV, uploadAvatar } from '../api';

export default function Editor() { // Tên component chính là Editor
    const [personalDetails, setPersonalDetails] = useState({
        fullName: '',
        email: '',
        phone: '',
        address: '',
        dateOfBirth: '',
        avatarUrl: null as string | null, // Sửa thành avatarUrl cho khớp với backend
        jobTitle: '',
        careerObjective: '',
        profileSummary: '',
        education: '',
        skills: '',
        certifications: '',
        projects: '',
        languages: '',
        linkedIn: '',
        github: '',
        websiteUrl: ''
    });

    // Local avatar file selected by user (not uploaded yet)
    const [avatarFile, setAvatarFile] = useState<File | null>(null);
    // Preview URL for selected avatar (or existing server URL)
    const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

    const [jobs, setJobs] = useState([
        {
            title: 'Software Engineer',
            employer: 'Google',
            startDate: '2022-01',
            endDate: 'Present',
            description: '- Developed and maintained web applications using React and Node.js.\n- Collaborated with cross-functional teams to deliver high-quality features.\n- Optimized application performance, reducing load times by 40%.'
        }
    ]);

    const navigate = useNavigate();
    const params = useParams();
    const editingId = params.id; // 'new' or id

    // Log để debug route params
    useEffect(() => {
        console.log('Route params:', params);
        console.log('Editing ID:', editingId);
    }, [params, editingId]);

    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        const loadCV = async (id: string) => {
            console.log('Loading CV with ID:', id, 'type:', typeof id);
            try {
                const numericId = Number(id);
                console.log('Converted ID:', numericId, 'type:', typeof numericId);
                const res = await getCVById(numericId);
                const cv = res.data;
                console.log('Loaded CV:', cv);
                console.log('Loaded avatarUrl:', cv.avatarUrl);
                setPersonalDetails((pd) => ({
                    ...pd,
                    fullName: cv.fullName || pd.fullName,
                    email: cv.email || pd.email,
                    phone: cv.phone || pd.phone,
                    address: cv.address || pd.address,
                    dateOfBirth: cv.dateOfBirth || pd.dateOfBirth,
                    avatarUrl: cv.avatarUrl || pd.avatarUrl,
                    jobTitle: cv.jobTitle || pd.jobTitle,
                    careerObjective: cv.careerObjective || pd.careerObjective,
                    profileSummary: cv.profileSummary || pd.profileSummary,
                    education: cv.education || pd.education,
                    skills: cv.skills || pd.skills,
                    certifications: cv.certifications || pd.certifications,
                    projects: cv.projects || pd.projects,
                    languages: cv.languages || pd.languages,
                    linkedIn: cv.linkedIn || pd.linkedIn,
                    github: cv.github || pd.github,
                    websiteUrl: cv.websiteUrl || pd.websiteUrl,
                }));
                const experienceText = cv.experience || '';
                const jobFromCv = {
                    title: cv.jobTitle || '',
                    employer: '',
                    startDate: '',
                    endDate: '',
                    description: experienceText,
                };
                setJobs([jobFromCv]);
                // set preview to existing avatar url when editing
                setAvatarPreview(cv.avatarUrl || null);
            } catch (err) {
                console.error('Cannot load CV', err);
            }
        };

        if (editingId && editingId !== 'new' && !isNaN(+editingId)) {
            loadCV(editingId);
        }
    }, [editingId]);

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
            // keep the File object and a preview URL; do not store base64 in DB
            setAvatarFile(file);
            setAvatarPreview(URL.createObjectURL(file));
            // clear any previous server avatar URL in personalDetails to indicate new file
            setPersonalDetails({ ...personalDetails, avatarUrl: null });
        }
    };

    const removeAvatar = () => {
        setAvatarFile(null);
        setAvatarPreview(null);
        setPersonalDetails({ ...personalDetails, avatarUrl: null });
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
                <div className="flex items-center gap-3">
                    <button className="px-4 py-2 bg-white border rounded-lg flex items-center gap-2 text-sm hover:shadow" onClick={() => { /* export pdf placeholder */ }}>
                        <Download className="w-4 h-4" />
                        Tải xuống PDF
                    </button>
                    <button
                        disabled={isSaving}
                        onClick={async () => {
                            // Client-side validation
                            if (!personalDetails.fullName || personalDetails.fullName.trim() === '') {
                                alert('Họ và tên không được để trống.');
                                return;
                            }
                            if (!personalDetails.email || !personalDetails.email.includes('@')) {
                                alert('Email không hợp lệ.');
                                return;
                            }

                            setIsSaving(true);
                            try {
                                // If the user selected a new avatar file, upload it first and use returned URL
                                let avatarUrlToSend = personalDetails.avatarUrl;
                                if (avatarFile) {
                                    try {
                                        const uploadRes = await uploadAvatar(avatarFile);
                                        const path = uploadRes.data;
                                        // Just use the relative path returned from backend
                                        avatarUrlToSend = path;
                                        console.log('Uploaded avatar path:', avatarUrlToSend);
                                    } catch (uErr: any) {
                                        setIsSaving(false);
                                        const msg = uErr?.response?.data || uErr?.message || String(uErr);
                                        alert('Upload ảnh thất bại: ' + msg);
                                        return;
                                    }
                                }

                                const payload: any = {
                                    fullName: personalDetails.fullName,
                                    email: personalDetails.email,
                                    phone: personalDetails.phone,
                                    address: personalDetails.address,
                                    dateOfBirth: personalDetails.dateOfBirth || null,
                                    avatarUrl: avatarUrlToSend,
                                    jobTitle: personalDetails.jobTitle || jobs[0]?.title || '',
                                    careerObjective: personalDetails.careerObjective || '',
                                    profileSummary: personalDetails.profileSummary || '',
                                    experience: jobs.map((j) => `${j.title} at ${j.employer} (${j.startDate} - ${j.endDate})\n${j.description}`).join('\n\n'),
                                    education: personalDetails.education || '',
                                    skills: personalDetails.skills || '',
                                    certifications: personalDetails.certifications || '',
                                    projects: personalDetails.projects || '',
                                    languages: personalDetails.languages || '',
                                    linkedIn: personalDetails.linkedIn || '',
                                    github: personalDetails.github || '',
                                    websiteUrl: personalDetails.websiteUrl || ''
                                };

                                // Only call updateCV if we have a valid numeric ID
                                if (editingId && editingId !== 'new') {
                                    await updateCV(+editingId, payload);
                                } else {
                                    await createCV(payload);
                                }
                                navigate('/my-cvs');
                            } catch (err: any) {
                                console.error('Save CV failed', err);
                                // If server returned response, show its message
                                if (err.response) {
                                    const status = err.response.status;
                                    const data = err.response.data;
                                    if (status === 401 || status === 403) {
                                        // Unauthorized - force login
                                        localStorage.removeItem('jwt_token');
                                        alert('Phiên đăng nhập đã hết hạn hoặc không hợp lệ. Vui lòng đăng nhập lại.');
                                        navigate('/login');
                                        return;
                                    }
                                    // Show server-provided message when available
                                    const msg = typeof data === 'string' ? data : (data?.message || JSON.stringify(data));
                                    alert('Lưu CV thất bại: ' + (msg || status));
                                } else if (err.request) {
                                    // No response received
                                    alert('Không nhận được phản hồi từ server. Kiểm tra kết nối hoặc CORS.');
                                } else {
                                    alert('Lỗi khi gửi yêu cầu: ' + err.message);
                                }
                            } finally {
                                setIsSaving(false);
                            }
                        }}
                        className="px-6 py-2.5 bg-gradient-to-r from-green-600 to-teal-500 text-white rounded-xl hover:shadow-lg hover:scale-105 transition-all font-medium flex items-center gap-2 disabled:opacity-50"
                    >
                        Lưu
                    </button>
                </div>
            </nav>

            {/* Quick debug banner to show current editingId (helps confirm route param) */}
            {editingId && (
                <div className="px-8 py-2 bg-yellow-50 border-b border-yellow-200 text-sm text-yellow-800">
                    {editingId === 'new' ? 'Tạo CV mới' : `Editing CV id: ${editingId}`}
                </div>
            )}

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
                                    {(avatarPreview || personalDetails.avatarUrl) ? (
                                        <div className="relative">
                                            <img
                                                src={avatarPreview || (personalDetails.avatarUrl ? `http://localhost:8080${personalDetails.avatarUrl}` : '')}
                                                alt="Avatar"
                                                onError={(e) => {
                                                    console.warn('Avatar failed to load:', e);
                                                    setAvatarPreview(null);
                                                }}
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

                            <div className="grid grid-cols-2 gap-4">
                                <div className="group">
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Ngày sinh</label>
                                    <input
                                        type="date"
                                        value={personalDetails.dateOfBirth}
                                        onChange={(e) => updatePersonalDetail('dateOfBirth', e.target.value)}
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all bg-white hover:border-indigo-300"
                                    />
                                </div>

                                <div className="group">
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Vị trí ứng tuyển</label>
                                    <input
                                        type="text"
                                        placeholder="VD: Software Engineer"
                                        value={personalDetails.jobTitle}
                                        onChange={(e) => updatePersonalDetail('jobTitle', e.target.value)}
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all bg-white hover:border-indigo-300"
                                    />
                                </div>
                            </div>

                            <div className="group">
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Mục tiêu nghề nghiệp</label>
                                <textarea
                                    rows={3}
                                    placeholder="Tóm tắt mục tiêu nghề nghiệp"
                                    value={personalDetails.careerObjective}
                                    onChange={(e) => updatePersonalDetail('careerObjective', e.target.value)}
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all resize-none bg-white hover:border-indigo-300"
                                />
                            </div>

                            <div className="group">
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Tóm tắt bản thân</label>
                                <textarea
                                    rows={4}
                                    placeholder="Viết một đoạn tóm tắt ngắn về bạn"
                                    value={personalDetails.profileSummary}
                                    onChange={(e) => updatePersonalDetail('profileSummary', e.target.value)}
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all resize-none bg-white hover:border-indigo-300"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="group">
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Kỹ năng (phân tách bằng dấu phẩy)</label>
                                    <input
                                        type="text"
                                        placeholder="VD: Java, Spring, React"
                                        value={personalDetails.skills}
                                        onChange={(e) => updatePersonalDetail('skills', e.target.value)}
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all bg-white hover:border-indigo-300"
                                    />
                                </div>

                                <div className="group">
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Ngôn ngữ</label>
                                    <input
                                        type="text"
                                        placeholder="VD: Vietnamese, English"
                                        value={personalDetails.languages}
                                        onChange={(e) => updatePersonalDetail('languages', e.target.value)}
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all bg-white hover:border-indigo-300"
                                    />
                                </div>
                            </div>

                            <div className="group">
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Học vấn & Bằng cấp</label>
                                <textarea
                                    rows={3}
                                    placeholder="Thông tin học vấn / bằng cấp"
                                    value={personalDetails.education}
                                    onChange={(e) => updatePersonalDetail('education', e.target.value)}
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all resize-none bg-white hover:border-indigo-300"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="group">
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Dự án</label>
                                    <textarea
                                        rows={2}
                                        placeholder="Các dự án tiêu biểu"
                                        value={personalDetails.projects}
                                        onChange={(e) => updatePersonalDetail('projects', e.target.value)}
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all resize-none bg-white hover:border-indigo-300"
                                    />
                                </div>

                                <div className="group">
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Chứng chỉ</label>
                                    <input
                                        type="text"
                                        placeholder="VD: AWS Certified, Oracle"
                                        value={personalDetails.certifications}
                                        onChange={(e) => updatePersonalDetail('certifications', e.target.value)}
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all bg-white hover:border-indigo-300"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-3 gap-4">
                                <div className="group">
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">LinkedIn</label>
                                    <input
                                        type="text"
                                        placeholder="URL LinkedIn"
                                        value={personalDetails.linkedIn}
                                        onChange={(e) => updatePersonalDetail('linkedIn', e.target.value)}
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all bg-white hover:border-indigo-300"
                                    />
                                </div>
                                <div className="group">
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">GitHub</label>
                                    <input
                                        type="text"
                                        placeholder="URL GitHub"
                                        value={personalDetails.github}
                                        onChange={(e) => updatePersonalDetail('github', e.target.value)}
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all bg-white hover:border-indigo-300"
                                    />
                                </div>
                                <div className="group">
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Website</label>
                                    <input
                                        type="text"
                                        placeholder="URL cá nhân / portfolio"
                                        value={personalDetails.websiteUrl}
                                        onChange={(e) => updatePersonalDetail('websiteUrl', e.target.value)}
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all bg-white hover:border-indigo-300"
                                    />
                                </div>
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
                            {(avatarPreview || personalDetails.avatarUrl) && (
                                <div className="flex justify-center mb-4">
                                    <img
                                        src={avatarPreview || (personalDetails.avatarUrl ? `http://localhost:8080${personalDetails.avatarUrl}` : '')}
                                        alt="Avatar"
                                        onError={(e) => {
                                            console.warn('Preview avatar failed to load:', e);
                                            setAvatarPreview(null);
                                        }}
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

                        <div className="grid grid-cols-3 gap-6">
                            <div className="col-span-2">
                                {/* Main: Summary & Experience */}
                                {personalDetails.profileSummary && (
                                    <div className="mb-6">
                                        <h2 className="text-lg font-bold text-gray-800 mb-2">Tóm tắt</h2>
                                        <div className="text-sm text-gray-700 whitespace-pre-line leading-relaxed">{personalDetails.profileSummary}</div>
                                    </div>
                                )}

                                <div className="mb-6">
                                    <h2 className="text-xl font-bold text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text uppercase mb-3 flex items-center gap-2">
                                        <Briefcase className="w-5 h-5 text-indigo-600" />
                                        Kinh nghiệm làm việc
                                    </h2>
                                    <div className="border-t-2 border-indigo-200 mb-4"></div>

                                    {jobs.map((job, index) => (
                                        <div key={index} className="mb-6 pl-4 border-l-4 border-indigo-300">
                                            <div className="flex items-center justify-between">
                                                <h3 className="text-lg font-bold text-gray-800">{job.title || 'Job Title'}</h3>
                                                <span className="text-sm text-gray-500">{job.startDate ? new Date(job.startDate + '-01').toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : 'Start'} - {job.endDate || 'End'}</span>
                                            </div>
                                            <p className="text-sm text-indigo-600 font-semibold mb-2">{job.employer || 'Employer'}</p>
                                            <div className="text-sm text-gray-700 whitespace-pre-line leading-relaxed">{job.description || '- Add your responsibilities and achievements'}</div>
                                        </div>
                                    ))}
                                </div>

                                {/* Career objective (after experience) */}
                                {personalDetails.careerObjective && (
                                    <div className="mb-6">
                                        <h2 className="text-lg font-bold text-gray-800 mb-2">Mục tiêu nghề nghiệp</h2>
                                        <div className="text-sm text-gray-700 whitespace-pre-line leading-relaxed">{personalDetails.careerObjective}</div>
                                    </div>
                                )}
                            </div>

                            <aside className="col-span-1">
                                {/* Sidebar: skills, education, projects, certs, languages, links */}
                                <div className="bg-indigo-50 rounded-xl p-4 mb-4">
                                    <h3 className="text-sm font-semibold text-indigo-700 mb-3">Thông tin</h3>
                                    <div className="text-sm text-gray-700 mb-2"><strong>Vị trí:</strong> {personalDetails.jobTitle || '-'}</div>
                                    {personalDetails.dateOfBirth && <div className="text-sm text-gray-700 mb-2"><strong>Ngày sinh:</strong> {new Date(personalDetails.dateOfBirth).toLocaleDateString()}</div>}
                                    <div className="text-sm text-gray-700"><strong>Địa chỉ:</strong> {personalDetails.address || '-'}</div>
                                </div>

                                {personalDetails.skills && (
                                    <div className="bg-white rounded-xl p-4 mb-4 shadow-sm border border-indigo-100">
                                        <h3 className="text-sm font-semibold text-gray-800 mb-3">Kỹ năng</h3>
                                        <div className="flex flex-wrap gap-2">
                                            {personalDetails.skills.split(',').map((s: string, i: number) => (
                                                <span key={i} className="text-xs bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full">{s.trim()}</span>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {personalDetails.education && (
                                    <div className="bg-white rounded-xl p-4 mb-4 shadow-sm border border-indigo-100">
                                        <h3 className="text-sm font-semibold text-gray-800 mb-2">Học vấn</h3>
                                        <div className="text-sm text-gray-700 whitespace-pre-line">{personalDetails.education}</div>
                                    </div>
                                )}

                                {personalDetails.projects && (
                                    <div className="bg-white rounded-xl p-4 mb-4 shadow-sm border border-indigo-100">
                                        <h3 className="text-sm font-semibold text-gray-800 mb-2">Dự án</h3>
                                        <div className="text-sm text-gray-700 whitespace-pre-line">{personalDetails.projects}</div>
                                    </div>
                                )}

                                {personalDetails.certifications && (
                                    <div className="bg-white rounded-xl p-4 mb-4 shadow-sm border border-indigo-100">
                                        <h3 className="text-sm font-semibold text-gray-800 mb-2">Chứng chỉ</h3>
                                        <div className="text-sm text-gray-700">{personalDetails.certifications}</div>
                                    </div>
                                )}

                                {personalDetails.languages && (
                                    <div className="bg-white rounded-xl p-4 mb-4 shadow-sm border border-indigo-100">
                                        <h3 className="text-sm font-semibold text-gray-800 mb-2">Ngôn ngữ</h3>
                                        <div className="text-sm text-gray-700">{personalDetails.languages}</div>
                                    </div>
                                )}

                                {(personalDetails.linkedIn || personalDetails.github || personalDetails.websiteUrl) && (
                                    <div className="bg-white rounded-xl p-4 shadow-sm border border-indigo-100">
                                        <h3 className="text-sm font-semibold text-gray-800 mb-2">Liên kết</h3>
                                        <div className="flex flex-col gap-2 text-sm">
                                            {personalDetails.linkedIn && <a className="text-indigo-600 underline truncate" href={personalDetails.linkedIn} target="_blank" rel="noreferrer">LinkedIn</a>}
                                            {personalDetails.github && <a className="text-indigo-600 underline truncate" href={personalDetails.github} target="_blank" rel="noreferrer">GitHub</a>}
                                            {personalDetails.websiteUrl && <a className="text-indigo-600 underline truncate" href={personalDetails.websiteUrl} target="_blank" rel="noreferrer">Website</a>}
                                        </div>
                                    </div>
                                )}
                            </aside>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}