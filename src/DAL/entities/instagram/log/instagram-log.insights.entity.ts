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
  ManyToOne,
} from "typeorm";
import { AutoMap } from "@automapper/classes";
import { InstagramLogCountryInsightEntity } from "./instagram-log.country.insight.entity";
import { InstagramLogAgeInsightEntity } from "./instagram-log.age.insight.entity";
import { InstagramLogGenderInsightEntity } from "./instagram-log.gender.insight.entity";
import { InfluencerEntity } from "../../influencer.entity";
import { ManagerEntity } from "../../manager.entity";
import { InstagramLogGenderAgeInsightEntity } from "./instagram-log.gender-age.insight.entity";

@Entity("instagram-log-insights")
export class InstagramLogInsightsEntity extends BaseEntity {
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

  @AutoMap(() => InstagramLogCountryInsightEntity)
  @OneToMany(() => InstagramLogCountryInsightEntity, (log) => log.personalLogInsights, { eager: true, cascade: true })
  countries: InstagramLogCountryInsightEntity[];

  @AutoMap(() => InstagramLogAgeInsightEntity)
  @OneToMany(() => InstagramLogAgeInsightEntity, (log) => log.personalLogInsights, { eager: true, cascade: true })
  ages: InstagramLogAgeInsightEntity[];

  @AutoMap(() => InstagramLogGenderInsightEntity)
  @OneToMany(() => InstagramLogGenderInsightEntity, (log) => log.personalLogInsights, { eager: true, cascade: true })
  genders: InstagramLogGenderInsightEntity[];

  @AutoMap(() => InstagramLogGenderAgeInsightEntity)
  @OneToMany(() => InstagramLogGenderAgeInsightEntity, (log) => log.personalLogInsights, { eager: true, cascade: true })
  genderAges: InstagramLogGenderAgeInsightEntity[];

  @ManyToOne(() => InfluencerEntity, (influencer) => influencer.instagramInsight, { onDelete: "CASCADE" })
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
