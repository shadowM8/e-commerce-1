# mini wp

## Simple E-Commerce

### E-Commerce web-app built with Mongoose, Express, and Vue-CLI

## EndPoint List

**user route**

Route|HTTP|Header(s)|Request|Description|Response
|---|---|---|---|---|---|
|/users/register|POST|none|`body`: `{ email: 'anton@mail.com', password: 'secret' , fullName: 'anton wibisono' }`|register for new user| `201`: `{ _id: ObjectId(''), email: 'anton@mail.com', password: 'HashedPassword' }`
|/users/login|POST|none|`body`: `{ email: 'anton@mail.com', password: 'secret'}`|endpoint for user login into app| `200`:`{token : ... }`

|/users/|GET|token|none|fetch all user data (authenticated user only)|`200`:`[{_id: ObjectId(''), email: 'dimitri@mail.com', password: 'HashedPassword'}, {_id: ObjectId(''), email: 'anton@mail.com', password: 'HashedPassword'} ]`

<br>

**product route**

Route|HTTP|Header(s)|Request|Description|Response
|---|---|---|---|---|---|
|/products/|POST|token|`body`: `{ name: 'product title', description: 'product short description' , price: 1000, stock: 5, seller: 'user.id' }`|create new product (registered user only)|`201`:`{ _id: ObjectId(''), name: 'product name', description: 'product short description' , price: 1000, stock: 5, seller: 'user.id'}`
|/products/|GET|token|`query`:`{name: 'searched title'}` | get all products  (registered user only)|`200`:`[{ _id: ObjectId(''),name: 'searched name, description: 'product short description' , price: 1000, stock: 5, seller: 'user.id'}, {...}]`
|/products/:id|GET|token|`params`:`{id: 'product id'}`| find specific product (registered user only)|`200`:`{ _id: ObjectId(''),name: 'searched name, description: 'product short description' , price: 1000, stock: 5, seller: 'user.id'}`
|/products/:id|PUT|token|`params`:`{id: 'product id'}`,`body`: `{ name: 'updated product name', description: ' updated product short description' , price: 'updated price', stock: 'updated stock' , seller: 'user.id' }` | update specific product (owner of specific task only)| `200`:`{ name: 'updated product name', description: ' updated product short description' , price: 'updated price', stock: 'updated stock' , seller: 'user.id' }`
|/products/:id|DELETE|token|`params`:`{id: 'product id'}`| delete specific product (owner of specific task only)|`200`:`{ name: 'deleted product name', description: ' deleted product short description' , price: 'deleted product price', ... }`

<br>

**cart route**

Route|HTTP|Header(s)|Request|Description|Response
|---|---|---|---|---|---|
|/carts/|POST|token|`body`:`{ product: 'product.id', quantity: 5, buyer: 'user.id' }`|create new cart|`201`:`{_id:ObjectId(''), quantity: 5, buyer:'user.id', checkout:false, confirmation: false}`
|/carts/|GET|token|none|get all carts|`200`:`[{_id:ObjectId(''),..},{..}]`
|/carts/|PATCH|token|none|change all carts checkout status to true|`200`:[`{_id:ObjectId(''), quantity: 5, buyer:'user.id', checkout:true,confirmation: false}`,`{_id:ObjectId(''), quantity: 4, buyer:'user.id', checkout:true,confirmation: false}`]
|/carts/:cartId|PATCH|token|`params`:`{cartId:'cart Id'}`|change cart confirmation status to true|`200`:`{_id:ObjectId(''), quantity: 5, buyer:'user.id', checkout:true,confirmation: true}`



**Usage:**

Make sure you have Node.js and npm installed in your computer, and then run these commands:

```
$ npm install
$ npm run dev
```
And don't forget to fill the .env file 
