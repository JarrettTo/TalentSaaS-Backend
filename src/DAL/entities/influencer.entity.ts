import { MaxLength } from "class-validator";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne } from "typeorm";
import { PrimaryGeneratedColumn } from "typeorm";
import { AutoMap } from "@automapper/classes";

import { PlacementEntity } from "./placement.entity";
import { PlacementTokenEntity } from "./placement-token.entity";
import { LeftOrRigthEnum } from "src/infrastructure/enums/leftOrRight.enum";
import { FacebookToken } from "src/DAL/entities/facebook-token.entity";
import { InstagramInsightsEntity } from "./instagram/instagram.insights.entity";
import { YoutubeInsightsEntity } from "./youtube/youtube.insights.entity";
import { TiktokInsightsEntity } from "./tiktok/tiktok.insights.entity";
import { InfluencerStatisticVerifyTokenEntity } from "./influencer.statistic-verify-token";
import { TiktokTokenEntity } from "./tiktok-token.entity";
import { StateOfAustraliaEnum } from "src/infrastructure/enums/stateOfAustralia.enum";

import { InfluencerGroupEntity } from "./influencer-group.entity";
import { TiktokLogInsightsEntity } from "./tiktok/log/tiktok-log.insights.entity";
import { InstagramLogInsightsEntity } from "./instagram/log/instagram-log.insights.entity";
import { YoutubeLogInsightsEntity } from "./youtube/log/youtube-log.insights.entity";
import { QuoteEntity } from "./quote.entity";
import { TiktokBusinessTokenEntity } from "./tiktok-business-token.entity";
import { PlacementLogEntity } from "./placement-log.entity";
import { PlacementLastLogEntity } from "./placement-last-log.entity";

@Entity("influencer")
export class InfluencerEntity {
  @PrimaryGeneratedColumn()
  @AutoMap()
  id: number;

  @AutoMap()
  @Column({ nullable: true })
  firstname?: string;

  @AutoMap()
  @Column({ nullable: true })
  lastname?: string;

  @AutoMap()
  @Column({ nullable: true })
  email?: string;

  @AutoMap()
  @Column({ nullable: true })
  phone?: string;

  @AutoMap()
  @Column({ nullable: true })
  mediaKitLink?: string;

  @AutoMap()
  @Column({ unique: true, name: "tiktok-profile", nullable: true })
  tiktokProfile?: string;

  @AutoMap()
  @Column({ unique: true, name: "instagram-profile", nullable: true })
  instagramProfile?: string;

  @AutoMap()
  @Column({ unique: true, name: "youtube-profile", nullable: true })
  youtubeProfile?: string;

  @AutoMap()
  @Column({ nullable: true })
  streetAddress?: string;

  @AutoMap()
  @Column({ nullable: true })
  TFN?: string;

  @AutoMap()
  @Column({ nullable: true })
  bank?: string;

  @AutoMap()
  @Column({ nullable: true })
  bankAccountName?: string;

  @AutoMap()
  @Column({ nullable: true })
  bankBSB?: string;

  @AutoMap()
  @Column({ nullable: true })
  bankAccountNumber?: string;

  @AutoMap()
  @Column({ nullable: true })
  isHelp?: boolean;

  @AutoMap()
  @Column({ name: "super-fund-name", nullable: true })
  superFundName?: string;

  @AutoMap()
  @Column({ name: "super-fund-biller-code", nullable: true })
  superFundBillerCode?: string;

  @AutoMap()
  @Column({ name: "super-fund-reference-number", nullable: true })
  superFundReferenceNumber?: string;

  @AutoMap()
  @Column({ type: "date", nullable: true })
  birthday?: Date;

  @AutoMap()
  @Column({ nullable: true, type: "integer" })
  age?: number;

  @AutoMap()
  @Column({ name: "gift-ideas", nullable: true })
  giftIdeas?: string;

  @AutoMap()
  @Column({ nullable: true })
  havePartner?: string;

  @AutoMap()
  @Column({ nullable: true })
  alcohol?: string;

  @AutoMap()
  @Column({ enum: LeftOrRigthEnum, nullable: true })
  leftOrRightHand?: LeftOrRigthEnum;

  @AutoMap()
  @Column({ nullable: true })
  shoeSize?: string;

  @AutoMap()
  @Column({ nullable: true })
  dreamHolidayDestination?: string;

  @AutoMap()
  @Column({ nullable: true })
  dreamBrandCollaboration?: string;

  @AutoMap()
  @Column({ nullable: true })
  dreamCar?: string;

