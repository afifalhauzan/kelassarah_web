<?php

namespace Tests\Feature;

use App\Models\User;
use App\Models\Course;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Queue;
use Tests\TestCase;

class BotTest extends TestCase
{
    use RefreshDatabase;

    public function test_spam_chat_messages()
    {
        // Disable job queue to prevent actual OpenAI processing during test
        Queue::fake();
        
        // Create a user with specific ID 1
        $user = User::factory()->create([
            'id' => 1,
            'name' => 'Test User',
            'email' => 'test@example.com'
        ]);
        
        // Create a course with specific ID 1
        $course = Course::factory()->create([
            'id' => 1,
            'title' => 'Test Course',
            'description' => 'Test course for spam testing'
        ]);
        
        // Act as the user
        $this->actingAs($user);
        
        echo "Starting to send 50 messages...\n";
        
        $successCount = 0;
        $errorCount = 0;
        
        // Send 50 messages rapidly
        for ($i = 1; $i <= 50; $i++) {
            try {
                $response = $this->postJson('/chat/1', [
                    'content' => "Test message number {$i} - spam test for load testing",
                    'user_id' => 1
                ]);
                
                if ($response->getStatusCode() >= 200 && $response->getStatusCode() < 300) {
                    $successCount++;
                    echo "✓ Message {$i} sent successfully\n";
                } else {
                    $errorCount++;
                    echo "✗ Message {$i} failed with status: {$response->getStatusCode()}\n";
                }
                
            } catch (\Exception $e) {
                $errorCount++;
                echo "✗ Message {$i} failed with exception: {$e->getMessage()}\n";
            }
            
            // Small delay to prevent overwhelming the system
            usleep(10000); // 10ms delay
        }
        
        echo "\n=== SPAM TEST COMPLETED ===\n";
        echo "Total messages sent: 50\n";
        echo "Successful: {$successCount}\n";
        echo "Failed: {$errorCount}\n";
        echo "Check logs for ProcessOpenAIResponse jobs and database entries\n";
        
        // Assert that at least some messages were successful
        $this->assertTrue($successCount > 0, "At least some messages should be successful");
    }
}