export class FacebookConstant {
  public static readonly FacebookAuthUrl = "https://www.facebook.com/v4.0/dialog/oauth";
  public static readonly GraphUrl = "https://graph.facebook.com/";

  public static readonly scopes = [
    "read_insights",
    "publish_video",
    "pages_manage_instant_articles",
    "business_management",
    "pages_messaging",
    "pages_messaging_phone_number",
    "pages_messaging_subscriptions",
    "instagram_basic",
    "instagram_manage_comments",
    "instagram_manage_insights",
    "instagram_content_publish",
    "instagram_manage_messages",
    "pages_read_engagement",
    "pages_manage_metadata",
    "pages_read_user_content",
    "pages_manage_posts",
    "email",
    "public_profile",
    "pages_show_list",
  ];
}
