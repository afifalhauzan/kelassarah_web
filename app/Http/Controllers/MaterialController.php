<?php

namespace App\Http\Controllers;

use App\Models\Material;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class MaterialController extends Controller
{
    public function index($courseID)
    {
        $materials = Material::where('is_published', 1)
            ->whereHas('course', function ($query) {
                $query->where('is_published', 1);
            })
            ->with('course')
            ->where('course_id', $courseID)
            ->orderBy('order', 'asc')
            ->get();

        return response()->json($materials);
    }

    public function store(Request $request, $courseID)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'nullable|string',
            'order' => 'required|integer',
            'is_published' => 'nullable|boolean',
            'type' => 'sometimes|in:text,video,document',
            'content_url' => 'sometimes|nullable|file',  
            'subtitle_url' => 'sometimes|nullable|file', 
        ]);

       try {
            $material = DB::transaction(function () use ($validated, $request, $courseID) {
                if ($validated['type'] !== 'text') {
                    if ($request->hasFile('content_url')) {
                        $pathContentURL = $request->file('content_url')->store('materials', 'public');
                        $validated['content_url'] = $pathContentURL;
                    }

                    if ($request->hasFile('subtitle_url')) {
                        $pathSubtitleURL = $request->file('subtitle_url')->store('materials', 'public');
                        $validated['subtitle_url'] = $pathSubtitleURL;
                    }
                }

                $validated['course_id'] = $courseID;

                return Material::create($validated);
            });

            DB::commit();
            
            return response()->json([
                'success' => true,
                'message' => 'Material berhasil disimpan.',
                'data' => $material
            ], 201);

        } catch (\Throwable $e) {
            DB::rollBack();

            if (!empty($validated['content_url']) && Storage::disk('public')->exists($validated['content_url'])) {
                Storage::disk('public')->delete($validated['content_url']);
            }
            if (!empty($validated['subtitle_url']) && Storage::disk('public')->exists($validated['subtitle_url'])) {
                Storage::disk('public')->delete($validated['subtitle_url']);
            }

            return response()->json([
                'success' => false,
                'message' => 'Gagal menyimpan material: ' . $e->getMessage(),
            ], 500);
        }
    }

    public function show($courseID, $id)
    {
        $material = Material::with('course')->where('course_id', $courseID)->findOrFail($id);
        return response()->json($material);
    }

    public function update(Request $request, $courseID, $id)
    {
        $material = Material::with('course')
            ->where('course_id', $courseID)
            ->findOrFail($id);

        $validated = $request->validate([
            'course_id' => 'sometimes|required|exists:courses,id',
            'title' => 'sometimes|required|string|max:255',
            'content' => 'sometimes|nullable|string',
            'order' => 'sometimes|required|integer',
            'is_published' => 'sometimes|nullable|boolean',
            'type' => 'sometimes|in:text,video,document',
            'content_url' => 'sometimes|nullable',
            'subtitle_url' => 'sometimes|nullable',
        ]);

        $oldContent = $material->content_url;
        $oldSubtitle = $material->subtitle_url;

        try {
            DB::beginTransaction();

            if (($validated['type'] ?? $material->type) !== 'text') {
                if ($request->hasFile('content_url')) {
                    $newContent = $request->file('content_url')->store('materials', 'public');
                    $validated['content_url'] = $newContent;
                }

                if ($request->hasFile('subtitle_url')) {
                    $newSubtitle = $request->file('subtitle_url')->store('materials', 'public');
                    $validated['subtitle_url'] = $newSubtitle;
                }
            }

            $material->update($validated);

            DB::commit();

            if (isset($validated['content_url']) && $oldContent && Storage::disk('public')->exists($oldContent)) {
                Storage::disk('public')->delete($oldContent);
            }

            if (isset($validated['subtitle_url']) && $oldSubtitle && Storage::disk('public')->exists($oldSubtitle)) {
                Storage::disk('public')->delete($oldSubtitle);
            }

            return response()->json([
                'success' => true,
                'message' => 'Material berhasil diperbarui.',
                'data' => $material
            ]);
        } catch (\Throwable $e) {
            DB::rollBack();

            if (!empty($validated['content_url']) && Storage::disk('public')->exists($validated['content_url'])) {
                Storage::disk('public')->delete($validated['content_url']);
            }
            if (!empty($validated['subtitle_url']) && Storage::disk('public')->exists($validated['subtitle_url'])) {
                Storage::disk('public')->delete($validated['subtitle_url']);
            }

            return response()->json([
                'success' => false,
                'message' => 'Gagal update material: ' . $e->getMessage(),
            ], 500);
        }
    }

    public function destroy($courseID, $id)
    {
        $material = Material::with('course')->where('course_id', $courseID)->findOrFail($id);
        $material->delete();
        if ($material->type !== "text") {
            if ($material->content_url && Storage::disk('public')->exists($material->content_url)) {
                Storage::disk('public')->delete($material->content_url);
            }
            if ($material->subtitle_url && Storage::disk('public')->exists($material->subtitle_url)) {
                Storage::disk('public')->delete($material->subtitle_url);
            }
        }
        return response()->json(null, 204);
    }
}