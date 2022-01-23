
# endpoints

- carts
| Method | Endpoint | Body | Returns | Auth |
| ------ | -------- | ---- | ------- | ---- |  
| GET | ``` /api/carts/ ``` | None | ``` [
  {
    "product_name": "Monstera Clay Earings",
    "image": "https://live.staticflickr.com/65535/51561477070_77b09350ba_b.jpg",
    "cart_item_id": -1,
    "user_id": -1,
    "product_id": -1,
    "quantity": 1000
  },
  {
    "product_name": "Wildflower Screen Print Clay Earings",
    "image": "https://live.staticflickr.com/65535/51561243964_7c0eb0c4b4_b.jpg",
    "cart_item_id": -2,
    "user_id": -1,
    "product_id": -2,
    "quantity": 1
  }
] ``` | loggedIn |
| POST | ``` /api/carts/create ``` | ``` { 
  "quantity": 3,
  "product_id": 1  
  } ``` | ``` {
    "cart_item_id" : 1, 
    "user_id": 1, 
    "product_id": 1, 
    "quantity": 1
  } ``` | loggedIn |
| PUT | ``` /api/carts/update/:cart_item_id ``` | ``` {
  "quantity": 1
} ``` | ``` {
  "cart_item_id" : 1, 
  "user_id": 1, 
  "product_id": 1, 
    "quantity": 1
} ``` | loggedIn |
| DELETE | ``` /api/carts/:cart_item_id ``` | None | ``` {
  "cart_item_id" : 1, 
  "user_id": 1, 
  "product_id": 1, 
  "quantity": 1
} ``` | loggedIn |



- products
- users