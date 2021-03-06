import { HttpClient } from "@halo-dev/rest-api-client";
import { buildPath } from "../url";
import { Response, Page, Photo, PhotoQuery } from "../types";

export class PhotoClient {
  private client: HttpClient;

  constructor(client: HttpClient) {
    this.client = client;
  }

  public list(params: PhotoQuery): Promise<Page<Photo>> {
    const path = buildPath({
      endpointName: "photos",
    });
    return this.client.get(path, { ...params });
  }

  public create(params: Photo): Promise<Response<Photo>> {
    const path = buildPath({
      endpointName: "photos",
    });
    return this.client.post(path, { ...params });
  }

  public getById(photoId: number): Promise<Response<Photo>> {
    const path = buildPath({
      endpointName: `photos/${photoId}`,
    });
    return this.client.get(path, {});
  }

  public updateById(photoId: number, params: Photo): Promise<Response<Photo>> {
    const path = buildPath({
      endpointName: `photos/${photoId}`,
    });
    return this.client.put(path, { ...params });
  }

  public async deleteById(photoId: number): Promise<void> {
    const path = buildPath({
      endpointName: `photos/${photoId}`,
    });
    await this.client.delete(path, {});
  }

  public latest(sort?: Array<string>): Promise<Response<Array<Photo>>> {
    const path = buildPath({
      endpointName: "photos/latest",
    });
    return this.client.get(path, { sort });
  }

  public listTeams(): Promise<Response<Array<string>>> {
    const path = buildPath({
      endpointName: "photos/teams",
    });
    return this.client.get(path, {});
  }
}
