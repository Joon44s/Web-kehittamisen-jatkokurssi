# 1️⃣ CREATE – Resource (Sequence Diagram)

```mermaid
sequenceDiagram
    participant U as User (Browser)
    participant F as Frontend (form.js and resources.js)
    participant B as Backend (Express Route)
    participant V as express-validator
    participant S as Resource Service
    participant DB as PostgreSQL

    U->>F: Submit form
    F->>F: Client-side validation
    F->>B: POST /api/resources (JSON)

    B->>V: Validate request
    V-->>B: Validation result

    alt Validation fails
        B-->>F: 400 Bad Request + errors[]
        F-->>U: Show validation message
    else Validation OK
        B->>S: createResource(data)
        S->>DB: INSERT INTO resources
        DB-->>S: Result / Duplicate error

        alt Duplicate
            S-->>B: Duplicate detected
            B-->>F: 409 Conflict
            F-->>U: Show duplicate message
        else Success
            S-->>B: Created resource
            B-->>F: 201 Created
            F-->>U: Show success message
        end
    end
```

---

# 2️⃣ READ – Resource (Sequence Diagram)

```mermaid
sequenceDiagram
    participant U as User (Browser)
    participant F as Frontend (resources.js)
    participant B as Backend (Express Route)
    participant S as Resource Service
    participant DB as PostgreSQL

    U->>F: Load resource list
    F->>B: GET /api/resources

    B->>S: getAllResources()
    S->>DB: SELECT * FROM resources

    alt Success
        DB-->>S: Resource rows
        S-->>B: Data object
        B-->>F: 200 OK (JSON)
        F-->>U: Render resource table
    else Server Error
        DB-->>S: Connection Error
        S-->>B: Error
        B-->>F: 500 Internal Server Error
        F-->>U: Show error notification
    end
```

---

# 3️⃣ UPDATE – Resource (Sequence Diagram)

```mermaid
sequenceDiagram
    participant U as User (Browser)
    participant F as Frontend (form.js)
    participant B as Backend (Express Route)
    participant V as express-validator
    participant S as Resource Service
    participant DB as PostgreSQL

    U->>F: Edit data and click Save
    F->>F: Client-side validation
    F->>B: PUT /api/resources/:id (JSON)

    B->>V: Validate request
    V-->>B: Validation result

    alt Validation fails
        B-->>F: 400 Bad Request
        F-->>U: Show validation errors
    else Validation OK
        B->>S: updateResource(id, data)
        S->>DB: UPDATE resources SET... WHERE id = :id

        alt Resource not found
            DB-->>S: 0 rows affected
            S-->>B: Not Found
            B-->>F: 404 Not Found
            F-->>U: Show "Resource not found"
        else Success
            DB-->>S: Updated row
            S-->>B: Success
            B-->>F: 200 OK
            F-->>U: Show success message
        end
    end
```

---

# 4️⃣ DELETE – Resource (Sequence Diagram)

```mermaid
sequenceDiagram
    participant U as User (Browser)
    participant F as Frontend (resources.js)
    participant B as Backend (Express Route)
    participant S as Resource Service
    participant DB as PostgreSQL

    U->>F: Click Delete button
    F->>B: DELETE /api/resources/:id

    B->>S: deleteResource(id)
    S->>DB: DELETE FROM resources WHERE id = :id

    alt Success
        DB-->>S: Row deleted
        S-->>B: Success
        B-->>F: 204 No Content
        F-->>U: Remove row from UI
    else Conflict (Linked Data)
        DB-->>S: Foreign key constraint error
        S-->>B: Conflict error
        B-->>F: 409 Conflict
        F-->>U: Show "Cannot delete: linked bookings exist"
    end
```