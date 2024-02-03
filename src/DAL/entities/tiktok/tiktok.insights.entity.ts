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
  ManyToOne,
  UpdateDateColumn,
} from "typeorm";
import { AutoMap } from "@automapper/classes";

import { InfluencerEntity } from "../influencer.entity";
import { TiktokCountryInsightEntity } from "./tiktok.country.insight.entity";
import { TiktokAgeInsightEntity } from "./tiktok.age.insight.entity";
import { TiktokGenderInsightEntity } from "./tiktok.gender.insight.entity";
import { TiktokDeviceInsightEntity } from "./tiktok.device.insight.entity";

@Entity("tiktok-insights")
export class TiktokInsightsEntity extends BaseEntity {
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

  @Column({ default: 0 })
  @AutoMap()
  likesCount: number;

  @Column({ default: 0 })
  @AutoMap()
  videosCount: number;

  @Column({ default: 0 })
  @AutoMap()
  viewsCount: number;

  @Column({ default: 0 })
  @AutoMap()
  viewsAverage: number;

  @AutoMap(() =>[TiktokCountryInsightEntity])
  @OneToMany(() => TiktokCountryInsightEntity, (country) => country.personalInsights, { eager: true, cascade: true })
  countries: TiktokCountryInsightEntity[];

  @AutoMap(() =>[TiktokAgeInsightEntity])
  @OneToMany(() => TiktokAgeInsightEntity, (age) => age.personalInsights, { eager: true, cascade: true })
  ages: TiktokAgeInsightEntity[];

  @AutoMap(() =>[TiktokDeviceInsightEntity])
  @OneToMany(() => TiktokDeviceInsightEntity, (device) => device.personalInsights, { eager: true, cascade: true })
  devices: TiktokDeviceInsightEntity[];

  @AutoMap(() =>[TiktokGenderInsightEntity])
  @JoinColumn()
  @OneToOne(() => TiktokGenderInsightEntity, (gender) => gender.personalInsights, { eager: true, cascade: true })
  genders: TiktokGenderInsightEntity;

  @ManyToOne(() => InfluencerEntity, (influencer) => influencer.instagramLogInsights, {
    eager: true,
    onDelete: "CASCADE",
  })
  @JoinColumn()
  influencer: InfluencerEntity;
}
