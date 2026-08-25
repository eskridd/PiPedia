# Welcome to PiPedia

PiPedia is a little encyclopedia that anyone can edit. Every article is a plain Markdown file, and the whole site runs on GitHub Pages. There is no server to manage and nothing to install.

If you can type, you can publish here.

## Browse by category

| Category | Articles |
|---|---|
| [[Tech]] | [[Linux]], [[Kernel]], [[Git]], [[Markdown]], [[Open-Source]] |
| [[Birds]] | [[Peregrine-Falcon]], [[Barn-Owl]], [[Emperor-Penguin]], [[Ruby-Throated-Hummingbird]], [[Common-Raven]] |
| [[Wild-Animals]] | [[Red-Fox]], [[African-Elephant]], [[Snow-Leopard]], [[Honey-Bee]], [[Tardigrade]] |
| [[Sea-Life]] | [[Blue-Whale]], [[Great-White-Shark]], [[Common-Octopus]], [[Sea-Otter]], [[Mantis-Shrimp]] |

## Start elsewhere

| Article | What it is |
|---|---|
| [[About-Pi]] | The star of the show: history, formulas, and fun facts about π |
| [[How-to-Contribute]] | Add or edit an article in two minutes, no setup or fork required |
| [[Sandbox]] | A practice page you can edit however you like |

## Quick links

- [All articles](#/all): browse everything we have so far
- **Search**: press <kbd>/</kbd> anywhere and start typing
- [Random article](#/): let chance pick for you
- **+ New page**: write something new right from your browser

## What the site can render

Math first, of course. Here is Euler's identity, probably the most beautiful formula in mathematics:

$$e^{i\pi} + 1 = 0$$

And the Leibniz series, which crawls toward π one fraction at a time:

$$\pi = 4 \sum_{n=0}^{\infty} \frac{(-1)^n}{2n+1}$$

Inline math works too: the area of a unit circle is $A = \pi r^2$.

```python
from decimal import Decimal, getcontext

def pi_chudnovsky(terms):
    getcontext().prec = terms * 14 + 10
    C = 426880 * Decimal(10005).sqrt()
    M, L, X, K, S = 1, 13591409, 1, 6, Decimal(13591409)
    for k in range(1, terms):
        M = (K**3 - 16*K) * M // (k**3)
        L += 545140134
        X *= -262537412640768000
        S += Decimal(M * L) / X
        K += 12
    return C / S

print(pi_chudnovsky(3))
```

Three terms are already enough for fourteen correct digits of π.

To link between articles, wrap the title in double brackets: `[[About-Pi]]` becomes [[About-Pi]]. Ordinary markdown links like `[text](Page-Name)` work as well.

So, ready to write something? Hit **+ New page** at the top, or skim [[How-to-Contribute]] first. Happy writing!
