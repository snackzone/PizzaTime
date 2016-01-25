#Schema Information

##restaurant
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
name        | string    | not null, indexed
address     | text      | not null
lat         | float     | not null
lng         | float     | not null
price range | integer   | not null, 1-4
website     | string    |
photo url   | string    | unique if not null

##user
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
fname       | string    | not null
lname       | string    | not null
email       | string    | not null, unique, indexed
zip         | string    | not null
pass. digest| string    | not null
sess. token | string    | not null
avatar      | string    |

##review
column name   | data type | details
--------------|-----------|-----------------------
id            | integer   | not null, primary key
user id       | integer   | not null, foreign key
restaurant id | integer   | not null, foreign key
stars         | integer   | not null, 1-5
body          | text      | not null

##photo  
column name   | data type | details
--------------|-----------|-----------------------
id            | integer   | not null, primary key
user id       | integer   | not null, foreign key
restaraunt id | integer   | not null, foreign key
cloud url     | string    | not null. unique

##restaurant category / tag (join table)
column name   | data type | details
--------------|-----------|-----------------------
id            | integer   | not null, primary key
restaurant id | integer   | not null, primary key
category id   | integer   | not null, primary key

##category / tag
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
title       | string    | not null, unique

##cool votes (bonus)
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
review id   | integer   | not null, foreign key
voter id    | integer   | not null, foreign key, unique
vote for    | string    | not null, validates among funny, useful, cool

##follows (bonus)
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
follower id | integer   | not null, foreign key
followed id | integer   | not null, foreign key
