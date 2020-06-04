import { test } from 'zora'
import { RingBuffer } from '../src/ringbuffer.js'
import { RingBufferDriver } from '@toolbuilder/ring-buffer-tests'

test('test ring buffer interface', assert => {
  const driver = new RingBufferDriver() // taking default options
  const factory = (capacity) => new RingBuffer(capacity)
  const capacities = [1, 10, 100]
  capacities.forEach(capacity => {
    const [actual, expected] = driver.testRingBuffer(capacity, factory)
    assert.deepEqual(actual, expected, `ring buffer passed test suite for capacity ${capacity}`)
  })
})
