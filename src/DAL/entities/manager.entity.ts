import { Column, Entity } from "typeorm";
import { OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { AutoMap } from "@automapper/classes";

import { InfluencerEntity } from "./influencer.entity";
import { YoutubeLogInsightsEntity } from "./youtube/log/youtube-log.insights.entity";
import { TiktokLogInsightsEntity } from "./tiktok/log/tiktok-log.insights.entity";
import { InstagramLogInsightsEntity } from "./instagram/log/instagram-log.insights.entity";

@Entity("manager")
export class ManagerEntity {
  @PrimaryGeneratedColumn()
  @AutoMap()
  id: number;

  @AutoMap()
  @Column({ unique: true, nullable: false })
  email: string;

  @AutoMap()
  @Column({ unique: true, nullable: false })
  password: string;

  @Column({ default: false, nullable: true })
  isVerified: Boolean;

  @AutoMap()
  @OneToMany(() => YoutubeLogInsightsEntity, (logs) => logs.manager, { eager: true, cascade: true })
  refreshedYoutubeInsights: YoutubeLogInsightsEntity[];

  @AutoMap()
  @OneToMany(() => TiktokLogInsightsEntity, (logs) => logs.manager, { eager: true, cascade: true })
  refreshedTiktokInsights: TiktokLogInsightsEntity[];

  @AutoMap()
  @OneToMany(() => InstagramLogInsightsEntity, (logs) => logs.manager, { eager: true, cascade: true })
  refreshedInstagramInsights: InstagramLogInsightsEntity[];
}
