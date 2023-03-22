# Softdesign books

This project started on 03/16 with the purpose of attesting my knowledge in *javascript*, *node*, *express*, *MongoDB* and *Redis*. As well as other more general knowledge.

## Host

To run this system it is necessary to have:

- Docker
- Docker Compose

## Deploy

To deploy all required software, you must have system **ports** **8088**, **27017**, and **6379** available. Otherwise, some services will not run and the system will not work properly.
Run these statments on terminal.

```bash
# Linux steps
git clone https://github.com/zejustinn/softdesign.git
# Authentication may be requested
cd softdesign
docker-compose up -d
```

## Endpoints

All endpoints have the same pattern for responding to requests. So, regardless of the status code, you can conclude the result from the received response.

**Sucess responses**
Receiving responses with a body similar to this can be interpreted as a successful operation.

```json
// Success response example
{
  "data": {
    // endpoint related data
  }
}

```

**Error responses**
Receiving responses with a body similar to this could be interpreted as a unsuccessful operation.

```json
// Error response example
{
  "error": {
    "message": // Message related to the problem that occurred
  }
}
```

### POST /auth

Endpoint used to authenticate the user. It should be used to get the user token among other endpoints.

Body

| Field | Type | Description
|-|-|-|
|email| *string* | ***REQUIRED***. User email.|
|password| *string* | ***REQUIRED***. User password. |

```json
// Request body example
{
  "email": "jose.test@email.com",
  "password": "josepassword"
}
```

```json
// Success response body example
{
  "data": {
    "user": {
      "id": "6418fd971951f903bf15566b",
      "email": "jose.test@email.com",
      "name": "Jose",
      "profile": "librarian"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MThmZDk3MTk1MWY5MDNiZjE1NTY2YiIsIm5hbWUiOiJKb3NlIiwiZW1haWwiOiJqb3NlLnRlc3RAZW1haWwuY29tIiwicHJvZmlsZSI6ImxpYnJhcmlhbiIsImlhdCI6MTY3OTQ0ODcyNSwiZXhwIjoxNjc5NDUyMzI1fQ.zkeOr94we-j5Lz8CkVyt1lPxsv7RPXHyp_Y1XrXaY-o"
  }
}
```

```json
// Error response body example
{
  "error": {
    "message": "Authentication failed."
  }
}
```

### GET /books

Endpoint used to get all books registered in the database

> The maximum quantity returned(per page) is 10

Query parameters

| Field | Type | Description
|-|-|-|
|title| *string* | Book's name. |
|description| *string* | Short description of the book. |
|author| *string* | Book writer. |
|genre| *string* | Book genre. |
|isRented| *boolean* | State of the book. If it is rented or not. |
|numberPerPage| *number* | Number of books returned per server response. |
|pageNumber| *number* | Page number fetched from server server response. |

Headers

| Field | Type | Description
|-|-|-|
|Authorization| *string* | ***REQUIRED*** |

```json
// Success response body example
{
  "data": {
    "pages": 1,
    "quantity": 5,
    "pageNumber": 1,
    "numberPerPage": 10,
    "books": [
      {
        "id": "6418fd971951f903bf155673",
        "title": "Harry Potter and the Half-Blood Prince",
        "isRented": false
      }
    ]
  }
}
```

```json
// Error response body example
{
  "error": {
    "message": "Invalid token. Make sure the token stays valid."
  }
}
```

### GET /books/:id

Endpoint used to get all data related to a specific book.

Parameters

| Field | Type | Description
|-|-|-|
|id| *ObjectID* | ***REQUIRED*** |

Headers

| Field | Type | Description
|-|-|-|
|Authorization| *string* | ***REQUIRED*** |

```json
// Success response body example
{
  "data": {
    "id": "6418fd971951f903bf155673",
    "title": "Harry Potter and the Half-Blood Prince",
    "description": "Harry Potter and the Half-Blood Prince is a fantasy novel written by British author J. K. Rowling and the sixth and penultimate novel in the Harry Potter series. Set during Harry Potter's sixth year at Hogwarts, the novel explores the past of the boy wizard's nemesis, Lord Voldemort, and Harry's preparations for the final battle against Voldemort alongside his headmaster and mentor Albus Dumbledore.",
    "author": "J. K. Rowling",
    "genre": "Fantasy",
    "isRented": false
  }
}
```

```json
// Error response body example
{
  "error": {
    "message": "Invalid token. Make sure the token stays valid."
  }
}
```

### POST /books/:id/rent

Endpoint used to rent a book.

Parameters

| Field | Type | Description
|-|-|-|
|id| *ObjectID* | ***REQUIRED*** |

Headers

| Field | Type | Description
|-|-|-|
|Authorization| *string* | ***REQUIRED*** |

```json
// Success response body example
{
  "data": {
    "id": "6418fd971951f903bf155673",
    "title": "Harry Potter and the Half-Blood Prince",
    "description": "Harry Potter and the Half-Blood Prince is a fantasy novel written by British author J. K. Rowling and the sixth and penultimate novel in the Harry Potter series. Set during Harry Potter's sixth year at Hogwarts, the novel explores the past of the boy wizard's nemesis, Lord Voldemort, and Harry's preparations for the final battle against Voldemort alongside his headmaster and mentor Albus Dumbledore.",
    "author": "J. K. Rowling",
    "genre": "Fantasy",
    "isRented": true
  }
}
```

```json
// Error response body example
{
  "error": {
    "message": "Invalid token. Make sure the token stays valid."
  }
}
```

### POST /books/:id/returnRented

