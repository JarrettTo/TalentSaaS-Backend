import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

import { AutoMap } from "@automapper/classes";
import { InfluencerEntity } from "./influencer.entity";
import { PlacementType } from "src/infrastructure/enums/placement.type.enum";

@Entity("tiktok-business-token")
export class TiktokBusinessTokenEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  @AutoMap()
  id: number;

  @Column()
  @AutoMap()
  accessToken: string;

  @Column()
  @AutoMap()
  refreshToken: string;

  @Column()
  @AutoMap()
  openId: string;

  @AutoMap({ type: () => InfluencerEntity })
  @ManyToOne(() => InfluencerEntity, (influencer) => influencer.tikTokBusinessToken, { onDelete: "CASCADE" })
  influencer: InfluencerEntity;
}
