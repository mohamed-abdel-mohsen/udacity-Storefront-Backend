CREATE TABLE order_products (
    id SERIAL PRIMARY KEY,
    quntity INTEGER,
    order_id bigint REFERENCES orders(id),
    product_id bigint REFERENCES product(id)
)