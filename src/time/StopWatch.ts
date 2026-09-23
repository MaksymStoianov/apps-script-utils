import { IllegalStateException } from "../exception";
import { now } from "./now";

/**
 * One timed task, as recorded by a {@link StopWatch}.
 *
 * @example
 * ```javascript
 * const watch = new StopWatch();
 *
 * watch.start("fetch");
 * watch.stop();
 *
 * watch.getLastTaskInfo(); // { taskName: "fetch", timeMillis: …, timeSeconds: … }
 * ```
 *
 * @property {string} taskName - The name the task was started with; empty if none was given.
 */
export interface TaskInfo {
  readonly taskName: string;

  /**
   * How long the task ran, in milliseconds.
   */
  readonly timeMillis: number;

  /**
   * How long the task ran, in seconds.
   */
  readonly timeSeconds: number;
}

const RULE = "-".repeat(45);

/**
 * Times a sequence of named tasks and reports on them.
 *
 * An execution has a hard time limit, and the way to live within it is to measure: how long the last
 * batch took, how much has elapsed, whether there is room for another. This keeps that bookkeeping —
 * start a task, stop it, ask for the numbers — and prints a breakdown when the run is over.
 *
 * Only completed tasks count towards the total; a task still running is not included until it stops.
 * By default every task is kept for the breakdown. For a long loop, {@link StopWatch.setKeepTaskList}
 * turns that off so the list does not grow with it; the count and the last task are still tracked.
 *
 * @example
 * ```javascript
 * const watch = new StopWatch("import");
 *
 * watch.start("read");
 * const rows = sheet.getDataRange().getValues();
 * watch.stop();
 *
 * watch.start("write");
 * target.getRange(1, 1, rows.length, rows[0].length).setValues(rows);
 * watch.stop();
 *
 * console.log(watch.prettyPrint());
 * ```
 *
 * @class       StopWatch
 * @see         {@link TaskInfo}
 * @see         {@link now}
 * @since       1.11.0
 * @version     1.0.0
 * @environment `Google Apps Script`, `Browser`
 * @author      Maksym Stoianov <stoianov.maksym@gmail.com>
 * @license     Apache-2.0
 */
export class StopWatch {
  private readonly id: string;

  private keepTaskList = true;

  private readonly taskList: TaskInfo[] = [];

  private startTimeMillis = 0;

  private currentTask: string | null = null;

  private lastTask: TaskInfo | null = null;

  private taskCount = 0;

  private totalTimeMillis = 0;

  /**
   * @param {string} [id=""] - An identifier for the watch, shown in its summaries.
   */
  constructor(id: string = "") {
    this.id = id;
  }

  /**
   * Returns the identifier the watch was created with.
   *
   * @returns {string} The identifier; empty if none was given.
   */
  getId(): string {
    return this.id;
  }

  /**
   * Decides whether completed tasks are kept for {@link StopWatch.getTaskInfo} and
   * {@link StopWatch.prettyPrint}. On by default; turn it off for a loop with many tasks.
   *
   * @param {boolean} keepTaskList - `true` to keep every task, `false` to keep only the last.
   * @returns {void}
   */
  setKeepTaskList(keepTaskList: boolean): void {
    this.keepTaskList = keepTaskList;
  }

  /**
   * Starts a task.
   *
   * @param {string} [taskName=""] - The name of the task, for the breakdown.
   * @returns {void}
   * @throws {IllegalStateException} If a task is already running.
   */
  start(taskName: string = ""): void {
    if (this.currentTask !== null) {
      throw new IllegalStateException("Can't start StopWatch: it's already running");
    }

    this.currentTask = taskName;
    this.startTimeMillis = now();
  }

  /**
   * Stops the running task and records it.
   *
   * @returns {void}
   * @throws {IllegalStateException} If no task is running.
   */
  stop(): void {
    if (this.currentTask === null) {
      throw new IllegalStateException("Can't stop StopWatch: it's not running");
    }

    const timeMillis = now() - this.startTimeMillis;

    const task: TaskInfo = {
      taskName: this.currentTask,
      timeMillis,
      timeSeconds: timeMillis / 1000
    };

    this.totalTimeMillis += timeMillis;
    this.lastTask = task;

    if (this.keepTaskList) {
      this.taskList.push(task);
    }

    this.taskCount++;
    this.currentTask = null;
  }

