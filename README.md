# TodoApp

## Routes

`POST /app/agent`

- Request

```json
{
'agent_id': str,
'password': str
}
```

- Response
```json
Response Data: {
'status': 'account created',
'status_code': 200
}
```

`POST /app/agent/auth`

- Request

```json
{
'agent_id': str,
'password': str
}
```

- Response
```json
//For success,
{
'status': 'success',
'agent_id': int,
'status_code': 200
}
//For failure,
{
'status': 'failure',
'status_code': 401
}
```

`GET /sites/list/?agent={id}`

```json
{
    "list": [
        {
            "text": "meet raymond",
            "title": "meeting",
            "category": "meeting",
            "due_date": "2020-07-07T18:30:00.000Z"
        },
        {
            "text": " Buy eggs for dinner",
            "title": "Buy eggs",
            "category": "purchase",
            "due_date": "2020-08-31T18:30:00.000Z"
        },
        {
            "text": "service car",
            "title": "Wash Car",
            "category": "household",
            "due_date": "2020-09-18T18:30:00.000Z"
        }
    ]
}
```

`POST /sites`

- Request

```json
{
	"title":"Wash Car",
	"description": "service car",
	"category":"household",
	"due_date":"2020-09-19"
}
```

```json
{
    "status": "success"
}
```

