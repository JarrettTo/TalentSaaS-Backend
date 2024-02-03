import { BaseEntity, Column, Entity, ManyToMany, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { AutoMap } from "@automapper/classes";
import { TiktokInsightsEntity } from "./tiktok.insights.entity";

@Entity("tiktok-gender-insight")
export class TiktokGenderInsightEntity extends BaseEntity {
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

  @OneToOne(() => TiktokInsightsEntity, { onDelete: "CASCADE" })
  personalInsights: TiktokInsightsEntity;
}
