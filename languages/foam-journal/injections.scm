; Inject Java highlighting into triple-quoted strings for known Java code keys

; "code" — Script entries
(pair
  key: (key (string (string_content) @_key))
  value: (triple_string (triple_string_content) @injection.content)
  (#eq? @_key "code")
  (#set! injection.language "java")
  (#set! injection.include-children))

(pair
  key: (key (identifier) @_key)
  value: (triple_string (triple_string_content) @injection.content)
  (#eq? @_key "code")
  (#set! injection.language "java")
  (#set! injection.include-children))

; "serviceScript" — CSpec service definitions
(pair
  key: (key (string (string_content) @_key))
  value: (triple_string (triple_string_content) @injection.content)
  (#eq? @_key "serviceScript")
  (#set! injection.language "java")
  (#set! injection.include-children))

(pair
  key: (key (identifier) @_key)
  value: (triple_string (triple_string_content) @injection.content)
  (#eq? @_key "serviceScript")
  (#set! injection.language "java")
  (#set! injection.include-children))

; "javaCode" — method bodies
(pair
  key: (key (string (string_content) @_key))
  value: (triple_string (triple_string_content) @injection.content)
  (#eq? @_key "javaCode")
  (#set! injection.language "java")
  (#set! injection.include-children))

(pair
  key: (key (identifier) @_key)
  value: (triple_string (triple_string_content) @injection.content)
  (#eq? @_key "javaCode")
  (#set! injection.language "java")
  (#set! injection.include-children))

; Also handle backtick strings for the same keys
(pair
  key: (key (string (string_content) @_key))
  value: (backtick_string (backtick_string_content) @injection.content)
  (#any-of? @_key "code" "serviceScript" "javaCode")
  (#set! injection.language "java")
  (#set! injection.include-children))

(pair
  key: (key (identifier) @_key)
  value: (backtick_string (backtick_string_content) @injection.content)
  (#any-of? @_key "code" "serviceScript" "javaCode")
  (#set! injection.language "java")
  (#set! injection.include-children))
