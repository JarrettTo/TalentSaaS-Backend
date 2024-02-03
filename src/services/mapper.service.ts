import { DateHelper } from 'src/infrastructure/utils/date.helper';
import { QuoteResponseDto } from "./../dto/influencer/quote/quote.dto";
import { YoutubeGenderResponseDto } from "src/dto/youtube/response/youtube.gender.response.dto";
import { Injectable } from "@nestjs/common";
import { Mapper, mapWith } from "@automapper/core";
import { createMap, forMember, mapFrom, MappingProfile } from "@automapper/core";
import { AutomapperProfile, InjectMapper } from "@automapper/nestjs";

import { InfluencerDto } from "src/dto/influencer/influencer.dto";
import { InfluencerEntity } from "src/DAL/entities/influencer.entity";
import { ManagerEntity } from "src/DAL/entities/manager.entity";
import { ShortManagerDto } from "src/dto/manager/manager-short.dto";
import { PlacementEntity } from "src/DAL/entities/placement.entity";
import { InfluencerGroupResponseDto } from "src/dto/influencer/group/influencer-group.response.dto";
import { InfluencerGroupEntity } from "src/DAL/entities/influencer-group.entity";
import { YoutubeInsightsEntity } from "src/DAL/entities/youtube/youtube.insights.entity";
import { YoutubeAllStatisticsResponseDto } from "src/dto/youtube/response/youtube.all.statistics.response.dto";
import { YoutubeGenderInsightEntity } from "src/DAL/entities/youtube/youtube.gender.insight.entity";
import { YoutubeCountryInsightEntity } from "src/DAL/entities/youtube/youtube.country.insight.entity";
import { YoutubeAgeInsightEntity } from "src/DAL/entities/youtube/youtube.age.insight.entity";
import { YoutubeCountryResponseDto } from "src/dto/youtube/response/youtube.country.response.dto";
import { YoutubeAgeResponseDto } from "src/dto/youtube/response/youtube.age.response.dto";
import { InstagramAgeInsightEntity } from "src/DAL/entities/instagram/instagram.age.insight.entity";
import { InstagramGenderInsightEntity } from "src/DAL/entities/instagram/instagram.gender.insight.entity";
import { InstagramCountryInsightEntity } from "src/DAL/entities/instagram/instagram.country.insight.entity";
import { InstagramInsightsEntity } from "src/DAL/entities/instagram/instagram.insights.entity";
import { YoutubeDevicesInsightEntity } from "src/DAL/entities/youtube/youtube.devices.insight.entity";
import { YoutubeDeviceResponseDto } from "src/dto/youtube/response/youtube.device.response.dto";
import { YoutubeCompletionRateResponseDto } from "src/dto/youtube/response/youtube.completion-rate.response.dto";
import { YoutubeCompletionRateInsightEntity } from "src/DAL/entities/youtube/youtube.complation-rate.insight.entity";
import { YoutubeLogInsightsEntity } from "src/DAL/entities/youtube/log/youtube-log.insights.entity";
import { YoutubeLogCountryInsightEntity } from "src/DAL/entities/youtube/log/youtube-log.country.insight.entity";
import { YoutubeLogDevicesInsightEntity } from "src/DAL/entities/youtube/log/youtube-log.devices.insight.entity";
import { YoutubeLogAgeInsightEntity } from "src/DAL/entities/youtube/log/youtube-log.age.insight.entity";
import { YoutubeLogCompletionRateInsightEntity } from "src/DAL/entities/youtube/log/youtube-log.complation-rate.insight.entity";
import { YoutubeLogGenderInsightEntity } from "src/DAL/entities/youtube/log/youtube-log.gender.insight.entity";
import { InfluencerInsightsV18Dto } from "src/dto/facebook/graph/v18/influencer-insights.dto";
import { BaseInsightStatisticResponseDto } from "src/dto/facebook/graph/v18/base-insight.response";
import { InstagramGenderAgeInsightEntity } from "src/DAL/entities/instagram/instagram.gender-age.insight.entity";
import { InstagramLogInsightsEntity } from "src/DAL/entities/instagram/log/instagram-log.insights.entity";
import { InstagramLogGenderAgeInsightEntity } from "src/DAL/entities/instagram/log/instagram-log.gender-age.insight.entity";
import { InstagramLogAgeInsightEntity } from "src/DAL/entities/instagram/log/instagram-log.age.insight.entity";
import { InstagramLogCountryInsightEntity } from "src/DAL/entities/instagram/log/instagram-log.country.insight.entity";
import { InstagramLogGenderInsightEntity } from "src/DAL/entities/instagram/log/instagram-log.gender.insight.entity";
import { TiktokInsightsEntity } from "src/DAL/entities/tiktok/tiktok.insights.entity";
import { TikTokMainStatisticResponseDto } from "src/dto/tiktok/response/tiktok.main-statistic.response.dto";
import { YoutubeAllLogStatisticsResponseDto } from "src/dto/youtube/response/youtube.all.log-statistics.response.dto";
import { TiktokLogInsightsEntity } from "src/DAL/entities/tiktok/log/tiktok-log.insights.entity";
import { QuoteEntity } from "src/DAL/entities/quote.entity";
import { PlacementLogEntity } from "src/DAL/entities/placement-log.entity";
import { QuoteLogEntity } from "src/DAL/entities/quote-log.entity";
import { QuoteLogResponseDto } from "src/dto/influencer/quote/quote-log.dto";
import { InfluencerLogInsightsV18Dto } from "src/dto/facebook/graph/v18/influencer-log-insights.dto";
import { TikTokLogStatisticResponseDto } from "src/dto/tiktok/response/tiktok.log-statistic.response.dto";
import { PlacementLogResponseDto } from "src/dto/influencer/placement/placement-log.response.dto";
import { PlacementResponseDto } from "src/dto/influencer/placement/placement.response.dto";
import { QuoteListEntity } from "src/DAL/entities/quote-list.entity";
import { QuoteListResponseDto } from "src/dto/influencer/quote/quote-list.dto";
import { QuoteLogListEntity } from "src/DAL/entities/quote-log-list.entity";
import { QuoteLogListResponseDto } from "src/dto/influencer/quote/quote-log-list.dto";
import { TiktokAgeResponseDto } from "src/dto/tiktok/response/tiktok.age.response.dto";
import { TiktokAgeInsightEntity } from "src/DAL/entities/tiktok/tiktok.age.insight.entity";
import { TiktokCountryResponseDto } from "src/dto/tiktok/response/tiktok.country.response.dto";
import { TiktokCountryInsightEntity } from "src/DAL/entities/tiktok/tiktok.country.insight.entity";
import { TiktokAllStatisticsResponseDto } from "src/dto/tiktok/response/tiktok.all.statistics.response.dto";
import { TiktokGenderInsightEntity } from "src/DAL/entities/tiktok/tiktok.gender.insight.entity";
import { TiktokGenderResponseDto } from "src/dto/tiktok/response/tiktok.gender.response.dto";
import { TIkTokBusinessCountryInsightResponseDto } from "src/dto/tiktok/response/buisiness/tiktok-insight.country.response.dto";
import { TIkTokBusinessAgeInsightResponseDto } from "src/dto/tiktok/response/buisiness/tiktok-insight.age.response.dto";
import { TiktokLogAgeInsightEntity } from "src/DAL/entities/tiktok/log/tiktok-log.age.insight.entity";
import { TiktokLogCountryInsightEntity } from "src/DAL/entities/tiktok/log/tiktok-log.country.insight.entity";
import { TiktokLogGenderInsightEntity } from "src/DAL/entities/tiktok/log/tiktok-log.gender.insight.entity";
import { TIkTokBusinessDeviceInsightResponseDto } from "src/dto/tiktok/response/buisiness/tiktok-insight.device.response.dto";
import { TiktokDeviceInsightEntity } from "src/DAL/entities/tiktok/tiktok.device.insight.entity";
import { TiktokLogDeviceInsightEntity } from "src/DAL/entities/tiktok/log/tiktok-log.device.insight.entity";
import { TiktokDeviceResponseDto } from "src/dto/tiktok/response/tiktok.device.response.dto";
import { TikTokBaseVideoResponseDto } from "src/dto/tiktok/response/tiktok.video.base-response.dto";
import { TikTokVideoResponseDto } from "src/dto/tiktok/response/tiktok.video.response.dto";
import { TiktokVideoEntity } from 'src/DAL/entities/tiktok/tiktok.video.entity';
import { TikTokeVideoListResponseDto } from 'src/dto/tiktok/response/tiktok.video-list.response.dto';
import { PlacementLastLogEntity } from 'src/DAL/entities/placement-last-log.entity';
import { PlacementLastLogResponseDto } from 'src/dto/influencer/placement/placement-last-log.response.dto';
import { StrategyDto } from 'src/dto/influencer/strategy.dto';
import { StrategyEntity } from 'src/DAL/entities/strategy.entity';

