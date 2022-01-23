
# endpoints

## Carts
| Method | Endpoint | Body | Returns | Auth |
| --- | --- | --- | --- | --- |  
| GET | ``` /api/carts/ ``` | None | ``` [{ "product_name": "Monstera Clay Earings", "image": "https://live.staticflickr.com/65535/51561477070_77b09350ba_b.jpg", "cart_item_id": -1, "user_id": -1, "product_id": -1, "quantity": 1000 }] ``` | loggedIn |
| POST | ``` /api/carts/create ``` | ``` { "quantity": 3, "product_id": 1  } ``` | ``` { "cart_item_id" : 1, "user_id": 1, "product_id": 1, "quantity": 1 } ``` | loggedIn |
| PUT | ``` /api/carts/update/:cart_item_id ``` | ``` { "quantity": 1 } ``` | ``` { "cart_item_id" : 1,  "user_id": 1, "product_id": 1, "quantity": 1 } ``` | loggedIn |
| DELETE | ``` /api/carts/:cart_item_id ``` | None | ``` { "cart_item_id" : 1, "user_id": 1, "product_id": 1,"quantity": 1 } ``` | loggedIn |

## Products
| Method | Endpoint | Body | Returns | Auth |
| --- | --- | --- | --- | --- |  
| GET | ``` /api/products/category ``` | None | ``` [{ "category_id": 1, "category_name": "name" }] ``` | none |
| GET | ``` /api/products/products ``` | None | ``` [{"product_id": -2,"product_name": "Wildflower Screen Print Clay Earings","stock": 100,"details": "","price": 20,"category_id": -1,"image": "https://live.staticflickr.com/65535/51561243964_7c0eb0c4b4_b.jpg","category": "Accessories"}] ``` | None| 
| POST | ``` /api/products/create ``` | ``` { "quantity": 1 } ``` | ``` { "category_name": "name" } ``` | admin |
| GET | ``` /api/products/category/products ``` | None | ``` [{ "category_id": 1, "category_name": "name", "products": [{ "product_id": 1, "product_name": "name", "stock": 1, "details": "details", "price": 10, "image": "url" }] }] ``` | None |
| POST | ``` /api/products/category ``` | ``` { "category_name": "name" } ```| ``` { "category_id": 1, "category_name": "name" } ``` | admin |


## Users

| Method | Endpoint | Body | Returns | Auth |
| --- | --- | --- | --- | --- | 
| GET | ``` /api/users/ ``` | None |```[{"user_id": -1,"email": "fake@fake.com","password": "$2b$08$JkVSJh3w1DJF34RQO/chceMvPeMuAboeR3o/8T2R7nhxbICo/jja6","first_name": "John","last_name": "Doe","admin": false,"created_at": "2022-01-23T00:36:07.436Z","updated_at": "2022-01-23T00:36:07.436Z"}] ``` | None |
| POST | ``` /api/users/login ``` | ``` { "email": "fake@fake.com", "password": "password" } ``` | ``` { "token" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9eyJzdWJqZWN0IjotMSwiZW1haWwiOiJmYWtlQGZha2UuY29tIiwicGFzc3dvcmQiOiIkMmIkMDgkSmtWU0poM3cxREpGMzRSUU8vY2hjZU12UGVNdUFib2VSM28vOFQyUjduaHhiSUNvL2pqYTYiLCJpYXQiOjE2NDI5MDEwMDAsImV4cCI6MTY0Mjk4NzQwMH0.1jCVrUz_SZuCQIsghu2hXJpuCSbuyqVdpIgPIqrQXco" } ```| None | 
| POST | ``` /api/users/create ``` | ``` { "email": "email@email.com", "password": "password", "first_name":  "first_name", "last_name": "last_name" } ``` | ``` { "email": "email@email.com", "password": "password", "first_name":  "first_name", "last_name": "last_name", "admin": false, "user_id": 1 } ``` | None |