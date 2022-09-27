Connect:

::: mermaid
sequenceDiagram
    participant DB as DB
    participant SK as Socket.io
    participant C  as Client
    participant CC as ConnectedClient
    par Client to Socket.io
        C -->> SK: try to connect
        C ->>  SK: token
    end
    SK -->> DB: get user data
    DB ->>  SK: user data
    Note over SK: verify user data
    alt verification succeeded
        SK -->> CC: disconnect
        Note left of SK: change to new socket id
        SK ->>  DB: update user data
        SK -->  C : connect
    else verification failed or error
        SK -->> C : failed to connect
    end
:::
---
Open App:
::: mermaid
    sequenceDiagram
    participant Storage as Storage
    participant D as Parse Data
    participant CS1 as Client Socket A
    participant SS as Server Socket
    participant CS2 as Client Socket B
    CS1 --> SS: connect
    Note over CS1, SS: Server Socket listener
    par Server Socket listener
        SS -->> CS1: on: send msg
        CS1 ->> SS: emit: send msg
        SS ->> CS2: emit: msg
        CS2 -->> SS: callback('received')
        SS -->> CS1: callback('sent')
    and
        SS -->> CS1: on: add friend
        CS1 ->> SS: emit: add friend
    end
    Note over CS1, SS: Client Socket listener
    par Client Socket listener
        CS1 -->> SS: on: msg
        SS ->> CS1: emit: msg
        CS1 ->> D: setData
        CS1 ->> Storage: setItem
    end
    
    D -->> Storage: getItem
    Storage ->> D: data
    

:::

---

Send message:

::: mermaid
sequenceDiagram
    autonumber
    participant A as Client A
    participant S as Socket.io
    participant B as Client B
    A ->>+  S: emit event: send msg
    S ->>+  B: emit event: msg
    B -->>- S: callback('received')
    S -->>- A: callback('sent')
:::
---