import util from "node:util";
import { ConfirmDelete } from "./ConfirmDelete";
const execs = util.promisify(require("node:child_process").exec);
let DATABASE_URL = process.env.DATABASE_URL_POOLED!;

export async function TruncateTable() {
  if (!DATABASE_URL.includes("localhost")) {
    const confirmDelete = await ConfirmDelete({
      message:
        "You are currently on Production Environment, Please Confirm again before deletion",
    });
    if (!confirmDelete) {
      process.exit();
    }
  }
  console.log("RESETTING DATABASE");
  const { stdout: deleteDb, stderr } = await execs(
    `npx prisma db execute --file='./prisma/functions/dbReset.sql'`,
  );
  if (stderr) {
    console.error("STACK:", process.cwd());
    console.error(
      "Failed to run 'npx prisma db execute' please check ./prisma/functions/dbReset.sql",
    );
    throw new Error(stderr);
  }
  console.log(deleteDb, "\n");
  const { stdout: generate, stderr: generateErr } =
    await execs(`npx prisma db push`);
  console.log(generate, "\n\n", generateErr);
  return true;
}
