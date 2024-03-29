import { RingBuffer } from '../src/ringbuffer.js'
import { List } from '@toolbuilder/list'

const iterations = 50000000
const length = 100

const time = (queue) => {
  for (let i = 0; i < length; ++i) {
    queue.push(i)
  }
  for (let i = 0; i < iterations; ++i) {
    queue.shift()
    queue.push(i)
  }
}

console.time('ringbuffer')
time(new RingBuffer(length))
console.timeEnd('ringbuffer')

console.time('list')
time(new List())
console.timeEnd('list')

console.time('array')
time([])
console.timeEnd('array')
