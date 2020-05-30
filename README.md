# RingBuffer

`RingBuffer` implements classic fixed length ring buffer (aka circular queue). For the ring buffer use case, `RingBuffer` is a drop in replacement for `Array` because `push`, `pop`, `unshift`, `shift`, and `length` match the signature of Array. For buffer operation either use `push/shift` or `unshift/pop` together.

`RingBuffer` is substantially faster than `Array` for the ring buffer use case. Newer versions of Node are much faster overall, and have improved dramatically for this use case. Using Node 12.16.3, relative times for the same number of push/shift operations are:

* RingBuffer: 411ms
* Array: 3430ms
* @toolbuilder/list: 2655ms - a doubly linked list

`RingBuffer` is a minimalist implementation. If you wish to have functions like map, filter, forEach, and such, please use `RingBuffer` with an iterable library such as [Iterablefu](https://github.com/toolbuilder/iterablefu).

If you want a priority queue, you could base it on something like [@toolbuilder/list](https://github.com/toolbuilder/list), which supports insertion within the list.

There are lots of ring buffer implementations on NPM. This implementation:

* Drop in replacement for `Array` for the ring buffer use case.
* Provides `module` property in `package.json` pointing to the ES module for bundlers.
* Requires no compiler since it uses [esm](https://github.com/standard-things/esm) to provide the NPM module.
* Provides `Symbol.iterator` generator.

## Installation

```bash
npm install --save @toolbuilder/ring-buffer
```

## Getting Started

The API documentation is [here](docs/ringbuffer.md).  This is a quick example to get you started.

```javascript
import { RingBuffer } from '@toolbuilder/ring-buffer'
const log = console.log

const ringBuffer = new RingBuffer(10) // max length 10
log(ringBuffer.length) // prints 0

['A', 'B', 'C'].forEach(x => ringBuffer.push(x))
log(ringBuffer.length) // prints 3
log(ringBuffer.front()) // prints 'A'
log(ringBuffer.back()) // prints 'C'
log(ringBuffer.shift()) // prints 'A'
log(ringBuffer.length) // prints 2
log([...ringBuffer]) // prints ['A', 'B']
log(ringBuffer.length) // prints 2
```

If you're using ES modules, you can import directly if you like:

```javascript
import { RingBuffer } from '@toolbuilder/ring-buffer/src/ringbuffer.js'
```

## Performance

There is a simplistic performance test:

```bash
# from package root:
node -r esm test/ringbuffer_perf.js
```

## Alternatives

There are **lots** of alternatives on npm.

## Contributing

Contributions are welcome. Please create a pull request.

I use [pnpm](https://pnpm.js.org/) instead of npm, which is why `pnpm-lock.yaml` exists in the git repo.

## Issues

This project uses Github issues.
