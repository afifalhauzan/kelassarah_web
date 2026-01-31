<?php

require __DIR__ . '/vendor/autoload.php';

$app = require __DIR__ . '/bootstrap/app.php';

$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);

$kernel->bootstrap();

try {
    $failedJobs = \DB::table('failed_jobs')->count();
    $pendingJobs = \DB::table('jobs')->count();

    $output = json_encode([
        'failed_jobs' => $failedJobs,
        'pending_jobs' => $pendingJobs,
    ]);
    file_put_contents(__DIR__ . '/jobs_result.json', $output);
    echo "Done.\n";
} catch (\Exception $e) {
    file_put_contents(__DIR__ . '/jobs_result.json', json_encode(['error' => $e->getMessage()]));
}
