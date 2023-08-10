<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Inertia\Testing\Concerns\Has;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Student>
 */
class StudentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
      return [
        'username' => $this->faker->userName,
        'name' => $this->faker->name,
        'email' => $this->faker->email,
        'password' => Hash::make('0552320541'),
        'national_id' => 2222111133335555,
        'address' => $this->faker->address,
        'arabic_name' => $this->faker->name,
        'phone' => 111111,
        'department' => 1,
        'university_email' => $this->faker->email,
        'university_code' => 10,
      ];
    }
}
