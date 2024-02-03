export class CuttlyUrlResponseDto {
  url: CuttlyBaseUrlResponseDto;
}
class CuttlyBaseUrlResponseDto {
  status: number;
  fullLink: string;
  date: Date;
  shortLink: string;
  title: string;
}
