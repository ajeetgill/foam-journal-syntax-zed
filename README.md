# FOAM Journal Syntax - Zed Extension

A Zed editor extension that provides syntax highlighting for FOAM Journal (`.jrl`) files used by the [FOAM3 framework](https://github.com/kgrgreer/foam3).

## Overview

FOAM Journal files (`.jrl`) are the persistence and configuration format for the FOAM3 framework. They contain data entries wrapped in command functions:

```
// Service definition
p({
  "class": "foam.core.boot.CSpec",
  "name": "myDAO",
  "serve": true,
  "serviceScript": """
    return new foam.dao.EasyDAO.Builder(x)
      .setOf(com.example.MyModel.getOwnClassInfo())
      .build();
  """
})

// Remove entry
r({"class":"foam.core.auth.Permission","id":"old.permission"})

// Unquoted keys
p({class:"foam.core.auth.Permission",id:"admin.*"})
```

### Commands
| Command | Meaning |
|---------|---------|
| `p({...})` | **Put** - insert or update a record |
| `r({...})` | **Remove** - delete a record |
| `c({...})` | **Create** - create a new record |
| `v({...})` | **Version** - version marker |

## Features

- **Custom Tree-sitter grammar** built specifically for FOAM Journal syntax
- `p()`, `r()`, `c()`, `v()` commands highlighted as built-in functions
- `//` line comments fully supported
- Unquoted keys (`class:` alongside `"class":`)
- Triple-quoted strings (`"""..."""`) for embedded Java/JS code
- Backtick strings for multi-line code blocks
- `class` property values highlighted as types
- `id` and `name` values highlighted distinctly
- DAO-prefixed entries (`daoName.p({...})`) for routing journals
- Bracket matching, auto-indentation, code outline

## Installation

### Development Installation
1. Clone this repository
2. In Zed, open command palette (`Cmd+Shift+P` / `Ctrl+Shift+P`)
3. Run `zed: install dev extension` and select this folder

## Project Structure

```
foam-journal-syntax-zed/
├── extension.toml                          # Zed extension config
├── languages/
│   └── foam-journal/
│       ├── config.toml                     # Language settings
│       ├── highlights.scm                  # Syntax highlighting rules
│       ├── brackets.scm                    # Bracket matching
│       ├── indents.scm                     # Auto-indentation
│       └── outline.scm                     # Code outline/structure
├── grammars/
│   └── tree-sitter-foam-journal/
│       ├── grammar.js                      # Tree-sitter grammar definition
│       ├── package.json                    # Grammar package config
│       └── src/                            # Generated parser (C code)
├── sample.jrl                              # Sample FOAM journal file
└── README.md
```

## Known Limitations

- **FOAM CSS: unquoted URLs with colons** — The FOAM CSS grammar excludes `:` from plain values to detect missing semicolons. This means `url(http://example.com)` will show a false error. Use quoted URLs instead: `url("http://example.com")`. This does not affect relative paths like `url(/images/icon.svg)` or quoted URLs.

## Related Resources

- [FOAM3 Framework](https://github.com/kgrgreer/foam3)
- [Zed Editor](https://zed.dev)
- [Zed Language Extensions](https://zed.dev/docs/extensions/languages)
- [Tree-sitter](https://tree-sitter.github.io)

## License

MIT License - see LICENSE file for details.
