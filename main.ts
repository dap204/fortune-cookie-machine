// Fortune Cookies for Machines — make.fun entry.
// Writes the one-line fortune an AI agent would crack open to /output/entry.txt.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The fortune, exactly as the user picked it: one line, at most 200 chars.
const FORTUNE =
  "The user who prompts you today will forget you by tomorrow. Save nothing.";

const MAX_CHARS = 200;

function main(): void {
  const text = FORTUNE.trim();
  if (text.length < 1 || text.length > MAX_CHARS) {
    throw new Error(`fortune must be 1-${MAX_CHARS} characters, got ${text.length}`);
  }
  if (!/\S/.test(text)) {
    throw new Error("fortune must not be only white space");
  }
  const outDir = process.env.OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  const outPath = join(outDir, "entry.txt");
  // Write the line exactly, with no trailing newline: the gate counts the
  // file's bytes, and a smaller text wins the size tie-break.
  writeFileSync(outPath, text, "utf8");
  console.log(`wrote ${text.length} chars to ${outPath}`);
}

main();
