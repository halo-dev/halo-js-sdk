import { HaloRestAPIClient, DefaultTokenProvider, FileTokenStore } from "../";
import * as Logger from "@halo-dev/logger";
Logger.setLogLevel("debug");
const logger = Logger.createClientLogger("AxiosClient");
describe("Halo exios test", () => {
  it("test", async () => {
    const baseUrl = "http://127.0.0.1:8090";
    const haloRestApiClient = new HaloRestAPIClient({
      baseUrl,
    });

    const tokenStore = new FileTokenStore("/home/guqing/token.json");

    const tokenProvider = new DefaultTokenProvider(
      {
        username: "guqing",
        password: "12345678",
      },
      baseUrl,
      tokenStore
    );
    haloRestApiClient.setTokenProvider(tokenProvider);
    const client = haloRestApiClient.buildHttpClient();
    logger.info(JSON.stringify(client));
    const data = await client.get("/api/admin/posts", {});
    logger.info(data);
  });
});
