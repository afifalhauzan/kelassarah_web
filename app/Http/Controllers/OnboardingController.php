<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class OnboardingController extends Controller
{
    /**
     * Check the user's onboarding status.
     */
    public function status()
    {
        $user = auth()->user();
        
        return response()->json([
            'id' => $user->id,
            'has_completed_onboarding' => $user->has_completed_onboarding,
            'should_show_onboarding' => !$user->has_completed_onboarding
        ]);
    }

    /**
     * Mark the user's onboarding as complete.
     */
    public function complete()
    {
        // Update the column in the DB for the currently logged in user
        auth()->user()->update([
            'has_completed_onboarding' => true
        ]);

        return redirect()->back(); // Just redirect back
    }
}