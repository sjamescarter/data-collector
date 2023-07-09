# myData Collector

This project is an app designed for teachers to write student goals and collect associated data. The frontend of this project uses ReactJS and is found in the client folder. The backend is a Rails API built in Ruby v2.7.4. 

## Setup
To get set up, run:
```
$ bundle install
$ npm install --prefix client
$ rails s
$ npm start --prefix client
```

## Database
This project uses PostgreSQL v9.3. The database has a many-to-many relationship of Users and Students through a joins table of Goals. The schema is as follows:

### users
```
id              varchar
email           string
password_digest string
first_name      string
last_name       string
job_title       string
created_at      timestamp
updated_at      timestamp
```

### students
```
id              varchar
first_name      string
last_name       string
grade_level     integer
created_at      timestamp
updated_at      timestamp
```

### goals
```
id              varchar
user_id         foreign_key
student_id      foreign_key
condition       string
behavior        string
accuracy        integer
measurement     string
trials_correct  integer
trials_total    integer
created_at      timestamp
updated_at      timestamp
```

## Seed Data
Seed data is commented out in the db/seeds.rb file. To use this data, uncomment the appropriate lines and run:
```
$ rails db:migrate db:seed
```

## Video
Find a video walk-through of this project here:
https://watch.screencastify.com/v/65yAMgs0Dq8ZcjkVvbU6