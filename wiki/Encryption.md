# Encryption

**Encryption** is math that scrambles information so only someone holding the right key can read it. It is the reason you can type a password into a cafe's open Wi-Fi, message a friend across the planet, and pay for things online without handing secrets to every machine in between.

## Two kinds of keys

- **Symmetric encryption** uses the same key to lock and unlock. It is fast, and the modern standard is AES.
- **Asymmetric encryption** uses a key pair: a public key anyone may have and a private key its owner guards. Whatever one key locks, only the other opens. RSA and elliptic-curve cryptography work this way.

Real systems combine both: asymmetric math exchanges a fresh session key, then fast symmetric encryption carries the actual data. That handshake is what happens behind the padlock icon in your browser's address bar (TLS).

## Hashing is different

A hash function like SHA-256 mashes data into a fixed-size fingerprint with no key and no way back. It proves data has not changed; it does not hide it. Sites use salted hashes so that even they cannot read your password, only check that it matches. Confusing the two is one of the most common security mistakes.

## By the numbers

| Measurement | Value |
|---|---|
| AES key sizes | 128, 192, 256 bits |
| Brute-forcing AES-256 | more attempts than atoms in the observable universe |
| TLS handshake goal | fresh secret keys per visit |
| SHA-256 output size | 256 bits |

## See also

- [[Password-Security]]: where your half of the bargain lives
- [[Number-Systems]]: what "256 bits" actually counts
- [[Tech]] for more articles like this
- [[Home]]
