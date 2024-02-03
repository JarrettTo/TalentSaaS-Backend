import { BaseEntity, Column, Entity, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { AutoMap } from "@automapper/classes";
import { InfluencerEntity } from "./influencer.entity";

@Entity("facebook-token")
export class FacebookToken extends BaseEntity {
  @PrimaryGeneratedColumn()
  @AutoMap()
  public id: number;

  @Column({ nullable: true })
  public value: string = null;

  @Column()
  public securityStamp: string;

  @UpdateDateColumn()
  public lastModified: Date;

  @Column({ nullable: true })
  public igId: string = null;

  @OneToOne(() => InfluencerEntity, { onDelete: "CASCADE" })
  influencer: InfluencerEntity;
}
