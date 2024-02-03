import { BaseEntity, Column, Entity, ManyToMany, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { AutoMap } from "@automapper/classes";
import { TiktokLogInsightsEntity } from "./tiktok-log.insights.entity";

@Entity("tiktok-log-gender-insight")
export class TiktokLogGenderInsightEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  @AutoMap()
  id: number;

  @Column({ type: "decimal", default: 0.0 })
  @AutoMap()
  maleCount: number;

  @Column({ type: "decimal", default: 0.0 })
  @AutoMap()
  femaleCount: number;

  @Column({ type: "decimal", default: 0.0 })
  @AutoMap()
  otherCount: number;

  @OneToOne(() => TiktokLogInsightsEntity, { onDelete: "CASCADE" })
  personalLogInsights: TiktokLogInsightsEntity;
}
