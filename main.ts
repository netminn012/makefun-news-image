// Entry program for make.fun's news-image-20261123 bounty (Node 22, standard library only).
//
// The poster beside this file (entry.png) sums up the world news of Monday
// 23 November 2026: the COP31 climate talks' collapse in Antalya, Russian
// strikes on the Kyiv region, the Democrats' 258-seat House majority,
// BepiColombo's arrival at Mercury, and the Indonesia factory fire.
// This program's whole job is to place that poster at /output/entry.png.
//
// The grader runs the program twice in a fresh container with no network,
// and both runs must write exactly the same bytes — a straight copy of a
// committed file guarantees that. Outside the grader, MAKEFUN_OUTPUT_DIR
// stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, readFileSync } from "node:fs";
import { join } from "node:path";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const source = new URL("./entry.png", import.meta.url);

// The gate accepts a whole PNG or JPEG and tells them apart by their first
// bytes. Check the magic bytes before copying, so a corrupt asset fails
// loudly here instead of silently shipping an invalid entry.
const bytes = readFileSync(source);
const PNG_MAGIC = [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a];
const isPng = PNG_MAGIC.every((b, i) => bytes[i] === b);
const isJpeg = bytes[0] === 0xff && bytes[1] === 0xd8;
if (!isPng && !isJpeg) {
  throw new Error("entry.png is neither a PNG nor a JPEG image");
}

const target = join(outDir, "entry.png");
copyFileSync(source, target);
console.log(`wrote ${bytes.length} bytes to ${target}`);
