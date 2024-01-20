export interface PerformanceResult {
    averageExecTime: number;
    averageRenderTime: number;
    averageMemoryUsage: number;
}

export interface RelativePerformanceResult {
    execTimeRatio: number;
    renderTimeRatio: number;
    memoryRatio: number;
}