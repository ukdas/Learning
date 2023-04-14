/**
 * Timeout variables.
 */
export const enum TimeOut {
  DefaultLoopWaitTime = 5000, // 5 secs
  DefaultWaitTime = 30000, // 30 secs
  DefaultMaxWaitTime = 180000, // 3 minutes
  LoadTimeOut = 20000, // 20 secs
  NavigationTimeout = 60000, // 60000 ms (1 minute)
  OneMinuteTimeOut = 60000, // 1 minute
  PageLoadTimeOut = 30000, // 30 secs
  TestTimeout = 240000, // 240000 ms (4 minutes)
  TestTimeoutAverage = 360000, // 6 minutes
  TestTimeoutMax = 600000, // 600000 ms (10 minutes)
  TwoMinutesTimeout = 120000, // 2 minutes,
  ThreeMinutesTimeout = 180000,
}

/**
 * View port size.
 */
export const ViewPort = {
  Default: {
    Height: 800,
    Width: 1280,
  },
};
