# Password Security

Most people do not have a password problem; they have three: reusing one password everywhere, picking something guessable, and trusting humans to remember both. Here is what actually works, and why.

## Length beats cleverness

Attackers do not guess like humans; they try billions of candidates per second with word lists and mutation rules. `P@ssw0rd!` falls instantly despite its symbols. Four random common words (`ember-cactus-violet-9lakes`) are easier to remember and vastly harder to crack. Length is the lever that matters most.

## Use a password manager

A password manager generates a long random string per site, remembers it for you, and fills it in. You memorize exactly one strong passphrase and every account gets its own unique key. This single habit neutralizes the most common attack, **credential stuffing**, where thieves try passwords leaked from other sites on your email everywhere.

## Add a second factor

Two-factor authentication means a stolen password alone is not enough:

- **TOTP apps** generate six-digit codes that expire in 30 seconds
- **Passkeys** (FIDO2) use cryptographic key pairs tied to the site, so phishing a password stops working entirely
- SMS codes help but are the weakest option, since phone numbers can be hijacked

## What sites should do (and good ones do)

Responsible sites never store your actual password. They store a **salted hash** using slow functions like bcrypt or Argon2, so even a stolen database does not reveal logins. If a site can ever email you your current password, it was storing it wrong all along.

## By the numbers

| Measurement | Value |
|---|---|
| Time to brute-force an 8-character random password | hours to days |
| Same, at 16+ characters | longer than civilizations |
| Passwords you must remember with a manager | exactly one |

## See also

- [[Encryption]]: hashing versus encryption, properly explained
- [[Tech]] for more articles like this
- [[Home]]
