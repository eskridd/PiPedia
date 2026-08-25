# Fibonacci Sequence

Start with 0 and 1. Every term after that is the sum of the two before it:

$$0,\ 1,\ 1,\ 2,\ 3,\ 5,\ 8,\ 13,\ 21,\ 34,\ 55,\ \dots$$

As a rule:

$$F_n = F_{n-1} + F_{n-2}, \qquad F_0 = 0,\quad F_1 = 1$$

That is the entire recipe, and it produces a sequence that keeps showing up in places its inventor never imagined.

## Where it came from

The sequence reached European readers through Leonardo of Pisa, better known as Fibonacci, in his 1202 book *Liber Abaci*. His famous example was about rabbits: begin with one pair, let every mature pair produce one new pair per month, and count the pairs as the months pass. The counts land exactly on these numbers.

The pattern itself was much older. Indian scholars studying poetry had described the same rule centuries earlier while counting arrangements of long and short syllables, with Virahanka and Hemachandra writing it down explicitly around a thousand years ago. Fibonacci gets the name; the idea predates him by a wide margin.

## The golden ratio connection

Divide each term by the one before it:

| Ratio | Value |
|---|---|
| $8 / 5$ | $1.6$ |
| $55 / 34$ | $1.6176\ldots$ |
| $144 / 89$ | $1.61797\ldots$ |

The quotients settle toward $\varphi \approx 1.618$, the [[Golden-Ratio]]. Binet's formula makes the relationship exact:

$$F_n = \frac{\varphi^n - (-\varphi)^{-n}}{\sqrt{5}}$$

It looks like that formula should spit out fractions, since it is built from irrational numbers. The irrational parts cancel perfectly on every term, leaving whole numbers every time.

## Fibonacci in nature

- **Petals**: lilies have 3, buttercups 5, delphiniums often 8, and some daisies 13, 21, or 34
- **Sunflower heads**: seeds sit in spiral arms, most often 34 in one direction and 55 in the other
- **Pinecones and pineapples**: scale spirals commonly come out as neighboring Fibonacci numbers like 8 and 13
- **Honeybee family trees**: a male bee has 1 parent, 2 grandparents, 3 great-grandparents, then 5, then 8

One honest caveat: not every plant follows the pattern, and some claimed sightings are wishful counting. But sunflower and pinecone spiral counts land on consecutive Fibonacci numbers often enough that coincidence is off the table. The leading explanation is packing efficiency: new seeds emerge at the golden angle from the previous one, which fills space tightly without forming wasteful rows, and Fibonacci spirals fall out of that rule automatically.

## Computing it without the trap

The recursive definition translates directly into code and directly into disaster:

```python
def fib_naive(n):
    return n if n < 2 else fib_naive(n - 1) + fib_naive(n - 2)
```

This recomputes the same values over and over until the runtime grows roughly in proportion to the answer itself. A loop that remembers the last two terms does the same job in n steps:

```python
def fib(n):
    a, b = 0, 1
    for _ in range(n):
        a, b = b, a + b
    return a
```

There are faster tricks still: doubling formulas jump straight from $F_k$ to $F_{2k}$, so even the millionth Fibonacci number takes only about twenty steps to reach.

## One identity worth knowing

Consecutive Fibonacci numbers share nothing but 1, and the general version is neater:

$$\gcd(F_m, F_n) = F_{\gcd(m, n)}$$

For example, the greatest common divisor of $F_{45}$ and $F_{30}$ works out to $F_{15} = 610$. Identities like this are why number theorists keep the sequence close.

## See also

- [[Golden-Ratio]]: where all those ratios converge
- [[About-Pi]]: PiPedia's other favorite number
- [[Prime-Numbers]]: another shelf neighbor with hidden depths
- [[Math]]: the rest of the math articles
