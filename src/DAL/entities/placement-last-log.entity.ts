import { Column, CreateDateColumn, Entity, Index, JoinColumn, ManyToOne, OneToOne, UpdateDateColumn } from "typeorm";
import { PrimaryGeneratedColumn } from "typeorm";
import { AutoMap } from "@automapper/classes";
import { InfluencerEntity } from "./influencer.entity";
import { PlacementType } from "src/infrastructure/enums/placement.type.enum";
import { ManagerEntity } from "./manager.entity";

@Entity("placement-last-log")
export class PlacementLastLogEntity {
  @UpdateDateColumn()
  @AutoMap()
  createdAt: Date;

  @AutoMap(() => ManagerEntity)
  @ManyToOne(() => ManagerEntity)
  @JoinColumn({name: "managerId"})
  manager: ManagerEntity;

  @Column({ nullable: true })
  managerId: number;

  @PrimaryGeneratedColumn()
  @AutoMap()
  id: number;

  @Column({ enum: PlacementType })
  @AutoMap()
  type: PlacementType;

  @AutoMap()
  @Column({ type: "decimal", nullable: true})
  super: number;

  @AutoMap()
  @Column({ type: "decimal", nullable: true })
  talantFee: number;

  @AutoMap()
  @Column({ type: "decimal", nullable: true })
  agencyFee: number;

  @AutoMap()
  @Column({ name: "total_impressions_by_current_month", type: "decimal", nullable: true })
  totalImpressionsByCurrentMonth: number;

  @AutoMap()
  @Column({ name: "au_o_nz_auditory", type: "decimal", nullable: true })
  AUorNZAuditory: number;

  @AutoMap()
  @Column({ name: "west_auditory", type: "decimal", nullable: true })
  westAuditory: number;

  @AutoMap()
  @Column({ type: "decimal", nullable: true })
  sum: number;

  @AutoMap()
  @Column({ name: "price_in_usd", type: "decimal", nullable: true })
  priceInUSD: number;

  @AutoMap()
  @Column({ name: "price_in_aud", type: "decimal", nullable: true })
  priceInAUD: number;

  @AutoMap()
  @Column({ type: "decimal", nullable: true })
  boosting: number;

  @AutoMap()
  @Column({ type: "decimal", nullable: true })
  ASF: number;

  @AutoMap()
  @Column({ nullable: true })
  isItems: boolean;

  @AutoMap({ type: () => InfluencerEntity })
  @ManyToOne(() => InfluencerEntity, (influencer) => influencer.placementLastLog)
  @JoinColumn({name: "influencerId"})
  influencer: InfluencerEntity;

  @Column({ nullable: true })
  influencerId: number;

  
}
