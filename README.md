<h1 align="center">Backend API Spring boot - hỗ trợ người dùng học tiếng anh
</h1>

<p align="center">
    <img src="src/main/resources/static/BLOG-SpringBoot@2x.png" />
</p>


# [**Table Of Content**](#table-of-content)
- [**Table Of Content**](#table-of-content)
- [**Introduction**](#introduction)
- [**Topic**](#topic)
- [**Database**](#database)
- [**API Document**](#api-document) 
    - [**1. Method**](#1-method)
    - [**2. Response**](#2-response)
    - [**3. Authentication**](#3-authentication)
      - [**🟢 3.1. Sign up**](#-31-sign-up) 
      - [**🟢 3.2. Sign in**](#-32-sign-in)
      - [**🔵 3.3. Sign out**](#-33-sign-out)
    - [**4. Bộ thẻ**](#4-bộ-thẻ)
      - [**🟢 4.1. Tạo bộ thẻ**](#-41-tạo-bộ-thẻ)
      - [**🔵 4.2. Truy vấn chi tiết bộ thẻ**](#-42-truy-vấn-chi-tiết-bộ-thẻ)
      - [**🔵 4.3. Truy vấn bộ thẻ**](#-43-truy-vấn-bộ-thẻ)
      - [**🟡 4.4. Hiệu chỉnh bộ thẻ**](#-44-hiệu-chỉnh-bộ-thẻ)
      - [**🔴 4.5. Xóa bộ thẻ**](#-45-xóa-bộ-thẻ)
    - [**5. Thẻ**](#5-thẻ)
      - [**🟢 5.1. Tạo thẻ**](#-51-tạo-thẻ)
      - [**🔵 5.2. Truy vấn chi tiết thẻ**](#-52-truy-vấn-chi-tiết-thẻ)
      - [**🔵 5.3. Truy vấn thẻ**](#-53-truy-vấn-thẻ)
      - [**🟡 5.4. Hiệu chỉnh thẻ**](#-54-hiệu-chỉnh-thẻ)
      - [**🔴 5.5. Xóa thẻ**](#-55-xóa-thẻ)




# [**Introduction**](#introduction)

Chào các bạn, mình tên là Hồ Đức Nguyên.
Mã số sinh viên N20DCCN047.
Niên khóa 2020-2025.

Lời đầu tiên mình xin chào các bạn và cảm ơn tất cả các bạn đang ở đây. Trong tài liệu này mình sẽ chia sẻ tất cả những gì mình làm trong đồ án.

Đồ án này có tất cả 2 phần bao gồm:

* [**backend API**](#) (Hiện tại)

* [**Frontend VueJS**](https://github.com/hdnguyen02/learn-english-frontend)



Dự án các bạn đang đọc được sử dụng để mô tả chi tiết phần `backend API`

# [**Topic**](#topic)

Có thể giải thích yêu cầu đề tài ngắn gọn như sau:

**Backend API** - Đóng vai trò xử lý logic ứng dụng, quản lý dữ liệu, bảo mật thông tin `người dùng, bộ thẻ, thẻ, lớp học`.

**Frontend VueJS** - Đóng vai trò giao diện tiêu thụ API. Hỗ trợ người dùng quản lý thông tin cá nhân, bộ thẻ, thẻ, lớp học.


# [**Database**](#database)

<p align="center">
    <img src="src/main/resources/static/diagram.png" />
</p>
<h3 align="center">

***Diagram cơ sở dữ liệu***
</h3>

Tớ sẽ giải thích qua về ý nghĩa các bảng xuất hiện trong database nha

**BẢNG USERS** - bảng này chứa thông tin của người dùng (USERS).

**BẢNG ROLES** - bảng này chứa thông tin vai trò (ROLES) (STUDENT, TEACHER, ADMIN).

**BẢNG USERS_ROLES** - bảng này chứa thông tin về vai trò (ROLES) của USER ( 1 USER có thể có nhiều ROLE, 1 ROLE có thể thuộc về nhiều USER)

**BẢNG CLASSROOMS** - bảng này chứa thông tin các lớp học (CLASSROOMS) do USER tạo ra

**BẢNG COMMENTS** - lưu trữ thông tin thảo luận (COMMENTS) của USER thuộc CLASSROOM

**BẢNG USERS_CLASSROOMS** - lưu trữ thông tin về những USERS tham gia vào CLASSROOM

**BẢNG DECKS** - lưu trữ thông tin về bộ thẻ (DECKS) của USER và bộ thẻ (DECK) được chia sẽ vào CLASSROOM

**BẢNG CARDS** - lưu trữ thông tin thẻ (CARDS) của bộ thẻ (DECK)

**BẢNG TOKENS** - lưu trữ thông tin thẻ (TOKENS) của USER

# [**API Document**](#api-document)

Bạn có thể start server lên và truy cập vào: http://localhost:8080/swagger-ui/index.html để có cái nhìn tổng quan về schemas và api

<p align="center">
    <img src="src/main/resources/static/tổng quan api.png"/>
</p>
<h3 align="center">

## [**1. Method**](#1-method)
API của mình viết theo chuẩn Restful API, trong đồ án mình sử dụng 4 dạng phương thức quen thuộc sau để xây dựng đồ án:

🔵 GET - Để truy xuất một tài nguyên. Ví dụ: lấy thông tin về bộ thẻ (DECKS)

🟢 POST - Để tạo một tài nguyên trên máy chủ. Ví dụ: tạo mới một người dùng (USERS)

🟡 PUT - Để hiệu chỉnh đổi tài nguyên. Ví dụ: thay đổi mật khẩu, tên hiển thị người dùng

🔴 DELETE - Để  xoá một tài nguyên. Ví dụ: xóa bộ thẻ, thẻ...

Hãy để ý một chút phía dưới,mình sẽ sử dụng màu sắc mà mình quy ước bên trên kết hợp với các thông tin khác để mô tả API.


## [**2. Response**](#2-response)

Dữ liệu trả về từ máy chủ tuân thủ theo 1 format duy nhất.  


| Tên     | Kiểu dữ liệu | Mô tả                                                        |
|---------|--------------|--------------------------------------------------------------|
| success | Boolean      | Có giá trị là true nếu API thực hiện thành công và ngược lại |
| message | String       | Message từ server API gửi đến người dùng                     |
| data    | Object       | Dữ liệu trả về cho người dùng                                |


Ở những phần tiếp theo mình sẽ mô tả chi tiết từng API, header và body cần có những gì, request params và path variable có những gì.


## [**3. Authentication**](#3-authentication)

<p align="center">
    <img src="src/main/resources/static/auth-controller.png"/>
  Các API trong AuthController
</p>
<h3 align="center">


### [**🟢 3.1. Sign up**](#-31-sign-up)
- **Purpose**: Xử lý yêu cầu tạo tài khoản của user gửi tới

  
- **Permission**: Tất cả mọi người


- **Method**: 🟢 POST


- **URL**: /api/v1/auth/sign-up


- **Header**:

  | Tên          | Giá trị          |
  |--------------|------------------|
  | Content-type | application/json |

- **Body**:

  | Tên       | Tuỳ chọn       | Kiểu dữ liệu | Ý nghĩa                                                |
  |-----------|----------------|--------------|--------------------------------------------------------|
  | email     | Bắt buộc       | String       | username của tài khoản                                 |
  | password  | Bắt buộc       | String       | password của tài khoản                                 |
  | name      | Không bắt buộc | String       | Tên hiển thị của người dùng                            |
- | birthDate | Không bắt buộc | String       | format: dd/mm/yyyy, Ngày tháng năm sinh của người dùng |

- **Response**:
  ````json
  {
    "data": {
      "accessToken": "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJoZG5ndXllbjc3MDJAZ21haWwuY29tIiwiaWF0IjoxNzE0NTI3OTExLCJleHAiOjE3MTQ2MTQzMTF9.4H5UAcs8JaX9MSldjdTtrLKd1NxRoFRMxXhYMS1HbJ0",
      "user": {
        "email": "hdnguyen7702@gmail.com",
        "name": null,
        "birthdate": null,
        "createAt": "01/05/2024",
        "isEnabled": true,
        "roles": ["STUDENT"]
      }
    },
    "message": "Đăng ký tài khoản thành công",
    "success": true
  }
  ````


### [**🟢 3.2. Sign in**](#-32-sign-in)
- **Purpose**: Xử lý yêu cầu đăng nhập của user gửi tới


- **Permission**: Tất cả mọi người


- **Method**: 🟢 POST


- **URL**: /api/v1/auth/sign-in


- **Header**:

  | Tên          | Giá trị          |
  |--------------|------------------|
  | Content-type | application/json |

- **Body**:

  | Tên      | Tuỳ chọn       | Kiểu dữ liệu   | Ý nghĩa                     |
  |----------|----------------|----------------|-----------------------------|
  | email    | Bắt buộc       | String         | username của tài khoản      |
  | password | Bắt buộc       | String         | password của tài khoản      |


- **Response**:
```json
{
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJoZG5ndXllbjc3MDJAZ21haWwuY29tIiwiaWF0IjoxNzE0NTI3OTExLCJleHAiOjE3MTQ2MTQzMTF9.4H5UAcs8JaX9MSldjdTtrLKd1NxRoFRMxXhYMS1HbJ0",
    "user": {
      "email": "hdnguyen7702@gmail.com",
      "name": null,
      "birthdate": null,
      "createAt": "01/05/2024",
      "isEnabled": true,
      "roles": [
        {
          "name": "STUDENT"
        }
      ]
    }
  },
  "message": "Đăng nhập tài khoản thành công",
  "success": true
}
```


### [**🔵 3.3. Sign out**](#-33-sign-out)


- **Purpose**: Xử lý yêu cầu đăng xuất của user gửi tới


- **Permission**: STUDENT, TEACHER, ADMIN


- **Method**: 🔵 GET


- **URL**: /api/v1/auth/sign-out


- **Header**:

  | Tên          | Giá trị          |
  |--------------|------------------|
  | Access token | Bearer Token     |
  | Content-type | application/json |

- **Body**: Để trống


- **Response**:
  ```json
  null
  ```


## [**4. Bộ thẻ**](#4-bộ-thẻ)

<p align="center">
    <img src="src/main/resources/static/bộ thẻ/tổng quan bộ thẻ.png" />
    Các API trong DeckController
</p>
<h3 align="center">

### [**🟢 4.1. Tạo bộ thẻ**](#-41-tạo-bộ-thẻ)
- **Purpose**: Xử lý yêu cầu tạo bộ thẻ (deck) của user gửi tới


- **Permission**: STUDENT - TEACHER


- **Method**: 🟢 POST


- **URL**: /api/v1/decks


- **Header**:

  | Tên          | Giá trị          |
  |--------------|------------------|
  | Access token | Bearer Token     |
  | Content-type | application/json |

- **Body**:

  | Tên         | Tuỳ chọn       | Kiểu dữ liệu | Ý nghĩa      |
  |-------------|----------------|--------------|--------------|
  | name        | Bắt buộc       | String       | tên bộ thẻ   |
  | description | không bắt buộc | String       | mô tả bộ thẻ |


- **Response**:
  ```json
  {
    "data": {
      "id": 1,
      "name": "Từ vựng gia đình",
      "description": "Từ vựng mô tả chủ đề gia đình",
      "numberCards": 0,
      "createAt": "01/05/2024"
    },
    "message": "Tạo bộ thẻ thành công",
    "success": true
  }
  ```

###  [**🔵 4.2. Truy vấn chi tiết bộ thẻ**](#-42-truy-vấn-chi-tiết-bộ-thẻ)

- **Purpose**: Người dùng có ý định học thẻ ( thẻ nằm trong bộ thẻ ) 


- **Permission**: STUDENT - TEACHER


- **Method**: 🔵 GET


- **URL**: /api/v1/decks/{id}


- **Path Variable**: 

  | Tên | Kiểu dữ liệu | Ý nghĩa                       |
  |-----|--------------|-------------------------------|
  | id  | Integer      | id bộ thẻ người dùng muốn học |


- **Header**: 

  | Tên          | Giá trị          |
  |--------------|------------------|
  | Access token | Bearer Token     |
  | Content-type | application/json |

- **Body**: bỏ trống


- **Response**: 
  ```json
  {
    "data": {
      "id": 1,
      "description": "Từ vựng mô tả chủ đề gia đình",
      "name": "Từ vựng gia đình",
      "createAt": "29/04/2024",
      "cards": [
        {
          "id": 1,
          "term": "Family",
          "definition": "Gia đình",
          "image": null,
          "audio": null,
          "example": null,
          "createAt": "29/04/2024",
          "isFavourite": false,
          "isRemembered": false
        },
        {
          "id": 2,
          "term": "Family",
          "definition": "Gia đình",
          "image": null,
          "audio": null,
          "example": null,
          "createAt": "29/04/2024",
          "isFavourite": false,
          "isRemembered": false
        }
      ]
    },
    "message": "Truy vấn bộ thẻ thành công",
    "success": true
  }
  ```


### [**🔵 4.3. Truy vấn bộ thẻ**](#-43-truy-vấn-bộ-thẻ)
- **Purpose**: Xử lý yêu cầu truy vấn bộ thẻ (deck) của user gửi tới


- **Permission**: STUDENT - TEACHER


- **Method**: 🔵 GET


- **URL**: /api/v1/decks


- **Request Params**: searchTerm


  | Tên          | Giá trị  | Tùy chọn       | Ý nghĩa                                          |
  |--------------|----------|----------------|--------------------------------------------------|
  | searchTerm   | String   | Không bắt buộc | Tìm kiếm của người dùng (name, description deck) |



- **Ví dụ**: /api/v1/decks?**searchTerm**=gia đình



- **Header**:

  | Tên          | Giá trị          |
  |--------------|------------------|
  | Access token | Bearer Token     |
  | Content-type | application/json |

- **Body**: Để trống


- **Response**: /api/v1/decks

  ```json
  {
    "data": [
      {
        "id": 1,
        "name": "Từ vựng gia đình",
        "description": "Từ vựng mô tả chủ đề gia đình",
        "numberCards": 0,
        "createAt": "01/05/2024"
      },
      {
        "id": 2,
        "name": "Từ vựng giáo dục",
        "description": "Từ vựng mô tả chủ đề giáo dục",
        "numberCards": 0,
        "createAt": "01/05/2024"
      }
    ],
    "message": "Truy vấn danh sách bộ thẻ thành công",
    "success": true
  }
  ```

- **Response**: /api/v1/decks?searchTerm=Gia đình
  ```json
  {
    "data": [
      {
        "id": 1,
        "name": "Từ vựng gia đình",
        "description": "Từ vựng mô tả chủ đề gia đình",
        "numberCards": 0,
        "createAt": "01/05/2024"
      }
    ],
    "message": "Truy vấn danh sách bộ thẻ thành công",
    "success": true
  }
  ```


### [**🟡 4.4. Hiệu chỉnh bộ thẻ**](#-44-hiệu-chỉnh-bộ-thẻ)
- **Purpose**: Xử lý yêu cầu hiệu chỉnh bộ thẻ (deck) của user gửi tới


- **Permission**: STUDENT - TEACHER


- **Method**: 🟡 PUT


- **URL**: /api/v1/decks/{id}


- **Path Variable**:

  | Tên | Kiểu dữ liệu | Ý nghĩa   |
  |-----|--------------|-----------|
  | id  | Integer      | id bộ thẻ |


- **Header**:

  | Tên          | Giá trị          |
  |--------------|------------------|
  | Access token | Bearer Token     |
  | Content-type | application/json |

- **Body**:

  | Tên         | Tuỳ chọn       | Kiểu dữ liệu | Ý nghĩa      |
  |-------------|----------------|--------------|--------------|
  | name        | không bắt buộc | String       | tên bộ thẻ   |
  | description | không bắt buộc | String       | mô tả bộ thẻ |


- **Response**:
  ```json
  {
    "data": {
      "id": 1,
      "name": "Chủ đề gia đình",
      "description": "Từ vựng về chủ đề gia đình",
      "numberCards": 2,
      "createAt": "29/04/2024"
    },
    "message": "Hiệu chỉnh bộ thẻ thành công",
    "success": true
  }
  ```


### [**🔴 4.5. Xóa bộ thẻ**](#-45-xóa-bộ-thẻ)
- **Purpose**: Xử lý yêu cầu xóa bộ thẻ (deck) của user gửi tới


- **Permission**: STUDENT - TEACHER


- **Method**: 🔴 DELETE


- **URL**: /api/v1/decks/{id}


- **Path Variable**:

  | Tên | Kiểu dữ liệu | Ý nghĩa   |
  |-----|--------------|-----------|
  | id  | Integer      | id bộ thẻ |


- **Header**:

  | Tên          | Giá trị          |
  |--------------|------------------|
  | Access token | Bearer Token     |
  | Content-type | application/json |

- **Body**: Để trống


- **Response**:
  ```json
  {
    "data": {
      "id": 1,
      "name": "Chủ đề gia đình",
      "description": "Từ vựng về chủ đề gia đình",
      "numberCards": 2,
      "createAt": "29/04/2024"
    },
    "message": "Xóa bộ thẻ thành công",
    "success": true
  }
  ```

## [**5. Thẻ**](#5-thẻ)

<p align="center">
    <img src="src/main/resources/static/api-card-controller.png"/>
  Các API trong CardController
</p>
<h3 align="center">

### [**🟢 5.1. Tạo thẻ**](#-51-tạo-thẻ)

- **Purpose**: Xử lý yêu cầu tạo thẻ (card) của user gửi tới


- **Permission**: STUDENT - TEACHER


- **Method**: 🟢 POST


- **URL**: /api/v1/cards


- **Header**:

  | Tên          | Giá trị             |
  |--------------|---------------------|
  | Access token | Bearer Token        |
  | Content-type | multipart/form-data |

- **Body**:

  | Tên        | Tuỳ chọn       | Kiểu dữ liệu | Ý nghĩa                     |
  |------------|----------------|--------------|-----------------------------|
  | idDeck     | Bắt buộc       | Integer      | id bộ thẻ chứa thẻ được tạo |
  | term       | Bắt buộc       | String       | Từ vựng của thẻ             |
  | definition | Băt buộc       | String       | Giải thi từ vựng của thẻ    |
  | example    | Không bắt buộc | String       | Ví dụ về từ vựng            |
  | image      | Không bắt buộc | File         | Hình ảnh từ vựng            |
  | audio      | Không bắt buộc | File         | Âm thanh từ vựng            |


- **Response**: 
  ```json
  {
    "data": {
      "id": 3,
      "term": "Teacher",
      "definition": "Giáo viên",
      "image": null,
      "audio": null,
      "example": null,
      "createAt": "01/05/2024",
      "isFavourite": false,
      "isRemembered": false,
      "deck": {
        "id": 3,
        "name": "Từ vựng giáo dục"
      }
    },
    "message": "Tạo thẻ thành công",
    "success": true
  }
  ```

### [**🔵 5.2. Truy vấn chi tiết thẻ**](#-52-truy-vấn-chi-tiết-thẻ)

- **Purpose**: Người dùng có ý định xem thẻ ( thẻ nằm trong bộ thẻ )


- **Permission**: STUDENT - TEACHER


- **Method**: 🔵 GET


- **URL**: /api/v1/cards/{id}


- **Path Variable**:

  | Tên | Kiểu dữ liệu | Ý nghĩa                    |
  |-----|--------------|----------------------------|
  | id  | Integer      | id thẻ người dùng muốn xem |


- **Header**:

  | Tên          | Giá trị          |
  |--------------|------------------|
  | Access token | Bearer Token     |
  | Content-type | application/json |

- **Body**: bỏ trống


- **Response**:
  ```json
  {
    "data": {
      "id": 3,
      "term": "Teacher",
      "definition": "Giáo viên",
      "image": null,
      "audio": null,
      "example": null,
      "createAt": "01/05/2024",
      "isFavourite": false,
      "isRemembered": false,
      "deck": {
        "id": 3,
        "name": "Từ vựng giáo dục"
      }
    },
    "message": "Truy vấn thẻ thành công",
    "success": true
  }
  ```

### [**🔵 5.3. Truy vấn thẻ**](#-53-truy-vấn-thẻ)


- **Purpose**: Xử lý yêu cầu truy vấn, tìm kiếm, lọc thẻ (card) của user gửi tới


- **Permission**: STUDENT - TEACHER


- **Method**: 🔵 GET


- **URL**: /api/v1/cards


- **Request Params**:


| Tên          | Giá trị | Tuỳ chọn       | Ý nghĩa                                                       |
|--------------|---------|----------------|---------------------------------------------------------------|
| searchTerm   | String  | Không bắt buộc | Tìm kiếm của người dùng ( term, definition, example card)     |
| idDeck       | Integer | Không bắt buộc | Lọc ra những thẻ nằm trong bộ thẻ có idDeck                   |
| isFavourite  | Boolean | Không bắt buộc | tùy theo giá trị mà lọc ra thẻ yêu thích hoặc không yêu thích |
| isRemembered | Boolean | Không bắt buộc | tùy theo giá trị mà lọc ra thẻ đã nhớ hoặc chưa nhớ           |                                                                


- **Ví dụ**: 

  /api/v1/decks?**searchTerm**=Giáo viên
  
  /api/v1/decks?**idDeck**=1&**isFavourite**=false&**isRemembered**=false


- **Header**:

  | Tên          | Giá trị          |
  |--------------|------------------|
  | Access token | Bearer Token     |
  | Content-type | application/json |

- **Body**: Để trống


- **Response**:
  ```json
  {
    "data": [
      {
        "id": 3,
        "term": "Teacher",
        "definition": "Giáo viên",
        "image": null,
        "audio": null,
        "example": null,
        "createAt": "01/05/2024",
        "isFavourite": false,
        "isRemembered": false,
        "deck": {
          "id": 3,
          "name": "Từ vựng giáo dục"
        }
      }
    ],
    "message": "Truy vấn card thành công",
    "success": true
  }
  ```

### [**🟡 5.4. Hiệu chỉnh thẻ**](#-54-hiệu-chỉnh-thẻ)

- **Purpose**: Xử lý yêu cầu hiệu chỉnh thẻ (card) của user gửi tới


- **Permission**: STUDENT - TEACHER


- **Method**: 🟡 PUT


- **URL**: /api/v1/cards/{id}


- **Path Variable**:

  | Tên | Kiểu dữ liệu | Ý nghĩa                                  |
  |-----|--------------|------------------------------------------|
  | id  | Integer      | id thẻ (card) người dùng muốn hiệu chỉnh |


- **Header**:

  | Tên          | Giá trị          |
  |--------------|------------------|
  | Access token | Bearer Token     |
  | Content-type | application/json |

- **Body**:

  | Tên        | Tuỳ chọn       | Kiểu dữ liệu | Ý nghĩa                  |
  |------------|----------------|--------------|--------------------------|
  | idDeck     | Không bắt buộc | Integer      | id bộ thẻ (deck)         |
  | term       | Không bắt buộc | String       | Từ vựng của thẻ          |
  | definition | Không bắt buộc | String       | Giải thi từ vựng của thẻ |
  | example    | Không bắt buộc | String       | Ví dụ về từ vựng         |
  | image      | Không bắt buộc | File         | Hình ảnh từ vựng         |
  | audio      | Không bắt buộc | File         | Âm thanh từ vựng         |


- **Response**:
  ```json
  {
    "data": {
      "id": 3,
      "term": "Teach",
      "definition": "Giảng dạy",
      "image": null,
      "audio": null,
      "example": null,
      "createAt": "01/05/2024",
      "isFavourite": false,
      "isRemembered": true,
      "deck": {
        "id": 3,
        "name": "Từ vựng giáo dục"
      }
    },
    "message": "Hiệu chỉnh thẻ thành công",
    "success": true
  }
  ```



### [**🔴 5.5. Xóa thẻ**](#-55-xóa-thẻ)


- **Purpose**: Xử lý yêu cầu xóa thẻ (card) của user gửi tới


- **Permission**: STUDENT - TEACHER


- **Method**: 🔴 DELETE


- **URL**: /api/v1/cards/{id}


- **Path Variable**:

  | Tên | Kiểu dữ liệu | Ý nghĩa                    |
  |-----|--------------|----------------------------|
  | id  | Integer      | id thẻ người dùng muốn xóa |


- **Header**:

  | Tên          | Giá trị          |
  |--------------|------------------|
  | Access token | Bearer Token     |
  | Content-type | application/json |

- **Body**: Để trống


- **Response**:
  ```json
  {
    "data": {
      "id": 3,
      "term": "Teach",
      "definition": "Giảng dạy",
      "image": null,
      "audio": null,
      "example": null,
      "createAt": "01/05/2024",
      "isFavourite": false,
      "isRemembered": true,
      "deck": {
        "id": 3,
        "name": "Từ vựng giáo dục"
      }
    },
    "message": "Xoá thẻ thành công",
    "success": true
  }
  ```

