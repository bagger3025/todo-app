# Notion API

## 1. notion.pages.create()

### Body

- parent: {database_id: string}
- properties: {
  이름: {text: {context: string}}[]
  }
- children: {
  object: "block",
  type: "heading_2" | "paragraph" | ...
  }[]

### Response

- object: 'page'
- id: string
- created_time: string
- last_edited_time: string
- created_by: {object: 'user', id: string}
- last_edited_by: {object: 'user', id: string}
- cover: null | ?
- icon: null | ?
- parent: {type: 'database_id', database_id: string}
- archived: boolean
- properties: {}
  - '이름': {}
    - id: 'title',
    - type: 'title',
    - title: {}[]
      - type: 'text',
      - text: {content: string, link: null | ?},
      - annotations: {}
        - bold: boolean,
        - italic: boolean,
        - strikethrough: boolean,
        - underline: boolean,
        - code: boolean,
        - color: string,
      - plain_text: string,
      - href: null | ?
- url: string

## 2. notion.databases.query()

### Body

- database_id: string

### Response

- object: 'list'
- results: {}[]
  - object: 'page'
  - id: string
  - created_time: string
  - last_edited_time: string
  - created_by: {}
  - last_edited_by: {}
  - cover: null | ?
  - icon: null | ?
  - parent: {}
  - archived: boolean
  - properties: {}
  - url: string
- next_cursor: null | ?
- has_more: boolean
- type: 'page'
- page: {}

## 3. notion.blocks.children.list()

### Body

- block_id: string

### Response

- object: 'list'
- results: {}[]
  - object: 'block'
  - id: string
  - parent: {}
  - created_time: string
  - last_edited_time: string
  - created_by: {}
  - last_edited_by: {}
  - has_children: boolean
  - archived: boolean
  - type: 'heading_2' | 'paragraph'
  - [type]: {}
- next_curosr: null | ?
- has_more: boolean
- type: 'block'
- block: {}

## 4. notion.databases.create()

### Body

- parent: {}
  - page_id: string
- title: {}[]
  - text: {}
    - content: string
- properties: {}
  - Name: {}
    - title: {}
- is_inline: boolean

### Response

- object: 'database'
- id: string
- cover: null | ?
- icon: null | ?
- created_time: string
- created_by: {}
  - object: 'user'
  - id: string
- last_edited_by: {}
  - object: 'user'
  - id: string
- last_edited_time: string
- title: {}[]
  - type: 'text'
  - text: {}
  - annotations: {}
  - plain_text: string
  - href: null | ?
- description: []
- is_inline: boolean
- proeprties: {}
  - Name: {}
    - id: 'title'
    - name: 'Name'
    - type: 'title'
    - title: {}
- parent: {}
  - type: 'page_id'
  - page_id: string
- url: string
- archived: boolean

## 5. notion.pages.update()

### Body

- page_id: string
- properties: {}

### Response

- object: 'page'
- id: string
- created_time: string
- last_edited_time: string
- created_by: {object: 'user', id: string}
- last_edited_by: {object: 'user', id: string}
- cover: null | ?
- icon: null | ?
- parent: {type: 'database_id', database_id: string}
- archived: boolean
- properties: {}
  - '이름': {}
    - id: 'title',
    - type: 'title',
    - title: {}[]
      - type: 'text',
      - text: {content: string, link: null | ?},
      - annotations: {}
        - bold: boolean,
        - italic: boolean,
        - strikethrough: boolean,
        - underline: boolean,
        - code: boolean,
        - color: string,
      - plain_text: string,
      - href: null | ?
- url: string