Endpoint used to return a rented book.

Parameters

| Field | Type | Description
|-|-|-|
|id| *ObjectID* | ***REQUIRED*** |

Headers

| Field | Type | Description
|-|-|-|
|Authorization| *string* | ***REQUIRED*** |

```json
// Success response body example
{
  "data": {
    "id": "6418fd971951f903bf155673",
    "title": "Harry Potter and the Half-Blood Prince",
    "description": "Harry Potter and the Half-Blood Prince is a fantasy novel written by British author J. K. Rowling and the sixth and penultimate novel in the Harry Potter series. Set during Harry Potter's sixth year at Hogwarts, the novel explores the past of the boy wizard's nemesis, Lord Voldemort, and Harry's preparations for the final battle against Voldemort alongside his headmaster and mentor Albus Dumbledore.",
    "author": "J. K. Rowling",
    "genre": "Fantasy",
    "isRented": false
  }
} 
```

```json
// Error response body example
{
  "error": {
    "message": "Invalid token. Make sure the token stays valid."
  }
}
```

### POST /books

Endpoint used to create a new book.

Headers

| Field | Type | Description
|-|-|-|
|Authorization| *string* | ***REQUIRED*** |

Body

| Field | Type | Description
|-|-|-|
|title| *string* | ***REQUIRED***. Book's name. |
|description| *string* | Short description of the book. |
|author| *string* | Book writer. |
|genre| *string* | Book genre. |
|isRented| *boolean* | State of the book. If it is rented or not. |

```json
// Request body example
{
  "id": "641a5c882423b5d623a92e59",
  "title": "A Song of Ice and Fire",
  "author": "George R. R. Martin",
  "genre": "Epic fantasy",
  "isRented": true
}
```

```json
// Success response body example
{
  "data": {
    "id": "641a5c882423b5d623a92e59",
    "title": "A Song of Ice and Fire",
    "author": "George R. R. Martin",
    "genre": "Epic fantasy",
    "isRented": true
  }
}
```

```json
// Error response body example
{
  "error": {
    "message": "Invalid token. Make sure the token stays valid."
  }
}
```

### PATCH /books/:id

Endpoint used to update a book.

> **WARNING**: Unable to update a rented book.

Parameters

| Field | Type | Description
|-|-|-|
|id| *ObjectID* | ***REQUIRED*** |

Headers

| Field | Type | Description
|-|-|-|
|Authorization| *string* | ***REQUIRED*** |

Body

| Field | Type | Description
|-|-|-|
|title| *string* | Book's name. |
|description| *string* | Short description of the book. |
|author| *string* | Book writer. |
|genre| *string* | Book genre. |
|isRented| *boolean* | State of the book. If it is rented or not. |

```json
// Request body example
{
  "title": "Harry Potter and the Order of the Phoenix",
  "description": "A Game of Thrones is the first novel in A Song of Ice and Fire, a series of fantasy novels by American author George R. R. Martin. It was first published on August 1, 1996. The novel won the 1997 Locus Award and was nominated for both the 1997 Nebula Award and the 1997 World Fantasy Award. The novella Blood of the Dragon, comprising the Daenerys Targaryen chapters from the novel, won the 1997 Hugo Award for Best Novella. In January 2011, the novel became a New York Times Bestseller and reached No. 1 on the list in July 2011.",
  "author": "J. K. Rowling",
  "genre": "Fantasy",
  "isRented": false
}
```

```json
// Success response body example
{
  "data": {
    "id": "6418fd971951f903bf155672",
    "title": "Harry Potter and the Order of the Phoenix",
    "description": "A Game of Thrones is the first novel in A Song of Ice and Fire, a series of fantasy novels by American author George R. R. Martin. It was first published on August 1, 1996. The novel won the 1997 Locus Award and was nominated for both the 1997 Nebula Award and the 1997 World Fantasy Award. The novella Blood of the Dragon, comprising the Daenerys Targaryen chapters from the novel, won the 1997 Hugo Award for Best Novella. In January 2011, the novel became a New York Times Bestseller and reached No. 1 on the list in July 2011.",
    "author": "J. K. Rowling",
    "genre": "Fantasy",
    "isRented": false
  }
}
```

```json
// Error response body example
{
  "error": {
    "message": "Invalid token. Make sure the token stays valid."
  }
}
```

### DELETE /books/:id

Endpoint used to delete a book.

> **WARNING**: Unable to delete a rented book.

Parameters

| Field | Type | Description
|-|-|-|
|id| *ObjectID* | ***REQUIRED*** |

Headers

| Field | Type | Description
|-|-|-|
|Authorization| *string* | ***REQUIRED*** |

```json
// Success response body example
{
  "data": {
    "id": "6418fd971951f903bf155672",
    "title": "Harry Potter and the Order of the Phoenix",
    "description": "A Game of Thrones is the first novel in A Song of Ice and Fire, a series of fantasy novels by American author George R. R. Martin. It was first published on August 1, 1996. The novel won the 1997 Locus Award and was nominated for both the 1997 Nebula Award and the 1997 World Fantasy Award. The novella Blood of the Dragon, comprising the Daenerys Targaryen chapters from the novel, won the 1997 Hugo Award for Best Novella. In January 2011, the novel became a New York Times Bestseller and reached No. 1 on the list in July 2011.",
    "author": "J. K. Rowling",
    "genre": "Fantasy",
    "isRented": false
  }
}
```

```json
// Error response body example
{
  "error": {
    "message": "Invalid token. Make sure the token stays valid."
  }
}
```
