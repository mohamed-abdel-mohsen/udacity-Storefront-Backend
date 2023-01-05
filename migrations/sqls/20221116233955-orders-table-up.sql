CREATE TABLE orders(
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES orders(id),
    order_status VARCHAR(50)
)