  /**
   * Reports whether a task is running.
   *
   * @returns {boolean} `true` between {@link StopWatch.start} and {@link StopWatch.stop}.
   */
  isRunning(): boolean {
    return this.currentTask !== null;
  }

  /**
   * Returns the name of the running task.
   *
   * @returns {string | null} The name, or `null` if nothing is running.
   */
  currentTaskName(): string | null {
    return this.currentTask;
  }

  /**
   * Returns how long the last completed task ran.
   *
   * @returns {number} Milliseconds.
   * @throws {IllegalStateException} If no task has completed.
   */
  getLastTaskTimeMillis(): number {
    if (this.lastTask === null) {
      throw new IllegalStateException("No tasks run: can't get last task interval");
    }

    return this.lastTask.timeMillis;
  }

  /**
   * Returns the name of the last completed task.
   *
   * @returns {string} The name; empty if none was given.
   * @throws {IllegalStateException} If no task has completed.
   */
  getLastTaskName(): string {
    if (this.lastTask === null) {
      throw new IllegalStateException("No tasks run: can't get last task name");
    }

    return this.lastTask.taskName;
  }

  /**
   * Returns the last completed task.
   *
   * @returns {TaskInfo} The task.
   * @throws {IllegalStateException} If no task has completed.
   */
  getLastTaskInfo(): TaskInfo {
    if (this.lastTask === null) {
      throw new IllegalStateException("No tasks run: can't get last task info");
    }

    return this.lastTask;
  }

  /**
   * Returns the time all completed tasks took together.
   *
   * @returns {number} Milliseconds.
   */
  getTotalTimeMillis(): number {
    return this.totalTimeMillis;
  }

  /**
   * Returns the time all completed tasks took together.
   *
   * @returns {number} Seconds.
   */
  getTotalTimeSeconds(): number {
    return this.totalTimeMillis / 1000;
  }

  /**
   * Returns how many tasks have completed, whether or not they were kept.
   *
   * @returns {number} The count.
   */
  getTaskCount(): number {
    return this.taskCount;
  }

  /**
   * Returns the completed tasks, in order.
   *
   * @returns {TaskInfo[]} A copy of the list.
   * @throws {IllegalStateException} If the task list is not being kept.
   */
  getTaskInfo(): TaskInfo[] {
    if (!this.keepTaskList) {
      throw new IllegalStateException("Task info is not being kept!");
    }

    return [...this.taskList];
  }

  /**
   * Returns a one-line summary of the total time.
   *
   * @returns {string} For example `StopWatch 'import': 300 ms`.
   */
  shortSummary(): string {
    const total = this.totalTimeMillis;

    return `StopWatch '${this.id}': ${total} ms`;
  }

  /**
   * Returns the summary followed by a table of the tasks: milliseconds, share of the total, name.
   *
   * @returns {string} A multi-line report.
   */
  prettyPrint(): string {
    const lines = [this.shortSummary(), RULE];

    if (!this.keepTaskList) {
      lines.push("No task info kept");
    } else {
      lines.push("ms     %     Task name", RULE);

      for (const task of this.taskList) {
        const millis = String(task.timeMillis).padEnd(7);

        const percent = String(this.percentOf(task)).padStart(3);

        lines.push(`${millis}${percent}%  ${task.taskName}`);
      }
    }

    return lines.join("\n");
  }

  /**
   * Returns the summary with every kept task appended on the same line.
   *
   * @returns {string} For example `StopWatch 'import': 300 ms; [read] took 100 ms = 33%; [write] took 200 ms = 67%`.
   */
  toString(): string {
    let text = this.shortSummary();

    if (!this.keepTaskList) {
      return `${text}; no task info kept`;
    }

    for (const task of this.taskList) {
      const percent = this.percentOf(task);

      text += `; [${task.taskName}] took ${task.timeMillis} ms = ${percent}%`;
    }

    return text;
  }

  private percentOf(task: TaskInfo): number {
    if (this.totalTimeMillis === 0) {
      return 0;
    }

    return Math.round((task.timeMillis / this.totalTimeMillis) * 100);
  }
}
