export interface Measurement {
  heapSize: number;
  deltaHeapSize: number;
  timeWithRender: number;
  measuredTime: number;
  startMemory?: number;
  memoryDiff?: number;
}
