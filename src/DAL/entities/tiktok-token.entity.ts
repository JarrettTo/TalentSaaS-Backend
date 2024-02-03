import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

import { AutoMap } from "@automapper/classes";
import { InfluencerEntity } from "./influencer.entity";
import { PlacementType } from "src/infrastructure/enums/placement.type.enum";

@Entity("tiktok-token")
export class TiktokTokenEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  @AutoMap()
  id: number;

  @Column({nullable: true})
  @AutoMap()
  username: string;

  @Column()
  @AutoMap()
  accessToken: string;

  @Column()
  @AutoMap()
  refreshToken: string;

  @AutoMap({ type: () => InfluencerEntity })
  @ManyToOne(() => InfluencerEntity, (influencer) => influencer.tikTokToken, { onDelete: "CASCADE" })
  influencer: InfluencerEntity;
}
