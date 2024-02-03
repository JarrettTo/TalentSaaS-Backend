export class FacebookConstant {
  public static readonly FacebookAuthUrl = "https://www.facebook.com/v4.0/dialog/oauth";
  public static readonly GraphUrl = "https://graph.facebook.com/";

  public static readonly scopes = [

    "instagram_basic",
    "pages_read_engagement",
    "pages_read_user_content",
    "email",
    "public_profile",
    "pages_show_list",
  ];
}
