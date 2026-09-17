/** Replace legacy demo photos while preserving custom admin images. */
const legacyImages: Record<string, string> = {
  australia: "/photos/243532/", canada: "/gallery/icef-workshop.jpg", uk: "/photos/672532/",
  usa: "/photos/2902754/", japan: "/photos/2506923/", "new-zealand": "/photos/937980/",
  ireland: "/gallery/govt-approval.jpg", denmark: "/photos/2549018/",
};
export function getDestinationImage(slug: string, image: string) {
  if (legacyImages[slug] && (!image || image.includes(legacyImages[slug]))) return `/destinations/${slug}.jpg`;
  const supported = (image.startsWith("/") && !image.startsWith("//")) || /^https:\/\/(images\.pexels\.com|images\.unsplash\.com|plus\.unsplash\.com)\//.test(image);
  return supported && image ? image : "/maps/world.svg";
}
