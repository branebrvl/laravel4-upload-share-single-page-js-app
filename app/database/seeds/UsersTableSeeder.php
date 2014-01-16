<?php

class UsersTableSeeder extends Seeder {

    public function run()
    {
        /* Uncomment the below to wipe the table clean before populating */
        DB::table('users')->truncate();
        DB::table('users')->delete();

        /* TODO Add admin user */
        $users = array(
            'email' => 'branislav.vladisavljev@evolvemediallc.com',
            'username' => 'brane',
            'password' => Hash::make('changeme!'),
            'name' => 'Branislav Vladisavljev',
            'url' => 'http://',
            'created_at' => new DateTime,
            'updated_at' => new DateTime
        );

        DB::table('users')->insert($users);

        $users = array(
            'email' => 'jairo.espinosa@evolvemediallc.com',
            'username' => 'jairo',
            'password' => Hash::make('changeme!'),
            'name' => 'Jairo Espinosa',
            'url' => 'http://',
            'created_at' => new DateTime,
            'updated_at' => new DateTime
        );

        DB::table('users')->insert($users);
    }

}
