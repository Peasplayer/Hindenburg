import path from "path";
import fs from "fs/promises";

import { HindenburgConfig, HindenburgServer } from "../src";


(async () => {
    const config = JSON.parse(await fs.readFile(path.resolve(process.cwd(), "./config.json"), "utf8")) as HindenburgConfig;

    const server = new HindenburgServer(config);

    server.listen();

    process.on("SIGINT", async () => {
        await server.graceful();

        process.exit();
    });
})();