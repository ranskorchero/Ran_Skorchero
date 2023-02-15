IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'users')
BEGIN
  CREATE TABLE users (
    name VARCHAR(255),
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL PRIMARY KEY
  );
END;

IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'routes')
BEGIN
  CREATE TABLE aritcles (
    name NVARCHAR(255) NOT NULL PRIMARY KEY,
    type VARCHAR(255) NOT NULL,
    text VARCHAR(1000) NOT NULL
  );

INSERT INTO articles (name, type)
  VALUES 
    ('The Mind/Brain Identity Theory', 'philosophy' ,'plato’s “Allegory of the Cave” is one of the most well-known philosophical concepts in history.As such, it only makes sense that numerous filmmakers would try to incorporate this philosophy into their movies. But what exactly is it?'),
    


END