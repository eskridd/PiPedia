# Prime Numbers

A prime is a whole number above 1 whose only divisors are 1 and itself: 2, 3, 5, 7, 11, 13, and onward. Every other whole number above 1 breaks into primes in exactly one way, its factorization, which is why mathematicians call primes the atoms of arithmetic:

$$240 = 2^4 \times 3 \times 5$$

That uniqueness is the fundamental theorem of arithmetic, and it quietly supports most of the mathematics done with whole numbers.

## There are infinitely many

Euclid proved this around 300 BC with an argument you can hold in your head. Suppose the list of primes were finite. Multiply all of them together and add 1. Divide that result by any prime on the list and the remainder is always 1, so nothing on the list divides it. The new number is either itself prime or has a prime factor nobody wrote down. Either way, the list was never complete.

## How they thin out

Primes get rarer as numbers grow, but only gently. The prime number theorem says the count of primes up to x, written $\pi(x)$, stays close to:

$$\pi(x) \approx \frac{x}{\ln x}$$

Yes, mathematicians gave this function the letter π too. In practical terms, about one number in every $\ln x$ consecutive integers near x is prime: roughly 1 in 14 around a million, and 1 in 28 around a trillion.

## Finding them

Eratosthenes' sieve is over two thousand years old and still the friendliest method there is. Write down the numbers, circle 2, cross out every second number after it, move to the next survivor, repeat:

```python
def sieve(limit):
    flags = [True] * (limit + 1)
    flags[0] = flags[1] = False
    for p in range(2, int(limit ** 0.5) + 1):
        if flags[p]:
            for multiple in range(p * p, limit + 1, p):
                flags[multiple] = False
    return [n for n, ok in enumerate(flags) if ok]
```

Crossing out starts at $p^2$ because any smaller multiple of p already lost its prime status to a smaller factor.

## Open questions

Some innocent-sounding questions about primes have outlasted everyone who attacked them:

- **Twin primes**: are there infinitely many pairs like 11 and 13? Nobody knows, though Yitang Zhang proved in 2013 that some gap below 70 million repeats forever, and group effort since has squeezed the bound down to 246
- **Goldbach's conjecture**: can every even number above 2 be written as two primes? Checked past four quintillion, proof still missing
- **The Riemann hypothesis**: the deepest of the bunch, a claim about where a certain function's zeros sit that would sharpen nearly everything known about how primes are distributed

## Big game hunting

The largest known primes are Mersenne primes, numbers of the form $2^p - 1$, hunted because a fast special test exists just for them. The record as of late 2024 is $2^{136279841} - 1$, which runs past 41 million digits and was found by volunteers running GIMPS, the Great Internet Mersenne Prime Search. Joining the hunt costs a screensaver's worth of computing time and could earn you a cash prize.

## Why the internet cares

Public-key encryption rests on a lopsided fact: multiplying two large primes takes microseconds, while factoring the product back apart takes millennia. Every padlock in a browser address bar involves keys built from primes hundreds of digits long. The full story lives in [[Encryption]].

## A cameo in nature

Periodical cicadas in eastern North America spend exactly 13 or 17 years underground before emerging at once to sing, breed, and vanish again. Both numbers are prime, and biologists suspect that is no accident: a prime cycle collides least often with the population cycles of predators and with other broods, keeping the insects from meeting rivals or enemies on any regular schedule.

## See also

- [[Encryption]]: where primes pay the bills
- [[Number-Systems]]: how very large numbers get written down
- [[Golden-Ratio]] and [[Fibonacci-Sequence]]: neighbors on the math shelf
- [[About-Pi]]
- [[Math]]
