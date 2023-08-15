import { config } from "../lib/config";
import { getFileSystemRepo } from "../lib/get-file-system-repo";
import { getQiitaApiInstance } from "../lib/get-qiita-api-instance";
import { resolveUrlFromAddress } from "../lib/resolve-url-from-address";
import { syncArticlesFromQiita } from "../lib/sync-articles-from-qiita";
import { startLocalChangeWatcher, startServer } from "../server/app";

export const preview = async () => {
  const qiitaApi = await getQiitaApiInstance();
  const fileSystemRepo = await getFileSystemRepo();

  await syncArticlesFromQiita({ fileSystemRepo, qiitaApi });

  const server = await startServer();

  const address = server.address();
  const url = resolveUrlFromAddress(address);
  if (url) {
    const open = (await import("open")).default;
    await open(url);
  }

  startLocalChangeWatcher({
    server,
    watchPath: config.getItemsRootDir(),
  });
};
