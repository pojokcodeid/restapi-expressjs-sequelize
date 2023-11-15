# Contact API Specification

## Create Contact API

- Endpoint : POST /api/contacts
- Header : Authorization : Bearer <acess_token>
- Request Body :

```json
{
  "firstName": "Pojok",
  "lastName": "Code",
  "fullName": "Pojok Code",
  "email": "email1@kontak.com",
  "phone": "123456789",
  "address": [
    {
      "addressType": "Rumah",
      "street": "Jl. Jalan",
      "city": "Bandung",
      "province": "Jawa Barat",
      "country": "Indonesia",
      "zipCode": "12345",
      "contactId": 1
    }
  ],
  "userId": "xxxxxxxxxxxxxxxxxxxxxxxxx"
}
```

- Response Sucess :

```json
{
  "errors": null,
  "message": "Kontak berhasil dibuat",
  "data": [
    {
      "id": 1,
      "firstName": "Pojok",
      "lastName": "Code",
      "fullName": "Pojok Code",
      "email": "email1@kontak.com",
      "phone": "123456789",
      "address": [
        {
          "addressType": "Rumah",
          "street": "Jl. Jalan",
          "city": "Bandung",
          "province": "Jawa Barat",
          "country": "Indonesia",
          "zipCode": "12345",
          "contactId": 1
        }
      ],
      "userId": "xxxxxxxxxxxxxxxxxxxxxxxxx"
    }
  ]
}
```

- Response Error :

```json
{
  "errors": ["Nama harus diisi", "Email harus diisi"],
  "message": "Kontak gagal dibuat",
  "data": null
}
```

## Seach Contact API

- Endpoint : GET /api/contacts
- Header : Authorization : Bearer <acess_token>
- Request Body :

```json
{
  "search": "value"
}
```

- Response Sucess :

```json
{
  "errors": null,
  "message": "Get contact berhasil",
  "data": [
    {
      "id": 1,
      "firstName": "Pojok",
      "lastName": "Code",
      "fullName": "Pojok Code",
      "email": "email1@kontak.com",
      "phone": "123456789",
      "userId": "xxxxxxxxxxxxxxxxxxxxxxxxx",
      "address": [
        {
          "id": 1,
          "addressType": "Rumah",
          "street": "Jl. Jalan",
          "city": "Bandung",
          "province": "Jawa Barat",
          "country": "Indonesia",
          "zipCode": "12345",
          "contactId": 1
        },
        {
          "id": 2,
          "addressType": "Kantor",
          "street": "Jl. Jalan",
          "city": "Bandung",
          "province": "Jawa Barat",
          "country": "Indonesia",
          "zipCode": "12345",
          "contactId": 1
        }
      ]
    }
  ]
}
```

- Response Error :

```json
{
  "errors": ["Kontak tidak ditemukan"],
  "message": "Get contact gagal",
  "data": null
}
```

## Get Contact API

- Endpoint : GET /api/contact/:id
- Header : Authorization : Bearer <acess_token>
- Request Body :
- Response Sucess :

```json
{
  "errors": null,
  "message": "Get contact berhasil",
  "data": {
    "id": 1,
    "firstName": "Pojok",
    "lastName": "Code",
    "fullName": "Pojok Code",
    "email": "email1@kontak.com",
    "phone": "123456789",
    "userId": "xxxxxxxxxxxxxxxxxxxxxxxxx",
    "address": [
      {
        "id": 1,
        "addressType": "Rumah",
        "street": "Jl. Jalan",
        "city": "Bandung",
        "province": "Jawa Barat",
        "country": "Indonesia",
        "zipCode": "12345",
        "contactId": 1
      },
      {
        "id": 2,
        "addressType": "Kantor",
        "street": "Jl. Jalan",
        "city": "Bandung",
        "province": "Jawa Barat",
        "country": "Indonesia",
        "zipCode": "12345",
        "contactId": 1
      }
    ]
  }
}
```

- Response Error :

```json
{
  "errors": ["Kontak tidak ditemukan"],
  "message": "Get contact gagal",
  "data": null
}
```

## Update Contact API

- Endpoint : PUT /api/contact/:id
- Header : Authorization : Bearer <acess_token>
- Request Body :

```json
{
  "firstName": "Pojok",
  "lastName": "Code",
  "email": "email1@kontak.com",
  "phone": "123456789"
}
```

- Response Sucess :

```json
{
  "errors": null,
  "message": "Update contact berhasil",
  "data": {
    "id": 1,
    "firstName": "Pojok",
    "lastName": "Code",
    "fullName": "Pojok Code",
    "email": "email1@kontak.com",
    "phone": "123456789",
    "userId": "xxxxxxxxxxxxxxxxxxxxxxxxx"
  }
}
```

- Response Error :

```json
{
  "errors": ["Kontak tidak ditemukan"],
  "message": "Update contact gagal",
  "data": null
}
```

## Delete Contact API

- Endpoint : DELETE /api/contact/:id
- Header : Authorization : Bearer <acess_token>
- Request Body :
- Response Sucess :

```json
{
  "errors": null,
  "message": "Delete contact berhasil",
  "data": {
    "id": 1,
    "firstName": "Pojok",
    "lastName": "Code",
    "fullName": "Pojok Code",
    "email": "email1@kontak.com",
    "phone": "123456789"
  }
}
```

- Response Error :

```json
{
  "errors": ["Kontak tidak ditemukan"],
  "message": "Delete contact gagal",
  "data": null
}
```
