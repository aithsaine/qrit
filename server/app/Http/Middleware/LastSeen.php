<?php

namespace App\Http\Middleware;

use App\Events\EmployeStatusUpdate;
use App\Http\Resources\EmployeeResource;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class LastSeen
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {

        if (auth()->check()) {
            $user = $request->user();
            $user->last_seen = now();
            $user->save();
            if($user->employee)
            {

                event(new EmployeStatusUpdate(new EmployeeResource($user->employee)));
            }
            // broadcast(new UpdateUserStatus($user));
        }
        return $next($request);
    }
}
