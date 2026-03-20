# FOAM Journal Syntax - Zed Extension

A Zed editor extension that provides syntax highlighting for FOAM Journal (`.jrl`) files used by the [FOAM3 framework](https://github.com/kgrgreer/foam3).

## Overview

FOAM Journal files (`.jrl`) are the persistence and configuration format for the FOAM3 framework. They contain data entries wrapped in command functions:

```
// Service definition
p({
  "class": "foam.core.boot.CSpec",
  "name": "myDAO",
  "serve": true
})

// Remove entry
r({"class":"foam.core.auth.Permission","id":"old.permission"})
```

### Commands
| Command | Meaning |
|---------|---------|
| `p({...})` | **Put** - insert or update a record |
| `r({...})` | **Remove** - delete a record |
| `c({...})` | **Create** - create a new record |
| `v({...})` | **Version** - version marker |

## Features

- Syntax highlighting for `.jrl` files
- JSON-level highlighting for object properties, strings, numbers, booleans
- `class` property values highlighted as types
- `id` and `name` values highlighted distinctly
- Bracket matching
- Code outline support
- Auto-indentation

## Installation

### From Extensions Panel
1. Open Zed
2. Open Extensions panel (`Cmd+Shift+X` / `Ctrl+Shift+X`)
3. Search for "FOAM Journal"
4. Click Install

### Development Installation
1. Clone this repository
2. In Zed, open command palette (`Cmd+Shift+P` / `Ctrl+Shift+P`)
3. Run "zed: install dev extension" and select this folder

## Limitations

This extension currently uses the `tree-sitter-json` grammar, which means:
- `p()`, `r()`, `c()` command wrappers are not highlighted as functions
- `//` comments are not highlighted (not valid JSON)
- Unquoted keys (e.g., `class:` vs `"class":`) are not parsed
- Triple-quoted strings (`"""..."""`) are not recognized
- Backtick strings are not recognized

A custom `tree-sitter-foam-journal` grammar is planned to address these.

## Project Structure

```
foam-journal-syntax-zed/
├── extension.toml              # Extension configuration
├── languages/
│   └── foam-journal/
│       ├── config.toml         # Language settings
│       ├── highlights.scm      # Syntax highlighting rules
│       ├── brackets.scm        # Bracket matching
│       ├── indents.scm         # Auto-indentation rules
│       └── outline.scm         # Code outline/structure
├── sample.jrl                  # Sample FOAM journal file
└── README.md
```

## Related Resources

- [FOAM3 Framework](https://github.com/kgrgreer/foam3)
- [Tree-sitter JSON Grammar](https://github.com/tree-sitter/tree-sitter-json)
- [Zed Editor](https://zed.dev)
- [Zed Language Extensions](https://zed.dev/docs/extensions/languages)

## License

MIT License - see LICENSE file for details.
