# Regular Expressions

A **regular expression** (regex) is a tiny language for describing text patterns, so a computer can find them for you. Need every email address in a log, every date in 2024, every line not containing the word cat? That is regex work. It first appeared in mathematics via Stephen Kleene in 1951, escaped into Unix through `grep` in 1974, and has been terrifying newcomers ever since.

## The building blocks

| Pattern | Matches |
|---|---|
| `abc` | those letters, exactly |
| `.` | any single character |
| `\d`, `\w`, `\s` | digit, letter or digit or underscore, whitespace |
| `[aeiou]` | any one vowel |
| `^` and `$` | start and end of line |
| `colou?r` | color or colour (the u is optional) |
| `\d{4}` | exactly four digits |
| `(cat\|dog)` | either word |

Put together: `\b(19\|20)\d{2}\b` finds four-digit years like 1991 or 2038 while ignoring phone numbers.

```python
import re

text = "PiPedia started 2026; Pi is ~3.14159 since 1706."
print(re.findall(r"\b(19|20)\d{2}\b", text))
```

## Honest warnings

- Regex cannot reliably parse HTML or nested structures; use a real parser
- Greedy matching (`.*`) grabs more than beginners expect; prefer lazy (`.*?`)
- Catastrophic backtracking can freeze a program on crafted input, so never feed untrusted patterns into your own code

## Flavors

Perl-compatible (PCRE), JavaScript, Python, and Go all speak slightly different dialects of the same idea. Learn one and the others feel like accents.

## See also

- [[Markdown]]: another small language that pays off forever
- [[Tech]] for more articles like this
- [[Home]]
