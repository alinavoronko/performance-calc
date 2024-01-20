# Performance result analysis

The goal of this Angular application is to analyze performance results from https://github.com/alinavoronko/kursa-darbs

## Running the app

Run `npm run start` to start the app. Navigate to `http://localhost:4200/`.

## How to use it

Follow the instructions & obtain the matrix multiplication results by running a performance measuring script. The results will be output to the terminal.
The results will look similar to:
```
JS time results:
[{"heapSize":2710824,"deltaHeapSize":32552,"timeWithRender":53.22594999987632,"measuredTime":0.2999999998137355},{"heapSize":2781624,"deltaHeapSize":60808,"timeWithRender":49.87194800004363,"measuredTime":0.40000000037252903}]
WASM time results:
[{"heapSize":2778636,"deltaHeapSize":34992,"timeWithRender":39.858904000371695,"measuredTime":0.20000000018626451,"startMemory":1179648,"memoryDiff":0},{"heapSize":2824776,"deltaHeapSize":36132,"timeWithRender":42.53840500023216,"measuredTime":0.30000000074505806,"startMemory":1179648,"memoryDiff":0}]
```
Paste the JS time results array into into the corresponding input field. Do the same for WASM time results array. Press submit button in order to obtain the results.