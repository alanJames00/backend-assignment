# Comic Book Store API - Documentation

## Deployed Base URL

```
    https://mng-api.alanj.live
```

## Live Postman Collection

```
    https://www.postman.com/solar-crescent-923203/workspace/mango-jelly
```

## Admin Routes

### Create A Comic Book

**POST /admin/comics**
**Request Body**:

```json
{
  "bookName": "Watchmen",
  "authorName": "Alan Moore",
  "yearOfPublication": 1987,
  "price": 22.99,
  "numberOfPages": 416,
  "condition": "used",
  "description": "A deconstruction of the superhero genre, set against the backdrop of the Cold War."
}
```

**Response**:

```json
{
  "id": 10,
  "bookName": "Watchmen",
  "authorName": "Alan Moore",
  "yearOfPublication": 1987,
  "price": 22.99,
  "numberOfPages": 416,
  "condition": "used",
  "description": "A deconstruction of the superhero genre, set against the backdrop of the Cold War.",
  "updatedAt": "2024-10-16T20:25:57.953Z",
  "createdAt": "2024-10-16T20:25:57.953Z"
}
```

### Update A Book By ID

**PUT /admin/comics/:id**
**Request Body**:

```json
{
  "bookName": "Watchmen2",
  "yearOfPublication": 1989
}
```

**Sample URL:**

    ```
    /admin/comics/10
    ```

**Response**:

```json
{
  "id": 10,
  "bookName": "Watchmen2",
  "authorName": "Alan Moore",
  "yearOfPublication": 1989,
  "price": 22.99,
  "numberOfPages": 416,
  "condition": "used",
  "description": "A deconstruction of the superhero genre, set against the backdrop of the Cold War.",
  "updatedAt": "2024-10-16T20:25:57.953Z",
  "createdAt": "2024-10-16T20:25:57.953Z"
}
```

### Delete A Book By ID

**DELETE /admin/comics/:id**
**Sample URL:**

    ```
    /admin/comics/10
    ```

## Book Inventory Routes

### Get All Books With Pagination, sorting, and filtering

**GET /comics**
**Query Parameters**:
\- page: number, default 1
\- limit: number, default 15
\- sortBy: string, field to sort by, default id
\- order: string, order to sort by, default ASC

**filtering**:
filtering can be done by adding query parameters with the field name and the value to filter by. For example, to filter by the author name, add a query parameter like this: `?authorName=Alan Moore`

**Sample URL:**

    ```
    /comics?page=1&limit=3&sortBy=yearOfPublication&order=DESC&authorName=Alan Moore
    ```

**Response**:

```json
{
  "page": 1,
  "limit": 3,
  "totalPages": 2,
  "totalBooks": 4,
  "results": [
    {
      "id": 4,
      "bookName": "V for Vendetta",
      "authorName": "Alan Moore",
      "yearOfPublication": 1988,
      "price": 19.99,
      "discount": 15.99,
      "numberOfPages": 296,
      "condition": "used",
      "description": "A dystopian political thriller about an anarchist hero fighting against a totalitarian regime.",
      "createdAt": "2024-10-17T09:07:34.526Z",
      "updatedAt": "2024-10-17T09:07:34.526Z"
    },
    {
      "id": 11,
      "bookName": "The Killing Joke",
      "authorName": "Alan Moore",
      "yearOfPublication": 1988,
      "price": 19.99,
      "discount": 14.99,
      "numberOfPages": 64,
      "condition": "new",
      "description": "A psychological thriller about the Joker's attempt to drive Commissioner Gordon insane.",
      "createdAt": "2024-10-17T09:07:35.447Z",
      "updatedAt": "2024-10-17T09:07:35.447Z"
    },
    {
      "id": 2,
      "bookName": "Watchmen",
      "authorName": "Alan Moore",
      "yearOfPublication": 1987,
      "price": 22.99,
      "discount": 19.99,
      "numberOfPages": 416,
      "condition": "used",
      "description": "A deconstruction of the superhero genre, set against the backdrop of the Cold War.",
      "createdAt": "2024-10-17T09:07:33.372Z",
      "updatedAt": "2024-10-17T09:07:33.372Z"
    }
  ]
}
```

### Get A Book By ID

**GET /comics/:id**

**Sample URL:**

    ```
    /comics/11
    ```

**Response**:

```json
{
  "id": 11,
  "bookName": "The Killing Joke",
  "authorName": "Alan Moore",
  "yearOfPublication": 1988,
  "price": 19.99,
  "discount": 14.99,
  "numberOfPages": 64,
  "condition": "new",
  "description": "A psychological thriller about the Joker's attempt to drive Commissioner Gordon insane.",
  "createdAt": "2024-10-17T09:07:35.447Z",
  "updatedAt": "2024-10-17T09:07:35.447Z"
}
```
