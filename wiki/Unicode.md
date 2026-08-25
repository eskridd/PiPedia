# Unicode

**Unicode** is the agreement that every character ever written gets its own number. The letter A is 65, the Greek letter this site is named after (π) is U+03C0, and an elephant emoji has a number too. Before Unicode, hundreds of incompatible encodings meant a file written on one computer arrived on another as gibberish called mojibake.

## Code points and UTF-8

A character's number is its **code point**, usually written like `U+1F418` for the elephant. How those numbers become bytes depends on the encoding, and one encoding won everywhere: **UTF-8**.

UTF-8 is brilliantly designed:

- Plain ASCII text is unchanged byte for byte, so decades of old files remain valid
- Common characters use fewer bytes; rarer ones use up to four
- There is exactly one valid way to encode each character, which blocks sneaky look-alike attacks

## By the numbers

| Measurement | Value |
|---|---|
| Characters assigned so far | about 150,000 |
| Possible code point space | over 1 million |
| Bytes per character in UTF-8 | 1 to 4 |
| π in Unicode | U+03C0 |

## Why you care

Every search that survives accents (`cafe` finds `café`), every emoji that renders on both your phone and your grandmother's, every non-English website that just works: that is Unicode doing its invisible job. This wiki stores every article in UTF-8 Markdown files, which is why math symbols and arrows render identically everywhere.

Fun party fact: the first 128 Unicode code points are identical to ASCII from 1963, which means half of any modern text file would still be readable to a machine from the Kennedy administration.

## See also

- [[Number-Systems]]: what bytes and hex actually mean
- [[Markdown]]: the other half of how these pages are stored
- [[Tech]] for more articles like this
- [[Home]]
