import { Expose, Type } from "class-transformer";

class MediaData {
  @Expose({ name: "like_count" })
  public likeCount: number;

  @Expose({ name: "comments_count" })
  public commentsCount: number;
  public timestamp: number;
}

class Media {
  @Type(() => MediaData)
  public data: MediaData[] = [];
}

class Data {
  @Expose({ name: "followers_count" })
  public followersCount: number;

  @Type(() => Media)
  public media: Media;
}

export class BusinessDiscoveryResponse {
  @Expose({ name: "business_discovery" })
  @Type(() => Data)
  public businessDiscovery: Data;
}
