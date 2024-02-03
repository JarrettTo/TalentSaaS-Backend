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

@Entity("tiktok-video")
export class TiktokVideoEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  @AutoMap()
  id: number;

  @AutoMap()
  @Column({unique: true})
  tiktokId: string;

  @AutoMap()
  @Column()
  title: string;
  
  @AutoMap()
  @Column()
  description: string;
  
  @AutoMap()
  @Column()
  publishedAt: Date;
  
  @AutoMap()
  @Column()
  views: number;

  @AutoMap()
  @Column()
  comments: number;

  @AutoMap()
  @Column()
  likes: number;

  @ManyToOne(() => InfluencerEntity, (influencer) => influencer.instagramLogInsights, {
    eager: true,
    onDelete: "CASCADE",
  })
  @JoinColumn()
  influencer: InfluencerEntity;
}
