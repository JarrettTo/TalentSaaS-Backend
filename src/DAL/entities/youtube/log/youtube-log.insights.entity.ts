import { ManagerEntity } from "src/DAL/entities/manager.entity";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  RelationId,
  UpdateDateColumn,
} from "typeorm";
import { AutoMap } from "@automapper/classes";
import { InfluencerEntity } from "../../influencer.entity";
import { YoutubeLogAgeInsightEntity } from "./youtube-log.age.insight.entity";
import { YoutubeLogCountryInsightEntity } from "./youtube-log.country.insight.entity";
import { YoutubeLogGenderInsightEntity } from "./youtube-log.gender.insight.entity";
import { YoutubeLogDevicesInsightEntity } from "./youtube-log.devices.insight.entity";
import { YoutubeLogCompletionRateInsightEntity } from "./youtube-log.complation-rate.insight.entity";

@Entity("youtube-log-insights")
export class YoutubeLogInsightsEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  @AutoMap()
  id: number;

  @UpdateDateColumn({ type: "date" })
  @AutoMap()
  date: Date;

  @Column({ default: 0 })
  @AutoMap()
  impressions: number;

  @Column({ type: "decimal", default: 0.0 })
  @AutoMap()
  engagement: number;

  @Column({ default: 0 })
  @AutoMap()
  followersCount: number;

  @AutoMap(() => [YoutubeLogCountryInsightEntity])
  @JoinColumn()
  @OneToMany(() => YoutubeLogCountryInsightEntity, (country) => country.personalLogInsights, {
    eager: true,
    cascade: true,
  })
  countries: YoutubeLogCountryInsightEntity[];

  @AutoMap(() => [YoutubeLogAgeInsightEntity])
  @OneToMany(() => YoutubeLogAgeInsightEntity, (age) => age.personalLogInsights, { eager: true, cascade: true })
  ages: YoutubeLogAgeInsightEntity[];

  @AutoMap(() => YoutubeLogGenderInsightEntity)
  @JoinColumn()
  @OneToOne(() => YoutubeLogGenderInsightEntity, (gender) => gender.personalLogInsights, { eager: true, cascade: true })
  genders: YoutubeLogGenderInsightEntity;

  @AutoMap(() => YoutubeLogDevicesInsightEntity)
  @JoinColumn()
  @OneToOne(() => YoutubeLogDevicesInsightEntity, (devices) => devices.personalLogInsights, {
    eager: true,
    cascade: true,
  })
  devices: YoutubeLogDevicesInsightEntity;

  @AutoMap(() => YoutubeLogCompletionRateInsightEntity)
  @JoinColumn()
  @OneToOne(() => YoutubeLogCompletionRateInsightEntity, (completionRate) => completionRate.personalLogInsights, {
    eager: true,
    cascade: true,
  })
  rate: YoutubeLogCompletionRateInsightEntity;

  @ManyToOne(() => InfluencerEntity, (influencer) => influencer.instagramLogInsights, { onDelete: "CASCADE" })
  @JoinColumn()
  influencer: InfluencerEntity;

  @CreateDateColumn()
  @AutoMap()
  createdAt: Date;

  @ManyToOne(() => ManagerEntity, (manager) => manager.refreshedYoutubeInsights, { onDelete: "CASCADE" })
  @AutoMap(() => ManagerEntity)
  @JoinColumn()
  manager: ManagerEntity;
}
