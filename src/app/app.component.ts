import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Measurement } from './models/measurement.model';
import {
  PerformanceResult,
  RelativePerformanceResult,
} from './models/result.model';
import { Implementation } from './models/implementation';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'performance-calc';
  perfTestForm = new FormGroup({
    jsResults: new FormControl(''),
    wasmResults: new FormControl(''),
  });
  jsPerfResult: PerformanceResult | null = null;
  wasmPerfResult: PerformanceResult | null = null;
  comparisonResult: RelativePerformanceResult | null = null;

  onSubmit() {
    const jsRes = this.perfTestForm.controls.jsResults.value ?? '';
    const wasmRes = this.perfTestForm.controls.wasmResults.value ?? '';
    if (jsRes) {
      this.jsPerfResult = this.parseResults(jsRes, Implementation.JS);
    }
    if (wasmRes) {
      this.wasmPerfResult = this.parseResults(wasmRes, Implementation.WASM);
      console.log(this.wasmPerfResult);
    }
    if (this.jsPerfResult && this.wasmPerfResult) {
      this.comparisonResult = this.compareRelatively(
        this.jsPerfResult,
        this.wasmPerfResult
      );
    }
    console.log(jsRes, wasmRes);
  }

  parseResults(res: string, impl: Implementation): PerformanceResult {
    let parsedResult: Measurement[];
    parsedResult = JSON.parse(res);
    let execTimeSum = 0;
    let renderTimeSum = 0;
    let memoryUsageSum = 0;
    let entryCount = parsedResult.length;

    for (let i = 0; i < entryCount; i++) {
      execTimeSum += parsedResult[i].measuredTime;
      renderTimeSum += parsedResult[i].timeWithRender;
      console.log(`execTime ${execTimeSum} renderTime ${renderTimeSum}`);
      if (impl === Implementation.JS) {
        memoryUsageSum += parsedResult[i].heapSize;
        console.log(`memory ${memoryUsageSum}`);
      } else {
        // TODO: replace with just LinearMemorySize
        let totalUsedMemory =
          parsedResult[i].heapSize +
          parsedResult[i].startMemory! +
          parsedResult[i].memoryDiff!;
        memoryUsageSum +=
          parsedResult[i].heapSize +
          parsedResult[i].startMemory! +
          parsedResult[i].memoryDiff!;
        console.log(`memory ${memoryUsageSum}`);
      }
    }
    return {
      averageExecTime: execTimeSum / entryCount,
      averageRenderTime: renderTimeSum / entryCount,
      averageMemoryUsage: memoryUsageSum / entryCount,
    };
  }

  compareRelatively(
    jsPerfResult: PerformanceResult,
    wasmPerfResult: PerformanceResult
  ): RelativePerformanceResult {
    return {
      execTimeRatio: Math.round(
        ((wasmPerfResult.averageExecTime - jsPerfResult.averageExecTime) /
          jsPerfResult.averageExecTime) *
          100
      ),
      renderTimeRatio: Math.round(
        ((wasmPerfResult.averageRenderTime - jsPerfResult.averageRenderTime) /
          jsPerfResult.averageRenderTime) *
          100
      ),
      memoryRatio: Math.round(
        ((wasmPerfResult.averageMemoryUsage - jsPerfResult.averageMemoryUsage) /
          jsPerfResult.averageMemoryUsage) *
          100
      ),
    };
  }

  resetForm() {
    this.perfTestForm.reset();
  }
}
