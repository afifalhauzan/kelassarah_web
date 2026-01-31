import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm, usePage } from "@inertiajs/react"; // Added useForm
import { useState } from 'react';
import InputLabel from "@/Components/ui/InputLabel";
import TextInput from "@/Components/ui/TextInput";
import PrimaryButton from "@/Components/ui/PrimaryButton";
import InputError from "@/Components/ui/InputError";
import Checkbox from "@/Components/ui/Checkbox";

export default function TambahMateri({ courses = [] }) {
    const { auth, flash } = usePage().props; // Get flash messages

    const { data, setData, post, processing, errors, reset } = useForm({
        course_id: '',
        title: '',
        type: 'text', // text, video, document
        content: '',
        content_url: null,
        subtitle_url: null,
        order: 1,
        is_published: true,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('guru.material.store'), {
            onSuccess: () => {
                reset('title', 'content', 'content_url', 'subtitle_url', 'order');
                // Keep course_id and type for convenience? Maybe reset all.
            },
        });
    };

    return (
        <AuthenticatedLayout>
            <Head title="Tambah Materi" />

            <div className="py-8">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 md:p-8 text-gray-900">
                            <h1 className="text-3xl font-bold text-gray-800 mb-6">
                                Tambah Materi Baru
                            </h1>

                            {flash?.message && (
                                <div className="mb-4 p-4 bg-green-100 text-green-700 rounded-lg">
                                    {flash.message}
                                </div>
                            )}

                            {flash?.error && (
                                <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg">
                                    {flash.error}
                                </div>
                            )}

                            <form onSubmit={submit} className="space-y-6">
                                {/* Course Selection */}
                                <div>
                                    <InputLabel htmlFor="course_id" value="Pilih Kursus" />
                                    <select
                                        id="course_id"
                                        name="course_id"
                                        className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                        value={data.course_id}
                                        onChange={(e) => setData('course_id', e.target.value)}
                                        required
                                    >
                                        <option value="">-- Pilih Kursus --</option>
                                        {courses.map((course) => (
                                            <option key={course.id} value={course.id}>
                                                {course.title}
                                            </option>
                                        ))}
                                    </select>
                                    <InputError message={errors.course_id} className="mt-2" />
                                </div>

                                {/* Title */}
                                <div>
                                    <InputLabel htmlFor="title" value="Judul Materi" />
                                    <TextInput
                                        id="title"
                                        type="text"
                                        name="title"
                                        value={data.title}
                                        className="mt-1 block w-full"
                                        isFocused={true}
                                        onChange={(e) => setData('title', e.target.value)}
                                        required
                                    />
                                    <InputError message={errors.title} className="mt-2" />
                                </div>

                                {/* Order */}
                                <div>
                                    <InputLabel htmlFor="order" value="Urutan" />
                                    <TextInput
                                        id="order"
                                        type="number"
                                        name="order"
                                        value={data.order}
                                        className="mt-1 block w-full md:w-1/4"
                                        onChange={(e) => setData('order', e.target.value)}
                                        required
                                    />
                                    <InputError message={errors.order} className="mt-2" />
                                </div>

                                {/* Type Selection */}
                                <div>
                                    <InputLabel htmlFor="type" value="Tipe Materi" />
                                    <div className="mt-2 flex space-x-4">
                                        <label className="inline-flex items-center">
                                            <input
                                                type="radio"
                                                className="form-radio"
                                                name="type"
                                                value="text"
                                                checked={data.type === 'text'}
                                                onChange={(e) => setData('type', e.target.value)}
                                            />
                                            <span className="ml-2">Teks Bacaan</span>
                                        </label>
                                        <label className="inline-flex items-center">
                                            <input
                                                type="radio"
                                                className="form-radio"
                                                name="type"
                                                value="video"
                                                checked={data.type === 'video'}
                                                onChange={(e) => setData('type', e.target.value)}
                                            />
                                            <span className="ml-2">Video</span>
                                        </label>
                                        <label className="inline-flex items-center">
                                            <input
                                                type="radio"
                                                className="form-radio"
                                                name="type"
                                                value="document"
                                                checked={data.type === 'document'}
                                                onChange={(e) => setData('type', e.target.value)}
                                            />
                                            <span className="ml-2">Dokumen (PDF)</span>
                                        </label>
                                    </div>
                                    <InputError message={errors.type} className="mt-2" />
                                </div>

                                {/* Conditional Fields based on Type */}
                                {data.type === 'text' && (
                                    <div>
                                        <InputLabel htmlFor="content" value="Isi Materi (Teks)" />
                                        <textarea
                                            id="content"
                                            name="content"
                                            rows="10"
                                            className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                            value={data.content}
                                            onChange={(e) => setData('content', e.target.value)}
                                        ></textarea>
                                        <InputError message={errors.content} className="mt-2" />
                                    </div>
                                )}

                                {(data.type === 'video' || data.type === 'document') && (
                                    <div>
                                        <InputLabel htmlFor="content_url" value={data.type === 'video' ? 'Upload Video' : 'Upload Dokumen'} />
                                        <input
                                            id="content_url"
                                            type="file"
                                            className="mt-1 block w-full text-sm text-gray-500
                                                file:mr-4 file:py-2 file:px-4
                                                file:rounded-full file:border-0
                                                file:text-sm file:font-semibold
                                                file:bg-blue-50 file:text-blue-700
                                                hover:file:bg-blue-100"
                                            onChange={(e) => setData('content_url', e.target.files[0])}
                                            accept={data.type === 'video' ? "video/*" : "application/pdf"}
                                        />
                                        <InputError message={errors.content_url} className="mt-2" />
                                        {data.type === 'video' && <p className="text-xs text-gray-500 mt-1">Format: MP4, WebM. Maks 100MB.</p>}
                                        {data.type === 'document' && <p className="text-xs text-gray-500 mt-1">Format: PDF. Maks 20MB.</p>}
                                    </div>
                                )}

                                {/* Subtitle (Only for Video) */}
                                {data.type === 'video' && (
                                    <div>
                                        <InputLabel htmlFor="subtitle_url" value="Upload Subtitle (Subtitle/VTT) - Opsional" />
                                         <input
                                            id="subtitle_url"
                                            type="file"
                                            className="mt-1 block w-full text-sm text-gray-500
                                                file:mr-4 file:py-2 file:px-4
                                                file:rounded-full file:border-0
                                                file:text-sm file:font-semibold
                                                file:bg-blue-50 file:text-blue-700
                                                hover:file:bg-blue-100"
                                            onChange={(e) => setData('subtitle_url', e.target.files[0])}
                                            accept=".vtt,.srt"
                                        />
                                        <InputError message={errors.subtitle_url} className="mt-2" />
                                    </div>
                                )}

                                {/* Published Checkbox */}
                                <div className="block">
                                    <label className="flex items-center">
                                        <Checkbox
                                            name="is_published"
                                            checked={data.is_published}
                                            onChange={(e) => setData('is_published', e.target.checked)}
                                        />
                                        <span className="ms-2 text-sm text-gray-600">Publikasikan Materi Ini</span>
                                    </label>
                                </div>

                                <div className="flex items-center justify-end mt-4">
                                    <PrimaryButton className="ms-4" disabled={processing}>
                                        Simpan Materi
                                    </PrimaryButton>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
