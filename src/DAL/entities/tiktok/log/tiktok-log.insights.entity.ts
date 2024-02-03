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

import { TiktokLogAgeInsightEntity } from "./tiktok-log.age.insight.entity";
import { TiktokLogCountryInsightEntity } from "./tiktok-log.country.insight.entity";
import { TiktokLogGenderInsightEntity } from "./tiktok-log.gender.insight.entity";
import { InfluencerEntity } from "../../influencer.entity";
import { ManagerEntity } from "../../manager.entity";
import { TiktokLogDeviceInsightEntity } from "./tiktok-log.device.insight.entity";

@Entity("tiktok-log-insights")
export class TiktokLogInsightsEntity extends BaseEntity {
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
  viewsCount: number;

  @Column({ default: 0 })
  @AutoMap()
  likesCount: number;

  @Column({ default: 0 })
  @AutoMap()
  videosCount: number;

  @Column({ default: 0 })
  @AutoMap()
  viewsAverage: number;

  @AutoMap(() => [TiktokLogCountryInsightEntity])
  @OneToMany(() => TiktokLogCountryInsightEntity, (country) => country.personalLogInsights, {
    eager: true,
    cascade: true,
  })
  countries: TiktokLogCountryInsightEntity[];

  @AutoMap(() => [TiktokLogAgeInsightEntity])
  @OneToMany(() => TiktokLogAgeInsightEntity, (age) => age.personalLogInsights, { eager: true, cascade: true })
  ages: TiktokLogAgeInsightEntity[];

  @AutoMap(() => [TiktokLogDeviceInsightEntity])
  @OneToMany(() => TiktokLogDeviceInsightEntity, (device) => device.personalLogInsights, { eager: true, cascade: true })
  devices: TiktokLogDeviceInsightEntity[];

  @AutoMap(() => TiktokLogGenderInsightEntity)
  @JoinColumn()
  @OneToOne(() => TiktokLogGenderInsightEntity, (gender) => gender.personalLogInsights, { eager: true, cascade: true })
  genders: TiktokLogGenderInsightEntity;

  @ManyToOne(() => InfluencerEntity, (influencer) => influencer.tiktokLogInsights, { eager: true, onDelete: "CASCADE" })
  @JoinColumn()
  influencer: InfluencerEntity;

  @CreateDateColumn()
  @AutoMap()
  createdAt: Date;

  @ManyToOne(() => ManagerEntity, (manager) => manager.refreshedInstagramInsights, { onDelete: "CASCADE" })
  @JoinColumn()
  @AutoMap(() => ManagerEntity)
  manager: ManagerEntity;
}
