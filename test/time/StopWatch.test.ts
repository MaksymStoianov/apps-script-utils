import { IllegalStateException } from "@/exception";
import { StopWatch } from "@/time";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

/**
 * Runs one task of the given length under fake time.
 */
function run(watch: StopWatch, name: string | undefined, millis: number): void {
  if (name === undefined) {
    watch.start();
  } else {
    watch.start(name);
  }

  vi.advanceTimersByTime(millis);
  watch.stop();
}

describe("StopWatch", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(0);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe("Correct input data", () => {
    it("should start idle and empty", () => {
      const watch = new StopWatch();

      expect(watch.getId()).toBe("");
      expect(watch.isRunning()).toBe(false);
      expect(watch.currentTaskName()).toBeNull();
      expect(watch.getTaskCount()).toBe(0);
      expect(watch.getTotalTimeMillis()).toBe(0);
      expect(watch.getTotalTimeSeconds()).toBe(0);
      expect(watch.getTaskInfo()).toStrictEqual([]);
    });

    it("should carry the identifier it was created with", () => {
      expect(new StopWatch("import").getId()).toBe("import");
    });

    it("should record a completed task", () => {
      const watch = new StopWatch();

      run(watch, "read", 100);

      expect(watch.getTaskCount()).toBe(1);
      expect(watch.getTotalTimeMillis()).toBe(100);
      expect(watch.getTotalTimeSeconds()).toBe(0.1);
      expect(watch.getLastTaskName()).toBe("read");
      expect(watch.getLastTaskTimeMillis()).toBe(100);
      expect(watch.getLastTaskInfo()).toStrictEqual({
        taskName: "read",
        timeMillis: 100,
        timeSeconds: 0.1
      });
      expect(watch.getTaskInfo()).toStrictEqual([watch.getLastTaskInfo()]);
    });

    it("should give an unnamed task an empty name", () => {
      const watch = new StopWatch();

      run(watch, undefined, 50);

      expect(watch.getLastTaskName()).toBe("");
    });

    it("should accumulate tasks in order", () => {
      const watch = new StopWatch();

      run(watch, "read", 100);
      run(watch, "write", 200);

      expect(watch.getTaskCount()).toBe(2);
      expect(watch.getTotalTimeMillis()).toBe(300);
      expect(watch.getLastTaskName()).toBe("write");
      expect(watch.getTaskInfo().map((task) => task.taskName)).toStrictEqual(["read", "write"]);
    });

    it("should report the running task and leave it out of the total", () => {
      const watch = new StopWatch();

      run(watch, "read", 100);
      watch.start("write");
      vi.advanceTimersByTime(500);

      expect(watch.isRunning()).toBe(true);
      expect(watch.currentTaskName()).toBe("write");
      expect(watch.getTotalTimeMillis()).toBe(100);
      expect(watch.getTaskCount()).toBe(1);

      watch.stop();

      expect(watch.isRunning()).toBe(false);
      expect(watch.currentTaskName()).toBeNull();
      expect(watch.getTotalTimeMillis()).toBe(600);
    });

    it("should hand out a copy of the task list", () => {
      const watch = new StopWatch();

      run(watch, "read", 100);

      const tasks = watch.getTaskInfo();

      tasks.pop();

      expect(watch.getTaskInfo()).toHaveLength(1);
    });

    it("should keep counting and remember the last task when the list is off", () => {
      const watch = new StopWatch();

      watch.setKeepTaskList(false);
      run(watch, "a", 10);
      run(watch, "b", 20);

      expect(watch.getTaskCount()).toBe(2);
      expect(watch.getTotalTimeMillis()).toBe(30);
      expect(watch.getLastTaskName()).toBe("b");
      expect(watch.getLastTaskTimeMillis()).toBe(20);
    });

    it("should summarise the total on one line", () => {
      const watch = new StopWatch("import");

      run(watch, "read", 100);
      run(watch, "write", 200);

      expect(watch.shortSummary()).toBe("StopWatch 'import': 300 ms");
    });

    it("should print a table of the tasks", () => {
      const watch = new StopWatch("import");

      run(watch, "read", 100);
      run(watch, "write", 200);

      expect(watch.prettyPrint()).toBe(
        [
          "StopWatch 'import': 300 ms",
          "---------------------------------------------",
          "ms     %     Task name",
          "---------------------------------------------",
          "100     33%  read",
          "200     67%  write"
        ].join("\n")
      );
    });

    it("should print an empty table for a fresh watch", () => {
      expect(new StopWatch().prettyPrint()).toBe(
        [
          "StopWatch '': 0 ms",
          "---------------------------------------------",
          "ms     %     Task name",
          "---------------------------------------------"
        ].join("\n")
      );
    });

    it("should say so when the task list is not kept", () => {
      const watch = new StopWatch("loop");

      watch.setKeepTaskList(false);
      run(watch, "a", 10);

      expect(watch.prettyPrint()).toBe(
        [
          "StopWatch 'loop': 10 ms",
          "---------------------------------------------",
          "No task info kept"
        ].join("\n")
      );
      expect(watch.toString()).toBe("StopWatch 'loop': 10 ms; no task info kept");
    });

    it("should append every task to its string form", () => {
      const watch = new StopWatch("import");

      run(watch, "read", 100);
      run(watch, "write", 200);

      expect(watch.toString()).toBe(
        "StopWatch 'import': 300 ms; [read] took 100 ms = 33%; [write] took 200 ms = 67%"
      );
      expect(new StopWatch().toString()).toBe("StopWatch '': 0 ms");
    });

    it("should report zero percent for tasks that took no time", () => {
      const watch = new StopWatch();

      run(watch, "instant", 0);

      expect(watch.toString()).toBe("StopWatch '': 0 ms; [instant] took 0 ms = 0%");
    });
  });

  describe("Incorrect input data", () => {
    it("should refuse to start while running", () => {
      const watch = new StopWatch();

      watch.start("a");

      expect(() => watch.start("b")).toThrow(IllegalStateException);
      expect(() => watch.start("b")).toThrow("Can't start StopWatch: it's already running");
    });

    it("should refuse to stop while idle", () => {
      const watch = new StopWatch();

      expect(() => watch.stop()).toThrow(IllegalStateException);
      expect(() => watch.stop()).toThrow("Can't stop StopWatch: it's not running");
    });

    it("should have no last task before one completes", () => {
      const watch = new StopWatch();

      watch.start("pending");

      expect(() => watch.getLastTaskTimeMillis()).toThrow(
        "No tasks run: can't get last task interval"
      );
      expect(() => watch.getLastTaskName()).toThrow("No tasks run: can't get last task name");
      expect(() => watch.getLastTaskInfo()).toThrow("No tasks run: can't get last task info");
      expect(() => watch.getLastTaskInfo()).toThrow(IllegalStateException);
    });

    it("should refuse to list tasks when the list is not kept", () => {
      const watch = new StopWatch();

      watch.setKeepTaskList(false);

      expect(() => watch.getTaskInfo()).toThrow(IllegalStateException);
      expect(() => watch.getTaskInfo()).toThrow("Task info is not being kept!");
    });
  });
});
