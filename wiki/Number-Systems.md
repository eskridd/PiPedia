# Number Systems

Computers count in ways that look strange until you see the trick: a **number system** is just a choice of base, how many symbols you use before rolling over to a new column. Humans chose ten because of fingers. Computers use two because transistors are great at on and off and terrible at nine.

## Binary: base 2

Binary has only two digits, 0 and 1. Each column is worth twice the one to its right:

```
1   0   1   1
8   4   2   1      →  8 + 2 + 1 = 11
```

That is all a bit is: one column, one coin flip. Eight bits make a byte, which can hold 256 values (0 to 255), enough for one character in the ASCII days.

## Hexadecimal: base 16

Hex uses sixteen digits: 0 through 9 then A through F. Its superpower is that each hex digit is exactly four binary bits, so two hex digits describe any byte perfectly:

```
11111100  =  FC
00000010  =  02
```

Programmers write hex with a prefix so nobody mistakes it for decimal: `0xFC`. You have already seen it if you have ever picked a color like `#7c3aed`, which is really three bytes: red `0x7C`, green `0x3A`, blue `0xED`.

## Handy landmarks

| Decimal | Binary | Hex |
|---|---|---|
| 8 | 1000 | 0x8 |
| 15 | 1111 | 0xF |
| 16 | 10000 | 0x10 |
| 255 | 11111111 | 0xFF |
| 1024 | 10000000000 | 0x400 |

Two approximations every programmer keeps handy: $2^{10} \approx 10^3$ (so a kilobyte is about a thousand bytes) and one hex digit equals exactly four bits.

## See also

- [[Unicode]]: what those bytes become when they meet text
- [[Encryption]]: where enormous numbers do the heavy lifting
- [[Tech]] for more articles like this
- [[Home]]
