import {
  JoinColumn,
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { AutoMap } from "@automapper/classes";

import { InfluencerEntity } from "../influencer.entity";
import { InstagramCountryInsightEntity } from "./instagram.country.insight.entity";
import { YoutubeInsightsEntity } from "../youtube/youtube.insights.entity";
import { InstagramGenderInsightEntity } from "./instagram.gender.insight.entity";
import { InstagramAgeInsightEntity } from "./instagram.age.insight.entity";
import { InstagramGenderAgeInsightEntity } from "./instagram.gender-age.insight.entity";

@Entity("instagram-insights")
export class InstagramInsightsEntity extends BaseEntity {
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

  @Column({ default: 0.0 })
  @AutoMap()
  followersCount: number;

  @AutoMap(() => InstagramCountryInsightEntity)
  @OneToMany(() => InstagramCountryInsightEntity, (country) => country.personalInsights, { eager: true, cascade: true })
  countries: InstagramCountryInsightEntity[];

  @AutoMap(() => InstagramAgeInsightEntity)
  @OneToMany(() => InstagramAgeInsightEntity, (age) => age.personalInsights, { eager: true, cascade: true })
  ages: InstagramAgeInsightEntity[];

  @AutoMap(() => InstagramGenderInsightEntity)
  @OneToMany(() => InstagramGenderInsightEntity, (gender) => gender.personalInsights, { eager: true, cascade: true })
  genders: InstagramGenderInsightEntity[];

  @AutoMap(() => InstagramGenderAgeInsightEntity)
  @OneToMany(() => InstagramGenderAgeInsightEntity, (genderAge) => genderAge.personalInsights, {
    eager: true,
    cascade: true,
  })
  genderAges: InstagramGenderAgeInsightEntity[];

  @OneToOne(() => InfluencerEntity, (influencer) => influencer.instagramInsight, { onDelete: "CASCADE" })
  @JoinColumn()
  influencer: InfluencerEntity;
}
