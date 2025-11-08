<?php

namespace App\Http\Controllers;

use App\Models\Material;
use Illuminate\Http\Request;

class MaterialController extends Controller
{
    public function index($courseID)
    {
        $materials = Material::where('course_id', $courseID)
            ->where('is_published', 1)
            ->with('course')
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
        ]);

        $validated['course_id'] = $courseID;

        $material = Material::create($validated);

        return response()->json($material, 201);
    }

    public function show($courseID, $id)
    {
        $material = Material::with('course')->where('course_id', $courseID)->findOrFail($id);
        return response()->json($material);
    }

    public function update(Request $request, $courseID, $id)
    {
        $material = Material::with('course')->where('course_id', $courseID)->findOrFail($id);

        $validated = $request->validate([
            'course_id' => 'sometimes|required|exists:courses,id',
            'title' => 'sometimes|required|string|max:255',
            'content' => 'sometimes|nullable|string',
            'order' => 'sometimes|required|integer',
            'is_published' => 'sometimes|nullable|boolean',
        ]);

        $material->update($validated);

        return response()->json($material);
    }

    public function destroy($courseID, $id)
    {
        $material = Material::with('course')->where('course_id', $courseID)->findOrFail($id);
        $material->delete();
        return response()->json(null, 204);
    }
}
