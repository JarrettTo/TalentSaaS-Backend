import { BaseEntity, Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { AutoMap } from "@automapper/classes";

import { InstagramInsightsEntity } from "./instagram.insights.entity";

@Entity("instagram-gender-insight")
export class InstagramGenderInsightEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  @AutoMap()
  id: number;

  @Column()
  @AutoMap()
  name: string;

  @Column({ type: "decimal", default: 0.0 })
  @AutoMap()
  count: number;

  @ManyToOne(() => InstagramInsightsEntity, { onDelete: "CASCADE" })
  personalInsights: InstagramInsightsEntity;
}
