# User API Specification

## Register User API

- Endpint : POST /api/users
- Request Body :

```json
{
  "name": "Pojok Code",
  "email": "pojokcode@gmail.com",
  "password": "pojokcode"
}
```

- Response Sucess :

```json
{
  "errors": null,
  "message": "Activasi akun telah dikirim ke email anda",
  "data": [
    {
      "id": "xxxxxxxxxxxxxxxxxxxxxxxxx",
      "name": "Pojok Code",
      "email": "pojokcode@gmail.com"
    }
  ]
}
```

- Response Error :

```json
{
  "errors": ["Email harus diisi", "Password harus diisi"],
  "message": "Process gagal",
  "data": null
}
```

## Email Activation Akun

- Endpint : GET /users/activate/:id
  link di kirimkan ke email untuk di klik activasinya
- Response Sucess :

```json
{
  "errors": null,
  "message": "Akun anda telah aktif",
  "data": [
    {
      "id": "xxxxxxxxxxxxxxxxxxxxxxxxx",
      "name": "Pojok Code",
      "email": "pojokcode@gmail.com"
    }
  ]
}
```

- Response Error :

```json
{
  "errors": ["activasi sudah expire"],
  "message": "Process gagal",
  "data": null
}
```

## Login User API

- Endpint : POST /api/users/login
- Request Body :

```json
{
  "email": "pojokcode@gmail.com",
  "password": "pojokcode"
}
```

- Response Sucess :

```json
{
  "errors": null,
  "message": "Login berhasil",
  "data": [
    {
      "id": "xxxxxxxxxxxxxxxxxxxxxxxxx",
      "name": "Pojok Code",
      "email": "pojokcode@gmail.com"
    }
  ],
  "acess_token": "xxxxxxxxxxxxxxxxxxxxxxxxx",
  "refresh_token": "xxxxxxxxxxxxxxxxxxxxxxxxx"
}
```

- Response Error :

```json
{
  "errors": ["Email atau password salah"],
  "message": "Login gagal",
  "data": null
}
```

## Refresh Token

- Endpint : POST /api/users/refresh
- Header : Authorization : Bearer <acess_token>
- Request Body :
- Response Sucess :

```json
{
  "errors": null,
  "message": "Refresh token berhasil",
  "data": [
    {
      "id": "xxxxxxxxxxxxxxxxxxxxxxxxx",
      "name": "Pojok Code",
      "email": "pojokcode@gmail.com",
      "password": "pojokcode"
    }
  ],
  "acess_token": "xxxxxxxxxxxxxxxxxxxxxxxxx",
  "refresh_token": "xxxxxxxxxxxxxxxxxxxxxxxxx"
}
```

- Response Error :

```json
{
  "errors": ["Token tidak valid"],
  "message": "Refresh token gagal",
  "data": null
}
```

## Get User API

- Endpint : GET /api/users/:id
- Header : Authorization : Bearer <acess_token>
- Request Body :

- Response Sucess :

```json
{
  "errors": null,
  "message": "Get user berhasil",
  "data": [
    {
      "id": "xxxxxxxxxxxxxxxxxxxxxxxxx",
      "name": "Pojok Code",
      "email": "pojokcode@gmail.com",
      "password": "pojokcode"
    }
  ]
}
```

- Response Error :

```json
{
  "errors": ["User tidak ditemukan"],
  "message": "Get user gagal",
  "data": null
}
```

## Update User API

- Endpint : PUT /api/users/:id
- Header : Authorization : Bearer <acess_token>
- Request Body :

```json
{
  "name": "Pojok Code",
  "email": "pojokcode@gmail.com",
  "password": "pojokcode"
}
```

- Response Sucess :

```json
{
  "errors": null,
  "message": "Update user berhasil",
  "data": [
    {
      "id": "xxxxxxxxxxxxxxxxxxxxxxxxx",
      "name": "Pojok Code",
      "email": "pojokcode@gmail.com"
    }
  ]
}
```

- Response Error :

```json
{
  "errors": ["User tidak ditemukan"],
  "message": "Update user gagal",
  "data": null
}
```

## Delete User API

- Endpint : DELETE /api/users/:id
- Header : Authorization : Bearer <acess_token>
- Request Body :
- Response Sucess :

```json
{
  "errors": null,
  "message": "Delete user berhasil",
  "data": [
    {
      "id": "xxxxxxxxxxxxxxxxxxxxxxxxx",
      "name": "Pojok Code",
      "email": "pojokcode@gmail.com"
    }
  ]
}
```

- Response Error :

```json
{
  "errors": ["User tidak ditemukan"],
  "message": "Delete user gagal",
  "data": null
}
```
