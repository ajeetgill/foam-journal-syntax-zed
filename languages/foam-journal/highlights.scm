; Class property keys - the most important identifier in JRL
(pair
  key: (string
    (string_content) @string.special.key
    (#eq? @string.special.key "class"))
  value: (string) @type)

; ID and name property keys
(pair
  key: (string
    (string_content) @string.special.key
    (#any-of? @string.special.key "id" "name"))
  value: (string) @string.special)

; Generic object keys
(pair
  key: (_) @property)

; Strings
(string) @string

; Numbers
(number) @number

; Constants
[
  (null)
  (true)
  (false)
] @constant.builtin

; Escape sequences
(escape_sequence) @string.escape

; Comments (tree-sitter-json doesn't parse // comments, but include for future)
(comment) @comment
