import { processOutput } from "../getCpuStatsByProcess";

const SAMPLE_STATS = `27986 (OkHttp TaskRunn) S 480 480 0 0 -1 1077952576 6 0 0 0 50 20 40 0 20 0 53 0 233304293 1726836736 45377 18446744073709551615 1 1 0 0 0 0 4612 1 1073775864 0 0 0 -1 5 0 0 0 0 0 0 0 0 0 0 0 0 0
27987 (FrescoDecodeExe) S 480 480 0 0 -1 1077952576 3966 0 0 0 23 3 7 0 30 10 53 0 233304298 1726836736 45377 18446744073709551615 1 1 0 0 0 0 4612 1 1073775864 0 0 0 -1 2 0 0 0 0 0 0 0 0 0 0 0 0 0
27988 (content.com/...) S 480 480 0 0 -1 1077952576 396 0 0 0 28 5 5 0 20 0 53 0 233304298 1726836736 45377 18446744073709551615 1 1 0 0 0 0 4612 1 1073775864 0 0 0 -1 5 0 0 0 0 0 0 0 0 0 0 0 0 0
1234 (com.example) S 480 480 0 0 -1 1077952576 396 0 0 0 28 5 5 0 20 0 53 0 233304298 1726836736 45377 18446744073709551615 1 1 0 0 0 0 4612 1 1073775864 0 0 0 -1 5 0 0 0 0 0 0 0 0 0 0 0 0 0`;

describe("getCpuStatsByProcess", () => {
  it("extract CPU thread stats from profiler output", () => {
    expect(processOutput(SAMPLE_STATS, "1234")).toMatchInlineSnapshot(`
      [
        {
          "cpuNumber": "5",
          "processId": "27986",
          "processName": "OkHttp TaskRunn",
          "totalCpuTime": 70,
        },
        {
          "cpuNumber": "2",
          "processId": "27987",
          "processName": "FrescoDecodeExe",
          "totalCpuTime": 26,
        },
        {
          "cpuNumber": "5",
          "processId": "27988",
          "processName": "content.com/...",
          "totalCpuTime": 33,
        },
        {
          "cpuNumber": "5",
          "processId": "1234",
          "processName": "UI Thread",
          "totalCpuTime": 33,
        },
      ]
    `);
  });

  it("handles empty process name", () => {
    expect(
      processOutput(
        `10180 () S 901 901 0 0 -1 1077936192 2 362 0 12 0 0 0 0 10 -10 130 0 43243569 18565066752 83083 18446744073709551615 1 1 0 0 0 0 4612 1 1073779960 0 0 0 -1 3 0 0 0 0 0 0 0 0 0 0 0 0 0`,
        "1234"
      )
    ).toMatchInlineSnapshot(`
      [
        {
          "cpuNumber": "3",
          "processId": "10180",
          "processName": "Empty name",
          "totalCpuTime": 0,
        },
      ]
    `);
  });

  it("handles AWCN Worker(M)1 process name", () => {
    expect(
      processOutput(
        `16360 (AWCN Worker(M)1) S 372 372 0 0 -1 1077936192 70 0 3 0 0 0 0 0 20 0 35 0 58748 16236625920 43973 18446744073709551615 1 1 0 0 0 0 4608 1 1073775868 0 0 0 -1 2 0 0 0 0 0 0 0 0 0 0 0 0 0`,
        "1234"
      )
    ).toMatchInlineSnapshot(`
      [
        {
          "cpuNumber": "2",
          "processId": "16360",
          "processName": "AWCN Worker(M)1",
          "totalCpuTime": 0,
        },
      ]
    `);
  });
});