@Injectable()
export class MapperService extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }
  override get profile(): MappingProfile {
    return (mapper: Mapper) => {
      createMap(mapper, InfluencerEntity, InfluencerDto);
      createMap(mapper, StrategyEntity, StrategyDto);
      createMap(mapper, ManagerEntity, ShortManagerDto);
      createMap(mapper, PlacementEntity, PlacementResponseDto);
      createMap(mapper, InfluencerGroupEntity, InfluencerGroupResponseDto);
      createMap(mapper, QuoteEntity, QuoteResponseDto);

      createMap(mapper, PlacementLogEntity, PlacementLogResponseDto);

      createMap(mapper, PlacementLastLogEntity, PlacementResponseDto);
      createMap(mapper, PlacementLastLogEntity, PlacementLastLogResponseDto, forMember(
        (d) => d.id,
        mapFrom((s) => s.id),
      ),);

      createMap(mapper, QuoteLogEntity, QuoteLogResponseDto);

      createMap(mapper, QuoteListEntity, QuoteListResponseDto);

      createMap(mapper, QuoteLogResponseDto, QuoteResponseDto);
      createMap(mapper, QuoteLogListEntity, QuoteResponseDto);
      createMap(mapper, QuoteLogListEntity, QuoteLogResponseDto);
      createMap(mapper, QuoteLogListEntity, QuoteLogListResponseDto);

      createMap(
        mapper,
        TikTokBaseVideoResponseDto,
        TikTokVideoResponseDto,
        forMember(
          (d) => d.publishedAt,
          mapFrom((s) => DateHelper.secToDateTime(s.createTime)),
        ),
        forMember(
          (d) => d.description,
          mapFrom((s) => s.videoDescription),
        ),
        forMember(
          (d) => d.likes,
          mapFrom((s) => s.likesCount),
        ),
        forMember(
          (d) => d.comments,
          mapFrom((s) => s.commentsCount),
        ),
        forMember(
          (d) => d.views,
          mapFrom((s) => s.viewsCount),
        ),
        forMember(
          (d) => d.id,
          mapFrom((s) => s.id),
        ),
      );

      createMap(mapper,TikTokVideoResponseDto, TiktokVideoEntity, forMember(
        (d) => d.tiktokId,
        mapFrom((s) => s.id),
      ),)
      createMap(mapper, TiktokVideoEntity, TikTokVideoResponseDto)
      // ----------------------------------------------------------------
      //                              YOUTUBE
      // ----------------------------------------------------------------

      // ответ ютуба -> insight
      createMap(
        mapper,
        YoutubeAllStatisticsResponseDto,
        YoutubeInsightsEntity,
        forMember(
          (d) => d.followersCount,
          mapFrom((s) => s.subscribersCount),
        ),
        forMember(
          (d) => d.engagement,
          mapFrom((s) => s.engagementRate),
        ),
        forMember(
          (d) => d.impressions,
          mapFrom((s) => s.views),
        ),
      );
      createMap(mapper, YoutubeCountryResponseDto, YoutubeCountryInsightEntity);
      createMap(mapper, YoutubeAgeResponseDto, YoutubeAgeInsightEntity);
      createMap(mapper, YoutubeGenderResponseDto, YoutubeGenderInsightEntity,
        forMember(
          (d) => d.femaleCount,
          mapFrom((s) => s.female),
        ),
        forMember(
          (d) => d.maleCount,
          mapFrom((s) => s.male),
        ),
        forMember(
            (d) => d.otherCount,
            mapFrom((s) => s.genderUserSpecified),
          ),
      );
      createMap(mapper, YoutubeDeviceResponseDto, YoutubeDevicesInsightEntity);
      createMap(mapper, YoutubeCompletionRateResponseDto, YoutubeCompletionRateInsightEntity);

      // insight -> ответ ютуба
      createMap(
        mapper,
        YoutubeInsightsEntity,
        YoutubeAllStatisticsResponseDto,
        forMember(
          (d) => d.subscribersCount,
          mapFrom((s) => s.followersCount),
        ),
        forMember(
          (d) => d.engagementRate,
          mapFrom((s) => s.engagement),
        ),
        forMember(
          (d) => d.views,
          mapFrom((s) => s.impressions),
        ),
      );
      createMap(mapper, YoutubeCountryInsightEntity, YoutubeCountryResponseDto);
      createMap(mapper, YoutubeAgeInsightEntity, YoutubeAgeResponseDto);
      createMap(mapper, YoutubeGenderInsightEntity, YoutubeGenderResponseDto,  forMember(
        (d) => d.female,
        mapFrom((s) => s.femaleCount),
      ),
      forMember(
        (d) => d.male,
        mapFrom((s) => s.maleCount),
      ),
      forMember(
          (d) => d.genderUserSpecified,
          mapFrom((s) => s.otherCount),
        ),);
      createMap(mapper, YoutubeDevicesInsightEntity, YoutubeDeviceResponseDto);
      createMap(mapper, YoutubeCompletionRateInsightEntity, YoutubeCompletionRateResponseDto);

      // insight -> log insight
      createMap(mapper, YoutubeInsightsEntity, YoutubeLogInsightsEntity);

      createMap(mapper, YoutubeCountryInsightEntity, YoutubeLogCountryInsightEntity);
      createMap(mapper, YoutubeAgeInsightEntity, YoutubeLogAgeInsightEntity);
      createMap(mapper, YoutubeGenderInsightEntity, YoutubeLogGenderInsightEntity);
      createMap(mapper, YoutubeDevicesInsightEntity, YoutubeLogDevicesInsightEntity);
      createMap(mapper, YoutubeCompletionRateInsightEntity, YoutubeLogCompletionRateInsightEntity);

      //  log insight -> ответ ютуба
      createMap(mapper, YoutubeLogInsightsEntity, YoutubeAllLogStatisticsResponseDto);

      createMap(mapper, YoutubeLogCountryInsightEntity, YoutubeCountryResponseDto);
      createMap(mapper, YoutubeLogAgeInsightEntity, YoutubeAgeResponseDto);
      createMap(mapper, YoutubeLogGenderInsightEntity, YoutubeGenderResponseDto);
      createMap(mapper, YoutubeLogDevicesInsightEntity, YoutubeDeviceResponseDto);
      createMap(mapper, YoutubeLogCompletionRateInsightEntity, YoutubeCompletionRateResponseDto);

      // ----------------------------------------------------------------
      //                              INSTAGRAM
      // ----------------------------------------------------------------

      // ответ инсті -> insight
      createMap(mapper, InfluencerInsightsV18Dto, InstagramInsightsEntity);

      createMap(mapper, BaseInsightStatisticResponseDto, InstagramCountryInsightEntity);
      createMap(mapper, BaseInsightStatisticResponseDto, InstagramAgeInsightEntity);
      createMap(mapper, BaseInsightStatisticResponseDto, InstagramGenderInsightEntity);
      createMap(mapper, BaseInsightStatisticResponseDto, InstagramGenderAgeInsightEntity);

      // insight -> ответ инсті
      createMap(mapper, InstagramInsightsEntity, InfluencerInsightsV18Dto);

      createMap(mapper, InstagramCountryInsightEntity, BaseInsightStatisticResponseDto);
      createMap(mapper, InstagramAgeInsightEntity, BaseInsightStatisticResponseDto);
      createMap(mapper, InstagramGenderInsightEntity, BaseInsightStatisticResponseDto);
      createMap(mapper, InstagramGenderAgeInsightEntity, BaseInsightStatisticResponseDto);

      // insight -> log insight
      createMap(mapper, InstagramInsightsEntity, InstagramLogInsightsEntity);

      createMap(mapper, InstagramCountryInsightEntity, InstagramLogCountryInsightEntity);
      createMap(mapper, InstagramAgeInsightEntity, InstagramLogAgeInsightEntity);
      createMap(mapper, InstagramGenderInsightEntity, InstagramLogGenderInsightEntity);
      createMap(mapper, InstagramGenderAgeInsightEntity, InstagramLogGenderAgeInsightEntity);

      // log insight -> ответ инсті
      createMap(mapper, InstagramLogInsightsEntity, InfluencerLogInsightsV18Dto);

      createMap(mapper, InstagramLogCountryInsightEntity, BaseInsightStatisticResponseDto);
      createMap(mapper, InstagramLogAgeInsightEntity, BaseInsightStatisticResponseDto);
      createMap(mapper, InstagramLogGenderInsightEntity, BaseInsightStatisticResponseDto);
      createMap(mapper, InstagramLogGenderAgeInsightEntity, BaseInsightStatisticResponseDto);

      // ----------------------------------------------------------------
      //                              TIKTOK
      // ----------------------------------------------------------------

      // ответ tiktok -> insight
      createMap(mapper, TikTokMainStatisticResponseDto, TiktokInsightsEntity);
      // insight -> ответ tiktok
      createMap(mapper, TiktokInsightsEntity, TikTokMainStatisticResponseDto);
      // insight -> log insight
      createMap(mapper, TiktokInsightsEntity, TiktokLogInsightsEntity);
      // log insight -> ответ tiktok
      createMap(mapper, TiktokLogInsightsEntity, TikTokLogStatisticResponseDto);
      createMap(mapper, TiktokLogAgeInsightEntity, TiktokAgeResponseDto);
      createMap(mapper, TiktokLogCountryInsightEntity, TiktokCountryResponseDto);

      createMap(
        mapper,
        TiktokLogGenderInsightEntity,
        TiktokGenderResponseDto,
        forMember(
          (d) => d.male,
          mapFrom((s) => s.maleCount),
        ),
        forMember(
          (d) => d.female,
          mapFrom((s) => s.femaleCount),
        ),
        forMember(
          (d) => d.another,
          mapFrom((s) => s.otherCount),
        ),
      );

      createMap(mapper, TiktokLogDeviceInsightEntity, TiktokDeviceResponseDto);

      createMap(mapper, TiktokInsightsEntity, TiktokAllStatisticsResponseDto);
      createMap(mapper, TiktokCountryInsightEntity, TiktokCountryResponseDto);
      createMap(mapper, TiktokAgeInsightEntity, TiktokAgeResponseDto);
      createMap(
        mapper,
        TiktokGenderInsightEntity,
        TiktokGenderResponseDto,
        forMember(
          (d) => d.male,
          mapFrom((s) => s.maleCount),
        ),
        forMember(
          (d) => d.female,
          mapFrom((s) => s.femaleCount),
        ),
        forMember(
          (d) => d.another,
          mapFrom((s) => s.otherCount),
        ),
      );

      createMap(
        mapper,
        TIkTokBusinessCountryInsightResponseDto,
        TiktokCountryInsightEntity,
        forMember(
          (d) => d.name,
          mapFrom((s) => s.country),
        ),
        forMember(
          (d) => d.count,
          mapFrom((s) => s.percentage),
        ),
      );
      createMap(
        mapper,
        TIkTokBusinessAgeInsightResponseDto,
        TiktokAgeInsightEntity,
        forMember(
          (d) => d.name,
          mapFrom((s) => s.age),
        ),
        forMember(
          (d) => d.count,
          mapFrom((s) => s.percentage),
        ),
      );
      createMap(
        mapper,
        TIkTokBusinessDeviceInsightResponseDto,
        TiktokDeviceInsightEntity,
        forMember(
          (d) => d.name,
          mapFrom((s) => s.device),
        ),
        forMember(
          (d) => d.count,
          mapFrom((s) => s.percentage),
        ),
      );

      createMap(mapper, TiktokAgeInsightEntity, TiktokLogAgeInsightEntity);
      createMap(mapper, TiktokCountryInsightEntity, TiktokLogCountryInsightEntity);
    };
  }
}
