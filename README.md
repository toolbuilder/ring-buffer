# RingBuffer

`RingBuffer` implements classic fixed length ring buffer (aka circular queue). For the ring buffer use case, `RingBuffer` is a drop in replacement for `Array` because `push`, `pop`, `unshift`, `shift`, and `length` match the signature of Array. For buffer operation either use `push/shift` or `unshift/pop` together.

`RingBuffer` is substantially faster than `Array` for the ring buffer use case. Newer versions of Node are much faster overall, and have improved dramatically for this use case. Using Node v16.13.1, relative times for the same number of push/shift operations are:

* RingBuffer: 259ms
* Array: 2177ms
* @toolbuilder/list: 882ms - a doubly linked list

`RingBuffer` is a minimal implementation developed for use with [Await-For-It](https://github.com/toolbuilder/await-for-it) iterable queues.

There are two related buffers:

* [DynamicRingBuffer](https://www.npmjs.com/package/@toolbuilder/dynamic-ring-buffer) that efficiently grows and shrinks as items are added and removed.
* [PriorityBuffer](https://github.com/toolbuilder/priority-buffer) that uses your comparator to buffer items in priority order.

There are lots of ring buffer implementations on NPM. This implementation:

* Drop in replacement for `Array` for the ring buffer use case.
* Provides both `export` and `module` properties in `package.json` for ES bundlers.
* Provides `Symbol.iterator` generator.
* ES dual module that provides CommonJS and ES implementations.

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

;['A', 'B', 'C'].forEach(x => ringBuffer.push(x))
log(ringBuffer.length) // prints 3
log(ringBuffer.front()) // prints 'A'
log(ringBuffer.back()) // prints 'C'
log(ringBuffer.shift()) // pulls 'A' off the front and prints 'A'
log(ringBuffer.length) // prints 2
log([...ringBuffer]) // prints ['B', 'C']
log(ringBuffer.length) // prints 2
```

## Performance

There is a simplistic performance test:

```bash
# from package root:
node test/ringbuffer_perf.js
```

## Alternatives

There are **lots** of alternatives on npm.

## Contributing

Contributions are welcome. Please create a pull request.

* I use [pnpm](https://pnpm.js.org/) instead of npm.
* Package verification requires [pnpm](https://pnpm.io/) to be installed globally.
  * `npm install -g pnpm`
  * `pnpm install` to get the dependencies
  * `pnpm test` to run unit tests
  * `pnpm run check:packfile` generates pack file to run unit tests against Node ES and CommonJS projects, as well as Electron.
  * `pnpm run check:performance` to run the performance test
  * `pnpm run check` validates the package is ready for commit

## Issues

This project uses Github issues.

## License

MIT
