; ============================================================
; FOAM JavaScript — Language Injections
; Injects Java/CSS highlighting into FOAM model string literals
; ============================================================

; --- Java injection for backtick (template) strings ---

; javaCode, javaFactory, javaPreSet, javaPostSet, javaGetter, javaSetter
(pair
  key: (property_identifier) @_key
  value: (template_string
    (string_fragment) @injection.content)
  (#any-of? @_key
    "javaCode" "javaFactory"
    "javaPreSet" "javaPostSet"
    "javaGetter" "javaSetter"
    "javaCondition" "javaValue"
    "javaCompare")
  (#set! injection.language "java")
  (#set! injection.include-children))

; --- Java injection for single/double quoted strings ---

(pair
  key: (property_identifier) @_key
  value: (string
    (string_fragment) @injection.content)
  (#any-of? @_key
    "javaCode" "javaFactory"
    "javaPreSet" "javaPostSet"
    "javaGetter" "javaSetter"
    "javaCondition" "javaValue"
    "javaCompare")
  (#set! injection.language "java")
  (#set! injection.include-children))

; --- CSS injection for backtick strings ---

(pair
  key: (property_identifier) @_key
  value: (template_string
    (string_fragment) @injection.content)
  (#eq? @_key "css")
  (#set! injection.language "css")
  (#set! injection.include-children))
