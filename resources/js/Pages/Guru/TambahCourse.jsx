import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router, usePage } from "@inertiajs/react";
import { useState } from 'react';

export default function TambahCourse({ courses = [] }) {
    const { flash } = usePage().props;
    const message = flash?.message;
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        order: '',
        is_published: false,
        knowledge_prompt: '',
        welcome_message: '',
        thumbnail_url: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleCreateSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        router.post(route('guru.course.store'), formData, {
            onSuccess: () => {
                setShowCreateForm(false);
                setFormData({
                    title: '',
                    description: '',
                    order: '',
                    is_published: false,
                    knowledge_prompt: '',
                    welcome_message: '',
                    thumbnail_url: ''
                });
                setIsSubmitting(false);
            },
            onError: () => {
                setIsSubmitting(false);
            }
        });
    };

    const handleDelete = (courseId) => {
        if (confirm('Apakah Anda yakin ingin menghapus kursus ini?')) {
            router.delete(route('guru.course.destroy', courseId));
        }
    };

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    return (
        <AuthenticatedLayout>
            <Head title="Kelola Kursus" />

            <div className="py-8">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 md:p-8">
                            {/* Header */}
                            <div className="flex justify-between items-center mb-6">
                                <div>
                                    <h1 className="text-2xl font-bold text-gray-800">Kursus</h1>
                                    <p className="text-sm text-gray-500">1 - {courses.length} dari {courses.length}</p>
                                </div>
                                <button
                                    onClick={() => setShowCreateForm(!showCreateForm)}
                                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                    </svg>
                                    Tambah Kursus
                                </button>
                            </div>

                            {/* Success Message */}
                            {message && (
                                <div className="mb-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
                                    {message}
                                </div>
                            )}

                            {/* Create Form */}
                            {showCreateForm && (
                                <div className="mb-6 p-4 border rounded-lg bg-gray-50">
                                    <h3 className="text-lg font-semibold mb-4">Tambah Kursus Baru</h3>
                                    <form onSubmit={handleCreateSubmit} className="space-y-4">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Judul</label>
                                                <input
                                                    type="text"
                                                    name="title"
                                                    value={formData.title}
                                                    onChange={handleInputChange}
                                                    required
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Urutan</label>
                                                <input
                                                    type="number"
                                                    name="order"
                                                    value={formData.order}
                                                    onChange={handleInputChange}
                                                    required
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Deskripsi</label>
                                            <textarea
                                                name="description"
                                                value={formData.description}
                                                onChange={handleInputChange}
                                                rows={3}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">URL Thumbnail</label>
                                            <input
                                                type="text"
                                                name="thumbnail_url"
                                                value={formData.thumbnail_url}
                                                onChange={handleInputChange}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                        </div>
                                        <div className="flex items-center">
                                            <input
                                                type="checkbox"
                                                name="is_published"
                                                checked={formData.is_published}
                                                onChange={handleInputChange}
                                                className="mr-2"
                                            />
                                            <label className="text-sm font-medium text-gray-700">Terbitkan</label>
                                        </div>
                                        <div className="flex gap-2">
                                            <button
                                                type="submit"
                                                disabled={isSubmitting}
                                                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg disabled:opacity-50"
                                            >
                                                {isSubmitting ? 'Membuat...' : 'Buat Kursus'}
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => setShowCreateForm(false)}
                                                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg"
                                            >
                                                Batal
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            )}

                            {/* Course Table */}
                            <div className="overflow-x-auto">
                                <table className="min-w-full">
                                    <thead>
                                        <tr className="border-b">
                                            <th className="text-left py-3 px-4 font-medium text-gray-700">No</th>
                                            <th className="text-left py-3 px-4 font-medium text-gray-700">Nama Kursus</th>
                                            <th className="text-left py-3 px-4 font-medium text-gray-700">Deskripsi</th>
                                            <th className="text-left py-3 px-4 font-medium text-gray-700">Urutan</th>
                                            <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th>
                                            <th className="text-left py-3 px-4 font-medium text-gray-700">Aksi</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {courses.length > 0 ? (
                                            courses.map((course, index) => (
                                                <tr key={course.id} className={index % 2 === 0 ? 'bg-blue-50' : 'bg-white'}>
                                                    <td className="py-3 px-4 text-gray-900">{index + 1}.</td>
                                                    <td className="py-3 px-4 text-gray-900">{course.title}</td>
                                                    <td className="py-3 px-4 text-gray-700">
                                                        {course.description ? 
                                                            (course.description.length > 50 ? 
                                                                course.description.substring(0, 50) + '...' : 
                                                                course.description
                                                            ) : 
                                                            '-'
                                                        }
                                                    </td>
                                                    <td className="py-3 px-4 text-gray-900">{course.order}</td>
                                                    <td className="py-3 px-4">
                                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                                            course.is_published 
                                                                ? 'bg-green-100 text-green-800' 
                                                                : 'bg-red-100 text-red-800'
                                                        }`}>
                                                            {course.is_published ? 'Terbit' : 'Draft'}
                                                        </span>
                                                    </td>
                                                    <td className="py-3 px-4">
                                                        <div className="flex gap-2">
                                                            <Link
                                                                href={route('guru.course.edit', course.id)}
                                                                className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg transition-colors"
                                                            >
                                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                                </svg>
                                                            </Link>
                                                            <button
                                                                onClick={() => handleDelete(course.id)}
                                                                className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg transition-colors"
                                                            >
                                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                                </svg>
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan={6} className="py-8 text-center text-gray-500">
                                                    Belum ada kursus. Silakan tambah kursus baru.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
