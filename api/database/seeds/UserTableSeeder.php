<?php

use Illuminate\Database\Seeder;
use App\Role;
use App\User; 
class UserTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $role_admin = Role::where('name','admin')->first();

        $admin = new User();
        $admin->name = 'Administrator';
        $admin->email = 'evivas.86@gmail.com';
        $admin->password = bcrypt('admin');
        $admin->points = 0;
        $admin->save();
        $admin->roles()->attach($role_admin);
    }
}
