```mermaid
sequenceDiagram
participant browser
participant server

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server
    server-->>browser: Response showing that the note was created.
    deactivate server

    Note right of browser: The browser executes the function that redraws the notes with new note
```