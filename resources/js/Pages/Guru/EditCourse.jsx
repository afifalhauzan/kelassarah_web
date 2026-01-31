import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router, usePage } from "@inertiajs/react";
import { useState, useEffect } from 'react';

export default function EditCourse({ course, lessons = [] }) {
    const { flash } = usePage().props;
    const globalMessage = flash?.message;
    const globalError = flash?.error;

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        order: '',
        is_published: false,
        knowledge_prompt: '',
        welcome_message: '',
        thumbnail_url: '',
        is_game_enabled: false,
        game_data: { questions: [] }
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [localMessage, setLocalMessage] = useState('');

    useEffect(() => {
        if (course) {
            setFormData({
                title: course.title || '',
                description: course.description || '',
                order: course.order || '',
                is_published: course.is_published || false,
                knowledge_prompt: course.knowledge_prompt || '',
                welcome_message: course.welcome_message || '',
                thumbnail_url: course.thumbnail_url || '',
                is_game_enabled: course.is_game_enabled || false,
                game_data: course.game_data || { questions: [] }
            });
        }
    }, [course]);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Submitting Course Data:', formData);
        setIsSubmitting(true);

        router.put(route('guru.course.update', course.id), {
            ...formData,
            is_game_enabled: Boolean(formData.is_game_enabled), // Force Boolean
        }, {
            onSuccess: () => {
                setIsSubmitting(false);
                setLocalMessage('Kursus berhasil diperbarui!');
                // Optional: Redirect back
                setTimeout(() => {
                    // router.get(route('guru.course.create'));
                }, 1500);
            },
            onError: (errors) => {
                setIsSubmitting(false);
                setLocalMessage('Error saat memperbarui kursus. Silakan periksa formulir.');
            }
        });
    };

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleDeleteMaterial = (materialId) => {
        if (confirm('Yakin ingin menghapus materi ini?')) {
            router.delete(route('guru.material.destroy', materialId));
        }
    };

    // --- Game Logic Helpers ---
    const addQuestion = () => {
        const currentQuestions = formData.game_data?.questions || [];
        setFormData(prev => ({
            ...prev,
            game_data: {
                ...prev.game_data,
                questions: [
                    ...currentQuestions,
                    {
                        id: Date.now(),
                        text: '',
                        options: ['', '', '', ''],
                        correct_index: 0,
                        explanation: ''
                    }
                ]
            }
        }));
    };

    const removeQuestion = (index) => {
        const currentQuestions = [...(formData.game_data?.questions || [])];
        currentQuestions.splice(index, 1);
        setFormData(prev => ({
            ...prev,
            game_data: { ...prev.game_data, questions: currentQuestions }
        }));
    };

    const updateQuestion = (index, field, value) => {
        const currentQuestions = [...(formData.game_data?.questions || [])];
        currentQuestions[index] = { ...currentQuestions[index], [field]: value };
        setFormData(prev => ({
            ...prev,
            game_data: { ...prev.game_data, questions: currentQuestions }
        }));
    };

    const updateOption = (qIndex, oIndex, value) => {
        const currentQuestions = [...(formData.game_data?.questions || [])];
        const newOptions = [...currentQuestions[qIndex].options];
        newOptions[oIndex] = value;
        currentQuestions[qIndex] = { ...currentQuestions[qIndex], options: newOptions };
        setFormData(prev => ({
            ...prev,
            game_data: { ...prev.game_data, questions: currentQuestions }
        }));
    };

    return (
        <AuthenticatedLayout>
            <Head title="Edit Kursus" />

            <div className="py-8">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 md:p-8">
                            {/* Header */}
                            <div className="flex justify-between items-center mb-6">
                                <div>
                                    <h1 className="text-2xl font-bold text-gray-800">Edit Kursus</h1>
                                    <p className="text-sm text-gray-500">Perbarui informasi dan kelola materi</p>
                                </div>
                                <Link
                                    href={route('guru.course.create')}
                                    className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                    </svg>
                                    Kembali ke Daftar
                                </Link>
                            </div>

                            {/* Global Message */}
                            {globalMessage && (
                                <div className="mb-4 px-4 py-3 bg-green-100 border border-green-400 text-green-700 rounded">
                                    {globalMessage}
                                </div>
                            )}

                            {/* Local Message */}
                            {localMessage && (
                                <div className="mb-4 px-4 py-3 bg-blue-100 border border-blue-400 text-blue-700 rounded">
                                    {localMessage}
                                </div>
                            )}

                            {/* Edit Form */}
                            <div className="bg-white border rounded-lg p-6 mb-8">
                                <h2 className="text-lg font-semibold mb-4 text-gray-800">Informasi Kursus</h2>
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Judul Kursus *</label>
                                            <input type="text" name="title" value={formData.title} onChange={handleInputChange} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Urutan *</label>
                                            <input type="number" name="order" value={formData.order} onChange={handleInputChange} required min="1" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Deskripsi</label>
                                        <textarea name="description" value={formData.description} onChange={handleInputChange} rows={3} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">URL Thumbnail</label>
                                            <input type="text" name="thumbnail_url" value={formData.thumbnail_url} onChange={handleInputChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
                                        </div>
                                        <div className="flex items-center pt-8">
                                            <input type="checkbox" name="is_published" checked={formData.is_published} onChange={handleInputChange} className="w-4 h-4 text-blue-600 border-gray-300 rounded" />
                                            <label className="ml-2 text-sm font-medium text-gray-700">Terbitkan Kursus</label>
                                        </div>
                                    </div>

                                    <div className="flex justify-end">
                                        <button type="submit" disabled={isSubmitting} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium disabled:opacity-50 transition-colors">
                                            {isSubmitting ? 'Menyimpan...' : 'Simpan Perubahan'}
                                        </button>
                                    </div>
                                </form>
                            </div>

                            {/* Game Configuration */}
                            <div className="bg-white border rounded-lg p-6 mb-8">
                                <div className="flex justify-between items-center mb-4">
                                    <h2 className="text-lg font-semibold text-gray-800">Konfigurasi Game (Webcam)</h2>
                                    <div className="flex items-center">
                                        <input
                                            type="checkbox"
                                            name="is_game_enabled"
                                            checked={formData.is_game_enabled}
                                            onChange={handleInputChange}
                                            className="w-4 h-4 text-blue-600 border-gray-300 rounded"
                                        />
                                        <label className="ml-2 text-sm font-medium text-gray-700">Aktifkan Game</label>
                                    </div>
                                </div>

                                {formData.is_game_enabled && (
                                    <div className="space-y-6">
                                        <div className="bg-blue-50 p-4 rounded-lg text-sm text-blue-700">
                                            Game ini akan muncul saat siswa membuat gesture "Tembak" (☝️+👍) ke arah target di layar.
                                            Siswa harus menjawab pertanyaan pilihan ganda yang Anda buat di sini.
                                        </div>

                                        <div className="space-y-4">
                                            {formData.game_data?.questions?.map((q, qIndex) => (
                                                <div key={q.id} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                                                    <div className="flex justify-between items-start mb-3">
                                                        <h4 className="font-medium text-gray-700">Pertanyaan #{qIndex + 1}</h4>
                                                        <button
                                                            type="button"
                                                            onClick={() => removeQuestion(qIndex)}
                                                            className="text-red-500 hover:text-red-700 text-sm"
                                                        >
                                                            Hapus
                                                        </button>
                                                    </div>

                                                    <div className="mb-3">
                                                        <input
                                                            type="text"
                                                            placeholder="Tulis pertanyaan di sini..."
                                                            value={q.text}
                                                            onChange={(e) => updateQuestion(qIndex, 'text', e.target.value)}
                                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 text-sm"
                                                        />
                                                    </div>

                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                                                        {q.options.map((opt, oIndex) => (
                                                            <div key={oIndex} className="flex items-center gap-2">
                                                                <input
                                                                    type="radio"
                                                                    name={`correct_${q.id}`}
                                                                    checked={q.correct_index === oIndex}
                                                                    onChange={() => updateQuestion(qIndex, 'correct_index', oIndex)}
                                                                    className="text-blue-600 focus:ring-blue-500"
                                                                />
                                                                <input
                                                                    type="text"
                                                                    placeholder={`Pilihan ${String.fromCharCode(65 + oIndex)}`}
                                                                    value={opt}
                                                                    onChange={(e) => updateOption(qIndex, oIndex, e.target.value)}
                                                                    className={`w-full px-3 py-1 border rounded-md text-sm ${q.correct_index === oIndex ? 'border-green-400 bg-green-50' : 'border-gray-300'}`}
                                                                />
                                                            </div>
                                                        ))}
                                                    </div>

                                                    {/* Explanation Field */}
                                                    <div>
                                                        <label className="block text-xs font-medium text-gray-700 mb-1">Penjelasan Jawaban (Akan muncul setelah siswa menjawab)</label>
                                                        <textarea
                                                            rows={2}
                                                            placeholder="Jelaskan kenapa jawaban ini benar..."
                                                            value={q.explanation || ''}
                                                            onChange={(e) => updateQuestion(qIndex, 'explanation', e.target.value)}
                                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 text-sm"
                                                        />
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                        <button
                                            type="button"
                                            onClick={addQuestion}
                                            className="w-full py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-blue-500 hover:text-blue-600 transition-colors text-sm font-medium"
                                        >
                                            + Tambah Pertanyaan
                                        </button>
                                    </div>
                                )}
                                {/* Separate Save for Game Config if needed, or rely on main form save */}
                                <div className="mt-4 flex justify-end">
                                    <button
                                        type="button"
                                        onClick={handleSubmit}
                                        disabled={isSubmitting}
                                        className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                                    >
                                        Simpan Semua Perubahan
                                    </button>
                                </div>
                            </div>

                            {/* Materials List */}
                            <div className="bg-white border rounded-lg p-6">
                                <div className="flex justify-between items-center mb-4">
                                    <h2 className="text-lg font-semibold text-gray-800">Daftar Materi & Quiz</h2>
                                    <Link href={route('guru.material.create')} className="text-sm text-blue-600 hover:underline">+ Tambah Materi Baru</Link>
                                </div>

                                {lessons && lessons.length > 0 ? (
                                    <div className="overflow-x-auto">
                                        <table className="min-w-full divide-y divide-gray-200">
                                            <thead className="bg-gray-50">
                                                <tr>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Urutan</th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Judul</th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipe</th>
                                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
                                                </tr>
                                            </thead>
                                            <tbody className="bg-white divide-y divide-gray-200">
                                                {lessons.map((lesson) => (
                                                    <tr key={`${lesson.lesson_type}-${lesson.id}`}>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                            {lesson.order}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                            {lesson.title}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                            {lesson.lesson_type === 'quiz' ? (
                                                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-purple-100 text-purple-800">Quiz</span>
                                                            ) : (
                                                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                                                                    {lesson.material_type || 'Materi'}
                                                                </span>
                                                            )}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                            {lesson.lesson_type === 'material' && (
                                                                <button
                                                                    onClick={() => handleDeleteMaterial(lesson.id)}
                                                                    className="text-red-600 hover:text-red-900 ml-4"
                                                                >
                                                                    Hapus
                                                                </button>
                                                            )}
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                ) : (
                                    <p className="text-gray-500 text-center py-4">Belum ada materi atau quiz dalam kursus ini.</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}