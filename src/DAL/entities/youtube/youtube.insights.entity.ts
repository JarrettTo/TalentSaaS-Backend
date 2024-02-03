import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  RelationId,
  UpdateDateColumn,
} from "typeorm";
import { AutoMap } from "@automapper/classes";

import { InfluencerEntity } from "../influencer.entity";
import { YoutubeCountryInsightEntity } from "./youtube.country.insight.entity";
import { YoutubeGenderInsightEntity } from "./youtube.gender.insight.entity";
import { YoutubeAgeInsightEntity } from "./youtube.age.insight.entity";
import { YoutubeCompletionRateInsightEntity } from "./youtube.complation-rate.insight.entity";
import { YoutubeDevicesInsightEntity } from "./youtube.devices.insight.entity";

@Entity("youtube-insights")
export class YoutubeInsightsEntity extends BaseEntity {
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

  @AutoMap(() => [YoutubeCountryInsightEntity])
  @OneToMany(() => YoutubeCountryInsightEntity, (country) => country.personalInsights, { eager: true, cascade: true })
  countries: YoutubeCountryInsightEntity[];

  @AutoMap(() => [YoutubeAgeInsightEntity])
  @OneToMany(() => YoutubeAgeInsightEntity, (age) => age.personalInsights, { eager: true, cascade: true })
  ages: YoutubeAgeInsightEntity[];

  @AutoMap(() => YoutubeGenderInsightEntity)
  @JoinColumn()
  @OneToOne(() => YoutubeGenderInsightEntity, (gender) => gender.personalInsights, { eager: true, cascade: true })
  genders: YoutubeGenderInsightEntity;

  @AutoMap(() => YoutubeCompletionRateInsightEntity)
  @JoinColumn()
  @OneToOne(() => YoutubeCompletionRateInsightEntity, (completion) => completion.personalInsights, {
    eager: true,
    cascade: true,
  })
  rate: YoutubeCompletionRateInsightEntity;

  @AutoMap(() => YoutubeDevicesInsightEntity)
  @JoinColumn()
  @OneToOne(() => YoutubeDevicesInsightEntity, (gender) => gender.personalInsights, { eager: true, cascade: true })
  devices: YoutubeDevicesInsightEntity;

  @OneToOne(() => InfluencerEntity, (influencer) => influencer.instagramInsight, { onDelete: "CASCADE" })
  @AutoMap(() => InfluencerEntity)
  @JoinColumn()
  influencer: InfluencerEntity;
}
