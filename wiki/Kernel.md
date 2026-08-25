# Kernel

The **kernel** is the core of an operating system: the program that owns the hardware and lets everything else share it. When your text editor saves a file, plays a sound, or grabs a network packet, it is asking the kernel to do the real work.

## What a kernel actually does

- **Process management**: decides which programs run on which CPU cores, and when, switching between them thousands of times a second
- **Memory management**: gives each process the illusion of having its own memory, protects them from each other, and swaps rarely used pages to disk
- **Device drivers**: speaks the language of disks, keyboards, GPUs, and Wi-Fi chips so applications never have to
- **System calls**: exposes a narrow, safe doorway (open, read, write, fork) between user programs and privileged hardware operations

Code runs in one of two worlds: **user space**, where ordinary programs live with limited privileges, and **kernel space**, where the kernel runs with full hardware authority. The boundary is what stops one crashed app from taking down the machine.

## Flavors of kernel

| Type | Idea | Examples |
|---|---|---|
| Monolithic | everything in one big privileged program, fast but huge | [[Linux]] |
| Microkernel | tiny kernel, drivers and services run as user processes | MINIX, QNX, seL4 |
| Hybrid | monolithic speed with microkernel structure bolted on | Windows NT, macOS XNU |

## By the numbers

| Measurement | Value |
|---|---|
| Linux system calls | roughly 400+ |
| Context switches per second | tens of thousands on a busy laptop |
| MINIX source goal | about 6,000 lines in its original form |

## See also

- [[Linux]], the most famous kernel there is
- [[Open-Source]]: why kernels get built in public
- [[Tech]] for more articles like this
- [[Home]]
