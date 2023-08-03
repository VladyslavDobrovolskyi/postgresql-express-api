create TABLE positions (
  id SERIAL PRIMARY KEY, 
  name VARCHAR(255)
)

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  email VARCHAR(255),
  phone VARCHAR(255),
  photo VARCHAR(255),
  position_id INTEGER,
  registration_timestamp BIGINT,
  FOREIGN KEY (position_id) REFERENCES positions(id)
);


