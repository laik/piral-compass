// Helper to convert CPU K8S units to numbers
export function cpuUnitsToNumber(cpu) {
    const cpuNum = parseInt(cpu);
    const billion = 1000000 * 1000;
    if (cpu.includes("m"))
        return cpuNum / 1000;
    if (cpu.includes("u"))
        return cpuNum / 1000000;
    if (cpu.includes("n"))
        return cpuNum / billion;
    return parseFloat(cpu);
}
//# sourceMappingURL=convertCpu.js.map