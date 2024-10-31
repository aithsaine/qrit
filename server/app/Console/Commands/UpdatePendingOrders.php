<?php

namespace App\Console\Commands;

use App\Models\Order;
use Carbon\Carbon;
use Illuminate\Console\Command;

class UpdatePendingOrders extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'orders:update-pending';
    
    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Update orders that are pending for one hour or more to deleted status';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $threshold = Carbon::now()->subHour();

        // Update the orders
        Order::where('status', 'pending')
            ->where('created_at', '<=', $threshold)
            ->update(['status' => 'deleted']);
            
            
        $this->info('Pending orders older than one hour have been updated to deleted status.');

    }
}