  @AutoMap()
  @Column({ nullable: true })
  milkOfChoice?: string;

  @AutoMap()
  @Column({ nullable: true })
  yourPhone?: string;

  @AutoMap()
  @Column({ nullable: true })
  yourPhoneProvider?: string;

  @AutoMap()
  @Column({ nullable: true })
  investmentService?: string;

  @AutoMap()
  @Column({ nullable: true })
  supermarket?: string;

  @AutoMap()
  @Column({ nullable: true })
  chemistOfChoice?: string;

  @AutoMap()
  @Column({ nullable: true })
  bottleshopOfChoice?: string;

  @AutoMap()
  @Column({ nullable: true })
  charityOfChoice?: string;

  @AutoMap()
  @Column({ nullable: true })
  internetProvider?: string;

  @AutoMap()
  @Column({ nullable: true })
  streaming?: string;

  @AutoMap()
  @Column({ nullable: true })
  musicStreamingOfChoice?: string;

  @AutoMap()
  @Column({ type: "text", nullable: true })
  notes?: string;

  @AutoMap()
  @OneToMany(() => PlacementEntity, (placement) => placement.influencer, { cascade: true })
  placements?: PlacementEntity[];

  @AutoMap()
  @OneToMany(() => PlacementLogEntity, (log) => log.influencer, { cascade: true })
  placementsLog?: PlacementLogEntity[];

  @AutoMap(() => PlacementLastLogEntity)
  @OneToMany(() => PlacementLastLogEntity, (lastLog) => lastLog.influencer, { cascade: true })
  placementLastLog: PlacementLastLogEntity;

  @AutoMap()
  @Column({ unique: true, nullable: true })
  avatar?: string;

  @OneToOne(() => FacebookToken, { nullable: true, cascade: true })
  @JoinColumn({ name: "facebookTokenId" })
  facebookToken: FacebookToken;

  @Column({ nullable: true })
  facebookTokenId: number;

  @AutoMap()
  @OneToMany(() => TiktokTokenEntity, (token) => token.influencer, { cascade: true })
  tikTokToken?: TiktokTokenEntity[];

  @AutoMap()
  @OneToMany(() => TiktokBusinessTokenEntity, (token) => token.influencer, { cascade: true })
  tikTokBusinessToken?: TiktokBusinessTokenEntity[];

  @OneToMany(() => PlacementTokenEntity, (token) => token.influencer, { cascade: true })
  placementToken: PlacementTokenEntity[];

  @OneToOne(() => InstagramInsightsEntity, (instagramInsight) => instagramInsight.influencer, { cascade: true })
  instagramInsight: InstagramInsightsEntity;

  @OneToOne(() => YoutubeInsightsEntity, (youtubeInsight) => youtubeInsight.influencer, { cascade: true })
  youtubeInsight: YoutubeInsightsEntity;

  @OneToOne(() => TiktokInsightsEntity, (tiktokInsight) => tiktokInsight.influencer, { cascade: true })
  tiktokInsight: TiktokInsightsEntity;

  @OneToOne(() => InfluencerStatisticVerifyTokenEntity, (verifyCode) => verifyCode.influencer, { cascade: true })
  statisticVerifyCode: InfluencerStatisticVerifyTokenEntity;

  @AutoMap()
  @Column({ default: false })
  isArchived: boolean;

  @AutoMap()
  @Column({ nullable: true })
  contractStartDate: Date;

  @AutoMap()
  @Column({ nullable: true })
  contractEndDate: Date;

  @Column({ enum: StateOfAustraliaEnum, nullable: true })
  @AutoMap()
  state: StateOfAustraliaEnum;

  @Column({ nullable: true })
  @AutoMap()
  ABN: string;

  @ManyToOne(() => InfluencerGroupEntity, { onDelete: "SET NULL" })
  @AutoMap()
  group?: InfluencerGroupEntity;

  @OneToMany(() => TiktokLogInsightsEntity, (insight) => insight.influencer, { cascade: true })
  tiktokLogInsights: TiktokLogInsightsEntity;

  @OneToMany(() => InstagramLogInsightsEntity, (insight) => insight.influencer, { cascade: true })
  instagramLogInsights: InstagramLogInsightsEntity;

  @OneToMany(() => YoutubeLogInsightsEntity, (insight) => insight.influencer, { cascade: true })
  youtubeLogInsights: YoutubeLogInsightsEntity;

  @OneToMany(() => QuoteEntity, (quote) => quote.influencer, { cascade: true })
  quotes: QuoteEntity;
}
