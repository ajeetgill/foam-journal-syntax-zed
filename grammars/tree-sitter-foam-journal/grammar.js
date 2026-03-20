/// <reference types="tree-sitter-cli/dsl" />
// @ts-check

/**
 * Tree-sitter grammar for FOAM Journal (.jrl) files.
 *
 * FOAM journals use commands like p({...}), r({...}), c({...}), v({...})
 * to represent Put, Remove, Create, and Version operations on FObjects.
 * The object bodies use a relaxed JSON syntax: unquoted keys, triple-quoted
 * strings (""" ... """), backtick strings, and // line comments.
 */

module.exports = grammar({
  name: "foam_journal",

  extras: $ => [
    /\s/,
    $.comment,
  ],

  rules: {
    // Root: a journal is a sequence of entries
    source_file: $ => repeat($._definition),

    _definition: $ => choice(
      $.entry,
      $.prefixed_entry,
    ),

    // Prefixed entry: daoName.p({...}) — for routing journals
    prefixed_entry: $ => seq(
      field("dao", $.identifier),
      ".",
      $.entry,
    ),

    // Entry: command(object)
    entry: $ => seq(
      field("command", $.command),
      "(",
      field("body", $.object),
      ")",
    ),

    // Commands: p, r, c, v
    command: $ => choice("p", "r", "c", "v"),

    // Object: { key: value, ... }
    object: $ => seq(
      "{",
      optional(seq(
        $.pair,
        repeat(seq(",", $.pair)),
        optional(","),
      )),
      "}",
    ),

    // Key-value pair
    pair: $ => seq(
      field("key", $.key),
      ":",
      field("value", $._value),
    ),

    // Keys can be quoted or unquoted
    key: $ => choice(
      $.string,
      $.identifier,
    ),

    // Values
    _value: $ => choice(
      $.string,
      $.triple_string,
      $.backtick_string,
      $.number,
      $.true,
      $.false,
      $.null,
      $.object,
      $.array,
    ),

    // Array: [ value, ... ]
    array: $ => seq(
      "[",
      optional(seq(
        $._value,
        repeat(seq(",", $._value)),
        optional(","),
      )),
      "]",
    ),

    // Double-quoted string with escape sequences
    string: $ => seq(
      '"',
      repeat(choice(
        $.string_content,
        $.escape_sequence,
      )),
      '"',
    ),

    string_content: $ => token.immediate(prec(1, /[^"\\]+/)),

    escape_sequence: $ => token.immediate(seq(
      "\\",
      choice(
        /["\\/bfnrt]/,
        /u[0-9a-fA-F]{4}/,
      ),
    )),

    // Triple-quoted string: """..."""
    // Used for multi-line Java/JS code in serviceScript, javaCode, etc.
    triple_string: $ => seq(
      '"""',
      optional($.triple_string_content),
      '"""',
    ),

    // Content between triple quotes: any chars that aren't three consecutive "
    // We match sequences of non-quote chars or lone/double quotes not followed by a third
    triple_string_content: $ => repeat1(choice(
      /[^"]+/,
      /"[^"]/,
      /""[^"]/,
    )),

    // Backtick string: `...`
    // Also used for multi-line code blocks
    backtick_string: $ => seq(
      "`",
      optional($.backtick_string_content),
      "`",
    ),

    backtick_string_content: $ => /[^`]+/,

    // Number: integer or float, with optional sign and exponent
    number: $ => {
      const decimal = /[0-9]+/;
      const signed_integer = seq(optional(choice("-", "+")), decimal);
      const exponent = seq(choice("e", "E"), signed_integer);
      const decimal_number = choice(
        seq(optional("-"), decimal, ".", optional(decimal), optional(exponent)),
        seq(optional("-"), decimal, exponent),
        seq(optional("-"), decimal),
      );
      return token(decimal_number);
    },

    true: $ => "true",
    false: $ => "false",
    null: $ => "null",

    // Unquoted identifier for keys: camelCase, PascalCase, with dots allowed
    identifier: $ => /[a-zA-Z_][a-zA-Z0-9_]*/,

    // Line comments
    comment: $ => token(seq("//", /.*/)),
  },
});
